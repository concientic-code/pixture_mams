"use client";

import { useEffect, useRef } from "react";

export default function Results() {
  const imgRef = useRef<HTMLImageElement>(null);

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
      aria-labelledby="results-title"
      className="flex items-center py-[clamp(64px,7vh,104px)] px-[clamp(20px,4vw,48px)]"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-[clamp(40px,6vw,96px)] items-center">
        {/* Image */}
        <div className="relative w-full aspect-[4/5] bg-[#e9ddca] overflow-hidden order-1 md:order-none">
          <img
            ref={imgRef}
            src="/images/models/model-1.webp"
            alt="Resultados MAMS — producto terminado"
            loading="lazy"
            decoding="async"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_24%] will-change-transform"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. 03 — SEAMLESS
          </span>
        </div>

        {/* Text */}
        <div>
          <span className="font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block">
            [03]
          </span>
          <h2
            id="results-title"
            className="font-semibold uppercase text-[clamp(30px,4.4vw,64px)] leading-[1.05] tracking-[-0.015em] text-mams-ink"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="block reveal visible stagger-1">
              Más rápido<span className="text-mams-coral">.</span>
            </span>
            <span className="block reveal visible stagger-2">
              A mayor escala<span className="text-mams-coral">.</span>
            </span>
            <span className="block reveal visible stagger-3">
              Con más control<span className="text-mams-coral">.</span>
            </span>
          </h2>
          <p
            className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] mt-8 m-0 max-w-[30ch]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            La calidad no es nuestro estándar mínimo. Es nuestra línea de
            partida.
          </p>
        </div>
      </div>
    </section>
  );
}
