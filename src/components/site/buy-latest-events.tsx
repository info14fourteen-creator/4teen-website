"use client";

import statusConfirmedCheck from "@/assets/lottie/status-confirmed-check.json";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import { LoaderLink } from "@/components/site/loader-link";
import { useEffect, useState } from "react";
import type { SupportedSiteLocale } from "@/lib/site-locale";
import { formatCompactMetric } from "@/lib/site-format";
import { formatUtcDate } from "@/lib/site-intl";
import type { LiveBuyEvent } from "@/lib/site-snapshot-types";

const DIRECT_BUY_LOCK_MS = 14 * 24 * 60 * 60 * 1000;

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
      wallet: string;
      trxIn: string;
      minted: string;
      lockEnds: string;
      transaction: string;
      status: string;
    };
    statusConfirmed: string;
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
            <span
              aria-hidden="true"
              className="ft-buy-page__latest-head-marker"
            />
            <span>{content.headers.wallet}</span>
            <span>{content.headers.trxIn}</span>
            <span>{content.headers.minted}</span>
            <span>{content.headers.lockEnds}</span>
            <span>{content.headers.transaction}</span>
            <span className="ft-buy-page__latest-head-status">{content.headers.status}</span>
          </div>

          {events.map((event) => (
            <div
              key={event.txId}
              className="ft-buy-page__latest-row"
              role="row"
            >
              <div className="ft-buy-page__latest-cell ft-buy-page__latest-cell--mark">
                <AnimatedLottieIcon
                  animationData={statusConfirmedCheck}
                  className="ft-buy-page__latest-status-icon"
                  loop
                />
              </div>

              <div className="ft-buy-page__latest-cell ft-buy-page__latest-cell--wallet">
                <span className="ft-buy-page__latest-label">{content.headers.wallet}</span>
                <strong title={event.buyerAddress}>{event.buyerShort}</strong>
              </div>

              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">{content.headers.trxIn}</span>
                <strong>{formatCompactMetric(event.trxAmountDisplay)} TRX</strong>
              </div>

              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">{content.headers.minted}</span>
                <strong>{formatCompactMetric(event.tokensAmountDisplay)} 4TEEN</strong>
              </div>

              <div className="ft-buy-page__latest-cell">
                <span className="ft-buy-page__latest-label">{content.headers.lockEnds}</span>
                <span>
                  {event.happenedAt > 0
                    ? formatUtcDate(event.happenedAt + DIRECT_BUY_LOCK_MS, locale)
                    : content.unknownTime}
                </span>
              </div>

              <div className="ft-buy-page__latest-cell ft-buy-page__latest-cell--action">
                <span className="ft-buy-page__latest-label">{content.headers.transaction}</span>
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

              <div className="ft-buy-page__latest-cell ft-buy-page__latest-cell--status">
                <span className="ft-buy-page__latest-label">{content.headers.status}</span>
                <span className="ft-buy-page__status-text">{content.statusConfirmed}</span>
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
