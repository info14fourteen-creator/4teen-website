import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://4teen.me/sitemap.xml",
    host: "https://4teen.me",
  };
}
