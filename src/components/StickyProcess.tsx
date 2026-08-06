"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

const STAGES = [
  { label: "ETAPA 01", title: "Tejido", description: "Máquinas circulares de última generación para tejidos seamless de alta densidad.", bg: "#ded0b6", textColor: "#1d1d1b", labelColor: "rgba(29,29,27,0.5)", barColor: "#eb662e" },
  { label: "ETAPA 02", title: "Teñido", description: "Teñido reactivo con control de color exacto. Cada lote uniforme.", bg: "#d3c3a4", textColor: "#1d1d1b", labelColor: "rgba(29,29,27,0.5)", barColor: "#4780b0" },
  { label: "ETAPA 03", title: "Confección", description: "Corte automatizado y ensamble con auditoría en cada paso.", bg: "#c9b892", textColor: "#1d1d1b", labelColor: "rgba(29,29,27,0.5)", barColor: "#eb662e" },
  { label: "ETAPA 04", title: "Empaque", description: "Empaque personalizado con tu marca. Listo para distribución.", bg: "#4780b0", textColor: "#f3e4c8", labelColor: "rgba(243,228,200,0.6)", barColor: "#f3e4c8" },
];

export default function StickyProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
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

      const globalProgress = Math.min(1, Math.max(0, -rect.top / total));
      const stageFloat = globalProgress * STAGES.length;
      const idx = Math.min(STAGES.length - 1, Math.max(0, Math.floor(stageFloat)));
      const localProgress = stageFloat - idx; // 0 to 1 within current stage

      setActiveIndex(idx);
      setStageProgress(Math.min(1, localProgress));
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

  const scrollToStage = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetScroll = sectionTop + (index / STAGES.length) * total;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sticky-title"
      className="relative h-[280vh] md:h-[380vh]"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="sticky top-0 h-screen flex items-center py-[clamp(60px,9vh,120px)] px-[clamp(16px,4vw,48px)]">
        <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-[clamp(40px,6vw,96px)] items-center">
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
              <span className={`line-reveal ${isVisible ? "visible" : ""}`}>
                <span>De la fibra al producto terminado</span>
              </span>
            </h2>
            <p
              className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[rgba(29,29,27,0.72)] m-0 mb-8 max-w-[30ch]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Un solo aliado en cada etapa. Sin intermediarios, sin costuras
              entre procesos.
            </p>

            {/* Stage navigation — dots + progress bars */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Navegación de etapas">
              {STAGES.map((stage, i) => (
                <button
                  key={stage.title}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`${stage.label}: ${stage.title}`}
                  onClick={() => scrollToStage(i)}
                  className="relative h-[3px] flex-1 cursor-pointer border-none p-0 bg-[rgba(29,29,27,0.12)] overflow-hidden transition-all"
                  style={{
                    maxWidth: i === activeIndex ? "80px" : "32px",
                    transitionDuration: "var(--duration-slow)",
                  }}
                >
                  {/* Fill bar — shows progress within active stage */}
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: i < activeIndex ? "100%" : i === activeIndex ? `${stageProgress * 100}%` : "0%",
                      background: i <= activeIndex ? "var(--color-coral)" : "transparent",
                      transition: i === activeIndex ? "none" : "width 0.3s ease",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Visual stage — cross-fade */}
          <div
            className="relative w-full h-[clamp(240px,40vh,680px)] md:h-[clamp(360px,64vh,680px)] overflow-hidden"
            style={{ background: STAGES[0].bg }}
            aria-roledescription="carousel"
            aria-label="Etapas del proceso de manufactura"
          >
            {STAGES.map((stage, i) => (
              <div
                key={stage.title}
                className="absolute inset-0 flex flex-col justify-between p-9"
                style={{
                  background: stage.bg,
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? "scale(1)" : "scale(1.03)",
                  transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
                role="tabpanel"
                aria-label={`${stage.label}: ${stage.title}`}
                aria-hidden={i !== activeIndex}
              >
                {/* Top — label */}
                <span
                  className="font-mono text-xs tracking-[0.16em]"
                  style={{ color: stage.labelColor }}
                >
                  {stage.label}
                </span>

                {/* Bottom — title + description */}
                <div>
                  <span
                    className="uppercase text-[clamp(40px,5vw,72px)] leading-[0.9] block mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: stage.textColor,
                    }}
                  >
                    {stage.title}
                  </span>
                  <span
                    className="text-[14px] leading-[1.5] block max-w-[28ch]"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: stage.labelColor,
                    }}
                  >
                    {stage.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
