"use client";

import { usePathname } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import searchOpenResultsHover from "@/assets/lottie/search-open-results-hover.json";
import utilitySearchHover from "@/assets/lottie/utility-search-hover.json";
import { LoaderLink, navigateHard, triggerFourteenLoader } from "@/components/site/loader-link";
import { searchSiteEntries } from "@/lib/site-search";

export function SiteSearch({
  content,
}: {
  content: {
    prompts: string[];
    ariaLabel: string;
    actionAria: string;
    eyebrow: string;
    title: string;
    dialogAria: string;
    closeAria: string;
    resultsSuffix: string;
    noResultsYet: string;
    pressEnter: string;
    topMatch: string;
    route: string;
    external: string;
    empty: string;
  };
}) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(content.prompts[0]);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchSiteEntries(deferredQuery, pathname),
    [deferredQuery, pathname],
  );

  useEffect(() => {
    if (query) return;

    let mounted = true;
    let timeoutId: number | undefined;
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function step() {
      const currentPhrase = content.prompts[phraseIndex] ?? content.prompts[0];

      if (!mounted) return;

      if (!deleting) {
        charIndex += 1;
        setPlaceholder(currentPhrase.slice(0, charIndex));

        if (charIndex >= currentPhrase.length) {
          deleting = true;
          timeoutId = window.setTimeout(step, 1100);
          return;
        }

        timeoutId = window.setTimeout(step, 42);
        return;
      }

      charIndex -= 1;
      setPlaceholder(currentPhrase.slice(0, Math.max(0, charIndex)));

      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % content.prompts.length;
        timeoutId = window.setTimeout(step, 220);
        return;
      }

      timeoutId = window.setTimeout(step, 24);
    }

    timeoutId = window.setTimeout(step, 280);

    return () => {
      mounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [content.prompts, query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "/") {
        const target = event.target as HTMLElement | null;
        const isEditable =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.getAttribute("contenteditable") === "true";

        if (!isEditable) {
          event.preventDefault();
          inputRef.current?.focus();
          setModalOpen(true);
        }
      }

      if (event.key === "Escape") {
        setModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen]);

  function openEntry(href: string, kind: "internal" | "external") {
    setModalOpen(false);

    if (kind === "external") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    triggerFourteenLoader();
    window.setTimeout(() => {
      navigateHard(href);
    }, 24);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!modalOpen) {
      setModalOpen(true);
      return;
    }

    const first = results[0];
    if (!first) return;

    openEntry(first.href, first.kind);
  }

  return (
    <form
      ref={rootRef}
      className={`ft-site-search ${modalOpen ? "is-open" : ""}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <span className="ft-site-search__icon" aria-hidden="true">
        <AnimatedLottieIcon
          animationData={utilitySearchHover}
          className="ft-site-search__icon-lottie"
          playOnHover
        />
      </span>

      <input
        ref={inputRef}
        aria-label={content.ariaLabel}
        className="ft-site-search__input"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onFocus={() => {
          setModalOpen(true);
        }}
        placeholder={placeholder}
        type="search"
        value={query}
      />

      <button
        aria-label={content.actionAria}
        className="ft-site-search__action"
        type="submit"
      >
        <AnimatedLottieIcon
          animationData={searchOpenResultsHover}
          className="ft-site-search__action-lottie"
          playOnHover
        />
      </button>

      {modalOpen ? (
        <div
          aria-hidden="true"
          className="ft-site-search-modal"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div
            aria-label={content.dialogAria}
            aria-modal="true"
            className="ft-site-search-modal__dialog"
            role="dialog"
          >
            <div className="ft-site-search-modal__head">
              <div className="ft-site-search-modal__titlewrap">
                <p className="ft-site-search-modal__eyebrow">{content.eyebrow}</p>
                <h3 className="ft-site-search-modal__title">{content.title}</h3>
              </div>

              <button
                aria-label={content.closeAria}
                className="ft-site-search-modal__close"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="ft-site-search-modal__summary">
              <span>
                {results.length
                  ? `${results.length} ${content.resultsSuffix}`
                  : content.noResultsYet}
              </span>
              <span>{content.pressEnter}</span>
            </div>

            <div className="ft-site-search-modal__results">
              {results.length ? (
                results.map((entry, index) =>
                  entry.kind === "internal" ? (
                    <LoaderLink
                      key={`${entry.kind}:${entry.href}`}
                      className={`ft-site-search__result ${index === 0 ? "is-primary" : ""}`}
                      href={entry.href}
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      <span className="ft-site-search__result-kicker">
                        {index === 0 ? content.topMatch : entry.kind === "internal" ? content.route : content.external}
                      </span>
                      <span className="ft-site-search__result-title">{entry.title}</span>
                      <span className="ft-site-search__result-meta">{entry.meta}</span>
                    </LoaderLink>
                  ) : (
                    <button
                      key={`${entry.kind}:${entry.href}`}
                      className={`ft-site-search__result ${index === 0 ? "is-primary" : ""}`}
                      onClick={() => openEntry(entry.href, entry.kind)}
                      type="button"
                    >
                      <span className="ft-site-search__result-kicker">
                        {index === 0 ? content.topMatch : content.external}
                      </span>
                      <span className="ft-site-search__result-title">{entry.title}</span>
                      <span className="ft-site-search__result-meta">{entry.meta}</span>
                    </button>
                  ),
                )
              ) : (
                <div className="ft-site-search__empty">
                  {content.empty}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
