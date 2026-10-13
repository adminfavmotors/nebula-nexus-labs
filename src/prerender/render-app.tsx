/// <reference types="node" />
import { PassThrough } from "node:stream";
import { renderToPipeableStream, renderToStaticMarkup } from "react-dom/server";
import PrerenderedApp from "@/prerender/PrerenderedApp";
import BrandIntroOverlay from "@/components/BrandIntroOverlay";
import type { Locale } from "@/lib/i18n-data";

export function renderBrandIntroMarkup(locale: Locale) {
  return renderToStaticMarkup(<BrandIntroOverlay locale={locale} />);
}

export function renderPrerenderedRoute(pathname: string) {
  // Wait for every lazy/Suspense boundary before writing static, hydratable HTML.
  return new Promise<string>((resolve, reject) => {
    const output = new PassThrough();
    let html = "";
    let settled = false;
    output.setEncoding("utf8");
    output.on("data", (chunk: string) => { html += chunk; });
    output.on("end", () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve(html);
    });
    output.on("error", fail);

    function fail(error: unknown) {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      reject(error);
      abort();
      output.destroy();
    }

    const { pipe, abort } = renderToPipeableStream(<PrerenderedApp pathname={pathname} />, {
      onAllReady() { if (!settled) pipe(output); },
      onShellError: fail,
      onError: fail,
    });
    const timeoutId = setTimeout(() => fail(new Error(`Prerender timed out: ${pathname}`)), 30_000);
  });
}
