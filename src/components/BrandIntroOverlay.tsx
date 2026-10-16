import type { CSSProperties } from "react";
import { ActionButton } from "@/components/primitives/Actions";
import { brandName } from "@/lib/site-identity";
import { brandWordmarkGlyphs } from "@/lib/brand-wordmark";
import { brandIntroMotionTimings } from "@/lib/motion";
import type { Locale } from "@/lib/i18n-data";

const introCopy = {
  pl: {
    title: `${brandName} - intro strony głównej`,
    description: "Animacja startowa jest aktywna. Główna zawartość strony jest chwilowo niedostępna.",
    skip: "Pomiń intro",
  },
  en: {
    title: `${brandName} homepage intro`,
    description: "The intro animation is active. The main page content is temporarily unavailable.",
    skip: "Skip intro",
  },
} as const;

// The sole presentation, serialized for the early controller. React never
// mounts a second overlay after the homepage is already visible.
export default function BrandIntroOverlay({ locale }: { locale: Locale }) {
  const copy = introCopy[locale];
  const motionStyle = {
    "--brand-intro-letter-duration": `${brandIntroMotionTimings.letterDurationMs}ms`,
    "--brand-intro-letter-stagger": `${brandIntroMotionTimings.letterStaggerMs}ms`,
    "--brand-intro-exit-duration": `${brandIntroMotionTimings.exitDurationMs}ms`,
  } as CSSProperties;
  return (
    <div className="brand-intro-overlay brand-intro-overlay-running" role="dialog" aria-modal="true"
      aria-labelledby="brand-intro-title" aria-describedby="brand-intro-description" tabIndex={-1} style={motionStyle}>
      <p id="brand-intro-title" className="visually-hidden">{copy.title}</p>
      <p id="brand-intro-description" className="visually-hidden">{copy.description}</p>
      <div className="brand-intro-word" aria-hidden="true">
        {Array.from(brandName).map((character, index) => {
          const glyph = brandWordmarkGlyphs[character];
          return (
            <span className="brand-intro-slot" key={`${character}-${index}`}>
              <span className={`brand-intro-letter${/\d/.test(character) ? " brand-intro-letter-accent" : ""}`}
                style={{ "--brand-intro-index": index } as CSSProperties}>
                <svg viewBox={`0 0 ${glyph.advance} 1800`} width={`${glyph.advance / 2000}em`} height="0.9em" aria-hidden="true" focusable="false">
                  <title>{character}</title>
                  <path d={glyph.path} />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      <ActionButton variant="ghost" className="brand-intro-skip">{copy.skip}</ActionButton>
    </div>
  );
}
