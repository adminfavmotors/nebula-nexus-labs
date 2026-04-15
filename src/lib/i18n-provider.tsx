import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { I18nContext } from "@/lib/i18n-context";
import { STORAGE_KEY, translations, type Locale } from "@/lib/i18n-data";
import { getLocaleSwitchPath, getPathLocale } from "@/lib/locale-routes";
import { localeMotionTimings } from "@/lib/motion";

export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = getPathLocale(location.pathname);
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
        navigate(getLocaleSwitchPath(location.pathname, nextLocale, location.search, location.hash));
      });

      settleTimerRef.current = window.setTimeout(() => {
        setIsTransitioningLocale(false);
      }, localeMotionTimings.settleDelayMs);
    }, localeMotionTimings.changeDelayMs);
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
