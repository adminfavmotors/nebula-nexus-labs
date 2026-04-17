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

function injectHtmlLang(html: string, lang: string) {
  return html.replace(/<html lang="[^"]+">/, `<html lang="${lang}">`);
}

function resolveRouteHtmlPath(routePath: string) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  const normalizedPath = routePath.replace(/^\/+/, "");
  return path.join(distDir, ...normalizedPath.split("/"), "index.html");
}

function resolveNotFoundHtmlPath() {
  return path.join(distDir, "404.html");
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
  const { getPrerenderRouteManifest } = await viteServer.ssrLoadModule("/src/lib/seo-routes.ts");
  const { translations } = await viteServer.ssrLoadModule("/src/lib/i18n-data.ts");
  const { renderPrerenderedRoute } = await viteServer.ssrLoadModule("/src/prerender/render-app.tsx");
  const indexedRoutes = [...getPrerenderRouteManifest("pl"), ...getPrerenderRouteManifest("en")];

  for (const route of indexedRoutes) {
    const appMarkup = renderPrerenderedRoute(route.path);
    const snapshot = createSeoSnapshot(route.seo);
    const seoMarkup = createSeoHeadMarkup(snapshot);
    const html = injectAppMarkup(injectHtmlLang(injectSeoMarkup(template, seoMarkup), snapshot.locale), appMarkup);
    const outputPath = resolveRouteHtmlPath(route.path);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf8");
  }

  const notFoundCopy = translations.pl.notFound;
  const notFoundMarkup = renderPrerenderedRoute("/404");
  const notFoundSnapshot = createSeoSnapshot({
    title: `404 | ${notFoundCopy.title}`,
    description: notFoundCopy.body,
    path: "/404",
    robots: "noindex,nofollow",
  });
  const notFoundSeo = createSeoHeadMarkup(notFoundSnapshot);
  const notFoundHtml = injectAppMarkup(
    injectHtmlLang(injectSeoMarkup(template, notFoundSeo), notFoundSnapshot.locale),
    notFoundMarkup,
  );

  await writeFile(resolveNotFoundHtmlPath(), notFoundHtml, "utf8");
} finally {
  await viteServer.close();
}
