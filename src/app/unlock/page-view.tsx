import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { ProgressiveAnimatedMedia } from "@/components/site/progressive-animated-media";
import { LoaderLink } from "@/components/site/loader-link";
import { SignalPoints } from "@/components/site/signal-points";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { getUnlockPageContent } from "@/content/unlock-content";
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
  type LiveUnlockSnapshot,
  unlockVerificationLinks,
} from "@/lib/site-snapshot-types";

const UNLOCK_HERO_POSTER_SRC = "/media/unlock-demo.png";
const UNLOCK_HERO_MEDIA_SRC = "/media/unlock-demo.png";
const UNLOCK_HERO_MEDIA_ALT = "4TEEN unlock timeline mobile wallet preview";

export function getUnlockPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getUnlockPageContent(locale).metadata;
  return buildPageMetadata({
    ...metadata,
    locale,
    pathname: "/unlock",
    socialImages: [
      {
        url: UNLOCK_HERO_POSTER_SRC,
        alt: UNLOCK_HERO_MEDIA_ALT,
      },
    ],
  });
}

export const metadata: Metadata = getUnlockPageMetadata();

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

function renderUnlockContextTitle(text: string) {
  if (text === "Personal unlock timeline lives inside the mobile wallet") {
    return (
      <>
        <span className="ft-accent">Personal unlock timeline</span> lives inside
        the <span className="ft-meta-green">mobile wallet</span>
      </>
    );
  }

  return text;
}

function renderLiveLockMapTitle(text: string) {
  if (text === "How much 4TEEN is locked and how much is actually liquid") {
    return (
      <>
        How much <span className="ft-accent">4TEEN is locked</span> and how much
        is actually <span className="ft-meta-green">liquid</span>
      </>
    );
  }

  return text;
}

function renderVaultLayerTitle(text: string) {
  if (text === "Reserve custody is not the same as free circulation") {
    return (
      <>
        <span className="ft-accent">Reserve custody</span> is not the same as{" "}
        <span className="ft-meta-green">free circulation</span>
      </>
    );
  }

  return text;
}

function renderWalletRouteTitle(text: string) {
  if (text === "How the app turns this contract state into a usable timeline") {
    return (
      <>
        How the <span className="ft-meta-green">app</span> turns this contract
        state into a usable <span className="ft-accent">timeline</span>
      </>
    );
  }

  return text;
}

function renderCtaTitle(text: string) {
  if (text === "Use the app when you need your personal unlock timeline") {
    return (
      <>
        Use the <span className="ft-meta-green">app</span> when you need your{" "}
        <span className="ft-accent">personal unlock timeline</span>
      </>
    );
  }

  return text;
}

function getVaultCardClass(title: string) {
  if (title === "FourteenVault") {
    return "ft-card ft-card--plain ft-card--positive ft-unlock-page__detail-card";
  }

  if (title === "AirdropVault") {
    return "ft-card ft-card--plain ft-card--warning ft-unlock-page__detail-card";
  }

  if (title === "TeamLockVault") {
    return "ft-card ft-card--plain ft-card--negative ft-unlock-page__detail-card";
  }

  return "ft-card ft-card--plain ft-unlock-page__detail-card";
}

function getMechanicsCardClass(title: string) {
  if (title === "Transfers are blocked by lockedBalanceOf()") {
    return "ft-card ft-card--plain ft-card--negative ft-unlock-page__detail-card";
  }

  if (title === "Direct buy mints first") {
    return "ft-card ft-card--plain ft-card--warning ft-unlock-page__detail-card";
  }

  return "ft-card ft-card--plain ft-card--positive ft-unlock-page__detail-card";
}

function getWalletRouteCardClass(title: string) {
  if (title === "Points the user to the next valid route") {
    return "ft-card ft-card--plain ft-card--positive ft-unlock-page__detail-card";
  }

  if (title === "Builds rows from confirmed BuyTokens events") {
    return "ft-card ft-card--plain ft-card--warning ft-unlock-page__detail-card";
  }

  return "ft-card ft-card--plain ft-unlock-page__detail-card";
}

