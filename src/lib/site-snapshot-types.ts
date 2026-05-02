export type LiveBuyEvent = {
  buyerAddress: string;
  buyerShort: string;
  trxAmountDisplay: string;
  tokensAmountDisplay: string;
  happenedAt: number;
  txId: string;
  txUrl: string;
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
  platformRoutes: ReadonlyArray<{
    key: string;
    title: string;
    bit: number;
    status: string;
    note: string;
    href: string;
  }>;
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

export type LiveAmbassadorLevel = {
  key: string;
  label: string;
  buyersRange: string;
  rewardPercent: number;
};

export type LiveAmbassadorSnapshot = {
  contractAddress: string;
  loadedAt: string;
  levels: LiveAmbassadorLevel[];
  system: {
    ambassadorsCount: number;
    activeAmbassadorsCount: number;
    boundBuyersCount: number;
    trackedVolumeRaw: string;
    trackedVolumeDisplay: string;
    rewardsAccruedRaw: string;
    rewardsAccruedDisplay: string;
    rewardsClaimedRaw: string;
    rewardsClaimedDisplay: string;
    controllerBalanceRaw: string;
    controllerBalanceDisplay: string;
    ownerAvailableBalanceRaw: string;
    ownerAvailableBalanceDisplay: string;
    reservedRewardsRaw: string;
    reservedRewardsDisplay: string;
    unallocatedPurchaseFundsRaw: string;
    unallocatedPurchaseFundsDisplay: string;
  };
  db: {
    purchasesTotal: number;
    purchasesProcessed: number;
    purchasesPending: number;
    ambassadorsWithPurchases: number;
    buyersTotal: number;
    withdrawalsCount: number;
    profilesTotal: number;
    profilesOnChain: number;
    profilesActive: number;
    latestPurchaseAt: number;
    latestPurchaseLabel: string;
    latestWithdrawalAt: number;
    latestWithdrawalLabel: string;
  };
  runtime: {
    operatorWallet: string | null;
    requirements: {
      requiredEnergy: number;
      requiredBandwidth: number;
      minEnergyFloor: number;
      minBandwidthFloor: number;
    };
    resourceState?: {
      walletAddress?: string;
      energyAvailable?: number;
      bandwidthAvailable?: number;
      energyAfter?: number;
      bandwidthAfter?: number;
      hasEnough?: boolean;
    } | null;
    resources?: {
      walletAddress?: string;
      energyAvailable?: number;
      bandwidthAvailable?: number;
    } | null;
    runtime?: {
      enabled?: boolean;
      ready?: boolean;
      mode?: string | null;
    } | null;
    readyNow: boolean;
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

export const unlockVerificationLinks = {
  controller: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
  token: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
} as const;

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

export const liquidityVerificationLinks = {
  bootstrapper: "https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc",
  controller: "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ",
} as const;

type SwapTargetKey = "TRX" | "USDT";

type RouteSample = {
  targetKey: SwapTargetKey;
  targetSymbol: string;
  expectedOutDisplay: string;
  routeLabel: string;
  executionLabel: string;
  impactLabel: string;
  pathLabel: string;
  isExecutable: boolean;
};

export type SwapSnapshot = {
  sampleAmount: string;
  supportedTargets: number;
  protectedRemainder: string;
  routerState: "live" | "partial" | "offline";
  updatedAt: number;
  routes: RouteSample[];
};

export const swapVerificationLinks = {
  router: "https://tronscan.org/#/contract/TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j",
  token: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
} as const;

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

export const verificationLinks = {
  token: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
  controller: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
  liquidityController: "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ",
  bootstrapper: "https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc",
  fourteenVault: "https://tronscan.org/#/contract/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq",
  teamLockVault: "https://tronscan.org/#/contract/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h",
  airdropVault: "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
  justMoneyExecutor: "https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F",
  sunV3Executor: "https://tronscan.org/#/contract/TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh",
} as const;
