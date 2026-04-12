const DEFAULT_SITE_URL = "https://shuoq.dev";

function normalizeSiteUrl(url: string) {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    DEFAULT_SITE_URL
);

export const siteConfig = {
  name: "Agent Eval Notes",
  url: siteUrl,
  host: new URL(siteUrl).host,
  locale: "en_US",
  description:
    "Benchmarks, methodology, and implementation notes on AI agent evaluation, synthetic datasets, and eval-driven development by Shuo Qiu.",
  rssPath: "/feed.xml",
  topicsPath: "/topics",
  author: {
    name: "Shuo Qiu",
    path: "/about",
  },
  keywords: [
    "agent evaluation",
    "LLM evaluation",
    "AI agent testing",
    "agent evals",
    "agent observability",
    "evaluation pipelines",
    "eval driven development",
    "agent benchmarking",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getSocialImage(path = "/opengraph-image") {
  return [
    {
      url: absoluteUrl(path),
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} social card`,
    },
  ];
}
