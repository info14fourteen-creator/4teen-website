import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { getLiquidityPageContent } from "@/content/liquidity-content";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import { getDeferredLiveSnapshot } from "@/lib/deferred-live-snapshot";
import { defaultSiteLocale } from "@/lib/site-locale";
import { formatUtcDate } from "@/lib/site-intl";
import {
  type LiveLiquiditySnapshot,
  liquidityVerificationLinks,
} from "@/lib/liquidity-live";

const metadataContent = getLiquidityPageContent(defaultSiteLocale);

export const metadata: Metadata = metadataContent.metadata;

export default async function LiquidityPage() {
  const locale = defaultSiteLocale;
  const content = getLiquidityPageContent(locale);
  const snapshot = getDeferredLiveSnapshot<LiveLiquiditySnapshot>();
  const errorText =
    "The page shell is prioritized right now while the live liquidity snapshot is moved off server render.";

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-liquidity-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                <span className="ft-status-pill live">{content.hero.status}</span>
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">{content.hero.title}</h1>
                <p className="ft-lead">{content.hero.lead}</p>
              </div>

              {snapshot ? (
                <div className="ft-grid ft-grid--4 ft-liquidity-page__hero-stats">
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.controllerBalance}</p>
                    <p className="ft-price-main">{snapshot.controllerBalanceDisplay} TRX</p>
                    <p className="ft-price-sub">{content.hero.stats.controllerBalanceMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.nextRelease}</p>
                    <p className="ft-price-main">{snapshot.nextReleaseDisplay} TRX</p>
                    <p className="ft-price-sub">{content.hero.stats.nextReleaseMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.vaultReserve}</p>
                    <p className="ft-price-main">{snapshot.fourteenvaultBalanceDisplay}</p>
                    <p className="ft-price-sub">{content.hero.stats.vaultReserveMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.windowState}</p>
                    <p className="ft-price-main">
                      {content.hero.states[snapshot.currentWindowState]}
                    </p>
                    <p className="ft-price-sub">{content.hero.stats.windowStateMeta}</p>
                  </article>
                </div>
              ) : (
                <div className="ft-note">
                  <strong>{content.hero.stats.readFailed}</strong>{" "}
                  {errorText || content.hero.stats.readRetry}
                </div>
              )}
            </div>
          </article>

          <article className="ft-card ft-liquidity-page__panel">
            <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.appRoute.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.appRoute.title}</h2>
              </div>

              <p className="ft-text">{content.sections.appRoute.body}</p>

              <ul className="ft-list">
                {content.sections.appRoute.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                  {content.sections.appRoute.openApp}
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">
                  {content.sections.appRoute.openBuy}
                </LoaderLink>
              </div>
            </div>
          </article>

          {snapshot ? (
            <>
              <div className="ft-grid ft-grid--2-even ft-liquidity-page__section-grid">
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
                            <strong>{snapshot.controllerBalanceDisplay} TRX</strong>
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveState.rows.latestFunding}</th>
                          <td className="ft-right">{snapshot.latestFundingDisplay} TRX</td>
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
                          <td className="ft-right">{snapshot.minBalanceDisplay} TRX</td>
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
                          <td className="ft-right">
                            {formatUtcDate(snapshot.loadedAt, locale)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.sections.liveState.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-liquidity-page__panel">
                  <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.triggerModel.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.triggerModel.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--3 ft-liquidity-page__trigger-grid">
                      {content.sections.triggerModel.cards.map((card) => (
                        <article
                          key={card.title}
                          className="ft-card ft-card--plain ft-liquidity-page__detail-card"
                        >
                          <p className="ft-card-title-top">{card.eyebrow}</p>
                          <h3 className="ft-card-title">{card.title}</h3>
                          <p className="ft-text">{card.text}</p>
                        </article>
                      ))}
                    </div>

                    <p className="ft-note">{content.sections.triggerModel.note}</p>
                  </div>
                </article>
              </div>

              <article className="ft-card ft-liquidity-page__panel">
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
                            <strong>{operation.totalTrxDisplay} TRX</strong>
                          </div>

                          <div className="ft-liquidity-page__latest-cell">
                            <span className="ft-liquidity-page__latest-label">
                              {content.sections.latestExecutions.headers.split}
                            </span>
                            <div className="ft-stack ft-stack--xs">
                              <span>JM {operation.justMoneyTrxDisplay} TRX</span>
                              <span>SUN {operation.sunV3TrxDisplay} TRX</span>
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
                            <a
                              className="ft-link"
                              href={operation.txUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {content.sections.latestExecutions.openTx}
                            </a>
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

              <div className="ft-grid ft-grid--2-even ft-liquidity-page__section-grid">
                <article className="ft-card ft-liquidity-page__panel">
                  <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.reserveLayer.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.reserveLayer.title}</h2>
                    </div>

                    <p className="ft-text">{content.sections.reserveLayer.body}</p>

                    <div className="ft-grid ft-grid--3 ft-liquidity-page__executor-grid">
                      {snapshot.reserves.map((reserve, index) => (
                        <article
                          key={reserve.address}
                          className="ft-card ft-card--plain ft-liquidity-page__detail-card"
                        >
                          <p className="ft-card-title-top">
                            {content.sections.reserveLayer.cards[index]?.title ?? reserve.title}
                          </p>
                          <h3 className="ft-card-title">{reserve.balanceDisplay}</h3>
                          <p className="ft-text">
                            {content.sections.reserveLayer.cards[index]?.body ?? reserve.role}
                          </p>
                          <a
                            className="ft-link"
                            href={reserve.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {reserve.address}
                          </a>
                        </article>
                      ))}
                    </div>

                    <p className="ft-note">{content.sections.reserveLayer.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-liquidity-page__panel">
                  <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                    </div>

                    <p className="ft-text">{content.sections.verification.body}</p>

                    <div className="ft-links">
                      <a
                        className="ft-link"
                        href={liquidityVerificationLinks.controller}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.labels.controller}
                      </a>
                      <a
                        className="ft-link"
                        href={liquidityVerificationLinks.bootstrapper}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.labels.bootstrapper}
                      </a>
                      <a
                        className="ft-link"
                        href={snapshot.reserves[1]?.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.labels.justMoney}
                      </a>
                      <a
                        className="ft-link"
                        href={snapshot.reserves[2]?.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.labels.sunV3}
                      </a>
                      <a
                        className="ft-link"
                        href={officialContractsRepoUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.labels.contractsRepo}
                      </a>
                      <a
                        className="ft-link"
                        href={officialWalletRepoUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.labels.walletRepo}
                      </a>
                    </div>
                  </div>
                </article>
              </div>

              <article className="ft-card ft-liquidity-page__cta-panel">
                <div className="ft-stack ft-stack--md ft-liquidity-page__panel-stack">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.sections.cta.eyebrow}</p>
                    <h2 className="ft-subtitle">{content.sections.cta.title}</h2>
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
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
