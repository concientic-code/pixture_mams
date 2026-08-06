"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

// Shared observer pool — one observer per unique threshold+rootMargin combo
const observerMap = new Map<string, IntersectionObserver>();
const callbacks = new Map<Element, (isVisible: boolean) => void>();

function getObserver(threshold: number, rootMargin: string, once: boolean) {
  const key = `${threshold}_${rootMargin}`;

  if (!observerMap.has(key)) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = callbacks.get(entry.target);
          if (!cb) continue;

          if (entry.isIntersecting) {
            cb(true);
            if (once) {
              observer.unobserve(entry.target);
              callbacks.delete(entry.target);
            }
          } else if (!once) {
            cb(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    observerMap.set(key, observer);
  }

  return observerMap.get(key)!;
}

export function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = getObserver(threshold, rootMargin, once);
    callbacks.set(el, handleVisibility);
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [threshold, rootMargin, once, handleVisibility]);

  return { ref, isVisible };
}
