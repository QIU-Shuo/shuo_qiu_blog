import type { MetadataRoute } from "next";
import { getAllPosts, getLatestPostDate, getPostImagePaths } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = getLatestPostDate();
  const latestPostModified = latestPostDate ? new Date(latestPostDate) : undefined;

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
    images: [
      absoluteUrl(`/posts/${post.slug}/opengraph-image`),
      ...getPostImagePaths(post).map((imagePath) => absoluteUrl(imagePath)),
    ],
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPostModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...postEntries,
  ];
}
