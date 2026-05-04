import type { SupportedSiteLocale } from "@/lib/site-locale";

type ActionLink = {
  label: string;
  href: string;
};

type SmartLink = ActionLink & {
  external?: boolean;
  value?: string;
};

type HeroTool = {
  href: string;
  title: string;
  meta: string;
};

type WalletItem = {
  name: string;
  note: string;
};

type HowStep = {
  step: string;
  title: string;
  text: string;
};

type WhyCard = {
  number: string;
  title: string;
  text: string;
  note: string;
};

type ToolCard = {
  status: string;
  tone: "live" | "wait";
  title: string;
  text: string;
  href: string;
};

type VerifyLink = {
  label: string;
  value: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type HomePageContent = {
  ui: {
    aria: {
      heroPoints: string;
      livePriceSummary: string;
      quickLinks: string;
      verificationLinks: string;
    };
    marketStrip: {
      unavailable: string;
      routerQuoteReadFailed: string;
      directPriceLabel: string;
      directPriceSub: string;
      dexReferenceLabel: string;
      dexPriceLabel: string;
      dexSubSuffix: string;
      unlockCycleLabel: string;
      unlockCycleValue: string;
      unlockCycleSub: string;
      unlockCycleDailyRuleSub: string;
      dailyLiquidityRuleLabel: string;
      dailyLiquidityRuleValue: string;
      dailyLiquidityRuleSub: string;
    };
  };
  hero: {
    eyebrow: string;
    meta: string;
    title: string;
    lead: string;
    points: string[];
    actions: [ActionLink, ActionLink];
    sideEyebrow: string;
    sideTitle: string;
    sideStats: Array<{
      label: string;
      value: string;
    }>;
    sideHighlightTitle: string;
    sideHighlightText: string;
    tools: HeroTool[];
  };
  wallets: {
    eyebrow: string;
    title: string;
    description: string;
    bestStatus: string;
    bestItems: WalletItem[];
    compatibleStatus: string;
    compatibleItems: WalletItem[];
    highlightTitle: string;
    highlightText: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    links: Array<{
      label: string;
      value: string;
      href: string;
      external?: boolean;
    }>;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: HowStep[];
    airdropStep: {
      step: string;
      title: string;
      text: string;
      items: Array<{
        value: string;
        label: string;
      }>;
    };
    cabinetStep: {
      step: string;
      title: string;
      text: string;
    };
  };
  architecture: {
    eyebrow: string;
    title: string;
    description: string;
    entry: {
      label: string;
      title: string;
      text: string;
    };
    core: {
      label: string;
      title: string;
      text: string;
      pills: string[];
    };
    liquidity: {
      eyebrow: string;
      title: string;
      text: string;
      controller: {
        label: string;
        title: string;
        text: string;
      };
      vault: {
        label: string;
        title: string;
        text: string;
      };
      bootstrapper: {
        label: string;
        title: string;
        text: string;
      };
      executors: Array<{
        label: string;
        title: string;
        text: string;
      }>;
    };
    ambassadors: {
      eyebrow: string;
      title: string;
      text: string;
      controller: {
        label: string;
        title: string;
        text: string;
      };
      flow: {
        label: string;
        title: string;
        text: string;
      };
      ladderTitle: string;
      ladder: Array<{
        level: string;
        buyers: string;
        percent: string;
      }>;
      noteTitle: string;
      noteText: string;
    };
    airdrop: {
      eyebrow: string;
      title: string;
      text: string;
      vault: {
        label: string;
        title: string;
        text: string;
      };
      model: {
        label: string;
        title: string;
        text: string;
      };
      pills: Array<{
        label: string;
        tone: "live" | "wait";
      }>;
      liveRoute: {
        label: string;
        title: string;
        text: string;
        action: ActionLink;
      };
      snapshotTitle: string;
      snapshotRows: Array<{
        label: string;
        value: string;
      }>;
    };
    facts: Array<{
      label: string;
      text: string;
    }>;
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    cards: WhyCard[];
    notePrefix: string;
  };
  liveMetrics: {
    eyebrow: string;
    title: string;
    description: string;
    liquidity: {
      eyebrow: string;
      title: string;
      note: string;
      rows: Array<{
        label: string;
        value: string;
        tone?: "live" | "wait" | "strong";
      }>;
    };
    ambassadors: {
      eyebrow: string;
      title: string;
      note: string;
      ladder: Array<{
        level: string;
        meta: string;
        value: string;
      }>;
    };
    airdrop: {
      eyebrow: string;
      title: string;
      rows: Array<{
        label: string;
        value: string;
        tone?: "live" | "wait" | "strong";
      }>;
      action: ActionLink;
    };
  };
  tools: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ToolCard[];
  };
  verification: {
    eyebrow: string;
    title: string;
    description: string;
    contracts: {
      eyebrow: string;
      title: string;
      links: VerifyLink[];
    };
    repositories: {
      eyebrow: string;
      title: string;
      links: VerifyLink[];
    };
    docs: {
      eyebrow: string;
      title: string;
      links: VerifyLink[];
    };
    hubs: {
      eyebrow: string;
      title: string;
      links: VerifyLink[];
    };
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FaqItem[];
  };
  risk: {
    eyebrow: string;
    title: string;
    description: string;
    understandTitle: string;
    understandItems: string[];
    actionTitle: string;
    actionItems: string[];
    noteTitle: string;
    noteText: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: ToolCard[];
    actions: [ActionLink, ActionLink, ActionLink];
  };
};

