import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { ProgressiveAnimatedMedia } from "@/components/site/progressive-animated-media";
import { LoaderLink } from "@/components/site/loader-link";
import { SignalPoints } from "@/components/site/signal-points";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { getLiquidityPageContent } from "@/content/liquidity-content";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import { formatCompactMetric, shortenAddress } from "@/lib/site-format";
import { formatUtcDate } from "@/lib/site-intl";
import { getServerSiteSnapshot } from "@/lib/server-site-snapshot";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  type LiveLiquiditySnapshot,
  liquidityVerificationLinks,
} from "@/lib/site-snapshot-types";

const LIQUIDITY_HERO_POSTER_SRC = "/media/liquidity-demo.png";
const LIQUIDITY_HERO_MEDIA_SRC = "/media/liquidity-demo.gif";
const LIQUIDITY_HERO_MEDIA_ALT =
  "4TEEN public liquidity controller mobile wallet preview";

export function getLiquidityPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getLiquidityPageContent(locale).metadata;

  return buildPageMetadata({
    ...metadata,
    locale,
    pathname: "/liquidity",
    socialImages: [
      {
        url: LIQUIDITY_HERO_POSTER_SRC,
        alt: LIQUIDITY_HERO_MEDIA_ALT,
      },
    ],
  });
}

export const metadata: Metadata = getLiquidityPageMetadata();

function accentizeTitle(text: string) {
  if (!text.includes("4TEEN")) {
    return text;
  }

  const [before, after] = text.split("4TEEN");

  return (
    <>
      {before}
      <span className="ft-accent">4TEEN</span>
      {after}
    </>
  );
}

function renderPublicRouteTitle(text: string) {
  if (
    text ===
    "Automation is configured. Public execution still belongs to the wallet."
  ) {
    return (
      <>
        <span className="ft-meta-green">Automation</span> is configured.{" "}
        <span className="ft-accent">Public execution</span> still belongs to the{" "}
        wallet.
      </>
    );
  }

  return text;
}

function renderTriggerModelTitle(text: string) {
  if (text === "What actually happens when someone taps Trigger Liquidity") {
    return (
      <>
        What actually happens when someone taps{" "}
        <span className="ft-accent">Trigger Liquidity</span>
      </>
    );
  }

  return text;
}

function renderReservePathTitle(text: string) {
  if (text === "Reserve tokens are inventory, not free circulation") {
    return (
      <>
        <span className="ft-meta-green">Reserve tokens</span> are inventory, not{" "}
        <span className="ft-accent">free circulation</span>
      </>
    );
  }

  return text;
}

function renderCtaTitle(text: string) {
  if (text === "Open the wallet when you want to wake the route yourself") {
    return (
      <>
        Open the <span className="ft-meta-green">wallet</span> when you want to{" "}
        <span className="ft-accent">wake the route yourself</span>
      </>
    );
  }

  return text;
}

function getWindowStateLabel(
  snapshot: LiveLiquiditySnapshot,
  locale: SupportedSiteLocale,
  content: ReturnType<typeof getLiquidityPageContent>,
) {
  if (snapshot.currentWindowState === "ready") {
    return content.sections.liveState.stateLabels.ready;
  }

  if (snapshot.currentWindowState === "threshold") {
    return content.sections.liveState.stateLabels.threshold;
  }

  if (snapshot.currentWindowState === "waiting") {
    return content.sections.liveState.stateLabels.waiting;
  }

  return formatUtcDate(snapshot.nextWindowAt, locale);
}

