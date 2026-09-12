import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root; a stray lockfile in a parent folder otherwise confuses root detection.
  turbopack: { root: process.cwd() },
  // Static HTML export (the `out/` folder) so the site can be hosted as a Render static site.
  output: "export",
  images: {
    // No image server in a static export; brand images are pre-sized by `npm run brand`.
    unoptimized: true,
  },
};

export default nextConfig;
