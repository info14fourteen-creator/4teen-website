"use client";

import { LoaderLink } from "@/components/site/loader-link";
import { useEffect, useState } from "react";
import type { SupportedSiteLocale } from "@/lib/site-locale";
import { formatCompactMetric } from "@/lib/site-format";
import { formatUtcDate } from "@/lib/site-intl";
import type { LiveBuyEvent } from "@/lib/site-snapshot-types";

type BuyLatestEventsPayload = {
  ok?: boolean;
  events?: LiveBuyEvent[];
  snapshot?: {
    events?: LiveBuyEvent[];
  } | null;
};

export function BuyLatestEvents({
  content,
  locale,
}: {
  content: {
    headers: {
      buyer: string;
      spent: string;
      minted: string;
      happened: string;
      verify: string;
    };
    unknownTime: string;
    openTx: string;
    empty: string;
    note: string;
  };
  locale: SupportedSiteLocale;
}) {
  const [events, setEvents] = useState<LiveBuyEvent[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/site/buy-latest", {
      cache: "force-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json() as Promise<BuyLatestEventsPayload>;
      })
      .then((payload) => {
        if (cancelled) return;
        setEvents(Array.isArray(payload.snapshot?.events) ? payload.snapshot.events : []);
      })
      .catch(() => {
        if (cancelled) return;
        setEvents([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!events) {
    return <p className="ft-note">{content.note}</p>;
  }

  return (
    <>
      {events.length > 0 ? (
        <div className="ft-buy-page__latest-list" role="table">
          <div className="ft-buy-page__latest-head" role="row">
            <span>{content.headers.buyer}</span>
            <span>{content.headers.spent}</span>
            <span>{content.headers.minted}</span>
            <span>{content.headers.happened}</span>
            <span>{content.headers.verify}</span>
          </div>

          {events.map((event) => (
            <div
              key={event.txId}
              className="ft-buy-page__latest-row"
              role="row"
            >
              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">
                  {content.headers.buyer}
                </span>
                <strong title={event.buyerAddress}>{event.buyerShort}</strong>
              </div>

              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">
                  {content.headers.spent}
                </span>
                <strong>{formatCompactMetric(event.trxAmountDisplay)} TRX</strong>
              </div>

              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">
                  {content.headers.minted}
                </span>
                <strong>{formatCompactMetric(event.tokensAmountDisplay)} 4TEEN</strong>
              </div>

              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">
                  {content.headers.happened}
                </span>
                <span>
                  {event.happenedAt > 0
                    ? formatUtcDate(event.happenedAt, locale)
                    : content.unknownTime}
                </span>
              </div>

              <div className="ft-buy-page__latest-cell ft-buy-page__latest-cell--action">
                <span className="ft-buy-page__latest-label">
                  {content.headers.verify}
                </span>
                <LoaderLink
                  className="ft-link ft-buy-page__latest-action-link"
                  href={event.txUrl}
                  showLinkIcon
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.openTx}
                </LoaderLink>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="ft-note">{content.empty}</p>
      )}

      <p className="ft-note">{content.note}</p>
    </>
  );
}
