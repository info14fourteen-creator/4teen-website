import type { Metadata } from "next";

import { ProgressiveAnimatedMedia } from "@/components/site/progressive-animated-media";
import { getAppPageContent } from "@/content/app-content";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { SignalPoints } from "@/components/site/signal-points";
import { FourteenTopbar } from "@/components/site/topbar";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

const APP_HERO_POSTER_SRC = "/media/app-demo.png";
const APP_HERO_MEDIA_SRC = "/media/app-demo.gif";
const APP_HERO_MEDIA_ALT = "4TEEN mobile app home wallet preview";

export function getAppPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getAppPageContent(locale).metadata;
  return buildPageMetadata({
    ...metadata,
    locale,
    pathname: "/app",
    socialImages: [
      {
        url: APP_HERO_POSTER_SRC,
        alt: APP_HERO_MEDIA_ALT,
      },
    ],
  });
}

export const metadata: Metadata = getAppPageMetadata();

export function AppPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getAppPageContent(locale);
  const heroSignals = content.hero.rotatingLines ?? [];
  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-app-page">
      <FourteenMobileShell appMode />
      <FourteenTopbar appMode />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-buy-page__hero-layout">
                <div className="ft-stack ft-stack--md ft-buy-page__hero-copy">
                  <div className="ft-cluster ft-cluster--sm">
                    <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                    <span className="ft-status-pill live">{content.hero.status}</span>
                  </div>

                  <h1 className="ft-title-lg">{content.hero.title}</h1>
                  <p className="ft-lead">{content.hero.lead}</p>

                  {heroSignals.length ? (
                    <SignalPoints
                      className="ft-buy-page__signal-lines ft-buy-page__signal-lines--lead"
                      items={heroSignals}
                    />
                  ) : null}

                  <div className="ft-grid ft-grid--4 ft-app-page__hero-stats ft-app-page__hero-stats--desktop">
                    {content.hero.stats.map((item) => (
                      <article key={item.label} className="ft-price-card">
                        <p className="ft-price-label">{item.label}</p>
                        <p className="ft-price-main">{item.value}</p>
                        <p className="ft-price-sub">{item.meta}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="ft-buy-page__hero-side">
                  <div className="ft-stack ft-stack--md ft-buy-page__hero-side-inner">
                    <div className="ft-buy-page__hero-media">
                      <ProgressiveAnimatedMedia
                        alt={APP_HERO_MEDIA_ALT}
                        animatedSrc={APP_HERO_MEDIA_SRC}
                        className="ft-buy-page__hero-media-frame"
                        height={2220}
                        imageClassName="ft-buy-page__hero-media-image"
                        posterSrc={APP_HERO_POSTER_SRC}
                        priority
                        width={1080}
                      />
                    </div>

                    <div className="ft-actions ft-actions--stack-mobile ft-buy-page__hero-side-actions">
                      {content.hero.primaryCta ? (
                        <LoaderLink className="ft-btn ft-btn--primary" href="#app-protocol-surfaces">
                          {content.hero.primaryCta}
                        </LoaderLink>
                      ) : null}
                      {content.hero.secondaryCta ? (
                        <LoaderLink className="ft-btn ft-btn--secondary" href="#app-download">
                          {content.hero.secondaryCta}
                        </LoaderLink>
                      ) : (
                        <LoaderLink className="ft-btn ft-btn--secondary" href="/">
                          {content.hero.stayOnWeb}
                        </LoaderLink>
                      )}
                    </div>

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

              <div className="ft-grid ft-grid--4 ft-app-page__hero-stats ft-app-page__hero-stats--mobile">
                {content.hero.stats.map((item) => (
                  <article key={item.label} className="ft-price-card">
                    <p className="ft-price-label">{item.label}</p>
                    <p className="ft-price-main">{item.value}</p>
                    <p className="ft-price-sub">{item.meta}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-app-page__section-grid">
            <article className="ft-card ft-app-page__panel">
              <div className="ft-stack ft-stack--md ft-app-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.walletFoundation.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.walletFoundation.title}</h2>
                </div>

                <div className="ft-grid ft-grid--2-even ft-app-page__foundation-grid">
                  {content.walletFoundation.map((item) => (
                    <article key={item.title} className="ft-card ft-card--plain ft-app-page__detail-card">
                      <p className="ft-card-title-top">{item.eyebrow}</p>
                      <h3 className="ft-card-title">{item.title}</h3>
                      <p className="ft-text">{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </article>

            <article className="ft-card ft-app-page__panel">
              <div className="ft-stack ft-stack--md ft-app-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.resourceLayer.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.resourceLayer.title}</h2>
                </div>

                <div className="ft-grid ft-grid--2-even ft-app-page__resource-grid">
                  {content.resourceLayer.map((item) => (
                    <article key={item.title} className="ft-card ft-card--plain ft-app-page__detail-card">
                      <p className="ft-card-title-top">{item.eyebrow}</p>
                      <h3 className="ft-card-title">{item.title}</h3>
                      <p className="ft-text">{item.text}</p>
                    </article>
                  ))}
                </div>

                <p className="ft-note">
                  {content.sections.resourceLayer.notePrefix} <strong>{content.sections.resourceLayer.noteNeedNow}</strong>,
                  <strong> {content.sections.resourceLayer.noteMiddle}</strong>,{" "}
                  <strong>{content.sections.resourceLayer.noteMissing}</strong>,{" "}
                  {content.sections.resourceLayer.noteSuffix}
                </p>
              </div>
            </article>
          </div>

          <article id="app-protocol-surfaces" className="ft-card ft-app-page__panel">
            <div className="ft-stack ft-stack--md ft-app-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.protocolSurfaces.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.protocolSurfaces.title}</h2>
              </div>

              <div className="ft-grid ft-grid--3 ft-app-page__surface-grid">
                {content.protocolSurfaces.map((item) => (
                  <LoaderLink
                    key={item.href}
                    className="ft-card ft-card--plain ft-app-page__surface-card"
                    href={item.href}
                  >
                    <p className="ft-card-title-top">{item.eyebrow}</p>
                    <h3 className="ft-card-title">{item.title}</h3>
                    <p className="ft-text">{item.text}</p>
                  </LoaderLink>
                ))}
              </div>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-placeholder-grid ft-app-page__rules-grid">
            {content.operatingRules.map((rule) => (
              <article key={rule.title} className="ft-card ft-card--plain ft-app-page__detail-card">
                <p className="ft-card-title-top">{content.sections.operatingRuleLabel}</p>
                <h2 className="ft-card-title">{rule.title}</h2>
                <p className="ft-text">{rule.text}</p>
              </article>
            ))}
          </div>

          <article id="app-download" className="ft-card ft-card--strong ft-app-page__download-card">
            <div className="ft-stack ft-stack--lg ft-app-page__panel-stack">
              <div className="ft-stack ft-stack--sm">
                <p className="ft-overline">{content.sections.download.eyebrow}</p>
                <h2 className="ft-title-md">{content.sections.download.title}</h2>
                <p className="ft-text">{content.sections.download.body}</p>
              </div>

              <ul className="ft-list">
                {content.downloadReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>

              <div className="ft-actions ft-actions--stack-mobile ft-app-page__download-actions">
                {content.storeLinks.map((store) => (
                  <a
                    key={store.label}
                    className="ft-btn ft-btn--primary"
                    href={store.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {store.label}
                  </a>
                ))}
                <a
                  className="ft-btn ft-btn--ghost"
                  href="https://github.com/info14fourteen-creator/4teen-wallet-app"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.sections.download.repoLabel}
                </a>
              </div>

            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function AppPage() {
  return <AppPageView />;
}
