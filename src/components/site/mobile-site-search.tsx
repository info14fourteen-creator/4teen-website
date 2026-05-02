"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { triggerFourteenLoader } from "@/components/site/loader-link";
import { searchSiteEntries } from "@/lib/site-search";

export function MobileSiteSearch({
  content,
  open,
  onNavigate,
}: {
  content: {
    ariaLabel: string;
    placeholder: string;
    eyebrow: string;
    title: string;
    route: string;
    external: string;
    empty: string;
  };
  open: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchSiteEntries(query, pathname).slice(0, 6),
    [pathname, query],
  );

  useEffect(() => {
    if (!open) return;

    const id = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);

    return () => {
      window.clearTimeout(id);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  function finishNavigate() {
    onNavigate?.();
    setQuery("");
  }

  function openEntry(href: string, kind: "internal" | "external") {
    finishNavigate();

    if (kind === "external") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    triggerFourteenLoader();
    startTransition(() => {
      router.push(href);
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const first = results[0];
    if (!first) return;

    openEntry(first.href, first.kind);
  }

  return (
    <div className="ft-mobile-search-panel">
      <form className="ft-mobile-search-panel__field" onSubmit={handleSubmit} role="search">
        <input
          ref={inputRef}
          aria-label={content.ariaLabel}
          className="ft-mobile-search-panel__input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={content.placeholder}
          type="search"
          value={query}
        />
      </form>

      <div className="ft-mobile-search-panel__head">
        <p className="ft-mobile-search-panel__eyebrow">{content.eyebrow}</p>
        <h3 className="ft-mobile-search-panel__title">{content.title}</h3>
      </div>

      <div className="ft-mobile-search-panel__results">
        {results.length ? (
          results.map((entry, index) =>
            entry.kind === "internal" ? (
              <Link
                key={`${entry.kind}:${entry.href}`}
                className={`ft-mobile-search-panel__result ${index === 0 ? "is-primary" : ""}`}
                href={entry.href}
              >
                <span className="ft-mobile-search-panel__result-kicker">
                  {entry.kind === "internal" ? content.route : content.external}
                </span>
                <span className="ft-mobile-search-panel__result-title">{entry.title}</span>
                <span className="ft-mobile-search-panel__result-meta">{entry.meta}</span>
              </Link>
            ) : (
              <button
                key={`${entry.kind}:${entry.href}`}
                className={`ft-mobile-search-panel__result ${index === 0 ? "is-primary" : ""}`}
                onClick={() => openEntry(entry.href, entry.kind)}
                type="button"
              >
                <span className="ft-mobile-search-panel__result-kicker">
                  {content.external}
                </span>
                <span className="ft-mobile-search-panel__result-title">{entry.title}</span>
                <span className="ft-mobile-search-panel__result-meta">{entry.meta}</span>
              </button>
            ),
          )
        ) : (
          <div className="ft-mobile-search-panel__empty">{content.empty}</div>
        )}
      </div>
    </div>
  );
}
