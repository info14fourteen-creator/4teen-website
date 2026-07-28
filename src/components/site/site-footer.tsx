"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { LoaderLink } from "@/components/site/loader-link";
import { SocialLottieLink } from "@/components/site/social-lottie-link";
import socialDiscordHover from "@/assets/lottie/social-discord-hover.json";
import socialFacebookHover from "@/assets/lottie/social-facebook-hover.json";
import socialGithubHover from "@/assets/lottie/social-github-hover.json";
import socialInstagramHover from "@/assets/lottie/social-instagram-hover.json";
import socialTelegramHover from "@/assets/lottie/social-telegram-hover.json";
import socialThreadsHover from "@/assets/lottie/social-threads-hover.json";
import socialTiktokHover from "@/assets/lottie/social-tiktok-hover.json";
import socialWhatsappHover from "@/assets/lottie/social-whatsapp-hover.json";
import socialXHover from "@/assets/lottie/social-x-hover.json";
import socialYoutubeHover from "@/assets/lottie/social-youtube-hover.json";
import { getChromeContent } from "@/content/chrome-content";
import { getNavContent } from "@/content/nav-content";
import {
  officialDunsNumber,
  officialLegalEntityShortName,
  officialSocialUrls,
  officialSupportEmail,
  officialSupportPhoneDisplay,
  officialSupportPhoneLink,
  officialTronixRentUrl,
} from "@/content/official-links";
import { stripSiteLocaleSegment } from "@/lib/site-locale";
import { useCurrentSiteLocale } from "@/lib/use-current-site-locale";

const socialLinks = [
  { label: "Telegram", href: officialSocialUrls.telegram, animationData: socialTelegramHover },
  { label: "Discord", href: officialSocialUrls.discord, animationData: socialDiscordHover },
  { label: "X", href: officialSocialUrls.x, animationData: socialXHover },
  { label: "Facebook", href: officialSocialUrls.facebook, animationData: socialFacebookHover },
  { label: "Instagram", href: officialSocialUrls.instagram, animationData: socialInstagramHover },
  { label: "Threads", href: officialSocialUrls.threads, animationData: socialThreadsHover },
  { label: "TikTok", href: officialSocialUrls.tiktok, animationData: socialTiktokHover },
  { label: "YouTube", href: officialSocialUrls.youtube, animationData: socialYoutubeHover },
  { label: "WhatsApp", href: officialSocialUrls.whatsapp, animationData: socialWhatsappHover },
  { label: "GitHub", href: officialSocialUrls.github, animationData: socialGithubHover },
];

const footerColumns = [
  {
    key: "protocol",
    links: [
      { href: "/buy", key: "buy" },
      { href: "/unlock", key: "unlock" },
      { href: "/liquidity", key: "liquidity" },
      { href: "/swap", key: "swap" },
    ],
  },
  {
    key: "ecosystem",
    links: [
      { href: "/airdrop", key: "airdrop" },
      { href: "/ambassadors", key: "ambassadors" },
      { href: "/verification", key: "verification" },
      { href: "/whitepaper", key: "whitepaper" },
      { href: "/blog", key: "blog" },
    ],
  },
] as const;

const footerMetaLinks = [
  { href: "/deck", key: "investorDeck" },
  { href: "/one-pager", key: "onePager" },
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/support", key: "support" },
] as const;

const footerProjectLinks = [
  { href: officialTronixRentUrl, label: "TronixRent" },
] as const;

const footerNavRows = Array.from(
  { length: Math.max(...footerColumns.map((column) => column.links.length)) },
  (_, rowIndex) => footerColumns.map((column) => column.links[rowIndex] ?? null),
);

export function SiteFooter({
  includeOnWhitepaper = false,
}: {
  includeOnWhitepaper?: boolean;
}) {
  const locale = useCurrentSiteLocale();
  const chrome = getChromeContent(locale);
  const nav = getNavContent(locale);
  const routePath = stripSiteLocaleSegment(usePathname() ?? "/");

  if (!includeOnWhitepaper && routePath.startsWith("/whitepaper")) {
    return null;
  }

  return (
    <footer className="ft-site-footer">
      <div className="ft-site-footer__glass">
        <div className="ft-container--wide ft-site-footer__grid">
          <div className="ft-site-footer__brand">
            <p className="ft-site-footer__text">{chrome.footer.brandText}</p>
            <div className="ft-site-footer__brand-actions">
              <LoaderLink className="ft-site-footer__brand-link" href="/app">
                {chrome.footer.getApp}
              </LoaderLink>
              <LoaderLink
                className="ft-site-footer__brand-link ft-site-footer__brand-link--secondary"
                href="/deck"
              >
                {chrome.footer.investorDeck}
              </LoaderLink>
            </div>
          </div>

          <div className="ft-site-footer__nav">
            {footerColumns.map((column) => (
              <p key={column.key} className="ft-site-footer__column-title">
                {column.key === "protocol" ? chrome.footer.protocol : chrome.footer.ecosystem}
              </p>
            ))}

            {footerNavRows.map((row, rowIndex) => (
              <Fragment key={`footer-nav-row-${rowIndex}`}>
                {row.map((link, columnIndex) =>
                  link ? (
                    <LoaderLink
                      key={link.href}
                      className="ft-site-footer__link"
                      href={link.href}
                    >
                      {nav.links[link.key]}
                    </LoaderLink>
                  ) : (
                    <span
                      key={`footer-nav-placeholder-${rowIndex}-${columnIndex}`}
                      aria-hidden="true"
                      className="ft-site-footer__link-placeholder"
                    />
                  ),
                )}
              </Fragment>
            ))}
          </div>

          <div className="ft-site-footer__socials">
            <p className="ft-site-footer__column-title">{chrome.footer.officialChannels}</p>
            <div className="ft-site-footer__social-grid">
              {socialLinks.map((social) => (
                <SocialLottieLink
                  key={social.label}
                  animationData={social.animationData}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="ft-container--wide ft-site-footer__bottom">
          <div className="ft-site-footer__legal-stack">
            <span>{chrome.footer.copyright}</span>
            <span>{officialLegalEntityShortName} · D-U-N-S® {officialDunsNumber}</span>
          </div>
          <div className="ft-site-footer__meta-links">
            {footerMetaLinks.map((link) => (
              <LoaderLink key={link.href} className="ft-site-footer__meta-link" href={link.href}>
                {chrome.footer[link.key]}
              </LoaderLink>
            ))}
            {footerProjectLinks.map((link) => (
              <LoaderLink
                key={link.href}
                className="ft-site-footer__meta-link"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </LoaderLink>
            ))}
          </div>
          <div className="ft-site-footer__trust-stack">
            <span>{chrome.footer.officialWebsite}</span>
            <LoaderLink className="ft-site-footer__meta-link" href={`mailto:${officialSupportEmail}`}>
              {officialSupportEmail}
            </LoaderLink>
            <LoaderLink className="ft-site-footer__meta-link" href={officialSupportPhoneLink}>
              {officialSupportPhoneDisplay}
            </LoaderLink>
            <iframe
              aria-label="Dun & Bradstreet registered mini seal"
              className="ft-site-footer__duns-seal"
              height="43"
              loading="lazy"
              scrolling="no"
              src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
              title="Dun & Bradstreet registered mini seal"
              width="49"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
