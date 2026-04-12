import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTopics } from "@/lib/posts";
import { absoluteUrl, getSocialImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse topic pages covering LLM evaluation, agent engineering, synthetic datasets, and benchmarking methods.",
  alternates: {
    canonical: absoluteUrl("/topics"),
  },
  openGraph: {
    title: "Topics",
    description:
      "Browse topic pages covering LLM evaluation, agent engineering, synthetic datasets, and benchmarking methods.",
    url: absoluteUrl("/topics"),
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: getSocialImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Topics",
    description:
      "Browse topic pages covering LLM evaluation, agent engineering, synthetic datasets, and benchmarking methods.",
    images: getSocialImage().map((image) => image.url),
  },
};

export default function TopicsPage() {
  const topics = getAllTopics();

  if (topics.length === 0) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-[var(--color-rule)] bg-[var(--color-bg-subtle)]">
        <div className="mx-auto max-w-[680px] px-6 py-10 md:px-8">
          <p className="section-label mb-2">Topics</p>
          <h1 className="font-[family-name:var(--font-ibm-plex-sans)] text-[1.7rem] font-bold tracking-[-0.02em] text-[var(--color-text)] md:text-[2.125rem]">
            Explore the themes behind the posts
          </h1>
          <p className="mt-3 font-[family-name:var(--font-source-serif-4)] text-[1rem] leading-[1.7] text-[var(--color-muted)]">
            Topic pages group related posts so readers and search engines can
            follow each line of inquiry across benchmarks, methods, and field
            notes.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-[680px] px-6 py-8 md:px-8">
        <ul className="grid gap-3">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/topics/${topic.slug}`}
                className="flex items-center justify-between rounded-lg border border-[var(--color-rule)] bg-white px-4 py-4 no-underline transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-subtle)]"
              >
                <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.98rem] font-medium text-[var(--color-text)]">
                  {topic.name}
                </span>
                <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.78rem] text-[var(--color-muted)]">
                  {topic.count} post{topic.count === 1 ? "" : "s"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
