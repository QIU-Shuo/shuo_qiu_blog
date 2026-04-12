import Link from "next/link";
import { ContentTypeBadge } from "@/components/content-type-badge";
import type { ContentType } from "@/lib/posts";

interface ArticleHeaderProps {
  title: string;
  date: string;
  contentType: ContentType;
  readingTime: string;
  authorName?: string;
  authorHref?: string;
}

export function ArticleHeader({
  title,
  date,
  contentType,
  readingTime,
  authorName,
  authorHref,
}: ArticleHeaderProps) {
  const dateObj = new Date(date + "T00:00:00");
  const formatted = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const isoDate = dateObj.toISOString().split("T")[0];

  return (
    <header className="border-b border-[var(--color-rule)]">
      <div className="mx-auto max-w-[680px] pt-12 pb-8 px-6 md:px-0">
        <div className="mb-5">
          <ContentTypeBadge type={contentType} />
        </div>
        <h1 className="font-[family-name:var(--font-ibm-plex-sans)] text-[2rem] leading-[1.18] font-bold tracking-[-0.025em] text-[var(--color-text)] md:text-[2.375rem]">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2 font-[family-name:var(--font-ibm-plex-sans)] text-[0.8125rem] text-[var(--color-muted)]">
          {authorName && (
            <>
              <span>
                By{" "}
                {authorHref ? (
                  <Link
                    href={authorHref}
                    className="transition-colors hover:text-[var(--color-text)]"
                  >
                    {authorName}
                  </Link>
                ) : (
                  authorName
                )}
              </span>
              <span className="text-[var(--color-rule)]">&middot;</span>
            </>
          )}
          <time dateTime={isoDate}>{formatted}</time>
          <span className="text-[var(--color-rule)]">&middot;</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </header>
  );
}
