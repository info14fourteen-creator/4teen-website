import type { PublicPageContent } from "@/content/public-pages-content";
import {
  officialContractsRepoUrl,
  officialGenesisEmail,
  officialWalletRepoUrl,
} from "@/content/official-links";
import type { SupportedSiteLocale } from "@/lib/site-locale";

export type GenesisDeckContent = PublicPageContent & {
  thesis: Array<{
    eyebrow: string;
    title: string;
    body: string;
  }>;
  proofTracks: Array<{
    eyebrow: string;
    title: string;
    bullets: string[];
  }>;
  capitalPlan: Array<{
    eyebrow: string;
    title: string;
    body: string;
  }>;
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emailLabel: string;
    email: string;
    bullets: string[];
  };
};

const genesisContentEn: GenesisDeckContent = {
  metadata: {
    title: "4TEEN Investor Deck",
    description:
      "4TEEN is building a programmable payment and settlement ecosystem on TRON: a live wallet, verifiable contract architecture, user-acquisition rails, liquidity infrastructure, and a path to conditional settlement.",
  },
  hero: {
    eyebrow: "4TEEN Deck",
    status: "Investor concept · August 2026",
    title:
      "Programmable payment and settlement infrastructure on TRON - with a live wallet, contract rails, and a working user-acquisition engine.",
    lead:
      "4TEEN is evolving beyond a token and wallet. TRON is the settlement rail, USDT can serve as the stable settlement asset, the wallet is the user interface, 4TEEN is an incentive layer, and smart contracts encode the rules that govern how funds move.",
  },
  summaryCards: [
    {
      eyebrow: "Working product",
      title: "Wallet is already in market",
      body:
        "4TEEN Wallet is published on Google Play. It already exposes asset custody, direct buy, unlock, swap, liquidity, airdrop, ambassador, and information flows.",
    },
    {
      eyebrow: "Rule-based economics",
      title: "90 / 7 / 3 routing",
      body:
        "Every direct buy routes TRX inside the same transaction: 90% liquidity side, 7% controller side, 3% airdrop side.",
    },
    {
      eyebrow: "Lock design",
      title: "14D per purchase",
      body:
        "Direct-buy tokens are minted immediately and locked per batch. Each new buy creates its own unlock timer instead of mutating the whole wallet state.",
    },
    {
      eyebrow: "Liquidity architecture",
      title: "6.43% daily execution",
      body:
        "The liquidity controller can release value once per day above a hard 100 TRX threshold, then split execution across DEX-specific rails.",
    },
  ],
  sections: [
    {
      eyebrow: "What exists today",
      title: "The project is beyond a whitepaper stage",
      body:
        "The token, smart-contract system, direct-buy route, liquidity controller, vaults, unlock logic, airdrop and ambassador mechanics, wallet, and TRON utility layer already exist. The current task is to turn these connected components into a scalable payment ecosystem.",
      bullets: [
        "Android is live in Google Play; iOS is prepared for release subject to the Apple developer program setup.",
        "The airdrop funnel has already attracted roughly 1,000 early users through a wallet-first path.",
        "Tronix.rent provides a complementary TRON Energy and Bandwidth utility layer.",
      ],
    },
    {
      eyebrow: "Why capital matters",
      title: "Investor capital builds the product. Liquidity capital builds the market.",
      body:
        "These two functions are deliberately separate. Investor capital funds product, security, infrastructure, integrations, legal work, operations, and measured growth. Direct-buy and liquidity-participant capital is routed into the market infrastructure rather than treated as the company operating budget.",
    },
  ],
  thesis: [
    {
      eyebrow: "1. Product is in market",
      title: "The first operating loop already exists",
      body:
        "The wallet, token, contracts, airdrop path, and TRON utility surfaces are already operational. The investment question is how to scale a system with real components, not how to fund a first mockup.",
    },
    {
      eyebrow: "2. Rules over promises",
      title: "Control, liquidity, and reserves are separated",
      body:
        "FourteenToken, FourteenController, FourteenLiquidityController, LiquidityBootstrapper, and the vault contracts each carry distinct responsibilities. That separation makes the system easier to verify, explain, and evolve.",
    },
    {
      eyebrow: "3. Acquisition is native",
      title: "Airdrop can become a user-acquisition engine",
      body:
        "The wallet-first airdrop flow creates a direct path from distribution to a verified ecosystem user. At scale, advertising around the claim path can help offset acquisition and reward distribution costs, subject to measured economics.",
    },
    {
      eyebrow: "4. The end state is broader",
      title: "Programmable settlement is the long-term product",
      body:
        "4TEEN is researching payment commitments where funds are secured first and settled when agreed conditions are met: Payment Commitment -> Secured Funds -> Fulfillment -> Settlement. This is a roadmap direction, not a claim that those real-world rails are already live.",
    },
  ],
  proofTracks: [
    {
      eyebrow: "On-chain proof",
      title: "What the contract map makes verifiable",
      bullets: [
        "FourteenToken mints on direct purchase, locks each batch for 14 days, and routes incoming TRX by fixed 90 / 7 / 3 shares.",
        "FourteenController is the token owner and stores ambassador state, buyer bindings, processed purchase IDs, and reward accounting.",
        "FourteenLiquidityController enforces a 100 TRX minimum and a once-per-UTC-day 6.43% release rule.",
        "LiquidityBootstrapper prepares executor balances before controller-side execution instead of guessing liquidity inputs off-chain.",
      ],
    },
    {
      eyebrow: "Product proof",
      title: "What the product already exposes",
      bullets: [
        "The direct-buy screen already explains the live contract route and launches the real buy widget.",
        "Unlock timeline already renders batch-based release logic rather than pretending unlocks are abstract.",
        "Manage Crypto and Swap already frame 4TEEN inside a broader wallet product, not as a single-screen token toy.",
        "The information surfaces already map contract roles, asset-wallet balances, and operator readiness into a readable system dashboard.",
      ],
    },
    {
      eyebrow: "Narrative proof",
      title: "What a counterparty can independently review",
      bullets: [
        "Contracts, addresses, vaults, reserve state, TRX movements, token movements, liquidity events, and unlock state can be checked independently on TRON Mainnet.",
        "The whitepaper, verification route, wallet application, protocol pages, and contract links reduce diligence friction for partners.",
        "Blockchain data, not a presentation, remains the final source for technical verification.",
      ],
    },
  ],
  capitalPlan: [
    {
      eyebrow: "Use of capital",
      title: "Product, security, and infrastructure",
      body:
        "Fund development, wallet and backend operations, provider capacity, security review, legal wording, integrations, and the groundwork for the settlement direction.",
    },
    {
      eyebrow: "Use of capital",
      title: "Measured acquisition and retention",
      body:
        "Fund controlled airdrop, ambassador, and community tests with verified-wallet, claim-completion, and retention metrics rather than impressions alone.",
    },
    {
      eyebrow: "Use of capital",
      title: "Dedicated liquidity budget",
      body:
        "Keep operational funding separate from capital intended for market infrastructure. Liquidity needs its own transparent budget, controller visibility, and DEX execution discipline.",
    },
    {
      eyebrow: "Use of capital",
      title: "Launch readiness",
      body:
        "Cover store operations, monitoring, analytics, provider quotas, compliance-safe investor materials, and resilience reserves required as MAU grows.",
    },
  ],
  links: [
    {
      label: "Download Investor Deck PDF",
      href: "/docs/4teen-investor-deck.pdf",
      download: "4teen-investor-deck.pdf",
    },
    { label: "Open direct buy route", href: "/buy" },
    { label: "Open unlock timeline", href: "/unlock" },
    { label: "Open liquidity route", href: "/liquidity" },
    { label: "Review current whitepaper", href: "/whitepaper" },
    { label: "Wallet app repository", href: officialWalletRepoUrl },
    { label: "Smart contracts repository", href: officialContractsRepoUrl },
  ],
  linksEyebrow: "Investor Diligence Starts Here",
  footerNote:
    "This page is an informational investor brief, not an offer, a financial recommendation, a guarantee of returns, or a promise of token performance. Contract addresses, reserves, and on-chain activity should be independently verified before any decision.",
  contact: {
    eyebrow: "Investor conversation",
    title: "The next step is diligence around an operating system and a defined scale plan.",
    body:
      "Write with allocation range, strategic value, timeline, and the capability you can add. The most useful partner brings more than capital: distribution, compliance, market intelligence, liquidity expertise, or ecosystem reach.",
    emailLabel: "Investor contact",
    email: officialGenesisEmail,
    bullets: [
      "Survival and stabilization: $25k-$40k for baseline infrastructure, legal, and controlled tests.",
      "Six-month launch runway: $60k-$100k for operations, security/legal review, and controlled growth.",
      "Twelve-month growth runway: $150k-$300k for stronger security, provider capacity, team support, and 10k-25k MAU readiness.",
    ],
  },
};

const genesisContentByLocale: Partial<Record<SupportedSiteLocale, GenesisDeckContent>> = {
  en: genesisContentEn,
};

export function getGenesisDeckContent(locale: SupportedSiteLocale): GenesisDeckContent {
  return genesisContentByLocale[locale] ?? genesisContentEn;
}
