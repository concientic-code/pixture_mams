"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";

interface HeroProps {
  onExplore?: () => void;
  onGetStarted?: () => void;
}

export default function Hero({ onExplore, onGetStarted }: HeroProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { ref: titleRef, isVisible: titleVisible } = useReveal({ threshold: 0.1 });
  const parallax1 = useParallax({ speed: 0.04 });
  const parallax2 = useParallax({ speed: 0.07 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setHasScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 10) setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="top" aria-labelledby="hero-title" className="pt-[72px]">
      {/* Image grid */}
      <div className="flex gap-[clamp(10px,1.4vw,20px)] w-full h-[clamp(320px,70vh,940px)] md:h-[clamp(460px,80vh,940px)] p-[clamp(10px,1.4vw,20px)]">
        {/* Image 1 — parallax lento */}
        <div ref={parallax1} className="relative flex-1 h-full bg-[#e9ddca] overflow-hidden">
          <img
            src="/images/models/model-1.webp"
            alt="Conjunto seamless MAMS — vista frontal"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_22%]"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. A — SEAMLESS
          </span>
        </div>

        {/* Image 2 — parallax rápido (hidden mobile) */}
        <div ref={parallax2} className="relative flex-1 h-full bg-[#e9ddca] overflow-hidden hidden md:block">
          <img
            src="/images/models/model-2.webp"
            alt="Conjunto seamless MAMS — vista lateral"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_18%]"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. B — SEAMLESS
          </span>
        </div>
      </div>

      {/* Content */}
      <div ref={titleRef} className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(24px,3vw,44px)] pb-[clamp(28px,3.5vw,48px)]">
        {/* Tagline — oculto hasta scroll */}
        <p
          className={`reveal ${hasScrolled ? "visible" : ""} uppercase tracking-[0.28em] text-xs text-mams-blue mb-[clamp(18px,2.4vw,30px)]`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Aliado textil · Guarne, Colombia
        </p>

        {/* Main heading — reveal por línea con máscara */}
        <h1
          id="hero-title"
          className="text-[clamp(42px,7.2vw,112px)] leading-[0.94] tracking-[0.01em] text-mams-ink m-0 max-w-[16ch]"
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            textWrap: "balance",
          }}
        >
          <span className={`line-reveal ${titleVisible ? "visible" : ""}`}>
            <span>Confeccionamos tus ideas</span>
          </span>
        </h1>

        {/* Subtitle + CTA */}
        <div className="flex items-end justify-between flex-wrap gap-6 mt-[clamp(28px,3.4vw,44px)]">
          <p
            className="text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-[rgba(29,29,27,0.72)] m-0 max-w-[34ch]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Del boceto al anaquel bajo un mismo techo. Velocidad, escala y
            control para tu marca — sin costuras entre procesos.
          </p>

          {/* Explora el proceso — oculto hasta scroll */}
          <button
            onClick={onExplore}
            className={`reveal ${hasScrolled ? "visible" : ""} uppercase tracking-[0.16em] text-[13px] font-semibold text-mams-ink bg-transparent border-none border-b-2 border-b-mams-ink cursor-pointer pb-1.5 inline-flex items-center gap-3 hover:text-mams-coral hover:border-b-mams-coral transition-colors`}
            style={{
              fontFamily: "var(--font-heading)",
              transitionDuration: "var(--duration-fast)",
            }}
          >
            Explora el proceso
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
