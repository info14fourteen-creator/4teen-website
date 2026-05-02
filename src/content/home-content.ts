import type { SupportedSiteLocale } from "@/lib/site-locale";

type InternalLink = {
  label: string;
  href: string;
};

type ExternalLink = InternalLink & {
  external: true;
};

type ContentLink = InternalLink | ExternalLink;

export type HomePageContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    proofStrip: string[];
    actions: [InternalLink, InternalLink];
    points: string[];
    railEyebrow: string;
    railTitle: string;
    railText: string;
    railStats: Array<{
      label: string;
      value: string;
    }>;
    trustLinks: ContentLink[];
  };
  difference: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      kicker: string;
      title: string;
      text: string;
    }>;
  };
  system: {
    eyebrow: string;
    title: string;
    description: string;
    paths: Array<{
      share: string;
      title: string;
      text: string;
      points: string[];
    }>;
  };
  surfaces: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      meta: string;
      title: string;
      text: string;
      href: string;
    }>;
  };
  wallets: {
    eyebrow: string;
    title: string;
    description: string;
    recommendedTitle: string;
    compatibleTitle: string;
    recommended: string[];
    compatible: string[];
    note: string;
  };
  verification: {
    eyebrow: string;
    title: string;
    description: string;
    groups: Array<{
      title: string;
      links: ContentLink[];
    }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
    riskTitle: string;
    riskText: string;
    riskBullets: string[];
  };
  cta: {
    eyebrow: string;
    title: string;
    lead: string;
    actions: [InternalLink, InternalLink, InternalLink];
  };
};

