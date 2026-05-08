import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { ProgressiveAnimatedMedia } from "@/components/site/progressive-animated-media";
import { LoaderLink } from "@/components/site/loader-link";
import { SignalPoints } from "@/components/site/signal-points";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { officialWalletRepoUrl } from "@/content/official-links";
import { getSwapPageContent } from "@/content/swap-content";
import { formatCompactMetric } from "@/lib/site-format";
import { formatUtcDate } from "@/lib/site-intl";
import { getServerSiteSnapshot } from "@/lib/server-site-snapshot";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  type SwapSnapshot,
  swapVerificationLinks,
} from "@/lib/site-snapshot-types";

const SWAP_HERO_POSTER_SRC = "/media/swap-demo.png";
const SWAP_HERO_MEDIA_SRC = "/media/swap-demo.gif";
const SWAP_HERO_MEDIA_ALT = "4TEEN swap mobile wallet preview";

export function getSwapPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getSwapPageContent(locale).metadata;
  return buildPageMetadata({
    ...metadata,
    locale,
    pathname: "/swap",
    socialImages: [
      {
        url: SWAP_HERO_POSTER_SRC,
        alt: SWAP_HERO_MEDIA_ALT,
      },
    ],
  });
}

export const metadata: Metadata = getSwapPageMetadata();

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

function renderUniverseTitle(text: string) {
  if (text === "The wallet is not boxed into two promotional targets.") {
    return (
      <>
        The <span className="ft-meta-green">wallet</span> is not boxed into{" "}
        <span className="ft-accent">two promotional targets</span>.
      </>
    );
  }

  return text;
}

function renderReviewTitle(text: string) {
  if (
    text ===
    "The wallet does not jump straight into swap. It builds a controlled review first."
  ) {
    return (
      <>
        The wallet does not jump straight into <span className="ft-accent">swap</span>.
        It builds a <span className="ft-meta-green">controlled review</span>{" "}
        first.
      </>
    );
  }

  return text;
}

function renderCtaTitle(text: string) {
  if (text === "Open the wallet when you want the full route map") {
    return (
      <>
        Open the <span className="ft-meta-green">wallet</span> when you want the{" "}
        <span className="ft-accent">full route map</span>
      </>
    );
  }

  return text;
}

