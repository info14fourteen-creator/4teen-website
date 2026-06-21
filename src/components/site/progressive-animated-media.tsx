"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type ProgressiveAnimatedMediaProps = {
  alt: string;
  animatedSrc: string;
  className?: string;
  height: number;
  imageClassName?: string;
  posterSrc: string;
  priority?: boolean;
  width: number;
};

function isVideoSource(src: string) {
  return /\.(mp4|webm|mov)(?:[?#].*)?$/i.test(src);
}

export function ProgressiveAnimatedMedia({
  alt,
  animatedSrc,
  className,
  height,
  imageClassName,
  posterSrc,
  priority = false,
  width,
}: ProgressiveAnimatedMediaProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadAnimated, setShouldLoadAnimated] = useState(priority);
  const [shouldRenderAnimated, setShouldRenderAnimated] = useState(false);
  const isVideo = isVideoSource(animatedSrc);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || shouldLoadAnimated) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    if (mediaQuery.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoadAnimated(true);
        observer.disconnect();
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoadAnimated]);

  useEffect(() => {
    if (!shouldLoadAnimated) return;

    if (isVideo) {
      const video = videoRef.current;
      if (!video) return;

      const handleReady = () => {
        setShouldRenderAnimated(true);
        void video.play().catch(() => {});
      };

      video.addEventListener("canplay", handleReady);
      video.load();

      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        handleReady();
      }

      return () => {
        video.removeEventListener("canplay", handleReady);
      };
    }

    let isMounted = true;
    const animatedImage = new window.Image();

    const handleReady = () => {
      if (isMounted) {
        setShouldRenderAnimated(true);
      }
    };

    animatedImage.addEventListener("load", handleReady);
    animatedImage.src = animatedSrc;

    if (animatedImage.complete) {
      handleReady();
    }

    return () => {
      isMounted = false;
      animatedImage.removeEventListener("load", handleReady);
    };
  }, [animatedSrc, isVideo, shouldLoadAnimated]);

  return (
    <div
      ref={rootRef}
      style={
        {
          "--ft-progressive-media-aspect": `${width} / ${height}`,
          "--ft-progressive-media-mask": `url("${posterSrc}")`,
        } as CSSProperties
      }
      className={[
        "ft-progressive-animated-media",
        shouldRenderAnimated ? "is-animated-ready" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        alt={alt}
        className={[
          "ft-progressive-animated-media__poster",
          imageClassName ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        height={height}
        src={posterSrc}
        width={width}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {isVideo ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          className={[
            "ft-progressive-animated-media__animated",
            imageClassName ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          height={height}
          loop
          muted
          playsInline
          poster={posterSrc}
          preload={shouldLoadAnimated ? "metadata" : "none"}
          width={width}
        >
          {shouldLoadAnimated ? (
            <source src={animatedSrc} type="video/mp4" />
          ) : null}
        </video>
      ) : shouldRenderAnimated ? (
        <img
          alt=""
          aria-hidden="true"
          className={[
            "ft-progressive-animated-media__animated",
            imageClassName ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          height={height}
          src={animatedSrc}
          width={width}
        />
      ) : null}
    </div>
  );
}
