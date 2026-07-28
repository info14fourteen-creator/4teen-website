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
      "A concise 4TEEN one-pager for investors and strategic partners: product status, protocol mechanics, traction proof, capital use, and diligence links.",
  },
  hero: {
    eyebrow: "4TEEN One-Pager",
    status: "Quick investor brief",
    title:
      "4TEEN is a live TRON wallet and token system built around direct buy, 14-day unlocks, liquidity routing, and growth rails.",
    lead:
      "This one-pager is the short version of the investor deck: what exists, why it matters, how the loop works, and where capital or strategic help can accelerate the system.",
  },
  summaryCards: [
    {
      eyebrow: "Product",
      title: "Wallet-first token flow",
      body:
        "Users enter through the app surface, not only a contract page: buy, unlock, swap, liquidity, ambassador, and proof routes are already framed as one product loop.",
    },
    {
      eyebrow: "Mechanics",
      title: "90 / 7 / 3 buy routing",
      body:
        "Every direct buy routes TRX across liquidity, controller, and airdrop sides in the same transaction, making the core economics easier to explain and verify.",
    },
    {
      eyebrow: "Retention",
      title: "14-day batch unlock",
      body:
        "Direct-buy tokens are minted immediately but unlock per purchase batch after 14 days, turning entry timing into a visible wallet state.",
    },
    {
      eyebrow: "Scale path",
      title: "Growth rails already exist",
      body:
        "Ambassador accounting, airdrop funding, verification routes, and public proof pages create a foundation for distribution instead of a blank campaign shell.",
    },
  ],
  sections: [
    {
      eyebrow: "What 4TEEN is",
      title: "A structured entry system on TRON, packaged as a wallet experience",
      body:
        "4TEEN combines token mechanics, controller-side accounting, liquidity execution, ambassador tracking, and app UX into one surface. The public site explains the system; the wallet carries the user workflow.",
      bullets: [
        "Direct buy and unlock logic are contract-backed.",
        "Liquidity and controller roles are separated for clearer verification.",
        "The app and site already expose user, investor, and proof surfaces.",
      ],
    },
    {
      eyebrow: "Why it is investable",
      title: "The opportunity is scaling a live loop, not funding a concept",
      body:
        "The project already has the mechanics, routes, app story, and diligence materials needed to start serious conversations. The next step is distribution, polish, liquidity confidence, and partner reach.",
      bullets: [
        "Product risk is lower because core flows already exist.",
        "Narrative is simple enough to teach: buy, lock, unlock, then choose the next route.",
        "Capital can go into acceleration rather than first discovery.",
      ],
    },
  ],
  snapshot: [
    {
      label: "Network",
      value: "TRON",
      detail: "Low-fee environment for direct purchase, unlock visibility, and wallet-led user actions.",
    },
    {
      label: "Primary surfaces",
      value: "App + site",
      detail: "The app carries the flow; the website carries education, proof, and investor context.",
    },
    {
      label: "Entry rule",
      value: "90 / 7 / 3",
      detail: "Buy-side routing splits liquidity, controller, and airdrop funding inside the transaction.",
    },
    {
      label: "Unlock rule",
      value: "14 days",
      detail: "Each purchase has its own unlock batch instead of one opaque wallet-wide lock.",
    },
  ],
  proofPoints: [
    {
      title: "On-chain architecture is separated",
      body:
        "Token, controller, liquidity controller, bootstrapper, and vault contracts carry distinct responsibilities, which makes diligence easier than a single opaque contract story.",
    },
    {
      title: "Wallet UX already maps the system",
      body:
        "The app surfaces direct buy, unlock timeline, swap, liquidity, ambassador cabinet, and information routes as an operational product rather than loose documentation.",
    },
    {
      title: "Public proof is shareable",
      body:
        "Whitepaper, verification, blog context, investor deck, and this one-pager give partners different depths of review without needing a private walkthrough first.",
    },
  ],
  links: [
    {
      label: "Download One-Pager PDF",
      href: "/docs/4teen-one-pager.pdf",
      download: "4teen-one-pager.pdf",
    },
    { label: "Open Investor Deck", href: "/deck" },
    { label: "Read Whitepaper", href: "/whitepaper" },
    { label: "Verify Contracts", href: "/verification" },
    { label: "Open Direct Buy", href: "/buy" },
    { label: "Wallet app repository", href: officialWalletRepoUrl },
    { label: "Smart contracts repository", href: officialContractsRepoUrl },
  ],
  linksEyebrow: "Diligence Links",
  footerNote:
    "This one-pager is a concise project brief. It is not a promise of returns, exchange listing, liquidity outcome, or market performance.",
  ask: {
    eyebrow: "Strategic Ask",
    title: "The best next conversations combine capital with distribution or execution leverage.",
    body:
      "4TEEN is looking for partners who can accelerate user acquisition, liquidity confidence, regional reach, market access, or ecosystem credibility.",
    email: officialGenesisEmail,
    bullets: [
      "Growth distribution and ambassador expansion.",
      "Liquidity, market-making, exchange, or ecosystem relationships.",
      "Product polish, localization, analytics, and conversion improvement.",
    ],
  },
};

const onePagerContentByLocale: Partial<Record<SupportedSiteLocale, OnePagerContent>> = {
  en: onePagerContentEn,
};

export function getOnePagerContent(locale: SupportedSiteLocale): OnePagerContent {
  return onePagerContentByLocale[locale] ?? onePagerContentEn;
}
