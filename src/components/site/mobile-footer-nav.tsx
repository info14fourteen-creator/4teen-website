"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import { triggerFourteenLoader } from "@/components/site/loader-link";
import airdropGiftLoop from "@/assets/lottie/mobile-airdrop-gift-loop.json";
import ambassadorDemandLoop from "@/assets/lottie/mobile-ambassador-demand-loop.json";
import appSmartphoneLoop from "@/assets/lottie/mobile-app-smartphone-loop.json";
import buyCoinsLoop from "@/assets/lottie/mobile-buy-coins-loop.json";
import { getChromeContent } from "@/content/chrome-content";
import { getNavContent } from "@/content/nav-content";
import { defaultSiteLocale } from "@/lib/site-locale";

type FooterItemConfig = {
  href: string;
  label: string;
  icon: "buy" | "airdrop" | "ambassador" | "main";
  match: (pathname: string) => boolean;
};

function FooterGlyph({
  active,
  icon,
}: {
  active: boolean;
  icon: FooterItemConfig["icon"];
}) {
  switch (icon) {
    case "buy":
      return (
        <AnimatedLottieIcon
          animationData={buyCoinsLoop}
          className="ft-mobile-footer-icon__lottie"
          loop={active}
        />
      );
    case "airdrop":
      return (
        <AnimatedLottieIcon
          animationData={airdropGiftLoop}
          className="ft-mobile-footer-icon__lottie"
          loop={active}
        />
      );
    case "ambassador":
      return (
        <AnimatedLottieIcon
          animationData={ambassadorDemandLoop}
          className="ft-mobile-footer-icon__lottie"
          loop={active}
        />
      );
    case "main":
      return (
        <AnimatedLottieIcon
          animationData={appSmartphoneLoop}
          className="ft-mobile-footer-icon__lottie"
          loop={active}
        />
      );
  }
}

function FooterNavButton({
  item,
  onNavigateStart,
}: {
  item: FooterItemConfig;
  onNavigateStart?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const active = item.match(pathname);
  const timeoutRef = useRef<number | null>(null);
  const resetRef = useRef<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      if (resetRef.current !== null) {
        window.clearTimeout(resetRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (active) {
      setIsTransitioning(false);
    }
  }, [active]);

  useEffect(() => {
    setIsTransitioning(false);
  }, [pathname]);

  return (
    <button
      className={`ft-mobile-dock-button ${active ? "is-active" : ""}`}
      onClick={() => {
        if (active || isTransitioning) return;

        onNavigateStart?.();
        setIsTransitioning(true);

        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }
        if (resetRef.current !== null) {
          window.clearTimeout(resetRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          triggerFourteenLoader();
          startTransition(() => {
            router.push(item.href);
          });
        }, 40);

        resetRef.current = window.setTimeout(() => {
          setIsTransitioning(false);
        }, 1600);
      }}
      type="button"
    >
      <span aria-hidden="true" className="ft-mobile-footer-icon ft-mobile-footer-icon--glyph">
        <FooterGlyph active={active} icon={item.icon} />
      </span>
      <span className="ft-mobile-dock-button__label">{item.label}</span>
    </button>
  );
}

export function MobileFooterNav({
  menuOpen,
  onToggleMenu,
  onNavigateStart,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigateStart?: () => void;
}) {
  const nav = getNavContent(defaultSiteLocale);
  const chrome = getChromeContent(defaultSiteLocale);
  const footerItems: FooterItemConfig[] = useMemo(
    () => [
      {
        href: "/buy",
        label: nav.shortLinks.buy,
        icon: "buy",
        match: (pathname) => pathname === "/buy" || pathname.startsWith("/buy/"),
      },
      {
        href: "/airdrop",
        label: nav.shortLinks.airdrop,
        icon: "airdrop",
        match: (pathname) => pathname === "/airdrop" || pathname.startsWith("/airdrop/"),
      },
      {
        href: "/ambassadors",
        label: nav.shortLinks.earn,
        icon: "ambassador",
        match: (pathname) => pathname === "/ambassadors" || pathname.startsWith("/ambassadors/"),
      },
      {
        href: "/app",
        label: nav.shortLinks.app,
        icon: "main",
        match: (pathname) =>
          pathname === "/" || pathname === "/app" || pathname.startsWith("/app/"),
      },
    ],
    [nav],
  );
  const leftItems = useMemo(() => footerItems.slice(0, 2), [footerItems]);
  const rightItems = useMemo(() => footerItems.slice(2), [footerItems]);

  return (
    <div className={`ft-mobile-dock ${menuOpen ? "is-menu-open" : ""}`}>
      {leftItems.map((item) => (
        <FooterNavButton
          key={item.label}
          item={item}
          onNavigateStart={onNavigateStart}
        />
      ))}

      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? chrome.mobileDock.closeMenuAria : chrome.mobileDock.openMenuAria}
        className={`ft-mobile-dock-button ft-mobile-dock-button--menu ${menuOpen ? "is-open" : ""}`}
        onClick={onToggleMenu}
        type="button"
      >
        <span className="ft-mobile-burger" aria-hidden="true">
          <span className="ft-mobile-burger__line ft-mobile-burger__line--top" />
          <span className="ft-mobile-burger__line ft-mobile-burger__line--mid" />
          <span className="ft-mobile-burger__line ft-mobile-burger__line--bottom" />
        </span>
        <span className="ft-mobile-dock-button__label">
          {menuOpen ? chrome.mobileDock.close : chrome.mobileDock.menu}
        </span>
      </button>

      {rightItems.map((item) => (
        <FooterNavButton
          key={item.label}
          item={item}
          onNavigateStart={onNavigateStart}
        />
      ))}
    </div>
  );
}
