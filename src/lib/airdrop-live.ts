import { createHash } from "node:crypto";

const AIRDROP_VAULT_CONTRACT = "TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ";
const SITE_PUBLIC_AIRDROP_URL = "https://api.4teen.me/site/airdrop";
const TRONGRID_PROXY_TRIGGER_URL = "https://api.4teen.me/trongrid/wallet/triggerconstantcontract";
const TRONGRID_DIRECT_TRIGGER_URL = "https://api.trongrid.io/wallet/triggerconstantcontract";
const TRONGRID_PROXY_EVENTS_BASE_URL = "https://api.4teen.me/trongrid/v1/contracts";
const TRONGRID_DIRECT_EVENTS_BASE_URL = "https://api.trongrid.io/v1/contracts";
const TRONGRID_API_KEY = "d4fcb4c1-89d8-4651-9e34-11dd7848789b";
const AIRDROP_TOKEN_DECIMALS = 6;
const AIRDROP_TOTAL_ALLOCATION_RAW = BigInt(1_500_000) * BigInt(10 ** AIRDROP_TOKEN_DECIMALS);
const ISSUE_TS = 1763865465;
const LIVE_REVALIDATE_SECONDS = 120;
const LIVE_FETCH_TIMEOUT_MS = 8000;

const WAVE_TIMES = [
  1765075065,
  1772851065,
  1780627065,
  1788403065,
  1796179065,
  1803955065,
] as const;

const WAVE_CAPS = [
  500_000,
  350_000,
  250_000,
  180_000,
  120_000,
  100_000,
] as const;

const AIRDROP_PLATFORM_ROUTES = [
  {
    key: "telegram",
    title: "Telegram",
    bit: 4,
    status: "Live now",
    note: "Wallet session, bot state, and on-chain claim state are already wired in the mobile app.",
    href: "https://t.me/fourteentoken",
  },
  {
    key: "instagram",
    title: "Instagram",
    bit: 1,
    status: "Rollout placeholder",
    note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
    href: "https://instagram.com/fourteentoken",
  },
  {
    key: "x",
    title: "X",
    bit: 2,
    status: "Rollout placeholder",
    note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
    href: "https://x.com/4teen_me",
  },
  {
    key: "facebook",
    title: "Facebook",
    bit: 8,
    status: "Rollout placeholder",
    note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
    href: "https://facebook.com/Fourteentoken",
  },
  {
    key: "youtube",
    title: "YouTube",
    bit: 16,
    status: "Rollout placeholder",
    note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
    href: "https://www.youtube.com/@4teentoken",
  },
] as const;

type ContractCallResponse = {
  constant_result?: string[];
};

type ContractEventsResponse = {
  data?: {
    block_timestamp?: number | string;
    result?: Record<string, unknown>;
    transaction_id?: string;
  }[];
  meta?: {
    fingerprint?: string;
  };
};

type SitePublicSnapshotResponse<T> = {
  ok?: boolean;
  snapshot?: T | null;
};

export type LiveAirdropWave = {
  capDisplay: string;
  capRaw: string;
  number: number;
  status: "current" | "unlocked" | "upcoming";
  unlockAt: number;
  unlockLabel: string;
};

export type LiveAirdropSnapshot = {
  availableNowDisplay: string;
  availableNowRaw: string;
  contractAddress: string;
  currentWave: number;
  distributedDisplay: string;
  distributedRaw: string;
  issueDateAt: number;
  issueDateLabel: string;
  lastClaimAmountDisplay: string;
  lastClaimAt: number;
  lastClaimLabel: string;
  loadedAt: string;
  nextWaveAt: number;
  nextWaveLabel: string;
  operatorAddress: string;
  platformRoutes: typeof AIRDROP_PLATFORM_ROUTES;
  remainingPlannedDisplay: string;
  remainingPlannedRaw: string;
  remainingUnlockedDisplay: string;
  remainingUnlockedRaw: string;
  totalAllocationDisplay: string;
  totalAllocationRaw: string;
  unlockedDisplay: string;
  unlockedRaw: string;
  vaultBalanceDisplay: string;
  vaultBalanceRaw: string;
  waves: LiveAirdropWave[];
};

function formatTokenAmount(rawValue: bigint) {
  const normalized = Number(rawValue) / Math.pow(10, AIRDROP_TOKEN_DECIMALS);
  if (!Number.isFinite(normalized) || normalized <= 0) return "0";

  return normalized.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: AIRDROP_TOKEN_DECIMALS,
  });
}

