"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const STAGES = [
  { num: "01", title: "TEJIDO" },
  { num: "02", title: "TEÑIDO" },
  { num: "03", title: "CONFECCIÓN" },
  { num: "04", title: "EMPAQUE" },
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
      className="relative h-[200vh] md:h-[280vh] lg:h-[380vh]"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="sticky top-0 h-screen flex items-center py-[clamp(40px,6vh,120px)] px-[clamp(16px,4vw,48px)]">
        <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-[clamp(40px,6vw,96px)] items-center">
          {/* Left side — title + list */}
          <div ref={revealRef}>
            <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-5 block reveal ${isVisible ? "visible" : ""}`}>
              [02]
            </span>
            <h2
              id="sticky-title"
              className="font-semibold uppercase text-[clamp(24px,4.6vw,68px)] leading-[0.98] tracking-[-0.015em] text-mams-ink m-0 mb-4 lg:mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              De la fibra al producto terminado
            </h2>
            <p
              className="text-[clamp(14px,1.2vw,17px)] leading-[1.6] text-[rgba(29,29,27,0.65)] m-0 mb-6 lg:mb-10 max-w-[30ch]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Un solo aliado en cada etapa. Sin intermediarios, sin costuras
              entre procesos.
            </p>

            {/* Stage list — hover to select, con animación de entrada */}
            <ul className="list-none m-0 p-0 flex flex-col gap-0">
              {STAGES.map((stage, i) => (
                <li
                  key={stage.num}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex items-center gap-4 py-3 transition-all cursor-pointer reveal ${isVisible ? `visible stagger-${i + 1}` : ""}`}
                  style={{
                    opacity: isVisible ? (i === activeIndex ? 1 : 0.4) : 0,
                    transitionDuration: "var(--duration-slow)",
                  }}
                >
                  <span
                    className="font-mono text-[13px] w-[2ch]"
                    style={{ color: i === activeIndex ? "var(--color-coral)" : "var(--color-ink)" }}
                  >
                    {stage.num}
                  </span>
                  <span
                    className="font-semibold uppercase text-[clamp(16px,1.4vw,20px)] tracking-[0.02em] text-mams-ink"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stage.title}
                  </span>
                  {/* Dot indicator */}
                  {i === activeIndex && (
                    <span
                      className="w-[8px] h-[8px] rounded-full bg-mams-coral ml-2"
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Counter */}
            <span
              className="font-mono text-[13px] tracking-[0.18em] text-mams-coral mt-6 block"
              aria-live="polite"
              aria-atomic="true"
            >
              {String(activeIndex + 1).padStart(2, "0")} / 0{STAGES.length}
            </span>
          </div>

          {/* Right side — image with stage name overlay */}
          <div className="relative w-full h-[clamp(200px,35vh,400px)] lg:h-[clamp(400px,70vh,750px)] overflow-hidden">
            {/* Background image */}
            <img
              src="/images/models/model-2.webp"
              alt="Proceso de manufactura MAMS"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(29, 29, 27, 0.35)" }}
            />
            {/* Stage name overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className="font-mono text-[11px] tracking-[0.2em] text-[rgba(243,228,200,0.7)] mb-3 uppercase"
              >
                Etapa {STAGES[activeIndex].num}
              </span>
              <span
                className="uppercase text-[clamp(36px,5vw,72px)] leading-[0.9] text-mams-cream transition-all"
                style={{
                  fontFamily: "var(--font-display)",
                  transitionDuration: "620ms",
                  transitionTimingFunction: "var(--ease-brand)",
                }}
                key={activeIndex}
              >
                {STAGES[activeIndex].title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
