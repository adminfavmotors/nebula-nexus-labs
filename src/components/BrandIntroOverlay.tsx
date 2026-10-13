import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { brandName } from "@/lib/site-identity";
import { cx } from "@/lib/cx";
import { useI18n } from "@/lib/i18n";
import { brandIntroMotionTimings } from "@/lib/motion";
import { ActionButton } from "@/components/primitives/Actions";

type BrandIntroOverlayProps = {
  phase: "running" | "exiting";
  onSkip: () => void;
};

type CodeTokenTone =
  | "plain"
  | "keyword"
  | "binding"
  | "function"
  | "string"
  | "property"
  | "type"
  | "comment";

type CodeToken = {
  text: string;
  tone?: CodeTokenTone;
};

type CodeRow = {
  tokens: CodeToken[];
};

const digitPattern = /\d/;
const brandStatementPrefix = 'const brand = "';
const brandStatementSuffix = '";';
const brandStatement = `${brandStatementPrefix}${brandName}${brandStatementSuffix}`;
const codeRows: CodeRow[] = [
  {
    tokens: [
      { text: "import", tone: "keyword" },
      { text: " { strategy, design, code } " },
      { text: "from", tone: "keyword" },
      { text: " " },
      { text: "'@node48/studio'", tone: "string" },
      { text: ";" },
    ],
  },
  {
    tokens: [
      { text: "type", tone: "keyword" },
      { text: " ProjectSignal", tone: "type" },
      { text: " = " },
      { text: "ReturnType", tone: "type" },
      { text: "<" },
      { text: "typeof", tone: "keyword" },
      { text: " design.compose>;" },
    ],
  },
  {
    tokens: [
      { text: "const", tone: "keyword" },
      { text: " route", tone: "binding" },
      { text: " = " },
      { text: "resolveLocale", tone: "function" },
      { text: "(window." },
      { text: "location", tone: "property" },
      { text: "." },
      { text: "pathname", tone: "property" },
      { text: ");" },
    ],
  },
  {
    tokens: [
      { text: "const", tone: "keyword" },
      { text: " canvas", tone: "binding" },
      { text: " = " },
      { text: "createExperience", tone: "function" },
      { text: "({ " },
      { text: "intent", tone: "property" },
      { text: ": " },
      { text: "'growth'", tone: "string" },
      { text: " });" },
    ],
  },
  {
    tokens: [
      { text: "await", tone: "keyword" },
      { text: " " },
      { text: "preloadCriticalAssets", tone: "function" },
      { text: "([" },
      { text: "'hero'", tone: "string" },
      { text: ", " },
      { text: "'portfolio'", tone: "string" },
      { text: ", " },
      { text: "'seo'", tone: "string" },
      { text: "]);" },
    ],
  },
  {
    tokens: [
      { text: "const", tone: "keyword" },
      { text: " signal", tone: "binding" },
      { text: " = " },
      { text: "compose", tone: "function" },
      { text: "(strategy, design, code)." },
      { text: "ship", tone: "function" },
      { text: "();" },
    ],
  },
  {
    tokens: [
      { text: "if", tone: "keyword" },
      { text: " (visitor." },
      { text: "ready", tone: "property" },
      { text: ") cursor." },
      { text: "openWorkspace", tone: "function" },
      { text: "(" },
      { text: "'NODE'", tone: "string" },
      { text: ");" },
    ],
  },
  {
    tokens: [
      { text: "render", tone: "function" },
      { text: "(<" },
      { text: "Hero", tone: "type" },
      { text: " " },
      { text: "locale", tone: "property" },
      { text: "={route.locale} " },
      { text: "priority", tone: "property" },
      { text: "=" },
      { text: "\"first-screen\"", tone: "string" },
      { text: " />);" },
    ],
  },
  {
    tokens: [
      { text: "pipeline", tone: "binding" },
      { text: "." },
      { text: "measure", tone: "function" },
      { text: "({ " },
      { text: "ux", tone: "property" },
      { text: ": " },
      { text: "'sharp'", tone: "string" },
      { text: ", " },
      { text: "speed", tone: "property" },
      { text: ": " },
      { text: "'clean'", tone: "string" },
      { text: " });" },
    ],
  },
  {
    tokens: [
      { text: "route", tone: "binding" },
      { text: "." },
      { text: "prefetch", tone: "function" },
      { text: "(" },
      { text: "'/en'", tone: "string" },
      { text: ")." },
      { text: "then", tone: "function" },
      { text: "(syncLocalizedSlugs);" },
    ],
  },
  {
    tokens: [
      { text: "deploy", tone: "binding" },
      { text: "." },
      { text: "preview", tone: "function" },
      { text: "({ " },
      { text: "checks", tone: "property" },
      { text: ": [" },
      { text: "'lint'", tone: "string" },
      { text: ", " },
      { text: "'test'", tone: "string" },
      { text: ", " },
      { text: "'build'", tone: "string" },
      { text: "] });" },
    ],
  },
  {
    tokens: [
      { text: "const", tone: "keyword" },
      { text: " product", tone: "binding" },
      { text: " = " },
      { text: "launch", tone: "function" },
      { text: "({ " },
      { text: "brand", tone: "property" },
      { text: ": " },
      { text: `'${brandName}'`, tone: "string" },
      { text: ", " },
      { text: "stack", tone: "property" },
      { text: ": signal });" },
    ],
  },
  {
    tokens: [
      { text: "return", tone: "keyword" },
      { text: " product." },
      { text: "with", tone: "function" },
      { text: "({ " },
      { text: "trust", tone: "property" },
      { text: ": true, " },
      { text: "motion", tone: "property" },
      { text: ": " },
      { text: "'disciplined'", tone: "string" },
      { text: " });" },
    ],
  },
  {
    tokens: [{ text: `// ${brandName} compiles strategy into a faster first impression`, tone: "comment" }],
  },
] as const;
const brandSeedRows = codeRows.map((row) => row.tokens.map((token) => token.text).join(""));
const introCopy = {
  pl: {
    title: `${brandName} - intro strony głównej`,
    description: "Animacja startowa jest aktywna. Główna zawartość strony jest chwilowo niedostępna.",
    skip: "Pomiń intro",
  },
  en: {
    title: `${brandName} homepage intro`,
    description: "The intro animation is active. The main page content is temporarily unavailable.",
    skip: "Skip intro",
  },
} as const;

