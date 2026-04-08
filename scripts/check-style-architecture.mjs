import ts from "typescript";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const rootDir = process.cwd();
const srcDir = join(rootDir, "src");
const allowExtensions = new Set([".tsx"]);
const relevantProps = new Set(["className", "titleClassName"]);
const utilityPattern =
  /^(?:flex|grid|hidden|block|inline|inline-flex|inline-block|sr-only|group|list-disc|underline|relative|absolute|fixed|sticky|text-(?:left|center|right|[a-z0-9-./[\]]+)|font-(?:[a-z0-9-./[\]]+)|leading-[a-z0-9-./[\]]+|tracking-[a-z0-9-./[\]]+|(?:m|p)[trblxy]?-[a-z0-9-./[\]]+|gap(?:-[xy])?-[a-z0-9-./[\]]+|items-[a-z0-9-./[\]]+|justify-[a-z0-9-./[\]]+|self-[a-z0-9-./[\]]+|content-[a-z0-9-./[\]]+|place-[a-z0-9-./[\]]+|w-[a-z0-9-./[\]]+|h-[a-z0-9-./[\]]+|min-[wh]-[a-z0-9-./[\]]+|max-[wh]-[a-z0-9-./[\]]+|rounded(?:-[a-z0-9-./[\]]+)?|bg-[a-z0-9-./[\]]+|border(?:-[a-z0-9-./[\]]+)?|shadow(?:-[a-z0-9-./[\]]+)?|space-[xy]-[a-z0-9-./[\]]+|overflow-[a-z0-9-./[\]]+|object-[a-z0-9-./[\]]+|aspect-[a-z0-9-./[\]]+|cursor-[a-z0-9-./[\]]+|transition(?:-[a-z0-9-./[\]]+)?|duration-[a-z0-9-./[\]]+|ease-[a-z0-9-./[\]]+|animate-[a-z0-9-./[\]]+)$/;
const variantPrefixPattern = /^(?:(?:[a-z0-9-]+):)+/;

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

function normalizeToken(token) {
  return token.replace(variantPrefixPattern, "");
}

function collectStringSegments(expression) {
  if (!expression) {
    return [];
  }

  if (ts.isStringLiteralLike(expression)) {
    return [expression.text];
  }

  if (ts.isTemplateExpression(expression)) {
    return [
      expression.head.text,
      ...expression.templateSpans.flatMap((span) => collectStringSegments(span.literal)),
    ];
  }

  if (ts.isJsxExpression(expression)) {
    return collectStringSegments(expression.expression);
  }

  if (ts.isParenthesizedExpression(expression)) {
    return collectStringSegments(expression.expression);
  }

  if (ts.isConditionalExpression(expression)) {
    return [
      ...collectStringSegments(expression.whenTrue),
      ...collectStringSegments(expression.whenFalse),
    ];
  }

  if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    return [
      ...collectStringSegments(expression.left),
      ...collectStringSegments(expression.right),
    ];
  }

  if (ts.isArrayLiteralExpression(expression)) {
    return expression.elements.flatMap((element) => collectStringSegments(element));
  }

  if (ts.isCallExpression(expression)) {
    return expression.arguments.flatMap((argument) => collectStringSegments(argument));
  }

  return [];
}

function getClassStrings(attribute) {
  if (!attribute.initializer) {
    return [];
  }

  if (ts.isStringLiteral(attribute.initializer)) {
    return [attribute.initializer.text];
  }

  if (ts.isJsxExpression(attribute.initializer)) {
    return collectStringSegments(attribute.initializer.expression);
  }

  return [];
}

function getLineAndColumn(sourceFile, position) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(position);
  return { line: line + 1, column: character + 1 };
}

const files = walk(srcDir);
const violations = [];

for (const filePath of files) {
  const source = readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  function visit(node) {
    if (ts.isJsxAttribute(node) && relevantProps.has(node.name.text)) {
      const strings = getClassStrings(node);

      for (const value of strings) {
        const tokens = value.split(/\s+/).filter(Boolean);
        const offendingTokens = tokens.filter((token) => utilityPattern.test(normalizeToken(token)));

        if (offendingTokens.length > 0) {
          const { line, column } = getLineAndColumn(sourceFile, node.getStart(sourceFile));
          violations.push({
            file: relative(rootDir, filePath),
            line,
            column,
            prop: node.name.text,
            tokens: offendingTokens,
            source: value.trim(),
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

if (violations.length > 0) {
  console.error("Style architecture check failed.");
  console.error("Raw Tailwind utility tokens are not allowed in TSX presentation props.");
  console.error("Move presentation and layout styling into the CSS layer or a shared semantic primitive.");
  console.error("");

  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line}:${violation.column}`);
    console.error(`  prop: ${violation.prop}`);
    console.error(`  tokens: ${violation.tokens.join(", ")}`);
    console.error(`  value: ${violation.source}`);
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
