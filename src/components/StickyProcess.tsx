"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const STAGES = [
  { label: "ETAPA 01", title: "Tejido", bg: "#ded0b6", textColor: "#1d1d1b", labelColor: "rgba(29,29,27,0.5)" },
  { label: "ETAPA 02", title: "Teñido", bg: "#d3c3a4", textColor: "#1d1d1b", labelColor: "rgba(29,29,27,0.5)" },
  { label: "ETAPA 03", title: "Confección", bg: "#c9b892", textColor: "#1d1d1b", labelColor: "rgba(29,29,27,0.5)" },
  { label: "ETAPA 04", title: "Empaque", bg: "#4780b0", textColor: "#f3e4c8", labelColor: "rgba(243,228,200,0.6)" },
];

export default function StickyProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: revealRef, isVisible } = useReveal({ threshold: 0.05 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(
        STAGES.length - 1,
        Math.max(0, Math.floor(progress * STAGES.length))
      );
      setActiveIndex(idx);
    };

    if (!prefersReduced) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll);
      requestAnimationFrame(handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sticky-title"
      className="relative h-[280vh] md:h-[380vh]"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="sticky top-0 h-screen flex items-center py-[clamp(60px,9vh,120px)] px-[clamp(16px,4vw,48px)]">
        <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-[clamp(40px,6vw,96px)] items-center">
          {/* Text side */}
          <div ref={revealRef}>
            <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block reveal ${isVisible ? "visible" : ""}`}>
              [02]
            </span>
            <h2
              id="sticky-title"
              className="font-semibold uppercase text-[clamp(32px,4.6vw,68px)] leading-[0.98] tracking-[-0.015em] text-mams-ink m-0 mb-7"
              style={{
                fontFamily: "var(--font-heading)",
                textWrap: "balance",
              }}
            >
              De la fibra al producto terminado
            </h2>
            <p
              className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] m-0 mb-8 max-w-[30ch]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Un solo aliado en cada etapa. Sin intermediarios, sin costuras
              entre procesos.
            </p>
            <span
              className="font-mono text-[13px] tracking-[0.18em] text-mams-blue"
              aria-live="polite"
              aria-atomic="true"
            >
              {String(activeIndex + 1).padStart(2, "0")} / 0{STAGES.length}
            </span>
          </div>

          {/* Visual stage carousel */}
          <div
            className="relative w-full h-[clamp(240px,40vh,680px)] lg:h-[clamp(360px,64vh,680px)] overflow-hidden border border-[rgba(29,29,27,0.08)]"
            style={{ background: "#ded0b6" }}
            aria-roledescription="carousel"
            aria-label="Etapas del proceso de manufactura"
          >
            {STAGES.map((stage, i) => (
              <div
                key={stage.title}
                className="absolute inset-0 flex flex-col justify-end p-9 transition-all"
                style={{
                  background: stage.bg,
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? "scale(1)" : "scale(1.05)",
                  transitionDuration: "620ms",
                  transitionTimingFunction: "var(--ease-brand)",
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${stage.label}: ${stage.title}`}
                aria-hidden={i !== activeIndex}
              >
                <span
                  className="font-mono text-xs tracking-[0.16em] mb-2.5"
                  style={{ color: stage.labelColor }}
                >
                  {stage.label}
                </span>
                <span
                  className="uppercase text-[clamp(40px,5vw,72px)] leading-[0.9]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: stage.textColor,
                  }}
                >
                  {stage.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
