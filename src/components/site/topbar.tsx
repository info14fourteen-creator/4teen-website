"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import navHomeLoop from "@/assets/lottie/nav-home-loop.json";
import utilityOpenAppLoop from "@/assets/lottie/utility-open-app-loop.json";
import { HeaderMarketPrice } from "@/components/site/header-market-price";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { LoaderLink } from "@/components/site/loader-link";
import { SiteLogo } from "@/components/site/site-logo";
import { SiteSearch } from "@/components/site/site-search";
import { getChromeContent } from "@/content/chrome-content";
import { getHeaderNavGroups } from "@/lib/site-config";
import { stripSiteLocaleSegment } from "@/lib/site-locale";
import { useCurrentSiteLocale, useLocaleAwarePathname } from "@/lib/use-current-site-locale";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FourteenTopbar({ appMode = false }: { appMode?: boolean }) {
  const pathname = usePathname() ?? "/";
  const locale = useCurrentSiteLocale();
  const localeAwarePathname = useLocaleAwarePathname();
  const chrome = getChromeContent(locale);
  const headerNavGroups = getHeaderNavGroups(locale);

  useEffect(() => {
    const root = document.documentElement;
    const ua = navigator.userAgent;
    const vendor = navigator.vendor ?? "";
    const isSafari =
      /Safari/i.test(ua) &&
      !/Chrome|Chromium|CriOS|EdgiOS|Edg\/|Firefox|FxiOS|OPiOS|OPR\//i.test(ua) &&
      /Apple/i.test(vendor);

    if (isSafari) {
      root.setAttribute("data-ft-browser-safari", "true");
      return;
    }

    root.removeAttribute("data-ft-browser-safari");
  }, []);

  return (
    <header className="ft-site-header">
      <div className="ft-site-header__bar">
        <div className="ft-site-header__brandblock">
          <SiteLogo secondary={<HeaderMarketPrice />} />
        </div>

        <div className="ft-site-header__main">
          <nav aria-label={chrome.header.primaryNavAria} className="ft-site-nav-shell">
            <div className="ft-site-nav-groups">
              {headerNavGroups.map((group) => (
                <div
                  key={group.label}
                  className={`ft-site-nav-group ft-site-nav-group--${group.links.length}`}
                >
                  <span className="ft-site-nav-group__label">{group.label}</span>
                  <div
                    className={`ft-site-nav-group__links ft-site-nav-group__links--${group.links.length}`}
                  >
                    {group.links.map((link) => (
                      <LoaderLink
                        key={link.href}
                        className={`ft-site-nav-link ${isActivePath(localeAwarePathname, link.href) ? "is-active" : ""}`}
                        href={link.href}
                      >
                        {link.label}
                      </LoaderLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="ft-site-header__utility">
          <SiteSearch content={chrome.desktopSearch} />

          <div className="ft-site-header__utilityactions">
            <LoaderLink
              className={`ft-site-header__utilityhome ${isActivePath(localeAwarePathname, "/") ? "is-active" : ""}`}
              href="/"
            >
              <AnimatedLottieIcon
                animationData={navHomeLoop}
                className="ft-site-header__utilityhome-icon"
                loop={stripSiteLocaleSegment(pathname) === "/"}
                playOnHover={stripSiteLocaleSegment(pathname) !== "/"}
              />
              <span>{chrome.header.home}</span>
            </LoaderLink>

            <LocaleSwitcher content={chrome.locale} currentLocale={locale} />

            <LoaderLink
              className="ft-header-app-link"
              href="/app"
            >
              <AnimatedLottieIcon
                animationData={utilityOpenAppLoop}
                className="ft-header-app-link__icon"
                playOnHover
              />
              {chrome.header.getApp}
            </LoaderLink>
          </div>
        </div>
      </div>
    </header>
  );
}
