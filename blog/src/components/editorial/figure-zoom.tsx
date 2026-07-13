"use client";

import { useEffect, useState } from "react";

interface FigureZoomProps {
  svg: string;
  alt: string;
}

/**
 * Renders the inline chart SVG and, on click, opens a fullscreen overlay
 * showing the same SVG larger. Click-out or Esc closes it. Dependency-free.
 */
export function FigureZoom({ svg, alt }: FigureZoomProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge figure: ${alt}`}
        className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:p-10"
        >
          <div
            className="max-h-full w-full max-w-[1100px] overflow-auto rounded-lg bg-[var(--color-surface,#fff)] p-4 shadow-2xl md:p-8 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      )}
    </>
  );
}
