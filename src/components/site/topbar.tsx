"use client";

import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { LoaderLink } from "@/components/site/loader-link";
import { SiteLogo } from "@/components/site/site-logo";
import { desktopNav, utilityNav } from "@/lib/site-config";
import { defaultSiteLocale } from "@/lib/site-locale";

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
          <LocaleSwitcher currentLocale={defaultSiteLocale} />

          <LoaderLink
            className="ft-header-app-link"
            href={appMode ? "/buy" : "/app"}
          >
            {appMode ? "Open Buy" : "Open App"}
          </LoaderLink>
        </div>
      </div>
    </header>
  );
}
