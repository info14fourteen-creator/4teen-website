"use client";

import { useMemo, useState } from "react";
import { getChromeContent } from "@/content/chrome-content";
import type { SiteSnapshotKey } from "@/lib/server-site-snapshot";
import { useCurrentSiteLocale } from "@/lib/use-current-site-locale";

const REFRESH_REQUEST_TIMEOUT_MS = 6000;
const HARD_RELOAD_DELAY_MS = 180;

export function SiteSnapshotRefresh({
  snapshotKeys,
  label,
}: {
  snapshotKeys: SiteSnapshotKey[];
  label?: string;
}) {
  const chrome = getChromeContent(useCurrentSiteLocale());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const uniqueSnapshotKeys = useMemo(
    () => Array.from(new Set(snapshotKeys)),
    [snapshotKeys],
  );

  async function refreshSnapshot(snapshotKey: SiteSnapshotKey) {
    const controller = new AbortController();
    const abortId = window.setTimeout(() => {
      controller.abort();
    }, REFRESH_REQUEST_TIMEOUT_MS);

    try {
      await fetch(`/api/site/${snapshotKey}?refresh=1`, {
        cache: "no-store",
        signal: controller.signal,
      });
    } catch {
      return null;
    } finally {
      window.clearTimeout(abortId);
    }

    return null;
  }

  async function handleRefresh() {
    if (isRefreshing || uniqueSnapshotKeys.length === 0) return;

    setIsRefreshing(true);

    try {
      await Promise.allSettled(
        uniqueSnapshotKeys.map((snapshotKey) => refreshSnapshot(snapshotKey)),
      );
    } finally {
      window.setTimeout(() => {
        setIsRefreshing(false);
        window.location.reload();
      }, HARD_RELOAD_DELAY_MS);
    }
  }

  return (
    <button
      aria-label={chrome.refresh.aria}
      aria-busy={isRefreshing}
      className={`ft-snapshot-refresh ${isRefreshing ? "is-refreshing" : ""}`}
      disabled={isRefreshing}
      onClick={() => {
        void handleRefresh();
      }}
      type="button"
    >
      <span
        aria-hidden="true"
        className={`ft-snapshot-refresh__icon ${isRefreshing ? "is-spinning" : ""}`}
      >
        ↻
      </span>
      <span>{isRefreshing ? chrome.refresh.busy : (label ?? chrome.refresh.idle)}</span>
    </button>
  );
}
