import type { SupportedSiteLocale } from "@/lib/site-locale";

type HeroStatContent = {
  label: string;
  meta: string;
};

type SimpleCard = {
  eyebrow: string;
  title: string;
  text: string;
};

type BulletCard = SimpleCard & {
  bullets?: string[];
};

export type LiquidityPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    title: string;
    subtitle: string;
    body: string[];
    rotatingLines: string[];
    primaryCta: string;
    secondaryCta: string;
    ctaNote: string;
    stats: {
      controllerBalance: HeroStatContent;
      nextRelease: HeroStatContent;
      triggerFloor: HeroStatContent;
      cadence: HeroStatContent;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    publicRoute: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
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
        windowState: string;
        nextWindow: string;
        snapshotUpdated: string;
      };
      valueLabels: {
        openNow: string;
        waitForThreshold: string;
      };
      stateLabels: {
        ready: string;
        waiting: string;
        threshold: string;
      };
      note: string;
    };
    triggerModel: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
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
    reservePath: {
      eyebrow: string;
      title: string;
      intro: string;
      primaryCard: BulletCard;
      secondaryCards: Array<{
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
    title: "Public Liquidity Controller",
    description:
      "4TEEN public liquidity controller with live controller balance, public bootstrapper trigger path, reserve visibility, and confirmed execution feed.",
  },
  hero: {
    eyebrow: "Liquidity Controller",
    badge: "Public liquidity controller",
    title: "Public 4TEEN Liquidity Controller",
    subtitle:
      "Automation can wake the route, but any wallet can still pull the bootstrapper when the contract gate is open.",
    body: [
      "This page should not read like a closed ops panel. It should make one thing obvious: controller-side TRX is visible, reserve-side inventory is visible, and the release rules still live on-chain.",
      "If the UTC window is open, the controller is above threshold, and the signing wallet has enough network resources, liquidity can still execute from the wallet even if the automation layer misses a day.",
    ],
    rotatingLines: [
      "PUBLIC TRIGGER. CONTRACT GATE.",
      "AUTOMATION HELPS. CONTRACTS DECIDE.",
      "BOOTSTRAP FIRST. EXECUTE ON-CHAIN.",
    ],
    primaryCta: "Open Wallet Route",
    secondaryCta: "Jump to Live Executions",
    ctaNote:
      "The website is the proof layer. The wallet is the execution surface for manual trigger, resource checks, and final signing.",
    stats: {
      controllerBalance: {
        label: "Controller Balance",
        meta: "TRX currently waiting inside FourteenLiquidityController.",
      },
      nextRelease: {
        label: "Next Release",
        meta: "Projected TRX release when the contract window is valid.",
      },
      triggerFloor: {
        label: "Trigger Floor",
        meta: "Minimum controller balance required before execution is valid.",
      },
      cadence: {
        label: "Cadence",
        meta: "Once per UTC day. The gate is enforced by contract, not by automation.",
      },
      readFailed: "Live liquidity read failed.",
      readRetry: "Try refreshing in a moment.",
    },
  },
  sections: {
    publicRoute: {
      eyebrow: "Public Route",
      title: "Automation is configured. Public execution still belongs to the wallet.",
      intro:
        "The wallet app already carries the automation path, but the more important message is broader than that: this route is still public. A signing wallet can wake the bootstrapper when the contract conditions are already satisfied.",
      mainCard: {
        eyebrow: "Public Liquidity Controller",
        title: "Any wallet can wake the route. The controller still decides whether liquidity actually moves.",
        text:
          "That is the right separation of powers. Automation is allowed to help with timing, but the controller and bootstrapper remain the authority layer. The execution path does not disappear if a bot pauses.",
        bullets: [
          "Direct 4TEEN buys send 90% of purchase TRX into the controller balance.",
          "LiquidityBootstrapper prepares the token side from FourteenVault before the controller executes.",
          "The once-per-UTC-day rule, the minimum balance, the release percentage, and the split stay on-chain.",
        ],
      },
      cards: [
        {
          eyebrow: "Automation",
          title: "The wallet repo already wires the wake-up path",
          text:
            "The mobile flow exposes the liquidity trigger and the automation helper together. That makes the scheduler visible, but it does not turn the scheduler into a hidden operator.",
        },
        {
          eyebrow: "Manual trigger",
          title: "If automation misses, a user can still sign the route manually",
          text:
            "The wallet can call bootstrapAndExecute() from a normal user session. If the gate is open and resources are available, liquidity still goes through.",
        },
      ],
      note:
        "This is why the page should speak about a public controller, not about a private back office. The route survives beyond the automation layer.",
    },
    liveState: {
      eyebrow: "Live Controller State",
      title: "What the controller says right now",
      rows: {
        controllerBalance: "Controller Balance",
        latestFunding: "Latest Funding",
        latestFundingAt: "Latest Funding At",
        lastExecute: "Last Execute",
        minBalance: "Min Balance",
        dailyRelease: "Daily Release",
        split: "Target Split",
        windowState: "Window State",
        nextWindow: "Next Window",
        snapshotUpdated: "Snapshot Updated",
      },
      valueLabels: {
        openNow: "Open now",
        waitForThreshold: "Wait for funding",
      },
      stateLabels: {
        ready: "Ready now",
        waiting: "Already executed today",
        threshold: "Below threshold",
      },
      note:
        "The snapshot is useful because it separates moving parts cleanly: controller TRX, funding cadence, release size, threshold, and time gate all stay visible at once.",
    },
    triggerModel: {
      eyebrow: "Trigger Model",
      title: "What actually happens when someone taps Trigger Liquidity",
      intro:
        "The route is simple when stated honestly: first the bootstrapper checks the day gate and tops up executor inventory, then the controller releases TRX, then the two market paths receive their split.",
      mainCard: {
        eyebrow: "bootstrapAndExecute()",
        title: "The trigger path is public, resource-aware, and still ruled by contracts.",
        text:
          "This is not a fake admin button. The wallet has to satisfy normal network conditions, and the route only continues if the same controller rules still pass at execution time.",
        bullets: [
          "Step 1: bootstrapper checks the controller window and computes the allowed release size.",
          "Step 2: bootstrapper tops up executor-side 4TEEN from FourteenVault before the market-side leg runs.",
          "Step 3: controller executes the release and splits flow 50 / 50 across JustMoney and Sun.io V3.",
        ],
      },
      cards: [
        {
          eyebrow: "Resources",
          title: "A normal wallet can cover the route with rent or preloaded energy",
          text:
            "The app already frames this as a resource-aware action. The point is not a hidden server key. The point is that a public wallet can still finish the route cleanly.",
        },
        {
          eyebrow: "Rule set",
          title: "Scheduler convenience never overrides the contract rule set",
          text:
            "Missing the bot window does not rewrite the cadence. Hitting the button early does not bypass the gate. Contracts still accept or reject the route.",
        },
      ],
      note:
        "That is the right market signal: public trigger, visible reserve prep, deterministic release rule.",
    },
    latestExecutions: {
      eyebrow: "Latest Executions",
      title: "Confirmed liquidity executions from the live feed",
      body:
        "This list stays intentionally tight. It shows the latest confirmed execution rows so a user can verify that the controller is alive without turning the page into a noisy block explorer clone.",
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
        "Each row comes from confirmed LiquidityExecuted(day, totalAmount, amountA, amountB) events.",
    },
    reservePath: {
      eyebrow: "Reserve Path",
      title: "Reserve tokens are inventory, not free circulation",
      intro:
        "Controller-side TRX is only half the route. The token side needs isolated inventory too, and that is why FourteenVault exists before the two execution paths receive their balances.",
      primaryCard: {
        eyebrow: "Reserve layer",
        title: "FourteenVault backs the public liquidity route before market execution begins.",
        text:
          "These 4TEEN balances should be read as reserve-side working inventory. They are not ordinary wallet balances and they should not be framed like freely circulating supply.",
        bullets: [
          "Vault inventory is topped into the bootstrapper path before the controller executes.",
          "JustMoney and Sun.io V3 receive prepared balances only when the route is valid.",
          "Reserve custody, controller TRX, and executor destinations are separate layers of the same engine.",
        ],
      },
      secondaryCards: [
        {
          key: "justmoney",
          title: "JustMoney path",
          body:
            "Executor A takes half of the allowed release and runs the AMM-side liquidity path after its token inventory has been prepared.",
        },
        {
          key: "sun",
          title: "Sun.io V3 path",
          body:
            "Executor B takes the other half and routes it through the concentrated-liquidity path with its own prepared token side.",
        },
      ],
      note:
        "This is why the page should explain a route, not just print one vanity total. Reserve inventory, controller balance, and execution destinations do different jobs.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Open the proof layer",
      body:
        "Jump straight from the story into the rails underneath it: the controller contract, bootstrapper route, executor contracts, and the wallet implementation that exposes both automation and manual trigger.",
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
      title: "Open the wallet when you want to wake the route yourself",
      body:
        "The site is where you verify the state. The mobile wallet is where a real user can inspect resources, call the bootstrapper, and sign the route if the controller gate is already open.",
      openApp: "Open Liquidity in App",
      openBuy: "Open Buy Route",
    },
  },
};

const liquidityContentByLocale: Partial<
  Record<SupportedSiteLocale, LiquidityPageContent>
> = {
  en: liquidityContentEn,
};

export function getLiquidityPageContent(locale: SupportedSiteLocale) {
  return liquidityContentByLocale[locale] ?? liquidityContentEn;
}
