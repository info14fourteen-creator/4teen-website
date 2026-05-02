const SITE_PUBLIC_DATA_BASE_URL =
  process.env.SITE_PUBLIC_DATA_BASE_URL || "https://api.4teen.me";
const SITE_SNAPSHOT_FETCH_TIMEOUT_MS = 8000;

export type SiteSnapshotKey =
  | "airdrop"
  | "ambassador"
  | "buy-latest"
  | "liquidity"
  | "market-price"
  | "summary"
  | "swap"
  | "unlock"
  | "verification";

type SiteSnapshotEnvelope<T> = {
  ok?: boolean;
  snapshot?: T | null;
};

export async function getServerSiteSnapshot<T>(
  snapshotKey: SiteSnapshotKey,
): Promise<T | null> {
  const url = new URL(`/site/${snapshotKey}`, SITE_PUBLIC_DATA_BASE_URL);
  url.searchParams.set("refresh", "1");

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(SITE_SNAPSHOT_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${snapshotKey} snapshot`);
    }

    const payload = (await response.json()) as SiteSnapshotEnvelope<T>;
    return payload?.ok && payload.snapshot ? payload.snapshot : null;
  } catch {
    return null;
  }
}
