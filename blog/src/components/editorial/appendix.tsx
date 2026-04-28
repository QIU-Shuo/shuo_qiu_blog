import type React from "react";

interface AppendixProps {
  title: string;
  id?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function Appendix({
  title,
  id,
  defaultOpen = false,
  children,
}: AppendixProps) {
  const slug = id ?? slugify(title);
  return (
    <details open={defaultOpen} className="appendix group mt-12 mb-8">
      <summary className="appendix-summary cursor-pointer list-none border-t border-[var(--color-rule)] pt-6 pb-2">
        <h2
          id={slug}
          className="!mb-0 !mt-0 inline-flex items-baseline gap-3"
        >
          <span
            aria-hidden="true"
            className="appendix-chevron text-[0.65em] text-[var(--color-muted)] transition-transform group-open:rotate-90"
          >
            ▸
          </span>
          <span>{title}</span>
        </h2>
      </summary>
      {children}
    </details>
  );
}
