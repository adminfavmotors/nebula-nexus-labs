import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const decoder = new TextDecoder("utf-8", { fatal: true });

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
]);

const ignoredDirs = new Set([".git", "dist", "node_modules"]);
const suspiciousFragments = [
  "\\u00C2",
  "\\u00C3",
  "\\u00C4\\u2026",
  "\\u00C4\\u2021",
  "\\u00C4\\u2122",
  "\\u00C5\\u201A",
  "\\u00C5\\u201E",
  "\\u00C5\\u203A",
  "\\u00C5\\u00BA",
  "\\u00C5\\u00BC",
  "\\u00C4\\u201E",
  "\\u00C4\\u2020",
  "\\u00C4\\u02DC",
  "\\u00C5\\u0141",
  "\\u00C5\\u0192",
  "\\u00C3\\u201C",
  "\\u00C5\\u0160",
  "\\u00C5\\u2019",
  "\\u00C5\\u00BB",
  "\\u00E2\\u20AC\\u2122",
  "\\u00E2\\u20AC\\u0153",
  "\\u00E2\\u20AC\\u009D",
  "\\u00E2\\u20AC\\u201C",
  "\\u00E2\\u20AC\\u201D",
  "\\u00EF\\u00BB\\u00BF",
];

function parseFragment(fragment) {
  return JSON.parse(`"${fragment}"`);
}

function findSuspiciousMojibake(content) {
  return suspiciousFragments.find((fragment) => content.includes(parseFragment(fragment))) ?? null;
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...(await collectFiles(path.join(dir, entry.name))));
      }
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (textExtensions.has(extension)) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

const files = await collectFiles(projectRoot);
const failures = [];

for (const filePath of files) {
  const bytes = await readFile(filePath);
  let content;

  try {
    content = decoder.decode(bytes);
  } catch {
    failures.push(`${path.relative(projectRoot, filePath)}: invalid UTF-8 byte sequence`);
    continue;
  }

  const suspiciousFragment = findSuspiciousMojibake(content);
  if (suspiciousFragment) {
    failures.push(
      `${path.relative(projectRoot, filePath)}: suspicious mojibake fragment ${JSON.stringify(parseFragment(suspiciousFragment))}`,
    );
  }
}

if (failures.length > 0) {
  console.error("Text integrity check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Text integrity check passed for ${files.length} files.`);
