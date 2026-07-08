"use client";

import { usePathname } from "next/navigation";
import {
  defaultSiteLocale,
  getSiteLocaleFromPathname,
  getSiteTextDirection,
  localizePathnameForLocale,
  stripSiteLocaleSegment,
} from "@/lib/site-locale";

export function useCurrentSiteLocale() {
  const pathname = usePathname() ?? "/";
  return getSiteLocaleFromPathname(pathname);
}

export function useCurrentSiteDirection() {
  return getSiteTextDirection(useCurrentSiteLocale());
}

export function useLocaleAwarePathname() {
  const pathname = usePathname() ?? "/";
  return stripSiteLocaleSegment(pathname);
}

export function useLocalizedHref(href: string, locale?: string) {
  const routeLocale = useCurrentSiteLocale();
  return localizePathnameForLocale(href, locale ?? routeLocale);
}

export function useDefaultLocaleHref(href: string) {
  return localizePathnameForLocale(href, defaultSiteLocale);
}
