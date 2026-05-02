"use client";

import { LoaderLink } from "@/components/site/loader-link";
import { siteLocales } from "@/lib/site-config";
import { defaultSiteLocale } from "@/lib/site-locale";

export function MobileLocalePanel({
  content,
  open,
  onClose,
  currentLocale = defaultSiteLocale,
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
  const copy = content ?? {
    eyebrow: "Language",
    title: "Choose interface language",
    active: "Active",
    soon: "Soon",
  };

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
          const isCurrent = locale.code === currentLocale;

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
                  {locale.status === "live"
                    ? isCurrent
                      ? `${locale.label} / ${copy.active}`
                      : locale.label
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
                href={locale.href}
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
