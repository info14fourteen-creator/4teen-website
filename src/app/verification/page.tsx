import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import { getDeferredLiveSnapshot } from "@/lib/deferred-live-snapshot";
import { getVerificationPageContent } from "@/content/verification-content";
import { formatUtcDate } from "@/lib/site-intl";
import { defaultSiteLocale } from "@/lib/site-locale";
import {
  type LiveVerificationSnapshot,
  verificationLinks,
} from "@/lib/verification-live";

const metadataContent = getVerificationPageContent(defaultSiteLocale);

export const metadata: Metadata = metadataContent.metadata;

export const revalidate = 120;

export default async function VerificationPage() {
  const locale = defaultSiteLocale;
  const content = getVerificationPageContent(locale);
  const snapshot = getDeferredLiveSnapshot<LiveVerificationSnapshot>();
  const errorText =
    "The page shell is prioritized right now while the live verification snapshot is moved off server render.";

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-verification-page">
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
                <div className="ft-grid ft-grid--4 ft-verification-page__hero-stats">
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.totalSupply}</p>
                    <p className="ft-price-main">{snapshot.totalSupplyDisplay}</p>
                    <p className="ft-price-sub">{content.hero.stats.totalSupplyMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.currentPrice}</p>
                    <p className="ft-price-main">{snapshot.currentPriceDisplay} TRX</p>
                    <p className="ft-price-sub">{content.hero.stats.currentPriceMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.vaultCustody}</p>
                    <p className="ft-price-main">{snapshot.vaultCustodyDisplay}</p>
                    <p className="ft-price-sub">{content.hero.stats.vaultCustodyMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.controllerBalance}</p>
                    <p className="ft-price-main">{snapshot.controllerBalanceDisplay} TRX</p>
                    <p className="ft-price-sub">{content.hero.stats.controllerBalanceMeta}</p>
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

          <article className="ft-card ft-verification-page__panel">
            <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.orientation.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.orientation.title}</h2>
              </div>

              <p className="ft-text">{content.sections.orientation.body}</p>

              <ul className="ft-list">
                {content.sections.orientation.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/whitepaper">
                  {content.sections.orientation.openWhitepaper}
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href="/app">
                  {content.sections.orientation.openApp}
                </LoaderLink>
              </div>
            </div>
          </article>

          {snapshot ? (
            <>
              <div className="ft-grid ft-grid--2-even ft-verification-page__section-grid">
                <article className="ft-card ft-verification-page__panel">
                  <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.tokenMap.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.tokenMap.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-verification-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.tokenMap.rows.tokenOwner}</th>
                          <td className="ft-right">{snapshot.tokenOwnerAddress}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.tokenMap.rows.liquidityRoute}</th>
                          <td className="ft-right">{snapshot.liquidityPoolAddress}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.tokenMap.rows.airdropRoute}</th>
                          <td className="ft-right">{snapshot.airdropAddress}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.tokenMap.rows.directPrice}</th>
                          <td className="ft-right">{snapshot.currentPriceDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.sections.tokenMap.rows.growthRule}</th>
                          <td className="ft-right">{snapshot.annualGrowthRateLabel}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.tokenMap.rows.lastPriceUpdate}</th>
                          <td className="ft-right">
                            {formatUtcDate(snapshot.lastPriceUpdateAt, locale)}
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.tokenMap.rows.snapshotUpdated}</th>
                          <td className="ft-right">{formatUtcDate(snapshot.loadedAt, locale)}</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.sections.tokenMap.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-verification-page__panel">
                  <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.controllerState.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.controllerState.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-verification-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.controllerState.rows.controllerOwner}</th>
                          <td className="ft-right">{snapshot.controllerOwnerAddress}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.contractBalance}</th>
                          <td className="ft-right">{snapshot.controllerBalanceDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.ownerAvailable}</th>
                          <td className="ft-right">{snapshot.ownerAvailableDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.reservedRewards}</th>
                          <td className="ft-right">{snapshot.reservedRewardsDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>
                            {content.sections.controllerState.rows.unallocatedPurchaseFunds}
                          </th>
                          <td className="ft-right">
                            {snapshot.unallocatedPurchaseFundsDisplay} TRX
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.ambassadors}</th>
                          <td className="ft-right">{snapshot.ambassadorsCount}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.activeAmbassadors}</th>
                          <td className="ft-right">{snapshot.activeAmbassadorsCount}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.boundBuyers}</th>
                          <td className="ft-right">{snapshot.boundBuyersCount}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.trackedVolume}</th>
                          <td className="ft-right">{snapshot.trackedVolumeDisplay} TRX</td>
                        </tr>
                        <tr>
                          <th>{content.sections.controllerState.rows.rewardsClaimed}</th>
                          <td className="ft-right">{snapshot.rewardsClaimedDisplay} TRX</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.sections.controllerState.note}</p>
                  </div>
                </article>
              </div>

              <div className="ft-grid ft-grid--2-even ft-verification-page__section-grid">
                <article className="ft-card ft-verification-page__panel">
                  <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.liquidityState.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.liquidityState.title}</h2>
                    </div>

                    <table className="ft-mini-table ft-verification-page__mini-table">
                      <tbody>
                        <tr>
                          <th>{content.sections.liquidityState.rows.controllerBalance}</th>
                          <td className="ft-right">
                            {snapshot.liquidityControllerBalanceDisplay} TRX
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liquidityState.rows.controllerOwner}</th>
                          <td className="ft-right">
                            {snapshot.liquidityControllerOwnerAddress}
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liquidityState.rows.minBalance}</th>
                          <td className="ft-right">
                            {snapshot.liquidityMinBalanceDisplay} TRX
                          </td>
                        </tr>
                        <tr>
                          <th>{content.sections.liquidityState.rows.dailyRelease}</th>
                          <td className="ft-right">{snapshot.liquidityDailyReleaseLabel}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liquidityState.rows.justMoneyExecutor}</th>
                          <td className="ft-right">{snapshot.justMoneyExecutorAddress}</td>
                        </tr>
                        <tr>
                          <th>{content.sections.liquidityState.rows.sunExecutor}</th>
                          <td className="ft-right">{snapshot.sunV3ExecutorAddress}</td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ft-note">{content.sections.liquidityState.note}</p>
                  </div>
                </article>

                <article className="ft-card ft-verification-page__panel">
                  <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
                    <div className="ft-stack ft-stack--xs">
                      <p className="ft-overline">{content.sections.reserveLayer.eyebrow}</p>
                      <h2 className="ft-subtitle">{content.sections.reserveLayer.title}</h2>
                    </div>

                    <p className="ft-text">{content.sections.reserveLayer.body}</p>

                    <div className="ft-grid ft-grid--2 ft-verification-page__asset-grid">
                      {snapshot.assets.map((asset) => (
                        <article
                          key={asset.address}
                          className="ft-card ft-card--plain ft-verification-page__asset-card"
                        >
                          <p className="ft-card-title-top">{asset.title}</p>
                          <h3 className="ft-card-title">
                            {asset.balanceDisplay} 4TEEN
                          </h3>
                          <p className="ft-text">{asset.role}</p>
                          <p className="ft-note">{asset.address}</p>
                          <a
                            className="ft-link ft-verification-page__address"
                            href={asset.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {content.sections.reserveLayer.labels.verify}
                          </a>
                        </article>
                      ))}
                    </div>

                    <p className="ft-note">{content.sections.reserveLayer.note}</p>
                  </div>
                </article>
              </div>
            </>
          ) : null}

          <article className="ft-card ft-verification-page__panel">
            <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.architecture.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.architecture.title}</h2>
              </div>

              <div className="ft-grid ft-grid--4 ft-verification-page__detail-grid">
                {content.sections.architecture.cards.map((card) => (
                  <article
                    key={card.title}
                    className="ft-card ft-card--plain ft-verification-page__detail-card"
                  >
                    <p className="ft-card-title-top">{card.eyebrow}</p>
                    <h3 className="ft-card-title">{card.title}</h3>
                    <p className="ft-text">{card.text}</p>
                  </article>
                ))}
              </div>

              <p className="ft-note">{content.sections.architecture.note}</p>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-verification-page__section-grid">
            <article className="ft-card ft-verification-page__panel">
              <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                </div>

                <p className="ft-text">{content.sections.verification.body}</p>

                <div className="ft-grid ft-grid--2 ft-verification-page__proof-grid">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-price-label">{content.sections.verification.groups.core}</p>
                    <div className="ft-links ft-links--stack">
                      <a className="ft-link" href={verificationLinks.token} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.token}
                      </a>
                      <a className="ft-link" href={verificationLinks.controller} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.controller}
                      </a>
                      <a className="ft-link" href={verificationLinks.liquidityController} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.liquidityController}
                      </a>
                    </div>
                  </div>

                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-price-label">{content.sections.verification.groups.vaults}</p>
                    <div className="ft-links ft-links--stack">
                      <a className="ft-link" href={verificationLinks.fourteenVault} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.fourteenVault}
                      </a>
                      <a className="ft-link" href={verificationLinks.teamLockVault} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.teamLockVault}
                      </a>
                      <a className="ft-link" href={verificationLinks.airdropVault} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.airdropVault}
                      </a>
                    </div>
                  </div>

                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-price-label">
                      {content.sections.verification.groups.execution}
                    </p>
                    <div className="ft-links ft-links--stack">
                      <a className="ft-link" href={verificationLinks.bootstrapper} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.bootstrapper}
                      </a>
                      <a className="ft-link" href={verificationLinks.justMoneyExecutor} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.justMoneyExecutor}
                      </a>
                      <a className="ft-link" href={verificationLinks.sunV3Executor} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.sunV3Executor}
                      </a>
                    </div>
                  </div>

                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-price-label">{content.sections.verification.groups.source}</p>
                    <div className="ft-links ft-links--stack">
                      <a className="ft-link" href={officialContractsRepoUrl} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.contractsRepo}
                      </a>
                      <a className="ft-link" href={officialWalletRepoUrl} rel="noopener noreferrer" target="_blank">
                        {content.sections.verification.labels.walletRepo}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="ft-card ft-verification-page__cta-panel">
              <div className="ft-stack ft-stack--md ft-verification-page__panel-stack">
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
          </div>
        </div>
      </section>
    </main>
  );
}
