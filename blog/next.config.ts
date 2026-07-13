import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shuoq.dev",
          },
        ],
        destination: "https://www.shuoq.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
