import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ContentTypeBadge } from "@/components/content-type-badge";
import { absoluteUrl, getSocialImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agent Eval Notes",
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Agent Eval Notes",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: getSocialImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Eval Notes",
    description: siteConfig.description,
    images: getSocialImage().map((image) => image.url),
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-[680px] px-6 pt-10 pb-16 md:px-8 md:pt-14">
      {/* ── Compact intro ── */}
      <header className="mb-10">
        <h1 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1.6rem] font-bold leading-[1.35] tracking-[-0.02em] text-[var(--color-text)] md:text-[1.85rem]">
          <Link
            href="/about"
            className="text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-accent)]"
          >
            Shuo Qiu
          </Link>
          &rsquo;s Notes on AI Agent&nbsp;Evaluation
        </h1>
      </header>

      {/* ── Featured post ── */}
      {featured && (
        <Link
          href={`/posts/${featured.slug}`}
          className="group -mx-3 block rounded-lg px-3 py-5 no-underline transition-colors duration-200 hover:bg-[var(--color-bg-subtle)]"
        >
          <div className="mb-2 flex items-center gap-2.5">
            <ContentTypeBadge type={featured.frontmatter.contentType} />
            <span className="text-[var(--color-rule)]">&middot;</span>
            <time
              dateTime={featured.frontmatter.date}
              className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]"
            >
              {new Date(
                featured.frontmatter.date + "T00:00:00"
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <h2 className="mb-1.5 font-[family-name:var(--font-ibm-plex-sans)] text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-accent)] md:text-[1.375rem]">
            {featured.frontmatter.title}
          </h2>
          <p className="font-[family-name:var(--font-source-serif-4)] text-[0.9375rem] leading-[1.65] text-[var(--color-muted)] line-clamp-3">
            {featured.frontmatter.abstract}
          </p>
        </Link>
      )}

      {/* ── Remaining posts ── */}
      {rest.map((post) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="group -mx-3 block rounded-lg border-t border-[var(--color-rule)] px-3 py-5 no-underline transition-colors duration-200 hover:bg-[var(--color-bg-subtle)]"
        >
          <div className="mb-2 flex items-center gap-2.5">
            <ContentTypeBadge type={post.frontmatter.contentType} />
            <span className="text-[var(--color-rule)]">&middot;</span>
            <time
              dateTime={post.frontmatter.date}
              className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.75rem] text-[var(--color-muted)]"
            >
              {new Date(
                post.frontmatter.date + "T00:00:00"
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <h2 className="mb-1.5 font-[family-name:var(--font-ibm-plex-sans)] text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-accent)] md:text-[1.375rem]">
            {post.frontmatter.title}
          </h2>
          <p className="font-[family-name:var(--font-source-serif-4)] text-[0.9375rem] leading-[1.65] text-[var(--color-muted)] line-clamp-3">
            {post.frontmatter.abstract}
          </p>
        </Link>
      ))}
    </div>
  );
}
