"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [shouldRenderAnimated, setShouldRenderAnimated] = useState(false);

  useEffect(() => {
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
  }, [animatedSrc]);

  return (
    <div
      className={[
        "ft-progressive-animated-media",
        shouldRenderAnimated ? "is-animated-ready" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        alt={alt}
        className={[
          "ft-progressive-animated-media__poster",
          imageClassName ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        height={height}
        priority={priority}
        src={posterSrc}
        width={width}
      />
      {shouldRenderAnimated ? (
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
