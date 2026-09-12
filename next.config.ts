import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root; a stray lockfile in a parent folder otherwise confuses root detection.
  turbopack: { root: process.cwd() },
  // Static HTML export (the `out/` folder), uploaded to Namecheap Stellar Plus (cPanel/Apache).
  output: "export",
  // Emit /privacy/index.html instead of /privacy.html so Apache serves clean URLs without rewrites.
  trailingSlash: true,
  images: {
    // No image server in a static export; brand images are pre-sized by `npm run brand`.
    unoptimized: true,
  },
};

export default nextConfig;
