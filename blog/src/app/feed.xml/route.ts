import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = posts[0]?.frontmatter.date
    ? new Date(posts[0].frontmatter.date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/posts/${post.slug}`);
      const description = post.frontmatter.metaDescription || post.frontmatter.abstract;
      const categories = (post.frontmatter.topics ?? [])
        .map((topic) => `<category>${escapeXml(topic)}</category>`)
        .join("");

      return `
        <item>
          <title>${escapeXml(post.frontmatter.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
          <description>${escapeXml(description)}</description>
          ${categories}
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${absoluteUrl(siteConfig.rssPath)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
