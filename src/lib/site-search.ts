import { getSearchContent } from "@/content/search-content";
import { getPublicPagesContent } from "@/content/public-pages-content";
import { getAllSiteNav } from "@/lib/site-config";
import { defaultSiteLocale, type SupportedSiteLocale } from "@/lib/site-locale";

export type SiteSearchEntry = {
  title: string;
  href: string;
  meta: string;
  kind: "internal" | "external";
  keywords: string[];
};

function navLabel(href: string, locale: SupportedSiteLocale) {
  return getAllSiteNav(locale).find((link) => link.href === href)?.label ?? href;
}

export function getSiteSearchEntries(
  locale: SupportedSiteLocale = defaultSiteLocale,
): SiteSearchEntry[] {
  const copy = getSearchContent(locale);
  const publicPages = getPublicPagesContent(locale);

  return [
    {
      title: navLabel("/", locale),
      href: "/",
      meta: copy.meta.mainRoute,
      kind: "internal",
      keywords: ["home", "main", "overview", "protocol"],
    },
    {
      title: navLabel("/buy", locale),
      href: "/buy",
      meta: copy.meta.protocolSurface,
      kind: "internal",
      keywords: ["buy", "direct buy", "mint", "purchase", "entry", "fourteentoken"],
    },
    {
      title: navLabel("/unlock", locale),
      href: "/unlock",
      meta: copy.meta.protocolSurface,
      kind: "internal",
      keywords: ["unlock", "timeline", "lock", "14 days", "locked balance"],
    },
    {
      title: navLabel("/liquidity", locale),
      href: "/liquidity",
      meta: copy.meta.protocolSurface,
      kind: "internal",
      keywords: ["liquidity", "controller", "bootstrapper", "execution", "release"],
    },
    {
      title: navLabel("/swap", locale),
      href: "/swap",
      meta: copy.meta.protocolSurface,
      kind: "internal",
      keywords: ["swap", "market", "dex", "pair", "quote"],
    },
    {
      title: navLabel("/airdrop", locale),
      href: "/airdrop",
      meta: copy.meta.growthSurface,
      kind: "internal",
      keywords: ["airdrop", "telegram", "instagram", "x", "claim", "vault"],
    },
    {
      title: navLabel("/ambassadors", locale),
      href: "/ambassadors",
      meta: copy.meta.growthSurface,
      kind: "internal",
      keywords: ["ambassador", "earn", "referral", "buyers", "rewards", "cabinet", "dashboard"],
    },
    {
      title: navLabel("/whitepaper", locale),
      href: "/whitepaper",
      meta: copy.meta.proofSurface,
      kind: "internal",
      keywords: ["whitepaper", "docs", "mechanics", "architecture", "documentation"],
    },
    {
      title: navLabel("/verification", locale),
      href: "/verification",
      meta: copy.meta.proofSurface,
      kind: "internal",
      keywords: ["verification", "contracts", "explorer", "repo", "trust", "proof"],
    },
    {
      title: navLabel("/blog", locale),
      href: "/blog",
      meta: copy.meta.proofSurface,
      kind: "internal",
      keywords: ["blog", "updates", "articles", "posts", "news"],
    },
    {
      title: navLabel("/app", locale),
      href: "/app",
      meta: copy.meta.downloadRoute,
      kind: "internal",
      keywords: ["app", "mobile app", "wallet", "download", "app store", "google play"],
    },
    {
      title: publicPages.privacy.metadata.title,
      href: "/privacy",
      meta: copy.meta.publicPolicy,
      kind: "internal",
      keywords: ["privacy", "data", "wallet addresses", "external links", "policy"],
    },
    {
      title: publicPages.terms.metadata.title,
      href: "/terms",
      meta: copy.meta.publicPolicy,
      kind: "internal",
      keywords: ["terms", "risk", "non-custodial", "responsibility", "policy"],
    },
    {
      title: publicPages.support.metadata.title,
      href: "/support",
      meta: copy.meta.supportRoute,
      kind: "internal",
      keywords: ["support", "contact", "telegram", "discord", "help", "official channels"],
    },
    {
      title: "FourteenToken",
      href: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
      meta: copy.meta.coreContract,
      kind: "external",
      keywords: ["fourteentoken", "token", "contract", "buytokens", "getcurrentprice"],
    },
    {
      title: "FourteenController",
      href: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
      meta: copy.meta.coreContract,
      kind: "external",
      keywords: ["controller", "ambassador", "dashboard", "withdraw rewards", "register"],
    },
    {
      title: "FourteenLiquidityController",
      href: "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ",
      meta: copy.meta.coreContract,
      kind: "external",
      keywords: ["liquidity controller", "execute liquidity", "release", "router"],
    },
    {
      title: "LiquidityBootstrapper",
      href: "https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc",
      meta: copy.meta.liquidityContract,
      kind: "external",
      keywords: ["bootstrapper", "liquidity", "executor", "sun", "justmoney"],
    },
    {
      title: "AirdropVault",
      href: "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
      meta: copy.meta.growthContract,
      kind: "external",
      keywords: ["airdrop vault", "claims", "waves", "platform bit", "distribution"],
    },
    {
      title: "Wallet App Repo",
      href: "https://github.com/info14fourteen-creator/4teen-wallet-app",
      meta: copy.meta.githubSource,
      kind: "external",
      keywords: ["wallet repo", "mobile app", "github", "wallet app"],
    },
    {
      title: "Smart Contracts Repo",
      href: "https://github.com/info14fourteen-creator/4teen-smart-contracts",
      meta: copy.meta.githubSource,
      kind: "external",
      keywords: ["contracts repo", "smart contracts", "github", "solidity"],
    },
  ];
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function isCurrentRoute(currentPath: string, href: string) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function searchSiteEntries(query: string, currentPath?: string) {
  const resultLimit = 14;
  const siteSearchEntries = getSiteSearchEntries();
  const normalized = normalize(query);
  if (!normalized) {
    const entries = siteSearchEntries.slice();

    if (!currentPath) {
      return entries.slice(0, resultLimit);
    }

    const activeIndex = entries.findIndex(
      (entry) => entry.kind === "internal" && isCurrentRoute(currentPath, entry.href),
    );

    if (activeIndex > 0) {
      const [activeEntry] = entries.splice(activeIndex, 1);
      entries.unshift(activeEntry);
    }

    return entries.slice(0, resultLimit);
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);

  return siteSearchEntries
    .map((entry) => {
      const haystack = normalize(
        [entry.title, entry.meta, ...entry.keywords].join(" "),
      );

      let score = 0;
      if (normalize(entry.title).startsWith(normalized)) score += 14;
      if (haystack.includes(normalized)) score += 8;

      for (const token of tokens) {
        if (normalize(entry.title).includes(token)) score += 5;
        if (haystack.includes(token)) score += 2;
      }

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, resultLimit)
    .map((item) => item.entry);
}
