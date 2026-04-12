import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getPost, isPublishedPost } from "@/lib/posts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface PostImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: PostImageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!isPublishedPost(post)) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background:
            "linear-gradient(145deg, #fafaf8 0%, #f5f4f1 55%, #dbeafe 100%)",
          color: "#0f1115",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(15, 17, 21, 0.12)",
            borderRadius: "28px",
            padding: "44px",
            background: "rgba(255, 255, 255, 0.78)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9999,
                  background: "#1d4ed8",
                }}
              />
              Agent Eval Notes
            </div>
            <div
              style={{
                display: "flex",
                borderRadius: 9999,
                background: "#dbeafe",
                color: "#1d4ed8",
                fontSize: 24,
                fontWeight: 700,
                padding: "10px 18px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {post.frontmatter.contentType}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: 980,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.045em",
              }}
            >
              {post.frontmatter.title}
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#3d4350",
              }}
            >
              {post.frontmatter.metaDescription || post.frontmatter.abstract}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
