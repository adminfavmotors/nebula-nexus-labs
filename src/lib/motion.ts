export const localeMotionTimings = {
  changeDelayMs: 110,
  settleDelayMs: 240,
} as const;

export const brandIntroMotionTimings = {
  exitDelayMs: 860,
  totalDurationMs: 1380,
  fontReadyTimeoutMs: 1200,
} as const;

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
