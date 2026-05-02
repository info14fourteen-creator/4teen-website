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
      "Public 4TEEN verification map with live on-chain module addresses, token and controller state, reserve custody balances, liquidity execution pointers, and source repositories.",
  },
  hero: {
    eyebrow: "Verification Surface",
    status: "Public architecture map",
    title:
      "This route is the compact proof layer: which contracts own what, where the reserves sit, how purchase value is routed, and which public addresses back the system right now.",
    lead:
      "The mobile app already uses an info-style screen to orient the user around token minting, controller logic, liquidity execution, vault custody, and operator-side rails. The public website can do the same without pretending to be a wallet: live contract addresses, live balances, public treasury state, and direct explorer paths are enough to verify the system honestly.",
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
        "First: which contract or vault is responsible for a protocol job. Second: whether the public state still matches the architecture we describe everywhere else. The page stays read-only on purpose. Its job is proof, not execution.",
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
        "The useful verification detail here is the ownership chain. FourteenToken does not sit under an ordinary owner wallet in practice. The owner path resolves into FourteenController, which is exactly why the verification layer should show both contracts together.",
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
        "This is why ambassador and controller stories cannot be reduced to a single referral slogan. The contract keeps separate public buckets for owner-available funds, reserved rewards, tracked volume, and buyer attribution counts.",
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
        "Automation may wake the route up, but the release threshold and percentage remain contract-enforced. Even this proof page should keep that distinction clear: convenience sits outside the rules, not above them.",
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
        "That separation is one of the easiest things to verify publicly. Explorer links, repository code, and live balances all point back to the same modular architecture story.",
    },
    reserveLayer: {
      eyebrow: "Reserve Layer",
      title: "Live 4TEEN balances across vault and execution addresses",
      body:
        "These balances are useful because they show where token inventory actually sits. Vault custody should not be treated as free circulation, and executor inventory should not be confused with user balances. The page keeps them together so the architecture can be read as a system, not as random addresses.",
      note:
        "Executor balances can change as bootstrap and liquidity flow move inventory around. Vault balances are the more stable proof layer for reserve custody.",
      labels: {
        balance: "Balance",
        verify: "Verify on Tronscan",
      },
    },
    verification: {
      eyebrow: "Proof Links",
      title: "Explorer routes and repositories behind the public system",
      body:
        "When frontend copy and on-chain state ever disagree, on-chain state wins. This page therefore keeps the verification exits close: core contracts, vault contracts, execution contracts, and the source repositories that explain the architecture in plain language.",
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
      title: "Use the app when proof needs to become action",
      body:
        "Verification belongs on the public site. Signing, buy, unlock, swap, airdrop claim, and manual liquidity triggering belong in the mobile wallet because that is where resources, approval, and transaction intent are actually handled.",
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
