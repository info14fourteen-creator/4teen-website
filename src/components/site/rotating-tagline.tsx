import { getChromeContent } from "@/content/chrome-content";
import { defaultSiteLocale } from "@/lib/site-locale";

export function RotatingTagline({ compact = false }: { compact?: boolean }) {
  const taglines = getChromeContent(defaultSiteLocale).taglines;

  return (
    <span
      aria-label={taglines[0]}
      className={`ft-tagline-rotator ${compact ? "is-compact" : ""}`}
    >
      {taglines.map((tagline) => (
        <span key={tagline} className="ft-tagline-rotator__line">
          {tagline}
        </span>
      ))}
    </span>
  );
}
