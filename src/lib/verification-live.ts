import { createHash } from "node:crypto";

const FOURTEEN_TOKEN_CONTRACT = "TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const FOURTEEN_CONTROLLER_CONTRACT = "TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ";
const LIQUIDITY_CONTROLLER_CONTRACT = "TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ";
const LIQUIDITY_BOOTSTRAPPER_CONTRACT = "TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc";
const FOURTEEN_VAULT_CONTRACT = "TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq";
const TEAM_LOCK_VAULT_CONTRACT = "TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h";
const AIRDROP_VAULT_CONTRACT = "TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ";
const JUSTMONEY_EXECUTOR_CONTRACT = "TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F";
const SUN_V3_EXECUTOR_CONTRACT = "TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh";

const TRONGRID_PROXY_TRIGGER_URL = "https://api.4teen.me/trongrid/wallet/triggerconstantcontract";
const TRONGRID_DIRECT_TRIGGER_URL = "https://api.trongrid.io/wallet/triggerconstantcontract";
const TRONGRID_PROXY_ACCOUNTS_BASE_URL = "https://api.4teen.me/trongrid/v1/accounts";
const TRONGRID_DIRECT_ACCOUNTS_BASE_URL = "https://api.trongrid.io/v1/accounts";
const TRONGRID_API_KEY = "d4fcb4c1-89d8-4651-9e34-11dd7848789b";
const TOKEN_DECIMALS = 6;
const LIVE_REVALIDATE_SECONDS = 120;
const LIVE_FETCH_TIMEOUT_MS = 8000;

const MODULE_LINKS = {
  token: `https://tronscan.org/#/token20/${FOURTEEN_TOKEN_CONTRACT}`,
  controller: `https://tronscan.org/#/contract/${FOURTEEN_CONTROLLER_CONTRACT}`,
  liquidityController: `https://tronscan.org/#/contract/${LIQUIDITY_CONTROLLER_CONTRACT}`,
  bootstrapper: `https://tronscan.org/#/contract/${LIQUIDITY_BOOTSTRAPPER_CONTRACT}`,
  fourteenVault: `https://tronscan.org/#/contract/${FOURTEEN_VAULT_CONTRACT}`,
  teamLockVault: `https://tronscan.org/#/contract/${TEAM_LOCK_VAULT_CONTRACT}`,
  airdropVault: `https://tronscan.org/#/contract/${AIRDROP_VAULT_CONTRACT}`,
  justMoneyExecutor: `https://tronscan.org/#/contract/${JUSTMONEY_EXECUTOR_CONTRACT}`,
  sunV3Executor: `https://tronscan.org/#/contract/${SUN_V3_EXECUTOR_CONTRACT}`,
} as const;

type ContractCallResponse = {
  constant_result?: string[];
};

type AccountResponse = {
  data?: {
    balance?: number | string;
  }[];
};

export type VerificationAssetSnapshot = {
  address: string;
  balanceDisplay: string;
  balanceRaw: string;
  href: string;
  role: string;
  title: string;
};

export type LiveVerificationSnapshot = {
  loadedAt: string;
  totalSupplyDisplay: string;
  totalSupplyRaw: string;
  currentPriceDisplay: string;
  currentPriceRaw: string;
  vaultCustodyDisplay: string;
  vaultCustodyRaw: string;
  controllerBalanceDisplay: string;
  controllerBalanceRaw: string;
  ownerAvailableDisplay: string;
  ownerAvailableRaw: string;
  reservedRewardsDisplay: string;
  reservedRewardsRaw: string;
  unallocatedPurchaseFundsDisplay: string;
  unallocatedPurchaseFundsRaw: string;
  trackedVolumeDisplay: string;
  trackedVolumeRaw: string;
  rewardsAccruedDisplay: string;
  rewardsAccruedRaw: string;
  rewardsClaimedDisplay: string;
  rewardsClaimedRaw: string;
  liquidityControllerBalanceDisplay: string;
  liquidityControllerBalanceRaw: string;
  liquidityMinBalanceDisplay: string;
  liquidityMinBalanceRaw: string;
  liquidityDailyReleaseLabel: string;
  annualGrowthRateLabel: string;
  annualGrowthRateRaw: string;
  priceUpdateIntervalDays: number;
  priceUpdateIntervalSeconds: number;
  lastPriceUpdateAt: number;
  tokenOwnerAddress: string;
  controllerOwnerAddress: string;
  liquidityControllerOwnerAddress: string;
  liquidityPoolAddress: string;
  airdropAddress: string;
  justMoneyExecutorAddress: string;
  sunV3ExecutorAddress: string;
  ambassadorsCount: number;
  activeAmbassadorsCount: number;
  boundBuyersCount: number;
  assets: VerificationAssetSnapshot[];
};

