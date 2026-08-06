"use client";

import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";

export default function ProcessSection() {
  const { ref: revealRef, isVisible } = useReveal();
  const parallaxImg = useParallax({ speed: 0.05 });

  return (
    <section
      ref={revealRef}
      aria-labelledby="process-title"
      className="flex items-center py-[clamp(64px,7vh,104px)] px-[clamp(20px,4vw,48px)]"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-[clamp(40px,6vw,96px)] items-center">
        {/* Text — reveal por línea */}
        <div>
          <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block reveal ${isVisible ? "visible" : ""}`}>
            [01]
          </span>
          <h2
            id="process-title"
            className="font-semibold uppercase text-[clamp(34px,5vw,74px)] leading-[0.98] tracking-[-0.015em] text-mams-ink m-0 mb-7"
            style={{
              fontFamily: "var(--font-heading)",
              textWrap: "balance",
            }}
          >
            <span className={`line-reveal ${isVisible ? "visible" : ""}`}>
              <span>Diseñamos contigo</span>
            </span>
          </h2>
          <p
            className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] m-0 max-w-[32ch]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Desarrollo de producto, prototipado y marca privada. Tu idea llega a
            la mesa de corte con la ficha técnica lista para producir.
          </p>
        </div>

        {/* Image — parallax */}
        <div ref={parallaxImg} className="relative w-full aspect-[4/5] bg-[#e9ddca] overflow-hidden">
          <img
            src="/images/models/model-2.webp"
            alt="Proceso de diseño MAMS"
            loading="lazy"
            decoding="async"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_16%]"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. 01 — SEAMLESS
          </span>
        </div>
      </div>
    </section>
  );
}
