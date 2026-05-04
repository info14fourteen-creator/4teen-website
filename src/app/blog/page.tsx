import type { Metadata } from "next";

import { BlogPageView, getBlogPageMetadata } from "@/app/blog/page-view";

export async function generateMetadata(): Promise<Metadata> {
  return getBlogPageMetadata();
}
export const dynamic = "force-dynamic";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  return <BlogPageView selectedTag={tag} />;
}
