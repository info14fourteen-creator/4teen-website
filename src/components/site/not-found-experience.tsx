"use client";

import notFoundFourKey from "@/assets/lottie/not-found-four-key-hover-press.json";
import notFoundZeroKey from "@/assets/lottie/not-found-zero-key-hover-press.json";
import {
  AnimatedLottieIcon,
  getLottieDurationMs,
  type AnimatedLottieIconApi,
} from "@/components/site/animated-lottie-icon";
import { LoaderLink } from "@/components/site/loader-link";
import { localizeSiteHref } from "@/lib/site-locale";
import { useCurrentSiteLocale } from "@/lib/use-current-site-locale";
import { useEffect, useMemo, useRef, useState } from "react";

const FOUR_DELAY_MS = 190;
const ZERO_DELAY_MS = 380;
const TYPE_SPEED_MS = 28;
const DELETE_SPEED_MS = 18;
const HOLD_FULL_MS = 1300;
const HOLD_EMPTY_MS = 220;

const localizedCopy = {
  en: {
    kicker: "404 · route not found",
    title: "This route never reached a usable state.",
    body: "The link may be stale, incomplete, or simply broken. Instead of leaving raw errors on the screen, we cut it back to one clean path home.",
    cta: "Home",
  },
  ru: {
    kicker: "404 · маршрут не найден",
    title: "Этот маршрут не дошёл до рабочего состояния.",
    body: "Ссылка могла устареть, сломаться или просто собраться некорректно. Вместо сырой свалки ошибок здесь остаётся один чистый путь домой.",
    cta: "Главная",
  },
  uz: {
    kicker: "404 · yo'l topilmadi",
    title: "Bu yo'l ishlaydigan holatga yetib kelmadi.",
    body: "Havola eskirgan, buzilgan yoki shunchaki noto'g'ri yig'ilgan bo'lishi mumkin. Xom xatolar o'rniga bu yerda faqat bitta toza yo'l uyga olib boradi.",
    cta: "Bosh sahifa",
  },
} as const;

const typewriterLines = [
  {
    locale: "en",
    label: "EN",
    text: "Page not found. Home puts you back on the main rail.",
  },
  {
    locale: "ru",
    label: "RU",
    text: "Страница не найдена. Главная вернёт вас на основной маршрут.",
  },
  {
    locale: "uz",
    label: "UZ",
    text: "Sahifa topilmadi. Bosh sahifa sizni asosiy yo'lga qaytaradi.",
  },
] as const;

function NotFoundKeys() {
  const firstFourRef = useRef<AnimatedLottieIconApi | null>(null);
  const zeroRef = useRef<AnimatedLottieIconApi | null>(null);
  const lastFourRef = useRef<AnimatedLottieIconApi | null>(null);
  const cycleDuration = useMemo(() => {
    const base = Math.max(
      getLottieDurationMs(notFoundFourKey),
      getLottieDurationMs(notFoundZeroKey),
    );

    return base + 2100;
  }, []);

  useEffect(() => {
    let cycleTimer: number | null = null;
    let frameTimers: number[] = [];

    function runSequence() {
      firstFourRef.current?.playOnce();

      frameTimers = [
        window.setTimeout(() => {
          zeroRef.current?.playOnce();
        }, FOUR_DELAY_MS),
        window.setTimeout(() => {
          lastFourRef.current?.playOnce();
        }, ZERO_DELAY_MS),
      ];

      cycleTimer = window.setTimeout(runSequence, cycleDuration);
    }

    runSequence();

    return () => {
      if (cycleTimer) {
        window.clearTimeout(cycleTimer);
      }

      for (const timer of frameTimers) {
        window.clearTimeout(timer);
      }
    };
  }, [cycleDuration]);

  return (
    <div aria-label="404" className="ft-404-keys" role="img">
      <span className="ft-404-key">
        <AnimatedLottieIcon
          animationData={notFoundFourKey}
          apiRef={firstFourRef}
          className="ft-404-key__icon"
        />
      </span>
      <span className="ft-404-key">
        <AnimatedLottieIcon
          animationData={notFoundZeroKey}
          apiRef={zeroRef}
          className="ft-404-key__icon"
        />
      </span>
      <span className="ft-404-key">
        <AnimatedLottieIcon
          animationData={notFoundFourKey}
          apiRef={lastFourRef}
          className="ft-404-key__icon"
        />
      </span>
    </div>
  );
}

function TypewriterLines({ locale }: { locale: keyof typeof localizedCopy }) {
  const orderedLines = useMemo(() => {
    const currentIndex = typewriterLines.findIndex((line) => line.locale === locale);

    if (currentIndex <= 0) {
      return typewriterLines;
    }

    return [
      ...typewriterLines.slice(currentIndex),
      ...typewriterLines.slice(0, currentIndex),
    ];
  }, [locale]);
  const [lineIndex, setLineIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const activeLine = orderedLines[lineIndex];

  useEffect(() => {
    setLineIndex(0);
    setVisibleLength(0);
    setIsDeleting(false);
  }, [orderedLines]);

  useEffect(() => {
    const fullLength = activeLine.text.length;

    if (!isDeleting && visibleLength < fullLength) {
      const timer = window.setTimeout(() => {
        setVisibleLength((value) => value + 1);
      }, TYPE_SPEED_MS);

      return () => window.clearTimeout(timer);
    }

    if (!isDeleting && visibleLength === fullLength) {
      const timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, HOLD_FULL_MS);

      return () => window.clearTimeout(timer);
    }

    if (isDeleting && visibleLength > 0) {
      const timer = window.setTimeout(() => {
        setVisibleLength((value) => value - 1);
      }, DELETE_SPEED_MS);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setIsDeleting(false);
      setLineIndex((value) => (value + 1) % orderedLines.length);
    }, HOLD_EMPTY_MS);

    return () => window.clearTimeout(timer);
  }, [activeLine.text.length, isDeleting, orderedLines.length, visibleLength]);

  return (
    <div className="ft-404-typewriter" aria-live="polite">
      <span className="ft-404-typewriter__label">{activeLine.label}</span>
      <span className="ft-404-typewriter__text">
        {activeLine.text.slice(0, visibleLength)}
        <span className="ft-404-typewriter__caret" />
      </span>
    </div>
  );
}

export function NotFoundExperience() {
  const locale = useCurrentSiteLocale();
  const copy = localizedCopy[locale];
  const homeHref = localizeSiteHref("/", locale);

  return (
    <main className="ft-not-found-page">
      <section className="ft-not-found-shell">
        <div className="ft-not-found-panel">
          <NotFoundKeys />

          <div className="ft-not-found-copy">
            <p className="ft-not-found-kicker">{copy.kicker}</p>
            <h1 className="ft-not-found-title">{copy.title}</h1>
            <p className="ft-not-found-body">{copy.body}</p>
            <TypewriterLines locale={locale} />
            <LoaderLink className="ft-not-found-home" href={homeHref} triggerLoader>
              {copy.cta}
            </LoaderLink>
          </div>
        </div>
      </section>
    </main>
  );
}
