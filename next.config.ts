import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "192.168.68.104",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    globalNotFound: true,
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
