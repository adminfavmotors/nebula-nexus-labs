import { useEffect, useRef, useState, type ReactNode } from "react";

type ViewportMountProps = {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
};

const PRELOAD_DISTANCE_PX = 360;

export function ViewportMount({
  children,
  fallback = null,
  className,
  rootMargin = `${PRELOAD_DISTANCE_PX}px 0px`,
  threshold = 0.01,
}: ViewportMountProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) {
      return;
    }

    const target = containerRef.current;
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setShouldMount(true);
      return;
    }

    const rect = target.getBoundingClientRect();
    const isNearViewport =
      rect.top <= window.innerHeight + PRELOAD_DISTANCE_PX && rect.bottom >= -PRELOAD_DISTANCE_PX;

    if (isNearViewport) {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, shouldMount, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {shouldMount ? children : fallback}
    </div>
  );
}
