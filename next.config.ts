import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [96, 160, 240, 320],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
