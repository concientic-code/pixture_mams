"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";

const STAGES = [
  "Tejido",
  "Teñido",
  "Confección",
  "Empaque",
];

export default function StickyProcess() {
  const { ref: revealRef, isVisible } = useReveal();
  const parallaxImg = useParallax({ speed: 0.05 });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={revealRef}
      aria-labelledby="process-02-title"
      className="flex items-center py-[clamp(64px,7vh,104px)] px-[clamp(20px,4vw,48px)]"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-[clamp(40px,6vw,96px)] items-center">
        {/* Text + List */}
        <div>
          <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block reveal ${isVisible ? "visible" : ""}`}>
            [02]
          </span>
          <h2
            id="process-02-title"
            className="font-semibold uppercase text-[clamp(28px,5vw,74px)] leading-[0.98] tracking-[-0.015em] text-mams-ink m-0 mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className={`line-reveal ${isVisible ? "visible" : ""}`}>
              <span>De la fibra al producto terminado</span>
            </span>
          </h2>
          <p
            className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] m-0 mb-10 max-w-[34ch]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Un solo aliado en cada etapa. Sin intermediarios, sin costuras entre procesos.
          </p>

          <ol className="list-none m-0 p-0 flex flex-col">
            {STAGES.map((stage, i) => (
              <li
                key={stage}
                onMouseEnter={() => setActiveIndex(i)}
                className="row-shift flex items-baseline gap-6 py-[22px] border-t border-[rgba(29,29,27,0.14)] last:border-b last:border-b-[rgba(29,29,27,0.14)] cursor-pointer transition-opacity"
                style={{
                  opacity: i === activeIndex ? 1 : 0.4,
                  transitionDuration: "var(--duration-slow)",
                }}
              >
                <span className="font-mono text-[13px] text-mams-coral w-[2ch]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-semibold text-[clamp(18px,1.6vw,24px)] text-mams-ink"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stage}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Image — cambia el texto según el item activo */}
        <div ref={parallaxImg} className="relative w-full aspect-[4/5] bg-[#e9ddca] overflow-hidden">
          <img
            src="/images/models/model-2.webp"
            alt="Proceso de manufactura MAMS"
            loading="lazy"
            decoding="async"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_20%]"
          />
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(29, 29, 27, 0.35)" }}
          />
          {/* Texto de la etapa activa */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[rgba(243,228,200,0.7)] mb-3 uppercase">
              Etapa {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span
              className="uppercase text-[clamp(32px,4.5vw,64px)] leading-[0.9] text-mams-cream"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {STAGES[activeIndex]}
            </span>
          </div>
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(243,228,200,0.55)] z-10">
            FIG. 02 — SEAMLESS
          </span>
        </div>
      </div>
    </section>
  );
}
