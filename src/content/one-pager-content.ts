import type { PublicPageContent } from "@/content/public-pages-content";
import {
  officialContractsRepoUrl,
  officialGenesisEmail,
  officialWalletRepoUrl,
} from "@/content/official-links";
import type { SupportedSiteLocale } from "@/lib/site-locale";

export type OnePagerContent = PublicPageContent & {
  snapshot: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  proofPoints: Array<{
    title: string;
    body: string;
  }>;
  ask: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    bullets: string[];
  };
};

const onePagerContentEn: OnePagerContent = {
  metadata: {
    title: "4TEEN One-Pager",
    description:
      "A concise investor and strategic-partner brief for 4TEEN: live TRON wallet infrastructure, rule-based token mechanics, user acquisition, liquidity architecture, and a programmable-settlement roadmap.",
  },
  hero: {
    eyebrow: "4TEEN One-Pager",
    status: "Investor concept · August 2026",
    title:
      "4TEEN is building programmable payment and settlement infrastructure on TRON - starting with a live wallet, verifiable rules, and a wallet-first acquisition loop.",
    lead:
      "The system already combines a wallet, TRON assets, direct purchase, time-bound unlocks, liquidity infrastructure, airdrop and ambassador mechanics, plus Tronix.rent for Energy and Bandwidth. The long-term direction is conditional settlement: funds secured first, then released under explicit rules.",
  },
  summaryCards: [
    {
      eyebrow: "Product",
      title: "Wallet already in market",
      body:
        "4TEEN Wallet is available on Google Play and brings asset custody, direct buy, unlock, swap, liquidity, airdrop, ambassador, and information surfaces into one mobile product.",
    },
    {
      eyebrow: "Economics",
      title: "90 / 7 / 3 buy routing",
      body:
        "Every direct buy routes TRX across liquidity, controller, and airdrop sides in the same transaction, making the core economics easier to explain and verify.",
    },
    {
      eyebrow: "Liquidity",
      title: "Daily controller cadence",
      body:
        "The Liquidity Controller applies a once-per-UTC-day 6.43% execution rule above its threshold, splitting the route across JustMoney and Sun.io V3 executors.",
    },
    {
      eyebrow: "Scale path",
      title: "Airdrop -> verified wallet",
      body:
        "Airdrop access is wallet-first, creating a measurable acquisition path. Roughly 1,000 early users have already come through this mechanism; future growth should be judged by verified wallets and retention, not impressions.",
    },
  ],
  sections: [
    {
      eyebrow: "What 4TEEN is",
      title: "A payment and settlement stack, not only a token",
      body:
        "TRON is the execution and settlement rail. USDT can act as a stable settlement asset. 4TEEN Wallet is the interface, 4TEEN is an economic and incentive layer, and smart contracts are the rule engine. Tronix.rent supports the Energy and Bandwidth side of the same user environment.",
      bullets: [
        "Funds can be reserved first and settled after agreed fulfilment conditions in the roadmap model.",
        "The intended flow is Payment Commitment -> Secured Funds -> Fulfillment -> Settlement.",
        "This is a long-term research and product direction, not a claim that real-world settlement rails are already live.",
      ],
    },
    {
      eyebrow: "Capital model",
      title: "Investor capital and liquidity capital do different jobs",
      body:
        "Investor capital funds company and product development: infrastructure, security, integrations, legal work, operations, and measured growth. Liquidity capital is separate and is intended to build market depth. The operating budget should not depend on selling tokens.",
      bullets: [
        "Core product and protocol flows already exist, shifting the discussion from concept creation to responsible scaling.",
        "A recommended six-month operating runway is $60k-$100k; a twelve-month growth runway is $150k-$300k, with a distinct liquidity budget.",
        "No return, token-price, listing, or market-depth outcome is promised.",
      ],
    },
  ],
  snapshot: [
    {
      label: "Target architecture",
      value: "TRON settlement stack",
      detail: "TRON execution, USDT settlement potential, wallet UX, 4TEEN incentives, and smart-contract rules in one system direction.",
    },
    {
      label: "Working product",
      value: "Wallet + contracts",
      detail: "Google Play wallet, direct-buy and unlock logic, liquidity controller, vaults, airdrop, ambassador, and proof routes.",
    },
    {
      label: "User acquisition",
      value: "Airdrop -> wallet",
      detail: "The wallet-first claim model has brought roughly 1,000 early users and creates a measurable distribution loop.",
    },
    {
      label: "Capital principle",
      value: "Build product / build market",
      detail: "Investor capital funds operations and product. Liquidity capital is separately allocated to market infrastructure.",
    },
  ],
  proofPoints: [
    {
      title: "Rule-based architecture can be inspected",
      body:
        "Token, controller, liquidity controller, bootstrapper, DEX executors, and vault contracts carry separate responsibilities. Contract addresses, balances, transactions, locks, and liquidity events should be independently reviewed on TRON Mainnet.",
    },
    {
      title: "The wallet maps the system into user actions",
      body:
        "The app surfaces direct buy, unlock timeline, swap, liquidity, ambassador cabinet, and information routes as an operational product rather than loose documentation.",
    },
    {
      title: "The scale path is explicit",
      body:
        "The current next stage is disciplined scaling: provider capacity, security and legal review, controlled acquisition, retention measurement, and partner integrations. Capital accelerates these workstreams; it does not replace on-chain verification.",
    },
  ],
  links: [
    { label: "Open Investor Deck", href: "/deck" },
    { label: "Read Whitepaper", href: "/whitepaper" },
    { label: "Verify Contracts", href: "/verification" },
    { label: "Open Direct Buy", href: "/buy" },
    { label: "Wallet app repository", href: officialWalletRepoUrl },
    { label: "Smart contracts repository", href: officialContractsRepoUrl },
  ],
  linksEyebrow: "Diligence Links",
  footerNote:
    "This one-pager is an informational project brief, not an offer, a financial recommendation, or a promise of returns, token performance, listing, liquidity depth, or market outcome. Technical and financial claims require independent verification.",
  ask: {
    eyebrow: "Strategic ask",
    title: "The best conversations combine capital with an operating advantage.",
    body:
      "4TEEN is looking for partners who can accelerate product execution, security, provider capacity, measured acquisition, liquidity credibility, regulatory readiness, regional reach, or ecosystem integrations.",
    email: officialGenesisEmail,
    bullets: [
      "Product, infrastructure, security, legal, and settlement-direction execution.",
      "Measured wallet acquisition, retention, and ambassador expansion.",
      "Liquidity, market-structure, ecosystem, or strategic distribution relationships.",
    ],
  },
};

const onePagerContentByLocale: Partial<Record<SupportedSiteLocale, OnePagerContent>> = {
  en: onePagerContentEn,
};

export function getOnePagerContent(locale: SupportedSiteLocale): OnePagerContent {
  return onePagerContentByLocale[locale] ?? onePagerContentEn;
}
