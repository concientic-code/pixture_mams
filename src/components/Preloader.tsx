"use client";

import { useEffect, useState, useCallback } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  const trackAssets = useCallback(() => {
    const images = Array.from(document.querySelectorAll("img"));
    const totalAssets = images.length || 1;
    let loaded = 0;

    const update = () => {
      loaded++;
      const pct = Math.min(100, Math.round((loaded / totalAssets) * 100));
      setProgress(pct);

      if (loaded >= totalAssets) {
        // Small delay to show 100% before revealing
        setTimeout(() => {
          setPhase("revealing");
          // After curtain animation finishes
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1200);
        }, 400);
      }
    };

    if (images.length === 0) {
      setProgress(100);
      setTimeout(() => {
        setPhase("revealing");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1200);
      }, 400);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        update();
      } else {
        img.addEventListener("load", update, { once: true });
        img.addEventListener("error", update, { once: true });
      }
    });

    // Fallback: si después de 5s no ha terminado, forzar completar
    setTimeout(() => {
      if (phase === "loading") {
        setProgress(100);
        setPhase("revealing");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1200);
      }
    }, 5000);
  }, [onComplete, phase]);

  useEffect(() => {
    // Wait for DOM to be ready with all img elements
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        trackAssets();
      });
    });
  }, [trackAssets]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[200] pointer-events-none"
      aria-hidden="true"
    >
      {/* Loading screen */}
      {phase === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[201]" style={{ background: "var(--color-cream)" }}>
          {/* Logo mark */}
          <img
            src="/images/logos/logomark-blue.png"
            alt=""
            className="w-12 h-12 mb-8 opacity-60"
          />
          {/* Progress bar + percentage */}
          <div className="flex items-center gap-3">
            <div className="w-[180px] h-[2px] bg-[rgba(71,128,176,0.2)]">
              <div
                className="h-full bg-mams-coral"
                style={{
                  width: `${progress}%`,
                  transition: "width 200ms linear",
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
              animation: "curtain-left 1s var(--ease-brand) forwards",
            }}
          />
          <div
            className="absolute top-0 left-1/3 w-1/3 h-full z-[201]"
            style={{
              background: "var(--color-cream)",
              animation: "curtain-center 1s var(--ease-brand) 0.15s forwards",
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/3 h-full z-[201]"
            style={{
              background: "var(--color-cream)",
              animation: "curtain-right 1s var(--ease-brand) 0.3s forwards",
            }}
          />
        </>
      )}
    </div>
  );
}
