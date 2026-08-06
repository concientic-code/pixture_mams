"use client";

import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

export default function ProcessSection() {
  const imgRef = useRef<HTMLImageElement>(null);
  const { ref: revealRef, isVisible } = useReveal();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -240 || rect.top > vh + 240) return;
      const speed = 0.1;
      const shift = -((rect.top + rect.height / 2 - vh / 2) * speed);
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={revealRef}
      aria-labelledby="process-title"
      className="flex items-center py-[clamp(64px,7vh,104px)] px-[clamp(20px,4vw,48px)]"
      style={{ background: "var(--color-cream)" }}
    >
      <div className={`max-w-[1320px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-[clamp(40px,6vw,96px)] items-center reveal ${isVisible ? "visible" : ""}`}>
        {/* Text */}
        <div>
          <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block reveal ${isVisible ? "visible" : ""}`}>
            [01]
          </span>
          <h2
            id="process-title"
            className={`font-semibold uppercase text-[clamp(34px,5vw,74px)] leading-[0.98] tracking-[-0.015em] text-mams-ink m-0 mb-7 reveal ${isVisible ? "visible stagger-1" : ""}`}
            style={{
              fontFamily: "var(--font-heading)",
              textWrap: "balance",
            }}
          >
            Diseñamos contigo
          </h2>
          <p
            className={`text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] m-0 max-w-[32ch] reveal ${isVisible ? "visible stagger-2" : ""}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Desarrollo de producto, prototipado y marca privada. Tu idea llega a
            la mesa de corte con la ficha técnica lista para producir.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/5] bg-[#e9ddca] overflow-hidden">
          <img
            ref={imgRef}
            src="/images/models/model-2.webp"
            alt="Proceso de diseño MAMS"
            loading="lazy"
            decoding="async"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_16%] will-change-transform"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. 01 — SEAMLESS
          </span>
        </div>
      </div>
    </section>
  );
}
