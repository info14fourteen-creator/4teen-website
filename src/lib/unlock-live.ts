import { createHash } from "node:crypto";

const FOURTEEN_TOKEN_CONTRACT = "TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const FOURTEEN_CONTROLLER_CONTRACT = "TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ";
const TRONGRID_PROXY_TRIGGER_URL = "https://api.4teen.me/trongrid/wallet/triggerconstantcontract";
const TRONGRID_DIRECT_TRIGGER_URL = "https://api.trongrid.io/wallet/triggerconstantcontract";
const TRONGRID_PROXY_EVENTS_BASE_URL = "https://api.4teen.me/trongrid/v1/contracts";
const TRONGRID_DIRECT_EVENTS_BASE_URL = "https://api.trongrid.io/v1/contracts";
const TRONGRID_API_KEY = "d4fcb4c1-89d8-4651-9e34-11dd7848789b";
const TOKEN_DECIMALS = 6;
const LOCK_WINDOW_DAYS = 14;
const LOCK_WINDOW_MS = LOCK_WINDOW_DAYS * 24 * 60 * 60 * 1000;
const LIVE_REVALIDATE_SECONDS = 120;
const LIVE_FETCH_TIMEOUT_MS = 8000;
const MAX_EVENT_PAGES = 5;
const PAGE_LIMIT = 200;

const VAULTS = [
  {
    key: "fourteen-vault",
    title: "FourteenVault",
    address: "TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq",
    role: "Liquidity reserve custody",
    href: "https://tronscan.org/#/contract/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq",
  },
  {
    key: "airdrop-vault",
    title: "AirdropVault",
    address: "TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
    role: "Community distribution reserve",
    href: "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
  },
  {
    key: "team-lock-vault",
    title: "TeamLockVault",
    address: "TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h",
    role: "Team allocation lock custody",
    href: "https://tronscan.org/#/contract/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h",
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

export type UnlockBatchSnapshot = {
  amountDisplay: string;
  amountRaw: string;
  buyerAddress: string;
  buyerShort: string;
  txId: string;
  txUrl: string;
  unlockAt: number;
};

export type UnlockVaultSnapshot = {
  address: string;
  balanceDisplay: string;
  balanceRaw: string;
  href: string;
  role: string;
  title: string;
};

export type LiveUnlockSnapshot = {
  activeLockBatches: number;
  currentlyLockedDisplay: string;
  currentlyLockedRaw: string;
  freelyCirculatingDisplay: string;
  freelyCirculatingRaw: string;
  loadedAt: string;
  lockWindowDays: number;
  nextUnlockAt: number;
  totalSupplyDisplay: string;
  totalSupplyRaw: string;
  unlockBatches: UnlockBatchSnapshot[];
  vaultCustodyDisplay: string;
  vaultCustodyRaw: string;
  vaults: UnlockVaultSnapshot[];
};

function normalizeHex(result: string) {
  return String(result || "").replace(/^0x/i, "").trim();
}

function hexToBigInt(hex: string) {
  const clean = normalizeHex(hex);
  return clean ? BigInt(`0x${clean}`) : BigInt(0);
}

function formatTokenAmount(rawValue: bigint) {
  const normalized = Number(rawValue) / Math.pow(10, TOKEN_DECIMALS);
  if (!Number.isFinite(normalized) || normalized <= 0) return "0";

  return normalized.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: TOKEN_DECIMALS,
  });
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

function base58Decode(input: string) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let value = BigInt(0);

  for (const char of input) {
    const index = alphabet.indexOf(char);
    if (index < 0) {
      throw new Error("Invalid base58 address");
    }
    value = value * BigInt(58) + BigInt(index);
  }

  let hex = value.toString(16);
  if (hex.length % 2) hex = `0${hex}`;
  let bytes = Buffer.from(hex, "hex");

  let leadingZeroes = 0;
  for (const char of input) {
    if (char !== "1") break;
    leadingZeroes += 1;
  }

  if (leadingZeroes > 0) {
    bytes = Buffer.concat([Buffer.alloc(leadingZeroes), bytes]);
  }

  return bytes;
}

function tronHexToBase58(rawHex: string) {
  const clean = normalizeHex(rawHex);
  const addressHex = clean.length >= 40 ? `41${clean.slice(-40)}` : clean;
  const payload = Buffer.from(addressHex, "hex");
  const checksum = sha256(sha256(payload)).subarray(0, 4);
  return base58Encode(Buffer.concat([payload, checksum]));
}

function tronBase58ToAbiWord(address: string) {
  const decoded = base58Decode(address);
  const payload = decoded.subarray(0, decoded.length - 4).toString("hex");
  const evmAddress = payload.startsWith("41") ? payload.slice(2) : payload;
  return evmAddress.padStart(64, "0");
}

function shortenAddress(address: string) {
  const safe = String(address || "").trim();
  if (safe.length <= 14) return safe;
  return `${safe.slice(0, 6)}...${safe.slice(-6)}`;
}

async function triggerConstant(functionSelector: string, parameter = "") {
  const body = JSON.stringify({
    owner_address: FOURTEEN_TOKEN_CONTRACT,
    contract_address: FOURTEEN_TOKEN_CONTRACT,
    function_selector: functionSelector,
    parameter,
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

      const payload = (await response.json()) as ContractCallResponse;
      return payload.constant_result?.[0] ?? "";
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Contract call failed");
    }
  }

  throw lastError ?? new Error(`Contract call failed for ${functionSelector}`);
}

