"use client";

export type MarketPriceSnapshot = {
  base?: {
    symbol: string;
    value: string;
    icon: string;
  };
  direct?: {
    trx?: string;
  };
  dex?: {
    trx?: string;
    usdt?: string;
  };
  quotes?: Array<{
    symbol: string;
    value: string;
    icon: string;
  }>;
  updatedAt?: string;
};

export type MarketPricePayload = {
  ok?: boolean;
  snapshot?: MarketPriceSnapshot | null;
};

const MARKET_PRICE_ENDPOINT = "/api/site/market-price";
const MARKET_PRICE_CLIENT_TTL_MS = 5 * 60 * 1000;

let cachedPayload: MarketPricePayload | null = null;
let cachedAt = 0;
let pendingRequest: Promise<MarketPricePayload> | null = null;

export function readCachedMarketPrice() {
  if (!cachedPayload) return null;
  if (Date.now() - cachedAt > MARKET_PRICE_CLIENT_TTL_MS) return null;
  return cachedPayload;
}

export async function readMarketPrice() {
  const cached = readCachedMarketPrice();

  if (cached) {
    return cached;
  }

  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = fetch(MARKET_PRICE_ENDPOINT, { cache: "force-cache" })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Market price fetch failed: ${response.status}`);
      }

      const payload = (await response.json()) as MarketPricePayload;
      cachedPayload = payload;
      cachedAt = Date.now();
      return payload;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
