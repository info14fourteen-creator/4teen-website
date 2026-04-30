import Image from "next/image";
import Link from "next/link";

export function SiteLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="ft-brand" href="/">
      <span className="ft-brand-icon">
        <Image
          alt="4TEEN"
          height={compact ? 34 : 44}
          priority
          src={compact ? "/brand/logo-mark.svg" : "/brand/logo.svg"}
          width={compact ? 34 : 44}
        />
      </span>

      <span className="ft-brand-copy">
        <span className="ft-brand-mark">4TEEN</span>
        <span className="ft-brand-sub">
          {compact ? "Protocol site" : "Protocol / Tools / Ambassadors"}
        </span>
      </span>
    </Link>
  );
}
