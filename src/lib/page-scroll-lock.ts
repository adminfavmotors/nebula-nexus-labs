import { useEffect } from "react";

let activePageScrollLocks = 0;
let previousHtmlOverflow = "";
let previousBodyOverflow = "";

export function acquirePageScrollLock() {
  if (typeof document === "undefined") {
    return () => {};
  }

  if (activePageScrollLocks === 0) {
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  activePageScrollLocks += 1;

  let released = false;

  return () => {
    if (released || typeof document === "undefined") {
      return;
    }

    released = true;
    activePageScrollLocks = Math.max(0, activePageScrollLocks - 1);

    if (activePageScrollLocks === 0) {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    }
  };
}

export function usePageScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    return acquirePageScrollLock();
  }, [active]);
}
