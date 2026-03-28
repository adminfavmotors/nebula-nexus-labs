import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  robots?: string;
  structuredData?: Array<{
    id: string;
    schema: Record<string, unknown>;
  }>;
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

function syncStructuredData(structuredData: SeoOptions["structuredData"] = []) {
  const managedSelector = 'script[type="application/ld+json"][data-managed-structured-data="true"]';

  document.head.querySelectorAll(managedSelector).forEach((node) => node.remove());

  structuredData.forEach(({ id, schema }) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-managed-structured-data", "true");
    script.setAttribute("data-structured-data-id", id);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function usePageSeo({ title, description, path, robots = "index,follow", structuredData = [] }: SeoOptions) {
  const structuredDataSignature = JSON.stringify(structuredData);

  useEffect(() => {
    const canonicalUrl = new URL(path, siteConfig.siteUrl).toString();
    const normalizedStructuredData = JSON.parse(structuredDataSignature) as NonNullable<SeoOptions["structuredData"]>;

    document.title = title;
    upsertCanonical(canonicalUrl);
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    syncStructuredData(normalizedStructuredData);

    return () => {
      syncStructuredData([]);
    };
  }, [description, path, robots, structuredDataSignature, title]);
}
