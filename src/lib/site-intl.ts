import type { SupportedSiteLocale } from "@/lib/site-locale";

const localeMap: Record<SupportedSiteLocale, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
  tr: "tr-TR",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  it: "it-IT",
  pt: "pt-PT",
  nl: "nl-NL",
  pl: "pl-PL",
  ar: "ar-SA",
  hi: "hi-IN",
  ja: "ja-JP",
  "zh-CN": "zh-CN",
  ko: "ko-KR",
};

export function toIntlLocale(locale: SupportedSiteLocale) {
  return localeMap[locale] ?? localeMap.en;
}

export function formatUtcDate(
  value: string | number | Date,
  locale: SupportedSiteLocale,
) {
  const date = value instanceof Date ? value : new Date(value);

  return `${date.toLocaleString(toIntlLocale(locale), {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  })} UTC`;
}
