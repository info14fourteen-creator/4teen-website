import type { Metadata } from "next";

import {
  BlogPostPageView,
  getBlogPostPageMetadata,
} from "@/app/blog/[slug]/page-view";

type BlogPostPageParams = {
  slug: string;
};

// The full archive is served from a static asset rather than bundled into the Worker.
// Keep article pages dynamic so build-time rendering never needs the archive in code.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getBlogPostPageMetadata({ slug });
}

export default async function BlogPostPageRoute({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}) {
  const { slug } = await params;
  return <BlogPostPageView slug={slug} />;
}
