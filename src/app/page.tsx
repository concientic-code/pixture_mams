"use client";

import { useRef, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import StickyProcess from "@/components/StickyProcess";
import Results from "@/components/Results";
import PackageList from "@/components/PackageList";
import SocialProof from "@/components/SocialProof";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import RevealSection from "@/components/RevealSection";

export default function Home() {
  const ctaRef = useRef<HTMLElement>(null);
  const sec1Ref = useRef<HTMLElement>(null);

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: "var(--color-cream)" }}>
      <Header onCtaClick={() => scrollTo(ctaRef)} />

      <main id="main-content">
        <Hero
          onExplore={() => scrollTo(sec1Ref)}
          onGetStarted={() => scrollTo(ctaRef)}
        />

        {/* 01 — Diseñamos contigo */}
        <div ref={sec1Ref as React.RefObject<HTMLDivElement>}>
          <RevealSection>
            <ProcessSection />
          </RevealSection>
        </div>

        {/* 02 — Sticky scroll */}
        <StickyProcess />

        {/* 03 — Resultados */}
        <RevealSection>
          <Results />
        </RevealSection>

        {/* 04 — Paquete completo */}
        <RevealSection>
          <PackageList />
        </RevealSection>

        {/* Social proof */}
        <RevealSection direction="scale">
          <SocialProof />
        </RevealSection>

        {/* 05 — CTA */}
        <div ref={ctaRef as React.RefObject<HTMLDivElement>}>
          <RevealSection>
            <CtaSection onGetStarted={() => scrollTo(ctaRef)} />
          </RevealSection>
        </div>
      </main>

      <Footer />

      {/* Floating progress widget */}
      <ScrollProgress onCtaClick={() => scrollTo(ctaRef)} />
    </div>
  );
}
