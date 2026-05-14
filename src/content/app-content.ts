import type { SupportedSiteLocale } from "@/lib/site-locale";

type StoreLink = {
  href: string;
  label: string;
  meta: string;
};

export type AppPageContent = {
  metadata: {
    title: string;
    description: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
    stayOnWeb: string;
    primaryCta?: string;
    secondaryCta?: string;
    ctaNote?: string;
    rotatingLines?: string[];
    stats: Array<{
      label: string;
      value: string;
      meta: string;
    }>;
  };
  storeLinks: StoreLink[];
  entryFlow: Array<{
    eyebrow: string;
    title: string;
    body: string;
  }>;
  walletFoundation: Array<{
    eyebrow: string;
    title: string;
    text: string;
  }>;
  resourceLayer: Array<{
    eyebrow: string;
    title: string;
    text: string;
  }>;
  protocolSurfaces: Array<{
    eyebrow: string;
    title: string;
    text: string;
    href: string;
  }>;
  operatingRules: Array<{
    title: string;
    text: string;
  }>;
  downloadReasons: string[];
  sections: {
    entryFlow: {
      eyebrow: string;
      title: string;
    };
    walletFoundation: {
      eyebrow: string;
      title: string;
    };
    resourceLayer: {
      eyebrow: string;
      title: string;
      notePrefix: string;
      noteNeedNow: string;
      noteMiddle: string;
      noteMissing: string;
      noteSuffix: string;
    };
    protocolSurfaces: {
      eyebrow: string;
      title: string;
    };
    operatingRuleLabel: string;
    download: {
      eyebrow: string;
      title: string;
      body: string;
      repoLabel: string;
    };
  };
};