const homeContentEn: HomePageContent = {
  ui: {
    aria: {
      heroPoints: "Protocol highlights",
      livePriceSummary: "Live price summary",
      quickLinks: "Quick links",
      verificationLinks: "Verification links",
    },
    marketStrip: {
      unavailable: "Unavailable",
      routerQuoteReadFailed: "Router quote read failed",
      directPriceLabel: "Direct Price",
      directPriceSub: "Per 1 4TEEN via protocol",
      dexReferenceLabel: "DEX Reference",
      dexPriceLabel: "DEX Price",
      dexSubSuffix: "per 4TEEN",
      unlockCycleLabel: "Unlock Cycle",
      unlockCycleValue: "14 Days",
      unlockCycleSub: "Direct purchase lock period",
      unlockCycleDailyRuleSub: "Fixed lock for direct purchases",
      dailyLiquidityRuleLabel: "Daily Liquidity Rule",
      dailyLiquidityRuleValue: "6.43%",
      dailyLiquidityRuleSub: "Released once per UTC day by controller logic",
    },
  },
  hero: {
    eyebrow: "4TEEN Mobile App",
    meta: "TRON • Direct Buy • Unlock • Liquidity • Growth",
    title:
      "One place for buy, lock visibility, and liquidity flow.",
    lead:
      "The wallet app is already the operating layer of the system. Direct buy, unlock timeline, liquidity controller, Telegram claim state, ambassador cabinet, and the compact info route already exist as real screens with real state instead of promises in copy.",
    points: [
      "Prepare the real direct-buy flow with estimate, split context, and confirmation before signing.",
      "Track each locked purchase event by countdown, unlock state, and source transaction.",
      "Use one info route for contracts, asset wallets, executors, and runtime readiness.",
    ],
    actions: [
      { label: "Get App", href: "/app" },
      { label: "Open Direct Buy", href: "/buy" },
    ],
    sideEyebrow: "Wallet surfaces",
    sideTitle: "The app now carries the live product work.",
    sideStats: [
      { label: "Primary sale", value: "Prepare → Confirm" },
      { label: "Visibility", value: "Unlock events" },
      { label: "Execution", value: "Controller state" },
      { label: "Verification", value: "Info route" },
    ],
    sideHighlightTitle: "Clean product hub.",
    sideHighlightText:
      "Buy, lock visibility, controller truth, growth rails, and verification now connect through one wallet-style flow.",
    tools: [
      {
        href: "/buy",
        title: "Direct Buy",
        meta: "Prepare the real mint-on-purchase flow before confirmation",
      },
      {
        href: "/unlock",
        title: "Unlock Timeline",
        meta: "Read direct-buy events by wallet, countdown, and unlock state",
      },
      {
        href: "/liquidity",
        title: "Liquidity Controller",
        meta: "See threshold, release cadence, executors, and controller history",
      },
      {
        href: "/verification",
        title: "Info Route",
        meta: "Open contracts, vaults, asset wallets, and runtime readiness",
      },
    ],
  },
  wallets: {
    eyebrow: "Wallet Support",
    title:
      "Wallet support matters because the app now reflects wallet state across live surfaces.",
    description:
      "Direct buy, unlock rows, cabinet actions, and Telegram claim state all change depending on whether the selected wallet can sign, whether it is watch-only, and whether balance and resource state resolve cleanly in the flow.",
    bestStatus: "Best mobile experience",
    bestItems: [
      { name: "Binance Wallet", note: "Works • Balance visible" },
      { name: "Bitget Wallet", note: "Works • Balance visible" },
      { name: "OKX Wallet", note: "Works • Balance visible" },
      { name: "TokenPocket", note: "Works • Balance visible" },
    ],
    compatibleStatus: "Works in mobile browser",
    compatibleItems: [
      { name: "FoxWallet", note: "Works • Balance not displayed" },
      { name: "imToken", note: "Works • Balance not displayed" },
      { name: "MetaMask", note: "Works • Balance not displayed" },
      { name: "TronLink", note: "Works • Balance not displayed" },
      { name: "WalletConnect", note: "Works • Balance not displayed" },
      { name: "Trust Wallet", note: "Use desktop Chrome extension" },
    ],
    highlightTitle: "Recommended for app + buy flow:",
    highlightText:
      "Binance Wallet, Bitget Wallet, OKX Wallet, and TokenPocket give the smoothest experience because they correctly display balances and make the wallet-aware surfaces easier to trust.",
  },
  trust: {
    eyebrow: "Verify the Protocol",
    title:
      "The wallet app, website surfaces, repos, and chain should all point to the same truth.",
    links: [
      { label: "App", value: "Mobile Download", href: "/app" },
      { label: "Website", value: "Live Surfaces", href: "/buy" },
      {
        label: "Network",
        value: "TRON Mainnet",
        href: "https://tronscan.org",
        external: true,
      },
      {
        label: "Repo",
        value: "Wallet App",
        href: "https://github.com/info14fourteen-creator/4teen-wallet-app",
        external: true,
      },
      { label: "Docs", value: "Whitepaper", href: "/whitepaper" },
      { label: "Info", value: "Verification", href: "/verification" },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "What the operating surfaces now cover.",
    description:
      "The app is no longer just a shell around links. It already handles explanation, wallet-aware gating, confirmation flow, surface-specific history, controller state, reward routing, and social-claim state.",
    steps: [
      {
        step: "1",
        title: "Prepare the direct buy inside the app",
        text: "The buy screen is a preparation step first. The selected signing wallet enters TRX, sees estimated 4TEEN, and only then moves into the confirmation layer where the app builds the real transaction and checks resources.",
      },
      {
        step: "2",
        title: "Track every locked batch by purchase",
        text: "Unlock Timeline is not generic history. It reads direct-buy events for the selected wallet, shows UTC unlock time, live countdown, lock status, and the Tronscan transaction behind each purchase row.",
      },
      {
        step: "3",
        title: "Open the controller when you need liquidity truth",
        text: "Liquidity execution is a real surface in the app. It shows the 100 TRX threshold, 6.43% daily release rule, executor split, contract links, and recent controller-side history instead of hiding that logic in copy.",
      },
    ],
    airdropStep: {
      step: "4",
      title: "Read social airdrop state as a real screen",
      text: "The airdrop page combines three checks at once instead of pretending every social route is live.",
      items: [
        {
          value: "Wallet",
          label:
            "Signing or watch-only state changes whether the claim flow can continue",
        },
        {
          value: "Session",
          label:
            "Telegram bot session decides whether the card is available, verify-now, or session-live",
        },
        {
          value: "Chain",
          label:
            "On-chain claim state can already show received, queued, or legacy-used",
        },
      ],
    },
    cabinetStep: {
      step: "5",
      title:
        "Use one cabinet for registration, buyers, purchases, pending rows, and rewards",
      text: "Ambassador flow is no longer a dead-end sign-up page. The same route starts with one-time slug registration and then becomes a working cabinet where referral identity, tracked purchases, claimable rewards, claimed totals, and pending allocation replay are visible together.",
    },
  },
  architecture: {
    eyebrow: "Architecture Diagram",
    title: "How the info route explains the system on-chain.",
    description:
      "The compact info route in the app now ties contracts, routing, vaults, executors, asset wallets, and runtime checks together. The website can still show the map, but it should reflect that this architecture already has a working product screen behind it.",
    entry: {
      label: "Entry",
      title: "User TRX",
      text: "Direct protocol buy enters the system",
    },
    core: {
      label: "Core Contract",
      title: "FourteenToken",
      text: "Mint on purchase + 14-day lock + automatic TRX split",
      pills: ["Mint on purchase", "14-day lock", "TRX split: 90% / 7% / 3%"],
    },
    liquidity: {
      eyebrow: "90% TRX Path",
      title: "Liquidity Execution Layer",
      text: "The largest share moves into a dedicated liquidity system. Release timing, reserve storage, bootstrap preparation, and DEX execution are isolated into separate roles.",
      controller: {
        label: "Controller",
        title: "FourteenLiquidityController",
        text: "Releases 6.43% once per UTC day and controls when liquidity can move",
      },
      vault: {
        label: "Reserve Vault",
        title: "FourteenVault",
        text: "Stores the 4TEEN reserve used specifically for liquidity provisioning",
      },
      bootstrapper: {
        label: "Preparation Layer",
        title: "LiquidityBootstrapper",
        text: "Calculates required token amounts, pulls from FourteenVault, supplies executors, and triggers execution flow",
      },
      executors: [
        {
          label: "50%",
          title: "LiquidityExecutorJustMoney",
          text: "DEX-specific execution path for JustMoney",
        },
        {
          label: "50%",
          title: "LiquidityExecutorSunV3",
          text: "DEX-specific execution path for Sun.io V3",
        },
      ],
    },
    ambassadors: {
      eyebrow: "7% TRX Path",
      title: "Control + Ambassador Reward Layer",
      text: "This path stays outside token issuance and liquidity execution. It combines protocol control with referral attribution, verified purchase allocation, level progression, and claimable ambassador rewards.",
      controller: {
        label: "Controller",
        title: "FourteenController",
        text: "Owns FourteenToken, manages owner functions, operator logic, reward accounting, purchase allocation, and controlled withdrawals.",
      },
      flow: {
        label: "Ambassador Flow",
        title: "Registration → Binding → Verified Purchase → Reward",
        text: "Wallet registration, public slug identity, buyer binding, verified purchase recording, claimable reward accrual, and reward withdrawal.",
      },
      ladderTitle: "Ambassador Reward Ladder",
      ladder: [
        { level: "Bronze", buyers: "0–9 buyers", percent: "10%" },
        { level: "Silver", buyers: "10–99 buyers", percent: "25%" },
        { level: "Gold", buyers: "100–999 buyers", percent: "50%" },
        { level: "Platinum", buyers: "1000+ buyers", percent: "75%" },
      ],
      noteTitle: "Allocation logic",
      noteText:
        "ambassador reward is calculated from the purchase owner share during verified purchase allocation. Level override is supported, and rewards move into claimable balance before withdrawal.",
    },
    airdrop: {
      eyebrow: "3% TRX Path",
      title: "Community Distribution Layer",
      text: "This path feeds the live airdrop structure. Distribution is staged by waves and expanded across multiple social routes instead of being treated like a one-off giveaway.",
      vault: {
        label: "Vault",
        title: "AirdropVault",
        text: "Community and growth reserve used for staged ecosystem distribution, wallet-linked reward flows, and live campaign routes",
      },
      model: {
        label: "Distribution Model",
        title: "1,500,000 4TEEN • 6 Fixed Waves",
        text: "Wave-based release structure with one live route today and more campaign routes added over time",
      },
      pills: [
        { label: "Telegram Live", tone: "live" },
        { label: "X Soon", tone: "wait" },
        { label: "Instagram Soon", tone: "wait" },
        { label: "More Socials Ahead", tone: "wait" },
      ],
      liveRoute: {
        label: "Current Live Route",
        title: "Telegram Campaign",
        text: "Current public route inside the live airdrop infrastructure",
        action: {
          label: "Open current live route",
          href: "/airdrop",
        },
      },
      snapshotTitle: "Live Airdrop Snapshot",
      snapshotRows: [
        { label: "Status", value: "Live Now" },
        { label: "Reward Range", value: "1–5 4TEEN" },
        { label: "Verification", value: "Required" },
        { label: "Wallet Needed", value: "TRON Wallet" },
        { label: "Reward Delivery", value: "On-Chain" },
        { label: "Claim Type", value: "platformBit = 4" },
      ],
    },
    facts: [
      {
        label: "Liquidity",
        text: "Release timing, reserve storage, bootstrap prep, and DEX execution are isolated into dedicated contracts.",
      },
      {
        label: "Ambassadors",
        text: "Level progression and reward percent are tied to real buyer count and verified purchase allocation.",
      },
      {
        label: "Airdrop",
        text: "The community route is wave-based, multi-platform, and already live through Telegram.",
      },
      {
        label: "Why it matters",
        text: "4TEEN behaves like a system of separated roles, not one overloaded contract blob.",
      },
    ],
  },
  why: {
    eyebrow: "Why This Structure Matters",
    title: "The product layer is finally catching up with the protocol layer.",
    description:
      "Contracts always had separated roles. What changed is that the app now exposes those roles as readable, wallet-aware screens instead of leaving users with only raw on-chain ideas and scattered links.",
    cards: [
      {
        number: "01",
        title: "One hub already exists in the wallet app",
        text: "The app home is already the compact product hub: buy, unlock, liquidity, airdrop, ambassadors, and info are grouped as surfaces, not buried in one long explanation.",
        note: "The website should point people into those same surfaces instead of describing an older imaginary roadmap.",
      },
      {
        number: "02",
        title: "Wallet-aware state is real behavior now",
        text: "Watch-only versus signing wallet, claimable versus pending rewards, Telegram session state, and resource readiness all change what the user can actually do in the app.",
        note: "That means the homepage text should describe states and actions, not only contract theory.",
      },
      {
        number: "03",
        title: "Verification is already a working route",
        text: "Architecture, contract roles, vaults, executors, asset-wallet balances, and allocation replay readiness are no longer only whitepaper topics. The app already exposes them as one compact info screen.",
        note: "The site is strongest when it describes that info layer as live product, not as future documentation.",
      },
    ],
    notePrefix: "Why it matters",
  },
  liveMetrics: {
    eyebrow: "Live Protocol Metrics",
    title: "A live read of entry, liquidity, rewards, and operational state.",
    description:
      "These cards should mirror what the user can actually open in the app: direct-buy context, unlock and controller-side state, cabinet reward flow, and the current Telegram-first social distribution route.",
    liquidity: {
      eyebrow: "Liquidity Engine",
      title: "Rule-Based Liquidity Flow",
      note: "In the app this shows up as threshold checks, next release context, executor split, contract links, and controller-side history instead of one opaque “liquidity” sentence.",
      rows: [
        { label: "Controller", value: "FourteenLiquidityController" },
        { label: "Reserve Vault", value: "FourteenVault" },
        { label: "Preparation Layer", value: "LiquidityBootstrapper" },
        { label: "Execution Split", value: "50% / 50%" },
        { label: "DEX Paths", value: "JustMoney + Sun.io V3" },
      ],
    },
    ambassadors: {
      eyebrow: "Ambassador Layer",
      title: "Cabinet reward flow",
      note: "In the app this route combines on-chain cabinet state with backend attribution rows, so claimable now, claimed total, and pending replay live together in one place.",
      ladder: [
        { level: "Bronze", meta: "0–9 buyers", value: "10%" },
        { level: "Silver", meta: "10–99 buyers", value: "25%" },
        { level: "Gold", meta: "100–999 buyers", value: "50%" },
        { level: "Platinum", meta: "1000+ buyers", value: "75%" },
      ],
    },
    airdrop: {
      eyebrow: "Airdrop Layer",
      title: "Live social distribution snapshot",
      rows: [
        { label: "Total Allocation", value: "1,500,000 4TEEN", tone: "strong" },
        { label: "Wave Structure", value: "6 Fixed Waves" },
        { label: "Current Live Route", value: "Telegram", tone: "live" },
        { label: "Other Socials", value: "Read-only placeholders", tone: "wait" },
        { label: "Reward Delivery", value: "On-Chain" },
      ],
      action: {
        label: "Open Live Telegram Route",
        href: "/airdrop",
      },
    },
  },
  tools: {
    eyebrow: "Tools",
    title: "Open the same surfaces the app already exposes.",
    description:
      "These are not placeholder menu items anymore. They map directly to routes and behaviors that already exist in the wallet-style product flow and already carry live wallet state.",
    cards: [
      {
        status: "Open",
        tone: "live",
        title: "Mobile App",
        text: "Open the dedicated mobile-app route with store download options and a clean fallback back into the web surfaces.",
        href: "/app",
      },
      {
        status: "Live",
        tone: "live",
        title: "Buy 4TEEN",
        text: "Open the direct-buy preparation screen with amount input, estimate, split context, and confirmation path.",
        href: "/buy",
      },
      {
        status: "Track",
        tone: "live",
        title: "Unlock Timeline",
        text: "Read direct-buy event rows by wallet, unlock timestamp, live countdown, and transaction source.",
        href: "/unlock",
      },
      {
        status: "Track",
        tone: "live",
        title: "Liquidity Controller",
        text: "Follow threshold, 6.43% daily release, executors, recent controller events, and execution readiness.",
        href: "/liquidity",
      },
      {
        status: "Live",
        tone: "live",
        title: "Airdrop Status",
        text: "See Telegram live-claim state, watch-only restrictions, bot session state, and on-chain reward state.",
        href: "/airdrop",
      },
      {
        status: "Manage",
        tone: "live",
        title: "Ambassador Cabinet",
        text: "Move from one-time registration into cabinet mode with slug, buyers, purchases, pending rows, and rewards.",
        href: "/ambassadors",
      },
      {
        status: "Verify",
        tone: "wait",
        title: "Info Route",
        text: "Open the compact architecture screen for contracts, asset wallets, runtime health, and public proof links.",
        href: "/verification",
      },
    ],
  },
  verification: {
    eyebrow: "Verification / Contracts",
    title: "Verify the protocol across contracts, repos, docs, and the app hub.",
    description:
      "The public story is stronger now because the wallet app already acts as an operating layer on top of those contracts, repos, docs, asset-wallet checks, and live surfaces.",
    contracts: {
      eyebrow: "On-Chain Contracts",
      title: "Mainnet deployment layer",
      links: [
        {
          label: "Core",
          value: "FourteenToken",
          href: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
        },
        {
          label: "Core",
          value: "FourteenController",
          href: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
        },
        {
          label: "Core",
          value: "FourteenLiquidityController",
          href: "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ",
        },
        {
          label: "Vault",
          value: "FourteenVault",
          href: "https://tronscan.org/#/contract/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq",
        },
        {
          label: "Vault",
          value: "TeamLockVault",
          href: "https://tronscan.org/#/contract/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h",
        },
        {
          label: "Vault",
          value: "AirdropVault",
          href: "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
        },
        {
          label: "Execution",
          value: "LiquidityBootstrapper",
          href: "https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc",
        },
        {
          label: "Execution",
          value: "LiquidityExecutorSunV3",
          href: "https://tronscan.org/#/contract/TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh",
        },
        {
          label: "Execution",
          value: "LiquidityExecutorJustMoney",
          href: "https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F",
        },
      ],
    },
    repositories: {
      eyebrow: "Repositories",
      title: "Public infra and operating code",
      links: [
        {
          label: "Repo",
          value: "4teen-smart-contracts",
          href: "https://github.com/info14fourteen-creator/4teen-smart-contracts",
        },
        {
          label: "Repo",
          value: "4teen-wallet-app",
          href: "https://github.com/info14fourteen-creator/4teen-wallet-app",
        },
        {
          label: "Repo",
          value: "4teen-ambassador-system",
          href: "https://github.com/info14fourteen-creator/4teen-ambassador-system",
        },
        {
          label: "Repo",
          value: "liquidity-bootstrapper-cron",
          href: "https://github.com/info14fourteen-creator/liquidity-bootstrapper-cron",
        },
        {
          label: "Repo",
          value: "4teen-telegram-airdrop-bot",
          href: "https://github.com/info14fourteen-creator/4teen-telegram-airdrop-bot",
        },
      ],
    },
    docs: {
      eyebrow: "Docs",
      title: "Public reading layer",
      links: [
        { label: "Docs", value: "Whitepaper", href: "/whitepaper" },
        { label: "Docs", value: "Verification", href: "/verification" },
        { label: "Docs", value: "Blog", href: "/blog" },
      ],
    },
    hubs: {
      eyebrow: "Hubs",
      title: "Public ecosystem entry points",
      links: [
        { label: "Hub", value: "Airdrop Hub", href: "/airdrop" },
        { label: "Hub", value: "Ambassador Program", href: "/ambassadors" },
      ],
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Clear answers before you open the live surfaces.",
    description:
      "The right questions are changing. Users now need clarity about what each route actually does, which actions depend on wallet type, and which growth or verification flows are already live in the app.",
    items: [
      {
        question: "Why does 4TEEN need a direct-buy screen instead of only a swap?",
        answer: "Because the app treats direct buy as a separate contract-side surface. It prepares a mint-on-purchase flow, shows the estimate, explains the 14-day lock, and then moves to the real confirmation step.",
      },
      {
        question: "What exactly does Unlock Timeline track?",
        answer: "Only direct-buy events tied to the selected wallet. Each row shows the amount, UTC unlock time, live countdown, current lock state, and the Tronscan transaction behind that purchase event.",
      },
      {
        question: "Why do some routes care whether the wallet is watch-only?",
        answer: "Because the app now enforces behavior by wallet type. Watch-only wallets can read state, but cannot register as ambassadors, withdraw rewards, or execute signing flows like direct buy or liquidity actions.",
      },
      {
        question: "Is the airdrop page just a promo page now?",
        answer: "No. It is already a stateful screen. Telegram is the live route, and the card combines local wallet state, current bot session state, and on-chain claim state before deciding what action is available next.",
      },
      {
        question: "What does the info route verify that the website alone cannot?",
        answer: "It brings contracts, vaults, liquidity executors, asset-wallet balances, and operator-side readiness into one compact operational screen. That makes verification part of the product flow, not only a docs page.",
      },
    ],
  },
  risk: {
    eyebrow: "Risk / Disclosure",
    title: "Structured mechanics do not remove market risk.",
    description:
      "4TEEN is an on-chain token protocol with visible rules, separated contract roles, and public verification paths. That makes the system easier to inspect, but it does not turn token participation into a guaranteed-return product.",
    understandTitle: "What users should understand",
    understandItems: [
      "Direct protocol price is not the same as open-market DEX price.",
      "A 14-day unlock changes timing, but does not guarantee a favorable exit.",
      "Liquidity rules describe release behavior, not future market outcomes.",
      "Ambassador rewards and airdrop routes are structured layers, not guaranteed income.",
    ],
    actionTitle: "What users should do",
    actionItems: [
      "Verify contracts, repos, and public documentation before acting.",
      "Understand the lock, reward, and distribution mechanics before buying.",
      "Use supported wallets and check live routes carefully.",
      "Make independent decisions instead of treating protocol structure as a profit promise.",
    ],
    noteTitle: "Important",
    noteText:
      "4TEEN is built around observable on-chain behavior, not guaranteed outcomes. Users should verify the system themselves and act only with risk they understand.",
  },
  cta: {
    eyebrow: "Final CTA",
    title: "Choose the Surface You Need",
    lead:
      "Get the mobile app, prepare a direct buy, verify the compact architecture route, or go straight into the live growth and tracking surfaces.",
    cards: [
      {
        status: "Open",
        tone: "live",
        title: "Get the App",
        text: "Start from the mobile-app route with store download options and a clean handoff into the wallet product.",
        href: "/app",
      },
      {
        status: "Buy",
        tone: "live",
        title: "Open Direct Buy",
        text: "Go straight into the contract-side entry flow with amount preview, confirmation, and wallet-aware gating.",
        href: "/buy",
      },
      {
        status: "Track",
        tone: "live",
        title: "Open Verification",
        text: "Use the public proof layer for contracts, repos, liquidity logic, and the architecture map behind the app surfaces.",
        href: "/verification",
      },
      {
        status: "Manage",
        tone: "live",
        title: "Open Ambassador Cabinet",
        text: "Register, inspect referral identity, track purchases, and work with live reward state in one route.",
        href: "/ambassadors",
      },
    ],
    actions: [
      { label: "Get App", href: "/app" },
      { label: "Open Direct Buy", href: "/buy" },
      { label: "Open Live Telegram Route", href: "/airdrop" },
    ],
  },
};

const homeContentByLocale: Record<SupportedSiteLocale, HomePageContent> = {
  en: homeContentEn,
  ru: homeContentEn,
  uz: homeContentEn,
};

export function getHomePageContent(locale: SupportedSiteLocale): HomePageContent {
  return homeContentByLocale[locale] ?? homeContentEn;
}
