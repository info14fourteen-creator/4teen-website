import type { SupportedSiteLocale } from "@/lib/site-locale";

export type LiquidityPageContent = {
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
      controllerBalance: string;
      controllerBalanceMeta: string;
      nextRelease: string;
      nextReleaseMeta: string;
      vaultReserve: string;
      vaultReserveMeta: string;
      windowState: string;
      windowStateMeta: string;
      readFailed: string;
      readRetry: string;
    };
    states: {
      ready: string;
      waiting: string;
      threshold: string;
    };
  };
  sections: {
    appRoute: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      openApp: string;
      openBuy: string;
    };
    liveState: {
      eyebrow: string;
      title: string;
      rows: {
        controllerBalance: string;
        latestFunding: string;
        latestFundingAt: string;
        lastExecute: string;
        minBalance: string;
        dailyRelease: string;
        split: string;
        nextWindow: string;
        snapshotUpdated: string;
      };
      valueLabels: {
        openNow: string;
        waitForThreshold: string;
      };
      note: string;
    };
    triggerModel: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    latestExecutions: {
      eyebrow: string;
      title: string;
      body: string;
      headers: {
        total: string;
        split: string;
        happened: string;
        day: string;
        source: string;
      };
      empty: string;
      openTx: string;
      note: string;
    };
    reserveLayer: {
      eyebrow: string;
      title: string;
      body: string;
      cards: Array<{
        key: string;
        title: string;
        body: string;
      }>;
      note: string;
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      labels: {
        controller: string;
        bootstrapper: string;
        justMoney: string;
        sunV3: string;
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

const liquidityContentEn: LiquidityPageContent = {
  metadata: {
    title: "Liquidity",
    description:
      "Public 4TEEN liquidity controller map with live controller balance, next release size, FourteenVault reserve, latest confirmed executions, and contract-enforced trigger rules.",
  },
  hero: {
    eyebrow: "Liquidity Controller",
    status: "Public execution rail",
    title:
      "Liquidity is not a vague market promise here: direct-buy TRX lands in a controller, release rules live on-chain, and the execution path is visible.",
    lead:
      "The mobile wallet exposes liquidity as a real control surface. The public site should stay informational, but it can still show the live controller balance, the size of the next release, the reserve tokens parked in FourteenVault, and the latest confirmed execution rows that already moved TRX into DEX paths.",
    stats: {
      controllerBalance: "Controller Balance",
      controllerBalanceMeta: "TRX currently sitting inside FourteenLiquidityController.",
      nextRelease: "Next Release",
      nextReleaseMeta: "6.43% of controller balance when the contract window is open.",
      vaultReserve: "FourteenVault Reserve",
      vaultReserveMeta: "4TEEN token reserve used by the bootstrapper before execution.",
      windowState: "Window State",
      windowStateMeta: "Threshold and once-per-UTC-day rule are both enforced on-chain.",
      readFailed: "Live liquidity read failed.",
      readRetry: "Try refreshing in a moment.",
    },
    states: {
      ready: "Ready now",
      waiting: "Already executed today",
      threshold: "Below threshold",
    },
  },
  sections: {
    appRoute: {
      eyebrow: "Wallet Route",
      title: "Execution belongs to the mobile wallet, not to the website",
      body:
        "The website can explain controller state and show public execution history. The actual trigger route belongs to the app because it needs a full-access signing wallet, live resource estimation, and final transaction approval.",
      bullets: [
        "Direct 4TEEN buy routes 90% of purchase TRX into the controller balance.",
        "LiquidityBootstrapper tops up executor token balances from FourteenVault before each release.",
        "The website stays read-only. The wallet is the execution surface when a real trigger is needed.",
      ],
      openApp: "Open Mobile App Route",
      openBuy: "Open Buy Route",
    },
    liveState: {
      eyebrow: "Live Controller State",
      title: "What the contracts say right now",
      rows: {
        controllerBalance: "Controller Balance",
        latestFunding: "Latest Funding",
        latestFundingAt: "Latest Funding At",
        lastExecute: "Last Execute",
        minBalance: "Min Balance",
        dailyRelease: "Daily Release",
        split: "Target Split",
        nextWindow: "Next Window",
        snapshotUpdated: "Snapshot Updated",
      },
      valueLabels: {
        openNow: "Open now",
        waitForThreshold: "Wait for funding",
      },
      note:
        "Auto-trigger can wake the flow up, but it does not own the rules. Threshold, percentage, split, and once-per-UTC-day cadence remain enforced inside the controller and bootstrapper contracts.",
    },
    triggerModel: {
      eyebrow: "Trigger Model",
      title: "How liquidity actually fires",
      cards: [
        {
          eyebrow: "Automatic",
          title: "Automation can call the route when conditions are satisfied",
          text: "The wallet implementation describes automation as an external wake-up layer. It does not invent the release schedule. The contracts still decide whether the trigger is valid.",
        },
        {
          eyebrow: "Bootstrapper",
          title: "Vault top-up happens before the controller executes",
          text: "LiquidityBootstrapper checks the open window, computes the same daily amount as the controller, prepares executor token balances from FourteenVault, and only then calls executeLiquidity().",
        },
        {
          eyebrow: "Manual",
          title: "If automation misses, a signing wallet can still pull the trigger",
          text: "The route is public. If the UTC-day gate is open, the controller balance is above threshold, and a wallet has enough network resources, the mobile app can still call bootstrapAndExecute() manually.",
        },
      ],
      note:
        "That is the important product distinction: automation is convenience, not authority. The rule set remains live even if the automation side pauses.",
    },
    latestExecutions: {
      eyebrow: "Latest Executions",
      title: "Recent confirmed liquidity releases from the live contract feed",
      body:
        "This table stays intentionally bounded. It shows only the latest confirmed execution rows, enough to verify that the route is alive without turning the page into an endless event archive.",
      headers: {
        total: "Total Released",
        split: "Split",
        happened: "Happened",
        day: "UTC Day",
        source: "Source",
      },
      empty: "No confirmed LiquidityExecuted rows are visible yet.",
      openTx: "Open tx",
      note:
        "Only the latest 10 confirmed execution events are loaded here by design. Each row is taken from LiquidityExecuted(day, totalAmount, amountA, amountB).",
    },
    reserveLayer: {
      eyebrow: "Reserve Path",
      title: "What sits behind the release before TRX reaches DEX liquidity",
      body:
        "FourteenVault is a reserve contract, not free circulation. The bootstrapper uses it to supply executor-side 4TEEN before the controller pushes TRX out. That keeps liquidity inventory isolated from ordinary wallet balances and from other reserve vaults.",
      cards: [
        {
          key: "vault",
          title: "FourteenVault",
          body: "Token reserve used for liquidity preparation. These 4TEEN balances should not be treated as freely circulating supply.",
        },
        {
          key: "justmoney",
          title: "JustMoney Path",
          body: "Executor A receives half of the release amount in TRX and gets topped up with the token side before add-liquidity logic runs.",
        },
        {
          key: "sun",
          title: "Sun.io V3 Path",
          body: "Executor B receives the other half of the release and follows the concentrated-liquidity path after the bootstrapper has prepared token inventory.",
        },
      ],
      note:
        "This is why liquidity is shown as architecture, not as a single marketing number. Controller TRX, reserve tokens, and executor routes are separate layers.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Where the explanation and numbers come from",
      body:
        "This page reads the deployed controller state and the latest confirmed execution events, then aligns that with the wallet-side liquidity controller implementation and the published contract repository. It explains the real trigger topology instead of flattening it into a generic market card.",
      labels: {
        controller: "FourteenLiquidityController",
        bootstrapper: "LiquidityBootstrapper",
        justMoney: "JustMoney executor",
        sunV3: "Sun.io V3 executor",
        contractsRepo: "Contracts repository",
        walletRepo: "Wallet repository",
      },
    },
    cta: {
      eyebrow: "Next Step",
      title: "Use the app when you want to inspect resources or trigger execution",
      body:
        "The site is the proof layer. The mobile wallet is the execution layer for manual trigger, resource estimation, and final signing.",
      openApp: "Open Liquidity in App",
      openBuy: "Open Buy Route",
    },
  },
};

const liquidityContentByLocale: Partial<Record<SupportedSiteLocale, LiquidityPageContent>> = {
  en: liquidityContentEn,
};

export function getLiquidityPageContent(locale: SupportedSiteLocale) {
  return liquidityContentByLocale[locale] ?? liquidityContentEn;
}
