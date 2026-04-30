export const supportedSiteLocales = ["en", "ru", "uz"] as const;

export type SupportedSiteLocale = (typeof supportedSiteLocales)[number];

export const defaultSiteLocale: SupportedSiteLocale = "en";

export function resolveSiteLocale(
  locale?: string,
): SupportedSiteLocale {
  if (!locale) return defaultSiteLocale;

  return supportedSiteLocales.includes(locale as SupportedSiteLocale)
    ? (locale as SupportedSiteLocale)
    : defaultSiteLocale;
}