const homeContentEn: HomePageContent = {
  hero: {
    eyebrow: "4TEEN protocol",
    title: "Protocol entry for people who want structure, not noise.",
    lead:
      "4TEEN is a protocol-native entry layer on TRON. When you buy through the contract, the system mints your position, locks it for 14 days, and routes incoming TRX by visible rules.",
    body:
      "This is the right place to understand what you are entering before you open the buy flow: how direct entry differs from a swap, where liquidity goes, how ambassador rewards are accounted for, and what can be verified on-chain.",
    proofStrip: [
      "Direct contract entry",
      "14-day fixed lock",
      "Visible TRX routing",
    ],
    actions: [
      { label: "Open direct buy", href: "/buy" },
      { label: "Read verification", href: "/verification" },
    ],
    points: [
      "Direct protocol entry and DEX trading are different surfaces.",
      "Purchased tokens are minted into a 14-day locked position.",
      "Liquidity, rewards, and distribution do not sit in one black box.",
    ],
    railEyebrow: "Entry map",
    railTitle: "What actually happens after a direct buy.",
    railText:
      "4TEEN separates token issuance, lock state, liquidity execution, ambassador accounting, and airdrop reserve into distinct paths so users can inspect behavior instead of guessing it.",
    railStats: [
      { label: "Contract", value: "FourteenToken" },
      { label: "Lock window", value: "14 days fixed" },
      { label: "Routing", value: "90 / 7 / 3" },
      { label: "Daily release", value: "6.43% controller rule" },
    ],
    trustLinks: [
      {
        label: "Core contract",
        href: "https://tronscan.org/#/contract/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
        external: true,
      },
      {
        label: "Wallet app",
        href: "https://github.com/info14fourteen-creator/4teen-wallet-app",
        external: true,
      },
      { label: "Whitepaper", href: "/whitepaper" },
    ],
  },
  difference: {
    eyebrow: "Why it feels different",
    title: "The protocol is designed to explain behavior, not hide it.",
    description:
      "Most token sites try to compress everything into one buy button. 4TEEN works better when the user can see the difference between entry, timing, and execution.",
    cards: [
      {
        kicker: "Entry",
        title: "Protocol entry is not the same as a generic swap.",
        text:
          "A direct buy starts inside FourteenToken. The position is created by contract logic instead of being treated like open market inventory.",
      },
      {
        kicker: "Timing",
        title: "The 14-day lock changes what happens after purchase.",
        text:
          "Direct buyers do not receive instantly liquid tokens. The lock is fixed, visible, and part of the product logic rather than an optional note.",
      },
      {
        kicker: "Visibility",
        title: "TRX routing is split into roles you can reason about.",
        text:
          "Liquidity execution, ambassador rewards, and airdrop reserve move through separate layers. That makes the system easier to inspect and easier to explain.",
      },
    ],
  },
  system: {
    eyebrow: "System map",
    title: "One entry, three on-chain paths.",
    description:
      "After a direct buy, incoming TRX does not disappear into a mixed treasury. It is routed into three layers with different jobs.",
    paths: [
      {
        share: "90%",
        title: "Liquidity path",
        text:
          "The largest share moves into the controller-side liquidity system. Release timing, reserve storage, bootstrap preparation, and DEX execution are handled as separate responsibilities.",
        points: [
          "FourteenLiquidityController manages daily release timing.",
          "LiquidityBootstrapper prepares execution across supported DEX routes.",
          "JustMoney and Sun.io V3 stay visible as distinct execution paths.",
        ],
      },
      {
        share: "7%",
        title: "Controller and ambassadors",
        text:
          "This path supports protocol control, verified purchase attribution, ambassador level progression, and claimable reward accounting.",
        points: [
          "Registration and referral identity live in the controller layer.",
          "Reward percentage follows verified buyer count.",
          "Claimable rewards stay separate from token issuance and liquidity.",
        ],
      },
      {
        share: "3%",
        title: "Airdrop reserve",
        text:
          "The airdrop layer is a structured community distribution route with fixed waves and wallet-aware claim rules.",
        points: [
          "Six fixed waves define how supply is staged.",
          "Telegram is the live social route today.",
          "More platform routes can be added without changing the core entry flow.",
        ],
      },
    ],
  },
  surfaces: {
    eyebrow: "Main surfaces",
    title: "Home should point you to the right route fast.",
    description:
      "Instead of hiding tools under one long page, the new site treats each core protocol surface as its own destination.",
    cards: [
      {
        meta: "Primary route",
        title: "Buy",
        text:
          "Start the direct-buy flow with wallet support, lock preview, and clear separation from swap behavior.",
        href: "/buy",
      },
      {
        meta: "Tracking route",
        title: "Unlock",
        text:
          "See how direct purchases move through the 14-day lock cycle and what unlock visibility should look like.",
        href: "/unlock",
      },
      {
        meta: "Verification route",
        title: "Liquidity",
        text:
          "Read the controller side of the system: release rules, reserve flow, bootstrapper relation, and execution paths.",
        href: "/liquidity",
      },
      {
        meta: "Growth route",
        title: "Ambassadors",
        text:
          "Understand referral identity, buyer attribution, level progression, and future cabinet behavior in one place.",
        href: "/ambassadors",
      },
      {
        meta: "Community route",
        title: "Airdrop",
        text:
          "Follow the staged distribution layer, the live Telegram route, and how future social campaigns fit into the protocol.",
        href: "/airdrop",
      },
      {
        meta: "Reading route",
        title: "Whitepaper",
        text:
          "Use the documentation layer when you want the long-form explanation of token mechanics and contract roles.",
        href: "/whitepaper",
      },
    ],
  },
  wallets: {
    eyebrow: "Wallet support",
    title: "Mobile wallet compatibility matters because this is a real product flow.",
    description:
      "The buy route should open from mobile wallet browsers cleanly. Some wallets work better because they also display balances correctly inside the interface.",
    recommendedTitle: "Best current experience",
    compatibleTitle: "Compatible, but less complete",
    recommended: [
      "Binance Wallet",
      "Bitget Wallet",
      "OKX Wallet",
      "TokenPocket",
    ],
    compatible: [
      "FoxWallet",
      "imToken",
      "MetaMask",
      "TronLink",
      "WalletConnect",
      "Trust Wallet via desktop extension",
    ],
    note:
      "The wallet list belongs on Home because it directly affects whether users can enter the system smoothly from mobile.",
  },
  verification: {
    eyebrow: "Verification",
    title: "Trust should point straight into the real system.",
    description:
      "4TEEN is strongest when the website sends people to contracts, repos, and product surfaces instead of hiding behind vague language.",
    groups: [
      {
        title: "Core contracts",
        links: [
          {
            label: "FourteenToken",
            href: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
            external: true,
          },
          {
            label: "FourteenController",
            href: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
            external: true,
          },
          {
            label: "FourteenLiquidityController",
            href: "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ",
            external: true,
          },
          {
            label: "AirdropVault",
            href: "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
            external: true,
          },
        ],
      },
      {
        title: "Public sources",
        links: [
          {
            label: "Wallet app repo",
            href: "https://github.com/info14fourteen-creator/4teen-wallet-app",
            external: true,
          },
          {
            label: "Smart contracts repo",
            href: "https://github.com/info14fourteen-creator/4teen-smart-contracts",
            external: true,
          },
          { label: "Whitepaper route", href: "/whitepaper" },
          { label: "Verification route", href: "/verification" },
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Before you enter",
    title: "Clear answers beat aggressive marketing.",
    description:
      "Home should remove confusion first: what direct buy means, what the lock changes, what can be verified, and what the protocol does not promise.",
    items: [
      {
        question: "Why choose direct buy instead of a swap?",
        answer:
          "Because direct buy is a protocol-native entry path. It mints the position, applies the 14-day lock, and routes TRX by contract rules instead of behaving like a normal market trade.",
      },
      {
        question: "What happens immediately after purchase?",
        answer:
          "The position is created on-chain, tokens enter the fixed lock window, and incoming TRX is split across liquidity, controller-side rewards, and airdrop reserve.",
      },
      {
        question: "What can I verify myself?",
        answer:
          "You can inspect the contract addresses, public repositories, route structure, and explorer links. The system is meant to be read as infrastructure, not as a blind promise.",
      },
      {
        question: "Does the structure guarantee profit?",
        answer:
          "No. Structured mechanics can make behavior easier to inspect, but they do not remove market risk and they do not guarantee outcome.",
      },
    ],
    riskTitle: "Risk still exists even when structure is visible.",
    riskText:
      "The protocol can be more legible than a generic token page and still remain a risk-bearing market product.",
    riskBullets: [
      "Direct protocol price and open-market price are not the same signal.",
      "A fixed lock changes timing, not economic certainty.",
      "Liquidity rules describe execution behavior, not future returns.",
      "Users still need to verify, decide independently, and size risk carefully.",
    ],
  },
  cta: {
    eyebrow: "Next step",
    title: "Start with the route that matches your intent.",
    lead:
      "Open the buy flow if you are ready to enter, the verification layer if you need proof first, or the whitepaper if you want the long-form mechanics.",
    actions: [
      { label: "Go to buy", href: "/buy" },
      { label: "Open verification", href: "/verification" },
      { label: "Read whitepaper", href: "/whitepaper" },
    ],
  },
};

const homeContentByLocale: Record<SupportedSiteLocale, HomePageContent> = {
  en: homeContentEn,
  ru: homeContentEn,
  uz: homeContentEn,
};

export function getHomePageContent(
  locale: SupportedSiteLocale,
): HomePageContent {
  return homeContentByLocale[locale] ?? homeContentEn;
}