export async function SwapPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getSwapPageContent(locale);
  const snapshot = await getServerSiteSnapshot<SwapSnapshot>("swap");
  const heroSignals = content.hero.rotatingLines ?? [];

  const routerStateLabel = snapshot
    ? content.hero.stats.states[snapshot.routerState]
    : "—";

  const heroStats = snapshot ? (
    <>
      <article className="ft-price-card ft-price-card--warning">
        <p className="ft-price-label">{content.hero.stats.sampleAmount.label}</p>
        <p className="ft-price-main">
          {formatCompactMetric(snapshot.sampleAmount)} 4TEEN
        </p>
        <p className="ft-price-sub">{content.hero.stats.sampleAmount.meta}</p>
      </article>
      <article className="ft-price-card ft-price-card--positive">
        <p className="ft-price-label">{content.hero.stats.supportedTargets.label}</p>
        <p className="ft-price-main">{formatCompactMetric(snapshot.supportedTargets)}</p>
        <p className="ft-price-sub">{content.hero.stats.supportedTargets.meta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.protectedRemainder.label}</p>
        <p className="ft-price-main">{snapshot.protectedRemainder}</p>
        <p className="ft-price-sub">{content.hero.stats.protectedRemainder.meta}</p>
      </article>
      <article
        className={`ft-price-card ${
          snapshot.routerState === "live"
            ? "ft-price-card--positive"
            : snapshot.routerState === "offline"
              ? "ft-price-card--negative"
              : "ft-price-card--warning"
        }`}
      >
        <p className="ft-price-label">{content.hero.stats.routerState.label}</p>
        <p className="ft-price-main">{routerStateLabel}</p>
        <p className="ft-price-sub">{content.hero.stats.routerState.meta}</p>
      </article>
    </>
  ) : null;

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-swap-page">
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
                    <SiteSnapshotRefresh snapshotKeys={["swap"]} />
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
                    <div className="ft-grid ft-buy-page__hero-stats ft-swap-page__hero-stats--desktop">
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
                        alt={SWAP_HERO_MEDIA_ALT}
                        animatedSrc={SWAP_HERO_MEDIA_SRC}
                        className="ft-buy-page__hero-media-frame"
                        height={2220}
                        imageClassName="ft-buy-page__hero-media-image"
                        posterSrc={SWAP_HERO_POSTER_SRC}
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
                        href="#swap-live-routes"
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
                <div className="ft-grid ft-buy-page__hero-stats ft-swap-page__hero-stats--mobile">
                  {heroStats}
                </div>
              ) : null}
            </div>
          </article>

          <article className="ft-card ft-swap-page__panel">
            <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.tokenUniverse.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderUniverseTitle(content.sections.tokenUniverse.title)}
                </h2>
              </div>

              <p className="ft-text">{content.sections.tokenUniverse.intro}</p>

              <div className="ft-swap-page__story-grid">
                <article className="ft-card ft-card--plain ft-card--positive ft-swap-page__detail-card ft-swap-page__story-main">
                  <p className="ft-card-title-top">
                    {content.sections.tokenUniverse.mainCard.eyebrow}
                  </p>
                  <h3 className="ft-card-title">
                    {content.sections.tokenUniverse.mainCard.title}
                  </h3>
                  <p className="ft-text">{content.sections.tokenUniverse.mainCard.text}</p>
                  {content.sections.tokenUniverse.mainCard.bullets?.length ? (
                    <ul className="ft-list">
                      {content.sections.tokenUniverse.mainCard.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>

                <div className="ft-swap-page__story-stack">
                  {content.sections.tokenUniverse.cards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`ft-card ft-card--plain ft-swap-page__detail-card ${
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

              <p className="ft-note">{content.sections.tokenUniverse.note}</p>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-swap-page__section-grid">
            <article
              id="swap-live-routes"
              className="ft-card ft-swap-page__panel"
            >
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
                          {formatCompactMetric(route.expectedOutDisplay)}{" "}
                          {route.targetSymbol}
                        </h3>
                        <div className="ft-stack ft-stack--xs">
                          <p className="ft-price-label">
                            {content.sections.liveRoutes.labels.route}
                          </p>
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
                            <p className="ft-price-label">
                              {content.sections.liveRoutes.labels.state}
                            </p>
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
                            <p className="ft-text">
                              {formatUtcDate(snapshot.updatedAt, locale)}
                            </p>
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
                  <p className="ft-overline">{content.sections.reviewLayer.eyebrow}</p>
                  <h2 className="ft-subtitle">
                    {renderReviewTitle(content.sections.reviewLayer.title)}
                  </h2>
                </div>

                <p className="ft-text">{content.sections.reviewLayer.intro}</p>

                <div className="ft-swap-page__story-grid">
                  <article className="ft-card ft-card--plain ft-card--warning ft-swap-page__detail-card ft-swap-page__story-main">
                    <p className="ft-card-title-top">
                      {content.sections.reviewLayer.mainCard.eyebrow}
                    </p>
                    <h3 className="ft-card-title">
                      {content.sections.reviewLayer.mainCard.title}
                    </h3>
                    <p className="ft-text">{content.sections.reviewLayer.mainCard.text}</p>
                    {content.sections.reviewLayer.mainCard.bullets?.length ? (
                      <ul className="ft-list">
                        {content.sections.reviewLayer.mainCard.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>

                  <div className="ft-swap-page__story-stack">
                    {content.sections.reviewLayer.cards.map((card, index) => (
                      <article
                        key={card.title}
                        className={`ft-card ft-card--plain ft-swap-page__detail-card ${
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

                <p className="ft-note">{content.sections.reviewLayer.note}</p>
              </div>
            </article>
          </div>

          <div className="ft-grid ft-grid--2-even ft-swap-page__section-grid">
            <article className="ft-card ft-swap-page__panel">
              <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                </div>

                <p className="ft-text">{content.sections.verification.body}</p>

                <div className="ft-links ft-links--stack">
                  <LoaderLink
                    className="ft-link"
                    href={swapVerificationLinks.router}
                    showLinkIcon
                  >
                    {content.sections.verification.labels.router}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={swapVerificationLinks.token}
                    showLinkIcon
                  >
                    {content.sections.verification.labels.token}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={officialWalletRepoUrl}
                    showLinkIcon
                  >
                    {content.sections.verification.labels.walletRepo}
                  </LoaderLink>
                </div>
              </div>
            </article>

            <article className="ft-card ft-swap-page__cta-panel">
              <div className="ft-stack ft-stack--md ft-swap-page__panel-stack">
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

export default async function SwapPage() {
  return <SwapPageView />;
}
