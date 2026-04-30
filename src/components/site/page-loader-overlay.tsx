"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FourteenLoader } from "@/components/site/fourteen-loader";
import { FOURTEEN_LOADER_EVENT } from "@/components/site/loader-link";

const INITIAL_DURATION_MS = 900;
const TRANSITION_DURATION_MS = 760;

export function PageLoaderOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(true);
  const mountedRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive(false);
      window.setTimeout(() => setVisible(false), 260);
    }, INITIAL_DURATION_MS);

    mountedRef.current = true;

    return () => {
      window.clearTimeout(timer);
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;

    setVisible(true);
    setActive(true);

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      setActive(false);
      window.setTimeout(() => setVisible(false), 240);
    }, 240);
  }, [pathname]);

  useEffect(() => {
    const handleStart = () => {
      setVisible(true);
      setActive(true);

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setActive(false);
        window.setTimeout(() => setVisible(false), 240);
      }, TRANSITION_DURATION_MS);
    };

    window.addEventListener(FOURTEEN_LOADER_EVENT, handleStart);
    return () => {
      window.removeEventListener(FOURTEEN_LOADER_EVENT, handleStart);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`ft-page-loader ${active ? "is-active" : "is-leaving"}`}
    >
      <div className="ft-page-loader__scrim" />
      <div className="ft-page-loader__core">
        <FourteenLoader />
      </div>
    </div>
  );
}
