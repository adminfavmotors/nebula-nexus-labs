import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from "react";
import { cx } from "@/lib/cx";

type RevealDirection = "up" | "left";

type RevealOwnProps = {
  delay?: number;
  direction?: RevealDirection;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

type RevealProps<T extends ElementType> = RevealOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps | "as"> & {
    as?: T;
  };

export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  direction = "up",
  threshold = 0.12,
  className,
  style,
  ...props
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const elementRef = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const markVisible = () => setIsVisible(true);
    const rect = target.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    if (isInViewport) {
      markVisible();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Component
      ref={(node: Element | null) => {
        elementRef.current = node;
      }}
      className={cx(
        "reveal",
        direction === "left" ? "reveal-direction-left" : "reveal-direction-up",
        isVisible && "reveal-visible",
        className,
      )}
      style={{
        ...style,
        transitionDelay: `${delay}s`,
      }}
      {...props}
    />
  );
}
