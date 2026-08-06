import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="text-mams-cream py-[clamp(56px,7vw,96px)] px-[clamp(20px,4vw,48px)] pb-[clamp(32px,4vw,44px)]"
      style={{ background: "var(--color-blue)" }}
      role="contentinfo"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Top section */}
        <div className="flex flex-wrap justify-between gap-12 pb-[clamp(44px,6vw,72px)] border-b border-[rgba(243,228,200,0.22)]">
          {/* Brand */}
          <div className="max-w-[34ch]">
            <Image
              src="/images/logos/logo-horizontal-cream.png"
              alt="MAMS Grupo Textil"
              width={140}
              height={24}
              className="h-6 w-auto block mb-[22px]"
            />
            <p
              className="text-[15px] leading-[1.6] text-[rgba(243,228,200,0.78)] m-0"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Confeccionamos ideas, tejemos confianza, entregamos sueños hechos
              realidad. Guarne, Antioquia — Colombia.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-[clamp(40px,6vw,88px)] flex-wrap">
            {/* Empresa */}
            <nav aria-label="Enlaces de empresa" className="flex flex-col gap-3.5">
              <span
                className="uppercase tracking-[0.2em] text-[11px] text-[rgba(243,228,200,0.55)] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Empresa
              </span>
              <a href="#top" className="underline-weave text-mams-cream text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
                Proceso
              </a>
              <a href="#top" className="underline-weave text-mams-cream text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
                Capacidades
              </a>
              <a href="#top" className="underline-weave text-mams-cream text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
                Contacto
              </a>
            </nav>

            {/* Social */}
            <nav aria-label="Redes sociales" className="flex flex-col gap-3.5">
              <span
                className="uppercase tracking-[0.2em] text-[11px] text-[rgba(243,228,200,0.55)] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Social
              </span>
              <a
                href="#top"
                className="underline-weave text-mams-cream text-[15px] flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href="#top"
                className="underline-weave text-mams-cream text-[15px] flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="7.5" y1="10" x2="7.5" y2="17" />
                  <circle cx="7.5" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
                  <path d="M11 17v-4a2.5 2.5 0 0 1 5 0v4" />
                  <line x1="11" y1="10" x2="11" y2="17" />
                </svg>
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-wrap justify-between gap-4 pt-6 text-[13px] text-[rgba(243,228,200,0.6)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span>© 2026 MAMS Grupo Textil. Todos los derechos reservados.</span>
          <span className="flex gap-6">
            <a href="#top" className="text-[rgba(243,228,200,0.85)] hover:text-mams-cream transition-colors">
              Privacy
            </a>
            <a href="#top" className="text-[rgba(243,228,200,0.85)] hover:text-mams-cream transition-colors">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
