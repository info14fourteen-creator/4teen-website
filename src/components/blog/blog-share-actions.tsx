"use client";

import { useMemo, useState } from "react";

type ShareNetwork = {
  label: string;
  mode: "link" | "copy";
  href?: string;
};

function buildShareText(title: string, description: string, url: string) {
  return `${title}\n\n${description}\n\n${url}`;
}

export function BlogShareActions({
  description,
  title,
  url,
}: {
  description: string;
  title: string;
  url: string;
}) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const shareText = useMemo(
    () => buildShareText(title, description, url),
    [description, title, url],
  );

  const networks = useMemo<ShareNetwork[]>(
    () => [
      {
        label: "Telegram",
        mode: "link",
        href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
          `${title}\n\n${description}`,
        )}`,
      },
      {
        label: "Discord",
        mode: "copy",
      },
      {
        label: "Facebook",
        mode: "link",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      },
      {
        label: "Instagram",
        mode: "copy",
      },
      {
        label: "Threads",
        mode: "link",
        href: `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`,
      },
      {
        label: "WhatsApp",
        mode: "link",
        href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      },
    ],
    [description, shareText, title, url],
  );

  async function handleCopy(label: string) {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedLabel(label);
    } catch {
      setCopiedLabel(`${label} failed`);
    }

    window.setTimeout(() => {
      setCopiedLabel(null);
    }, 1600);
  }

  return (
    <div className="ft-blog-share">
      {networks.map((network) =>
        network.mode === "link" && network.href ? (
          <a
            key={network.label}
            className="ft-blog-share__button"
            href={network.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {network.label}
          </a>
        ) : (
          <button
            key={network.label}
            className="ft-blog-share__button"
            onClick={() => handleCopy(network.label)}
            type="button"
          >
            {copiedLabel === network.label ? "Copied" : network.label}
          </button>
        ),
      )}
    </div>
  );
}
