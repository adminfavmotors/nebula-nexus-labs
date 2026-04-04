import type { CSSProperties } from "react";
import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/cx";

type BrandIntroOverlayProps = {
  phase: "running" | "exiting";
};

const digitPattern = /\d/;

const BrandIntroOverlay = ({ phase }: BrandIntroOverlayProps) => {
  return (
    <div
      className={cx(
        "brand-intro-overlay",
        phase === "running" && "brand-intro-overlay-running",
        phase === "exiting" && "brand-intro-overlay-exiting",
      )}
      aria-hidden="true"
    >
      <div className="brand-intro-backdrop" />
      <div className="brand-intro-word" aria-label={siteConfig.brandName}>
        {Array.from(siteConfig.brandName).map((character, index) => (
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
