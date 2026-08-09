import type { PublicPageContent } from "@/content/public-pages-content";
import {
  officialContractsRepoUrl,
  officialGenesisEmail,
  officialWalletRepoUrl,
} from "@/content/official-links";
import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedPageContent } from "../lib/generated-localization";

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
      "4TEEN already combines a live wallet, direct-buy and unlock product flow, modular TRON contracts, scheduled liquidity execution, vault custody, and ambassador accounting. This page is the investor entry point.",
  },
  hero: {
    eyebrow: "4TEEN Deck",
    status: "Investor pitch",
    title:
      "4TEEN already has the wallet loop, smart-contract core, and growth rails. The investment case is to scale a live system before stronger distribution reaches it first.",
    lead:
      "4TEEN is not a token landing page looking for a product. The wallet already exposes direct buy, unlock timeline, swap, liquidity, ambassador, and information surfaces. The contracts already enforce minting, 14-day locks, 90 / 7 / 3 routing, controller accounting, and scheduled liquidity execution.",
  },
  summaryCards: [
    {
      eyebrow: "Live product",
      title: "Wallet + contracts are already wired",
      body:
        "The wallet already exposes buy, unlock, swap, liquidity, ambassador, and information surfaces instead of stopping at a token landing page or a whitepaper promise.",
    },
    {
      eyebrow: "Entry mechanics",
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
      eyebrow: "Liquidity cadence",
      title: "6.43% release window",
      body:
        "The liquidity controller can release value once per day above a hard 100 TRX threshold, then split execution across DEX-specific rails.",
    },
  ],
  sections: [
    {
      eyebrow: "Why now",
      title: "The zero-to-one work is already visible",
      body:
        "4TEEN is not waiting for a first prototype. The core loop already exists across contracts and wallet UX: enter through direct buy, lock each batch, watch controller-side liquidity accumulate, unlock later, and decide whether to hold or use the market route.",
      bullets: [
        "The token contract already mints on purchase and enforces the 14-day lock.",
        "The controller already holds administrative authority instead of leaving critical control with a plain wallet.",
        "The wallet already exposes the buy, unlock, swap, liquidity, and ambassador surfaces as one product story.",
      ],
    },
    {
      eyebrow: "Why capital matters",
      title: "The opportunity is not to imagine a product. It is to scale an existing loop before stronger distribution reaches it first.",
      body:
        "The strongest investor argument here is not a slogan. Product, on-chain architecture, and growth rails are already wired together. New capital can therefore compound distribution, user acquisition, liquidity depth, and credibility faster than it would in a blank-slate token project.",
    },
  ],
  thesis: [
    {
      eyebrow: "1. Product risk is lower",
      title: "This is already beyond concept stage",
      body:
        "The wallet app already includes direct buy, unlock timeline, swap, wallet home, information routing, and ambassador-facing operational surfaces. That changes the investor conversation from concept risk to scaling risk.",
    },
    {
      eyebrow: "2. Architecture is explainable",
      title: "Control, liquidity, and reserves are separated",
      body:
        "FourteenToken, FourteenController, FourteenLiquidityController, LiquidityBootstrapper, and the vault contracts each carry distinct responsibilities. That separation makes the system easier to verify, explain, and evolve.",
    },
    {
      eyebrow: "3. Growth rails are real",
      title: "Airdrop and ambassador logic are already connected",
      body:
        "The controller stores ambassador state, buyer binding, reward accounting, and processed purchase IDs. The airdrop side is funded inside the direct-buy route instead of being left as a marketing wish.",
    },
    {
      eyebrow: "4. The loop is transmissible",
      title: "Buy, lock, unlock, then choose the next route",
      body:
        "That sequence is clear enough for users, strong enough for content, and structured enough for investor diligence. It creates a story the wallet can actually execute and the site can prove.",
    },
  ],
  proofTracks: [
    {
      eyebrow: "On-chain proof",
      title: "What the contracts already enforce",
      bullets: [
        "FourteenToken mints on purchase, locks each batch for 14 days, and routes incoming TRX by fixed 90 / 7 / 3 shares.",
        "FourteenController is the token owner and stores ambassador state, buyer bindings, processed purchase IDs, and reward accounting.",
        "FourteenLiquidityController enforces a 100 TRX minimum and a once-per-UTC-day 6.43% release rule.",
        "LiquidityBootstrapper prepares executor balances before controller-side execution instead of guessing liquidity inputs off-chain.",
      ],
    },
    {
      eyebrow: "Product proof",
      title: "What the wallet already exposes",
      bullets: [
        "The direct-buy screen already explains the live contract route and launches the real buy widget.",
        "Unlock timeline already renders batch-based release logic rather than pretending unlocks are abstract.",
        "Manage Crypto and Swap already frame 4TEEN inside a broader wallet product, not as a single-screen token toy.",
        "The information surfaces already map contract roles, asset-wallet balances, and operator readiness into a readable system dashboard.",
      ],
    },
    {
      eyebrow: "Narrative proof",
      title: "What the site can already explain to the market",
      bullets: [
        "The public site already translates the token, controller, liquidity, unlock, and proof surfaces into one readable user story.",
        "The whitepaper, live protocol routes, and contract links reduce diligence friction for new capital and strategic partners.",
        "The strongest message is simple: the product loop exists, the chain logic exists, and the growth layer can already be shown, not imagined.",
      ],
    },
  ],
  capitalPlan: [
    {
      eyebrow: "Use of capital",
      title: "Distribution and growth loops",
      body:
        "Expand ambassador acquisition, campaign operations, regional distribution, and the public content machine that turns the protocol into a story users can actually follow.",
    },
    {
      eyebrow: "Use of capital",
      title: "Product polish and retention",
      body:
        "Push wallet UX, conversion surfaces, localization, instrumentation, and onboarding quality so the product can support larger inflows without looking unfinished.",
    },
    {
      eyebrow: "Use of capital",
      title: "Liquidity confidence",
      body:
        "Improve market confidence around the direct-buy narrative, controller-side liquidity visibility, and execution reliability so the system reads as durable rather than experimental.",
    },
    {
      eyebrow: "Use of capital",
      title: "Credibility layer",
      body:
        "Sharpen docs, investor materials, institutional explanations, and verification surfaces so serious counterparties can understand the project without needing a private walkthrough first.",
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
    "This page is meant to start investor conversations around a live system, not to promise returns or hide product reality behind vague token language.",
  contact: {
    eyebrow: "Contact Genesis",
    title: "If this reads like something worth funding, the next step should be direct contact.",
    body:
      "Write with allocation size, strategic value, timeline, and where you think you can accelerate the system fastest. The right investor here is not passive capital. It is capital plus distribution, market intelligence, liquidity credibility, or ecosystem reach.",
    emailLabel: "Investor contact",
    email: officialGenesisEmail,
    bullets: [
      "Seed, strategic, or ecosystem-scale capital conversations are welcome.",
      "Bridge intros, market-making relationships, exchange paths, and growth distribution are as relevant as the check itself.",
      "The strongest conversation starts with what you can accelerate, not only with what you can wire.",
    ],
  },
};

const genesisContentByLocale: Partial<Record<SupportedSiteLocale, GenesisDeckContent>> = {
  en: genesisContentEn,
};

export function getGenesisDeckContent(locale: SupportedSiteLocale): GenesisDeckContent {
  return getGeneratedPageContent(
    locale,
    "deck",
    genesisContentByLocale[locale] ?? genesisContentEn,
  );
}
