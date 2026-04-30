import Image from "next/image";
import { LoaderLink } from "@/components/site/loader-link";

const socialLinks = [
  { label: "Telegram", href: "https://t.me/fourteentoken", icon: "/socials/telegram_social.svg" },
  { label: "Discord", href: "https://discord.gg/jWZF6KzPCB", icon: "/socials/discord_social.svg" },
  { label: "X", href: "https://x.com/4teen_me", icon: "/socials/x_social.svg" },
  { label: "Facebook", href: "https://facebook.com/Fourteentoken", icon: "/socials/facebook_social.svg" },
  { label: "Instagram", href: "https://instagram.com/fourteentoken", icon: "/socials/instagram_social.svg" },
  { label: "Threads", href: "https://www.threads.com/@fourteentoken", icon: "/socials/threads_social.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/@4teentoken", icon: "/socials/tiktok_social.svg" },
  { label: "YouTube", href: "https://www.youtube.com/@4teentoken", icon: "/socials/youtube_social.svg" },
  { label: "WhatsApp", href: "https://wa.me/16462178070", icon: "/socials/whatsapp_social.svg" },
  { label: "GitHub", href: "https://github.com/info14fourteen-creator", icon: "/socials/github_social.svg" },
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

export function SiteFooter() {
  return (
    <footer className="ft-site-footer">
      <div className="ft-container--wide ft-site-footer__grid">
        <div className="ft-site-footer__brand">
          <LoaderLink className="ft-site-footer__logo" href="/">
            <Image
              alt="4TEEN"
              className="ft-site-footer__logo-mark"
              height={46}
              src="/brand/logo.svg"
              width={46}
            />
            <span className="ft-site-footer__logo-copy">
              <span className="ft-site-footer__eyebrow">4TEEN</span>
              <span className="ft-site-footer__title">Protocol / Tools / Ambassadors</span>
            </span>
          </LoaderLink>

          <p className="ft-site-footer__text">
            Mint-on-purchase entry, 14-day lock visibility, controller-side
            liquidity logic, ambassador accounting, and staged airdrop
            distribution on TRON.
          </p>
        </div>

        <div className="ft-site-footer__nav">
          {footerColumns.map((column) => (
            <div key={column.title} className="ft-site-footer__column">
              <p className="ft-site-footer__column-title">{column.title}</p>
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
          <p className="ft-site-footer__column-title">Official Channels</p>
          <div className="ft-site-footer__social-grid">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                className="ft-site-footer__social"
                href={social.href}
                rel="noreferrer"
                target="_blank"
              >
                <span className="ft-site-footer__social-icon">
                  <Image
                    alt={social.label}
                    height={28}
                    src={social.icon}
                    width={28}
                  />
                </span>
                <span className="ft-site-footer__social-label">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ft-container--wide ft-site-footer__bottom">
        <span>© 2026 4TEEN. Structured on-chain entry on TRON.</span>
        <span>Official website: 4teen.me</span>
      </div>
    </footer>
  );
}
