export type SiteLocale = {
  code: string;
  label: string;
  status: "live" | "next";
};

export type SiteNavLink = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const siteLocales: SiteLocale[] = [
  { code: "en", label: "English", status: "live" },
  { code: "ru", label: "Russian", status: "next" },
  { code: "uz", label: "Uzbek", status: "next" },
];

export const coreNav: SiteNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy", shortLabel: "Buy" },
  { href: "/unlock", label: "Unlock", shortLabel: "Unlock" },
  { href: "/liquidity", label: "Liquidity", shortLabel: "Liquidity" },
  { href: "/airdrop", label: "Airdrop", shortLabel: "Airdrop" },
  { href: "/ambassadors", label: "Ambassadors", shortLabel: "Ambassadors" },
];

export const docsNav: SiteNavLink[] = [
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/verification", label: "Verification" },
  { href: "/blog", label: "Blog" },
];

export const utilityNav: SiteNavLink[] = [
  { href: "/swap", label: "Swap", shortLabel: "Swap" },
  { href: "/app", label: "App Shell", shortLabel: "App" },
];

export const desktopNav = [...coreNav, ...docsNav] as const;
export const allSiteNav = [...coreNav, ...docsNav, ...utilityNav] as const;

export const mobileDockNav: SiteNavLink[] = [
  { href: "/", label: "Home", shortLabel: "Home" },
  { href: "/buy", label: "Buy", shortLabel: "Buy" },
  { href: "/unlock", label: "Unlock", shortLabel: "Unlock" },
  { href: "/app", label: "App Shell", shortLabel: "App" },
];

export const legacyRouteMap: Record<string, string> = {
  wp: "/whitepaper",
  ad: "/airdrop",
  a: "/ambassadors",
  bg: "/blog",
  bt: "/buy",
  sw: "/swap",
  ult: "/unlock",
  lc: "/liquidity",
};