const appContentEn: AppPageContent = {
  metadata: {
    title: "4TEEN App | Real TRON Wallet + 4TEEN Layer",
    description:
      "A real TRON wallet with broad asset handling, resource-aware execution, and the full 4TEEN operating layer built inside.",
    openGraphTitle: "4TEEN Mobile App",
    openGraphDescription:
      "A multilingual TRON wallet with broad asset coverage, resource checks before signature, and the full 4TEEN operating layer already built in.",
  },
  hero: {
    eyebrow: "4TEEN Mobile App",
    status: "Universal wallet + live protocol layer",
    title:
      "A real TRON wallet with the full 4TEEN operating layer already inside.",
    lead:
      "This is not a token-shell pretending to be a wallet. It already works like a broader TRON product: wallets, assets, transfers, QR flow, contacts, language, settings, resource checks, and a full 4TEEN route map inside the same execution layer.",
    stayOnWeb: "Stay on Web",
    primaryCta: "Open Route Map",
    secondaryCta: "See Protocol Surfaces",
    ctaNote:
      "The web side explains the system. The mobile side signs, routes, checks resources, and runs the actual transaction flow.",
    rotatingLines: [
      "Universal Wallet. Native 4TEEN Layer.",
      "Broad Token Surface. Not Just One Asset.",
      "Resources First. Signature After.",
      "Wallet Core. Protocol Routes. Same Product.",
    ],
    stats: [
      {
        label: "Wallet core",
        value: "TRON-first",
        meta: "Wallets, send, asset management, scan, contacts, settings.",
      },
      {
        label: "Asset scope",
        value: "Broad",
        meta: "TRX, 4TEEN, stable assets, and user-managed custom token entries.",
      },
      {
        label: "Languages",
        value: "16",
        meta: "Dedicated language route with app-wide locale control.",
      },
      {
        label: "4TEEN layer",
        value: "7 Routes",
        meta: "Buy, swap, unlock, liquidity, airdrop, ambassadors, and info.",
      },
    ],
  },
  storeLinks: [
    {
      href: "https://apps.apple.com/",
      label: "App Store",
      meta: "Download for iPhone and iPad",
    },
    {
      href: "https://play.google.com/store/apps",
      label: "Google Play",
      meta: "Download for Android",
    },
  ],
  entryFlow: [
    {
      eyebrow: "Boot",
      title: "Smart entry routing",
      body: "The mobile app does not dump every user into one generic start screen. It decides between first access, wallet unlock, and the active wallet path before the user even reaches the main product layer.",
    },
    {
      eyebrow: "Home",
      title: "Compact hub",
      body: "The real home screen already acts as a working hub: direct buy, unlock visibility, liquidity control, and information routes stay close without hiding their deeper dedicated screens.",
    },
    {
      eyebrow: "Deep routes",
      title: "Full screens when needed",
      body: "Every serious action still opens into its own surface. The app stays compact at the top layer, but never collapses important flow into one shallow dashboard.",
    },
  ],
  walletFoundation: [
    {
      eyebrow: "Wallets",
      title: "Multiple identities, not one fixed shell",
      text: "Users can create, import, rename, switch, and remove wallets, while the product keeps clear separation between signing wallets and watch-only wallets.",
    },
    {
      eyebrow: "Send",
      title: "Real transfer preparation",
      text: "Send is not a raw address box. It already supports QR scan, contacts, recent recipients, asset selection, spendable-balance rules, and a clean confirmation step.",
    },
    {
      eyebrow: "Manage Crypto",
      title: "Broader than one ecosystem asset",
      text: "Manage Crypto is a real wallet layer: TRX, 4TEEN, stable assets, custom token entries, filters, sort modes, and target-asset selection for send and swap live in the same surface.",
    },
    {
      eyebrow: "Language",
      title: "16 interface languages",
      text: "The language layer is already built into the product with a dedicated route and app-level locale control across major regional entry points.",
    },
  ],
  resourceLayer: [
    {
      eyebrow: "Need now",
      title: "Resources are measured before signature",
      text: "Direct buy, send, swap, liquidity execution, and other contract routes estimate Energy and Bandwidth before the app asks for passcode or biometrics.",
    },
    {
      eyebrow: "Shortfall",
      title: "TRX burn is made visible instead of hidden",
      text: "The app compares required resources against current wallet resources, shows the shortfall, and exposes the expected burn path instead of letting the user discover it through failure.",
    },
    {
      eyebrow: "Rental",
      title: "Resource top-up is integrated into the flow",
      text: "The code already supports rental quote, payment, waiting, and ready states for send transfer, swap, direct buy, liquidity execution, ambassador registration, and ambassador withdrawals.",
    },
    {
      eyebrow: "Replay",
      title: "Pending rows stay operationally honest",
      text: "If the operator side drops below its safe resource floor, queued rows stay visible while the backend tops up resources and the replay cycle checks again until the reward lands on-chain.",
    },
  ],
  protocolSurfaces: [
    {
      eyebrow: "Direct Buy",
      title: "Prepare → confirm",
      text: "The buy route prepares the transaction first: quote, mint-on-purchase context, 14-day lock, TRX split preview, and only then the real confirmation and signing step.",
      href: "/buy",
    },
    {
      eyebrow: "Swap Token",
      title: "Route comparison, not blind exchange",
      text: "The swap route can compare paths, switch target assets, surface protected minimum receive, and stop the flow early if allowance or network resources are not ready.",
      href: "/swap",
    },
    {
      eyebrow: "Unlock Timeline",
      title: "Per-purchase lock visibility",
      text: "Each locked batch is shown by wallet, amount, UTC unlock time, countdown, and source transaction. This is a purpose-built lock surface, not just generic history.",
      href: "/unlock",
    },
    {
      eyebrow: "Liquidity Controller",
      title: "Controller-side truth",
      text: "The liquidity route exposes the 100 TRX threshold, 6.43% daily release cadence, executor split, and execution gating inside the app itself.",
      href: "/liquidity",
    },
    {
      eyebrow: "Airdrop",
      title: "Telegram-first live state",
      text: "The airdrop route combines current bot session state, local wallet state, and on-chain claim state. Telegram is live now; other socials are staged rails, not fake active buttons.",
      href: "/airdrop",
    },
    {
      eyebrow: "Ambassador",
      title: "Registration and cabinet in one route",
      text: "The ambassador route starts as registration and becomes the cabinet for the same wallet: identity slug, buyer binding, purchase rows, pending replay, withdrawals, and claimable state.",
      href: "/ambassadors",
    },
    {
      eyebrow: "Info",
      title: "Compact architecture and runtime map",
      text: "The information route connects contracts, vaults, liquidity execution, asset-wallet balances, and operator readiness, so architecture and runtime state are visible inside the product.",
      href: "/verification",
    },
  ],
  operatingRules: [
    {
      title: "Universal wallet first",
      text: "The strongest reading of this app is not “an ecosystem shell”. It behaves like a broader TRON wallet with a wider token universe, and 4TEEN is built into that foundation as a live product layer.",
    },
    {
      title: "Watch-only and signing are different states",
      text: "The app treats inspection and action differently. Watch-only wallets can read portfolio and protocol state, while direct buy, registration, liquidity execution, and withdrawal require full-access signing wallets.",
    },
    {
      title: "Operational readiness is part of the interface",
      text: "Controller gating, resource coverage, queued reward rows, and replay status are expressed as product states. The user sees what is ready now, what needs top-up, and what is waiting.",
    },
    {
      title: "Multilingual is product infrastructure",
      text: "Language support is already encoded into the app, not left as a future wish. That matters because the product is meant to work beyond one market and beyond one community entry route.",
    },
  ],
  downloadReasons: [
    "Use it as a broader TRON wallet, not only as a 4TEEN access point.",
    "Keep portfolio, custom token handling, transfers, scanning, contacts, and language control in the same product.",
    "Open the full 4TEEN layer inside the wallet: buy, swap, unlock, liquidity, airdrop, ambassadors, and info.",
    "See network load, resource shortfall, route protection, and operational readiness before signing or waiting blindly.",
  ],
  sections: {
    entryFlow: {
      eyebrow: "Entry Flow",
      title: "How the real app moves the user",
    },
    walletFoundation: {
      eyebrow: "Wallet Foundation",
      title: "Why this is a real wallet first",
    },
    resourceLayer: {
      eyebrow: "Resource Intelligence",
      title: "Why execution is safer than blind signing",
      notePrefix: "Inside the app, network-load cards already surface",
      noteNeedNow: "Need now",
      noteMiddle: "Available now",
      noteMissing: "Missing",
      noteSuffix:
        "and coverage percentage for both Energy and Bandwidth. That makes the execution model easier to trust because the wallet explains the cost before the transaction is signed.",
    },
    protocolSurfaces: {
      eyebrow: "4TEEN Surfaces",
      title: "What the protocol layer already does inside the wallet",
    },
    operatingRuleLabel: "Operating Rule",
    download: {
      eyebrow: "Download Route",
      title: "Install the wallet if you want the full product, not only the web map.",
      body:
        "The strongest version of the product lives in the app: real wallet behavior, multilingual interface, resource-aware execution, and the full 4TEEN operating layer in one place.",
      repoLabel: "Wallet App Repo",
    },
  },
};

const appContentByLocale: Partial<Record<SupportedSiteLocale, AppPageContent>> = {
  en: appContentEn,
};

export function getAppPageContent(locale: SupportedSiteLocale) {
  return appContentByLocale[locale] ?? appContentEn;
}
