"use client";

import { usePathname } from "next/navigation";
import { LoaderLink } from "@/components/site/loader-link";
import { siteLocales } from "@/lib/site-config";
import { localizePathnameForLocale } from "@/lib/site-locale";
import { useCurrentSiteLocale } from "@/lib/use-current-site-locale";

export function MobileLocalePanel({
  content: copy,
  open,
  onClose,
  currentLocale,
}: {
  content?: {
    eyebrow: string;
    title: string;
    active: string;
    soon: string;
  };
  open: boolean;
  onClose?: () => void;
  currentLocale?: string;
}) {
  const pathname = usePathname() ?? "/";
  const resolvedCurrentLocale = currentLocale ?? useCurrentSiteLocale();

  if (!copy) {
    return null;
  }

  if (!open) {
    return null;
  }

  return (
    <div className="ft-mobile-search-panel ft-mobile-locale-panel">
      <div className="ft-mobile-search-panel__head">
        <p className="ft-mobile-search-panel__eyebrow">{copy.eyebrow}</p>
        <h3 className="ft-mobile-search-panel__title">{copy.title}</h3>
      </div>

      <div className="ft-mobile-locale-panel__results" role="listbox">
        {siteLocales.map((locale) => {
          const isCurrent = locale.code === resolvedCurrentLocale;

          const content = (
            <>
              <span className="ft-mobile-locale-panel__flag">{locale.flag}</span>
              <span className="ft-mobile-locale-panel__copy">
                <span className="ft-mobile-locale-panel__row">
                  <span className="ft-mobile-locale-panel__title">
                    {locale.code}
                  </span>
                  <span className="ft-mobile-locale-panel__label">
                    {locale.nativeLabel}
                  </span>
                </span>
                <span className="ft-mobile-locale-panel__meta">
                  {isCurrent
                    ? `${locale.label} / ${copy.active}`
                    : locale.status === "live"
                      ? locale.label
                      : `${locale.label} / ${copy.soon}`}
                </span>
              </span>
            </>
          );

          if (locale.status === "live") {
            return (
              <LoaderLink
                key={locale.code}
                className={`ft-mobile-locale-panel__option ${isCurrent ? "is-active" : ""}`}
                href={localizePathnameForLocale(pathname, locale.code)}
              >
                {content}
              </LoaderLink>
            );
          }

          return (
            <button
              key={locale.code}
              aria-disabled="true"
              className={`ft-mobile-locale-panel__option is-disabled ${isCurrent ? "is-active" : ""}`}
              onClick={onClose}
              type="button"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
