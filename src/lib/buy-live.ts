import { createHash } from "node:crypto";

const FOURTEEN_TOKEN_CONTRACT = "TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const TRONGRID_PROXY_EVENTS_BASE_URL = "https://api.4teen.me/trongrid/v1/contracts";
const TRONGRID_DIRECT_EVENTS_BASE_URL = "https://api.trongrid.io/v1/contracts";
const TRONGRID_API_KEY = "d4fcb4c1-89d8-4651-9e34-11dd7848789b";
const BUY_TOKEN_DECIMALS = 6;
const TRX_DECIMALS = 6;
const LIVE_REVALIDATE_SECONDS = 120;
const LIVE_FETCH_TIMEOUT_MS = 8000;

type ContractEventsResponse = {
  data?: {
    block_timestamp?: number | string;
    result?: Record<string, unknown>;
    transaction_id?: string;
  }[];
};

export type LiveBuyEvent = {
  buyerAddress: string;
  buyerShort: string;
  trxAmountDisplay: string;
  tokensAmountDisplay: string;
  happenedAt: number;
  txId: string;
  txUrl: string;
};

function normalizeHex(result: string) {
  return String(result || "").replace(/^0x/i, "").trim();
}

function sha256(input: Buffer) {
  return createHash("sha256").update(input).digest();
}

function base58Encode(input: Buffer) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let value = BigInt(`0x${input.toString("hex")}`);
  let output = "";

  while (value > 0) {
    const remainder = Number(value % BigInt(58));
    output = alphabet[remainder] + output;
    value /= BigInt(58);
  }

  for (const byte of input) {
    if (byte !== 0) break;
    output = `1${output}`;
  }

  return output || "1";
}

function tronHexToBase58(rawHex: string) {
  const clean = normalizeHex(rawHex);
  const addressHex = clean.length >= 40 ? `41${clean.slice(-40)}` : clean;
  const payload = Buffer.from(addressHex, "hex");
  const checksum = sha256(sha256(payload)).subarray(0, 4);
  return base58Encode(Buffer.concat([payload, checksum]));
}

function formatTokenAmount(rawValue: string | number, decimals: number) {
  const safe = Number(rawValue || 0) / Math.pow(10, decimals);
  if (!Number.isFinite(safe) || safe <= 0) return "0";

  return safe.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function shortenAddress(address: string) {
  const safe = String(address || "").trim();
  if (safe.length <= 14) return safe;
  return `${safe.slice(0, 6)}...${safe.slice(-6)}`;
}

async function fetchLatestBuyEvents() {
  const paths = [
    {
      url: new URL(
        `${TRONGRID_PROXY_EVENTS_BASE_URL}/${FOURTEEN_TOKEN_CONTRACT}/events`,
      ),
      headers: {} as Record<string, string>,
    },
    {
      url: new URL(
        `${TRONGRID_DIRECT_EVENTS_BASE_URL}/${FOURTEEN_TOKEN_CONTRACT}/events`,
      ),
      headers: {
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
    },
  ];

  let lastError: Error | null = null;

  for (const target of paths) {
    target.url.searchParams.set("event_name", "BuyTokens");
    target.url.searchParams.set("only_confirmed", "true");
    target.url.searchParams.set("order_by", "block_timestamp,desc");
    target.url.searchParams.set("limit", "5");

    try {
      const response = await fetch(target.url.toString(), {
        headers: target.headers,
        next: { revalidate: LIVE_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for latest buy events`);
      }

      const payload = (await response.json()) as ContractEventsResponse;
      return payload.data ?? [];
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Latest buy events failed");
    }
  }

  throw lastError ?? new Error("Latest buy events failed");
}

export async function getLiveBuyEvents() {
  const events = await fetchLatestBuyEvents();

  return events.map((event): LiveBuyEvent => {
    const result = event.result ?? {};
    const buyerHex = String(result.buyer ?? result["0"] ?? "");
    const buyerAddress = tronHexToBase58(buyerHex);
    const trxAmountRaw = String(result.amountTRX ?? result["1"] ?? "0");
    const tokensAmountRaw = String(result.amountTokens ?? result["2"] ?? "0");
    const happenedAt = Number(event.block_timestamp ?? 0);
    const txId = String(event.transaction_id ?? "");

    return {
      buyerAddress,
      buyerShort: shortenAddress(buyerAddress),
      trxAmountDisplay: formatTokenAmount(trxAmountRaw, TRX_DECIMALS),
      tokensAmountDisplay: formatTokenAmount(tokensAmountRaw, BUY_TOKEN_DECIMALS),
      happenedAt,
      txId,
      txUrl: `https://tronscan.org/#/transaction/${txId}`,
    };
  });
}
