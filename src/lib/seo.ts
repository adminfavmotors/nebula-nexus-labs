import { useEffect } from "react";
import { siteUrl } from "@/lib/site-identity";

export type StructuredDataEntry = {
  id: string;
  schema: Record<string, unknown>;
};

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  robots?: string;
  ogImage?: string;
  structuredData?: StructuredDataEntry[];
};

export type SeoSnapshot = {
  title: string;
  description: string;
  path: string;
  canonicalUrl: string;
  robots: string;
  ogImage?: string;
  structuredData: StructuredDataEntry[];
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

function syncStructuredData(structuredData: StructuredDataEntry[] = []) {
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

export function createSeoSnapshot({
  title,
  description,
  path,
  robots = "index,follow",
  ogImage,
  structuredData = [],
}: PageSeo): SeoSnapshot {
  return {
    title,
    description,
    path,
    canonicalUrl: new URL(path, siteUrl).toString(),
    robots,
    ogImage,
    structuredData,
  };
}

export function createSeoHeadMarkup(snapshot: SeoSnapshot) {
  const tags = [
    `<title>${escapeHtml(snapshot.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(snapshot.description)}" />`,
    `<link rel="canonical" href="${escapeAttribute(snapshot.canonicalUrl)}" />`,
    `<meta name="robots" content="${escapeAttribute(snapshot.robots)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeAttribute(snapshot.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(snapshot.description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(snapshot.canonicalUrl)}" />`,
    ...(snapshot.ogImage ? [`<meta property="og:image" content="${escapeAttribute(snapshot.ogImage)}" />`] : []),
    `<meta name="twitter:title" content="${escapeAttribute(snapshot.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(snapshot.description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(snapshot.ogImage ? [`<meta name="twitter:image" content="${escapeAttribute(snapshot.ogImage)}" />`] : []),
  ];

  for (const { id, schema } of snapshot.structuredData) {
    const serializedSchema = JSON.stringify(schema).replaceAll("<", "\\u003c");

    tags.push(
      `<script type="application/ld+json" data-managed-structured-data="true" data-structured-data-id="${escapeAttribute(id)}">${serializedSchema}</script>`,
    );
  }

  return tags.join("\n    ");
}

export function applySeoSnapshot(snapshot: SeoSnapshot) {
  document.title = snapshot.title;
  upsertCanonical(snapshot.canonicalUrl);
  upsertMeta('meta[name="description"]', { name: "description", content: snapshot.description });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: snapshot.title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: snapshot.description });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: snapshot.canonicalUrl });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  if (snapshot.ogImage) {
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: snapshot.ogImage });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: snapshot.ogImage });
  }
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: snapshot.title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: snapshot.description });
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="robots"]', { name: "robots", content: snapshot.robots });
  syncStructuredData(snapshot.structuredData);
}

export function usePageSeo(input: PageSeo) {
  const snapshot = createSeoSnapshot(input);
  const snapshotSignature = JSON.stringify(snapshot);

  useEffect(() => {
    const normalizedSnapshot = JSON.parse(snapshotSignature) as SeoSnapshot;

    applySeoSnapshot(normalizedSnapshot);

    return () => {
      syncStructuredData([]);
    };
  }, [snapshotSignature]);
}
