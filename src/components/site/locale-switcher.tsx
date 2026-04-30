"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderLink } from "@/components/site/loader-link";
import { defaultSiteLocale } from "@/lib/site-locale";
import { siteLocales } from "@/lib/site-config";

export function LocaleSwitcher({
  currentLocale = defaultSiteLocale,
  compact = false,
}: {
  currentLocale?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(
    () =>
      siteLocales.find((locale) => locale.code === currentLocale) ?? siteLocales[0],
    [currentLocale],
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`ft-locale-switcher ${compact ? "is-compact" : ""} ${open ? "is-open" : ""}`}
    >
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="ft-locale-switcher__button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="ft-locale-switcher__button-flag">{current.flag}</span>
        <span className="ft-locale-switcher__button-code">{current.code}</span>
        <span className="ft-locale-switcher__button-chevron">⌄</span>
      </button>

      {open ? (
        <div className="ft-locale-switcher__menu" role="listbox">
          {siteLocales.map((locale) => {
            const content = (
              <>
                <span className="ft-locale-switcher__option-flag">{locale.flag}</span>
                <span className="ft-locale-switcher__option-copy">
                  <span className="ft-locale-switcher__option-row">
                    <span className="ft-locale-switcher__option-code">
                      {locale.code}
                    </span>
                    <span className="ft-locale-switcher__option-label">
                      {locale.nativeLabel}
                    </span>
                  </span>
                  <span className="ft-locale-switcher__option-status">
                    {locale.status === "live" ? "Live" : "Soon"}
                  </span>
                </span>
              </>
            );

            if (locale.status === "live") {
              return (
                <LoaderLink
                  key={locale.code}
                  className={`ft-locale-switcher__option ${locale.code === current.code ? "is-active" : ""}`}
                  href={locale.href}
                  onClick={() => setOpen(false)}
                >
                  {content}
                </LoaderLink>
              );
            }

            return (
              <button
                key={locale.code}
                aria-disabled="true"
                className="ft-locale-switcher__option is-disabled"
                type="button"
              >
                {content}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