export async function LiquidityPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getLiquidityPageContent(locale);
  const snapshot =
    await getServerSiteSnapshot<LiveLiquiditySnapshot>("liquidity");

  const heroSignals = content.hero.rotatingLines ?? [];
  const controllerReserve = snapshot?.reserves[0];
  const executorReserves = snapshot?.reserves.slice(1, 3) ?? [];

  const heroStats = snapshot ? (
    <>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.controllerBalance.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.controllerBalanceDisplay)} TRX
        </p>
        <p className="ft-price-sub">{content.hero.stats.controllerBalance.meta}</p>
      </article>
      <article className="ft-price-card ft-price-card--warning">
        <p className="ft-price-label">{content.hero.stats.nextRelease.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.nextReleaseDisplay)} TRX
        </p>
        <p className="ft-price-sub">{content.hero.stats.nextRelease.meta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.triggerFloor.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.minBalanceDisplay)} TRX
        </p>
        <p className="ft-price-sub">{content.hero.stats.triggerFloor.meta}</p>
      </article>
      <article className="ft-price-card ft-price-card--positive">
        <p className="ft-price-label">{content.hero.stats.cadence.label}</p>
        <p className="ft-price-main">Once / UTC day</p>
        <p className="ft-price-sub">{content.hero.stats.cadence.meta}</p>
      </article>
    </>
  ) : null;

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-liquidity-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-buy-page__hero-layout">
                <div className="ft-stack ft-stack--md ft-buy-page__hero-copy">
                  <div className="ft-cluster ft-cluster--sm">
                    <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                    <span className="ft-status-pill live">{content.hero.badge}</span>
                    <SiteSnapshotRefresh snapshotKeys={["liquidity"]} />
                  </div>

                  <h1 className="ft-title-lg">{accentizeTitle(content.hero.title)}</h1>
                  <p className="ft-lead">{content.hero.subtitle}</p>

                  <div className="ft-stack ft-stack--sm">
                    {content.hero.body.map((paragraph) => (
                      <p key={paragraph} className="ft-text">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {heroSignals.length ? (
                    <SignalPoints
                      className="ft-buy-page__signal-lines ft-buy-page__signal-lines--lead"
                      items={heroSignals}
                    />
                  ) : null}

                  {snapshot ? (
                    <div className="ft-grid ft-buy-page__hero-stats ft-liquidity-page__hero-stats--desktop">
                      {heroStats}
                    </div>
                  ) : (
                    <div className="ft-note">
                      <strong>{content.hero.stats.readFailed}</strong>{" "}
                      {content.hero.stats.readRetry}
                    </div>
                  )}
                </div>

                <div className="ft-buy-page__hero-side">
                  <div className="ft-stack ft-stack--md ft-buy-page__hero-side-inner">
                    <div className="ft-buy-page__hero-media">
                      <ProgressiveAnimatedMedia
                        alt={LIQUIDITY_HERO_MEDIA_ALT}
                        animatedSrc={LIQUIDITY_HERO_MEDIA_SRC}
                        className="ft-buy-page__hero-media-frame"
                        height={2220}
                        imageClassName="ft-buy-page__hero-media-image"
                        posterSrc={LIQUIDITY_HERO_POSTER_SRC}
                        priority
                        width={1080}
                      />
                    </div>

                    <div className="ft-actions ft-actions--stack-mobile ft-buy-page__hero-side-actions">
                      <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                        {content.hero.primaryCta}
                      </LoaderLink>
                      <LoaderLink
                        className="ft-btn ft-btn--secondary"
                        href="#liquidity-live-feed"
                      >
                        {content.hero.secondaryCta}
                      </LoaderLink>
                    </div>

                    <p className="ft-note ft-buy-page__hero-note ft-buy-page__hero-note--desktop">
                      {content.hero.ctaNote}
                    </p>
                  </div>
                </div>
              </div>

              <p className="ft-note ft-buy-page__hero-note ft-buy-page__hero-note--mobile">
                {content.hero.ctaNote}
              </p>

              {snapshot ? (
                <div className="ft-grid ft-buy-page__hero-stats ft-liquidity-page__hero-stats--mobile">
                  {heroStats}
                </div>
              ) : null}
            </div>
          </article>

          <article className="ft-card ft-liquidity-page__panel">
            <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.publicRoute.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderPublicRouteTitle(content.sections.publicRoute.title)}
                </h2>
              </div>

              <p className="ft-text">{content.sections.publicRoute.intro}</p>

              <div className="ft-liquidity-page__story-grid">
                <article className="ft-card ft-card--plain ft-card--positive ft-liquidity-page__detail-card ft-liquidity-page__story-main">
                  <p className="ft-card-title-top">
                    {content.sections.publicRoute.mainCard.eyebrow}
                  </p>
                  <h3 className="ft-card-title">
                    {content.sections.publicRoute.mainCard.title}
                  </h3>
                  <p className="ft-text">{content.sections.publicRoute.mainCard.text}</p>
                  {content.sections.publicRoute.mainCard.bullets?.length ? (
                    <ul className="ft-list">
                      {content.sections.publicRoute.mainCard.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>

                <div className="ft-liquidity-page__story-stack">
                  {content.sections.publicRoute.cards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`ft-card ft-card--plain ft-liquidity-page__detail-card ${
                        index === 0 ? "ft-card--warning" : "ft-card--positive"
                      }`}
                    >
                      <p className="ft-card-title-top">{card.eyebrow}</p>
                      <h3 className="ft-card-title">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <p className="ft-note">{content.sections.publicRoute.note}</p>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-liquidity-page__section-grid">
            {snapshot ? (
              <article className="ft-card ft-liquidity-page__panel">
                <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.sections.liveState.eyebrow}</p>
                    <h2 className="ft-subtitle">{content.sections.liveState.title}</h2>
                  </div>

                  <table className="ft-mini-table ft-liquidity-page__mini-table">
                    <tbody>
                      <tr>
                        <th>{content.sections.liveState.rows.controllerBalance}</th>
                        <td className="ft-right">
                          <strong>
                            {formatCompactMetric(snapshot.controllerBalanceDisplay)} TRX
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.latestFunding}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.latestFundingDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.latestFundingAt}</th>
                        <td className="ft-right">
                          {snapshot.latestFundingAt > 0
                            ? formatUtcDate(snapshot.latestFundingAt, locale)
                            : "—"}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.lastExecute}</th>
                        <td className="ft-right">
                          {snapshot.lastExecuteAt > 0
                            ? formatUtcDate(snapshot.lastExecuteAt, locale)
                            : "—"}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.minBalance}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.minBalanceDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.dailyRelease}</th>
                        <td className="ft-right">{snapshot.dailyPercentLabel}</td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.split}</th>
                        <td className="ft-right">{snapshot.splitLabel}</td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.windowState}</th>
                        <td className="ft-right">
                          {getWindowStateLabel(snapshot, locale, content)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.nextWindow}</th>
                        <td className="ft-right">
                          {snapshot.currentWindowState === "ready"
                            ? content.sections.liveState.valueLabels.openNow
                            : snapshot.currentWindowState === "threshold"
                              ? content.sections.liveState.valueLabels.waitForThreshold
                              : formatUtcDate(snapshot.nextWindowAt, locale)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.liveState.rows.snapshotUpdated}</th>
                        <td className="ft-right">{formatUtcDate(snapshot.loadedAt, locale)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="ft-note">{content.sections.liveState.note}</p>
                </div>
              </article>
            ) : null}

            <article className="ft-card ft-liquidity-page__panel">
              <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.triggerModel.eyebrow}</p>
                  <h2 className="ft-subtitle">
                    {renderTriggerModelTitle(content.sections.triggerModel.title)}
                  </h2>
                </div>

                <p className="ft-text">{content.sections.triggerModel.intro}</p>

                <div className="ft-liquidity-page__story-grid">
                  <article className="ft-card ft-card--plain ft-card--warning ft-liquidity-page__detail-card ft-liquidity-page__story-main">
                    <p className="ft-card-title-top">
                      {content.sections.triggerModel.mainCard.eyebrow}
                    </p>
                    <h3 className="ft-card-title">
                      {content.sections.triggerModel.mainCard.title}
                    </h3>
                    <p className="ft-text">{content.sections.triggerModel.mainCard.text}</p>
                    {content.sections.triggerModel.mainCard.bullets?.length ? (
                      <ul className="ft-list">
                        {content.sections.triggerModel.mainCard.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>

                  <div className="ft-liquidity-page__story-stack">
                    {content.sections.triggerModel.cards.map((card, index) => (
                      <article
                        key={card.title}
                        className={`ft-card ft-card--plain ft-liquidity-page__detail-card ${
                          index === 0 ? "ft-card--positive" : "ft-card--negative"
                        }`}
                      >
                        <p className="ft-card-title-top">{card.eyebrow}</p>
                        <h3 className="ft-card-title">{card.title}</h3>
                        <p className="ft-text">{card.text}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <p className="ft-note">{content.sections.triggerModel.note}</p>
              </div>
            </article>
          </div>

          {snapshot ? (
            <article
              id="liquidity-live-feed"
              className="ft-card ft-liquidity-page__panel"
            >
              <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.latestExecutions.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.latestExecutions.title}</h2>
                  <p className="ft-text">{content.sections.latestExecutions.body}</p>
                </div>

                {snapshot.operations.length > 0 ? (
                  <div className="ft-liquidity-page__latest-list" role="table">
                    <div className="ft-liquidity-page__latest-head" role="row">
                      <span>{content.sections.latestExecutions.headers.total}</span>
                      <span>{content.sections.latestExecutions.headers.split}</span>
                      <span>{content.sections.latestExecutions.headers.happened}</span>
                      <span>{content.sections.latestExecutions.headers.day}</span>
                      <span>{content.sections.latestExecutions.headers.source}</span>
                    </div>

                    {snapshot.operations.map((operation) => (
                      <div
                        key={operation.txId}
                        className="ft-liquidity-page__latest-row"
                        role="row"
                      >
                        <div className="ft-liquidity-page__latest-cell">
                          <span className="ft-liquidity-page__latest-label">
                            {content.sections.latestExecutions.headers.total}
                          </span>
                          <strong>
                            {formatCompactMetric(operation.totalTrxDisplay)} TRX
                          </strong>
                        </div>

                        <div className="ft-liquidity-page__latest-cell">
                          <span className="ft-liquidity-page__latest-label">
                            {content.sections.latestExecutions.headers.split}
                          </span>
                          <div className="ft-stack ft-stack--xs">
                            <span>
                              JM {formatCompactMetric(operation.justMoneyTrxDisplay)} TRX
                            </span>
                            <span>
                              SUN {formatCompactMetric(operation.sunV3TrxDisplay)} TRX
                            </span>
                          </div>
                        </div>

                        <div className="ft-liquidity-page__latest-cell">
                          <span className="ft-liquidity-page__latest-label">
                            {content.sections.latestExecutions.headers.happened}
                          </span>
                          <span>{formatUtcDate(operation.happenedAt, locale)}</span>
                        </div>

                        <div className="ft-liquidity-page__latest-cell">
                          <span className="ft-liquidity-page__latest-label">
                            {content.sections.latestExecutions.headers.day}
                          </span>
                          <span>{operation.day}</span>
                        </div>

                        <div className="ft-liquidity-page__latest-cell ft-liquidity-page__latest-cell--action">
                          <span className="ft-liquidity-page__latest-label">
                            {content.sections.latestExecutions.headers.source}
                          </span>
                          <LoaderLink
                            className="ft-link"
                            href={operation.txUrl}
                            rel="noopener noreferrer"
                            showLinkIcon
                            target="_blank"
                          >
                            {content.sections.latestExecutions.openTx}
                          </LoaderLink>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="ft-note">{content.sections.latestExecutions.empty}</p>
                )}

                <p className="ft-note">{content.sections.latestExecutions.note}</p>
              </div>
            </article>
          ) : null}

          <article className="ft-card ft-liquidity-page__panel">
            <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.reservePath.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderReservePathTitle(content.sections.reservePath.title)}
                </h2>
              </div>

              <p className="ft-text">{content.sections.reservePath.intro}</p>

              <div className="ft-liquidity-page__reserve-grid">
                <article className="ft-card ft-card--plain ft-card--positive ft-liquidity-page__detail-card ft-liquidity-page__reserve-main">
                  <p className="ft-card-title-top">
                    {content.sections.reservePath.primaryCard.eyebrow}
                  </p>
                  <h3 className="ft-card-title">
                    {content.sections.reservePath.primaryCard.title}
                  </h3>
                  <p className="ft-text">{content.sections.reservePath.primaryCard.text}</p>
                  {content.sections.reservePath.primaryCard.bullets?.length ? (
                    <ul className="ft-list">
                      {content.sections.reservePath.primaryCard.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}

                  {controllerReserve ? (
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-note">
                        <strong>
                          {formatCompactMetric(controllerReserve.balanceDisplay)} 4TEEN
                        </strong>{" "}
                        currently shown in the reserve snapshot.
                      </p>
                      <LoaderLink
                        className="ft-link"
                        href={controllerReserve.href}
                        rel="noopener noreferrer"
                        showLinkIcon
                        target="_blank"
                      >
                        <span title={controllerReserve.address}>
                          {shortenAddress(controllerReserve.address)}
                        </span>
                      </LoaderLink>
                    </div>
                  ) : null}
                </article>

                <div className="ft-liquidity-page__reserve-side">
                  {content.sections.reservePath.secondaryCards.map((card, index) => {
                    const reserve = executorReserves[index];

                    return (
                      <article
                        key={card.key}
                        className={`ft-card ft-card--plain ft-liquidity-page__detail-card ${
                          index === 0 ? "ft-card--warning" : "ft-card--negative"
                        }`}
                      >
                        <p className="ft-card-title-top">{card.title}</p>
                        <h3 className="ft-card-title">
                          {reserve
                            ? `${formatCompactMetric(reserve.balanceDisplay)} 4TEEN`
                            : card.title}
                        </h3>
                        <p className="ft-text">{card.body}</p>
                        {reserve ? (
                          <LoaderLink
                            className="ft-link"
                            href={reserve.href}
                            rel="noopener noreferrer"
                            showLinkIcon
                            target="_blank"
                          >
                            <span title={reserve.address}>
                              {shortenAddress(reserve.address)}
                            </span>
                          </LoaderLink>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>

              <p className="ft-note">{content.sections.reservePath.note}</p>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-liquidity-page__section-grid">
            <article className="ft-card ft-liquidity-page__panel">
              <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                </div>

                <p className="ft-text">{content.sections.verification.body}</p>

                <div className="ft-links">
                  <LoaderLink
                    className="ft-link"
                    href={liquidityVerificationLinks.controller}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    {content.sections.verification.labels.controller}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={liquidityVerificationLinks.bootstrapper}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    {content.sections.verification.labels.bootstrapper}
                  </LoaderLink>
                  {snapshot?.reserves[1]?.href ? (
                    <LoaderLink
                      className="ft-link"
                      href={snapshot.reserves[1].href}
                      rel="noopener noreferrer"
                      showLinkIcon
                      target="_blank"
                    >
                      {content.sections.verification.labels.justMoney}
                    </LoaderLink>
                  ) : null}
                  {snapshot?.reserves[2]?.href ? (
                    <LoaderLink
                      className="ft-link"
                      href={snapshot.reserves[2].href}
                      rel="noopener noreferrer"
                      showLinkIcon
                      target="_blank"
                    >
                      {content.sections.verification.labels.sunV3}
                    </LoaderLink>
                  ) : null}
                  <LoaderLink
                    className="ft-link"
                    href={officialContractsRepoUrl}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    {content.sections.verification.labels.contractsRepo}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={officialWalletRepoUrl}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    {content.sections.verification.labels.walletRepo}
                  </LoaderLink>
                </div>
              </div>
            </article>

            <article className="ft-card ft-liquidity-page__cta-panel">
              <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.cta.eyebrow}</p>
                  <h2 className="ft-subtitle">
                    {renderCtaTitle(content.sections.cta.title)}
                  </h2>
                </div>

                <p className="ft-text">{content.sections.cta.body}</p>

                <div className="ft-actions ft-actions--stack-mobile">
                  <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                    {content.sections.cta.openApp}
                  </LoaderLink>
                  <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">
                    {content.sections.cta.openBuy}
                  </LoaderLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function LiquidityPage() {
  return <LiquidityPageView />;
}