async function fetchBuyEventsPage(fingerprint?: string) {
  const targets = [
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

  for (const target of targets) {
    target.url.searchParams.set("event_name", "BuyTokens");
    target.url.searchParams.set("only_confirmed", "true");
    target.url.searchParams.set("order_by", "block_timestamp,desc");
    target.url.searchParams.set("limit", String(PAGE_LIMIT));
    if (fingerprint) {
      target.url.searchParams.set("fingerprint", fingerprint);
    }

    try {
      const response = await fetch(target.url.toString(), {
        headers: target.headers,
        next: { revalidate: LIVE_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for BuyTokens events`);
      }

      return (await response.json()) as ContractEventsResponse;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("BuyTokens events failed");
    }
  }

  throw lastError ?? new Error("BuyTokens events failed");
}

async function fetchActiveBuyEvents() {
  const cutoff = Date.now() - LOCK_WINDOW_MS;
  const rows: NonNullable<ContractEventsResponse["data"]> = [];
  let fingerprint: string | undefined;

  for (let page = 0; page < MAX_EVENT_PAGES; page += 1) {
    const payload = await fetchBuyEventsPage(fingerprint);
    const pageRows = payload.data ?? [];
    if (pageRows.length === 0) break;

    rows.push(...pageRows);

    const oldestTimestamp = Number(pageRows[pageRows.length - 1]?.block_timestamp ?? 0);
    if (!Number.isFinite(oldestTimestamp) || oldestTimestamp <= cutoff) {
      break;
    }

    fingerprint = payload.meta?.fingerprint;
    if (!fingerprint) break;
  }

  return rows.filter((row) => {
    const happenedAt = Number(row.block_timestamp ?? 0);
    return Number.isFinite(happenedAt) && happenedAt > cutoff;
  });
}

function toUnlockBatch(row: NonNullable<ContractEventsResponse["data"]>[number]): UnlockBatchSnapshot | null {
  const happenedAt = Number(row.block_timestamp ?? 0);
  const txId = String(row.transaction_id ?? "").trim();
  const result = row.result ?? {};
  const buyerHex = String(result.buyer ?? result["0"] ?? "");
  const amountRaw = BigInt(String(result.amountTokens ?? result["2"] ?? "0"));

  if (!txId || !Number.isFinite(happenedAt) || happenedAt <= 0 || amountRaw <= BigInt(0)) {
    return null;
  }

  const unlockAt = happenedAt + LOCK_WINDOW_MS;
  const buyerAddress = tronHexToBase58(buyerHex);

  return {
    amountDisplay: formatTokenAmount(amountRaw),
    amountRaw: amountRaw.toString(),
    buyerAddress,
    buyerShort: shortenAddress(buyerAddress),
    txId,
    txUrl: `https://tronscan.org/#/transaction/${txId}`,
    unlockAt,
  };
}

export async function getLiveUnlockSnapshot(): Promise<LiveUnlockSnapshot> {
  const [totalSupplyHex, activeBuyRows, ...vaultBalanceHexes] = await Promise.all([
    triggerConstant("totalSupply()"),
    fetchActiveBuyEvents(),
    ...VAULTS.map((vault) =>
      triggerConstant("balanceOf(address)", tronBase58ToAbiWord(vault.address)),
    ),
  ]);

  const totalSupplyRaw = hexToBigInt(totalSupplyHex);
  const activeBatches = activeBuyRows
    .map(toUnlockBatch)
    .filter((batch): batch is UnlockBatchSnapshot => Boolean(batch))
    .sort((left, right) => left.unlockAt - right.unlockAt);

  const currentlyLockedRaw = activeBatches.reduce(
    (sum, batch) => sum + BigInt(batch.amountRaw),
    BigInt(0),
  );

  const vaults = VAULTS.map((vault, index) => {
    const balanceRaw = hexToBigInt(vaultBalanceHexes[index] ?? "");
    return {
      address: vault.address,
      balanceDisplay: formatTokenAmount(balanceRaw),
      balanceRaw: balanceRaw.toString(),
      href: vault.href,
      role: vault.role,
      title: vault.title,
    } satisfies UnlockVaultSnapshot;
  });

  const vaultCustodyRaw = vaults.reduce(
    (sum, vault) => sum + BigInt(vault.balanceRaw),
    BigInt(0),
  );

  const freelyCirculatingRaw = totalSupplyRaw - currentlyLockedRaw - vaultCustodyRaw;
  const nextUnlockAt = activeBatches[0]?.unlockAt ?? 0;

  return {
    activeLockBatches: activeBatches.length,
    currentlyLockedDisplay: formatTokenAmount(currentlyLockedRaw),
    currentlyLockedRaw: currentlyLockedRaw.toString(),
    freelyCirculatingDisplay: formatTokenAmount(
      freelyCirculatingRaw > BigInt(0) ? freelyCirculatingRaw : BigInt(0),
    ),
    freelyCirculatingRaw: (freelyCirculatingRaw > BigInt(0) ? freelyCirculatingRaw : BigInt(0)).toString(),
    loadedAt: new Date().toISOString(),
    lockWindowDays: LOCK_WINDOW_DAYS,
    nextUnlockAt,
    totalSupplyDisplay: formatTokenAmount(totalSupplyRaw),
    totalSupplyRaw: totalSupplyRaw.toString(),
    unlockBatches: activeBatches,
    vaultCustodyDisplay: formatTokenAmount(vaultCustodyRaw),
    vaultCustodyRaw: vaultCustodyRaw.toString(),
    vaults,
  };
}

export const unlockVerificationLinks = {
  controller: `https://tronscan.org/#/contract/${FOURTEEN_CONTROLLER_CONTRACT}`,
  token: `https://tronscan.org/#/token20/${FOURTEEN_TOKEN_CONTRACT}`,
};
