import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { getAirdropPageContent } from "@/content/airdrop-content";
import type { LiveAirdropSnapshot } from "@/lib/airdrop-live";
import { getDeferredLiveSnapshot } from "@/lib/deferred-live-snapshot";
import { defaultSiteLocale } from "@/lib/site-locale";
import { formatUtcDate } from "@/lib/site-intl";

const metadataContent = getAirdropPageContent(defaultSiteLocale);

export const metadata: Metadata = metadataContent.metadata;

export const revalidate = 120;

const AIRDROP_VAULT_SCAN_URL =
  "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ";

function shortenAddress(address: string) {
  const safe = String(address || "").trim();
  if (safe.length <= 14) return safe;
  return `${safe.slice(0, 6)}...${safe.slice(-6)}`;
}

export default async function AirdropPage() {
  const locale = defaultSiteLocale;
  const content = getAirdropPageContent(locale);
  const snapshot = getDeferredLiveSnapshot<LiveAirdropSnapshot>();
  const errorText =
    "The page shell is prioritized right now while the live airdrop snapshot is moved off server render.";

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-airdrop-page">
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
                <div className="ft-grid ft-grid--4 ft-airdrop-page__hero-stats">
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.currentWave}</p>
                    <p className="ft-price-main">{content.sections.waveSchedule.waveLabel(snapshot.currentWave + 1)} of 6</p>
                    <p className="ft-price-sub">
                      {snapshot.currentWave + 1 < 6
                        ? `${content.sections.waveSchedule.waveLabel(snapshot.currentWave + 1)} ${content.sections.waveSchedule.unlocked.toLowerCase()}.`
                        : content.hero.stats.completed}
                    </p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.vaultBalance}</p>
                    <p className="ft-price-main">{snapshot.vaultBalanceDisplay}</p>
                    <p className="ft-price-sub">{content.hero.stats.vaultBalanceMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.availableNow}</p>
                    <p className="ft-price-main">{snapshot.availableNowDisplay}</p>
                    <p className="ft-price-sub">{content.hero.stats.availableNowMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.nextWave}</p>
                    <p className="ft-price-main">
                      {snapshot.nextWaveAt > 0
                        ? content.hero.stats.nextWaveValue(snapshot.currentWave)
                        : content.hero.stats.completed}
                    </p>
                    <p className="ft-price-sub">{formatUtcDate(snapshot.nextWaveAt * 1000, locale)}</p>
                  </article>
                </div>
              ) : (
                <div className="ft-note">
                  <strong>{content.hero.stats.readFailed}</strong> {errorText || content.hero.stats.readRetry}
                </div>
              )}
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-airdrop-page__panel">
            <div className="ft-stack ft-stack--md ft-airdrop-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.walletAccess.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.walletAccess.title}</h2>
              </div>

              <p className="ft-text">{content.sections.walletAccess.body}</p>

              <ul className="ft-list">
                {content.sections.walletAccess.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                  {content.sections.walletAccess.openApp}
                </LoaderLink>
                <a
                  className="ft-btn ft-btn--secondary"
                  href={AIRDROP_VAULT_SCAN_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.sections.walletAccess.openVault}
                </a>
              </div>
            </div>
          </article>

          {snapshot ? (
            <>
              <div className="ft-grid ft-grid--2-even ft-airdrop-page__section-grid">
                <article className="ft-card ft-airdrop-page__panel">
                  <div className="ft-stack ft-stack--md ft-airdrop-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.vaultState.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.vaultState.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-airdrop-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.vaultState.rows.totalAllocation}</th>
                          <td className="ft-right">
                            <strong>{snapshot.totalAllocationDisplay} 4TEEN</strong>
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.vaultState.rows.unlockedTotal}</th>
                          <td className="ft-right">{snapshot.unlockedDisplay} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.vaultState.rows.totalDistributed}</th>
                          <td className="ft-right">{snapshot.distributedDisplay} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.vaultState.rows.remainingUnlocked}</th>
                          <td className="ft-right">{snapshot.remainingUnlockedDisplay} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.vaultState.rows.remainingPlanned}</th>
                          <td className="ft-right">{snapshot.remainingPlannedDisplay} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.vaultState.rows.vaultBalance}</th>
                          <td className="ft-right">{snapshot.vaultBalanceDisplay} 4TEEN</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">
                      <strong>{content.sections.vaultState.noteTitle}</strong> <br />
                      {content.sections.vaultState.noteBody}
                    </p>
                  </div>
                </article>

                <article className="ft-card ft-airdrop-page__panel">
                  <div className="ft-stack ft-stack--md ft-airdrop-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.distribution.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.distribution.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-airdrop-page__summary-grid">
                      <article className="ft-card ft-card--plain ft-airdrop-page__metric-card">
                        <p className="ft-card-title-top">{content.sections.distribution.cards.distributed.title}</p>
                        <h3 className="ft-card-title">{snapshot.distributedDisplay}</h3>
                        <p className="ft-text">{content.sections.distribution.cards.distributed.text}</p>
                      </article>

                      <article className="ft-card ft-card--plain ft-airdrop-page__metric-card">
                        <p className="ft-card-title-top">{content.sections.distribution.cards.planned.title}</p>
                        <h3 className="ft-card-title">{snapshot.remainingPlannedDisplay}</h3>
                        <p className="ft-text">{content.sections.distribution.cards.planned.text}</p>
                      </article>

                      <article className="ft-card ft-card--plain ft-airdrop-page__metric-card">
                        <p className="ft-card-title-top">{content.sections.distribution.cards.lastDrop.title}</p>
                        <h3 className="ft-card-title">{snapshot.lastClaimAmountDisplay}</h3>
                        <p className="ft-text">{content.sections.distribution.cards.lastDrop.text}</p>
                      </article>

                      <article className="ft-card ft-card--plain ft-airdrop-page__metric-card">
                        <p className="ft-card-title-top">{content.sections.distribution.cards.unlockedUndistributed.title}</p>
                        <h3 className="ft-card-title">{snapshot.remainingUnlockedDisplay}</h3>
                        <p className="ft-text">{content.sections.distribution.cards.unlockedUndistributed.text}</p>
                      </article>
                    </div>

                    <p className="ft-note">{content.sections.distribution.note}</p>
                  </div>
                </article>
              </div>

              <div className="ft-grid ft-grid--2-even ft-airdrop-page__section-grid">
                <article className="ft-card ft-airdrop-page__panel">
                  <div className="ft-stack ft-stack--md ft-airdrop-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.dateLayer.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.dateLayer.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-airdrop-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.dateLayer.rows.issueDate}</th>
                          <td className="ft-right">{snapshot.issueDateLabel}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.dateLayer.rows.currentWave}</th>
                          <td className="ft-right">{content.sections.waveSchedule.waveLabel(snapshot.currentWave + 1)} of 6</td>
                        </tr>
                        <tr>
                          <th>{content.sections.dateLayer.rows.nextWave}</th>
                          <td className="ft-right">{formatUtcDate(snapshot.nextWaveAt * 1000, locale)}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.dateLayer.rows.lastDrop}</th>
                          <td className="ft-right">{formatUtcDate(snapshot.lastClaimAt, locale)}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.dateLayer.rows.snapshotUpdated}</th>
                          <td className="ft-right">
                            {formatUtcDate(snapshot.loadedAt, locale)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.sections.dateLayer.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-airdrop-page__panel">
                  <div className="ft-stack ft-stack--md ft-airdrop-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.routeModel.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.routeModel.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-airdrop-page__route-grid">
                      {snapshot.platformRoutes.map((route) => {
                        const routeCopy =
                          content.sections.routeModel.routes[route.key] ??
                          content.sections.routeModel.routes.telegram;

                        return (
                        <a
                          key={route.key}
                          className="ft-card ft-card--plain ft-airdrop-page__route-card"
                          href={route.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <p className="ft-card-title-top">
                            {content.sections.routeModel.routeBitsLabel(route.bit)}
                          </p>
                          <h3 className="ft-card-title">{routeCopy.title}</h3>
                          <p className="ft-text">{routeCopy.note}</p>
                          <p className="ft-overline" style={{ marginTop: 14 }}>
                            {route.key === "telegram" ? routeCopy.statusLive : routeCopy.statusSoon}
                          </p>
                        </a>
                      )})}
                    </div>

                    <p className="ft-note">{content.sections.routeModel.note}</p>
                  </div>
                </article>
              </div>

              <article className="ft-card ft-airdrop-page__table-panel">
                <div className="ft-stack ft-stack--md ft-airdrop-page__panel-stack">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.sections.waveSchedule.eyebrow}</p>
                    <h2 className="ft-subtitle">{content.sections.waveSchedule.title}</h2>
                  </div>

                  <div className="ft-table-wrap ft-airdrop-page__table-wrap">
                    <table className="ft-table">
                      <thead>
                        <tr>
                          <th>{content.sections.waveSchedule.headers.wave}</th>
                          <th>{content.sections.waveSchedule.headers.cap}</th>
                          <th>{content.sections.waveSchedule.headers.unlockTime}</th>
                          <th>{content.sections.waveSchedule.headers.status}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {snapshot.waves.map((wave) => (
                          <tr key={wave.number}>
                            <td>
                              <strong>{content.sections.waveSchedule.waveLabel(wave.number)}</strong>
                            </td>
                            <td>{wave.capDisplay} 4TEEN</td>
                            <td>{wave.unlockLabel}</td>
                            <td>
                              <span
                                className={`ft-status-pill ${
                                  wave.status === "current"
                                    ? "live"
                                    : wave.status === "unlocked"
                                      ? "wait"
                                      : "off"
                                }`}
                              >
                                {wave.status === "current"
                                  ? content.sections.waveSchedule.current
                                  : wave.status === "unlocked"
                                    ? content.sections.waveSchedule.unlocked
                                    : content.sections.waveSchedule.upcoming}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>

              <div className="ft-grid ft-grid--2-even ft-placeholder-grid ft-airdrop-page__section-grid">
                <article className="ft-card ft-card--plain ft-airdrop-page__panel">
                  <p className="ft-card-title-top">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-card-title">{content.sections.verification.title}</h2>
                  <p className="ft-text">{content.sections.verification.body}</p>
                  <div className="ft-links" style={{ marginTop: 18 }}>
                    <a className="ft-link" href={AIRDROP_VAULT_SCAN_URL} rel="noopener noreferrer" target="_blank">
                      {content.sections.verification.vaultLabel}: {shortenAddress(snapshot.contractAddress)}
                    </a>
                    <a
                      className="ft-link"
                      href={`https://tronscan.org/#/address/${snapshot.operatorAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {content.sections.verification.operatorLabel}: {shortenAddress(snapshot.operatorAddress)}
                    </a>
                  </div>
                </article>

                <article className="ft-card ft-card--plain ft-airdrop-page__panel">
                  <p className="ft-card-title-top">{content.sections.productContext.eyebrow}</p>
                  <h2 className="ft-card-title">{content.sections.productContext.title}</h2>
                  <ul className="ft-list">
                    {content.sections.productContext.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </>
          ) : (
            <article className="ft-card ft-card--plain">
              <div className="ft-stack ft-stack--sm">
                <p className="ft-overline">{content.sections.fallback.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.fallback.title}</h2>
                <p className="ft-text">{content.sections.fallback.body}</p>
                <div className="ft-actions">
                  <a className="ft-btn ft-btn--secondary" href={AIRDROP_VAULT_SCAN_URL} rel="noopener noreferrer" target="_blank">
                    {content.sections.fallback.openVault}
                  </a>
                  <LoaderLink className="ft-btn ft-btn--ghost" href="/app">
                    {content.sections.fallback.openApp}
                  </LoaderLink>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
