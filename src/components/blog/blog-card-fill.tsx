"use client";

import { useLayoutEffect, useRef, useState } from "react";

function getTitleLineCount(element: HTMLElement) {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = Number.parseFloat(computedStyle.lineHeight);

  if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
    return 3;
  }

  return Math.max(1, Math.round(element.getBoundingClientRect().height / lineHeight));
}

function getExcerptLineCount(titleLineCount: number) {
  return Math.max(2, Math.min(4, 6 - titleLineCount));
}

export function BlogCardFill({
  excerpt,
  excerptClassName,
  readingLabel,
  rootClassName,
  title,
  titleClassName,
}: {
  excerpt: string;
  excerptClassName: string;
  readingLabel?: string;
  rootClassName: string;
  title: string;
  titleClassName: string;
}) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [excerptLineCount, setExcerptLineCount] = useState(3);

  useLayoutEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) {
      return undefined;
    }

    const syncExcerptLineCount = () => {
      const nextLineCount = getExcerptLineCount(getTitleLineCount(titleElement));
      setExcerptLineCount((currentLineCount) =>
        currentLineCount === nextLineCount ? currentLineCount : nextLineCount,
      );
    };

    syncExcerptLineCount();

    const resizeObserver = new ResizeObserver(syncExcerptLineCount);
    resizeObserver.observe(titleElement);

    document.fonts?.ready.then(syncExcerptLineCount).catch(() => {});

    return () => {
      resizeObserver.disconnect();
    };
  }, [title]);

  return (
    <div className={rootClassName}>
      <h3 ref={titleRef} className={titleClassName}>
        {title}
      </h3>
      <p
        className={excerptClassName}
        style={
          {
            "--ft-blog-card-excerpt-lines": String(excerptLineCount),
          } as React.CSSProperties
        }
      >
        {excerpt}
      </p>
      {readingLabel ? <span className="ft-blog-card__reading">{readingLabel}</span> : null}
    </div>
  );
}
