import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { brandName } from "@/lib/site-identity";
import { cx } from "@/lib/cx";
import { useI18n } from "@/lib/i18n";
import { brandIntroMotionTimings } from "@/lib/motion";

type BrandIntroOverlayProps = {
  phase: "preparing" | "running" | "exiting";
};

const digitPattern = /\d/;
const introCopy = {
  pl: {
    title: `${brandName} - intro strony głównej`,
    description: "Animacja startowa jest aktywna. Główna zawartość strony jest chwilowo niedostępna.",
  },
  en: {
    title: `${brandName} homepage intro`,
    description: "The intro animation is active. The main page content is temporarily unavailable.",
  },
} as const;

const BrandIntroOverlay = ({ phase }: BrandIntroOverlayProps) => {
  const { locale } = useI18n();
  const copy = introCopy[locale];
  const overlayRef = useRef<HTMLDivElement>(null);
  const introMotionStyle = {
    "--brand-intro-letter-duration": `${brandIntroMotionTimings.letterDurationMs}ms`,
    "--brand-intro-letter-stagger": `${brandIntroMotionTimings.letterStaggerMs}ms`,
    "--brand-intro-exit-duration": `${brandIntroMotionTimings.exitDurationMs}ms`,
  } as CSSProperties;

  useLayoutEffect(() => {
    overlayRef.current?.focus();
  }, []);

  return (
    <div
      ref={overlayRef}
      className={cx(
        "brand-intro-overlay",
        phase === "preparing" && "brand-intro-overlay-preparing",
        phase === "running" && "brand-intro-overlay-running",
        phase === "exiting" && "brand-intro-overlay-exiting",
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-intro-title"
      aria-describedby="brand-intro-description"
      tabIndex={-1}
      style={introMotionStyle}
    >
      <p id="brand-intro-title" className="visually-hidden">
        {copy.title}
      </p>
      <p id="brand-intro-description" className="visually-hidden">
        {copy.description}
      </p>
      <div className="brand-intro-backdrop" />
      <div className="brand-intro-word" aria-hidden="true">
        {Array.from(brandName).map((character, index) => (
          <span className="brand-intro-slot" key={`${character}-${index}`}>
            <span
              className={cx(
                "brand-intro-letter",
                digitPattern.test(character) && "brand-intro-letter-accent",
              )}
              style={{ "--brand-intro-index": index } as CSSProperties}
            >
              {character}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandIntroOverlay;
