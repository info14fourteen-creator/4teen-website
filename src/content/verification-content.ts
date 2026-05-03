import type { SupportedSiteLocale } from "@/lib/site-locale";

export type VerificationPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
    stats: {
      totalSupply: string;
      totalSupplyMeta: string;
      currentPrice: string;
      currentPriceMeta: string;
      vaultCustody: string;
      vaultCustodyMeta: string;
      controllerBalance: string;
      controllerBalanceMeta: string;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    orientation: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      openWhitepaper: string;
      openApp: string;
    };
    tokenMap: {
      eyebrow: string;
      title: string;
      rows: {
        tokenOwner: string;
        liquidityRoute: string;
        airdropRoute: string;
        directPrice: string;
        growthRule: string;
        lastPriceUpdate: string;
        snapshotUpdated: string;
      };
      note: string;
    };
    controllerState: {
      eyebrow: string;
      title: string;
      rows: {
        controllerOwner: string;
        contractBalance: string;
        ownerAvailable: string;
        reservedRewards: string;
        unallocatedPurchaseFunds: string;
        ambassadors: string;
        activeAmbassadors: string;
        boundBuyers: string;
        trackedVolume: string;
        rewardsClaimed: string;
      };
      note: string;
    };
    liquidityState: {
      eyebrow: string;
      title: string;
      rows: {
        controllerBalance: string;
        controllerOwner: string;
        minBalance: string;
        dailyRelease: string;
        justMoneyExecutor: string;
        sunExecutor: string;
      };
      note: string;
    };
    architecture: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    reserveLayer: {
      eyebrow: string;
      title: string;
      body: string;
      note: string;
      labels: {
        balance: string;
        verify: string;
      };
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      groups: {
        core: string;
        vaults: string;
        execution: string;
        source: string;
      };
      labels: {
        token: string;
        controller: string;
        liquidityController: string;
        bootstrapper: string;
        fourteenVault: string;
        teamLockVault: string;
        airdropVault: string;
        justMoneyExecutor: string;
        sunV3Executor: string;
        contractsRepo: string;
        walletRepo: string;
      };
    };
    cta: {
      eyebrow: string;
      title: string;
      body: string;
      openApp: string;
      openBuy: string;
    };
  };
};

