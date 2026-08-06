"use client";

import { useEffect, useRef, useCallback } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
}

// Shared RAF loop — single animation frame for all parallax instances
const instances: Set<() => void> = new Set();
let rafId: number | null = null;
let isScrolling = false;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

function startLoop() {
  if (rafId !== null) return;

  const tick = () => {
    for (const update of instances) update();
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

// Only run RAF while scrolling (+ 150ms after stop)
if (typeof window !== "undefined") {
  const onScroll = () => {
    if (!isScrolling) {
      isScrolling = true;
      if (instances.size > 0) startLoop();
    }
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      stopLoop();
    }, 150);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

export function useParallax({ speed = 0.08, direction = "up" }: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const target = useRef(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.bottom > -100 && rect.top < vh + 100) {
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * speed;
      target.current = direction === "up" ? -offset : offset;
    }

    // Smooth interpolation (lerp)
    current.current += (target.current - current.current) * 0.08;
    el.style.transform = `translate3d(0, ${current.current.toFixed(1)}px, 0)`;
  }, [speed, direction]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    instances.add(update);

    // Initial position
    update();

    return () => {
      instances.delete(update);
      if (instances.size === 0) stopLoop();
    };
  }, [update]);

  return ref;
}
