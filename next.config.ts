import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preview sites are HTML files read at request time by src/app/p/[slug]/route.ts.
  outputFileTracingIncludes: {
    "/p/[slug]": ["./src/previews/sites/**"],
  },
  async headers() {
    return [
      {
        // Preview photos: keep them out of search results too.
        source: "/p/:slug/img/:file*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
