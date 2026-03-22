import { createContext } from "react";
import type { Locale, TranslationSet } from "@/lib/i18n-data";

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isTransitioningLocale: boolean;
  t: TranslationSet;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
