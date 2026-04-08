import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createSeoSnapshot } from "../src/lib/seo.ts";
import { getIndexedRouteManifest } from "../src/lib/seo-routes.ts";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(workspaceRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

function createSitemapXml() {
  const urls = getIndexedRouteManifest("pl").map(({ seo }) => createSeoSnapshot(seo));
  const urlEntries = urls
    .map(
      (snapshot) => `  <url>
    <loc>${snapshot.canonicalUrl}</loc>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

await mkdir(publicDir, { recursive: true });
await writeFile(sitemapPath, createSitemapXml(), "utf8");