const verificationContentEn: VerificationPageContent = {
  metadata: {
    title: "Verification",
    description:
      "4TEEN verification route with live addresses, reserve balances, protocol ownership map, and direct proof links for deeper research.",
  },
  hero: {
    eyebrow: "Verification Surface",
    status: "Public architecture map",
    title:
      "This is the confidence layer: who owns what, where reserves sit, how value moves, and which public addresses back the project right now.",
    lead:
      "Serious users and investors do not stop at the landing page. This route gives them a fast way to inspect ownership, custody, balances, and contract paths without dropping them into a wall of raw explorer tabs on the first click.",
    stats: {
      totalSupply: "Total Supply",
      totalSupplyMeta: "Current FourteenToken totalSupply on-chain.",
      currentPrice: "Direct Price",
      currentPriceMeta: "Current preview price for buyTokens(), expressed in TRX.",
      vaultCustody: "Vault Custody",
      vaultCustodyMeta: "4TEEN currently parked in FourteenVault, TeamLockVault, and AirdropVault.",
      controllerBalance: "Controller Balance",
      controllerBalanceMeta: "TRX currently sitting inside FourteenController.",
      readFailed: "Live verification read failed.",
      readRetry: "The static architecture map is still valid. Refresh in a moment for current numbers.",
    },
  },
  sections: {
    orientation: {
      eyebrow: "Orientation",
      title: "Use this page to answer two questions quickly",
      body:
        "First: which contract or vault owns a specific protocol job. Second: whether the public state still matches the story the project is telling everywhere else. The page stays read-only on purpose. Its job is confidence, not execution.",
      bullets: [
        "FourteenToken is the buy, mint, lock, and split-entry contract.",
        "FourteenController is the admin and attribution layer, not the token itself.",
        "LiquidityController and LiquidityBootstrapper own the release-and-execution rail.",
        "Vault balances exist on-chain, but reserve custody is not free circulation.",
      ],
      openWhitepaper: "Open Whitepaper",
      openApp: "Open Mobile App",
    },
    tokenMap: {
      eyebrow: "Token Map",
      title: "How the main token is wired right now",
      rows: {
        tokenOwner: "Token Owner",
        liquidityRoute: "Liquidity Route",
        airdropRoute: "Airdrop Route",
        directPrice: "Direct Price",
        growthRule: "Growth Rule",
        lastPriceUpdate: "Last Price Update",
        snapshotUpdated: "Snapshot Updated",
      },
      note:
        "The key detail is the ownership chain. FourteenToken does not sit under a casual owner-wallet story. The owner path resolves into FourteenController, which is why both surfaces belong together here.",
    },
    controllerState: {
      eyebrow: "Controller State",
      title: "What the controller says about attribution and treasury flow",
      rows: {
        controllerOwner: "Controller Owner",
        contractBalance: "Contract Balance",
        ownerAvailable: "Owner Available",
        reservedRewards: "Reserved Rewards",
        unallocatedPurchaseFunds: "Unallocated Purchase Funds",
        ambassadors: "Total Ambassadors",
        activeAmbassadors: "Active Ambassadors",
        boundBuyers: "Bound Buyers",
        trackedVolume: "Tracked Volume",
        rewardsClaimed: "Rewards Claimed",
      },
      note:
        "This is why the controller story matters. It keeps separate public buckets for owner-available funds, reserved rewards, tracked volume, and buyer attribution counts instead of flattening everything into one vanity metric.",
    },
    liquidityState: {
      eyebrow: "Liquidity Rail",
      title: "The execution side is a separate public system",
      rows: {
        controllerBalance: "Liquidity Controller Balance",
        controllerOwner: "Liquidity Controller Owner",
        minBalance: "Minimum Trigger Balance",
        dailyRelease: "Daily Release Rule",
        justMoneyExecutor: "JustMoney Executor",
        sunExecutor: "Sun.io V3 Executor",
      },
      note:
        "Automation can wake the route up, but the release threshold and percentage still live in the contracts. Convenience sits outside the rules, not above them.",
    },
    architecture: {
      eyebrow: "Architecture",
      title: "The protocol is separated into explicit jobs instead of one giant contract",
      cards: [
        {
          eyebrow: "Core",
          title: "FourteenToken",
          text: "Receives direct buy TRX, mints 4TEEN, creates per-purchase 14-day locks, and atomically splits purchase value 90 / 7 / 3.",
        },
        {
          eyebrow: "Admin",
          title: "FourteenController",
          text: "Owns the token layer, holds attribution and reward accounting state, exposes public system summaries, and gates owner-side balance handling.",
        },
        {
          eyebrow: "Execution",
          title: "Liquidity Stack",
          text: "FourteenLiquidityController holds the buy-side TRX rail, while LiquidityBootstrapper prepares token inventory and triggers executor-side liquidity paths.",
        },
        {
          eyebrow: "Custody",
          title: "Vault Separation",
          text: "FourteenVault, TeamLockVault, and AirdropVault isolate reserve balances by purpose, so treasury, team, and growth supply are not flattened into one generic pool.",
        },
      ],
      note:
        "That separation is one of the easiest strengths to verify publicly. Explorer links, repository code, and live balances all point back to the same modular architecture.",
    },
    reserveLayer: {
      eyebrow: "Reserve Layer",
      title: "Live 4TEEN balances across vault and execution addresses",
      body:
        "These balances show where token inventory actually sits. Vault custody is not free circulation, and executor inventory is not a user wallet balance. Keeping them together makes the system readable at a glance.",
      note:
        "Executor balances can move as bootstrap and liquidity flow shift inventory around. Vault balances are the steadier proof layer for reserve custody.",
      labels: {
        balance: "Balance",
        verify: "Verify on Tronscan",
      },
    },
    verification: {
      eyebrow: "Proof Links",
      title: "Open the proof layer directly",
      body:
        "Each group below takes the user straight from the story into the proof layer: contracts, vaults, execution rails, and the repos behind the product.",
      groups: {
        core: "Core contracts",
        vaults: "Vault contracts",
        execution: "Execution contracts",
        source: "Source repositories",
      },
      labels: {
        token: "FourteenToken",
        controller: "FourteenController",
        liquidityController: "FourteenLiquidityController",
        bootstrapper: "LiquidityBootstrapper",
        fourteenVault: "FourteenVault",
        teamLockVault: "TeamLockVault",
        airdropVault: "AirdropVault",
        justMoneyExecutor: "LiquidityExecutorJustMoney",
        sunV3Executor: "LiquidityExecutorSunV3",
        contractsRepo: "Contracts repository",
        walletRepo: "Wallet repository",
      },
    },
    cta: {
      eyebrow: "Next Step",
      title: "Build conviction here, then move in the app",
      body:
        "Use the public route to inspect the system. Use the wallet when you want signing, buy, unlock, swap, airdrop claim, or manual liquidity action with real account state behind it.",
      openApp: "Open Mobile App",
      openBuy: "Open Buy Route",
    },
  },
};

const verificationContentByLocale: Partial<
  Record<SupportedSiteLocale, VerificationPageContent>
> = {
  en: verificationContentEn,
};

export function getVerificationPageContent(locale: SupportedSiteLocale) {
  return verificationContentByLocale[locale] ?? verificationContentEn;
}
