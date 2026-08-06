"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onCtaClick?: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-[clamp(20px,4vw,48px)]"
      role="banner"
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 border-b border-[rgba(29,29,27,0.10)] pointer-events-none transition-opacity"
        style={{
          background: "var(--color-cream)",
          opacity: scrolled ? 1 : 0,
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-brand)",
        }}
        aria-hidden="true"
      />

      {/* Logo */}
      <a
        href="#top"
        className="relative flex items-center leading-none"
        aria-label="MAMS — Ir al inicio"
        aria-current="page"
      >
        <Image
          src="/images/logos/logo-horizontal-blue.png"
          alt="MAMS Grupo Textil"
          width={120}
          height={22}
          className="h-[22px] w-auto block"
          priority
        />
      </a>

      {/* CTA Button */}
      <nav aria-label="Acciones principales">
        <button
          onClick={onCtaClick}
          className="relative font-[var(--font-heading)] uppercase tracking-[0.16em] text-xs font-semibold text-mams-ink bg-transparent border-none cursor-pointer flex items-center gap-[10px] py-2 px-0 hover:text-mams-coral transition-colors"
          style={{ transitionDuration: "var(--duration-fast)" }}
        >
          Get started
          <span
            className="w-5 h-px bg-current inline-block"
            aria-hidden="true"
          />
        </button>
      </nav>
    </header>
  );
}
