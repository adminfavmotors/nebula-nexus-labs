import { useEffect, useSyncExternalStore } from "react";
import { isHomePath } from "@/lib/locale-routes";
import type { BrandIntroSnapshot } from "@/lib/brand-intro-controller";

export { BRAND_INTRO_STORAGE_KEY, BRAND_INTRO_STORAGE_VALUE } from "@/lib/brand-intro-config";

const idleSnapshot: BrandIntroSnapshot = { phase: "done", didPlayIntro: false };
const getServerSnapshot = () => idleSnapshot;
const getSnapshot = () => typeof window === "undefined" ? idleSnapshot : window.__node48BrandIntro?.getSnapshot() ?? idleSnapshot;
const subscribe = (listener: () => void) => window.__node48BrandIntro?.subscribe(listener) ?? (() => {});

export function useBrandIntro(pathname: string) {
  // Hydration matches the existing page, then observes its early intro owner.
  const { phase, didPlayIntro } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (!isHomePath(pathname)) window.__node48BrandIntro?.cancel();
  }, [pathname]);
  return {
    didPlayIntro,
    heroReady: phase === "exiting" || phase === "done",
    overlayPhase: phase === "done" ? null : phase,
  };
}
