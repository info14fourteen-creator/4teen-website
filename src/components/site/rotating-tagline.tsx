import { getChromeContent } from "@/content/chrome-content";
import { useCurrentSiteLocale } from "@/lib/use-current-site-locale";

export function RotatingTagline({ compact = false }: { compact?: boolean }) {
  const taglines = getChromeContent(useCurrentSiteLocale()).taglines;

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
