import type { Metadata } from "next";

import { LoaderLink } from "@/components/site/loader-link";
import { PublicPageShell } from "@/components/site/public-page-shell";
import { getGenesisDeckContent } from "@/content/genesis-content";
import { defaultSiteLocale, type SupportedSiteLocale } from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getGenesisPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
  pathname = "/deck",
): Metadata {
  const content = getGenesisDeckContent(locale);
  return buildPageMetadata({
    ...content.metadata,
    locale,
    pathname,
    keywords: [
      "4TEEN investor deck",
      "4TEEN pitch deck",
      "TRON wallet investment",
      "TRON smart contract infrastructure",
      "4TEEN buy unlock liquidity",
    ],
  });
}

export const metadata: Metadata = getGenesisPageMetadata();

export function GenesisPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getGenesisDeckContent(locale);

  return (
    <PublicPageShell content={content} pageClassName="ft-genesis-page">
      <article className="ft-card ft-card--strong ft-public-page__panel ft-genesis-page__panel ft-genesis-page__thesis-panel">
        <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
          <div className="ft-stack ft-stack--xs">
            <p className="ft-overline">Investment Thesis</p>
            <h2 className="ft-subtitle">Why this can compound from here</h2>
          </div>

          <div className="ft-genesis-page__card-grid ft-genesis-page__thesis-grid">
            {content.thesis.map((item) => (
              <article key={item.title} className="ft-card ft-card--plain ft-genesis-page__thesis-card">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-card-title-top">{item.eyebrow}</p>
                  <h3 className="ft-card-title">{item.title}</h3>
                  <p className="ft-text">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>

      <article className="ft-card ft-public-page__panel ft-genesis-page__panel ft-genesis-page__proof-panel">
        <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
          <div className="ft-stack ft-stack--xs">
            <p className="ft-overline">Execution Proof</p>
            <h2 className="ft-subtitle">What already exists on-chain and in product</h2>
          </div>

          <div className="ft-genesis-page__card-grid ft-genesis-page__proof-grid">
            {content.proofTracks.map((track) => (
              <article key={track.title} className="ft-card ft-card--plain ft-genesis-page__proof-card">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-card-title-top">{track.eyebrow}</p>
                  <h3 className="ft-card-title">{track.title}</h3>
                  <ul className="ft-list ft-public-page__list">
                    {track.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>

      <article className="ft-card ft-card--strong ft-public-page__contact-panel ft-genesis-page__capital-panel">
        <div className="ft-stack ft-stack--md">
          <div className="ft-stack ft-stack--xs">
            <p className="ft-overline">Capital Deployment</p>
            <h2 className="ft-subtitle">Where fresh capital would actually move the system faster</h2>
          </div>

          <div className="ft-genesis-page__card-grid ft-genesis-page__capital-grid">
            {content.capitalPlan.map((item) => (
              <article key={item.title} className="ft-card ft-card--plain ft-card--positive">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-card-title-top">{item.eyebrow}</p>
                  <h3 className="ft-card-title">{item.title}</h3>
                  <p className="ft-text">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>

      <article className="ft-card ft-public-page__contact-panel ft-genesis-page__contact-panel">
        <div className="ft-public-page__contact-grid ft-genesis-page__contact-grid">
          <div className="ft-stack ft-stack--md">
            <div className="ft-stack ft-stack--xs">
              <p className="ft-overline">{content.contact.eyebrow}</p>
              <h2 className="ft-subtitle">{content.contact.title}</h2>
            </div>
            <p className="ft-text">{content.contact.body}</p>
            <div className="ft-actions ft-actions--stack-mobile">
              <LoaderLink
                className="ft-btn ft-btn--primary"
                href={`mailto:${content.contact.email}?subject=4TEEN%20Genesis%20Inquiry`}
              >
                Contact Genesis
              </LoaderLink>
              <LoaderLink className="ft-btn ft-btn--secondary" href="/whitepaper">
                Review Whitepaper
              </LoaderLink>
            </div>
          </div>

          <div className="ft-stack ft-stack--md">
            <article className="ft-card ft-card--plain ft-public-page__contact-card ft-card--warning">
              <p className="ft-card-title-top">{content.contact.emailLabel}</p>
              <LoaderLink className="ft-link" href={`mailto:${content.contact.email}`} showLinkIcon>
                {content.contact.email}
              </LoaderLink>
            </article>

            <article className="ft-card ft-card--plain ft-public-page__contact-card ft-genesis-page__contact-card">
              <p className="ft-card-title-top">What makes the right conversation</p>
              <ul className="ft-list ft-public-page__list">
                {content.contact.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </article>
    </PublicPageShell>
  );
}

export default function GenesisPage() {
  return <GenesisPageView />;
}
