import { createHash } from "node:crypto";

const FOURTEEN_TOKEN_CONTRACT = "TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const LIQUIDITY_CONTROLLER_CONTRACT = "TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ";
const LIQUIDITY_BOOTSTRAPPER_CONTRACT = "TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc";
const JUSTMONEY_EXECUTOR_FALLBACK = "TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F";
const SUN_V3_EXECUTOR_FALLBACK = "TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh";
const FOURTEEN_VAULT_CONTRACT = "TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq";
const TRONGRID_PROXY_TRIGGER_URL = "https://api.4teen.me/trongrid/wallet/triggerconstantcontract";
const TRONGRID_DIRECT_TRIGGER_URL = "https://api.trongrid.io/wallet/triggerconstantcontract";
const TRONGRID_PROXY_EVENTS_BASE_URL = "https://api.4teen.me/trongrid/v1/contracts";
const TRONGRID_DIRECT_EVENTS_BASE_URL = "https://api.trongrid.io/v1/contracts";
const TRONGRID_PROXY_ACCOUNTS_BASE_URL = "https://api.4teen.me/trongrid/v1/accounts";
const TRONGRID_DIRECT_ACCOUNTS_BASE_URL = "https://api.trongrid.io/v1/accounts";
const TRONGRID_API_KEY = "d4fcb4c1-89d8-4651-9e34-11dd7848789b";
const TOKEN_DECIMALS = 6;
const TRX_DECIMALS = 6;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_EXECUTION_ROWS = 10;
const LIVE_REVALIDATE_SECONDS = 120;
const LIVE_FETCH_TIMEOUT_MS = 8000;

type ContractCallResponse = {
  constant_result?: string[];
};

type ContractEventsResponse = {
  data?: {
    block_timestamp?: number | string;
    result?: Record<string, unknown>;
    transaction_id?: string;
  }[];
};

type AccountResponse = {
  data?: {
    balance?: number | string;
  }[];
};

export type LiquidityExecutionSnapshot = {
  day: number;
  happenedAt: number;
  justMoneyTrxDisplay: string;
  sunV3TrxDisplay: string;
  totalTrxDisplay: string;
  txId: string;
  txUrl: string;
};

export type LiquidityReserveSnapshot = {
  address: string;
  balanceDisplay: string;
  balanceRaw: string;
  href: string;
  role: string;
  title: string;
};

export type LiveLiquiditySnapshot = {
  controllerAddress: string;
  bootstrapperAddress: string;
  currentWindowState: "ready" | "waiting" | "threshold";
  controllerBalanceDisplay: string;
  controllerBalanceRaw: string;
  dailyPercentLabel: string;
  fourteenvaultBalanceDisplay: string;
  fourteenvaultBalanceRaw: string;
  latestFundingAt: number;
  latestFundingDisplay: string;
  lastExecuteAt: number;
  lastExecutionDay: number;
  loadedAt: string;
  minBalanceDisplay: string;
  nextReleaseDisplay: string;
  nextReleaseRaw: string;
  nextWindowAt: number;
  operations: LiquidityExecutionSnapshot[];
  reserves: LiquidityReserveSnapshot[];
  splitLabel: string;
};

function normalizeHex(result: string) {
  return String(result || "").replace(/^0x/i, "").trim();
}

function hexToBigInt(hex: string) {
  const clean = normalizeHex(hex);
  return clean ? BigInt(`0x${clean}`) : BigInt(0);
}

function formatUnits(rawValue: bigint, decimals: number, maximumFractionDigits = decimals) {
  const normalized = Number(rawValue) / Math.pow(10, decimals);
  if (!Number.isFinite(normalized) || normalized <= 0) return "0";

  return normalized.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
}

function formatTrxAmount(rawValue: bigint) {
  return formatUnits(rawValue, TRX_DECIMALS, 2);
}

function formatTokenAmount(rawValue: bigint) {
  return formatUnits(rawValue, TOKEN_DECIMALS, TOKEN_DECIMALS);
}

