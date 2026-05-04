"use client";

import { useEffect } from "react";
import {
  getSiteLocaleCodeFromPathname,
  getSiteTextDirection,
} from "@/lib/site-locale";
import { usePathname } from "next/navigation";

export function HtmlLocaleSync() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const locale = getSiteLocaleCodeFromPathname(pathname);
    const direction = getSiteTextDirection(locale);
    const root = document.documentElement;
    const body = document.body;

    root.lang = locale;
    root.dir = direction;
    body.dataset.siteLocale = locale;
    body.dataset.siteDir = direction;
  }, [pathname]);

  return null;
}
