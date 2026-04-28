import type { Metadata } from "next";
import {
  absoluteUrl,
  getSocialImage,
  getTwitterAttribution,
  siteConfig,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Notes by Shuo Qiu on AI agents, evaluation, and software.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About",
    description: "Notes by Shuo Qiu on AI agents, evaluation, and software.",
    url: absoluteUrl("/about"),
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: getSocialImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description: "Notes by Shuo Qiu on AI agents, evaluation, and software.",
    images: getSocialImage().map((image) => image.url),
    ...getTwitterAttribution(),
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[680px] px-6 pt-16 pb-16 md:px-8">
      <h1 className="mb-8 font-[family-name:var(--font-ibm-plex-sans)] text-[1.75rem] font-bold tracking-[-0.02em] text-[var(--color-text)]">
        About
      </h1>

      <p className="font-[family-name:var(--font-source-serif-4)] text-[1.125rem] leading-[1.75] text-[var(--color-text)]">
        Notes by Shuo Qiu on AI agents, evaluation, and software.
      </p>
    </div>
  );
}
