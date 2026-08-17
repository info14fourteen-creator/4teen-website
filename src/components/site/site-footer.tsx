"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { LoaderLink } from "@/components/site/loader-link";
import { SocialLottieLink } from "@/components/site/social-lottie-link";
import { getChromeContent } from "@/content/chrome-content";
import { getNavContent } from "@/content/nav-content";
import {
  officialDunsNumber,
  officialDunsRegisteredUrl,
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
  { label: "Telegram", href: officialSocialUrls.telegram, animationUrl: "/lottie/social-telegram-hover.json" },
  { label: "Discord", href: officialSocialUrls.discord, animationUrl: "/lottie/social-discord-hover.json" },
  { label: "X", href: officialSocialUrls.x, animationUrl: "/lottie/social-x-hover.json" },
  { label: "Facebook", href: officialSocialUrls.facebook, animationUrl: "/lottie/social-facebook-hover.json" },
  { label: "Instagram", href: officialSocialUrls.instagram, animationUrl: "/lottie/social-instagram-hover.json" },
  { label: "Threads", href: officialSocialUrls.threads, animationUrl: "/lottie/social-threads-hover.json" },
  { label: "TikTok", href: officialSocialUrls.tiktok, animationUrl: "/lottie/social-tiktok-hover.json" },
  { label: "YouTube", href: officialSocialUrls.youtube, animationUrl: "/lottie/social-youtube-hover.json" },
  { label: "WhatsApp", href: officialSocialUrls.whatsapp, animationUrl: "/lottie/social-whatsapp-hover.json" },
  { label: "GitHub", href: officialSocialUrls.github, animationUrl: "/lottie/social-github-hover.json" },
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
                  animationUrl={social.animationUrl}
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
            <LoaderLink
              className="ft-site-footer__meta-link"
              href={officialDunsRegisteredUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {officialLegalEntityShortName} · D-U-N-S® {officialDunsNumber}
            </LoaderLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
