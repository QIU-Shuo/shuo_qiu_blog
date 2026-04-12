import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import {
  getPost,
  getPublishedPostSlugs,
  getRelatedPosts,
  isPublishedPost,
} from "@/lib/posts";
import { ReadingProgress } from "@/components/reading-progress";
import { CodeCopy } from "@/components/code-copy";
import {
  ArticleHeader,
  Abstract,
  KeyFindings,
} from "@/components/editorial";
import type { Metadata } from "next";
import { absoluteUrl, getSocialImage, siteConfig } from "@/lib/site";

const mdxComponents = {};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!isPublishedPost(post)) return {};

  const description =
    post.frontmatter.metaDescription || post.frontmatter.abstract;
  const url = absoluteUrl(`/posts/${slug}`);
  const socialImage = getSocialImage(`/posts/${slug}/opengraph-image`);

  return {
    title: post.frontmatter.title,
    description,
    keywords: post.frontmatter.topics,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.frontmatter.title,
      description,
      type: "article",
      publishedTime: post.frontmatter.date,
      url,
      tags: post.frontmatter.topics,
      authors: [siteConfig.author.name],
      images: socialImage,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description,
      images: socialImage.map((image) => image.url),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!isPublishedPost(post)) notFound();

  const { frontmatter, content, readingTime } = post;
  const description = frontmatter.metaDescription || frontmatter.abstract;
  const url = absoluteUrl(`/posts/${slug}`);
  const socialImage = getSocialImage(`/posts/${slug}/opengraph-image`);
  const relatedPosts = getRelatedPosts(post);
  const topics = frontmatter.topics ?? [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: frontmatter.contentType,
    wordCount: content.trim().split(/\s+/).length,
    keywords: topics.join(", "),
    inLanguage: "en-US",
    image: socialImage.map((image) => image.url),
    isPartOf: {
      "@type": "Blog",
      "@id": absoluteUrl("/#website"),
      name: siteConfig.name,
      url: siteConfig.url,
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: absoluteUrl(siteConfig.author.path),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: frontmatter.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ReadingProgress />
      <CodeCopy />
      <article className="pb-12">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[680px] px-6 pt-6 md:px-0"
        >
          <ol className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[var(--color-text)]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[var(--color-text)]">
              {frontmatter.title}
            </li>
          </ol>
        </nav>
        <ArticleHeader
          title={frontmatter.title}
          date={frontmatter.date}
          contentType={frontmatter.contentType}
          readingTime={readingTime}
          authorName={siteConfig.author.name}
          authorHref={siteConfig.author.path}
        />
        <Abstract>{frontmatter.abstract}</Abstract>
        {frontmatter.keyFindings && frontmatter.keyFindings.length > 0 && (
          <KeyFindings findings={frontmatter.keyFindings} />
        )}
        <div className="prose mx-auto mt-8 max-w-[680px] px-6 md:px-0">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark-dimmed",
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-12 max-w-[680px] px-6 md:px-0">
            <div className="border-t border-[var(--color-rule)] pt-8">
              <h2 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1.125rem] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                Related posts
              </h2>
              <p className="mt-2 font-[family-name:var(--font-source-serif-4)] text-[0.95rem] leading-[1.65] text-[var(--color-muted)]">
                Continue with closely related benchmarks, methods, and notes.
              </p>
              <div className="mt-5 space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/posts/${relatedPost.slug}`}
                    className="block rounded-lg border border-[var(--color-rule)] bg-[var(--color-bg-subtle)] px-4 py-4 no-underline transition-colors hover:border-[var(--color-accent)] hover:bg-white"
                  >
                    <div className="mb-1.5 flex flex-wrap items-center gap-2.5 font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]">
                      <span>{relatedPost.frontmatter.contentType}</span>
                      <span className="text-[var(--color-rule)]">&middot;</span>
                      <time dateTime={relatedPost.frontmatter.date}>
                        {new Date(
                          relatedPost.frontmatter.date + "T00:00:00"
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1rem] font-semibold leading-[1.35] text-[var(--color-text)]">
                      {relatedPost.frontmatter.title}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-source-serif-4)] text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
                      {relatedPost.frontmatter.abstract}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
