"use client";

import { useReveal } from "@/hooks/useReveal";

const BRANDS = [
  { name: "Nortia", style: "tracking-[0.12em] text-[clamp(16px,1.7vw,22px)]" },
  { name: "Verde&Co", style: "tracking-[0.02em] text-[clamp(16px,1.7vw,22px)]" },
  { name: "Lumen", style: "tracking-[0.3em] text-[clamp(14px,1.5vw,20px)]" },
  { name: "atelier norte", style: "lowercase tracking-[-0.02em] text-[clamp(18px,1.9vw,26px)]" },
  { name: "Sável", style: "tracking-[0.1em] text-[clamp(16px,1.7vw,22px)]" },
  { name: "MERIDIA", style: "tracking-[0.16em] text-[clamp(15px,1.6vw,21px)]" },
];

export default function SocialProof() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      aria-label="Marcas que confían en nosotros"
      className="py-[clamp(64px,8vh,110px)] px-[clamp(20px,4vw,48px)] border-t border-[rgba(29,29,27,0.1)]"
      style={{ background: "var(--color-cream)" }}
    >
      <div className={`max-w-[1320px] mx-auto text-center reveal-scale ${isVisible ? "visible" : ""}`}>
        <p
          className="uppercase tracking-[0.28em] text-xs text-mams-blue mb-[clamp(30px,4vw,52px)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Marcas que confían en nosotros
        </p>

        <div className="flex flex-wrap justify-center items-center gap-[clamp(28px,6vw,72px)] grayscale opacity-55">
          {BRANDS.map((brand, i) => (
            <span
              key={brand.name}
              className={`font-semibold uppercase text-mams-ink reveal ${isVisible ? `visible stagger-${Math.min(i + 1, 5)}` : ""} ${brand.style}`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
