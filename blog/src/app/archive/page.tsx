import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ContentTypeBadge } from "@/components/content-type-badge";
import type { Metadata } from "next";
import { absoluteUrl, getSocialImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Browse every published post on Agent Eval Notes, including LLM evaluation benchmarks, methods, and agent engineering notes.",
  alternates: {
    canonical: absoluteUrl("/archive"),
  },
  openGraph: {
    title: "Archive",
    description:
      "Browse every published post on Agent Eval Notes, including LLM evaluation benchmarks, methods, and agent engineering notes.",
    url: absoluteUrl("/archive"),
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: getSocialImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive",
    description:
      "Browse every published post on Agent Eval Notes, including LLM evaluation benchmarks, methods, and agent engineering notes.",
    images: getSocialImage().map((image) => image.url),
  },
};

export default function ArchivePage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="border-b border-[var(--color-rule)] bg-[var(--color-bg-subtle)]">
        <div className="mx-auto max-w-[680px] px-6 py-10 md:px-8">
          <p className="section-label mb-2">Archive</p>
          <h1 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1.5rem] font-bold tracking-[-0.02em] text-[var(--color-text)]">
            All posts
          </h1>
          <p className="mt-2 font-[family-name:var(--font-source-serif-4)] text-[0.9375rem] text-[var(--color-muted)]">
            All published notes, newest first.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[680px] px-6 py-8 md:px-8">
        {posts.length === 0 ? (
          <p className="text-[var(--color-muted)]">No posts yet.</p>
        ) : (
          <div className="divide-y divide-[var(--color-rule)]">
            {posts.map((post) => {
              const date = new Date(post.frontmatter.date + "T00:00:00");
              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group block py-6 no-underline first:pt-0 last:pb-0"
                >
                  <div className="mb-1.5 flex flex-wrap items-center gap-2.5 font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]">
                    <ContentTypeBadge type={post.frontmatter.contentType} />
                    <span className="text-[var(--color-rule)]">&middot;</span>
                    <time dateTime={post.frontmatter.date}>
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-[var(--color-rule)]">&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mb-1.5 font-[family-name:var(--font-ibm-plex-sans)] text-[1.125rem] font-semibold leading-[1.3] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="font-[family-name:var(--font-source-serif-4)] text-[0.9375rem] leading-[1.65] text-[var(--color-muted)]">
                    {post.frontmatter.abstract}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
