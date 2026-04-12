import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type ContentType =
  | "Benchmark"
  | "Method"
  | "Field Note"
  | "Opinion"
  | "Tooling";

export interface PostFrontmatter {
  title: string;
  date: string;
  contentType: ContentType;
  abstract: string;
  metaDescription?: string;
  keyFindings?: string[];
  topics?: string[];
  estimatedReadTime?: string;
  draft: boolean;
  reproductionRepo?: string;
  datasetLink?: string;
  relatedPosts?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const frontmatter = data as PostFrontmatter;
  // gray-matter parses YAML dates into Date objects — normalize to string
  if ((frontmatter.date as unknown) instanceof Date) {
    frontmatter.date = (frontmatter.date as unknown as Date).toISOString().split("T")[0];
  }

  return {
    slug,
    frontmatter,
    content,
    readingTime: stats.text,
  };
}

export function isPublishedPost(post: Post | null): post is Post {
  return post !== null && !post.frontmatter.draft;
}

export function getPublishedPostSlugs(): string[] {
  return getPostSlugs().filter((slug) => isPublishedPost(getPost(slug)));
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPost)
    .filter(isPublishedPost)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts();
  return posts[0] ?? null;
}

function normalizeTopic(topic: string): string {
  return topic.trim().toLowerCase();
}

export function getLatestPostDate(): string | null {
  return getAllPosts()[0]?.frontmatter.date ?? null;
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const candidates = getAllPosts().filter((candidate) => candidate.slug !== post.slug);
  const related = new Map<string, Post>();

  for (const relatedSlug of post.frontmatter.relatedPosts ?? []) {
    const match = candidates.find((candidate) => candidate.slug === relatedSlug);
    if (match) {
      related.set(match.slug, match);
    }
  }

  const currentTopics = new Set(
    (post.frontmatter.topics ?? []).map(normalizeTopic)
  );

  const sharedTopicMatches = candidates
    .map((candidate) => {
      const candidateTopics = new Set(
        (candidate.frontmatter.topics ?? []).map(normalizeTopic)
      );
      let sharedTopicCount = 0;

      for (const topic of currentTopics) {
        if (candidateTopics.has(topic)) {
          sharedTopicCount += 1;
        }
      }

      return {
        candidate,
        sharedTopicCount,
      };
    })
    .filter(({ sharedTopicCount }) => sharedTopicCount > 0)
    .sort(
      (a, b) =>
        b.sharedTopicCount - a.sharedTopicCount ||
        new Date(b.candidate.frontmatter.date).getTime() -
          new Date(a.candidate.frontmatter.date).getTime()
    );

  for (const { candidate } of sharedTopicMatches) {
    if (related.size >= limit) break;
    related.set(candidate.slug, candidate);
  }

  for (const candidate of candidates) {
    if (related.size >= limit) break;
    related.set(candidate.slug, candidate);
  }

  return [...related.values()].slice(0, limit);
}
