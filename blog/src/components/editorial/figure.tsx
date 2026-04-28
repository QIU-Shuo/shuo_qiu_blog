import fs from "node:fs";
import path from "node:path";
import type React from "react";

interface FigureProps {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  number?: string;
}

function readSvgInline(src: string): string {
  const rel = src.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", rel);
  const raw = fs.readFileSync(filePath, "utf8");
  return raw
    .replace(/<\?xml[\s\S]*?\?>/, "")
    .replace(/<!DOCTYPE[\s\S]*?>/, "")
    .trim();
}

export function Figure({ src, alt, caption, number }: FigureProps) {
  const svg = readSvgInline(src);
  return (
    <figure className="not-prose mx-auto my-12 w-full max-w-[680px] px-6 md:px-0">
      <div
        role="img"
        aria-label={alt}
        className="block w-full [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {(caption || number) && (
        <figcaption className="mt-5 max-w-[640px] font-[family-name:var(--font-ibm-plex-sans)] text-[0.875rem] leading-[1.6] text-[var(--color-muted)]">
          {number && (
            <span className="mr-2 font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
              {number}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
