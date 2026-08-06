"use client";

import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (hasCompleted.current) return;

    const complete = () => {
      if (hasCompleted.current) return;
      hasCompleted.current = true;
      setProgress(100);
      // Brief pause at 100%, then reveal
      setTimeout(() => {
        setPhase("revealing");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 900); // Cortina más rápida
      }, 200); // Pausa más corta
    };

    // Track image loading
    const images = Array.from(document.querySelectorAll("img"));
    const total = images.length || 1;
    let loaded = 0;

    const tick = () => {
      loaded++;
      setProgress(Math.min(100, Math.round((loaded / total) * 100)));
      if (loaded >= total) complete();
    };

    if (images.length === 0) {
      complete();
      return;
    }

    for (const img of images) {
      if (img.complete) {
        tick();
      } else {
        img.addEventListener("load", tick, { once: true });
        img.addEventListener("error", tick, { once: true });
      }
    }

    // Fallback: max 3s de espera
    const fallback = setTimeout(complete, 3000);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[200] pointer-events-none"
      aria-hidden="true"
    >
      {/* Loading screen */}
      {phase === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[201]" style={{ background: "var(--color-cream)" }}>
          <img
            src="/images/logos/logomark-blue.png"
            alt=""
            className="w-12 h-12 mb-8 opacity-60"
          />
          <div className="flex items-center gap-3">
            <div className="w-[180px] h-[2px] bg-[rgba(71,128,176,0.2)]">
              <div
                className="h-full bg-mams-coral"
                style={{
                  width: `${progress}%`,
                  transition: "width 150ms linear",
                }}
              />
            </div>
            <span className="font-mono text-[12px] text-mams-blue opacity-70">
              {progress}%
            </span>
          </div>
        </div>
      )}

      {/* Curtain reveal — 3 panels */}
      {phase === "revealing" && (
        <>
          <div
            className="absolute top-0 left-0 w-1/3 h-full z-[201]"
            style={{
              background: "var(--color-cream)",
              animation: "curtain-left 0.8s var(--ease-brand) forwards",
            }}
          />
          <div
            className="absolute top-0 left-1/3 w-1/3 h-full z-[201]"
            style={{
              background: "var(--color-cream)",
              animation: "curtain-center 0.8s var(--ease-brand) 0.1s forwards",
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/3 h-full z-[201]"
            style={{
              background: "var(--color-cream)",
              animation: "curtain-right 0.8s var(--ease-brand) 0.2s forwards",
            }}
          />
        </>
      )}
    </div>
  );
}
