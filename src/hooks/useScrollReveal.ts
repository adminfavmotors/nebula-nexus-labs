import { useEffect, useRef } from "react";

export function useScrollReveal(staggerDelay = 0.1) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".reveal-element, .reveal-left");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || "0");
            setTimeout(() => {
              el.classList.remove("reveal-pending");
              el.classList.add("revealed");
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el, i) => {
      if (!el.getAttribute("data-delay")) {
        el.setAttribute("data-delay", String(i * staggerDelay));
      }

      if (prefersReducedMotion) {
        el.classList.add("revealed");
        return;
      }

      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

      if (inViewport) {
        el.classList.add("revealed");
        return;
      }

      el.classList.add("reveal-pending");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [staggerDelay]);

  return containerRef;
}
