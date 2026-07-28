"use client";

import { useEffect, useState } from "react";
import { readMarketPrice, type MarketPricePayload } from "@/lib/client-market-price";
import { formatCompactMetric } from "@/lib/site-format";
import type { HomePageContent } from "@/content/home-content";

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
  copy,
}: {
  includeDailyRule?: boolean;
  copy: HomePageContent["ui"]["marketStrip"];
}) {
  const [payload, setPayload] = useState<MarketPricePayload | null>(null);

  useEffect(() => {
    let active = true;

    async function readPrices() {
      try {
        const json = await readMarketPrice();
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
    }, 300000);

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

  const directMain = payload?.ok && payload.snapshot?.direct?.trx
    ? `${formatCompactMetric(payload.snapshot.direct.trx)} TRX`
    : copy.unavailable;
  const dexMain = payload?.ok && payload.snapshot?.dex?.trx
    ? `${formatCompactMetric(payload.snapshot.dex.trx)} TRX`
    : copy.unavailable;
  const dexSub = payload?.ok && payload.snapshot?.dex?.usdt
    ? `~ $${formatCompactMetric(payload.snapshot.dex.usdt)} ${copy.dexSubSuffix}`
    : copy.routerQuoteReadFailed;

  return (
    <>
      <HomePriceCard
        label={copy.directPriceLabel}
        main={directMain}
        sub={copy.directPriceSub}
      />
      <HomePriceCard
        label={includeDailyRule ? copy.dexReferenceLabel : copy.dexPriceLabel}
        main={dexMain}
        sub={dexSub}
      />
      <HomePriceCard
        label={copy.unlockCycleLabel}
        main={copy.unlockCycleValue}
        sub={includeDailyRule ? copy.unlockCycleDailyRuleSub : copy.unlockCycleSub}
      />
      {includeDailyRule ? (
        <HomePriceCard
          label={copy.dailyLiquidityRuleLabel}
          main={copy.dailyLiquidityRuleValue}
          sub={copy.dailyLiquidityRuleSub}
        />
      ) : null}
    </>
  );
}
