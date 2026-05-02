"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import { LoaderLink } from "@/components/site/loader-link";
import localeGlobeHover from "@/assets/lottie/locale-globe-hover.json";
import { defaultSiteLocale } from "@/lib/site-locale";
import { siteLocales } from "@/lib/site-config";

export function LocaleSwitcher({
  content,
  currentLocale = defaultSiteLocale,
  compact = false,
  footerCompact = false,
  minimal = false,
}: {
  content?: {
    eyebrow: string;
    title: string;
    active: string;
    soon: string;
  };
  currentLocale?: string;
  compact?: boolean;
  footerCompact?: boolean;
  minimal?: boolean;
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

  const copy = content ?? {
    eyebrow: "Language",
    title: "Choose interface language",
    active: "Active",
    soon: "Soon",
  };

  return (
    <div
      ref={rootRef}
      className={`ft-locale-switcher ${compact ? "is-compact" : ""} ${footerCompact ? "is-footer-compact" : ""} ${minimal ? "is-minimal" : ""} ${open ? "is-open" : ""}`}
    >
      {open && footerCompact ? (
        <div className="ft-locale-switcher__inline-strip" role="listbox">
          {siteLocales.map((locale) => {
            if (locale.code === current.code) return null;

            const content = (
              <>
                <span className="ft-locale-switcher__button-flag">{locale.flag}</span>
                <span className="ft-locale-switcher__button-code">{locale.code}</span>
              </>
            );

            if (locale.status === "live") {
              return (
                <LoaderLink
                  key={locale.code}
                  className="ft-locale-switcher__inline-option"
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
                className="ft-locale-switcher__inline-option is-disabled"
                onClick={() => setOpen(false)}
                type="button"
              >
                {content}
              </button>
            );
          })}
        </div>
      ) : null}

      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="ft-locale-switcher__button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {footerCompact || minimal ? null : (
          <span className="ft-locale-switcher__button-glyph">
            <AnimatedLottieIcon
              animationData={localeGlobeHover}
              loop={open}
              playOnHover={!open}
            />
          </span>
        )}
        <span className="ft-locale-switcher__button-flag">{current.flag}</span>
        <span className="ft-locale-switcher__button-code">{current.code}</span>
      </button>

      {open && !footerCompact ? (
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
                    {locale.status === "live"
                      ? locale.code === current.code
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
                onClick={() => setOpen(false)}
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
