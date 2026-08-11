import createJiti from "jiti";
import path from "node:path";

// The translation scripts run outside Next.js. Jiti applies this repository's
// TypeScript and path-alias configuration while reading the English source.
const jiti = createJiti(import.meta.url, {
  alias: { "@": path.resolve("src") },
  interopDefault: true,
});
const load = (modulePath) => jiti(modulePath);

function getWhitepaperTranslationSurface(content) {
  const translated = structuredClone(content);

  // Historical papers are source documents, not UI copy. Their full text in
  // every locale overflows the Worker bundle, so only page chrome and summaries
  // enter the locale pipeline for now.
  delete translated.current.document;
  for (const version of Object.values(translated.versions)) {
    delete version.document;
  }

  return translated;
}

const moduleLoaders = {
  airdrop: async () => {
    const contentModule = load("../../src/content/airdrop-content.ts");
    return contentModule.getAirdropPageContent("en");
  },
  ambassadors: async () => {
    const contentModule = load("../../src/content/ambassadors-content.ts");
    return contentModule.getAmbassadorsPageContent("en");
  },
  app: async () => {
    const contentModule = load("../../src/content/app-content.ts");
    return contentModule.getAppPageContent("en");
  },
  blog: async () => {
    const contentModule = load("../../src/content/public-pages-content.ts");
    return contentModule.getPublicPagesContent("en").blog;
  },
  buy: async () => {
    const contentModule = load("../../src/content/buy-content.ts");
    return contentModule.getBuyPageContent("en");
  },
  global: async () => {
    const [chrome, nav, search] = await Promise.all([
      load("../../src/content/chrome-content.ts"),
      load("../../src/content/nav-content.ts"),
      load("../../src/content/search-content.ts"),
    ]);

    return {
      chrome: chrome.getChromeContent("en"),
      nav: nav.getNavContent("en"),
      search: search.getSearchContent("en"),
    };
  },
  home: async () => {
    const contentModule = load("../../src/content/home-content.ts");
    return contentModule.getHomePageContent("en");
  },
  liquidity: async () => {
    const contentModule = load("../../src/content/liquidity-content.ts");
    return contentModule.getLiquidityPageContent("en");
  },
  deck: async () => {
    const contentModule = load("../../src/content/genesis-content.ts");
    return contentModule.getGenesisDeckContent("en");
  },
  "one-pager": async () => {
    const contentModule = load("../../src/content/one-pager-content.ts");
    return contentModule.getOnePagerContent("en");
  },
  privacy: async () => {
    const contentModule = load("../../src/content/public-pages-content.ts");
    return contentModule.getPublicPagesContent("en").privacy;
  },
  support: async () => {
    const contentModule = load("../../src/content/public-pages-content.ts");
    return contentModule.getPublicPagesContent("en").support;
  },
  swap: async () => {
    const contentModule = load("../../src/content/swap-content.ts");
    return contentModule.getSwapPageContent("en");
  },
  terms: async () => {
    const contentModule = load("../../src/content/public-pages-content.ts");
    return contentModule.getPublicPagesContent("en").terms;
  },
  unlock: async () => {
    const contentModule = load("../../src/content/unlock-content.ts");
    return contentModule.getUnlockPageContent("en");
  },
  verification: async () => {
    const contentModule = load("../../src/content/verification-content.ts");
    return contentModule.getVerificationPageContent("en");
  },
  whitepaper: async () => {
    const contentModule = load("../../src/content/whitepaper-content.ts");
    return getWhitepaperTranslationSurface(
      contentModule.getWhitepaperPageContent("en"),
    );
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