export async function UnlockPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getUnlockPageContent(locale);
  const [snapshot, marketSnapshot] = await Promise.all([
    getServerSiteSnapshot<LiveUnlockSnapshot>("unlock"),
    getServerSiteSnapshot<{
      direct?: {
        trx?: string;
      };
      updatedAt?: string;
    }>("market-price"),
  ]);

  const directPrice =
    marketSnapshot?.direct?.trx?.trim() || content.hero.stats.priceFallback;
  const directPriceMeta = marketSnapshot?.updatedAt
    ? content.hero.stats.directPriceMeta
    : content.hero.stats.priceUnavailable;
  const heroSignals = content.hero.rotatingLines ?? [];
  const heroStats = snapshot ? (
    <>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.directPrice}</p>
        <p className="ft-price-main">{formatCompactMetric(directPrice)} TRX</p>
        <p className="ft-price-sub">{directPriceMeta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.lockWindow}</p>
        <p className="ft-price-main">{snapshot.lockWindowDays} days</p>
        <p className="ft-price-sub">{content.hero.stats.lockWindowMeta}</p>
      </article>
      <article className="ft-price-card ft-price-card--negative">
        <p className="ft-price-label">{content.hero.stats.lockedNow}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.currentlyLockedDisplay)} 4TEEN
        </p>
        <p className="ft-price-sub">{content.hero.stats.lockedNowMeta}</p>
      </article>
      <article className="ft-price-card ft-price-card--positive">
        <p className="ft-price-label">{content.hero.stats.circulatingNow}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.freelyCirculatingDisplay)} 4TEEN
        </p>
        <p className="ft-price-sub">{content.hero.stats.circulatingNowMeta}</p>
      </article>
    </>
  ) : null;

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-unlock-page">
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
                    <SiteSnapshotRefresh snapshotKeys={["unlock", "market-price"]} />
                  </div>

                  <h1 className="ft-title-lg">{accentizeTitle(content.hero.title)}</h1>

                  {content.hero.subtitle ? (
                    <p className="ft-lead">{content.hero.subtitle}</p>
                  ) : null}

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

                  {heroStats ? (
                    <div className="ft-grid ft-buy-page__hero-stats ft-buy-page__hero-stats--desktop">
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
                        alt={UNLOCK_HERO_MEDIA_ALT}
                        animatedSrc={UNLOCK_HERO_MEDIA_SRC}
                        className="ft-buy-page__hero-media-frame"
                        height={2205}
                        imageClassName="ft-buy-page__hero-media-image"
                        posterSrc={UNLOCK_HERO_POSTER_SRC}
                        priority
                        width={1020}
                      />
                    </div>

                    {(content.hero.primaryCta || content.hero.secondaryCta) && (
                      <div className="ft-actions ft-actions--stack-mobile ft-buy-page__hero-side-actions">
                        {content.hero.primaryCta ? (
                          <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                            {content.hero.primaryCta}
                          </LoaderLink>
                        ) : null}
                        {content.hero.secondaryCta ? (
                          <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">
                            {content.hero.secondaryCta}
                          </LoaderLink>
                        ) : null}
                      </div>
                    )}

                    {content.hero.ctaNote ? (
                      <p className="ft-note ft-buy-page__hero-note ft-buy-page__hero-note--desktop">
                        {content.hero.ctaNote}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {content.hero.ctaNote ? (
                <p className="ft-note ft-buy-page__hero-note ft-buy-page__hero-note--mobile">
                  {content.hero.ctaNote}
                </p>
              ) : null}

              {heroStats ? (
                <div className="ft-grid ft-grid--4 ft-buy-page__hero-stats ft-buy-page__hero-stats--mobile">
                  {heroStats}
                </div>
              ) : null}
            </div>
          </article>

          <article className="ft-card ft-card--warning ft-unlock-page__panel">
            <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.unlockContext.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderUnlockContextTitle(content.sections.unlockContext.title)}
                </h2>
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
                <article className="ft-card ft-card--positive ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.liveLockMap.eyebrow}</p>
                      <h2 className="ft-subtitle">
                        {renderLiveLockMapTitle(content.sections.liveLockMap.title)}
                      </h2>
                    </div>

                    <table className="ft-mini-table ft-unlock-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.totalSupply}</th>
                          <td className="ft-right">
                            <strong>
                              {formatCompactMetric(snapshot.totalSupplyDisplay)} 4TEEN
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.activeLockBatches}</th>
                          <td className="ft-right">{snapshot.activeLockBatches}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.currentlyLocked}</th>
                          <td className="ft-right">
                            {formatCompactMetric(snapshot.currentlyLockedDisplay)} 4TEEN
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.vaultCustody}</th>
                          <td className="ft-right">
                            {formatCompactMetric(snapshot.vaultCustodyDisplay)} 4TEEN
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liveLockMap.rows.freelyCirculating}</th>
                          <td className="ft-right">
                            {formatCompactMetric(snapshot.freelyCirculatingDisplay)} 4TEEN
                          </td>
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

                <article className="ft-card ft-card--warning ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.vaultLayer.eyebrow}</p>
                      <h2 className="ft-subtitle">
                        {renderVaultLayerTitle(content.sections.vaultLayer.title)}
                      </h2>
                    </div>

                    <p className="ft-text">{content.sections.vaultLayer.body}</p>

                    <div className="ft-grid ft-grid--3 ft-unlock-page__vault-grid">
                      {snapshot.vaults.map((vault) => (
                        <article
                          key={vault.address}
                          className={getVaultCardClass(vault.title)}
                        >
                          <p className="ft-card-title-top">{vault.title}</p>
                          <h3 className="ft-card-title">
                            {formatCompactMetric(vault.balanceDisplay)}
                          </h3>
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

              <div className="ft-grid ft-grid--2-even ft-unlock-page__section-grid">
                <article className="ft-card ft-card--warning ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.lockMechanics.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.lockMechanics.title}</h2>
                    </div>

                    <div className="ft-grid ft-grid--3 ft-unlock-page__detail-grid">
                      {content.sections.lockMechanics.cards.map((card) => (
                        <article
                          key={card.title}
                          className={getMechanicsCardClass(card.title)}
                        >
                          <p className="ft-card-title-top">{card.eyebrow}</p>
                          <h3 className="ft-card-title">{card.title}</h3>
                          <p className="ft-text">{card.text}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="ft-card ft-card--positive ft-unlock-page__panel">
                  <div className="ft-stack ft-stack--md ft-unlock-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.walletRoute.eyebrow}</p>
                      <h2 className="ft-subtitle">
                        {renderWalletRouteTitle(content.sections.walletRoute.title)}
                      </h2>
                    </div>

                    <div className="ft-grid ft-grid--3 ft-unlock-page__detail-grid">
                      {content.sections.walletRoute.cards.map((card) => (
                        <article
                          key={card.title}
                          className={getWalletRouteCardClass(card.title)}
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
                      <h2 className="ft-title-md">
                        {renderCtaTitle(content.sections.cta.title)}
                      </h2>
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
