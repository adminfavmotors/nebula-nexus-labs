import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";
import { I18nContext } from "@/lib/i18n-context";
import { STORAGE_KEY, translations, type Locale } from "@/lib/i18n-data";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "pl";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "pl";
  });
  const [isTransitioningLocale, setIsTransitioningLocale] = useState(false);
  const changeTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const t = translations[locale];

  const setLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    if (changeTimerRef.current) {
      window.clearTimeout(changeTimerRef.current);
    }

    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
    }

    setIsTransitioningLocale(true);

    changeTimerRef.current = window.setTimeout(() => {
      startTransition(() => {
        setLocaleState(nextLocale);
      });

      settleTimerRef.current = window.setTimeout(() => {
        setIsTransitioningLocale(false);
      }, 240);
    }, 110);
  };

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    return () => {
      if (changeTimerRef.current) {
        window.clearTimeout(changeTimerRef.current);
      }

      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  return <I18nContext.Provider value={{ locale, setLocale, isTransitioningLocale, t }}>{children}</I18nContext.Provider>;
}
