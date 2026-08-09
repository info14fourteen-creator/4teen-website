import type { SupportedSiteLocale } from "@/lib/site-locale";

export type LocalizationPageKey =
  | "home"
  | "app"
  | "buy"
  | "unlock"
  | "liquidity"
  | "swap"
  | "airdrop"
  | "ambassadors"
  | "verification"
  | "deck"
  | "one-pager"
  | "nav"
  | "chrome"
  | "search"
  | "legal"
  | "support"
  | "blog-shell"
  | "whitepaper-shell";

export type LocalizationProgressState =
  | "complete"
  | "partial"
  | "fallback-en"
  | "planned";

export type LocalizationLocaleStatus = {
  locale: SupportedSiteLocale;
  releaseStatus: "live" | "next";
  direction: "ltr" | "rtl";
};

export type LocalizationPageStatus = {
  page: LocalizationPageKey;
  source: string;
  states: Partial<Record<SupportedSiteLocale, LocalizationProgressState>>;
};

export const localizationLocaleStatuses: LocalizationLocaleStatus[] = [
  { locale: "en", releaseStatus: "live", direction: "ltr" },
  { locale: "ru", releaseStatus: "live", direction: "ltr" },
  { locale: "uz", releaseStatus: "live", direction: "ltr" },
  { locale: "tr", releaseStatus: "next", direction: "ltr" },
  { locale: "de", releaseStatus: "next", direction: "ltr" },
  { locale: "fr", releaseStatus: "next", direction: "ltr" },
  { locale: "es", releaseStatus: "next", direction: "ltr" },
  { locale: "it", releaseStatus: "next", direction: "ltr" },
  { locale: "pt", releaseStatus: "next", direction: "ltr" },
  { locale: "nl", releaseStatus: "next", direction: "ltr" },
  { locale: "pl", releaseStatus: "next", direction: "ltr" },
  { locale: "ar", releaseStatus: "next", direction: "rtl" },
  { locale: "hi", releaseStatus: "next", direction: "ltr" },
  { locale: "ja", releaseStatus: "next", direction: "ltr" },
  { locale: "zh-CN", releaseStatus: "next", direction: "ltr" },
  { locale: "ko", releaseStatus: "next", direction: "ltr" },
];

export const localizationPageStatuses: LocalizationPageStatus[] = [
  {
    page: "home",
    source: "src/content/home-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "app",
    source: "src/content/app-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "buy",
    source: "src/content/buy-content.ts",
    states: { en: "complete", ru: "partial" },
  },
  {
    page: "unlock",
    source: "src/content/unlock-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "liquidity",
    source: "src/content/liquidity-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "swap",
    source: "src/content/swap-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "airdrop",
    source: "src/content/airdrop-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "ambassadors",
    source: "src/content/ambassadors-content.ts",
    states: { en: "complete", ru: "fallback-en", uz: "fallback-en" },
  },
  {
    page: "verification",
    source: "src/content/verification-content.ts",
    states: { en: "complete" },
  },
  {
    page: "deck",
    source: "src/content/genesis-content.ts",
    states: { en: "complete" },
  },
  {
    page: "one-pager",
    source: "src/content/one-pager-content.ts",
    states: { en: "complete" },
  },
  {
    page: "nav",
    source: "src/content/nav-content.ts",
    states: { en: "complete", ru: "complete", uz: "complete" },
  },
  {
    page: "chrome",
    source: "src/content/chrome-content.ts",
    states: { en: "complete", ru: "complete", uz: "complete" },
  },
  {
    page: "search",
    source: "src/content/search-content.ts",
    states: { en: "complete", ru: "complete", uz: "complete" },
  },
  {
    page: "legal",
    source: "src/content/public-pages-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "support",
    source: "src/content/public-pages-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "blog-shell",
    source: "src/content/public-pages-content.ts",
    states: { en: "complete", ru: "partial", uz: "partial" },
  },
  {
    page: "whitepaper-shell",
    source: "src/content/whitepaper-content.ts",
    states: { en: "complete" },
  },
];
