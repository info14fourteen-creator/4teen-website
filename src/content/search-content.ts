import type { SupportedSiteLocale } from "@/lib/site-locale";

export type SearchContent = {
  meta: {
    mainRoute: string;
    protocolSurface: string;
    growthSurface: string;
    proofSurface: string;
    downloadRoute: string;
    publicPolicy: string;
    supportRoute: string;
    coreContract: string;
    liquidityContract: string;
    growthContract: string;
    githubSource: string;
  };
};

const searchContentEn: SearchContent = {
  meta: {
    mainRoute: "Main route",
    protocolSurface: "Protocol surface",
    growthSurface: "Growth surface",
    proofSurface: "Proof surface",
    downloadRoute: "Download route",
    publicPolicy: "Public policy",
    supportRoute: "Support route",
    coreContract: "Core contract",
    liquidityContract: "Liquidity contract",
    growthContract: "Growth contract",
    githubSource: "GitHub source",
  },
};

const searchContentByLocale: Partial<Record<SupportedSiteLocale, SearchContent>> = {
  en: searchContentEn,
};

export function getSearchContent(locale: SupportedSiteLocale) {
  return searchContentByLocale[locale] ?? searchContentEn;
}
