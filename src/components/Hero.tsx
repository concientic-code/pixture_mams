"use client";

import { useEffect, useRef } from "react";

interface HeroProps {
  onExplore?: () => void;
  onGetStarted?: () => void;
}

export default function Hero({ onExplore, onGetStarted }: HeroProps) {
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const elements = [img1Ref.current, img2Ref.current];

      for (const el of elements) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -240 || rect.top > vh + 240) continue;
        const speed = 0.14;
        const shift = -((rect.top + rect.height / 2 - vh / 2) * speed);
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      }
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
    <section id="top" aria-labelledby="hero-title" className="pt-[72px]">
      {/* Image grid */}
      <div className="flex gap-[clamp(10px,1.4vw,20px)] w-full h-[clamp(320px,70vh,940px)] md:h-[clamp(460px,80vh,940px)] p-[clamp(10px,1.4vw,20px)]">
        {/* Image 1 */}
        <div className="relative flex-1 h-full bg-[#e9ddca] overflow-hidden">
          <img
            ref={img1Ref}
            src="/images/models/model-1.webp"
            alt="Conjunto seamless MAMS — vista frontal"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_22%] will-change-transform"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. A — SEAMLESS
          </span>
        </div>

        {/* Image 2 — hidden on mobile */}
        <div className="relative flex-1 h-full bg-[#e9ddca] overflow-hidden hidden md:block">
          <img
            ref={img2Ref}
            src="/images/models/model-2.webp"
            alt="Conjunto seamless MAMS — vista lateral"
            className="absolute top-[-9%] left-0 w-full h-[118%] object-cover object-[center_18%] will-change-transform"
          />
          <span className="absolute left-4 bottom-3.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(29,29,27,0.55)]">
            FIG. B — SEAMLESS
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(24px,3vw,44px)] pb-[clamp(28px,3.5vw,48px)]">
        {/* Tagline */}
        <p
          className="uppercase tracking-[0.28em] text-xs text-mams-blue mb-[clamp(18px,2.4vw,30px)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Aliado textil · Guarne, Colombia
        </p>

        {/* Main heading */}
        <h1
          id="hero-title"
          className="text-[clamp(42px,7.2vw,112px)] leading-[0.94] tracking-[0.01em] text-mams-ink m-0 max-w-[16ch]"
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            textWrap: "balance",
          }}
        >
          Confeccionamos tus ideas
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

          <button
            onClick={onExplore}
            className="uppercase tracking-[0.16em] text-[13px] font-semibold text-mams-ink bg-transparent border-none border-b-2 border-b-mams-ink cursor-pointer pb-1.5 inline-flex items-center gap-3 hover:text-mams-coral hover:border-b-mams-coral transition-colors"
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
