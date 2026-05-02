const SITE_PUBLIC_AMBASSADOR_URL = "https://api.4teen.me/site/ambassador";
const SITE_PUBLIC_SUMMARY_URL = "https://api.4teen.me/site/summary";
const LIVE_REVALIDATE_SECONDS = 120;
const LIVE_FETCH_TIMEOUT_MS = 15000;

type SitePublicSnapshotResponse<T> = {
  ok?: boolean;
  snapshot?: T | null;
  stale?: boolean;
  fetchedAt?: string | null;
  updatedAt?: string | null;
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

type SummarySnapshotResponse = {
  ok?: boolean;
  ambassador?: SitePublicSnapshotResponse<LiveAmbassadorSnapshot> | null;
};

export async function getLiveAmbassadorSnapshot() {
  try {
    const response = await fetch(SITE_PUBLIC_AMBASSADOR_URL, {
      next: { revalidate: LIVE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ambassador public snapshot`);
    }

    const payload =
      (await response.json()) as SitePublicSnapshotResponse<LiveAmbassadorSnapshot>;

    if (!payload?.ok || !payload.snapshot) {
      throw new Error("Ambassador public snapshot is missing");
    }

    return payload.snapshot;
  } catch (_) {
    const response = await fetch(SITE_PUBLIC_SUMMARY_URL, {
      next: { revalidate: LIVE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(LIVE_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ambassador summary fallback`);
    }

    const payload = (await response.json()) as SummarySnapshotResponse;
    const snapshot = payload?.ambassador?.snapshot;

    if (!payload?.ok || !snapshot) {
      throw new Error("Ambassador summary fallback is missing");
    }

    return snapshot;
  }
}
