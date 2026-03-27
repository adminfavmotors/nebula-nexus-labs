import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  robots?: string;
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
    return element;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });

  return element;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.href = href;
}

export function usePageSeo({ title, description, path, robots = "index,follow" }: SeoOptions) {
  useEffect(() => {
    const canonicalUrl = new URL(path, siteConfig.siteUrl).toString();

    document.title = title;
    upsertCanonical(canonicalUrl);
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
  }, [description, path, robots, title]);
}
