const SITE_PUBLIC_API_BASE_URL = "https://api.4teen.me/site";
const SITE_PUBLIC_FETCH_TIMEOUT_MS = 5000;

type SiteSnapshotRouteContext = {
  params: Promise<{
    snapshot: string;
  }>;
};

const ALLOWED_SNAPSHOTS = new Set([
  "airdrop",
  "ambassador",
  "buy-latest",
  "liquidity",
  "market-price",
  "summary",
  "swap",
  "unlock",
  "verification",
] as const);

function getSnapshotTtl(snapshot: string) {
  if (snapshot === "summary") return 60;
  return 120;
}

export async function GET(
  request: Request,
  context: SiteSnapshotRouteContext,
) {
  const { snapshot } = await context.params;

  if (!ALLOWED_SNAPSHOTS.has(snapshot as never)) {
    return Response.json(
      { ok: false, error: "Unknown site snapshot" },
      {
        status: 404,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300",
        },
      },
    );
  }

  const url = new URL(request.url);
  const refreshQuery = url.searchParams.get("refresh");
  const upstreamUrl = new URL(`${SITE_PUBLIC_API_BASE_URL}/${snapshot}`);

  if (refreshQuery === "1" || refreshQuery === "true") {
    upstreamUrl.searchParams.set("refresh", "1");
  }

  try {
    const response = await fetch(upstreamUrl.toString(), {
      next: { revalidate: getSnapshotTtl(snapshot) },
      signal: AbortSignal.timeout(SITE_PUBLIC_FETCH_TIMEOUT_MS),
    });

    const body = await response.text();
    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json; charset=utf-8",
        "Cache-Control": response.headers.get("cache-control") || `public, s-maxage=${getSnapshotTtl(snapshot)}, stale-while-revalidate=31535880`,
      },
    });
  } catch {
    return Response.json(
      { ok: false, error: "Site public snapshot fetch failed" },
      {
        status: 502,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300",
        },
      },
    );
  }
}
