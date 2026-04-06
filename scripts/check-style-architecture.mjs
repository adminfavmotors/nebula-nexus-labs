import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const rootDir = process.cwd();
const srcDir = join(rootDir, "src");
const allowExtensions = new Set([".tsx"]);
const arbitraryUtilityPattern =
  /(?:^|\s)(?:[a-z0-9-]+:)*[a-z0-9-]+-\[[^\]\s]+\]|(?:^|\s)(?:[a-z0-9-]+:)*\[[^\]\s]+\]/gi;
const relevantPropPattern = /(className|titleClassName)\s*=/;

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    const extension = entry.name.slice(entry.name.lastIndexOf("."));
    if (allowExtensions.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = walk(srcDir);
const violations = [];

for (const filePath of files) {
  const source = readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (!relevantPropPattern.test(line)) {
      return;
    }

    const matches = line.match(arbitraryUtilityPattern);
    if (!matches || matches.length === 0) {
      return;
    }

    violations.push({
      file: relative(rootDir, filePath),
      line: index + 1,
      tokens: matches.map((match) => match.trim()),
      source: line.trim(),
    });
  });
}

if (violations.length > 0) {
  console.error("Style architecture check failed.");
  console.error("Arbitrary-value Tailwind utilities are not allowed in TSX presentation props.");
  console.error("Move reused presentation styles into the CSS layer or a shared component.");
  console.error("");

  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line}`);
    console.error(`  tokens: ${violation.tokens.join(", ")}`);
    console.error(`  line: ${violation.source}`);
  }

  process.exit(1);
}

const totalLines = files.reduce((sum, filePath) => {
  const lineCount = readFileSync(filePath, "utf8").split(/\r?\n/).length;
  return sum + lineCount;
}, 0);

console.log(
  `Style architecture check passed for ${files.length} TSX files (${totalLines} lines checked).`,
);
