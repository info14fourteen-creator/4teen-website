import { getPublishedBlogPosts, isBlogContentEnabled } from "@/lib/blog/blog-server";
import { resolveSiteLocale } from "@/lib/site-locale";

export async function GET(request: Request) {
  if (!isBlogContentEnabled()) {
    return Response.json(
      {
        ok: false,
        error: "Blog content is not enabled",
      },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const locale = resolveSiteLocale(url.searchParams.get("locale") ?? undefined);
  const requestedLimit = Number(url.searchParams.get("limit") ?? "12");
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 50)
    : 12;

  const posts = await getPublishedBlogPosts({ locale, limit });

  return Response.json({
    ok: true,
    locale,
    count: posts.length,
    posts,
  });
}
