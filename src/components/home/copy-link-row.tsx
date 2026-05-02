"use client";

import { useState } from "react";

export function CopyLinkRow({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  const [buttonText, setButtonText] = useState("Copy");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(href);
      setButtonText("Copied");
    } catch {
      setButtonText("Failed");
    }

    window.setTimeout(() => {
      setButtonText("Copy");
    }, 1400);
  }

  return (
    <div className="ft-copy-row">
      <a className="ft-verify-link" href={href} rel="noreferrer" target="_blank">
        <span className="ft-verify-link__label">{label}</span>
        <span className="ft-verify-link__value">{value}</span>
      </a>
      <button className="ft-copy-btn" onClick={handleCopy} type="button">
        {buttonText}
      </button>
    </div>
  );
}
