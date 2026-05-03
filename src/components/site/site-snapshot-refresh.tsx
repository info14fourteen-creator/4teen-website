"use client";

import { useRouter } from "next/navigation";
import { startTransition, useMemo, useState } from "react";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";
import {
  resolveFourteenLoader,
  triggerFourteenLoader,
} from "@/components/site/loader-link";
import { getChromeContent } from "@/content/chrome-content";
import refreshAnimationData from "@/assets/lottie/site-refresh-rotate-loop.json";
import { defaultSiteLocale } from "@/lib/site-locale";
import type { SiteSnapshotKey } from "@/lib/server-site-snapshot";

const RESET_DELAY_MS = 900;

export function SiteSnapshotRefresh({
  snapshotKeys,
  label,
}: {
  snapshotKeys: SiteSnapshotKey[];
  label?: string;
}) {
  const router = useRouter();
  const chrome = getChromeContent(defaultSiteLocale);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const uniqueSnapshotKeys = useMemo(
    () => Array.from(new Set(snapshotKeys)),
    [snapshotKeys],
  );

  async function handleRefresh() {
    if (isRefreshing || uniqueSnapshotKeys.length === 0) return;

    setIsRefreshing(true);
    triggerFourteenLoader();

    try {
      await Promise.all(
        uniqueSnapshotKeys.map(async (snapshotKey) => {
          try {
            await fetch(`/api/site/${snapshotKey}?refresh=1`, {
              cache: "no-store",
            });
          } catch {
            return null;
          }

          return null;
        }),
      );

      startTransition(() => {
        router.refresh();
      });
    } finally {
      window.setTimeout(() => {
        setIsRefreshing(false);
        resolveFourteenLoader();
      }, RESET_DELAY_MS);
    }
  }

  return (
    <button
      aria-label={chrome.refresh.aria}
      className={`ft-snapshot-refresh ${isRefreshing ? "is-refreshing" : ""}`}
      onClick={() => {
        void handleRefresh();
      }}
      type="button"
    >
      <AnimatedLottieIcon
        animationData={refreshAnimationData}
        className="ft-snapshot-refresh__icon"
        loop={isRefreshing}
        playOnHover={!isRefreshing}
      />
      <span>{isRefreshing ? chrome.refresh.busy : (label ?? chrome.refresh.idle)}</span>
    </button>
  );
}
