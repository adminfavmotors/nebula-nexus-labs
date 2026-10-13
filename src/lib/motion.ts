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
  codeDurationMs: 600,
  rowTypingDurationMs: 260,
  brandTypingDelayMs: 200,
  brandTypingDurationMs: 400,
  // Bound entry when a browser does not deliver the word's animationend event.
  entryTimeoutMs: 1200,
  settleDelayMs: 200,
  exitDurationMs: 240,
} as const;

const brandIntroEntryDurationMs = Math.max(
  rawBrandIntroMotionTimings.codeDurationMs,
  rawBrandIntroMotionTimings.brandTypingDelayMs + rawBrandIntroMotionTimings.brandTypingDurationMs,
);

export const brandIntroMotionTimings = {
  ...rawBrandIntroMotionTimings,
  entryDurationMs: brandIntroEntryDurationMs,
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
