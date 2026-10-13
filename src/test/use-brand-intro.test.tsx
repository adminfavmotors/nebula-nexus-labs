import { StrictMode, Suspense, type ReactNode } from "react";
import { act, cleanup, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { brandIntroMotionTimings } from "@/lib/motion";
import { BRAND_INTRO_STORAGE_KEY, BRAND_INTRO_STORAGE_VALUE, useBrandIntro } from "@/lib/use-brand-intro";
import App from "@/App";

function finishIntro() {
  act(() => vi.advanceTimersByTime(brandIntroMotionTimings.entryTimeoutMs));
  act(() => vi.advanceTimersByTime(brandIntroMotionTimings.settleDelayMs));
  act(() => vi.advanceTimersByTime(brandIntroMotionTimings.exitDurationMs));
}

describe("intro lifecycle under browser and React failures", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it.each(["getter", "read"] as const)("plays once when the storage %s is denied", (failure) => {
    const denyStorage = () => { throw new DOMException("Storage disabled", "SecurityError"); };
    if (failure === "getter") vi.spyOn(window, "sessionStorage", "get").mockImplementation(denyStorage);
    else vi.spyOn(Storage.prototype, "getItem").mockImplementation(denyStorage);
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), { initialProps: { path: "/" } });
    expect(result.current.overlayPhase).toBe("running");
    act(() => result.current.completeEntry());
    expect(result.current.overlayPhase).toBe("holding");
    act(() => vi.advanceTimersByTime(brandIntroMotionTimings.settleDelayMs));
    act(() => vi.advanceTimersByTime(brandIntroMotionTimings.exitDurationMs));
    expect(result.current.overlayPhase).toBeNull();
    expect(result.current.heroReady).toBe(true);
    expect(document.body.style.overflow).toBe("");
    rerender({ path: "/uslugi/strona-wizytowka" });
    rerender({ path: "/en" });
    expect(result.current.overlayPhase).toBeNull();
  });

  it("keeps the page and cookie choices available when both storage APIs are denied", () => {
    window.history.replaceState({}, "", "/");
    for (const property of ["sessionStorage", "localStorage"] as const) {
      vi.spyOn(window, property, "get").mockImplementation(() => {
        throw new DOMException("Storage disabled", "SecurityError");
      });
    }
    render(<App />);
    expect(screen.getByRole("button", { name: "Pomiń intro" })).toBeInTheDocument();
    expect(document.querySelector(".app-shell")).toHaveAttribute("inert");
    finishIntro();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pomiń intro" })).toBeNull();
    expect(screen.getByRole("button", { name: "Odrzucam" })).toBeInTheDocument();
    expect(document.querySelector(".app-shell")).not.toHaveAttribute("inert");
  });

  it("respects reduced motion even when storage is unavailable", () => {
    const matchMedia = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({ ...matchMedia(query), matches: true }));
    vi.spyOn(window, "sessionStorage", "get").mockImplementation(() => {
      throw new DOMException("Storage disabled", "SecurityError");
    });
    const { result } = renderHook(() => useBrandIntro("/"));
    expect(result.current.overlayPhase).toBeNull();
    expect(result.current.heroReady).toBe(true);
    expect(document.body.style.overflow).toBe("");
  });

  it("completes the intro when persisting its session flag fails", () => {
    const storage = window.sessionStorage;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage) {
      if (this === storage) throw new DOMException("Storage full", "QuotaExceededError");
    });
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), { initialProps: { path: "/" } });
    expect(result.current.overlayPhase).toBe("running");
    finishIntro();
    expect(result.current.overlayPhase).toBeNull();
    expect(result.current.heroReady).toBe(true);
    expect(document.body.style.overflow).toBe("");
    rerender({ path: "/uslugi/strona-wizytowka" });
    rerender({ path: "/" });
    expect(result.current.overlayPhase).toBeNull();
  });

  it("keeps the initial intro running when StrictMode repeats mount effects", () => {
    const { result } = renderHook(() => useBrandIntro("/"), {
      wrapper: ({ children }: { children: ReactNode }) => <StrictMode>{children}</StrictMode>,
    });
    expect(result.current.overlayPhase).toBe("running");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBeNull();
    finishIntro();
    expect(result.current.overlayPhase).toBeNull();
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBe(BRAND_INTRO_STORAGE_VALUE);
    expect(document.body.style.overflow).toBe("");
  });

  it("starts on client navigation from a service and does not replay on returning home", () => {
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), {
      initialProps: { path: "/uslugi/strona-wizytowka" },
    });
    expect(result.current.overlayPhase).toBeNull();
    rerender({ path: "/" });
    expect(result.current.overlayPhase).toBe("running");
    act(() => result.current.skipIntro());
    rerender({ path: "/en/uslugi/strona-wizytowka" });
    rerender({ path: "/en" });
    expect(result.current.overlayPhase).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("cancels an active intro and releases scrolling when leaving the homepage", () => {
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), {
      initialProps: { path: "/" },
    });
    expect(document.body.style.overflow).toBe("hidden");
    rerender({ path: "/uslugi/strona-wizytowka" });
    expect(result.current.overlayPhase).toBeNull();
    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current.overlayPhase).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("ignores a deferred homepage intro after navigation changes the route", async () => {
    let resolveGate!: () => void;
    const gate = new Promise<void>((resolve) => { resolveGate = resolve; });
    let holdPlayback = true;
    const { result, rerender } = renderHook(({ path }) => {
      const intro = useBrandIntro(path);
      if (holdPlayback && intro.overlayPhase === "running") throw gate;
      return intro;
    }, {
      initialProps: { path: "/" },
      wrapper: ({ children }: { children: ReactNode }) => <Suspense fallback={null}>{children}</Suspense>,
    });
    expect(result.current.overlayPhase).toBeNull();
    expect(document.body.style.overflow).toBe("");
    rerender({ path: "/uslugi/strona-wizytowka" });
    await act(async () => {
      holdPlayback = false;
      resolveGate();
      await gate;
    });
    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current.overlayPhase).toBeNull();
    expect(document.body.style.overflow).toBe("");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBeNull();
  });

  it("releases scrolling and cancels pending timers when unmounted during playback", () => {
    const { unmount } = renderHook(() => useBrandIntro("/"));
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    // Drain jsdom's zero-delay storage event, leaving any leaked phase timer.
    act(() => vi.advanceTimersByTime(0));
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(10_000));
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });

  it.each(["/", "/en"])("plays the corrected intro once on %s when an older release was viewed", (path) => {
    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, "1");
    const first = renderHook(() => useBrandIntro(path));
    expect(first.result.current.overlayPhase).toBe("running");
    act(() => first.result.current.completeEntry());
    expect(first.result.current.overlayPhase).toBe("holding");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBe(BRAND_INTRO_STORAGE_VALUE);
    first.unmount();
    const next = renderHook(() => useBrandIntro(path));
    expect(next.result.current.overlayPhase).toBeNull();
  });

  it("reveals and holds the word through a bounded fallback when animationend never arrives", () => {
    const { result } = renderHook(() => useBrandIntro("/"));
    act(() => vi.advanceTimersByTime(brandIntroMotionTimings.entryTimeoutMs - 1));
    expect(result.current.overlayPhase).toBe("running");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.overlayPhase).toBe("holding");
    expect(result.current.heroReady).toBe(false);
    expect(document.body.style.overflow).toBe("hidden");
    act(() => vi.advanceTimersByTime(brandIntroMotionTimings.settleDelayMs));
    expect(result.current.overlayPhase).toBe("exiting");
    expect(document.body.style.overflow).toBe("");
    act(() => vi.advanceTimersByTime(brandIntroMotionTimings.exitDurationMs));
    expect(result.current.overlayPhase).toBeNull();
  });

  it("ignores late animation completion after the user skips", () => {
    const { result } = renderHook(() => useBrandIntro("/"));
    const completeEntry = result.current.completeEntry;
    act(() => result.current.skipIntro());
    act(() => completeEntry());
    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current.overlayPhase).toBeNull();
    expect(document.body.style.overflow).toBe("");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBe(BRAND_INTRO_STORAGE_VALUE);
  });
});
