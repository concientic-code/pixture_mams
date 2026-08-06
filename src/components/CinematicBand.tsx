"use client";

import { useEffect, useRef } from "react";

export default function CinematicBand() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const el = textRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      // Contra-scroll: texto se mueve en dirección opuesta
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * 0.15;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      aria-label="Más de 20 años tejiendo confianza"
      className="relative w-full h-[clamp(300px,50vh,500px)] overflow-hidden"
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 cinematic-kenburns">
        <img
          src="/images/models/model-1.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[center_30%]"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(29, 29, 27, 0.55)" }}
        aria-hidden="true"
      />

      {/* Text — contra-scroll */}
      <div
        ref={textRef}
        className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <span
          className="uppercase tracking-[0.3em] text-[11px] text-[rgba(243,228,200,0.7)] mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Más de 20 años
        </span>
        <span
          className="uppercase text-[clamp(32px,5.5vw,80px)] leading-[0.95] tracking-[0.02em] text-mams-cream"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tejiendo confianza
        </span>
      </div>
    </section>
  );
}
