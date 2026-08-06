"use client";

import { useReveal } from "@/hooks/useReveal";

interface CtaSectionProps {
  onGetStarted?: () => void;
}

export default function CtaSection({ onGetStarted }: CtaSectionProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      className="flex items-center py-[clamp(72px,9vh,128px)] px-[clamp(20px,4vw,48px)]"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="max-w-[1320px] mx-auto w-full">
        <span className={`font-mono text-sm tracking-[0.1em] text-mams-coral mb-7 block reveal ${isVisible ? "visible" : ""}`}>
          [05]
        </span>
        <h2
          id="cta-title"
          className="uppercase text-[clamp(38px,6vw,96px)] leading-[0.95] tracking-[0.01em] text-mams-ink m-0 mb-[clamp(36px,5vw,56px)] max-w-[18ch]"
          style={{
            fontFamily: "var(--font-display)",
            textWrap: "balance",
          }}
        >
          <span className={`line-reveal ${isVisible ? "visible" : ""}`}>
            <span>¿Listo para tejer tu próxima colección?</span>
          </span>
        </h2>
        <button
          onClick={onGetStarted}
          aria-label="Contactar a MAMS para comenzar tu proyecto"
          className="uppercase tracking-[0.16em] text-sm font-semibold text-mams-cream bg-mams-blue border-none cursor-pointer px-10 py-5 hover:bg-mams-blue-deep transition-colors"
          style={{
            fontFamily: "var(--font-heading)",
            transitionDuration: "var(--duration-fast)",
          }}
        >
          Get started
        </button>
      </div>
    </section>
  );
}
