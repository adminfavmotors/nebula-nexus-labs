import { useEffect, useMemo, useState } from "react";
import { usePageScrollLock } from "@/lib/page-scroll-lock";

export const BRAND_INTRO_STORAGE_KEY = "node48-brand-intro-played";
export const BRAND_INTRO_EXIT_DELAY_MS = 860;
export const BRAND_INTRO_TOTAL_MS = 1380;

type BrandIntroPhase = "done" | "running" | "exiting";

type BrandIntroState = {
  didPlayIntro: boolean;
  heroReady: boolean;
  overlayPhase: Extract<BrandIntroPhase, "running" | "exiting"> | null;
};

export function useBrandIntro(pathname: string): BrandIntroState {
  const [phase, setPhase] = useState<BrandIntroPhase>("done");
  const [didPlayIntro, setDidPlayIntro] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname !== "/") {
      setDidPlayIntro(false);
      setPhase("done");
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPlayed = window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY) === "1";

    if (prefersReducedMotion || hasPlayed) {
      setDidPlayIntro(false);
      setPhase("done");
      return;
    }

    let exitTimeoutId: number | null = null;
    let doneTimeoutId: number | null = null;

    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, "1");
    setDidPlayIntro(true);
    setPhase("running");

    exitTimeoutId = window.setTimeout(() => {
      setPhase("exiting");
    }, BRAND_INTRO_EXIT_DELAY_MS);

    doneTimeoutId = window.setTimeout(() => {
      setPhase("done");
    }, BRAND_INTRO_TOTAL_MS);

    return () => {
      if (exitTimeoutId !== null) {
        window.clearTimeout(exitTimeoutId);
      }

      if (doneTimeoutId !== null) {
        window.clearTimeout(doneTimeoutId);
      }
    };
  }, [pathname]);

  usePageScrollLock(phase !== "done");

  return useMemo(
    () => ({
      didPlayIntro,
      heroReady: phase === "exiting" || phase === "done",
      overlayPhase: phase === "done" ? null : phase,
    }),
    [didPlayIntro, phase],
  );
}
