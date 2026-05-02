import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.68.104",
  ],
  output: "standalone",
  experimental: {
    webpackBuildWorker: false,
  },
  images: {
    remotePatterns: [
      new URL("https://static.tronscan.org/**"),
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
