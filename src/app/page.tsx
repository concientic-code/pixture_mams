"use client";

import { useRef, useCallback, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import CinematicBand from "@/components/CinematicBand";
import StickyProcess from "@/components/StickyProcess";
import Results from "@/components/Results";
import PackageList from "@/components/PackageList";
import SocialProof from "@/components/SocialProof";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

export default function Home() {
  const ctaRef = useRef<HTMLElement>(null);
  const sec1Ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <div
        className="relative w-full overflow-x-hidden"
        style={{
          background: "var(--color-cream)",
          overflow: loaded ? undefined : "hidden",
          height: loaded ? undefined : "100vh",
        }}
      >
      <Header onCtaClick={() => scrollTo(ctaRef)} />

      <main id="main-content">
        <Hero
          onExplore={() => scrollTo(sec1Ref)}
          onGetStarted={() => scrollTo(ctaRef)}
        />

        <div ref={sec1Ref as React.RefObject<HTMLDivElement>}>
          <ProcessSection />
        </div>

        <CinematicBand />

        <StickyProcess />
        <Results />
        <PackageList />
        <SocialProof />

        <div ref={ctaRef as React.RefObject<HTMLDivElement>}>
          <CtaSection onGetStarted={() => scrollTo(ctaRef)} />
        </div>
      </main>

      <Footer />
      <ScrollProgress onCtaClick={() => scrollTo(ctaRef)} />
      </div>
    </>
  );
}
