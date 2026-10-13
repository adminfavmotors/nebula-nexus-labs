import "@testing-library/jest-dom";

// React selects animation event names during import. JSDOM needs the standard
// constructor present so the tests exercise the browser's animationend path.
class MockAnimationEvent extends Event {
  readonly animationName: string;
  constructor(type: string, init: AnimationEventInit = {}) {
    super(type, init);
    this.animationName = init.animationName ?? "";
  }
}
Object.defineProperty(window, "AnimationEvent", { writable: true, value: MockAnimationEvent });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(document, "fonts", {
  configurable: true,
  writable: true,
  value: {
    ready: Promise.resolve(undefined),
    load: () => Promise.resolve([]),
    check: () => true,
  },
});
