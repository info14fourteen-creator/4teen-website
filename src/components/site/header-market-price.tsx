"use client";

import { useEffect, useState } from "react";
import { getChromeContent } from "@/content/chrome-content";
import { defaultSiteLocale } from "@/lib/site-locale";

type Quote = {
  symbol: string;
  value: string;
  icon: string;
};

type MarketPricePayload = {
  ok?: boolean;
  snapshot?: {
    base: {
      symbol: string;
      value: string;
      icon: string;
    };
    quotes: Quote[];
    updatedAt: string;
  } | null;
};

function MarketPriceLoading({ compact = false }: { compact?: boolean }) {
  const chrome = getChromeContent(defaultSiteLocale);
  return (
    <div className={`ft-header-market ${compact ? "is-compact" : ""} is-loading`}>
      <span className="ft-header-market__status">{chrome.market.loading}</span>
    </div>
  );
}

export function HeaderMarketPrice({ compact = false }: { compact?: boolean }) {
  const chrome = getChromeContent(defaultSiteLocale);
  const [payload, setPayload] = useState<MarketPricePayload | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    async function readViaSnapshotProxy() {
      try {
        const response = await fetch("/api/site/market-price", {
          cache: "force-cache",
        });
        const json = (await response.json()) as MarketPricePayload;
        const snapshot = json.snapshot;

        if (!response.ok || !active || !json.ok || !snapshot || !snapshot.quotes.length) {
          throw new Error(`Price fetch failed: ${response.status}`);
        }

        setPayload({
          ok: true,
          snapshot,
        });
        setHasError(false);
      } catch {
        if (!active) return;
        setHasError((current) => !payload ? true : current);
      }
    }

    void readViaSnapshotProxy();
    const refreshId = window.setInterval(() => {
      void readViaSnapshotProxy();
    }, 60000);

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

  useEffect(() => {
    const quotes = payload?.snapshot?.quotes ?? [];
    if (quotes.length < 2) return;

    const rotateId = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 2400);

    return () => {
      window.clearInterval(rotateId);
    };
  }, [payload]);

  if (!payload && hasError) {
    return (
      <div className={`ft-header-market ${compact ? "is-compact" : ""} is-error`}>
        <span className="ft-header-market__status">{chrome.market.unavailable}</span>
      </div>
    );
  }

  if (!payload) {
    return <MarketPriceLoading compact={compact} />;
  }

  const quote = payload.snapshot?.quotes[quoteIndex] ?? payload.snapshot?.quotes[0];
  const base = payload.snapshot?.base;

  if (!quote || !base) {
    return <MarketPriceLoading compact={compact} />;
  }

  return (
    <div
      aria-label="Live market price"
      className={`ft-header-market ${compact ? "is-compact" : ""}`}
    >
      <span className="ft-header-market__group">
        <span className="ft-header-market__value">{base.value}</span>
        <img
          alt=""
          className="ft-header-market__icon"
          height={18}
          loading="eager"
          referrerPolicy="no-referrer"
          src={base.icon}
          width={18}
        />
      </span>

      <span className="ft-header-market__eq">=</span>

      <span className="ft-header-market__group ft-header-market__group--quote">
        <span className="ft-header-market__value">{quote.value}</span>
        <img
          alt=""
          className="ft-header-market__icon"
          height={18}
          loading="eager"
          referrerPolicy="no-referrer"
          src={quote.icon}
          width={18}
        />
      </span>
    </div>
  );
}
