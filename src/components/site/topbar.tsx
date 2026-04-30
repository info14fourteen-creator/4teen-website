"use client";

import { usePathname } from "next/navigation";
import { LoaderLink } from "@/components/site/loader-link";
import { SiteLogo } from "@/components/site/site-logo";
import { desktopNav, siteLocales, utilityNav } from "@/lib/site-config";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FourteenTopbar({ appMode = false }: { appMode?: boolean }) {
  const pathname = usePathname();

  return (
    <header className="ft-site-header">
      <div className="ft-site-header__bar">
        <SiteLogo />

        <div className="ft-site-header__lane">
          <nav aria-label="Primary site navigation" className="ft-site-nav">
            {desktopNav.map((link) => (
              <LoaderLink
                key={link.href}
                className={`ft-site-nav-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                href={link.href}
              >
                {link.label}
              </LoaderLink>
            ))}
          </nav>

          <nav aria-label="Secondary site surfaces" className="ft-site-subnav">
            {utilityNav.map((link) => (
              <LoaderLink
                key={link.href}
                className={`ft-site-subnav-link ${isActivePath(pathname, link.href) ? "is-active" : ""}`}
                href={link.href}
              >
                {link.label}
              </LoaderLink>
            ))}
          </nav>
        </div>

        <div className="ft-site-header__utility">
          <div aria-label="Site locale rollout plan" className="ft-locale-rail">
            {siteLocales.map((locale) => (
              <span
                key={locale.code}
                className={`ft-locale-link ${locale.status === "live" ? "is-active" : ""}`}
              >
                <span className="ft-locale-link__code">{locale.code}</span>
                <span className="ft-locale-link__status">
                  {locale.status === "live" ? "live" : "next"}
                </span>
              </span>
            ))}
          </div>

          <LoaderLink
            className="ft-header-app-link"
            href={appMode ? "/buy" : "/app"}
          >
            {appMode ? "Open buy" : "Open app"}
          </LoaderLink>
        </div>
      </div>
    </header>
  );
}
