#!/usr/bin/env node
// Checks local Markdown file links inside this workspace. It skips anchors,
// external URLs, generated files, and semantic link correctness.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      validateMarkdown(fullPath);
    }
  }
}

function validateMarkdown(file) {
  const text = fs.readFileSync(file, "utf8");
  const linkPattern = /(?<!!)\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of text.matchAll(linkPattern)) {
    const rawTarget = match[1].trim();
    if (!rawTarget || rawTarget.startsWith("#")) continue;
    if (/^[a-z]+:/i.test(rawTarget)) continue;
    const targetWithoutAnchor = rawTarget.split("#")[0];
    if (!targetWithoutAnchor) continue;
    const resolved = path.resolve(path.dirname(file), targetWithoutAnchor);
    if (!resolved.startsWith(root)) {
      problems.push(`${path.relative(root, file)} links outside workspace: ${rawTarget}`);
      continue;
    }
    if (!fs.existsSync(resolved)) {
      problems.push(`${path.relative(root, file)} has missing link target: ${rawTarget}`);
    }
  }
}

walk(root);

if (problems.length) {
  console.error("KAOS link validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log("KAOS link validation passed.");
