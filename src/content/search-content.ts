import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedGlobalContent } from "../lib/generated-localization";

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

const searchContentRu: SearchContent = {
  meta: {
    mainRoute: "Основной маршрут",
    protocolSurface: "Поверхность протокола",
    growthSurface: "Поверхность роста",
    proofSurface: "Поверхность проверки",
    downloadRoute: "Маршрут скачивания",
    publicPolicy: "Публичная политика",
    supportRoute: "Маршрут поддержки",
    coreContract: "Основной контракт",
    liquidityContract: "Контракт ликвидности",
    growthContract: "Контракт роста",
    githubSource: "Источник GitHub",
  },
};

const searchContentUz: SearchContent = {
  meta: {
    mainRoute: "Asosiy marshrut",
    protocolSurface: "Protokol yuzasi",
    growthSurface: "O'sish yuzasi",
    proofSurface: "Tasdiq yuzasi",
    downloadRoute: "Yuklab olish marshruti",
    publicPolicy: "Ochiq siyosat",
    supportRoute: "Yordam marshruti",
    coreContract: "Asosiy kontrakt",
    liquidityContract: "Likvidlik kontrakti",
    growthContract: "O'sish kontrakti",
    githubSource: "GitHub manbasi",
  },
};

const searchContentByLocale: Partial<Record<SupportedSiteLocale, SearchContent>> = {
  en: searchContentEn,
  ru: searchContentRu,
  uz: searchContentUz,
};

export function getSearchContent(locale: SupportedSiteLocale) {
  return getGeneratedGlobalContent(
    locale,
    "search",
    searchContentByLocale[locale] ?? searchContentEn,
  );
}
