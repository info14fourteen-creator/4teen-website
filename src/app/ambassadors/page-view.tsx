import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { ProgressiveAnimatedMedia } from "@/components/site/progressive-animated-media";
import { LoaderLink } from "@/components/site/loader-link";
import { SignalPoints } from "@/components/site/signal-points";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { getAmbassadorsPageContent } from "@/content/ambassadors-content";
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
import type { LiveAmbassadorSnapshot } from "@/lib/site-snapshot-types";

const AMBASSADOR_CONTROLLER_SCAN_FALLBACK =
  "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ";
const AMBASSADOR_HERO_POSTER_SRC = "/media/ambassador-cabinet-demo.png";
const AMBASSADOR_HERO_MEDIA_SRC = "/media/ambassador-cabinet-demo.gif";
const AMBASSADOR_HERO_MEDIA_ALT =
  "4TEEN ambassador cabinet mobile wallet preview";
const AMBASSADOR_REGISTRATION_POSTER_SRC =
  "/media/ambassador-registration-demo.png";
const AMBASSADOR_REGISTRATION_MEDIA_SRC =
  "/media/ambassador-registration-demo.gif";
const AMBASSADOR_REGISTRATION_MEDIA_ALT =
  "4TEEN ambassador registration mobile wallet preview";

export function getAmbassadorsPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getAmbassadorsPageContent(locale).metadata;
  return buildPageMetadata({
    ...metadata,
    locale,
    pathname: "/ambassadors",
    socialImages: [
      {
        url: AMBASSADOR_HERO_POSTER_SRC,
        alt: AMBASSADOR_HERO_MEDIA_ALT,
      },
    ],
  });
}

export const metadata: Metadata = getAmbassadorsPageMetadata();

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

function renderCabinetRouteTitle(text: string) {
  if (text === "The public page is not the cabinet. It proves the cabinet exists.") {
    return (
      <>
        The <span className="ft-meta-green">public page</span> is not the{" "}
        <span className="ft-accent">cabinet</span>. It proves the cabinet exists.
      </>
    );
  }

  return text;
}

function renderRegistrationTitle(text: string) {
  if (text === "Registration starts in the wallet, then becomes an on-chain profile.") {
    return (
      <>
        <span className="ft-meta-green">Registration</span> starts in the wallet,
        then becomes an <span className="ft-accent">on-chain profile</span>.
      </>
    );
  }

  return text;
}

function renderRuntimeTitle(text: string) {
  if (text === "If resources are low, rows wait instead of pretending they cleared.") {
    return (
      <>
        If resources are low, rows wait instead of{" "}
        <span className="ft-meta-red">pretending they cleared</span>.
      </>
    );
  }

  return text;
}

function renderLevelsTitle(text: string) {
  if (text === "Buyer growth changes the reward share.") {
    return (
      <>
        <span className="ft-meta-green">Buyer growth</span> changes the{" "}
        <span className="ft-accent">reward share</span>.
      </>
    );
  }

  return text;
}

function getControllerHref(snapshot: LiveAmbassadorSnapshot | null) {
  const contractAddress = snapshot?.contractAddress?.trim();
  return contractAddress
    ? `https://tronscan.org/#/contract/${contractAddress}`
    : AMBASSADOR_CONTROLLER_SCAN_FALLBACK;
}

