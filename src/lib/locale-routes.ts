import type { Locale } from "@/lib/i18n-data";

export type LocalizedAlternateLink = {
  locale: Locale | "x-default";
  path: string;
};

export type LocalizedLegalDocumentKey = "privacy" | "cookies";

const ENGLISH_PREFIX = "/en";

function trimTrailingSlash(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return trimTrailingSlash(withLeadingSlash);
}

export function getPathLocale(pathname: string): Locale {
  const normalizedPathname = normalizePathname(pathname);

  return normalizedPathname === ENGLISH_PREFIX || normalizedPathname.startsWith(`${ENGLISH_PREFIX}/`) ? "en" : "pl";
}

export function stripLocalePrefix(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === ENGLISH_PREFIX) {
    return "/";
  }

  if (normalizedPathname.startsWith(`${ENGLISH_PREFIX}/`)) {
    return normalizedPathname.slice(ENGLISH_PREFIX.length);
  }

  return normalizedPathname;
}

export function localizePath(pathname: string, locale: Locale) {
  const canonicalPathname = stripLocalePrefix(pathname);

  if (locale === "en") {
    return canonicalPathname === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${canonicalPathname}`;
  }

  return canonicalPathname;
}

export function isHomePath(pathname: string) {
  return stripLocalePrefix(pathname) === "/";
}

export function getLocalizedHashPath(locale: Locale, hash: string) {
  const normalizedHash = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";
  return `${localizePath("/", locale)}${normalizedHash}`;
}

export function getLocalizedServicePath(locale: Locale, slug: string) {
  return localizePath(`/uslugi/${slug}`, locale);
}

export function getLocalizedLegalPath(locale: Locale, documentKey: LocalizedLegalDocumentKey) {
  return localizePath(documentKey === "privacy" ? "/privacy-policy" : "/cookie-policy", locale);
}

export function getLocalizedNotFoundPath(locale: Locale) {
  return localizePath("/404", locale);
}

export function getLocaleSwitchPath(pathname: string, nextLocale: Locale, search = "", hash = "") {
  return `${localizePath(pathname, nextLocale)}${search}${hash}`;
}

export function getLocalizedAlternates(pathname: string): LocalizedAlternateLink[] {
  const canonicalPathname = stripLocalePrefix(pathname);

  return [
    { locale: "pl", path: localizePath(canonicalPathname, "pl") },
    { locale: "en", path: localizePath(canonicalPathname, "en") },
    { locale: "x-default", path: localizePath(canonicalPathname, "pl") },
  ];
}
