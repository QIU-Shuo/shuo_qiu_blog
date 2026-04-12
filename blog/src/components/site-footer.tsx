import Link from "next/link";
import { hasPublishedTopics } from "@/lib/posts";

export function SiteFooter() {
  const showTopics = hasPublishedTopics();

  return (
    <footer className="mt-16">
      <div className="mx-auto max-w-[1100px] px-6 md:px-8">
        <div className="h-px gradient-divider-center" />
      </div>
      <div className="mx-auto max-w-[1100px] px-6 py-8 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-[family-name:var(--font-ibm-plex-sans)] text-[0.8rem] text-[var(--color-muted)]">
            Agent Eval Notes by{" "}
            <a
              href="/about"
              className="text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              Shuo Qiu
            </a>{" "}
            — agent evaluation research
          </p>
          <nav className="flex items-center gap-4 font-[family-name:var(--font-ibm-plex-sans)] text-[0.8rem] text-[var(--color-muted)]">
            {showTopics && (
              <Link
                href="/topics"
                className="transition-colors hover:text-[var(--color-text)]"
              >
                Topics
              </Link>
            )}
            <Link
              href="/archive"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              Archive
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              About
            </Link>
            <a
              href="/feed.xml"
              className="underline decoration-[var(--color-rule)] underline-offset-2 transition-colors hover:text-[var(--color-text)]"
            >
              RSS
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
