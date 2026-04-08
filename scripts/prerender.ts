import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const distDir = path.join(workspaceRoot, "dist");
const templatePath = path.join(distDir, "index.html");

function injectSeoMarkup(html: string, seoMarkup: string) {
  return html.replace(
    /<!--app-seo-start-->[\s\S]*?<!--app-seo-end-->/,
    `<!--app-seo-start-->
    ${seoMarkup}
    <!--app-seo-end-->`,
  );
}

function injectAppMarkup(html: string, appMarkup: string) {
  return html.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`);
}

function resolveRouteHtmlPath(routePath: string) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  const normalizedPath = routePath.replace(/^\/+/, "");
  return path.join(distDir, ...normalizedPath.split("/"), "index.html");
}

const template = await readFile(templatePath, "utf8");
const viteServer = await createServer({
  appType: "custom",
  server: {
    middlewareMode: true,
  },
});

try {
  const { createSeoHeadMarkup, createSeoSnapshot } = await viteServer.ssrLoadModule("/src/lib/seo.ts");
  const { getIndexedRouteManifest } = await viteServer.ssrLoadModule("/src/lib/seo-routes.ts");
  const { renderPrerenderedRoute } = await viteServer.ssrLoadModule("/src/prerender/render-app.tsx");
  const indexedRoutes = getIndexedRouteManifest("pl");

  for (const route of indexedRoutes) {
    const appMarkup = renderPrerenderedRoute(route.path);
    const seoMarkup = createSeoHeadMarkup(createSeoSnapshot(route.seo));
    const html = injectAppMarkup(injectSeoMarkup(template, seoMarkup), appMarkup);
    const outputPath = resolveRouteHtmlPath(route.path);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf8");
  }
} finally {
  await viteServer.close();
}
