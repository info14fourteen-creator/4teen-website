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
  ok: true;
  base: {
    symbol: string;
    value: string;
    icon: string;
  };
  quotes: Quote[];
  updatedAt: string;
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

    async function readPrice() {
      try {
        const response = await fetch("/api/market-price", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Price fetch failed: ${response.status}`);
        }

        const json = (await response.json()) as MarketPricePayload;
        if (!active || !json.ok || !json.quotes.length) return;

        setPayload(json);
        setHasError(false);
      } catch {
        if (!active) return;
        setHasError(true);
      }
    }

    void readPrice();
    const refreshId = window.setInterval(() => {
      void readPrice();
    }, 60000);

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

  useEffect(() => {
    if (!payload || payload.quotes.length < 2) return;

    const rotateId = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % payload.quotes.length);
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

  const quote = payload.quotes[quoteIndex] ?? payload.quotes[0];

  return (
    <div
      aria-label="Live market price"
      className={`ft-header-market ${compact ? "is-compact" : ""}`}
    >
      <span className="ft-header-market__group">
        <span className="ft-header-market__value">{payload.base.value}</span>
        <img
          alt=""
          className="ft-header-market__icon"
          height={18}
          loading="eager"
          referrerPolicy="no-referrer"
          src={payload.base.icon}
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
