"use client";

import { useEffect, useRef } from "react";

interface ParallaxOptions {
  speed?: number; // 0.02 to 0.2 — lower = subtler
  direction?: "up" | "down";
}

export function useParallax({ speed = 0.08, direction = "up" }: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const target = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only calculate when in view
      if (rect.bottom > -100 && rect.top < vh + 100) {
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * speed;
        target.current = direction === "up" ? -offset : offset;
      }

      // Smooth interpolation (lerp)
      current.current = lerp(current.current, target.current, 0.08);

      // Apply transform
      el.style.transform = `translate3d(0, ${current.current.toFixed(1)}px, 0)`;

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [speed, direction]);

  return ref;
}
