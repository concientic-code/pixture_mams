"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollProgressProps {
  onCtaClick?: () => void;
}

export default function ScrollProgress({ onCtaClick }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const p = Math.min(1, Math.max(0, scrollY / docHeight));
      setProgress(Math.round(p * 100));
      setVisible(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed right-[clamp(16px,2.4vw,28px)] bottom-[clamp(16px,2.4vw,28px)] z-[60] transition-opacity"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: "var(--duration-slow)",
      }}
    >
      <button
        onClick={onCtaClick}
        className="w-[210px] bg-mams-blue text-mams-cream border-none cursor-pointer p-[14px_16px_0] block text-left hover:bg-mams-blue-deep transition-colors"
        style={{ transitionDuration: "var(--duration-fast)" }}
        aria-label={`Progreso de lectura: ${progress}%. Clic para ir a contacto.`}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className="uppercase tracking-[0.16em] text-[11px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get started
          </span>
          <span className="font-mono text-[13px] text-mams-cream">
            {progress}%
          </span>
        </div>
        <div className="h-1 w-full bg-[rgba(243,228,200,0.25)]">
          <div
            ref={fillRef}
            className="h-full bg-mams-coral transition-[width]"
            style={{
              width: `${progress}%`,
              transitionDuration: "120ms",
              transitionTimingFunction: "linear",
            }}
          />
        </div>
      </button>
    </div>
  );
}
