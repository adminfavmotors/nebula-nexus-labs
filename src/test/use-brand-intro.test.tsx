import { StrictMode, type ReactNode } from "react";
import { act, cleanup, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { brandIntroMotionTimings } from "@/lib/motion";
import { BRAND_INTRO_STORAGE_KEY, BRAND_INTRO_STORAGE_VALUE, useBrandIntro } from "@/lib/use-brand-intro";
import { startBrandIntro } from "@/lib/brand-intro-controller";
import { bootIntro, createIntroOptions, finishIntroEntry, resetIntro } from "@/test/brand-intro-fixture";
import App from "@/App";

function finishIntro() {
  act(() => vi.advanceTimersByTime(brandIntroMotionTimings.entryTimeoutMs));
  act(() => vi.advanceTimersByTime(brandIntroMotionTimings.settleDelayMs));
  act(() => vi.advanceTimersByTime(brandIntroMotionTimings.exitDurationMs));
}

describe("early intro ownership and React handoff", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
  });
  afterEach(() => {
    cleanup();
    resetIntro();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it.each(["getter", "read"] as const)("plays once when the storage %s is denied", (failure) => {
    const deny = () => { throw new DOMException("Storage disabled", "SecurityError"); };
    if (failure === "getter") vi.spyOn(window, "sessionStorage", "get").mockImplementation(deny);
    else vi.spyOn(Storage.prototype, "getItem").mockImplementation(deny);
    bootIntro();
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), { initialProps: { path: "/" } });
    expect(result.current.overlayPhase).toBe("running");
    act(finishIntroEntry);
    expect(result.current.overlayPhase).toBe("holding");
    finishIntro();
    expect(result.current.overlayPhase).toBeNull();
    rerender({ path: "/uslugi/strona-wizytowka" });
    rerender({ path: "/en" });
    expect(result.current.overlayPhase).toBeNull();
  });

  it("keeps page and cookie choices available after both storage APIs fail", () => {
    for (const property of ["sessionStorage", "localStorage"] as const) {
      vi.spyOn(window, property, "get").mockImplementation(() => { throw new DOMException("Disabled", "SecurityError"); });
    }
    const { container } = bootIntro();
    render(<App />, { container });
    expect(screen.getByRole("button", { name: "Pomiń intro" })).toBeInTheDocument();
    expect(container).toHaveAttribute("inert");
    finishIntro();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Odrzucam" })).toBeInTheDocument();
    expect(container).not.toHaveAttribute("inert");
  });

  it("respects reduced motion when storage is unavailable", () => {
    const media = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({ ...media(query), matches: true }));
    vi.spyOn(window, "sessionStorage", "get").mockImplementation(() => { throw new DOMException("Disabled", "SecurityError"); });
    bootIntro();
    expect(renderHook(() => useBrandIntro("/")).result.current.overlayPhase).toBeNull();
    expect(document.documentElement).not.toHaveAttribute("data-brand-intro-phase");
  });

  it("completes even when saving the playback mark fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new DOMException("Full", "QuotaExceededError"); });
    const { controller } = bootIntro();
    finishIntro();
    expect(controller.getSnapshot().phase).toBe("done");
    expect(startBrandIntro(createIntroOptions())).toBe(controller);
    expect(document.querySelector(".brand-intro-overlay")).toBeNull();
  });

  it("keeps the same DOM and native timeline through StrictMode effect replay", () => {
    const { controller } = bootIntro();
    const overlay = document.querySelector(".brand-intro-overlay");
    const { result } = renderHook(() => useBrandIntro("/"), {
      wrapper: ({ children }: { children: ReactNode }) => <StrictMode>{children}</StrictMode>,
    });
    expect(result.current.overlayPhase).toBe("running");
    expect(document.querySelector(".brand-intro-overlay")).toBe(overlay);
    expect(window.__node48BrandIntro).toBe(controller);
    finishIntro();
    expect(result.current.overlayPhase).toBeNull();
  });

  it("does not introduce a late intro on navigation from a service", () => {
    window.history.replaceState({}, "", "/uslugi/strona-wizytowka");
    bootIntro();
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), { initialProps: { path: window.location.pathname } });
    rerender({ path: "/" });
    expect(result.current.overlayPhase).toBeNull();
    expect(document.querySelector(".brand-intro-overlay")).toBeNull();
  });

  it("cancels and releases the page on route departure", () => {
    bootIntro();
    const { result, rerender } = renderHook(({ path }) => useBrandIntro(path), { initialProps: { path: "/" } });
    rerender({ path: "/uslugi/strona-wizytowka" });
    expect(result.current.overlayPhase).toBeNull();
    expect(document.getElementById("root")).not.toHaveAttribute("inert");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBeNull();
  });

  it("finishes independently when React has not loaded or unmounts", () => {
    const { controller, container } = bootIntro();
    const { unmount } = renderHook(() => useBrandIntro("/"));
    unmount();
    expect(controller.getSnapshot().phase).toBe("running");
    finishIntro();
    expect(controller.getSnapshot().phase).toBe("done");
    expect(container).not.toHaveAttribute("inert");
    expect(document.querySelector(".brand-intro-overlay")).toBeNull();
  });

  it.each(["1", "editor-v2"])("plays the restored wordmark after old mark %s", (oldMark) => {
    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, oldMark);
    const { controller } = bootIntro();
    expect(document.querySelector(".brand-intro-word")).toHaveTextContent("NODE48");
    expect(document.querySelector(".brand-intro-editor-tabs")).toBeNull();
    act(finishIntroEntry);
    finishIntro();
    expect(controller.getSnapshot().phase).toBe("done");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBe(BRAND_INTRO_STORAGE_VALUE);
    delete window.__node48BrandIntro;
    expect(startBrandIntro(createIntroOptions()).getSnapshot().didPlayIntro).toBe(false);
  });

  it("waits for the final letter and uses a bounded missing-event fallback", () => {
    const { controller } = bootIntro();
    const first = document.querySelector(".brand-intro-letter")!;
    first.dispatchEvent(Object.assign(new Event("animationend", { bubbles: true }), { animationName: "brand-intro-letter-print" }));
    expect(controller.getSnapshot().phase).toBe("running");
    act(() => vi.advanceTimersByTime(brandIntroMotionTimings.entryTimeoutMs - 1));
    expect(controller.getSnapshot().phase).toBe("running");
    act(() => vi.advanceTimersByTime(1));
    expect(controller.getSnapshot().phase).toBe("holding");
    finishIntro();
    expect(controller.getSnapshot().phase).toBe("done");
  });

  it("ignores a late animation event after skip", () => {
    const { controller } = bootIntro();
    const last = document.querySelector(".brand-intro-letter:last-child");
    act(() => controller.skip());
    last?.dispatchEvent(new AnimationEvent("animationend", { bubbles: true, animationName: "brand-intro-letter-print" }));
    finishIntro();
    expect(controller.getSnapshot().phase).toBe("done");
    expect(document.querySelector(".brand-intro-overlay")).toBeNull();
  });

  it("binds the page as soon as its root arrives, before React", async () => {
    const controller = startBrandIntro(createIntroOptions());
    expect(controller.getSnapshot().phase).toBe("running");
    const container = document.createElement("div");
    container.id = "root";
    document.body.append(container);
    await Promise.resolve();
    expect(container).toHaveAttribute("inert");
    controller.cancel();
    expect(container).not.toHaveAttribute("inert");
    expect(document.documentElement).not.toHaveAttribute("data-brand-intro-phase");
  });

  it("cancels on pagehide without recording unseen playback", () => {
    const { controller } = bootIntro();
    window.dispatchEvent(new Event("pagehide"));
    expect(controller.getSnapshot().phase).toBe("done");
    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBeNull();
    act(() => vi.advanceTimersByTime(0));
    expect(vi.getTimerCount()).toBe(0);
  });
});
