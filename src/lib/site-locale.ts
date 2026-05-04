export const supportedSiteLocales = ["en", "ru", "uz"] as const;
export const rtlSiteLocaleCodes = ["ar", "fa", "he", "ur"] as const;
export const knownSiteLocaleCodes = ["en", "ru", "uz", "ar"] as const;

export type SupportedSiteLocale = (typeof supportedSiteLocales)[number];
export type SiteTextDirection = "ltr" | "rtl";

export const defaultSiteLocale: SupportedSiteLocale = "en";

export function isSupportedSiteLocale(
  locale?: string | null,
): locale is SupportedSiteLocale {
  if (!locale) return false;
  return supportedSiteLocales.includes(locale as SupportedSiteLocale);
}

export function resolveSiteLocale(
  locale?: string,
): SupportedSiteLocale {
  return isSupportedSiteLocale(locale) ? locale : defaultSiteLocale;
}

export function stripSiteLocaleSegment(pathname: string) {
  if (!pathname.startsWith("/")) return pathname;

  const [pathWithoutQuery] = pathname.split(/[?#]/, 1);
  const segments = pathWithoutQuery.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  const [maybeLocale, ...rest] = segments;
  if (!(knownSiteLocaleCodes as readonly string[]).includes(maybeLocale)) {
    return pathWithoutQuery || "/";
  }

  return rest.length ? `/${rest.join("/")}` : "/";
}

export function getSiteLocaleFromPathname(pathname: string) {
  return resolveSiteLocale(getSiteLocaleCodeFromPathname(pathname));
}

export function getSiteLocaleCodeFromPathname(pathname: string) {
  const [pathWithoutQuery] = pathname.split(/[?#]/, 1);
  const segments = pathWithoutQuery.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if ((knownSiteLocaleCodes as readonly string[]).includes(firstSegment)) {
    return firstSegment;
  }

  return defaultSiteLocale;
}

export function getSiteTextDirection(locale?: string | null): SiteTextDirection {
  if (!locale) return "ltr";
  return (rtlSiteLocaleCodes as readonly string[]).includes(locale) ? "rtl" : "ltr";
}

export function localizeSiteHref(
  href: string,
  locale: string = defaultSiteLocale,
) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  const localizedBase = stripSiteLocaleSegment(normalizedHref);

  const normalizedLocale = locale.trim() || defaultSiteLocale;

  if (normalizedLocale === defaultSiteLocale) {
    return localizedBase;
  }

  return localizedBase === "/"
    ? `/${normalizedLocale}`
    : `/${normalizedLocale}${localizedBase}`;
}

export function localizePathnameForLocale(
  pathname: string,
  locale: string = defaultSiteLocale,
) {
  return localizeSiteHref(stripSiteLocaleSegment(pathname), locale);
}
