import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { officialWalletRepoUrl } from "@/content/official-links";
import { getSwapPageContent } from "@/content/swap-content";
import { getDeferredLiveSnapshot } from "@/lib/deferred-live-snapshot";
import { defaultSiteLocale } from "@/lib/site-locale";
import { formatUtcDate } from "@/lib/site-intl";
import { type SwapSnapshot, swapVerificationLinks } from "@/lib/swap-live";

const metadataContent = getSwapPageContent(defaultSiteLocale);

export const metadata: Metadata = metadataContent.metadata;

export default async function SwapPage() {
  const locale = defaultSiteLocale;
  const content = getSwapPageContent(locale);
  const snapshot = getDeferredLiveSnapshot<SwapSnapshot>();

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-swap-page">
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
                <div className="ft-grid ft-grid--4 ft-swap-page__hero-stats">
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.sampleAmount}</p>
                    <p className="ft-price-main">{snapshot.sampleAmount} 4TEEN</p>
                    <p className="ft-price-sub">{content.hero.stats.sampleAmountMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.supportedTargets}</p>
                    <p className="ft-price-main">{snapshot.supportedTargets}</p>
                    <p className="ft-price-sub">{content.hero.stats.supportedTargetsMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.remainderGuard}</p>
                    <p className="ft-price-main">{snapshot.protectedRemainder}</p>
                    <p className="ft-price-sub">{content.hero.stats.remainderGuardMeta}</p>
                  </article>
                  <article className="ft-price-card">
                    <p className="ft-price-label">{content.hero.stats.routerState}</p>
                    <p className="ft-price-main">{content.hero.states[snapshot.routerState]}</p>
                    <p className="ft-price-sub">{content.hero.stats.routerStateMeta}</p>
                  </article>
                </div>
              ) : (
                <div className="ft-note">
                  <strong>{content.hero.stats.readFailed}</strong> {content.hero.stats.readRetry}
                </div>
              )}
            </div>
          </article>

          <article className="ft-card ft-swap-page__panel">
            <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.walletRoute.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.walletRoute.title}</h2>
              </div>

              <p className="ft-text">{content.sections.walletRoute.body}</p>

              <ul className="ft-list">
                {content.sections.walletRoute.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                  {content.sections.walletRoute.openApp}
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href="/unlock">
                  {content.sections.walletRoute.openUnlock}
                </LoaderLink>
              </div>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-swap-page__section-grid">
            <article className="ft-card ft-swap-page__panel">
              <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.liveRoutes.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.liveRoutes.title}</h2>
                  <p className="ft-text">{content.sections.liveRoutes.body}</p>
                </div>

                {snapshot && snapshot.routes.length > 0 ? (
                  <div className="ft-grid ft-grid--2 ft-swap-page__route-grid">
                    {snapshot.routes.map((route) => (
                      <article
                        key={route.targetKey}
                        className="ft-card ft-card--plain ft-swap-page__route-card"
                      >
                        <p className="ft-card-title-top">{route.targetSymbol}</p>
                        <h3 className="ft-card-title">
                          {route.expectedOutDisplay} {route.targetSymbol}
                        </h3>
                        <div className="ft-stack ft-stack--xs">
                          <p className="ft-price-label">{content.sections.liveRoutes.labels.route}</p>
                          <p className="ft-text">{route.routeLabel}</p>
                        </div>
                        <div className="ft-stack ft-stack--xs">
                          <p className="ft-price-label">
                            {content.sections.liveRoutes.labels.targets}
                          </p>
                          <p className="ft-text">{route.pathLabel}</p>
                        </div>
                        <div className="ft-swap-page__route-meta">
                          <div>
                            <p className="ft-price-label">
                              {content.sections.liveRoutes.labels.execution}
                            </p>
                            <p className="ft-text">{route.executionLabel}</p>
                          </div>
                          <div>
                            <p className="ft-price-label">
                              {content.sections.liveRoutes.labels.impact}
                            </p>
                            <p className="ft-text">{route.impactLabel}</p>
                          </div>
                          <div>
                            <p className="ft-price-label">{content.sections.liveRoutes.labels.state}</p>
                            <p className="ft-text">
                              {route.isExecutable
                                ? content.sections.liveRoutes.states.executable
                                : content.sections.liveRoutes.states.reviewOnly}
                            </p>
                          </div>
                          <div>
                            <p className="ft-price-label">
                              {content.sections.liveRoutes.labels.updated}
                            </p>
                            <p className="ft-text">{formatUtcDate(snapshot.updatedAt, locale)}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="ft-note">{content.sections.liveRoutes.empty}</p>
                )}

                <p className="ft-note">{content.sections.liveRoutes.note}</p>
              </div>
            </article>

            <article className="ft-card ft-swap-page__panel">
              <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.discipline.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.discipline.title}</h2>
                </div>

                <div className="ft-grid ft-grid--3 ft-swap-page__detail-grid">
                  {content.sections.discipline.cards.map((card) => (
                    <article
                      key={card.title}
                      className="ft-card ft-card--plain ft-swap-page__detail-card"
                    >
                      <p className="ft-card-title-top">{card.eyebrow}</p>
                      <h3 className="ft-card-title">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </article>
                  ))}
                </div>

                <p className="ft-note">{content.sections.discipline.note}</p>
              </div>
            </article>
          </div>

          <div className="ft-grid ft-grid--2-even ft-swap-page__section-grid">
            <article className="ft-card ft-swap-page__panel">
              <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.convenience.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.convenience.title}</h2>
                </div>

                <div className="ft-grid ft-grid--3 ft-swap-page__detail-grid">
                  {content.sections.convenience.cards.map((card) => (
                    <article
                      key={card.title}
                      className="ft-card ft-card--plain ft-swap-page__detail-card"
                    >
                      <p className="ft-card-title-top">{card.eyebrow}</p>
                      <h3 className="ft-card-title">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </article>
                  ))}
                </div>

                <p className="ft-note">{content.sections.convenience.note}</p>
              </div>
            </article>

            <article className="ft-card ft-swap-page__panel">
              <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                </div>

                <p className="ft-text">{content.sections.verification.body}</p>

                <div className="ft-links ft-links--stack">
                  <LoaderLink className="ft-link" href={swapVerificationLinks.router}>
                    {content.sections.verification.labels.router}
                  </LoaderLink>
                  <LoaderLink className="ft-link" href={swapVerificationLinks.token}>
                    {content.sections.verification.labels.token}
                  </LoaderLink>
                  <LoaderLink className="ft-link" href={officialWalletRepoUrl}>
                    {content.sections.verification.labels.walletRepo}
                  </LoaderLink>
                </div>
              </div>
            </article>
          </div>

          <article className="ft-card ft-swap-page__cta-panel">
            <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
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
      </section>
    </main>
  );
}