function formatUtcLabel(unixSeconds: number) {
  if (!Number.isFinite(unixSeconds) || unixSeconds <= 0) {
    return "No next wave";
  }

  return new Date(unixSeconds * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }) + " UTC";
}

function formatEventTimestampLabel(timestampMs: number) {
  if (!Number.isFinite(timestampMs) || timestampMs <= 0) return "No confirmed claim yet";
  return (
    new Date(timestampMs).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "UTC",
    }) + " UTC"
  );
}

function normalizeHex(result: string) {
  return String(result || "").replace(/^0x/i, "").trim();
}

function hexToBigInt(hex: string) {
  const clean = normalizeHex(hex);
  return clean ? BigInt(`0x${clean}`) : BigInt(0);
}

function hexToSignedNumber(hex: string) {
  const clean = normalizeHex(hex);
  if (!clean) return 0;

  const value = BigInt(`0x${clean}`);
  const bits = BigInt(clean.length * 4);
  const signBit = BigInt(1) << (bits - BigInt(1));
  const signed = value >= signBit ? value - (BigInt(1) << bits) : value;
  return Number(signed);
}

function splitWords(hex: string) {
  const clean = normalizeHex(hex);
  const words: string[] = [];

  for (let index = 0; index < clean.length; index += 64) {
    words.push(clean.slice(index, index + 64));
  }

  return words.filter(Boolean);
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

async function triggerConstant(functionSelector: string) {
  const body = JSON.stringify({
    owner_address: AIRDROP_VAULT_CONTRACT,
    contract_address: AIRDROP_VAULT_CONTRACT,
    function_selector: functionSelector,
    visible: true,
  });

  const requests = [
    fetch(TRONGRID_PROXY_TRIGGER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      next: { revalidate: LIVE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
    }),
    fetch(TRONGRID_DIRECT_TRIGGER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
      body,
      next: { revalidate: LIVE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
    }),
  ];

  let lastError: Error | null = null;

  for (const request of requests) {
    try {
      const response = await request;
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${functionSelector}`);
      }

      const json = (await response.json()) as ContractCallResponse;
      const result = json.constant_result?.[0];
      if (!result) {
        throw new Error(`No constant_result for ${functionSelector}`);
      }

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Contract call failed");
    }
  }

  throw lastError ?? new Error(`Call failed for ${functionSelector}`);
}

async function fetchLatestAirdropEvent() {
  const paths = [
    {
      url: new URL(
        `${TRONGRID_PROXY_EVENTS_BASE_URL}/${AIRDROP_VAULT_CONTRACT}/events`,
      ),
      headers: {} as Record<string, string>,
    },
    {
      url: new URL(
        `${TRONGRID_DIRECT_EVENTS_BASE_URL}/${AIRDROP_VAULT_CONTRACT}/events`,
      ),
      headers: {
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
    },
  ];

  let lastError: Error | null = null;

  for (const target of paths) {
    target.url.searchParams.set("event_name", "Airdropped");
    target.url.searchParams.set("only_confirmed", "true");
    target.url.searchParams.set("order_by", "block_timestamp,desc");
    target.url.searchParams.set("limit", "1");

    try {
      const response = await fetch(target.url.toString(), {
        headers: target.headers,
        next: { revalidate: LIVE_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for latest event`);
      }

      const payload = (await response.json()) as ContractEventsResponse;
      const row = Array.isArray(payload.data) ? payload.data[0] : null;
      const latestClaimAt = Number(row?.block_timestamp || 0);
      const amountRaw = BigInt(String(row?.result?.amount ?? row?.result?.["1"] ?? "0"));

      return {
        lastClaimAt: Number.isFinite(latestClaimAt) ? latestClaimAt : 0,
        lastClaimAmountDisplay: amountRaw > BigInt(0) ? formatTokenAmount(amountRaw) : "0",
        lastClaimLabel: formatEventTimestampLabel(latestClaimAt),
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Latest event fetch failed");
    }
  }

  return {
    lastClaimAt: 0,
    lastClaimAmountDisplay: "0",
    lastClaimLabel: lastError ? "Latest claim unavailable" : "No confirmed claim yet",
  };
}

