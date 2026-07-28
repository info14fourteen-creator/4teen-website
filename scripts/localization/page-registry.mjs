const moduleLoaders = {
  airdrop: async () => {
    const contentModule = await import("../../src/content/airdrop-content.ts");
    return contentModule.getAirdropPageContent("en");
  },
  ambassadors: async () => {
    const contentModule = await import("../../src/content/ambassadors-content.ts");
    return contentModule.getAmbassadorsPageContent("en");
  },
  app: async () => {
    const contentModule = await import("../../src/content/app-content.ts");
    return contentModule.getAppPageContent("en");
  },
  buy: async () => {
    const contentModule = await import("../../src/content/buy-content.ts");
    return contentModule.getBuyPageContent("en");
  },
  global: async () => {
    const [chrome, nav, search] = await Promise.all([
      import("../../src/content/chrome-content.ts"),
      import("../../src/content/nav-content.ts"),
      import("../../src/content/search-content.ts"),
    ]);

    return {
      chrome: chrome.getChromeContent("en"),
      nav: nav.getNavContent("en"),
      search: search.getSearchContent("en"),
    };
  },
  liquidity: async () => {
    const contentModule = await import("../../src/content/liquidity-content.ts");
    return contentModule.getLiquidityPageContent("en");
  },
  swap: async () => {
    const contentModule = await import("../../src/content/swap-content.ts");
    return contentModule.getSwapPageContent("en");
  },
  unlock: async () => {
    const contentModule = await import("../../src/content/unlock-content.ts");
    return contentModule.getUnlockPageContent("en");
  },
  verification: async () => {
    const contentModule = await import("../../src/content/verification-content.ts");
    return contentModule.getVerificationPageContent("en");
  },
};

export const pageRoutes = {
  airdrop: "/airdrop",
  ambassadors: "/ambassadors",
  app: "/app",
  blog: "/blog",
  buy: "/buy",
  deck: "/deck",
  global: "/",
  home: "/",
  liquidity: "/liquidity",
  "one-pager": "/one-pager",
  privacy: "/privacy",
  support: "/support",
  swap: "/swap",
  terms: "/terms",
  unlock: "/unlock",
  verification: "/verification",
  whitepaper: "/whitepaper",
};

export async function loadEnglishPageContent(page) {
  const loader = moduleLoaders[page];

  if (!loader) {
    throw new Error(
      `Page "${page}" needs a dedicated extractor before it can enter the translation queue`,
    );
  }

  return loader();
}

export function hasPageExtractor(page) {
  return Boolean(moduleLoaders[page]);
}