export async function AmbassadorsPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getAmbassadorsPageContent(locale);
  const snapshot =
    await getServerSiteSnapshot<LiveAmbassadorSnapshot>("ambassador");
  const heroSignals = content.hero.rotatingLines ?? [];
  const snapshotUnavailable = (
    <div className="ft-note">
      <strong>{content.hero.stats.readFailed}</strong> {content.hero.stats.readRetry}
    </div>
  );

  const heroStats = snapshot ? (
    <>
      <article className="ft-price-card ft-price-card--positive">
        <p className="ft-price-label">{content.hero.stats.profilesOnChain.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.db.profilesOnChain)}
        </p>
        <p className="ft-price-sub">{content.hero.stats.profilesOnChain.meta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.boundBuyers.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.system.boundBuyersCount)}
        </p>
        <p className="ft-price-sub">{content.hero.stats.boundBuyers.meta}</p>
      </article>
      <article className="ft-price-card ft-price-card--positive">
        <p className="ft-price-label">{content.hero.stats.rewardsClaimed.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.system.rewardsClaimedDisplay)} TRX
        </p>
        <p className="ft-price-sub">{content.hero.stats.rewardsClaimed.meta}</p>
      </article>
      <article
        className={`ft-price-card ${
          snapshot.db.purchasesPending > 0
            ? "ft-price-card--warning"
            : "ft-price-card--positive"
        }`}
      >
        <p className="ft-price-label">{content.hero.stats.pendingReplay.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.db.purchasesPending)}
        </p>
        <p className="ft-price-sub">{content.hero.stats.pendingReplay.meta}</p>
      </article>
    </>
  ) : null;

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-ambassador-page">
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
                    <SiteSnapshotRefresh snapshotKeys={["ambassador"]} />
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
                    <div className="ft-grid ft-buy-page__hero-stats ft-ambassador-page__hero-stats--desktop">
                      {heroStats}
                    </div>
                  ) : (
                    snapshotUnavailable
                  )}
                </div>

                <div className="ft-buy-page__hero-side">
                  <div className="ft-stack ft-stack--md ft-buy-page__hero-side-inner">
                    <div className="ft-buy-page__hero-media">
                      <ProgressiveAnimatedMedia
                        alt={AMBASSADOR_HERO_MEDIA_ALT}
                        animatedSrc={AMBASSADOR_HERO_MEDIA_SRC}
                        className="ft-buy-page__hero-media-frame"
                        height={2220}
                        imageClassName="ft-buy-page__hero-media-image"
                        posterSrc={AMBASSADOR_HERO_POSTER_SRC}
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
                        href="#ambassador-registration"
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
                <div className="ft-grid ft-buy-page__hero-stats ft-ambassador-page__hero-stats--mobile">
                  {heroStats}
                </div>
              ) : null}
            </div>
          </article>

          <article className="ft-card ft-ambassador-page__panel">
            <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.cabinetRoute.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderCabinetRouteTitle(content.sections.cabinetRoute.title)}
                </h2>
              </div>

              <p className="ft-text">{content.sections.cabinetRoute.intro}</p>

              <div className="ft-ambassador-page__story-grid">
                <article className="ft-card ft-card--plain ft-ambassador-page__story-main">
                  <p className="ft-card-title-top">
                    {content.sections.cabinetRoute.mainCard.eyebrow}
                  </p>
                  <h3 className="ft-card-title">
                    {content.sections.cabinetRoute.mainCard.title}
                  </h3>
                  <p className="ft-text">{content.sections.cabinetRoute.mainCard.text}</p>
                  {content.sections.cabinetRoute.mainCard.bullets?.length ? (
                    <ul className="ft-list">
                      {content.sections.cabinetRoute.mainCard.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>

                <div className="ft-ambassador-page__story-stack">
                  {content.sections.cabinetRoute.cards.map((card) => (
                    <article
                      key={card.title}
                      className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                    >
                      <p className="ft-card-title-top">{card.eyebrow}</p>
                      <h3 className="ft-card-title">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <p className="ft-note">{content.sections.cabinetRoute.note}</p>
            </div>
          </article>

          <article
            id="ambassador-registration"
            className="ft-card ft-ambassador-page__panel"
          >
            <div className="ft-grid ft-grid--2-even ft-ambassador-page__registration-grid">
              <div className="ft-ambassador-page__registration-media-shell">
                <div className="ft-ambassador-page__registration-media">
                  <ProgressiveAnimatedMedia
                    alt={AMBASSADOR_REGISTRATION_MEDIA_ALT}
                    animatedSrc={AMBASSADOR_REGISTRATION_MEDIA_SRC}
                    className="ft-buy-page__hero-media-frame"
                    height={2220}
                    imageClassName="ft-buy-page__hero-media-image"
                    posterSrc={AMBASSADOR_REGISTRATION_POSTER_SRC}
                    priority
                    width={1080}
                  />
                </div>
              </div>

              <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.registration.eyebrow}</p>
                  <h2 className="ft-subtitle">
                    {renderRegistrationTitle(content.sections.registration.title)}
                  </h2>
                </div>

                <p className="ft-text">{content.sections.registration.intro}</p>

                <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                  <p className="ft-card-title-top">
                    {content.sections.registration.mainCard.eyebrow}
                  </p>
                  <h3 className="ft-card-title">
                    {content.sections.registration.mainCard.title}
                  </h3>
                  <p className="ft-text">{content.sections.registration.mainCard.text}</p>
                  {content.sections.registration.mainCard.bullets?.length ? (
                    <ul className="ft-list">
                      {content.sections.registration.mainCard.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>

                <div className="ft-grid ft-grid--2-even ft-ambassador-page__summary-grid">
                  {content.sections.registration.cards.map((card) => (
                    <article
                      key={card.title}
                      className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                    >
                      <p className="ft-card-title-top">{card.eyebrow}</p>
                      <h3 className="ft-card-title">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </article>
                  ))}
                </div>

                <p className="ft-note">{content.sections.registration.note}</p>
              </div>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
            <article className="ft-card ft-ambassador-page__panel">
              <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.ledger.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.ledger.title}</h2>
                </div>

                {snapshot ? (
                  <table className="ft-mini-table ft-ambassador-page__mini-table">
                    <tbody>
                      <tr>
                        <th>{content.sections.ledger.rows.totalAmbassadors}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.ambassadorsCount)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.activeAmbassadors}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.activeAmbassadorsCount)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.boundBuyers}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.boundBuyersCount)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.trackedVolume}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.trackedVolumeDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.rewardsAccrued}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.rewardsAccruedDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.rewardsClaimed}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.rewardsClaimedDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.reservedRewards}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.reservedRewardsDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.ownerAvailable}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.ownerAvailableBalanceDisplay)} TRX
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.ledger.rows.unallocatedFunds}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.system.unallocatedPurchaseFundsDisplay)} TRX
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  snapshotUnavailable
                )}

                <p className="ft-note">{content.sections.ledger.note}</p>
              </div>
            </article>

            <article className="ft-card ft-ambassador-page__panel">
              <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.runtime.eyebrow}</p>
                  <h2 className="ft-subtitle">
                    {renderRuntimeTitle(content.sections.runtime.title)}
                  </h2>
                </div>

                {snapshot ? (
                  <table className="ft-mini-table ft-ambassador-page__mini-table">
                    <tbody>
                      <tr>
                        <th>{content.sections.runtime.rows.operatorWallet}</th>
                        <td className="ft-right">
                          {snapshot.runtime.operatorWallet
                            ? shortenAddress(snapshot.runtime.operatorWallet)
                            : "—"}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.readyNow}</th>
                        <td className="ft-right">
                          {snapshot.runtime.readyNow
                            ? content.sections.runtime.readyYes
                            : content.sections.runtime.readyNo}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.profilesOnChain}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.db.profilesOnChain)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.profilesActive}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.db.profilesActive)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.pendingReplay}</th>
                        <td className="ft-right">
                          {formatCompactMetric(snapshot.db.purchasesPending)}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.lastPurchaseSeen}</th>
                        <td className="ft-right">{snapshot.db.latestPurchaseLabel}</td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.lastWithdrawalSeen}</th>
                        <td className="ft-right">{snapshot.db.latestWithdrawalLabel}</td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.energyAvailable}</th>
                        <td className="ft-right">
                          {formatCompactMetric(
                            snapshot.runtime.resourceState?.energyAvailable ??
                              snapshot.runtime.resources?.energyAvailable ??
                              0,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.bandwidthAvailable}</th>
                        <td className="ft-right">
                          {formatCompactMetric(
                            snapshot.runtime.resourceState?.bandwidthAvailable ??
                              snapshot.runtime.resources?.bandwidthAvailable ??
                              0,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.needPerAllocation}</th>
                        <td className="ft-right">
                          {snapshot.runtime.requirements.requiredEnergy} energy /{" "}
                          {snapshot.runtime.requirements.requiredBandwidth} bandwidth
                        </td>
                      </tr>
                      <tr>
                        <th>{content.sections.runtime.rows.safeFloorAfterRun}</th>
                        <td className="ft-right">
                          {snapshot.runtime.requirements.minEnergyFloor} energy /{" "}
                          {snapshot.runtime.requirements.minBandwidthFloor} bandwidth
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  snapshotUnavailable
                )}

                <p className="ft-note">{content.sections.runtime.note}</p>
              </div>
            </article>
          </div>

          <article className="ft-card ft-ambassador-page__panel">
            <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.levels.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderLevelsTitle(content.sections.levels.title)}
                </h2>
              </div>

              {snapshot ? (
                <div className="ft-grid ft-grid--4 ft-ambassador-page__levels-grid">
                  {snapshot.levels.map((level) => (
                    <article
                      key={level.key}
                      className="ft-card ft-card--plain ft-ambassador-page__level-card"
                    >
                      <p className="ft-card-title-top">{level.buyersRange}</p>
                      <h3 className="ft-card-title">{level.label}</h3>
                      <p className="ft-text">
                        {formatCompactMetric(level.rewardPercent)}
                        {content.sections.levels.suffix}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                snapshotUnavailable
              )}
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-ambassador-page__section-grid">
            <article className="ft-card ft-ambassador-page__panel">
              <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.proof.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.proof.title}</h2>
                </div>

                {snapshot ? (
                  <div className="ft-grid ft-grid--2-even ft-ambassador-page__summary-grid">
                    <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                      <p className="ft-card-title-top">
                        {content.sections.proof.cards.recordedPurchases.title}
                      </p>
                      <h3 className="ft-card-title">
                        {formatCompactMetric(snapshot.db.purchasesTotal)}
                      </h3>
                      <p className="ft-text">
                        {content.sections.proof.cards.recordedPurchases.text}
                      </p>
                    </article>
                    <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                      <p className="ft-card-title-top">
                        {content.sections.proof.cards.ambassadorsWithPurchases.title}
                      </p>
                      <h3 className="ft-card-title">
                        {formatCompactMetric(snapshot.db.ambassadorsWithPurchases)}
                      </h3>
                      <p className="ft-text">
                        {content.sections.proof.cards.ambassadorsWithPurchases.text}
                      </p>
                    </article>
                    <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                      <p className="ft-card-title-top">
                        {content.sections.proof.cards.withdrawals.title}
                      </p>
                      <h3 className="ft-card-title">
                        {formatCompactMetric(snapshot.db.withdrawalsCount)}
                      </h3>
                      <p className="ft-text">
                        {content.sections.proof.cards.withdrawals.text}
                      </p>
                    </article>
                    <article className="ft-card ft-card--plain ft-ambassador-page__detail-card">
                      <p className="ft-card-title-top">
                        {content.sections.proof.cards.latestWithdrawal.title}
                      </p>
                      <h3 className="ft-card-title ft-ambassador-page__timestamp-card">
                        {snapshot.db.latestWithdrawalLabel}
                      </h3>
                      <p className="ft-text">
                        {content.sections.proof.cards.latestWithdrawal.text}
                      </p>
                    </article>
                  </div>
                ) : (
                  snapshotUnavailable
                )}

                <p className="ft-note">{content.sections.proof.note}</p>
              </div>
            </article>

            <article className="ft-card ft-ambassador-page__panel">
              <div className="ft-stack ft-stack--md ft-ambassador-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.route.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.route.title}</h2>
                </div>

                <div className="ft-grid ft-grid--3 ft-ambassador-page__route-grid">
                  <LoaderLink
                    className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                    href={getControllerHref(snapshot)}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    <p className="ft-card-title-top">
                      {content.sections.route.cards.contract.eyebrow}
                    </p>
                    <h3 className="ft-card-title">
                      {content.sections.route.cards.contract.title}
                    </h3>
                    <p className="ft-text">{content.sections.route.cards.contract.text}</p>
                  </LoaderLink>

                  <LoaderLink
                    className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                    href={officialWalletRepoUrl}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    <p className="ft-card-title-top">
                      {content.sections.route.cards.walletRepo.eyebrow}
                    </p>
                    <h3 className="ft-card-title">
                      {content.sections.route.cards.walletRepo.title}
                    </h3>
                    <p className="ft-text">
                      {content.sections.route.cards.walletRepo.text}
                    </p>
                  </LoaderLink>

                  <LoaderLink
                    className="ft-card ft-card--plain ft-ambassador-page__detail-card"
                    href="/app"
                  >
                    <p className="ft-card-title-top">
                      {content.sections.route.cards.app.eyebrow}
                    </p>
                    <h3 className="ft-card-title">
                      {content.sections.route.cards.app.title}
                    </h3>
                    <p className="ft-text">{content.sections.route.cards.app.text}</p>
                  </LoaderLink>
                </div>

                <p className="ft-note">
                  {content.sections.route.updatedPrefix}{" "}
                  {snapshot ? formatUtcDate(snapshot.loadedAt, locale) : "—"}.
                </p>
                <p className="ft-note">
                  <LoaderLink
                    className="ft-ambassador-page__repo-link"
                    href={officialContractsRepoUrl}
                    rel="noopener noreferrer"
                    showLinkIcon
                    target="_blank"
                  >
                    Open contracts repo
                  </LoaderLink>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function AmbassadorsPage() {
  return <AmbassadorsPageView />;
}
