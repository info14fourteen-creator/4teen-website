import type { Metadata } from "next";

import { getAmbassadorsPageContent } from "@/content/ambassadors-content";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { getServerSiteSnapshot } from "@/lib/server-site-snapshot";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";
import { formatCompactMetric, shortenAddress } from "@/lib/site-format";
import { formatUtcDate } from "@/lib/site-intl";
import type { LiveAmbassadorSnapshot } from "@/lib/site-snapshot-types";

export function getAmbassadorsPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getAmbassadorsPageContent(locale).metadata;
  return buildPageMetadata({ ...metadata, locale, pathname: "/ambassadors" });
}

export const metadata: Metadata = getAmbassadorsPageMetadata();

export async function AmbassadorsPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getAmbassadorsPageContent(locale);
  const snapshot =
    await getServerSiteSnapshot<LiveAmbassadorSnapshot>("ambassador");

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-ambassador-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                <span className="ft-status-pill live">{content.hero.status}</span>
                <SiteSnapshotRefresh snapshotKeys={["ambassador"]} />
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">{content.hero.title}</h1>
                <p className="ft-lead">{content.hero.lead}</p>
              </div>

              {snapshot ? (
                <div className="ft-grid ft-grid--4 ft-ambassador-page__hero-stats">
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.ambassadorsLabel}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.system.ambassadorsCount)}</p>
                    <p className="ft-price-sub">
                      {formatCompactMetric(snapshot.system.activeAmbassadorsCount)} {content.hero.stats.ambassadorsSubtext}
                    </p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.claimedLabel}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.system.rewardsClaimedDisplay)}</p>
                    <p className="ft-price-sub">{content.hero.stats.claimedSubtext}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.purchasesLabel}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.db.purchasesProcessed)}</p>
                    <p className="ft-price-sub">{content.hero.stats.purchasesSubtext}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.buyersLabel}</p>
                    <p className="ft-price-main">{formatCompactMetric(snapshot.system.boundBuyersCount)}</p>
                    <p className="ft-price-sub">{content.hero.stats.buyersSubtext}</p>
                  </article>
                </div>
              ) : (
                <div className="ft-note">
                  <strong>{content.hero.noSnapshotTitle}</strong> {content.hero.noSnapshotText}
                </div>
              )}
            </div>
          </article>

          {snapshot ? (
            <>
              <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.systemCounts.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.systemCounts.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-ambassador-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.systemCounts.rows.totalAmbassadors}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.ambassadorsCount)}</td>
                        </tr>
                        <tr>
                          <th>{content.systemCounts.rows.activeAmbassadors}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.activeAmbassadorsCount)}</td>
                        </tr>
                        <tr>
                          <th>{content.systemCounts.rows.boundBuyers}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.boundBuyersCount)}</td>
                        </tr>
                        <tr>
                          <th>{content.systemCounts.rows.profilesOnChain}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.db.profilesOnChain)}</td>
                        </tr>
                        <tr>
                          <th>{content.systemCounts.rows.profilesActive}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.db.profilesActive)}</td>
                        </tr>
                        <tr>
                          <th>{content.systemCounts.rows.ambassadorsWithPurchases}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.db.ambassadorsWithPurchases)}</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.systemCounts.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.rewardLedger.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.rewardLedger.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-ambassador-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.rewardLedger.rows.trackedVolume}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.trackedVolumeDisplay)} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.rewardLedger.rows.rewardsAccrued}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.rewardsAccruedDisplay)} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.rewardLedger.rows.rewardsClaimed}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.rewardsClaimedDisplay)} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.rewardLedger.rows.reservedRewards}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.reservedRewardsDisplay)} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.rewardLedger.rows.ownerAvailable}</th>
                          <td className="ft-right">{formatCompactMetric(snapshot.system.ownerAvailableBalanceDisplay)} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.rewardLedger.rows.unallocatedFunds}</th>
                          <td className="ft-right">
                            {formatCompactMetric(snapshot.system.unallocatedPurchaseFundsDisplay)} TRX
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">
                      <strong>{content.rewardLedger.noteTitle}:</strong> {content.rewardLedger.noteText}
                    </p>
                  </div>
                </article>
              </div>

              <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.purchaseFootprint.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.purchaseFootprint.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-ambassador-page__summary-grid">
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">{content.purchaseFootprint.cards.recordedPurchases.title}</p>
                        <h3 className="ft-card-title">{formatCompactMetric(snapshot.db.purchasesTotal)}</h3>
                        <p className="ft-text">{content.purchaseFootprint.cards.recordedPurchases.text}</p>
                      </article>
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">{content.purchaseFootprint.cards.pendingReplay.title}</p>
                        <h3 className="ft-card-title">{formatCompactMetric(snapshot.db.purchasesPending)}</h3>
                        <p className="ft-text">{content.purchaseFootprint.cards.pendingReplay.text}</p>
                      </article>
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">{content.purchaseFootprint.cards.withdrawalEvents.title}</p>
                        <h3 className="ft-card-title">{formatCompactMetric(snapshot.db.withdrawalsCount)}</h3>
                        <p className="ft-text">{content.purchaseFootprint.cards.withdrawalEvents.text}</p>
                      </article>
                      <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                        <p className="ft-card-title-top">{content.purchaseFootprint.cards.lastPurchaseSeen.title}</p>
                        <h3 className="ft-card-title ft-ambassador-page__timestamp-card">
                          {snapshot.db.latestPurchaseLabel}
                        </h3>
                        <p className="ft-text">{content.purchaseFootprint.cards.lastPurchaseSeen.text}</p>
                      </article>
                    </div>

                    <p className="ft-note">{content.purchaseFootprint.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.runtime.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.runtime.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-ambassador-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.runtime.rows.operatorWallet}</th>
                          <td className="ft-right">{shortenAddress(snapshot.runtime.operatorWallet)}</td>
                        </tr>
                        <tr>
                          <th>{content.runtime.rows.readyNow}</th>
                          <td className="ft-right">{snapshot.runtime.readyNow ? content.runtime.readyYes : content.runtime.readyNo}</td>
                        </tr>
                        <tr>
                          <th>{content.runtime.rows.energyAvailable}</th>
                          <td className="ft-right">
                            {formatCompactMetric(snapshot.runtime.resourceState?.energyAvailable ??
                              snapshot.runtime.resources?.energyAvailable ??
                              0)}
                          </td>
                        </tr>
                        <tr>
                          <th>{content.runtime.rows.bandwidthAvailable}</th>
                          <td className="ft-right">
                            {formatCompactMetric(snapshot.runtime.resourceState?.bandwidthAvailable ??
                              snapshot.runtime.resources?.bandwidthAvailable ??
                              0)}
                          </td>
                        </tr>
                        <tr>
                          <th>{content.runtime.rows.needPerAllocation}</th>
                          <td className="ft-right">
                            {snapshot.runtime.requirements.requiredEnergy} energy /{" "}
                            {snapshot.runtime.requirements.requiredBandwidth} bandwidth
                          </td>
                        </tr>
                        <tr>
                          <th>{content.runtime.rows.safeFloorAfterRun}</th>
                          <td className="ft-right">
                            {snapshot.runtime.requirements.minEnergyFloor} energy /{" "}
                            {snapshot.runtime.requirements.minBandwidthFloor} bandwidth
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.runtime.note}</p>
                  </div>
                </article>
              </div>

              <article className="ft-card ft-ambassador-page__panel">
                <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.levels.eyebrow}</p>
                    <h2 className="ft-subtitle">{content.levels.title}</h2>
                  </div>

                  <div className="ft-grid ft-grid--4 ft-ambassador-page__levels-grid">
                    {snapshot.levels.map((level) => (
                      <article
                        key={level.key}
                        className="ft-card ft-card--plain ft-ambassador-page__level-card"
                      >
                        <p className="ft-card-title-top">{level.buyersRange}</p>
                        <h3 className="ft-card-title">{level.label}</h3>
                        <p className="ft-text">{formatCompactMetric(level.rewardPercent)}{content.levels.suffix}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </article>

              <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.flow.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.flow.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-ambassador-page__flow-grid">
                      {content.flow.cards.map((item) => (
                        <article
                          key={item.title}
                          className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                        >
                          <p className="ft-card-title-top">{item.eyebrow}</p>
                          <h3 className="ft-card-title">{item.title}</h3>
                          <p className="ft-text">{item.text}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="ft-card ft-ambassador-page__panel">
                  <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.route.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.route.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--2-even ft-ambassador-page__summary-grid">
                      <LoaderLink
                        className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                        href={content.route.actions.contract.href}
                        rel="noopener noreferrer"
                        showLinkIcon
                        target="_blank"
                      >
                        <p className="ft-card-title-top">{content.route.cards.contract.eyebrow}</p>
                        <h3 className="ft-card-title">{content.route.cards.contract.title}</h3>
                        <p className="ft-text">{content.route.cards.contract.text}</p>
                      </LoaderLink>

                      <LoaderLink
                        className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                        href={content.route.actions.app.href}
                      >
                        <p className="ft-card-title-top">{content.route.cards.app.eyebrow}</p>
                        <h3 className="ft-card-title">{content.route.cards.app.title}</h3>
                        <p className="ft-text">{content.route.cards.app.text}</p>
                      </LoaderLink>
                    </div>

                    <p className="ft-note">
                      {content.route.updatedPrefix} {formatUtcDate(snapshot.loadedAt, locale)}.
                    </p>
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

export default async function AmbassadorsPage() {
  return <AmbassadorsPageView />;
}