function normalizeHex(result: string) {
  return String(result || "").replace(/^0x/i, "").trim();
}

function hexToBigInt(hex: string) {
  const clean = normalizeHex(hex);
  return clean ? BigInt(`0x${clean}`) : BigInt(0);
}

function splitWords(hex: string) {
  const clean = normalizeHex(hex);
  const words: string[] = [];

  for (let index = 0; index < clean.length; index += 64) {
    words.push(clean.slice(index, index + 64));
  }

  return words.filter(Boolean);
}

function formatTokenAmount(rawValue: bigint) {
  const normalized = Number(rawValue) / Math.pow(10, TOKEN_DECIMALS);
  if (!Number.isFinite(normalized) || normalized <= 0) return "0";

  return normalized.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: TOKEN_DECIMALS,
  });
}

function formatTrxAmount(rawSun: bigint) {
  const normalized = Number(rawSun) / 1_000_000;
  if (!Number.isFinite(normalized) || normalized <= 0) return "0";

  return normalized.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
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

async function readTokenBalance(address: string) {
  const hex = await triggerConstant(
    FOURTEEN_TOKEN_CONTRACT,
    "balanceOf(address)",
    tronBase58ToAbiWord(address),
  );

  return hexToBigInt(hex);
}

function toAddress(hex: string) {
  return normalizeHex(hex) ? tronHexToBase58(hex) : "";
}

function toPercentLabel(rawValue: bigint, dividerValue: bigint) {
  if (dividerValue <= BigInt(0)) return "0%";
  return `${((Number(rawValue) / Number(dividerValue)) * 100).toFixed(2)}%`;
}

export const verificationLinks = {
  token: MODULE_LINKS.token,
  controller: MODULE_LINKS.controller,
  liquidityController: MODULE_LINKS.liquidityController,
  bootstrapper: MODULE_LINKS.bootstrapper,
  fourteenVault: MODULE_LINKS.fourteenVault,
  teamLockVault: MODULE_LINKS.teamLockVault,
  airdropVault: MODULE_LINKS.airdropVault,
  justMoneyExecutor: MODULE_LINKS.justMoneyExecutor,
  sunV3Executor: MODULE_LINKS.sunV3Executor,
} as const;

export async function getLiveVerificationSnapshot(): Promise<LiveVerificationSnapshot> {
  const [
    totalSupplyHex,
    previewPriceHex,
    annualGrowthRateHex,
    lastPriceUpdateHex,
    priceUpdateIntervalHex,
    tokenOwnerHex,
    liquidityPoolHex,
    airdropAddressHex,
    controllerOwnerHex,
    systemCountsHex,
    systemRewardsHex,
    systemBalancesHex,
    liquidityControllerOwnerHex,
    liquidityMinBalanceHex,
    liquidityDailyPercentHex,
    liquidityPercentDividerHex,
    targetAHex,
    targetBHex,
    liquidityControllerBalanceRaw,
  ] = await Promise.all([
    triggerConstant(FOURTEEN_TOKEN_CONTRACT, "totalSupply()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "previewFourteenCurrentPrice()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getFourteenAnnualGrowthRate()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getFourteenLastPriceUpdate()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getFourteenPriceUpdateInterval()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getFourteenOwner()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getFourteenLiquidityPool()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getFourteenAirdropAddress()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "owner()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getSystemCounts()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getSystemRewards()"),
    triggerConstant(FOURTEEN_CONTROLLER_CONTRACT, "getSystemBalances()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "owner()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "MIN_BALANCE()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "DAILY_PERCENT()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "PERCENT_DIVIDER()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "targetA()"),
    triggerConstant(LIQUIDITY_CONTROLLER_CONTRACT, "targetB()"),
    fetchAccountBalanceSun(LIQUIDITY_CONTROLLER_CONTRACT),
  ]);

  const targetAAddress = toAddress(targetAHex) || JUSTMONEY_EXECUTOR_CONTRACT;
  const targetBAddress = toAddress(targetBHex) || SUN_V3_EXECUTOR_CONTRACT;

  const [
    fourteenVaultBalanceRaw,
    teamLockVaultBalanceRaw,
    airdropVaultBalanceRaw,
    targetABalanceRaw,
    targetBBalanceRaw,
  ] = await Promise.all([
    readTokenBalance(FOURTEEN_VAULT_CONTRACT),
    readTokenBalance(TEAM_LOCK_VAULT_CONTRACT),
    readTokenBalance(AIRDROP_VAULT_CONTRACT),
    readTokenBalance(targetAAddress),
    readTokenBalance(targetBAddress),
  ]);

  const totalSupplyRaw = hexToBigInt(totalSupplyHex);
  const currentPriceRaw = hexToBigInt(previewPriceHex);
  const annualGrowthRateRaw = hexToBigInt(annualGrowthRateHex);
  const lastPriceUpdateRaw = hexToBigInt(lastPriceUpdateHex);
  const priceUpdateIntervalRaw = hexToBigInt(priceUpdateIntervalHex);
  const liquidityMinBalanceRaw = hexToBigInt(liquidityMinBalanceHex);
  const liquidityDailyPercentRaw = hexToBigInt(liquidityDailyPercentHex);
  const liquidityPercentDividerRaw = hexToBigInt(liquidityPercentDividerHex);

  const [ambassadorsCountRaw, activeAmbassadorsCountRaw, boundBuyersCountRaw] = splitWords(
    systemCountsHex,
  ).map(hexToBigInt);
  const [trackedVolumeRaw, rewardsAccruedRaw, rewardsClaimedRaw] = splitWords(
    systemRewardsHex,
  ).map(hexToBigInt);
  const [
    controllerBalanceRaw,
    ownerAvailableRaw,
    reservedRewardsRaw,
    unallocatedPurchaseFundsRaw,
  ] = splitWords(systemBalancesHex).map(hexToBigInt);

  const vaultCustodyRaw =
    fourteenVaultBalanceRaw + teamLockVaultBalanceRaw + airdropVaultBalanceRaw;

  const assets: VerificationAssetSnapshot[] = [
    {
      title: "FourteenVault",
      address: FOURTEEN_VAULT_CONTRACT,
      balanceDisplay: formatTokenAmount(fourteenVaultBalanceRaw),
      balanceRaw: fourteenVaultBalanceRaw.toString(),
      role: "Liquidity reserve custody",
      href: MODULE_LINKS.fourteenVault,
    },
    {
      title: "TeamLockVault",
      address: TEAM_LOCK_VAULT_CONTRACT,
      balanceDisplay: formatTokenAmount(teamLockVaultBalanceRaw),
      balanceRaw: teamLockVaultBalanceRaw.toString(),
      role: "Team allocation lock custody",
      href: MODULE_LINKS.teamLockVault,
    },
    {
      title: "AirdropVault",
      address: AIRDROP_VAULT_CONTRACT,
      balanceDisplay: formatTokenAmount(airdropVaultBalanceRaw),
      balanceRaw: airdropVaultBalanceRaw.toString(),
      role: "Community distribution reserve",
      href: MODULE_LINKS.airdropVault,
    },
    {
      title: "JustMoney Executor",
      address: targetAAddress,
      balanceDisplay: formatTokenAmount(targetABalanceRaw),
      balanceRaw: targetABalanceRaw.toString(),
      role: "Prepared 4TEEN inventory for JustMoney liquidity path",
      href:
        targetAAddress === JUSTMONEY_EXECUTOR_CONTRACT
          ? MODULE_LINKS.justMoneyExecutor
          : `https://tronscan.org/#/contract/${targetAAddress}`,
    },
    {
      title: "Sun.io V3 Executor",
      address: targetBAddress,
      balanceDisplay: formatTokenAmount(targetBBalanceRaw),
      balanceRaw: targetBBalanceRaw.toString(),
      role: "Prepared 4TEEN inventory for Sun.io V3 liquidity path",
      href:
        targetBAddress === SUN_V3_EXECUTOR_CONTRACT
          ? MODULE_LINKS.sunV3Executor
          : `https://tronscan.org/#/contract/${targetBAddress}`,
    },
  ];

  return {
    loadedAt: new Date().toISOString(),
    totalSupplyDisplay: formatTokenAmount(totalSupplyRaw),
    totalSupplyRaw: totalSupplyRaw.toString(),
    currentPriceDisplay: formatTrxAmount(currentPriceRaw),
    currentPriceRaw: currentPriceRaw.toString(),
    vaultCustodyDisplay: formatTokenAmount(vaultCustodyRaw),
    vaultCustodyRaw: vaultCustodyRaw.toString(),
    controllerBalanceDisplay: formatTrxAmount(controllerBalanceRaw),
    controllerBalanceRaw: controllerBalanceRaw.toString(),
    ownerAvailableDisplay: formatTrxAmount(ownerAvailableRaw),
    ownerAvailableRaw: ownerAvailableRaw.toString(),
    reservedRewardsDisplay: formatTrxAmount(reservedRewardsRaw),
    reservedRewardsRaw: reservedRewardsRaw.toString(),
    unallocatedPurchaseFundsDisplay: formatTrxAmount(unallocatedPurchaseFundsRaw),
    unallocatedPurchaseFundsRaw: unallocatedPurchaseFundsRaw.toString(),
    trackedVolumeDisplay: formatTrxAmount(trackedVolumeRaw),
    trackedVolumeRaw: trackedVolumeRaw.toString(),
    rewardsAccruedDisplay: formatTrxAmount(rewardsAccruedRaw),
    rewardsAccruedRaw: rewardsAccruedRaw.toString(),
    rewardsClaimedDisplay: formatTrxAmount(rewardsClaimedRaw),
    rewardsClaimedRaw: rewardsClaimedRaw.toString(),
    liquidityControllerBalanceDisplay: formatTrxAmount(liquidityControllerBalanceRaw),
    liquidityControllerBalanceRaw: liquidityControllerBalanceRaw.toString(),
    liquidityMinBalanceDisplay: formatTrxAmount(liquidityMinBalanceRaw),
    liquidityMinBalanceRaw: liquidityMinBalanceRaw.toString(),
    liquidityDailyReleaseLabel: toPercentLabel(
      liquidityDailyPercentRaw,
      liquidityPercentDividerRaw,
    ),
    annualGrowthRateLabel: `${(Number(annualGrowthRateRaw) / 100).toFixed(2)}% / ${Math.max(1, Math.round(Number(priceUpdateIntervalRaw) / 86400))}d`,
    annualGrowthRateRaw: annualGrowthRateRaw.toString(),
    priceUpdateIntervalDays: Math.max(1, Math.round(Number(priceUpdateIntervalRaw) / 86400)),
    priceUpdateIntervalSeconds: Number(priceUpdateIntervalRaw),
    lastPriceUpdateAt: Number(lastPriceUpdateRaw) * 1000,
    tokenOwnerAddress: toAddress(tokenOwnerHex),
    controllerOwnerAddress: toAddress(controllerOwnerHex),
    liquidityControllerOwnerAddress: toAddress(liquidityControllerOwnerHex),
    liquidityPoolAddress: toAddress(liquidityPoolHex),
    airdropAddress: toAddress(airdropAddressHex),
    justMoneyExecutorAddress: targetAAddress,
    sunV3ExecutorAddress: targetBAddress,
    ambassadorsCount: Number(ambassadorsCountRaw),
    activeAmbassadorsCount: Number(activeAmbassadorsCountRaw),
    boundBuyersCount: Number(boundBuyersCountRaw),
    assets,
  };
}
