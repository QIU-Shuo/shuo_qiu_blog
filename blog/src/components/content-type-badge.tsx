import type { ContentType } from "@/lib/posts";

interface ContentTypeBadgeProps {
  type: ContentType;
}

export function ContentTypeBadge({ type }: ContentTypeBadgeProps) {
  return (
    <span className="inline-block font-[family-name:var(--font-ibm-plex-sans)] text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)] bg-[var(--color-accent-light)] px-2 py-0.5 rounded">
      {type}
    </span>
  );
}
