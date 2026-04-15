import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createSeoSnapshot } from "../src/lib/seo.ts";
import { getIndexedRouteManifest } from "../src/lib/seo-routes.ts";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(workspaceRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

function getPriority(path: string): string {
  if (path === "/" || path === "/en") return "1.0";
  if (path.startsWith("/uslugi/") || path.startsWith("/en/uslugi/")) return "0.8";
  return "0.3";
}

function createSitemapXml() {
  const today = new Date().toISOString().split("T")[0];
  const entries = [...getIndexedRouteManifest("pl"), ...getIndexedRouteManifest("en")];
  const urlEntries = entries
    .map(({ seo }) => {
      const snapshot = createSeoSnapshot(seo);
      const priority = getPriority(seo.path);
      const alternateLinks = snapshot.alternates
        .filter(({ locale }) => locale !== "x-default")
        .map(
          ({ locale, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`,
        )
        .join("\n");
      return `  <url>
    <loc>${snapshot.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
${alternateLinks ? `${alternateLinks}\n` : ""}  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;
}

await mkdir(publicDir, { recursive: true });
await writeFile(sitemapPath, createSitemapXml(), "utf8");
