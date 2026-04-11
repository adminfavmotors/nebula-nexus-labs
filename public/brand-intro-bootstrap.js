(() => {
  try {
    const shouldPlayIntro =
      window.location.pathname === "/" &&
      window.sessionStorage.getItem("node48-brand-intro-played") !== "1" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldPlayIntro) {
      document.documentElement.setAttribute("data-brand-intro-pending", "");
    }
  } catch {}
})();
