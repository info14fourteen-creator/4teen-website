const FOURTEEN = "TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const SITE_PUBLIC_MARKET_PRICE_URL = "https://api.4teen.me/site/market-price";
const TRX = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";
const USDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const TRONGRID_TRIGGER_URL = "https://api.trongrid.io/wallet/triggerconstantcontract";
const TRONGRID_API_KEY = "d4fcb4c1-89d8-4651-9e34-11dd7848789b";

const ROUTER_URL = "https://rot.endjgfsv.link/swap/routerUniversal";
const ONE_FOURTEEN_RAW = "1000000";

const ICONS = {
  FOURTEEN:
    "https://static.tronscan.org/production/upload/logo/new/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A.png",
  TRX: "https://static.tronscan.org/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
  USDT: "https://static.tronscan.org/production/logo/usdtlogo.png",
} as const;

const DECIMALS = {
  [TRX]: 6,
  [USDT]: 6,
} as const;

const MARKET_PRICE_REVALIDATE_SECONDS = 120;
const MARKET_PRICE_FETCH_TIMEOUT_MS = 8000;

export const revalidate = 120;

type SitePublicSnapshotResponse<T> = {
  ok?: boolean;
  snapshot?: T | null;
};

type MarketPriceSnapshot = {
  base: {
    symbol: string;
    value: string;
    icon: string;
  };
  quotes: {
    symbol: string;
    value: string;
    icon: string;
  }[];
  direct: {
    trx: string;
  };
  dex: {
    trx: string;
    usdt: string;
  };
  updatedAt: string;
};

function hexToBigInt(hex: string) {
  const clean = hex.startsWith("0x") ? hex : `0x${hex}`;
  return BigInt(clean);
}

function bigIntToDecimalNumber(value: bigint, decimals: number) {
  const negative = value < BigInt(0);
  const abs = negative ? -value : value;
  const base = BigInt(10) ** BigInt(decimals);
  const integer = abs / base;
  const fraction = abs % base;

  let stringValue = `${negative ? "-" : ""}${integer.toString()}`;
  if (fraction !== BigInt(0)) {
    const fractionStr = fraction
      .toString()
      .padStart(decimals, "0")
      .replace(/0+$/, "");
    stringValue = `${stringValue}.${fractionStr}`;
  }

  return Number(stringValue);
}

function findAmountOutDeep(input: unknown): string | null {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;

  const keys = [
    "amountOut",
    "amountOutStr",
    "toAmount",
    "toTokenAmount",
    "outputAmount",
    "amountOutMin",
  ] as const;

  for (const key of keys) {
    if (
      key in record &&
      record[key] !== undefined &&
      record[key] !== null &&
      record[key] !== ""
    ) {
      return String(record[key]).trim();
    }
  }

  if (Array.isArray(input)) {
    for (const item of input) {
      const nested = findAmountOutDeep(item);
      if (nested) return nested;
    }
    return null;
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      const nested = findAmountOutDeep(value);
      if (nested) return nested;
    }
  }

  return null;
}

async function getQuote(toToken: string) {
  const url =
    `${ROUTER_URL}?fromToken=${encodeURIComponent(FOURTEEN)}` +
    `&toToken=${encodeURIComponent(toToken)}` +
    `&amountIn=${encodeURIComponent(ONE_FOURTEEN_RAW)}` +
    "&typeList=&includeUnverifiedV4Hook=true";

  const response = await fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    next: { revalidate: MARKET_PRICE_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(MARKET_PRICE_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Router request failed: HTTP ${response.status}`);
  }

  const json = (await response.json()) as unknown;
  const amountOut = findAmountOutDeep(json);

  if (!amountOut) {
    throw new Error("amountOut not found");
  }

  return amountOut;
}

async function readDirectPrice() {
  async function callTrongrid(functionSelector: string) {
    const response = await fetch(TRONGRID_TRIGGER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
      body: JSON.stringify({
        owner_address: FOURTEEN,
        contract_address: FOURTEEN,
        function_selector: functionSelector,
        visible: true,
      }),
      next: { revalidate: MARKET_PRICE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(MARKET_PRICE_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Trongrid HTTP ${response.status} for ${functionSelector}`);
    }

    const json = (await response.json()) as {
      constant_result?: string[];
    };

    const result = json.constant_result?.[0];
    if (!result) {
      throw new Error(`No constant_result for ${functionSelector}`);
    }

    return hexToBigInt(result);
  }

  try {
    const directRaw = await callTrongrid("getCurrentPrice()");
    return bigIntToDecimalNumber(directRaw, DECIMALS[TRX]).toLocaleString("en-US", {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
  } catch {
    const fallbackRaw = await callTrongrid("tokenPrice()");
    return bigIntToDecimalNumber(fallbackRaw, DECIMALS[TRX]).toLocaleString("en-US", {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
  }
}

function formatValue(raw: string, decimals: number) {
  let value = Number(raw);

  if (!Number.isFinite(value)) {
    value = Number(raw.replace(/,/g, ""));
  }

  if (!Number.isFinite(value)) {
    return "0.00";
  }

  if (!raw.includes(".")) {
    value /= 10 ** decimals;
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

async function readPublicMarketSnapshot() {
  const response = await fetch(SITE_PUBLIC_MARKET_PRICE_URL, {
    next: { revalidate: MARKET_PRICE_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(MARKET_PRICE_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for site public market snapshot`);
  }

  const payload = (await response.json()) as SitePublicSnapshotResponse<MarketPriceSnapshot>;
  if (!payload?.ok || !payload.snapshot) {
    throw new Error("Site public market snapshot is missing");
  }

  return payload.snapshot;
}

export async function GET() {
  try {
    try {
      const snapshot = await readPublicMarketSnapshot();
      return Response.json({
        ok: true,
        ...snapshot,
      }, {
        headers: {
          "Cache-Control": `public, s-maxage=${MARKET_PRICE_REVALIDATE_SECONDS}, stale-while-revalidate=31535880`,
        },
      });
    } catch (_) {}

    const [trxRaw, usdtRaw, directTrx] = await Promise.all([
      getQuote(TRX),
      getQuote(USDT),
      readDirectPrice(),
    ]);

    const dexTrx = formatValue(trxRaw, DECIMALS[TRX]);
    const dexUsdt = formatValue(usdtRaw, DECIMALS[USDT]);

    return Response.json(
      {
        ok: true,
        base: {
          symbol: "4TEEN",
          value: "1.00",
          icon: ICONS.FOURTEEN,
        },
        quotes: [
          {
            symbol: "TRX",
            value: dexTrx,
            icon: ICONS.TRX,
          },
          {
            symbol: "USDT",
            value: dexUsdt,
            icon: ICONS.USDT,
          },
        ],
        direct: {
          trx: directTrx,
        },
        dex: {
          trx: dexTrx,
          usdt: dexUsdt,
        },
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${MARKET_PRICE_REVALIDATE_SECONDS}, stale-while-revalidate=31535880`,
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to read market price",
      },
      {
        headers: {
          "Cache-Control": "public, max-age=30",
        },
        status: 502,
      },
    );
  }
}