const BrandIntroOverlay = ({ phase, onSkip }: BrandIntroOverlayProps) => {
  const { locale } = useI18n();
  const copy = introCopy[locale];
  const skipRef = useRef<HTMLButtonElement>(null);
  const introMotionStyle = {
    "--brand-intro-row-duration": `${brandIntroMotionTimings.rowTypingDurationMs}ms`,
    "--brand-intro-row-stagger": `${(brandIntroMotionTimings.codeDurationMs - brandIntroMotionTimings.rowTypingDurationMs) / Math.max(1, codeRows.length - 1)}ms`,
    "--brand-intro-brand-delay": `${brandIntroMotionTimings.brandTypingDelayMs}ms`,
    "--brand-intro-brand-duration": `${brandIntroMotionTimings.brandTypingDurationMs}ms`,
    "--brand-intro-exit-duration": `${brandIntroMotionTimings.exitDurationMs}ms`,
    "--brand-intro-brand-statement-length": brandStatement.length,
  } as CSSProperties;

  useLayoutEffect(() => {
    skipRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={cx(
        "brand-intro-overlay",
        phase === "running" && "brand-intro-overlay-running",
        phase === "exiting" && "brand-intro-overlay-exiting",
      )}
      role="dialog"
      aria-modal={phase !== "exiting"}
      aria-hidden={phase === "exiting" || undefined}
      aria-labelledby="brand-intro-title"
      aria-describedby="brand-intro-description"
      tabIndex={-1}
      style={introMotionStyle}
      onKeyDown={(event) => {
        if (phase === "exiting") return;
        if (event.key === "Escape") {
          event.preventDefault();
          onSkip();
        } else if (event.key === "Tab") {
          event.preventDefault();
          skipRef.current?.focus();
        }
      }}
    >
      <p id="brand-intro-title" className="visually-hidden">
        {copy.title}
      </p>
      <p id="brand-intro-description" className="visually-hidden">
        {copy.description}
      </p>
      <div className="brand-intro-terminal" aria-hidden="true">
        <div className="brand-intro-editor-tabs">
            <span className="brand-intro-editor-tab brand-intro-editor-tab-active">App.tsx</span>
            <span className="brand-intro-editor-tab">motion.ts</span>
            <span className="brand-intro-editor-tab">seo-routes.ts</span>
        </div>
        <div className="brand-intro-code-stream">
          {codeRows.map((row, index) => (
            <span
              className="brand-intro-code-row"
              key={brandSeedRows[index]}
              style={
                {
                  "--brand-intro-row-index": index,
                  "--brand-intro-line-length": brandSeedRows[index].length,
                } as CSSProperties
              }
            >
              <span className="brand-intro-line-number">{index + 1}</span>
              <span className="brand-intro-code-line">
                {row.tokens.map((token, tokenIndex) => (
                  <span
                    className={cx("brand-intro-token", token.tone && `brand-intro-token-${token.tone}`)}
                    key={`${token.text}-${tokenIndex}`}
                  >
                    {token.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </div>
        <div className="brand-intro-word">
          <code className="brand-intro-statement">
            <span className="brand-intro-token-keyword">const</span>
            {" brand = \""}
            <span className="brand-intro-statement-brand">
              {Array.from(brandName).map((character, index) => (
                <span
                  className={digitPattern.test(character) ? "brand-intro-letter-accent" : undefined}
                  key={`${character}-${index}`}
                >
                  {character}
                </span>
              ))}
            </span>
            {"\";"}
          </code>
        </div>
      </div>
      <ActionButton
        ref={skipRef}
        variant="ghost"
        className="brand-intro-skip"
        onClick={onSkip}
        disabled={phase === "exiting"}
      >
        {copy.skip}
      </ActionButton>
    </div>
  );
};

export default BrandIntroOverlay;
