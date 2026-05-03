"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import noteDropcapAccent from "@/assets/lottie/note-dropcap-accent.json";
import {
  AnimatedLottieIcon,
  type AnimatedLottieIconApi,
} from "@/components/site/animated-lottie-icon";

const NOTE_SELECTOR = ".ft-note";

function shouldAccentNote(element: Element) {
  if (!(element instanceof HTMLElement)) return false;
  if (!element.isConnected) return false;
  if (element.closest(".ft-note__accent-mount")) return false;
  if (element.dataset.noteAccentDisabled === "true") return false;

  const text = element.innerText.replace(/\s+/g, " ").trim();

  return text.length >= 36;
}

function listsMatch(a: HTMLElement[], b: HTMLElement[]) {
  if (a.length !== b.length) return false;

  return a.every((element, index) => element === b[index]);
}

function collectNotes() {
  return Array.from(document.querySelectorAll(NOTE_SELECTOR)).filter(shouldAccentNote) as HTMLElement[];
}

function NoteAccentPortal({ target }: { target: HTMLElement }) {
  const apiRef = useRef<AnimatedLottieIconApi | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    target.classList.add("has-accent");

    return () => {
      target.classList.remove("has-accent");
    };
  }, [target]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (hasPlayedRef.current) return;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          hasPlayedRef.current = true;
          apiRef.current?.playOnce();
          observer.disconnect();
          break;
        }
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return createPortal(
    <span aria-hidden="true" className="ft-note__accent-mount">
      <span className="ft-note__accent">
        <AnimatedLottieIcon
          animationData={noteDropcapAccent}
          apiRef={apiRef}
          className="ft-note__accent-icon"
        />
      </span>
    </span>,
    target,
  );
}

export function SiteNoteAccents() {
  const [targets, setTargets] = useState<HTMLElement[]>([]);

  useEffect(() => {
    function syncTargets() {
      const nextTargets = collectNotes();

      setTargets((previousTargets) => (listsMatch(previousTargets, nextTargets) ? previousTargets : nextTargets));
    }

    syncTargets();

    const observer = new MutationObserver(() => {
      syncTargets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const portals = useMemo(
    () =>
      targets.map((target, index) => (
        <NoteAccentPortal
          key={target.dataset.noteAccentKey ?? `${target.tagName}-${index}-${target.innerText.slice(0, 24)}`}
          target={target}
        />
      )),
    [targets],
  );

  return <>{portals}</>;
}
