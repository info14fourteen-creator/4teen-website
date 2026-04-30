import Image from "next/image";
import { LoaderLink } from "@/components/site/loader-link";
import { RotatingTagline } from "@/components/site/rotating-tagline";

export function SiteLogo({ compact = false }: { compact?: boolean }) {
  return (
    <LoaderLink className={`ft-brand ${compact ? "is-compact" : ""}`} href="/">
      <span className="ft-brand-media">
        <span className="ft-brand-icon">
          <Image
            alt="4TEEN"
            height={compact ? 34 : 44}
            priority
            src={compact ? "/brand/logo-mark.svg" : "/brand/logo.svg"}
            width={compact ? 34 : 44}
          />
        </span>
      </span>

      <span className="ft-brand-copy">
        <RotatingTagline compact={compact} />
      </span>
    </LoaderLink>
  );
}
