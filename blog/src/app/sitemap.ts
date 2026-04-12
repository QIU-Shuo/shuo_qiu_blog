import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllTopics,
  getLatestPostDate,
  hasPublishedTopics,
} from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const topics = getAllTopics();
  const showTopics = hasPublishedTopics();
  const latestPostDate = getLatestPostDate();
  const latestPostModified = latestPostDate ? new Date(latestPostDate) : undefined;

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const topicEntries: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: absoluteUrl(`/topics/${topic.slug}`),
    lastModified: latestPostModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPostModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/archive"),
      lastModified: latestPostModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...(showTopics
      ? [
          {
            url: absoluteUrl("/topics"),
            lastModified: latestPostModified,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...topicEntries,
    ...postEntries,
  ];
}
