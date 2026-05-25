#!/usr/bin/env node
// Generates a Claude Code plugin marketplace (one installable plugin per category).
//   .claude-plugin/marketplace.json                  root manifest
//   categories/<id>/.claude-plugin/plugin.json       per-category plugin manifest
import fs from "node:fs";
import path from "node:path";
import { loadAgents, loadTaxonomy, ROOT } from "./lib/agents.mjs";

const VERSION = "1.0.0";
const OWNER = { name: "Sujan Bhuiyan", url: "https://github.com/sujanbhuiyan" };

const agents = loadAgents();
const taxonomy = loadTaxonomy();
const counts = new Map();
for (const a of agents) counts.set(a.categoryFromPath, (counts.get(a.categoryFromPath) || 0) + 1);

const slug = (id) => id.replace(/^\d+-/, "");
const pluginName = (id) => `${slug(id)}-agents`;

const plugins = taxonomy.categories.map((c) => ({
  name: pluginName(c.id),
  source: `./categories/${c.id}`,
  description: `${c.title} — ${counts.get(c.id) || 0} agents. ${c.description}`,
  category: slug(c.id),
  tags: [slug(c.id), "agents", "subagents"],
  strict: false,
}));

const marketplace = {
  name: "gigaverse-agents",
  owner: OWNER,
  metadata: {
    description:
      "A curated, multi-platform library of specialized AI agents. Install a focused pack or the whole catalog.",
    version: VERSION,
  },
  plugins,
};
fs.mkdirSync(path.join(ROOT, ".claude-plugin"), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, ".claude-plugin", "marketplace.json"),
  JSON.stringify(marketplace, null, 2) + "\n"
);

for (const c of taxonomy.categories) {
  const dir = path.join(ROOT, "categories", c.id, ".claude-plugin");
  fs.mkdirSync(dir, { recursive: true });
  const plugin = {
    name: pluginName(c.id),
    version: VERSION,
    description: `${c.title} agents — ${c.description}`,
    author: OWNER,
    homepage: "https://github.com/sujanbhuiyan/Agents",
    repository: "https://github.com/sujanbhuiyan/Agents",
    license: "MIT",
    keywords: [slug(c.id), "ai-agents", "claude-code", "subagents"],
  };
  fs.writeFileSync(path.join(dir, "plugin.json"), JSON.stringify(plugin, null, 2) + "\n");
}

console.log(`✓ Marketplace generated: ${plugins.length} category plugins.`);
