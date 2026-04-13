import { useEffect, type RefObject } from "react";

/**
 * Observes a container element via IntersectionObserver.
 * When the element enters the viewport, sets data-reveal="visible" on it.
 * Disconnects immediately after — zero cost once triggered.
 *
 * CSS then animates children via .reveal-item + --reveal-i stagger.
 */
export function useReveal(
  ref: RefObject<Element | null>,
  { threshold = 0.12, rootMargin = "-40px 0px" }: IntersectionObserverInit = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already triggered (e.g. HMR / StrictMode double-mount)
    if ((el as HTMLElement).dataset.reveal === "visible") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (el as HTMLElement).dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
