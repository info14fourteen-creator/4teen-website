"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBrandMark } from "@/components/site/animated-brand-mark";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import { HeaderMarketPrice } from "@/components/site/header-market-price";
import { LoaderLink } from "@/components/site/loader-link";
import { MobileFooterNav } from "@/components/site/mobile-footer-nav";
import { MobileLocalePanel } from "@/components/site/mobile-locale-panel";
import { MobileSiteSearch } from "@/components/site/mobile-site-search";
import airdropGiftLoop from "@/assets/lottie/mobile-airdrop-gift-loop.json";
import ambassadorDemandLoop from "@/assets/lottie/mobile-ambassador-demand-loop.json";
import appSmartphoneLoop from "@/assets/lottie/mobile-app-smartphone-loop.json";
import buyCoinsLoop from "@/assets/lottie/mobile-buy-coins-loop.json";
import liquidityGrowthLoop from "@/assets/lottie/mobile-liquidity-growth-loop.json";
import privacyPolicyLoop from "@/assets/lottie/mobile-privacy-policy-loop.json";
import supportServiceLoop from "@/assets/lottie/mobile-support-service-loop.json";
import swapFooterLoop from "@/assets/lottie/mobile-swap-footer-loop.json";
import termsPolicyLoop from "@/assets/lottie/mobile-terms-policy-loop.json";
import unlockDocumentLoop from "@/assets/lottie/mobile-unlock-document-loop.json";
import verificationBlockchainLoop from "@/assets/lottie/mobile-verification-blockchain-loop.json";
import navHomeLoop from "@/assets/lottie/nav-home-loop.json";
import { getChromeContent } from "@/content/chrome-content";
import {
  getCoreNav,
  getDocsNav,
  siteLocales,
  getUtilityNav,
} from "@/lib/site-config";
import { defaultSiteLocale } from "@/lib/site-locale";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FourteenMobileShell({
  appMode: _appMode = false,
}: {
  appMode?: boolean;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const hasOpenPanel = menuOpen || searchOpen || localeOpen;
  const currentLocale = defaultSiteLocale;
  const chrome = getChromeContent(currentLocale);
  const coreNav = getCoreNav(currentLocale);
  const docsNav = getDocsNav(currentLocale);
  const utilityNav = getUtilityNav(currentLocale);
  const legalNav = useMemo(
    () => [
      { href: "/privacy", label: chrome.footer.privacy },
      { href: "/terms", label: chrome.footer.terms },
      { href: "/support", label: chrome.footer.support },
    ],
    [chrome.footer.privacy, chrome.footer.support, chrome.footer.terms],
  );
  const currentLocaleOption = useMemo(
    () => siteLocales.find((locale) => locale.code === currentLocale) ?? siteLocales[0],
    [currentLocale],
  );
  const topbarRef = useRef<HTMLDivElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  function closeAllPanels() {
    setMenuOpen(false);
    setSearchOpen(false);
    setLocaleOpen(false);
  }

  useEffect(() => {
    closeAllPanels();
  }, [pathname]);

  useEffect(() => {
    if (!hasOpenPanel) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const insideTopbar = topbarRef.current?.contains(target) ?? false;
      const insideMenu = menuPanelRef.current?.contains(target) ?? false;
      const insideFooter = footerRef.current?.contains(target) ?? false;

      if (insideTopbar || insideMenu || insideFooter) {
        return;
      }

      closeAllPanels();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAllPanels();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [hasOpenPanel]);

  return (
    <div data-fourteen-mobile-shell>
      <div className="mobile-shell">
        {hasOpenPanel ? (
          <button
            aria-label={chrome.mobileMenu.closeOpenPanelAria}
            className="ft-mobile-panel-scrim"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(false);
              setLocaleOpen(false);
            }}
            type="button"
          />
        ) : null}

        {menuOpen ? (
          <div className="ft-mobile-menu-panel" ref={menuPanelRef}>
            <div className="ft-mobile-menu-sheet">
              <div className="ft-mobile-menu-group">
                <p className="ft-mobile-menu-group__label">{chrome.mobileMenu.coreSurfaces}</p>
                {coreNav.map((link) => (
                  <LoaderLink
                    key={link.href}
                    className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                    href={link.href}
                    onClick={closeAllPanels}
                  >
                    <span>{link.label}</span>
                    <AnimatedLottieIcon
                      animationData={
                        link.href === "/buy"
                          ? buyCoinsLoop
                          : link.href === "/unlock"
                            ? unlockDocumentLoop
                          : link.href === "/liquidity"
                            ? liquidityGrowthLoop
                            : link.href === "/swap"
                              ? swapFooterLoop
                          : link.href === "/airdrop"
                            ? airdropGiftLoop
                            : link.href === "/ambassadors"
                              ? ambassadorDemandLoop
                              : link.href === "/app"
                                ? appSmartphoneLoop
                            : navHomeLoop
                      }
                      className="ft-mobile-menu-link__icon"
                      loop={isActivePath(pathname, link.href)}
                    />
                  </LoaderLink>
                ))}
              </div>

              <div className="ft-mobile-menu-group">
                <p className="ft-mobile-menu-group__label">{chrome.mobileMenu.docsAndRoutes}</p>
                {[...docsNav, ...utilityNav].map((link) => (
                  <LoaderLink
                    key={link.href}
                    className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                    href={link.href}
                    onClick={closeAllPanels}
                  >
                    <span>{link.label}</span>
                    <AnimatedLottieIcon
                      animationData={
                        link.href === "/app"
                          ? appSmartphoneLoop
                          : link.href === "/verification"
                            ? verificationBlockchainLoop
                            : navHomeLoop
                      }
                      className="ft-mobile-menu-link__icon"
                      loop={isActivePath(pathname, link.href)}
                    />
                  </LoaderLink>
                ))}
              </div>

              <div className="ft-mobile-menu-group">
                <p className="ft-mobile-menu-group__label">{chrome.footer.legal}</p>
                {legalNav.map((link) => (
                  <LoaderLink
                    key={link.href}
                    className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                    href={link.href}
                    onClick={closeAllPanels}
                  >
                    <span>{link.label}</span>
                    <AnimatedLottieIcon
                      animationData={
                        link.href === "/privacy"
                          ? privacyPolicyLoop
                          : link.href === "/terms"
                            ? termsPolicyLoop
                            : link.href === "/support"
                              ? supportServiceLoop
                              : navHomeLoop
                      }
                      className="ft-mobile-menu-link__icon"
                      loop={isActivePath(pathname, link.href)}
                    />
                  </LoaderLink>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="ft-mobile-topbar" ref={topbarRef}>
          <div className={`ft-mobile-topbar__bar ${searchOpen || localeOpen ? "is-panel-open" : ""}`}>
            <LoaderLink
              aria-label={chrome.mobileDock.openHomeAria}
              className="ft-mobile-topbar__brandtrigger"
              href="/"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(false);
                setLocaleOpen(false);
              }}
            >
              <AnimatedBrandMark compact />
            </LoaderLink>

            <div className="ft-mobile-topbar__market">
              <HeaderMarketPrice compact />
            </div>

            <button
              aria-expanded={searchOpen}
              aria-label={chrome.mobileDock.openSearchAria}
              className="ft-mobile-topbar__searchtoggle"
              onClick={() => {
                setMenuOpen(false);
                setLocaleOpen(false);
                setSearchOpen((open) => !open);
              }}
              type="button"
            >
              <span aria-hidden="true" className="ft-mobile-topbar__searchicon">
                <svg fill="none" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M15.2 15.2L20 20" stroke="currentColor" strokeLinecap="square" strokeWidth="1.8" />
                </svg>
              </span>
            </button>

            <button
              aria-expanded={localeOpen}
              aria-label={chrome.mobileDock.openLanguageAria}
              className="ft-mobile-topbar__localetoggle"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(false);
                setLocaleOpen((open) => !open);
              }}
              type="button"
            >
              <span className="ft-mobile-topbar__localeflag">{currentLocaleOption.flag}</span>
              <span className="ft-mobile-topbar__localecode">{currentLocaleOption.code}</span>
            </button>
          </div>

          <MobileSiteSearch
            content={chrome.mobileSearch}
            open={searchOpen}
            onNavigate={() => setSearchOpen(false)}
          />

          <MobileLocalePanel
            content={chrome.locale}
            currentLocale={currentLocale}
            onClose={() => setLocaleOpen(false)}
            open={localeOpen}
          />
        </div>

        <div ref={footerRef}>
          <MobileFooterNav
          menuOpen={menuOpen}
          onNavigateStart={() => {
            setMenuOpen(false);
            setSearchOpen(false);
            setLocaleOpen(false);
          }}
          onToggleMenu={() => {
            setSearchOpen(false);
            setLocaleOpen(false);
            setMenuOpen((open) => !open);
          }}
        />
        </div>
      </div>
    </div>
  );
}
