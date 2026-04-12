import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTopics,
  getPostsByTopicSlug,
  getTopicNameBySlug,
} from "@/lib/posts";
import { absoluteUrl, getSocialImage, siteConfig } from "@/lib/site";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topicName = getTopicNameBySlug(slug);

  if (!topicName) {
    return {};
  }

  const description = `Posts about ${topicName}, including related LLM evaluation benchmarks and implementation notes.`;
  const url = absoluteUrl(`/topics/${slug}`);

  return {
    title: `${topicName} posts`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${topicName} posts`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: getSocialImage(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${topicName} posts`,
      description,
      images: getSocialImage().map((image) => image.url),
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topicName = getTopicNameBySlug(slug);
  const posts = getPostsByTopicSlug(slug);

  if (!topicName || posts.length === 0) {
    notFound();
  }

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
        name: "Topics",
        item: absoluteUrl("/topics"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: topicName,
        item: absoluteUrl(`/topics/${slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="border-b border-[var(--color-rule)] bg-[var(--color-bg-subtle)]">
        <div className="mx-auto max-w-[680px] px-6 py-10 md:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="mb-4 flex flex-wrap items-center gap-2 font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--color-text)]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/topics"
                  className="transition-colors hover:text-[var(--color-text)]"
                >
                  Topics
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[var(--color-text)]">
                {topicName}
              </li>
            </ol>
          </nav>
          <p className="section-label mb-2">Topic</p>
          <h1 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1.75rem] font-bold tracking-[-0.02em] text-[var(--color-text)] md:text-[2.25rem]">
            {topicName}
          </h1>
          <p className="mt-3 font-[family-name:var(--font-source-serif-4)] text-[1rem] leading-[1.7] text-[var(--color-muted)]">
            {posts.length} post{posts.length === 1 ? "" : "s"} connected to{" "}
            {topicName}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[680px] px-6 py-8 md:px-8">
        <div className="divide-y divide-[var(--color-rule)]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block py-6 no-underline first:pt-0 last:pb-0"
            >
              <div className="mb-1.5 flex flex-wrap items-center gap-2.5 font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]">
                <span>{post.frontmatter.contentType}</span>
                <span className="text-[var(--color-rule)]">&middot;</span>
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </time>
              </div>
              <h2 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1.125rem] font-semibold leading-[1.35] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                {post.frontmatter.title}
              </h2>
              <p className="mt-1 font-[family-name:var(--font-source-serif-4)] text-[0.95rem] leading-[1.65] text-[var(--color-muted)]">
                {post.frontmatter.abstract}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
