"use client";

import { useEffect, useState } from "react";
import { readMarketPrice } from "@/lib/client-market-price";
import type { SupportedSiteLocale } from "@/lib/site-locale";
import { formatUtcDate } from "@/lib/site-intl";

export function BuyDirectPriceStat({
  locale,
  content,
}: {
  locale: SupportedSiteLocale;
  content: {
    label: string;
    directPriceMeta: string;
    fallback: string;
    unavailable: string;
  };
}) {
  const [state, setState] = useState<{
    value: string;
    meta: string;
  }>({
    value: content.fallback,
    meta: content.unavailable,
  });

  useEffect(() => {
    let cancelled = false;

    readMarketPrice()
      .then((payload) => {
        if (cancelled) return;
        const directTrx = payload?.snapshot?.direct?.trx?.trim();
        const updatedAt = payload?.snapshot?.updatedAt;

        if (!payload?.ok || !directTrx) {
          return;
        }

        setState({
          value: `${directTrx} TRX`,
          meta: updatedAt
            ? `${content.directPriceMeta} ${formatUtcDate(updatedAt, locale)}`
            : content.unavailable,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [content.directPriceMeta, content.unavailable, locale]);

  return (
    <article className="ft-price-card">
      <p className="ft-price-label">{content.label}</p>
      <p className="ft-price-main">{state.value}</p>
      <p className="ft-price-sub">{state.meta}</p>
    </article>
  );
}
