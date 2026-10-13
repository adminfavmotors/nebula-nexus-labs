import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import type { ViteDevServer } from "vite";

export async function createBrandIntroBoot(server: ViteDevServer, workspaceRoot: string) {
  const { renderBrandIntroMarkup } = await server.ssrLoadModule("/src/prerender/render-app.tsx");
  const { brandIntroMotionTimings } = await server.ssrLoadModule("/src/lib/motion.ts");
  const { BRAND_INTRO_STORAGE_KEY, BRAND_INTRO_STORAGE_VALUE } = await server.ssrLoadModule("/src/lib/brand-intro-config.ts");
  const { localizePath } = await server.ssrLoadModule("/src/lib/locale-routes.ts");
  const markupByPath: Record<string, string> = {};
  for (const locale of ["pl", "en"]) markupByPath[localizePath("/", locale)] = renderBrandIntroMarkup(locale);
  const source = await readFile(path.join(workspaceRoot, "src/lib/brand-intro-controller.ts"), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2018, newLine: ts.NewLineKind.LineFeed },
  });
  const options = JSON.stringify({ markupByPath, storageKey: BRAND_INTRO_STORAGE_KEY, storageValue: BRAND_INTRO_STORAGE_VALUE,
    entryTimeoutMs: brandIntroMotionTimings.entryTimeoutMs, settleDelayMs: brandIntroMotionTimings.settleDelayMs,
    exitDurationMs: brandIntroMotionTimings.exitDurationMs }).replaceAll("<", "\\u003c");
  const script = `(()=>{const exports={};\n${outputText}\nexports.startBrandIntro(${options});})();`;
  return { script, hash: `sha256-${createHash("sha256").update(script).digest("base64")}` };
}

export function injectBrandIntroBoot(html: string, script: string) {
  if (!html.includes("<body>")) throw new Error("Cannot place intro before page markup.");
  return html.replace("<body>", `<body>\n<script id="node48-intro-boot">${script}</script>`);
}
