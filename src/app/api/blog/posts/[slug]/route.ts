import {
  getPublishedBlogPostBySlug,
  isBlogContentEnabled,
} from "@/lib/blog/blog-server";
import { resolveSiteLocale } from "@/lib/site-locale";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  if (!isBlogContentEnabled()) {
    return Response.json(
      {
        ok: false,
        error: "Blog content is not enabled",
      },
      { status: 503 },
    );
  }

  const { slug } = await context.params;
  const url = new URL(request.url);
  const locale = resolveSiteLocale(url.searchParams.get("locale") ?? undefined);
  const post = await getPublishedBlogPostBySlug({ locale, slug });

  if (!post) {
    return Response.json(
      {
        ok: false,
        error: "Blog post not found",
      },
      { status: 404 },
    );
  }

  return Response.json({
    ok: true,
    locale,
    post,
  });
}
