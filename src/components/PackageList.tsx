"use client";

import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";

const SERVICES = [
  "Diseño y desarrollo",
  "Seamless",
  "Teñido",
  "Paquete Completo",
  "Empaque y entrega",
];

export default function PackageList() {
  const imgRef = useRef<HTMLImageElement>(null);
  const { ref: revealRef, isVisible } = useReveal();
  const parallaxImg = useParallax({ speed: 0.05 });

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
      aria-labelledby="package-title"
      className="flex items-center py-[clamp(64px,7vh,104px)] px-[clamp(20px,4vw,48px)]"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-[clamp(40px,6vw,96px)] items-center">
        {/* Text + List */}
        <div>
          <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block reveal ${isVisible ? "visible" : ""}`}>
            [04]
          </span>
          <h2
            id="package-title"
            className="font-semibold uppercase text-[clamp(34px,5vw,74px)] leading-[0.98] tracking-[-0.015em] text-mams-ink m-0 mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className={`line-reveal ${isVisible ? "visible" : ""}`}>
              <span>Paquete completo</span>
            </span>
          </h2>
          <p
            className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] m-0 mb-10 max-w-[34ch]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Todo bajo un mismo techo en el Complejo Industrial Elite 2.
          </p>

          <ol className="list-none m-0 p-0 flex flex-col">
            {SERVICES.map((service, i) => (
              <li
                key={service}
                className="row-shift flex items-baseline gap-6 py-[22px] border-t border-[rgba(29,29,27,0.14)] last:border-b last:border-b-[rgba(29,29,27,0.14)] cursor-default"
              >
                <span className="font-mono text-[13px] text-mams-coral w-[2ch]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-semibold text-[clamp(18px,1.6vw,24px)] text-mams-ink"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Image — parallax */}
        <div ref={parallaxImg} className="relative w-full aspect-[4/5] bg-[#e9ddca] overflow-hidden">
          <img
            ref={imgRef}
            src="/images/models/model-2.webp"
            alt="Paquete completo MAMS"
            loading="lazy"
            decoding="async"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_20%] will-change-transform"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. 04 — SEAMLESS
          </span>
        </div>
      </div>
    </section>
  );
}
