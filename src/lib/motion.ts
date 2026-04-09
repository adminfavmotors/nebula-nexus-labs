import { brandName } from "@/lib/site-identity";

export const localeMotionTimings = {
  changeDelayMs: 110,
  settleDelayMs: 240,
} as const;

const rawBrandIntroMotionTimings = {
  letterDurationMs: 760,
  letterStaggerMs: 64,
  settleDelayMs: 260,
  exitDurationMs: 460,
  fontReadyTimeoutMs: 1200,
} as const;

function getBrandIntroTimeline(letterCount: number) {
  const safeLetterCount = Math.max(1, letterCount);
  const entryDurationMs =
    rawBrandIntroMotionTimings.letterDurationMs +
    rawBrandIntroMotionTimings.letterStaggerMs * (safeLetterCount - 1);
  const exitDelayMs = entryDurationMs + rawBrandIntroMotionTimings.settleDelayMs;
  const totalDurationMs = exitDelayMs + rawBrandIntroMotionTimings.exitDurationMs;

  return {
    ...rawBrandIntroMotionTimings,
    entryDurationMs,
    exitDelayMs,
    totalDurationMs,
  };
}

export const brandIntroMotionTimings = getBrandIntroTimeline(brandName.length);

export const heroMotionDelays = {
  default: {
    badge: 260,
    wordStart: 380,
    wordStep: 120,
    body: 840,
    visual: 520,
    actions: 980,
    support: 1120,
  },
  intro: {
    badge: 50,
    wordStart: 120,
    wordStep: 90,
    body: 320,
    visual: 140,
    actions: 430,
    support: 560,
  },
} as const;
