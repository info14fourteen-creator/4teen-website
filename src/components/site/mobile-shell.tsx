"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { LoaderLink } from "@/components/site/loader-link";
import { SiteLogo } from "@/components/site/site-logo";
import {
  coreNav,
  docsNav,
  mobileDockNav,
  utilityNav,
} from "@/lib/site-config";
import { defaultSiteLocale } from "@/lib/site-locale";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FourteenMobileShell({
  appMode = false,
}: {
  appMode?: boolean;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const dockLinks = useMemo(() => {
    if (!appMode) return mobileDockNav;

    return [
      { href: "/", label: "Home", shortLabel: "Home" },
      { href: "/buy", label: "Buy", shortLabel: "Buy" },
      { href: "/app", label: "App Shell", shortLabel: "App" },
      { href: "/ambassadors", label: "Ambassadors", shortLabel: "Amb" },
    ];
  }, [appMode]);

  return (
    <div data-fourteen-mobile-shell>
      <div className="mobile-shell">
        {menuOpen ? (
          <>
            <button
              aria-label="Close mobile menu"
              className="ft-mobile-menu-overlay"
              onClick={() => setMenuOpen(false)}
              type="button"
            />

            <div className="ft-mobile-menu-panel">
              <div className="ft-mobile-menu-sheet">
                <div className="ft-mobile-menu-group">
                  <p className="ft-mobile-menu-group__label">Languages</p>
                  <LocaleSwitcher compact currentLocale={defaultSiteLocale} />
                </div>

                <div className="ft-mobile-menu-group">
                  <p className="ft-mobile-menu-group__label">Core surfaces</p>
                  {coreNav.map((link) => (
                    <LoaderLink
                      key={link.href}
                      className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="ft-device-label">Open</span>
                    </LoaderLink>
                  ))}
                </div>

                <div className="ft-mobile-menu-group">
                  <p className="ft-mobile-menu-group__label">Docs and routes</p>
                  {[...docsNav, ...utilityNav].map((link) => (
                    <LoaderLink
                      key={link.href}
                      className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="ft-device-label">Open</span>
                    </LoaderLink>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="ft-mobile-topbar">
          <div className="ft-mobile-topbar__bar">
            <SiteLogo compact />

            <div className="ft-mobile-topbar__actions">
              <LocaleSwitcher compact currentLocale={defaultSiteLocale} />

              <button
                aria-expanded={menuOpen}
                aria-label="Open mobile menu"
                className="ft-mobile-menu-toggle"
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
              >
                {menuOpen ? "×" : "≡"}
              </button>
            </div>
          </div>
        </div>

        <div className="ft-mobile-dock">
          {dockLinks.map((link) => (
            <LoaderLink
              key={link.href}
              className={`ft-mobile-dock-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
              href={link.href}
            >
              <span>{link.shortLabel ?? link.label}</span>
            </LoaderLink>
          ))}
        </div>
      </div>
    </div>
  );
}
