"use client";

const BRANDS = [
  { name: "Nortia", style: "tracking-[0.12em] text-[clamp(16px,1.7vw,22px)]" },
  { name: "Verde&Co", style: "tracking-[0.02em] text-[clamp(16px,1.7vw,22px)]" },
  { name: "Lumen", style: "tracking-[0.3em] text-[clamp(14px,1.5vw,20px)]" },
  { name: "atelier norte", style: "lowercase tracking-[-0.02em] text-[clamp(18px,1.9vw,26px)]" },
  { name: "Sável", style: "tracking-[0.1em] text-[clamp(16px,1.7vw,22px)]" },
  { name: "MERIDIA", style: "tracking-[0.16em] text-[clamp(15px,1.6vw,21px)]" },
];

export default function SocialProof() {
  // Duplicamos las marcas para crear el loop infinito
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Marcas que confían en nosotros"
      className="py-[clamp(64px,8vh,110px)] border-t border-[rgba(29,29,27,0.1)] overflow-hidden"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-[1320px] mx-auto text-center px-[clamp(20px,4vw,48px)]">
        <p
          className="uppercase tracking-[0.28em] text-xs text-mams-blue mb-[clamp(30px,4vw,52px)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Marcas que confían en nosotros
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[80px] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-cream), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-[80px] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-cream), transparent)" }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div className="marquee-track flex items-center gap-[clamp(40px,8vw,100px)] w-max">
          {allBrands.map((brand, i) => (
            <span
              key={`${brand.name}-${i}`}
              className={`font-semibold uppercase text-mams-ink whitespace-nowrap opacity-55 ${brand.style}`}
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
