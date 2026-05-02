import type { SupportedSiteLocale } from "@/lib/site-locale";

const localeMap: Record<SupportedSiteLocale, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
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
