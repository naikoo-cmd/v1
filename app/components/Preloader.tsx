"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface PreloaderProps {
  src?: string; // public path to the lottie JSON
  loop?: boolean | number; // plays once by default
  minDuration?: number; // ms: ensures it doesn't flash too fast
  fadeDuration?: number; // ms: matches Tailwind duration classes
  onFinish?: () => void;
  className?: string;
}

function PreloaderBase({
  src = "/Frame 2.json",
  loop = false,
  minDuration = 900,
  fadeDuration = 300,
  onFinish,
  className = "",
}: PreloaderProps) {
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [visible, setVisible] = useState(true); // mounted overlay
  const [opaque, setOpaque] = useState(false); // fade-in/out
  const minDone = useRef(false);
  const animDone = useRef(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Fetch JSON from /public once
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        // Encode once; avoid double-encoding e.g. "%2520"
        const res = await fetch(encodeURI(src));
        const data = await res.json();
        if (active) setAnimationData(data);
      } catch {
        // If JSON fails to load, still finish after minimum delay
        animDone.current = true;
      }
    })();
    return () => {
      active = false;
    };
  }, [src]);

  // Fade in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setOpaque(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Ensure a minimum time before fade-out
  useEffect(() => {
    const id = setTimeout(() => {
      minDone.current = true;
      maybeFinish();
    }, minDuration);
    return () => clearTimeout(id);
  }, [minDuration]);

  const maybeFinish = useCallback(() => {
    if (minDone.current && animDone.current) {
      // fade out
      setOpaque(false);
      // unmount shortly after fade duration
      const id = setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, fadeDuration);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [fadeDuration, onFinish]);

  // Handle Lottie completion
  const handleComplete = useCallback(() => {
    animDone.current = true;
    maybeFinish();
  }, [maybeFinish]);

  // Static wrapper classes to avoid re-renders
  const wrapperClasses = useMemo(
    () =>
      [
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "bg-background",
        // Use static Tailwind classes so JIT doesn't purge them
        "transition-opacity duration-300",
        opaque ? "opacity-100" : "opacity-0",
        className,
      ].join(" "),
    [opaque, className]
  );

  if (!visible) return null;

  return (
    <div className={wrapperClasses} aria-hidden>
      {/* Glow + Lottie wrapper keeps everything centered */}
      <div className="relative flex items-center justify-center">
        {/* Subtle pulsing glow behind the animation */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={[
              // size larger than the Lottie to create a halo
              "w-56 h-56 sm:w-80 sm:h-80 rounded-full",
              // soft color + blur + shadow halo
              "bg-foreground/10 blur-2xl shadow-[0_0_80px_theme(colors.foreground/30)]",
              // gentle pulse while animation plays (respects reduced motion)
              "opacity-70 animate-pulse motion-reduce:animate-none",
            ].join(" ")}
          />
        </div>

        {animationData ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={loop}
            autoplay
            onComplete={handleComplete}
            className="w-40 h-40 sm:w-56 sm:h-56"
          />
        ) : (
          // Lightweight fallback while JSON fetch resolves
          <div className="w-10 h-10 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
        )}
      </div>
    </div>
  );
}

const Preloader = memo(PreloaderBase);
export default Preloader;
