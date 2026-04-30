export type PlaceholderPageKey =
  | "whitepaper"
  | "airdrop"
  | "ambassadors"
  | "blog"
  | "buy"
  | "swap"
  | "unlock"
  | "liquidity"
  | "verification";

export type PlaceholderPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  sections: Array<{
    title: string;
    text: string;
  }>;
};

export const placeholderPages: Record<PlaceholderPageKey, PlaceholderPageData> = {
  whitepaper: {
    slug: "whitepaper",
    eyebrow: "Whitepaper",
    title: "4TEEN whitepaper is being rebuilt as a real reading surface.",
    description:
      "This page becomes the structured docs layer for token mechanics, contract roles, purchase flow, locks, liquidity routing, and ecosystem logic.",
    status: "Docs route",
    sections: [
      {
        title: "What will live here",
        text:
          "A web-native long-form document with table of contents, diagrams, contract roles, token rules, and direct links into verification surfaces.",
      },
      {
        title: "Why this is separate",
        text:
          "The wallet already treats Whitepaper as a dedicated product reading route, not a hero block. The website should do the same.",
      },
      {
        title: "Source of truth",
        text:
          "Wallet whitepaper content and smart-contract mechanics will be merged here, then adapted for multilingual web reading.",
      },
    ],
  },
  airdrop: {
    slug: "airdrop",
    eyebrow: "Airdrop",
    title: "Airdrop hub is being reshaped around the real vault logic.",
    description:
      "This route becomes the live community distribution surface: Telegram flow, social rollout, wave timing, platform masks, and wallet-aware claim state.",
    status: "Distribution route",
    sections: [
      {
        title: "What will live here",
        text:
          "Telegram live route, future social routes, wave unlock timing, reward visibility, and contract-backed claim conditions.",
      },
      {
        title: "Why this matters",
        text:
          "AirdropVault is a real protocol layer with fixed waves and platform-bit rules. It should be presented as infrastructure, not as a popup campaign.",
      },
      {
        title: "Source of truth",
        text:
          "The wallet already reads airdrop status per wallet and per social route. This website route should mirror that product surface.",
      },
    ],
  },
  ambassadors: {
    slug: "ambassadors",
    eyebrow: "Ambassadors",
    title: "Ambassador route is being built as both entry and cabinet surface.",
    description:
      "This page will handle public onboarding, slug identity, referral explanation, reward ladder, buyer attribution, and cabinet entry for registered wallets.",
    status: "Referral route",
    sections: [
      {
        title: "What will live here",
        text:
          "Registration, referral links, level progression, rewards, buyer binding, pending purchases, and claimable withdrawals.",
      },
      {
        title: "Why this matters",
        text:
          "FourteenController already exposes dashboard getters and reward flows. The website should reflect that as a real product surface, not a static affiliate page.",
      },
      {
        title: "Source of truth",
        text:
          "Wallet ambassador flows and controller dashboard functions define the web route structure directly.",
      },
    ],
  },
  blog: {
    slug: "blog",
    eyebrow: "Blog",
    title: "Blog route is live as the future publishing layer.",
    description:
      "This page becomes the protocol publishing surface for launches, explanations, ecosystem updates, and multilingual articles.",
    status: "Content route",
    sections: [
      {
        title: "What will live here",
        text:
          "Protocol updates, educational posts, architecture explainers, campaign launches, and market-facing writing.",
      },
      {
        title: "Why this matters",
        text:
          "The website needs a long-form narrative layer that is not forced into Home or Whitepaper.",
      },
      {
        title: "Source of truth",
        text:
          "This route will sit on top of the same information model that later feeds multilingual publishing.",
      },
    ],
  },
  buy: {
    slug: "buy",
    eyebrow: "Buy",
    title: "Direct buy route is being rebuilt around the real wallet flow.",
    description:
      "This page becomes the protocol-native purchase surface: selected wallet, direct quote, lock preview, split preview, and confirmation handoff.",
    status: "Primary surface",
    sections: [
      {
        title: "What will live here",
        text:
          "Direct price, wallet-aware quote state, mint-on-purchase explanation, 14-day lock notice, and a clean handoff into the signing flow.",
      },
      {
        title: "Why this matters",
        text:
          "The wallet treats buy as its own product with unique mechanics. The website should not collapse it into a generic swap form.",
      },
      {
        title: "Source of truth",
        text:
          "Wallet buy screen, direct-buy services, and FourteenToken contract behavior define this page.",
      },
    ],
  },
  swap: {
    slug: "swap",
    eyebrow: "Swap",
    title: "Swap route will stay secondary to protocol-native buy.",
    description:
      "This page becomes the market-side entry for DEX exposure, pair pricing, and comparison against direct protocol purchase.",
    status: "Market route",
    sections: [
      {
        title: "What will live here",
        text:
          "Pair selection, market-side quote logic, wallet connection, execution summary, and clear separation from direct buy mechanics.",
      },
      {
        title: "Why this matters",
        text:
          "The system needs a clear split between protocol entry and open-market trading. The wallet already treats those as different surfaces.",
      },
      {
        title: "Source of truth",
        text:
          "Wallet swap and market-price surfaces will define how the web route behaves later.",
      },
    ],
  },
  unlock: {
    slug: "unlock",
    eyebrow: "Unlock",
    title: "Unlock route is being rebuilt from real purchase-lock data.",
    description:
      "This page becomes the release map for direct buys: locked amount, available amount, unlock countdowns, and transaction-backed history.",
    status: "Primary surface",
    sections: [
      {
        title: "What will live here",
        text:
          "Wallet-specific lock state, UTC unlock times, event rows, countdowns, and Tronscan verification links.",
      },
      {
        title: "Why this matters",
        text:
          "The 14-day lock is one of the core differences between direct buy and swap. It deserves its own route, not a note under the buy form.",
      },
      {
        title: "Source of truth",
        text:
          "Wallet unlock-timeline service and FourteenToken.lockedBalanceOf() define this surface.",
      },
    ],
  },
  liquidity: {
    slug: "liquidity",
    eyebrow: "Liquidity",
    title: "Liquidity route is being rebuilt from controller-side execution data.",
    description:
      "This page becomes the live monitoring layer for controller balance, daily execution rules, bootstrap preparation, executor paths, and event history.",
    status: "Primary surface",
    sections: [
      {
        title: "What will live here",
        text:
          "Execution rules, last runs, received TRX, bootstrapper relation, executor contracts, and contract links for verification.",
      },
      {
        title: "Why this matters",
        text:
          "Liquidity behavior is one of the strongest public verification layers in the protocol. It should be observable directly from the website.",
      },
      {
        title: "Source of truth",
        text:
          "Wallet liquidity-controller service plus FourteenLiquidityController and LiquidityBootstrapper contracts define this route.",
      },
    ],
  },
  verification: {
    slug: "verification",
    eyebrow: "Verification",
    title: "Verification route is being built as the technical trust layer.",
    description:
      "This page becomes the contract, repository, explorer, and system-stats surface for users who want to inspect the protocol directly.",
    status: "Technical route",
    sections: [
      {
        title: "What will live here",
        text:
          "Core contracts, vaults, executors, repositories, explorer links, and protocol-level system stats pulled from controller reads.",
      },
      {
        title: "Why this matters",
        text:
          "The protocol is strongest when the reading layer points straight into the real system instead of hiding behind vague trust claims.",
      },
      {
        title: "Source of truth",
        text:
          "Smart-contract addresses, wallet service constants, and public GitHub repositories define this page.",
      },
    ],
  },
};
