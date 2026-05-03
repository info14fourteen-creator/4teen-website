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
import { defaultSiteLocale } from "@/lib/site-locale";

const socialLinks = [
  { label: "Telegram", href: "https://t.me/fourteentoken", animationData: socialTelegramHover },
  { label: "Discord", href: "https://discord.gg/jWZF6KzPCB", animationData: socialDiscordHover },
  { label: "X", href: "https://x.com/4teen_me", animationData: socialXHover },
  { label: "Facebook", href: "https://facebook.com/Fourteentoken", animationData: socialFacebookHover },
  { label: "Instagram", href: "https://instagram.com/fourteentoken", animationData: socialInstagramHover },
  { label: "Threads", href: "https://www.threads.com/@fourteentoken", animationData: socialThreadsHover },
  { label: "TikTok", href: "https://www.tiktok.com/@4teentoken", animationData: socialTiktokHover },
  { label: "YouTube", href: "https://www.youtube.com/@4teentoken", animationData: socialYoutubeHover },
  { label: "WhatsApp", href: "https://wa.me/16462178070", animationData: socialWhatsappHover },
  { label: "GitHub", href: "https://github.com/info14fourteen-creator", animationData: socialGithubHover },
];

const footerColumns = [
  {
    title: "Protocol",
    links: [
      { href: "/buy", label: "Direct Buy" },
      { href: "/unlock", label: "Unlock Timeline" },
      { href: "/liquidity", label: "Liquidity" },
      { href: "/airdrop", label: "Airdrop" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { href: "/ambassadors", label: "Ambassadors" },
      { href: "/verification", label: "Verification" },
      { href: "/whitepaper", label: "Whitepaper" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

const footerMetaLinks = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/support", key: "support" },
] as const;

export function SiteFooter() {
  const chrome = getChromeContent(defaultSiteLocale);
  return (
    <footer className="ft-site-footer">
      <div className="ft-site-footer__glass">
        <div className="ft-container--wide ft-site-footer__grid">
          <div className="ft-site-footer__brand">
            <p className="ft-site-footer__text">{chrome.footer.brandText}</p>

            <LoaderLink className="ft-site-footer__brand-link" href="/app">
              {chrome.footer.getApp}
            </LoaderLink>
          </div>

          <div className="ft-site-footer__nav">
            {footerColumns.map((column) => (
              <div key={column.title} className="ft-site-footer__column">
                <p className="ft-site-footer__column-title">
                  {column.title === "Protocol" ? chrome.footer.protocol : chrome.footer.ecosystem}
                </p>
                <div className="ft-site-footer__links">
                  {column.links.map((link) => (
                    <LoaderLink
                      key={link.href}
                      className="ft-site-footer__link"
                      href={link.href}
                    >
                      {link.label}
                    </LoaderLink>
                  ))}
                </div>
              </div>
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
          <span>{chrome.footer.copyright}</span>
          <div className="ft-site-footer__meta-links">
            {footerMetaLinks.map((link) => (
              <LoaderLink key={link.href} className="ft-site-footer__meta-link" href={link.href}>
                {chrome.footer[link.key]}
              </LoaderLink>
            ))}
          </div>
          <span>{chrome.footer.officialWebsite}</span>
        </div>
      </div>
    </footer>
  );
}
