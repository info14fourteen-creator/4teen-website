import type { MetadataRoute } from "next";

const routes = [
  "",
  "/app",
  "/privacy",
  "/terms",
  "/support",
  "/buy",
  "/unlock",
  "/liquidity",
  "/airdrop",
  "/ambassadors",
  "/verification",
  "/whitepaper",
  "/whitepaper/v1-2",
  "/whitepaper/v1-1",
  "/whitepaper/v1-0",
  "/blog",
  "/swap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://4teen.me";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
