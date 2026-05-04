import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { getUnlockPageContent } from "@/content/unlock-content";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import { getServerSiteSnapshot } from "@/lib/server-site-snapshot";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";
import { formatCompactMetric, shortenAddress } from "@/lib/site-format";
import {
  type LiveUnlockSnapshot,
  unlockVerificationLinks,
} from "@/lib/site-snapshot-types";
import { formatUtcDate } from "@/lib/site-intl";

export function getUnlockPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getUnlockPageContent(locale).metadata;
  return buildPageMetadata({ ...metadata, locale, pathname: "/unlock" });
}

export const metadata: Metadata = getUnlockPageMetadata();

export async function UnlockPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getUnlockPageContent(locale);
  const snapshot = await getServerSiteSnapshot<LiveUnlockSnapshot>("unlock");

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-unlock-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                <span className="ft-status-pill live">{content.hero.status}</span>
                <SiteSnapshotRefresh snapshotKeys={["unlock"]} />
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">{content.hero.title}</h1>
                <p className="ft-lead">{content.hero.lead}</p>
              </div>

              {snapshot ? (
                <div className="ft-grid ft-grid--4 ft-unlock-page__hero-stats">
                  <article className="ft-price-card ft-price-card--negative">
                    <p className="ft-price-label">{content.hero.stats.totalSupply}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.totalSupplyDisplay)}</p>
                    <p className="ft-price-sub">{content.hero.stats.totalSupplyMeta}</p>
                  </article>
                  <article className="ft-price-card ft-price-card--positive">
                    <p className="ft-price-label">{content.hero.stats.lockedNow}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.currentlyLockedDisplay)}</p>
                    <p className="ft-price-sub">{content.hero.stats.lockedNowMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.vaultCustody}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.vaultCustodyDisplay)}</p>
                    <p className="ft-price-sub">{content.hero.stats.vaultCustodyMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.circulatingNow}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.freelyCirculatingDisplay)}</p>
                    <p className="ft-price-sub">{content.hero.stats.circulatingNowMeta}</p>
                  </article>
                </div>
              ) : (
                <div className="ft-note">
                  <strong>{content.hero.stats.readFailed}</strong>{" "}
                  {content.hero.stats.readRetry}
                </div>
              )}
            </div>
          </article>

          <article className="ft-card ft-unlock-page__panel">
            <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.unlockContext.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.unlockContext.title}</h2>
              </div>

              <p className="ft-text">{content.sections.unlockContext.body}</p>

              <ul className="ft-list">
                {content.sections.unlockContext.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                  {content.sections.unlockContext.openApp}
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">
                  {content.sections.unlockContext.openBuy}
                </LoaderLink>
              </div>
            </div>
          </article>

          {snapshot ? (
            <>
              <div className="ft-grid ft-grid--2-even ft-unlock-page__section-grid">
                <article className="ft-card ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.liveLockMap.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.liveLockMap.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-unlock-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.totalSupply}</th>
                          <td className="ft-right">
                            <strong>{formatCompactMetric(snapshot.totalSupplyDisplay)} 4TEEN</strong>
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.activeLockBatches}</th>
                          <td className="ft-right">{snapshot.activeLockBatches}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.currentlyLocked}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.currentlyLockedDisplay)} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.vaultCustody}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.vaultCustodyDisplay)} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.freelyCirculating}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.freelyCirculatingDisplay)} 4TEEN</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.nextUnlock}</th>
                          <td className="ft-right">
                            {snapshot.nextUnlockAt > 0
                              ? formatUtcDate(snapshot.nextUnlockAt, locale)
                              : "—"}
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.snapshotUpdated}</th>
                          <td className="ft-right">{formatUtcDate(snapshot.loadedAt, locale)}</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.sections.liveLockMap.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.vaultLayer.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.vaultLayer.title}</h2>
                    </div>

                    <p className="ft-text">{content.sections.vaultLayer.body}</p>

                    <div className="ft-grid ft-grid--3 ft-unlock-page__vault-grid">
                      {snapshot.vaults.map((vault) => (
                        <article
                          key={vault.address}
                          className="ft-card ft-card--plain ft-unlock-page__detail-card"
                        >
                          <p className="ft-card-title-top">{vault.title}</p>
                          <h3 className="ft-card-title">{formatCompactMetric(vault.balanceDisplay)}</h3>
                          <p className="ft-text">{vault.role}</p>
                          <LoaderLink
                            className="ft-link"
                            href={vault.href}
                            showLinkIcon
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span title={vault.address}>{shortenAddress(vault.address)}</span>
                          </LoaderLink>
                        </article>
                      ))}
                    </div>

                    <p className="ft-note">{content.sections.vaultLayer.note}</p>
                  </div>
                </article>
              </div>

              <article className="ft-card ft-unlock-page__panel">
                <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.sections.upcomingUnlocks.eyebrow}</p>
                    <h2 className="ft-subtitle">{content.sections.upcomingUnlocks.title}</h2>
                  </div>

                  {snapshot.unlockBatches.length > 0 ? (
                    <div className="ft-unlock-page__latest-list" role="table">
                      <div className="ft-unlock-page__latest-head" role="row">
                        <span>{content.sections.upcomingUnlocks.headers.buyer}</span>
                        <span>{content.sections.upcomingUnlocks.headers.amount}</span>
                        <span>{content.sections.upcomingUnlocks.headers.unlockAt}</span>
                        <span>{content.sections.upcomingUnlocks.headers.source}</span>
                      </div>

                      {snapshot.unlockBatches.map((batch) => (
                        <div key={batch.txId} className="ft-unlock-page__latest-row" role="row">
                          <div className="ft-unlock-page__latest-cell">
                            <span className="ft-unlock-page__latest-label">
                              {content.sections.upcomingUnlocks.headers.buyer}
                            </span>
                            <strong title={batch.buyerAddress}>{batch.buyerShort}</strong>
                          </div>

                          <div className="ft-unlock-page__latest-cell">
                            <span className="ft-unlock-page__latest-label">
                              {content.sections.upcomingUnlocks.headers.amount}
                            </span>
                            <strong>{formatCompactMetric(batch.amountDisplay)} 4TEEN</strong>
                          </div>

                          <div className="ft-unlock-page__latest-cell">
                            <span className="ft-unlock-page__latest-label">
                              {content.sections.upcomingUnlocks.headers.unlockAt}
                            </span>
                            <span>{formatUtcDate(batch.unlockAt, locale)}</span>
                          </div>

                          <div className="ft-unlock-page__latest-cell ft-unlock-page__latest-cell--action">
                            <span className="ft-unlock-page__latest-label">
                              {content.sections.upcomingUnlocks.headers.source}
                            </span>
                            <LoaderLink
                              className="ft-link"
                              href={batch.txUrl}
                              showLinkIcon
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {content.sections.upcomingUnlocks.openTx}
                            </LoaderLink>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="ft-note">{content.sections.upcomingUnlocks.empty}</p>
                  )}

                  <p className="ft-note">{content.sections.upcomingUnlocks.note}</p>
                </div>
              </article>

              <div className="ft-grid ft-grid--2-even ft-unlock-page__section-grid">
                <article className="ft-card ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.lockMechanics.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.lockMechanics.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--3 ft-unlock-page__detail-grid">
                      {content.sections.lockMechanics.cards.map((card) => (
                        <article
                          key={card.title}
                          className="ft-card ft-card--plain ft-unlock-page__detail-card"
                        >
                          <p className="ft-card-title-top">{card.eyebrow}</p>
                          <h3 className="ft-card-title">{card.title}</h3>
                          <p className="ft-text">{card.text}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="ft-card ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.walletRoute.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.walletRoute.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--3 ft-unlock-page__detail-grid">
                      {content.sections.walletRoute.cards.map((card) => (
                        <article
                          key={card.title}
                          className="ft-card ft-card--plain ft-unlock-page__detail-card"
                        >
                          <p className="ft-card-title-top">{card.eyebrow}</p>
                          <h3 className="ft-card-title">{card.title}</h3>
                          <p className="ft-text">{card.text}</p>
                        </article>
                      ))}
                    </div>

                    <p className="ft-note">{content.sections.walletRoute.note}</p>
                  </div>
                </article>
              </div>

              <div className="ft-grid ft-grid--2-even ft-unlock-page__section-grid">
                <article className="ft-card ft-card--plain ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                    </div>

                    <p className="ft-text">{content.sections.verification.body}</p>

                    <div className="ft-links">
                      <LoaderLink
                        className="ft-link"
                        href={unlockVerificationLinks.token}
                        showLinkIcon
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.tokenLabel}
                      </LoaderLink>
                      <LoaderLink
                        className="ft-link"
                        href={unlockVerificationLinks.controller}
                        showLinkIcon
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.controllerLabel}
                      </LoaderLink>
                      <LoaderLink
                        className="ft-link"
                        href={officialContractsRepoUrl}
                        showLinkIcon
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.contractsRepoLabel}
                      </LoaderLink>
                      <LoaderLink
                        className="ft-link"
                        href={officialWalletRepoUrl}
                        showLinkIcon
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {content.sections.verification.walletRepoLabel}
                      </LoaderLink>
                    </div>
                  </div>
                </article>

                <article className="ft-card ft-card--strong ft-unlock-page__cta-panel">
                  <div className="ft-stack ft-stack--lg ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--sm">
                      <p className="ft-overline">{content.sections.cta.eyebrow}</p>
                      <h2 className="ft-title-md">{content.sections.cta.title}</h2>
                      <p className="ft-text">{content.sections.cta.body}</p>
                    </div>

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
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default async function UnlockPage() {
  return <UnlockPageView />;
}