function normalizeTimestamp(value: unknown) {
  const numeric = Number(value || 0);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
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

async function triggerConstant(
  contractAddress: string,
  functionSelector: string,
  parameter = "",
) {
  const body = JSON.stringify({
    owner_address: contractAddress,
    contract_address: contractAddress,
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

async function fetchContractEvents(
  contractAddress: string,
  eventName: string,
  limit: number,
) {
  const targets = [
    {
      url: new URL(`${TRONGRID_PROXY_EVENTS_BASE_URL}/${contractAddress}/events`),
      headers: {} as Record<string, string>,
    },
    {
      url: new URL(`${TRONGRID_DIRECT_EVENTS_BASE_URL}/${contractAddress}/events`),
      headers: {
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
    },
  ];

  let lastError: Error | null = null;

  for (const target of targets) {
    target.url.searchParams.set("event_name", eventName);
    target.url.searchParams.set("only_confirmed", "true");
    target.url.searchParams.set("order_by", "block_timestamp,desc");
    target.url.searchParams.set("limit", String(limit));

    try {
      const response = await fetch(target.url.toString(), {
        headers: target.headers,
        next: { revalidate: LIVE_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${eventName} events`);
      }

      const payload = (await response.json()) as ContractEventsResponse;
      return payload.data ?? [];
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(`${eventName} events failed`);
    }
  }

  throw lastError ?? new Error(`${eventName} events failed`);
}

async function fetchAccountBalanceSun(address: string) {
  const targets = [
    {
      url: `${TRONGRID_PROXY_ACCOUNTS_BASE_URL}/${address}`,
      headers: {} as Record<string, string>,
    },
    {
      url: `${TRONGRID_DIRECT_ACCOUNTS_BASE_URL}/${address}`,
      headers: {
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
    },
  ];

  let lastError: Error | null = null;

  for (const target of targets) {
    try {
      const response = await fetch(target.url, {
        headers: target.headers,
        next: { revalidate: LIVE_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for account ${address}`);
      }

      const payload = (await response.json()) as AccountResponse;
      const raw = payload.data?.[0]?.balance;
      return BigInt(String(raw ?? 0));
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Account read failed");
    }
  }

  throw lastError ?? new Error(`Account read failed for ${address}`);
}

function toExecutionRow(
  row: NonNullable<ContractEventsResponse["data"]>[number],
): LiquidityExecutionSnapshot | null {
  const result = row.result ?? {};
  const txId = String(row.transaction_id ?? "").trim();
  const happenedAt = normalizeTimestamp(row.block_timestamp);
  const totalRaw = BigInt(String(result.totalAmount ?? result["1"] ?? "0"));
  const amountARaw = BigInt(String(result.amountA ?? result["2"] ?? "0"));
  const amountBRaw = BigInt(String(result.amountB ?? result["3"] ?? "0"));
  const day = Number(result.day ?? result["0"] ?? 0);

  if (!txId || happenedAt <= 0 || totalRaw <= BigInt(0)) {
    return null;
  }

  return {
    day: Number.isFinite(day) ? day : 0,
    happenedAt,
    justMoneyTrxDisplay: formatTrxAmount(amountARaw),
    sunV3TrxDisplay: formatTrxAmount(amountBRaw),
    totalTrxDisplay: formatTrxAmount(totalRaw),
    txId,
    txUrl: `https://tronscan.org/#/transaction/${txId}`,
  };
}

function extractLatestFunding(
  rows: NonNullable<ContractEventsResponse["data"]>,
) {
  const first = rows[0];
  if (!first) {
    return {
      amountRaw: BigInt(0),
      happenedAt: 0,
    };
  }

  return {
    amountRaw: BigInt(String(first.result?.amount ?? first.result?.["1"] ?? "0")),
    happenedAt: normalizeTimestamp(first.block_timestamp),
  };
}

function describeWindowState(input: {
  balanceRaw: bigint;
  minBalanceRaw: bigint;
  lastExecutionDay: bigint;
}) {
  const today = BigInt(Math.floor(Date.now() / DAY_MS));
  if (input.balanceRaw < input.minBalanceRaw) {
    return {
      nextWindowAt: Number(input.lastExecutionDay + BigInt(1)) * DAY_MS,
      state: "threshold" as const,
    };
  }

  if (today <= input.lastExecutionDay) {
    return {
      nextWindowAt: Number(input.lastExecutionDay + BigInt(1)) * DAY_MS,
      state: "waiting" as const,
    };
  }

  return {
    nextWindowAt: Number(today) * DAY_MS,
    state: "ready" as const,
  };
}

export async function getLiveLiquiditySnapshot(): Promise<LiveLiquiditySnapshot> {
  const [
    executionRows,
    fundingRows,
    controllerBalanceRaw,
    lastExecutionDayHex,
    targetAHex,
    targetBHex,
    minBalanceHex,
    dailyPercentHex,
    percentDividerHex,
  ] = await Promise.all([
    fetchContractEvents(
      LIQUIDITY_CONTROLLER_CONTRACT,
      "LiquidityExecuted",
      MAX_EXECUTION_ROWS,
    ),
    fetchContractEvents(LIQUIDITY_CONTROLLER_CONTRACT, "TRXReceived", 1),
    fetchAccountBalanceSun(LIQUIDITY_CONTROLLER_CONTRACT),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "lastExecutionDay()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "targetA()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "targetB()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "MIN_BALANCE()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "DAILY_PERCENT()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "PERCENT_DIVIDER()"),
  ]);

  const targetAAddress = normalizeHex(targetAHex)
    ? tronHexToBase58(targetAHex)
    : JUSTMONEY_EXECUTOR_FALLBACK;
  const targetBAddress = normalizeHex(targetBHex)
    ? tronHexToBase58(targetBHex)
    : SUN_V3_EXECUTOR_FALLBACK;
  const minBalanceRaw = hexToBigInt(minBalanceHex);
  const dailyPercentRaw = hexToBigInt(dailyPercentHex);
  const percentDividerRaw = hexToBigInt(percentDividerHex);
  const lastExecutionDayRaw = hexToBigInt(lastExecutionDayHex);

  const [fourteenVaultBalanceRaw, targetABalanceRaw, targetBBalanceRaw] = await Promise.all([
    triggerConstant(
      FOURTEEN_TOKEN_CONTRACT,
      "balanceOf(address)",
      tronBase58ToAbiWord(FOURTEEN_VAULT_CONTRACT),
    ).then(hexToBigInt),
    triggerConstant(
      FOURTEEN_TOKEN_CONTRACT,
      "balanceOf(address)",
      tronBase58ToAbiWord(targetAAddress),
    ).then(hexToBigInt),
    triggerConstant(
      FOURTEEN_TOKEN_CONTRACT,
      "balanceOf(address)",
      tronBase58ToAbiWord(targetBAddress),
    ).then(hexToBigInt),
  ]);

  const operations = executionRows
    .map(toExecutionRow)
    .filter((row): row is LiquidityExecutionSnapshot => Boolean(row))
    .slice(0, MAX_EXECUTION_ROWS);
  const latestFunding = extractLatestFunding(fundingRows ?? []);
  const nextReleaseRaw =
    controllerBalanceRaw >= minBalanceRaw && percentDividerRaw > BigInt(0)
      ? (controllerBalanceRaw * dailyPercentRaw) / percentDividerRaw
      : BigInt(0);
  const windowState = describeWindowState({
    balanceRaw: controllerBalanceRaw,
    minBalanceRaw,
    lastExecutionDay: lastExecutionDayRaw,
  });

  return {
    controllerAddress: LIQUIDITY_CONTROLLER_CONTRACT,
    bootstrapperAddress: LIQUIDITY_BOOTSTRAPPER_CONTRACT,
    currentWindowState: windowState.state,
    controllerBalanceDisplay: formatTrxAmount(controllerBalanceRaw),
    controllerBalanceRaw: controllerBalanceRaw.toString(),
    dailyPercentLabel:
      percentDividerRaw > BigInt(0)
        ? `${(Number(dailyPercentRaw) / Number(percentDividerRaw) * 100).toFixed(2)}%`
        : "0%",
    fourteenvaultBalanceDisplay: formatTokenAmount(fourteenVaultBalanceRaw),
    fourteenvaultBalanceRaw: fourteenVaultBalanceRaw.toString(),
    latestFundingAt: latestFunding.happenedAt,
    latestFundingDisplay: formatTrxAmount(latestFunding.amountRaw),
    lastExecuteAt: operations[0]?.happenedAt ?? 0,
    lastExecutionDay: Number(lastExecutionDayRaw),
    loadedAt: new Date().toISOString(),
    minBalanceDisplay: formatTrxAmount(minBalanceRaw),
    nextReleaseDisplay: formatTrxAmount(nextReleaseRaw),
    nextReleaseRaw: nextReleaseRaw.toString(),
    nextWindowAt: windowState.nextWindowAt,
    operations,
    reserves: [
      {
        address: FOURTEEN_VAULT_CONTRACT,
        balanceDisplay: formatTokenAmount(fourteenVaultBalanceRaw),
        balanceRaw: fourteenVaultBalanceRaw.toString(),
        href: `https://tronscan.org/#/contract/${FOURTEEN_VAULT_CONTRACT}`,
        role: "Reserve token custody used by the bootstrapper before execution.",
        title: "FourteenVault",
      },
      {
        address: targetAAddress,
        balanceDisplay: formatTokenAmount(targetABalanceRaw),
        balanceRaw: targetABalanceRaw.toString(),
        href: `https://tronscan.org/#/contract/${targetAAddress}`,
        role: "Executor-side 4TEEN buffer for the JustMoney path.",
        title: "JustMoney Executor",
      },
      {
        address: targetBAddress,
        balanceDisplay: formatTokenAmount(targetBBalanceRaw),
        balanceRaw: targetBBalanceRaw.toString(),
        href: `https://tronscan.org/#/contract/${targetBAddress}`,
        role: "Executor-side 4TEEN buffer for the Sun.io V3 path.",
        title: "Sun.io V3 Executor",
      },
    ],
    splitLabel: "50 / 50",
  };
}

export const liquidityVerificationLinks = {
  bootstrapper: `https://tronscan.org/#/contract/${LIQUIDITY_BOOTSTRAPPER_CONTRACT}`,
  controller: `https://tronscan.org/#/contract/${LIQUIDITY_CONTROLLER_CONTRACT}`,
};
