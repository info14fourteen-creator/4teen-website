import type { SupportedSiteLocale } from "@/lib/site-locale";

export type ChromeContent = {
  taglines: string[];
  header: {
    home: string;
    getApp: string;
  };
  market: {
    loading: string;
    unavailable: string;
  };
  mobileSearch: {
    ariaLabel: string;
    placeholder: string;
    eyebrow: string;
    title: string;
    dialogAria: string;
    route: string;
    external: string;
    empty: string;
  };
  desktopSearch: {
    prompts: string[];
    ariaLabel: string;
    actionAria: string;
    eyebrow: string;
    title: string;
    dialogAria: string;
    closeAria: string;
    resultsSuffix: string;
    noResultsYet: string;
    pressEnter: string;
    topMatch: string;
    route: string;
    external: string;
    empty: string;
  };
  locale: {
    eyebrow: string;
    title: string;
    active: string;
    soon: string;
  };
  mobileMenu: {
    coreSurfaces: string;
    docsAndRoutes: string;
    closeOpenPanelAria: string;
  };
  mobileDock: {
    menu: string;
    close: string;
    openMenuAria: string;
    closeMenuAria: string;
    openHomeAria: string;
    openSearchAria: string;
    openLanguageAria: string;
  };
  footer: {
    protocol: string;
    ecosystem: string;
    legal: string;
    privacy: string;
    terms: string;
    support: string;
    officialChannels: string;
    brandText: string;
    getApp: string;
    copyright: string;
    officialWebsite: string;
  };
};

const chromeContentEn: ChromeContent = {
  taglines: [
    "Early Entry. Higher Exit.",
    "Winners Don't Wait.",
    "Turn 14 Days Into Profit.",
    "Move Early. Win Early.",
  ],
  header: {
    home: "Home",
    getApp: "Get App",
  },
  market: {
    loading: "Loading price",
    unavailable: "Price unavailable",
  },
  mobileSearch: {
    ariaLabel: "Search routes, contracts, and docs",
    placeholder: "Search routes, contracts, docs...",
    eyebrow: "Quick Search",
    title: "Pages, contracts, and proof surfaces",
    dialogAria: "Search results",
    route: "Route",
    external: "External",
    empty: "No quick matches yet. Try route, contract, or proof words.",
  },
  desktopSearch: {
    prompts: [
      "Search contracts, routes, docs...",
      "FourteenToken",
      "Unlock timeline",
      "Liquidity controller",
      "Ambassador rewards",
      "Whitepaper",
    ],
    ariaLabel: "Search 4TEEN routes and contracts",
    actionAria: "Open search results",
    eyebrow: "Quick search results",
    title: "Quick pages, contracts, and proof surfaces.",
    dialogAria: "Search results",
    closeAria: "Close search",
    resultsSuffix: "results",
    noResultsYet: "No results yet",
    pressEnter: "Press Enter to open the top match.",
    topMatch: "Top match",
    route: "Route",
    external: "External",
    empty: "No results. Try `buy`, `unlock`, `airdrop`, `controller`, or `whitepaper`.",
  },
  locale: {
    eyebrow: "Language",
    title: "Choose interface language",
    active: "Active",
    soon: "Soon",
  },
  mobileMenu: {
    coreSurfaces: "Core surfaces",
    docsAndRoutes: "Docs and routes",
    closeOpenPanelAria: "Close open panel",
  },
  mobileDock: {
    menu: "Menu",
    close: "Close",
    openMenuAria: "Open mobile menu",
    closeMenuAria: "Close mobile menu",
    openHomeAria: "Open home",
    openSearchAria: "Open mobile search",
    openLanguageAria: "Open language panel",
  },
  footer: {
    protocol: "Protocol",
    ecosystem: "Ecosystem",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    officialChannels: "Official Channels",
    brandText:
      "The wallet app now carries the live system surface: direct buy, unlock state, controller truth, ambassador cabinet, and Telegram-first growth flow.",
    getApp: "Get the App",
    copyright: "© 2026 4TEEN. Structured on-chain entry on TRON.",
    officialWebsite: "Official website: 4teen.me",
  },
};

const chromeContentByLocale: Partial<Record<SupportedSiteLocale, ChromeContent>> = {
  en: chromeContentEn,
};

export function getChromeContent(locale: SupportedSiteLocale) {
  return chromeContentByLocale[locale] ?? chromeContentEn;
}
