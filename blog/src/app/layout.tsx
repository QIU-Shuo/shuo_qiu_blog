import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  absoluteUrl,
  getSocialImage,
  getTwitterAttribution,
  siteConfig,
} from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shuo Qiu",
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.author.name,
      url: absoluteUrl(siteConfig.author.path),
    },
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": absoluteUrl(siteConfig.rssPath),
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "Shuo Qiu",
    description: siteConfig.description,
    images: getSocialImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuo Qiu",
    description: siteConfig.description,
    images: getSocialImage().map((image) => image.url),
    ...getTwitterAttribution(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        sameAs: [siteConfig.social.github, siteConfig.social.x],
      },
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: siteConfig.author.name,
        url: absoluteUrl(siteConfig.author.path),
        sameAs: [siteConfig.social.github, siteConfig.social.x],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${plexSans.variable} ${sourceSerif.variable} ${plexMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
