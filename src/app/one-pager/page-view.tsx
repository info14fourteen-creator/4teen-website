import type { Metadata } from "next";

import { LoaderLink } from "@/components/site/loader-link";
import { PublicPageShell } from "@/components/site/public-page-shell";
import { getOnePagerContent } from "@/content/one-pager-content";
import { defaultSiteLocale, type SupportedSiteLocale } from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getOnePagerPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
  pathname = "/one-pager",
): Metadata {
  const content = getOnePagerContent(locale);
  return buildPageMetadata({
    ...content.metadata,
    locale,
    pathname,
    keywords: [
      "4TEEN one-pager",
      "4TEEN investor one pager",
      "TRON wallet one-pager",
      "TRON token investment brief",
      "4TEEN protocol overview",
    ],
  });
}

export const metadata: Metadata = getOnePagerPageMetadata();

export function OnePagerPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getOnePagerContent(locale);

  return (
    <PublicPageShell content={content} pageClassName="ft-one-pager-page">
      <article className="ft-card ft-card--strong ft-public-page__panel ft-genesis-page__panel">
        <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
          <div className="ft-stack ft-stack--xs">
            <p className="ft-overline">Project Snapshot</p>
            <h2 className="ft-subtitle">The short version investors should remember</h2>
          </div>

          <div className="ft-genesis-page__card-grid ft-genesis-page__capital-grid">
            {content.snapshot.map((item) => (
              <article key={item.label} className="ft-card ft-card--plain">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-card-title-top">{item.label}</p>
                  <h3 className="ft-card-title">{item.value}</h3>
                  <p className="ft-text">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>

      <article className="ft-card ft-public-page__panel ft-genesis-page__panel">
        <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
          <div className="ft-stack ft-stack--xs">
            <p className="ft-overline">Proof Points</p>
            <h2 className="ft-subtitle">Why the story is already grounded</h2>
          </div>

          <div className="ft-genesis-page__card-grid ft-genesis-page__proof-grid">
            {content.proofPoints.map((point) => (
              <article key={point.title} className="ft-card ft-card--plain ft-genesis-page__proof-card">
                <div className="ft-stack ft-stack--xs">
                  <h3 className="ft-card-title">{point.title}</h3>
                  <p className="ft-text">{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>

      <article className="ft-card ft-card--strong ft-public-page__contact-panel ft-genesis-page__contact-panel">
        <div className="ft-public-page__contact-grid ft-genesis-page__contact-grid">
          <div className="ft-stack ft-stack--md">
            <div className="ft-stack ft-stack--xs">
              <p className="ft-overline">{content.ask.eyebrow}</p>
              <h2 className="ft-subtitle">{content.ask.title}</h2>
            </div>
            <p className="ft-text">{content.ask.body}</p>
            <div className="ft-actions ft-actions--stack-mobile">
              <LoaderLink
                className="ft-btn ft-btn--primary"
                href={`mailto:${content.ask.email}?subject=4TEEN%20One-Pager%20Inquiry`}
              >
                Contact 4TEEN
              </LoaderLink>
              <LoaderLink className="ft-btn ft-btn--secondary" href="/deck">
                Open Investor Deck
              </LoaderLink>
            </div>
          </div>

          <article className="ft-card ft-card--plain ft-public-page__contact-card">
            <div className="ft-stack ft-stack--xs">
              <p className="ft-card-title-top">Where help compounds fastest</p>
              <ul className="ft-list ft-public-page__list">
                {content.ask.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </article>
    </PublicPageShell>
  );
}

export default function OnePagerPage() {
  return <OnePagerPageView />;
}
