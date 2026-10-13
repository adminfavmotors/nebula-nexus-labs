import { renderToStaticMarkup } from "react-dom/server";
import BrandIntroOverlay from "@/components/BrandIntroOverlay";
import { startBrandIntro, type BrandIntroBootOptions } from "@/lib/brand-intro-controller";
import { BRAND_INTRO_STORAGE_KEY, BRAND_INTRO_STORAGE_VALUE } from "@/lib/brand-intro-config";
import { brandIntroMotionTimings } from "@/lib/motion";

export function createIntroOptions(): BrandIntroBootOptions {
  return {
    markupByPath: { "/": renderToStaticMarkup(<BrandIntroOverlay locale="pl" />), "/en": renderToStaticMarkup(<BrandIntroOverlay locale="en" />) },
    storageKey: BRAND_INTRO_STORAGE_KEY,
    storageValue: BRAND_INTRO_STORAGE_VALUE,
    ...brandIntroMotionTimings,
  };
}

export function bootIntro() {
  let container = document.getElementById("root");
  if (!container) {
    container = document.createElement("div");
    container.id = "root";
    document.body.append(container);
  }
  return { container, controller: startBrandIntro(createIntroOptions()) };
}

export function finishIntroEntry() {
  const letters = document.querySelectorAll(".brand-intro-letter");
  letters[letters.length - 1]?.dispatchEvent(Object.assign(new Event("animationend", { bubbles: true }), { animationName: "brand-intro-letter-print" }));
}

export function resetIntro() {
  window.__node48BrandIntro?.cancel();
  delete window.__node48BrandIntro;
  document.getElementById("root")?.remove();
}
