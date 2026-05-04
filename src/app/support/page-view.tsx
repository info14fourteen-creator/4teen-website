import type { Metadata } from "next";

import { PublicPageShell } from "@/components/site/public-page-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { getPublicPagesContent } from "@/content/public-pages-content";
import { officialSupportEmail } from "@/content/official-links";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getSupportPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const content = getPublicPagesContent(locale).support;
  return buildPageMetadata({ ...content.metadata, locale, pathname: "/support" });
}

export const metadata: Metadata = getSupportPageMetadata();

export function SupportPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getPublicPagesContent(locale).support;
  return (
    <PublicPageShell content={content} pageClassName="ft-support-page">
      <div className="ft-grid ft-grid--2-even ft-public-page__section-grid">
        <article className="ft-card ft-public-page__panel">
          <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
            <div className="ft-stack ft-stack--xs">
              <p className="ft-overline">{content.channelPanel.eyebrow}</p>
              <h2 className="ft-subtitle">{content.channelPanel.title}</h2>
            </div>

            <div className="ft-grid ft-grid--2-even ft-public-page__channel-grid">
              {content.channels.map((channel) => (
                <LoaderLink
                  key={channel.label}
                  className="ft-card ft-card--plain ft-public-page__channel-card"
                  href={channel.href}
                  rel="noopener noreferrer"
                  showLinkIcon
                  target="_blank"
                >
                  <p className="ft-card-title-top">{content.channelPanel.routeLabel}</p>
                  <h3 className="ft-card-title">{channel.label}</h3>
                  <p className="ft-text">{channel.note}</p>
                </LoaderLink>
              ))}
            </div>
          </div>
        </article>

        <article className="ft-card ft-public-page__panel">
          <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
            <div className="ft-stack ft-stack--xs">
              <p className="ft-overline">{content.scopePanel.eyebrow}</p>
              <h2 className="ft-subtitle">{content.scopePanel.title}</h2>
            </div>

            <div className="ft-grid ft-grid--2-even ft-public-page__scope-grid">
              <article className="ft-card ft-card--plain ft-card--positive ft-public-page__scope-card">
                <p className="ft-card-title-top">{content.scopePanel.canHelp}</p>
                <ul className="ft-list ft-public-page__list">
                  {content.supportScope.canHelp.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="ft-card ft-card--plain ft-card--negative ft-public-page__scope-card">
                <p className="ft-card-title-top">{content.scopePanel.cannotHelp}</p>
                <ul className="ft-list ft-public-page__list">
                  {content.supportScope.cannotHelp.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </article>
      </div>

      <article className="ft-card ft-card--strong ft-public-page__contact-panel">
        <div className="ft-grid ft-grid--2-even ft-public-page__contact-grid">
          <div className="ft-stack ft-stack--md">
            <div className="ft-stack ft-stack--xs">
              <p className="ft-overline">{content.contactPanel.eyebrow}</p>
              <h2 className="ft-subtitle">{content.contactPanel.title}</h2>
            </div>
            <p className="ft-text">{content.contactPanel.body}</p>
          </div>

          <div className="ft-stack ft-stack--md">
            <article className="ft-card ft-card--plain ft-public-page__contact-card">
              <p className="ft-card-title-top">{content.contactPanel.emailTitle}</p>
              {officialSupportEmail ? (
                <LoaderLink className="ft-link" href={`mailto:${officialSupportEmail}`} showLinkIcon>
                  {officialSupportEmail}
                </LoaderLink>
              ) : (
                <p className="ft-text">{content.contactPanel.emailMissing}</p>
              )}
            </article>

            <article className="ft-card ft-card--plain ft-public-page__contact-card">
              <p className="ft-card-title-top">{content.contactPanel.securityTitle}</p>
              <p className="ft-text">{content.contactPanel.securityBody}</p>
            </article>
          </div>
        </div>
      </article>
    </PublicPageShell>
  );
}

export default function SupportPage() {
  return <SupportPageView />;
}
