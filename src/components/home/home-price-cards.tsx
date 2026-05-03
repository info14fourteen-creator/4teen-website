"use client";

import { useEffect, useState } from "react";
import { formatCompactMetric } from "@/lib/site-format";

type MarketPayload = {
  ok: boolean;
  snapshot?: {
    direct?: {
      trx: string;
    };
    dex?: {
      trx: string;
      usdt: string;
    };
  } | null;
};

function HomePriceCard({
  label,
  main,
  sub,
}: {
  label: string;
  main: string;
  sub: string;
}) {
  return (
    <article className="ft-price-card">
      <div className="ft-price-label">{label}</div>
      <div className="ft-price-main">{main}</div>
      <div className="ft-price-sub">{sub}</div>
    </article>
  );
}

export function HomePriceCards({
  includeDailyRule = false,
}: {
  includeDailyRule?: boolean;
}) {
  const [payload, setPayload] = useState<MarketPayload | null>(null);

  useEffect(() => {
    let active = true;

    async function readPrices() {
      try {
        const response = await fetch("/api/site/market-price", {
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error(`Price fetch failed: ${response.status}`);
        }

        const json = (await response.json()) as MarketPayload;
        if (!active) return;
        setPayload(json);
      } catch {
        if (!active) return;
        setPayload({
          ok: false,
        });
      }
    }

    void readPrices();
    const refreshId = window.setInterval(() => {
      void readPrices();
    }, 60000);

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

  const directMain = payload?.ok && payload.snapshot?.direct?.trx
    ? `${formatCompactMetric(payload.snapshot.direct.trx)} TRX`
    : "Unavailable";
  const dexMain = payload?.ok && payload.snapshot?.dex?.trx
    ? `${formatCompactMetric(payload.snapshot.dex.trx)} TRX`
    : "Unavailable";
  const dexSub = payload?.ok && payload.snapshot?.dex?.usdt
    ? `~ $${formatCompactMetric(payload.snapshot.dex.usdt)} per 4TEEN`
    : "Router quote read failed";

  return (
    <>
      <HomePriceCard
        label="Direct Price"
        main={directMain}
        sub="Per 1 4TEEN via protocol"
      />
      <HomePriceCard
        label={includeDailyRule ? "DEX Reference" : "DEX Price"}
        main={dexMain}
        sub={dexSub}
      />
      <HomePriceCard
        label="Unlock Cycle"
        main="14 Days"
        sub={includeDailyRule ? "Fixed lock for direct purchases" : "Direct purchase lock period"}
      />
      {includeDailyRule ? (
        <HomePriceCard
          label="Daily Liquidity Rule"
          main="6.43%"
          sub="Released once per UTC day by controller logic"
        />
      ) : null}
    </>
  );
}
