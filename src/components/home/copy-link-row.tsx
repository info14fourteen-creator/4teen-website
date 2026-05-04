"use client";

import { useState } from "react";
import { getChromeContent } from "@/content/chrome-content";
import { useCurrentSiteLocale } from "@/lib/use-current-site-locale";

export function CopyLinkRow({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  const chrome = getChromeContent(useCurrentSiteLocale());
  const [buttonText, setButtonText] = useState(chrome.common.copy);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(href);
      setButtonText(chrome.common.copied);
    } catch {
      setButtonText(chrome.common.failed);
    }

    window.setTimeout(() => {
      setButtonText(chrome.common.copy);
    }, 1400);
  }

  return (
    <div className="ft-copy-row">
      <a className="ft-verify-link" href={href} rel="noreferrer" target="_blank">
        <span className="ft-verify-link__copy">
          <span className="ft-verify-link__label">{label}</span>
          <span className="ft-verify-link__value">{value}</span>
        </span>
      </a>
      <button
        className="ft-copy-btn"
        data-copy-success={chrome.common.copied}
        onClick={handleCopy}
        type="button"
      >
        {buttonText}
      </button>
    </div>
  );
}
