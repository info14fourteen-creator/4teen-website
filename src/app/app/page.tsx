import type { Metadata } from "next";

import { getAppPageContent } from "@/content/app-content";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { defaultSiteLocale } from "@/lib/site-locale";

export const metadata: Metadata = {
  title: "4TEEN Mobile App",
  description:
    "A multilingual TRON wallet with 4TEEN direct buy, unlock tracking, liquidity control, resource-aware execution, and download routes for mobile users.",
};

export default function AppPage() {
  const locale = defaultSiteLocale;
  const content = getAppPageContent(locale);
  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-app-page">
      <FourteenMobileShell appMode />
      <FourteenTopbar appMode />

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

              <div className="ft-actions ft-actions--stack-mobile ft-app-page__hero-actions">
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
                <LoaderLink className="ft-btn ft-btn--secondary" href="/">
                  {content.hero.stayOnWeb}
                </LoaderLink>
              </div>

              <div className="ft-grid ft-grid--4 ft-app-page__hero-stats">
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

          <article className="ft-card ft-card--plain">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.entryFlow.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.entryFlow.title}</h2>
              </div>

              <div className="ft-price-strip ft-app-page__entry-strip">
                {content.entryFlow.map((step) => (
                  <div key={step.title}>
                    <p className="ft-price-label">{step.eyebrow}</p>
                    <p className="ft-price-main">{step.title}</p>
                    <p className="ft-price-sub">{step.body}</p>
                  </div>
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
                  {content.sections.resourceLayer.notePrefix} <strong>Need now</strong>,
                  <strong> {content.sections.resourceLayer.noteMiddle}</strong>,{" "}
                  <strong>{content.sections.resourceLayer.noteMissing}</strong>,{" "}
                  {content.sections.resourceLayer.noteSuffix}
                </p>
              </div>
            </article>
          </div>

          <article className="ft-card ft-app-page__panel">
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

          <article className="ft-card ft-card--strong ft-app-page__download-card">
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
