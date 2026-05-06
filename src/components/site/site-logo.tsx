import type { ReactNode } from "react";
import { AnimatedBrandMark } from "@/components/site/animated-brand-mark";
import { LoaderLink } from "@/components/site/loader-link";
import { RotatingTagline } from "@/components/site/rotating-tagline";

export function SiteLogo({
  compact = false,
  secondary,
}: {
  compact?: boolean;
  secondary?: ReactNode;
}) {
  return (
    <LoaderLink className={`ft-brand ${compact ? "is-compact" : ""}`} href="/">
      <span className="ft-brand-media">
        <AnimatedBrandMark compact={compact} />
      </span>

      <span className="ft-brand-copy">
        <span className="ft-brand-copy__eyebrow">4TEEN on TRON</span>
        <RotatingTagline compact={compact} />
        {secondary ? <span className="ft-brand-copy__secondary">{secondary}</span> : null}
      </span>
    </LoaderLink>
  );
}
