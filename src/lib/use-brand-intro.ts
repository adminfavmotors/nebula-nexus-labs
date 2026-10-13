import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isHomePath } from "@/lib/locale-routes";
import { brandIntroMotionTimings } from "@/lib/motion";
import { usePageScrollLock } from "@/lib/page-scroll-lock";

export const BRAND_INTRO_STORAGE_KEY = "node48-brand-intro-played";
export const BRAND_INTRO_STORAGE_VALUE = "editor-v2";

type BrandIntroPhase = "done" | "running" | "holding" | "exiting";

type BrandIntroState = {
  didPlayIntro: boolean;
  heroReady: boolean;
  overlayPhase: Exclude<BrandIntroPhase, "done"> | null;
  skipIntro: () => void;
  completeEntry: () => void;
};

type BrandIntroSnapshot = {
  didPlayIntro: boolean;
  phase: BrandIntroPhase;
};

function shouldPlayBrandIntro(pathname: string) {
  if (typeof window === "undefined" || !isHomePath(pathname)) return false;
  try {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY) !== BRAND_INTRO_STORAGE_VALUE;
  } catch {
    // Optional intro persistence must never prevent the page from starting.
    return false;
  }
}

export function useBrandIntro(pathname: string): BrandIntroState {
  // Match the visible server markup on the first client render. Playback is
  // progressive enhancement after React has attached to that existing page.
  const [introState, setIntroState] = useState<BrandIntroSnapshot>({ didPlayIntro: false, phase: "done" });
  const { didPlayIntro, phase } = introState;
  const previousPathnameRef = useRef<string | null>(null);
  const hasPlayedIntroRef = useRef(didPlayIntro);

  useEffect(() => {
    // Repeated mount effects must not mistake our own session flag for an
    // earlier visit and cancel the playback that this mount just requested.
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;
    const playIntro = !hasPlayedIntroRef.current && shouldPlayBrandIntro(pathname);
    hasPlayedIntroRef.current ||= playIntro;
    if (playIntro) {
      // Lazy Suspense boundaries may still be hydrating. Optional playback must
      // wait for them rather than force replacement of the existing page.
      startTransition(() => setIntroState((current) => previousPathnameRef.current === pathname
        ? { didPlayIntro: true, phase: "running" } : current));
    } else {
      setIntroState((current) => current.phase === "done" && !current.didPlayIntro
        ? current : { didPlayIntro: false, phase: "done" });
    }
  }, [pathname]);

  useEffect(() => {
    if (phase === "holding" || (phase === "done" && didPlayIntro)) {
      try {
        window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, BRAND_INTRO_STORAGE_VALUE);
      } catch {
        // The mounted hook remembers playback even when storage cannot save it.
      }
    }
    if (phase === "done") return;
    // CSS completion starts the hold. Entry's timer is only a bounded fallback;
    // removing the running class at that boundary reveals the complete word.
    const duration = phase === "running" ? brandIntroMotionTimings.entryTimeoutMs
      : phase === "holding" ? brandIntroMotionTimings.settleDelayMs : brandIntroMotionTimings.exitDurationMs;
    const timeoutId = window.setTimeout(() => {
      setIntroState((current) => current.phase === phase
        ? { ...current, phase: phase === "running" ? "holding" : phase === "holding" ? "exiting" : "done" } : current);
    }, duration);
    return () => window.clearTimeout(timeoutId);
  }, [didPlayIntro, phase]);

  const completeEntry = useCallback(() => {
    setIntroState((current) => current.phase === "running" ? { ...current, phase: "holding" } : current);
  }, []);

  const skipIntro = useCallback(() => {
    setIntroState((current) => ({ ...current, phase: "done" }));
  }, []);

  usePageScrollLock(phase === "running" || phase === "holding");

  return useMemo(() => ({
    didPlayIntro,
    heroReady: phase === "exiting" || phase === "done",
    overlayPhase: phase === "done" ? null : phase,
    skipIntro,
    completeEntry,
  }), [didPlayIntro, phase, skipIntro, completeEntry]);
}
