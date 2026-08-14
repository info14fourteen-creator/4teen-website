import { getNavContent } from "@/content/nav-content";
import { defaultSiteLocale, type SupportedSiteLocale } from "@/lib/site-locale";

export type SiteLocale = {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
  href: string;
  status: "live" | "next";
};

export type SiteNavLink = {
  href: string;
  label: string;
  shortLabel?: string;
};

export type SiteNavGroup = {
  label: string;
  links: SiteNavLink[];
};

export const siteLocales: SiteLocale[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇺🇸",
    href: "/",
    status: "live",
  },
  {
    code: "ru",
    label: "Russian",
    nativeLabel: "Русский",
    flag: "🇷🇺",
    href: "/",
    status: "live",
  },
  {
    code: "uz",
    label: "Uzbek",
    nativeLabel: "O'zbekcha",
    flag: "🇺🇿",
    href: "/",
    status: "live",
  },
  {
    code: "tr",
    label: "Turkish",
    nativeLabel: "Türkçe",
    flag: "🇹🇷",
    href: "/",
    status: "live",
  },
  {
    code: "de",
    label: "German",
    nativeLabel: "Deutsch",
    flag: "🇩🇪",
    href: "/",
    status: "live",
  },
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    flag: "🇫🇷",
    href: "/",
    status: "live",
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
    flag: "🇪🇸",
    href: "/",
    status: "live",
  },
  {
    code: "it",
    label: "Italian",
    nativeLabel: "Italiano",
    flag: "🇮🇹",
    href: "/",
    status: "live",
  },
  {
    code: "pt",
    label: "Portuguese",
    nativeLabel: "Português",
    flag: "🇵🇹",
    href: "/",
    status: "live",
  },
  {
    code: "nl",
    label: "Dutch",
    nativeLabel: "Nederlands",
    flag: "🇳🇱",
    href: "/",
    status: "live",
  },
  {
    code: "pl",
    label: "Polish",
    nativeLabel: "Polski",
    flag: "🇵🇱",
    href: "/",
    status: "live",
  },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    flag: "🇸🇦",
    href: "/",
    status: "live",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    flag: "🇮🇳",
    href: "/",
    status: "live",
  },
  {
    code: "ja",
    label: "Japanese",
    nativeLabel: "日本語",
    flag: "🇯🇵",
    href: "/",
    status: "live",
  },
  {
    code: "zh-CN",
    label: "Chinese",
    nativeLabel: "简体中文",
    flag: "🇨🇳",
    href: "/",
    status: "live",
  },
  {
    code: "ko",
    label: "Korean",
    nativeLabel: "한국어",
    flag: "🇰🇷",
    href: "/",
    status: "next",
  },
];

export function getCoreNav(locale: SupportedSiteLocale = defaultSiteLocale): SiteNavLink[] {
  const copy = getNavContent(locale);

  return [
    { href: "/", label: copy.links.home, shortLabel: copy.shortLinks.home },
    { href: "/buy", label: copy.links.buy, shortLabel: copy.shortLinks.buy },
    { href: "/unlock", label: copy.links.unlock, shortLabel: copy.shortLinks.unlock },
    { href: "/liquidity", label: copy.links.liquidity, shortLabel: copy.shortLinks.liquidity },
    { href: "/swap", label: copy.links.swap, shortLabel: copy.shortLinks.swap },
    { href: "/airdrop", label: copy.links.airdrop, shortLabel: copy.shortLinks.airdrop },
    { href: "/ambassadors", label: copy.links.ambassadors, shortLabel: copy.shortLinks.earn },
  ];
}

export function getDocsNav(locale: SupportedSiteLocale = defaultSiteLocale): SiteNavLink[] {
  const copy = getNavContent(locale);

  return [
    { href: "/whitepaper", label: copy.links.whitepaper },
    { href: "/verification", label: copy.links.verification },
    { href: "/blog", label: copy.links.blog },
  ];
}

export function getUtilityNav(locale: SupportedSiteLocale = defaultSiteLocale): SiteNavLink[] {
  const copy = getNavContent(locale);

  return [{ href: "/app", label: copy.links.mobileApp, shortLabel: copy.shortLinks.app }];
}

export function getHeaderNavGroups(locale: SupportedSiteLocale = defaultSiteLocale): SiteNavGroup[] {
  const copy = getNavContent(locale);

  return [
    {
      label: copy.groups.protocol,
      links: [
        { href: "/buy", label: copy.links.buy },
        { href: "/unlock", label: copy.links.unlock },
        { href: "/liquidity", label: copy.links.liquidity },
        { href: "/swap", label: copy.links.swap },
      ],
    },
    {
      label: copy.groups.growth,
      links: [
        { href: "/airdrop", label: copy.links.airdrop },
        { href: "/ambassadors", label: copy.links.ambassadors },
      ],
    },
    {
      label: copy.groups.proof,
      links: [
        { href: "/whitepaper", label: copy.links.whitepaper },
        { href: "/verification", label: copy.links.verification },
        { href: "/blog", label: copy.links.blog },
      ],
    },
  ];
}

export function getAllSiteNav(locale: SupportedSiteLocale = defaultSiteLocale) {
  return [...getCoreNav(locale), ...getDocsNav(locale), ...getUtilityNav(locale)] as const;
}

export function getMobileDockNav(locale: SupportedSiteLocale = defaultSiteLocale): SiteNavLink[] {
  const copy = getNavContent(locale);

  return [
    { href: "/", label: copy.links.home, shortLabel: copy.shortLinks.home },
    { href: "/buy", label: copy.links.buy, shortLabel: copy.shortLinks.buy },
    { href: "/unlock", label: copy.links.unlock, shortLabel: copy.shortLinks.unlock },
    { href: "/app", label: copy.links.mobileApp, shortLabel: copy.shortLinks.app },
  ];
}

export const coreNav = getCoreNav();
export const docsNav = getDocsNav();
export const utilityNav = getUtilityNav();
export const headerNavGroups = getHeaderNavGroups();
export const desktopNav = [...coreNav, ...docsNav] as const;
export const allSiteNav = getAllSiteNav();
export const mobileDockNav = getMobileDockNav();

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
