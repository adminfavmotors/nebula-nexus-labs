import { googleTagManagerId } from "@/lib/analytics-config";

const GTM_SCRIPT_ID = "node48-gtm-script";
const GTM_NOSCRIPT_ID = "node48-gtm-noscript";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function loadGoogleTagManager() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const gtmId = googleTagManagerId;

  if (!gtmId || document.getElementById(GTM_SCRIPT_ID)) {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  if (!document.getElementById(GTM_NOSCRIPT_ID)) {
    const noscript = document.createElement("noscript");
    noscript.id = GTM_NOSCRIPT_ID;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.hidden = true;
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    noscript.appendChild(iframe);
    document.body.prepend(noscript);
  }
}
