#!/usr/bin/env node
// Validates every agent's frontmatter against the repo schema.
// Exits non-zero on any error (used by CI). Warnings never fail the build.
import { loadAgents, loadTaxonomy } from "./lib/agents.mjs";
import path from "node:path";

const KNOWN_MODELS = new Set(["opus", "sonnet", "haiku", "inherit"]);
const KNOWN_TOOLS = new Set([
  "Read", "Write", "Edit", "MultiEdit", "NotebookEdit",
  "Bash", "Glob", "Grep", "WebFetch", "WebSearch", "Task", "TodoWrite",
]);
const TRIGGER_HINTS = ["use ", "when ", "must be used", "proactively", "<example>"];

const agents = loadAgents();
const taxonomy = loadTaxonomy();
const validCategories = new Set(taxonomy.categories.map((c) => c.id));

let errors = 0;
let warnings = 0;
const seenNames = new Map();

const err = (a, msg) => { console.error(`  ✖ [${a.path}] ${msg}`); errors++; };
const warn = (a, msg) => { console.warn(`  ⚠ [${a.path}] ${msg}`); warnings++; };

for (const a of agents) {
  if (!a.hasFrontmatter) { err(a, "missing YAML frontmatter (--- block)"); continue; }

  // name
  if (!a.name) err(a, "missing required field: name");
  else {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.name))
      err(a, `name "${a.name}" must be kebab-case (a-z, 0-9, hyphens)`);
    const expected = path.basename(a.file, ".md");
    if (a.name !== expected)
      err(a, `name "${a.name}" must match filename "${expected}.md"`);
    if (seenNames.has(a.name))
      err(a, `duplicate name "${a.name}" (also in ${seenNames.get(a.name)})`);
    else seenNames.set(a.name, a.path);
  }

  // description
  if (!a.description) err(a, "missing required field: description");
  else {
    if (a.description.length < 40)
      warn(a, "description is very short (<40 chars) — weak auto-delegation signal");
    const low = a.description.toLowerCase();
    if (!TRIGGER_HINTS.some((h) => low.includes(h)))
      warn(a, "description has no trigger phrasing (e.g. 'Use when…', 'MUST BE USED', <example>)");
  }

  // model
  if (a.model && !KNOWN_MODELS.has(a.model) && !/^claude-[a-z0-9-]+$/.test(a.model))
    warn(a, `unusual model "${a.model}" (expected opus|sonnet|haiku|inherit|<model-id>)`);

  // category
  if (a.category !== a.categoryFromPath)
    err(a, `category "${a.category}" does not match folder "${a.categoryFromPath}"`);
  if (!validCategories.has(a.categoryFromPath))
    err(a, `folder "${a.categoryFromPath}" is not a category in taxonomy.json`);

  // tags
  if (!a.tags.length) warn(a, "no tags — hurts searchability");

  // tools
  for (const t of a.toolList)
    if (!KNOWN_TOOLS.has(t) && !t.includes("__") && !t.startsWith("mcp"))
      warn(a, `unknown tool "${t}"`);

  // body
  if (a.body.length < 200) warn(a, "system prompt body is thin (<200 chars)");
}

console.log("");
console.log(`Validated ${agents.length} agents across ${validCategories.size} categories.`);
console.log(`${errors} error(s), ${warnings} warning(s).`);
if (errors > 0) {
  console.error("\n✖ Validation failed.");
  process.exit(1);
}
console.log("\n✓ Validation passed.");
