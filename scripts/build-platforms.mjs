#!/usr/bin/env node
// Author once (canonical agents in categories/), compile to many runtimes.
//   dist/claude-code/agents/<name>.md   minimal Claude Code subagent frontmatter
//   dist/cursor/<name>.mdc              Cursor project rule
//   dist/prompts/<name>.md              framework-agnostic system prompt
//   dist/agents.json                    universal manifest
import fs from "node:fs";
import path from "node:path";
import { loadAgents, ROOT } from "./lib/agents.mjs";

const DIST = path.join(ROOT, "dist");
const dirs = {
  cc: path.join(DIST, "claude-code", "agents"),
  cursor: path.join(DIST, "cursor"),
  prompts: path.join(DIST, "prompts"),
};
fs.rmSync(DIST, { recursive: true, force: true });
for (const d of Object.values(dirs)) fs.mkdirSync(d, { recursive: true });

const agents = loadAgents();

// Emit a YAML block scalar for multi-line strings.
const block = (key, val) =>
  `${key}: |\n` + String(val).split("\n").map((l) => (l ? `  ${l}` : "")).join("\n");

for (const a of agents) {
  // --- Claude Code (canonical, minimal frontmatter) ---
  const cc = ["---", `name: ${a.name}`, block("description", a.description)];
  if (a.model && a.model !== "inherit") cc.push(`model: ${a.model}`);
  if (a.tools) cc.push(`tools: ${a.tools}`);
  cc.push("---", "", a.body, "");
  fs.writeFileSync(path.join(dirs.cc, `${a.name}.md`), cc.join("\n"));

  // --- Cursor rule (.mdc) ---
  const mdc = [
    "---",
    `description: ${a.short.replace(/\n/g, " ")}`,
    "globs:",
    "alwaysApply: false",
    "---",
    "",
    `# ${a.name}`,
    "",
    a.body,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(dirs.cursor, `${a.name}.mdc`), mdc);

  // --- Plain prompt (framework-agnostic) ---
  const plain = [`# ${a.name}`, "", `> ${a.short}`, "", "---", "", a.body, ""].join("\n");
  fs.writeFileSync(path.join(dirs.prompts, `${a.name}.md`), plain);
}

// --- Universal manifest ---
const manifest = {
  total: agents.length,
  agents: agents.map((a) => ({
    name: a.name,
    description: a.short,
    category: a.categoryFromPath,
    model: a.model,
    tools: a.toolList,
    tags: a.tags,
    source: a.path,
    outputs: {
      claudeCode: `dist/claude-code/agents/${a.name}.md`,
      cursor: `dist/cursor/${a.name}.mdc`,
      prompt: `dist/prompts/${a.name}.md`,
    },
  })),
};
fs.writeFileSync(path.join(DIST, "agents.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`✓ Compiled ${agents.length} agents → dist/{claude-code,cursor,prompts} + agents.json`);
