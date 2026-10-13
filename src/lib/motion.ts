import { brandName } from "@/lib/site-identity";

export const localeMotionTimings = {
  changeDelayMs: 110,
  settleDelayMs: 240,
} as const;

export const structuralMotionTimings = {
  quickMs: 220,
  baseMs: 320,
  slowMs: 420,
  staggerMs: 48,
  mobileRevealStartMs: 120,
} as const;

const rawBrandIntroMotionTimings = {
  letterDurationMs: 760,
  letterStaggerMs: 64,
  settleDelayMs: 260,
  exitDurationMs: 460,
} as const;

const brandIntroEntryDurationMs = rawBrandIntroMotionTimings.letterDurationMs +
  rawBrandIntroMotionTimings.letterStaggerMs * Math.max(0, brandName.length - 1);

export const brandIntroMotionTimings = {
  ...rawBrandIntroMotionTimings,
  entryDurationMs: brandIntroEntryDurationMs,
  entryTimeoutMs: brandIntroEntryDurationMs + 1000,
} as const;

export const heroMotionDelays = {
  badge: 50,
  wordStart: 120,
  wordStep: 90,
  body: 320,
  visual: 140,
  actions: 430,
  support: 560,
} as const;

export const pageEntryMotionTimings = {
  introStartMs: 220,
  staggerMs: 72,
} as const;
