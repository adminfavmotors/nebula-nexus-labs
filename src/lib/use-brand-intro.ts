import { useEffect, useMemo, useState } from "react";
import { isHomePath } from "@/lib/locale-routes";
import { brandIntroMotionTimings } from "@/lib/motion";
import { brandName } from "@/lib/site-identity";
import { usePageScrollLock } from "@/lib/page-scroll-lock";

export const BRAND_INTRO_STORAGE_KEY = "node48-brand-intro-played";
export const BRAND_INTRO_EXIT_DELAY_MS = brandIntroMotionTimings.exitDelayMs;
export const BRAND_INTRO_FONT_READY_TIMEOUT_MS = brandIntroMotionTimings.fontReadyTimeoutMs;
export const BRAND_INTRO_TOTAL_MS = brandIntroMotionTimings.totalDurationMs;
const BRAND_INTRO_FONT = '700 1em "Space Grotesk"';

type BrandIntroPhase = "done" | "preparing" | "running" | "exiting";

type BrandIntroState = {
  didPlayIntro: boolean;
  heroReady: boolean;
  overlayPhase: Exclude<BrandIntroPhase, "done"> | null;
};

type BrandIntroSnapshot = {
  didPlayIntro: boolean;
  phase: BrandIntroPhase;
};

function shouldPlayBrandIntro(pathname: string) {
  if (typeof window === "undefined" || !isHomePath(pathname)) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasPlayed = window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY) === "1";

  return !prefersReducedMotion && !hasPlayed;
}

function isBrandIntroFontReady() {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return true;
  }

  return typeof document.fonts.check !== "function"
    ? true
    : document.fonts.check(BRAND_INTRO_FONT, brandName);
}

function createBrandIntroSnapshot(pathname: string): BrandIntroSnapshot {
  const playIntro = shouldPlayBrandIntro(pathname);

  return {
    didPlayIntro: playIntro,
    phase: playIntro ? (isBrandIntroFontReady() ? "running" : "preparing") : "done",
  };
}

export function useBrandIntro(pathname: string): BrandIntroState {
  const [introState, setIntroState] = useState<BrandIntroSnapshot>(() => createBrandIntroSnapshot(pathname));
  const { didPlayIntro, phase } = introState;

  useEffect(() => {
    if (!shouldPlayBrandIntro(pathname)) {
      setIntroState((currentState) =>
        currentState.phase === "done" && !currentState.didPlayIntro
          ? currentState
          : { didPlayIntro: false, phase: "done" },
      );
      return;
    }

    setIntroState((currentState) =>
      currentState.phase === "done"
        ? { didPlayIntro: true, phase: isBrandIntroFontReady() ? "running" : "preparing" }
        : currentState,
    );
  }, [pathname]);

  useEffect(() => {
    if (phase !== "preparing" || typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, "1");

    if (typeof document === "undefined" || !("fonts" in document)) {
      setIntroState((currentState) =>
        currentState.phase === "preparing"
          ? { ...currentState, phase: "running" }
          : currentState,
      );
      return;
    }

    let cancelled = false;
    let timeoutId: number | null = null;

    const loadPromise =
      typeof document.fonts.load === "function"
        ? document.fonts.load(BRAND_INTRO_FONT, brandName).catch(() => undefined)
        : Promise.resolve(undefined);

    const readyPromise = Promise.resolve(document.fonts.ready).catch(() => undefined);
    const timeoutPromise = new Promise<void>((resolve) => {
      timeoutId = window.setTimeout(resolve, BRAND_INTRO_FONT_READY_TIMEOUT_MS);
    });

    void Promise.race([
      Promise.allSettled([loadPromise, readyPromise]).then(() => undefined),
      timeoutPromise,
    ]).then(() => {
      if (cancelled) {
        return;
      }

      setIntroState((currentState) =>
        currentState.phase === "preparing"
          ? { ...currentState, phase: "running" }
          : currentState,
      );
    });

    return () => {
      cancelled = true;

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [phase]);

  useEffect(() => {
    if ((phase !== "running" && phase !== "exiting") || typeof window === "undefined") {
      return;
    }

    let exitTimeoutId: number | null = null;
    let doneTimeoutId: number | null = null;

    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, "1");

    exitTimeoutId = window.setTimeout(() => {
      setIntroState((currentState) =>
        currentState.phase === "running"
          ? { ...currentState, phase: "exiting" }
          : currentState,
      );
    }, BRAND_INTRO_EXIT_DELAY_MS);

    doneTimeoutId = window.setTimeout(() => {
      setIntroState((currentState) =>
        currentState.phase === "done"
          ? currentState
          : { didPlayIntro: currentState.didPlayIntro, phase: "done" },
      );
    }, BRAND_INTRO_TOTAL_MS);

    return () => {
      if (exitTimeoutId !== null) {
        window.clearTimeout(exitTimeoutId);
      }

      if (doneTimeoutId !== null) {
        window.clearTimeout(doneTimeoutId);
      }
    };
  }, [phase]);

  usePageScrollLock(phase === "preparing" || phase === "running");

  return useMemo(
    () => ({
      didPlayIntro,
      heroReady: phase === "exiting" || phase === "done",
      overlayPhase: phase === "done" ? null : phase,
    }),
    [didPlayIntro, phase],
  );
}
