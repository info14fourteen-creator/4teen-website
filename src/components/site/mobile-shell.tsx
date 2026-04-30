"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { SiteLogo } from "@/components/site/site-logo";
import {
  coreNav,
  docsNav,
  mobileDockNav,
  siteLocales,
  utilityNav,
} from "@/lib/site-config";

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
                  <div className="ft-mobile-locale-rail">
                    {siteLocales.map((locale) => (
                      <span
                        key={locale.code}
                        className={`ft-mobile-locale-link ${locale.status === "live" ? "is-active" : ""}`}
                      >
                        <span>{locale.code}</span>
                        <span>{locale.status === "live" ? "live" : "next"}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ft-mobile-menu-group">
                  <p className="ft-mobile-menu-group__label">Core surfaces</p>
                  {coreNav.map((link) => (
                    <Link
                      key={link.href}
                      className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="ft-device-label">Open</span>
                    </Link>
                  ))}
                </div>

                <div className="ft-mobile-menu-group">
                  <p className="ft-mobile-menu-group__label">Docs and routes</p>
                  {[...docsNav, ...utilityNav].map((link) => (
                    <Link
                      key={link.href}
                      className={`ft-mobile-menu-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="ft-device-label">Open</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="ft-mobile-topbar">
          <div className="ft-mobile-topbar__bar">
            <SiteLogo compact />

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

        <div className="ft-mobile-dock">
          {dockLinks.map((link) => (
            <Link
              key={link.href}
              className={`ft-mobile-dock-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
              href={link.href}
            >
              <span>{link.shortLabel ?? link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
