import { LoaderLink } from "@/components/site/loader-link";
import { getChromeContent } from "@/content/chrome-content";
import { defaultSiteLocale } from "@/lib/site-locale";

const socialLinks = [
  { label: "Telegram", href: "https://t.me/fourteentoken" },
  { label: "Discord", href: "https://discord.gg/jWZF6KzPCB" },
  { label: "X", href: "https://x.com/4teen_me" },
  { label: "Facebook", href: "https://facebook.com/Fourteentoken" },
  { label: "Instagram", href: "https://instagram.com/fourteentoken" },
  { label: "Threads", href: "https://www.threads.com/@fourteentoken" },
  { label: "TikTok", href: "https://www.tiktok.com/@4teentoken" },
  { label: "YouTube", href: "https://www.youtube.com/@4teentoken" },
  { label: "WhatsApp", href: "https://wa.me/16462178070" },
  { label: "GitHub", href: "https://github.com/info14fourteen-creator" },
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
                <a
                  key={social.label}
                  className="ft-site-footer__social"
                  href={social.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="ft-site-footer__social-label">{social.label}</span>
                </a>
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
