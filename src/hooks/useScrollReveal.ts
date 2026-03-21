import { useEffect, useRef } from "react";

export function useScrollReveal(staggerDelay = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".reveal-element, .reveal-left");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || "0");
            setTimeout(() => {
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
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [staggerDelay]);

  return containerRef;
}