async function fetchSitePublicAirdropSnapshot() {
  const response = await fetch(SITE_PUBLIC_AIRDROP_URL, {
    next: { revalidate: LIVE_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for site public airdrop snapshot`);
  }

  const payload = (await response.json()) as SitePublicSnapshotResponse<LiveAirdropSnapshot>;
  if (!payload?.ok || !payload.snapshot) {
    throw new Error("Site public airdrop snapshot is missing");
  }

  return {
    ...payload.snapshot,
    platformRoutes: payload.snapshot.platformRoutes ?? AIRDROP_PLATFORM_ROUTES,
  } satisfies LiveAirdropSnapshot;
}

function buildWaveStatus(currentWave: number, number: number): LiveAirdropWave["status"] {
  if (currentWave >= 0 && number === currentWave + 1) return "current";
  if (currentWave >= 0 && number < currentWave + 1) return "unlocked";
  return "upcoming";
}

export async function getLiveAirdropSnapshot(): Promise<LiveAirdropSnapshot> {
  try {
    return await fetchSitePublicAirdropSnapshot();
  } catch (_) {}

  const [
    operatorHex,
    currentWaveHex,
    nextWaveHex,
    waveInfoHex,
    availableNowHex,
    latestEvent,
  ] =
    await Promise.all([
      triggerConstant("operator()"),
      triggerConstant("currentWave()"),
      triggerConstant("nextWaveTime()"),
      triggerConstant("waveInfo()"),
      triggerConstant("availableToDistributeNow()"),
      fetchLatestAirdropEvent(),
    ]);

  const currentWave = hexToSignedNumber(currentWaveHex);
  const nextWaveAt = Number(hexToBigInt(nextWaveHex));
  const availableNowRaw = hexToBigInt(availableNowHex);

  const [waveWord, unlockedWord, distributedWord, remainingUnlockedWord, vaultBalanceWord] =
    splitWords(waveInfoHex);

  const unlockedRaw = hexToBigInt(unlockedWord);
  const distributedRaw = hexToBigInt(distributedWord);
  const remainingUnlockedRaw = hexToBigInt(remainingUnlockedWord);
  const vaultBalanceRaw = hexToBigInt(vaultBalanceWord);
  const remainingPlannedRaw = AIRDROP_TOTAL_ALLOCATION_RAW - distributedRaw;

  const waves = WAVE_TIMES.map((unlockAt, index) => ({
    capDisplay: formatTokenAmount(BigInt(WAVE_CAPS[index]) * BigInt(10 ** AIRDROP_TOKEN_DECIMALS)),
    capRaw: String(BigInt(WAVE_CAPS[index]) * BigInt(10 ** AIRDROP_TOKEN_DECIMALS)),
    number: index + 1,
    status: buildWaveStatus(currentWave, index + 1),
    unlockAt,
    unlockLabel: formatUtcLabel(unlockAt),
  }));

  return {
    availableNowDisplay: formatTokenAmount(availableNowRaw),
    availableNowRaw: availableNowRaw.toString(),
    contractAddress: AIRDROP_VAULT_CONTRACT,
    currentWave,
    distributedDisplay: formatTokenAmount(distributedRaw),
    distributedRaw: distributedRaw.toString(),
    issueDateAt: ISSUE_TS,
    issueDateLabel: formatUtcLabel(ISSUE_TS),
    lastClaimAmountDisplay: latestEvent.lastClaimAmountDisplay,
    lastClaimAt: latestEvent.lastClaimAt,
    lastClaimLabel: latestEvent.lastClaimLabel,
    loadedAt: new Date().toISOString(),
    nextWaveAt,
    nextWaveLabel: formatUtcLabel(nextWaveAt),
    operatorAddress: tronHexToBase58(operatorHex),
    platformRoutes: AIRDROP_PLATFORM_ROUTES,
    remainingPlannedDisplay: formatTokenAmount(remainingPlannedRaw),
    remainingPlannedRaw: remainingPlannedRaw.toString(),
    remainingUnlockedDisplay: formatTokenAmount(remainingUnlockedRaw),
    remainingUnlockedRaw: remainingUnlockedRaw.toString(),
    totalAllocationDisplay: formatTokenAmount(AIRDROP_TOTAL_ALLOCATION_RAW),
    totalAllocationRaw: AIRDROP_TOTAL_ALLOCATION_RAW.toString(),
    unlockedDisplay: formatTokenAmount(unlockedRaw),
    unlockedRaw: unlockedRaw.toString(),
    vaultBalanceDisplay: formatTokenAmount(vaultBalanceRaw),
    vaultBalanceRaw: vaultBalanceRaw.toString(),
    waves,
  };
}
