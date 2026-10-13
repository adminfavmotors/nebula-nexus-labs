export type BrandIntroSnapshot = {
  phase: "done" | "running" | "holding" | "exiting";
  didPlayIntro: boolean;
};

export type BrandIntroBootOptions = {
  markupByPath: Record<string, string>;
  storageKey: string;
  storageValue: string;
  entryTimeoutMs: number;
  settleDelayMs: number;
  exitDurationMs: number;
};

export type BrandIntroController = {
  getSnapshot: () => BrandIntroSnapshot;
  subscribe: (listener: () => void) => () => void;
  skip: () => void;
  cancel: () => void;
};

declare global {
  interface Window { __node48BrandIntro?: BrandIntroController; }
}

// Also compiled into the early CSP-hashed script. All runtime helpers stay
// inside this function: React subscribes to this owner instead of restarting it.
export function startBrandIntro(options: BrandIntroBootOptions): BrandIntroController {
  if (window.__node48BrandIntro) return window.__node48BrandIntro;
  let snapshot: BrandIntroSnapshot = { phase: "done", didPlayIntro: false };
  const listeners = new Set<() => void>();
  let timer: number | undefined;
  let overlay: HTMLElement | undefined;
  let skipButton: HTMLButtonElement | null = null;
  let root: HTMLElement | null = null;
  let rootState: { inert: boolean; ariaHidden: string | null } | undefined;
  const rootObserver = new MutationObserver(bindRoot);
  let wasBlocking = false;

  function rememberPlayback() {
    try { window.sessionStorage.setItem(options.storageKey, options.storageValue); } catch { /* Optional persistence. */ }
  }
  function bindRoot() {
    if (rootState) return;
    root = document.getElementById("root");
    if (!root) return;
    rootState = { inert: root.hasAttribute("inert"), ariaHidden: root.getAttribute("aria-hidden") };
    root.setAttribute("inert", "");
    root.setAttribute("aria-hidden", "true");
    rootObserver?.disconnect();
  }
  function releaseRoot() {
    rootObserver?.disconnect();
    if (root && rootState) {
      if (!rootState.inert) root.removeAttribute("inert");
      if (rootState.ariaHidden === null) root.removeAttribute("aria-hidden");
      else root.setAttribute("aria-hidden", rootState.ariaHidden);
      if (wasBlocking) root.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });
    }
    rootState = undefined;
    wasBlocking = false;
  }
  function setPhase(phase: BrandIntroSnapshot["phase"]) {
    window.clearTimeout(timer);
    snapshot = { phase, didPlayIntro: snapshot.didPlayIntro };
    const blocking = phase === "running" || phase === "holding";
    if (blocking) {
      document.documentElement.setAttribute("data-brand-intro-phase", phase);
      wasBlocking = true;
      bindRoot();
    } else {
      document.documentElement.removeAttribute("data-brand-intro-phase");
      releaseRoot();
    }
    if (overlay) {
      overlay.className = `brand-intro-overlay${phase === "running" ? " brand-intro-overlay-running" : phase === "exiting" ? " brand-intro-overlay-exiting" : ""}`;
      overlay.setAttribute("aria-modal", String(blocking));
      if (phase === "exiting") overlay.setAttribute("aria-hidden", "true");
      if (skipButton) skipButton.disabled = !blocking;
      if (phase === "done") {
        overlay.remove();
        overlay = undefined;
        window.removeEventListener("pagehide", cancel);
      }
    }
    listeners.forEach((listener) => listener());
    if (phase === "running") timer = window.setTimeout(finishEntry, options.entryTimeoutMs);
    else if (phase === "holding") timer = window.setTimeout(() => setPhase("exiting"), options.settleDelayMs);
    else if (phase === "exiting") timer = window.setTimeout(() => setPhase("done"), options.exitDurationMs);
  }
  function finishEntry() {
    if (snapshot.phase !== "running") return;
    // Removing the running class reveals all letters, even on fallback timeout.
    rememberPlayback();
    setPhase("holding");
  }
  function skip() {
    if (snapshot.phase === "done") return;
    rememberPlayback();
    setPhase("done");
  }
  function cancel() { setPhase("done"); }
  const controller: BrandIntroController = {
    getSnapshot: () => snapshot,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    skip,
    cancel,
  };
  window.__node48BrandIntro = controller;
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const markup = options.markupByPath[pathname];
  if (!markup) return controller;
  try { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return controller; } catch { return controller; }
  try { if (window.sessionStorage.getItem(options.storageKey) === options.storageValue) return controller; } catch { /* Unknown earlier visit: allow playback. */ }
  const template = document.createElement("template");
  template.innerHTML = markup;
  const element = template.content.firstElementChild;
  if (!(element instanceof HTMLElement)) return controller;
  overlay = element;
  skipButton = overlay.querySelector<HTMLButtonElement>(".brand-intro-skip");
  const letters = overlay.querySelectorAll(".brand-intro-letter");
  const finalLetter = letters[letters.length - 1];
  overlay.addEventListener("animationend", (event) => {
    if (event.target === finalLetter && event.animationName === "brand-intro-letter-print") finishEntry();
  });
  skipButton?.addEventListener("click", skip);
  overlay.addEventListener("keydown", (event) => {
    if (snapshot.phase !== "running" && snapshot.phase !== "holding") return;
    if (event.key === "Escape") { event.preventDefault(); skip(); }
    else if (event.key === "Tab") { event.preventDefault(); skipButton?.focus({ preventScroll: true }); }
  });
  document.body.prepend(overlay);
  snapshot = { phase: "running", didPlayIntro: true };
  rootObserver.observe(document.body, { childList: true, subtree: true });
  setPhase("running");
  skipButton?.focus({ preventScroll: true });
  window.addEventListener("pagehide", cancel, { once: true });
  return controller;
}
