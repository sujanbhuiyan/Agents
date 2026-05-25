// Shared loader: discovers every agent under categories/**/*.md, parses frontmatter,
// and returns a normalized record list used by validate/build scripts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./frontmatter.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..", "..");
export const CATEGORIES_DIR = path.join(ROOT, "categories");

export function loadTaxonomy() {
  const raw = fs.readFileSync(path.join(ROOT, "taxonomy.json"), "utf8");
  return JSON.parse(raw);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md") {
      out.push(full);
    }
  }
  return out;
}

// Reduce a long `description` (prose + <example> blocks) to a clean one-liner.
export function shortDescription(description = "") {
  let s = String(description);
  const exampleIdx = s.indexOf("<example>");
  if (exampleIdx !== -1) s = s.slice(0, exampleIdx);
  s = s.replace(/\s+/g, " ").trim();
  const sentence = s.match(/^.*?[.!?](?:\s|$)/);
  let out = sentence ? sentence[0].trim() : s;
  if (out.length > 200) out = out.slice(0, 197).trimEnd() + "…";
  return out;
}

export function toArray(v) {
  if (Array.isArray(v)) return v;
  if (v == null || v === "") return [];
  return String(v)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function loadAgents() {
  if (!fs.existsSync(CATEGORIES_DIR)) return [];
  const files = walk(CATEGORIES_DIR).sort();
  return files.map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, body, hasFrontmatter } = parseFrontmatter(raw);
    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    const categoryId = rel.split("/")[1] || "";
    return {
      file,
      path: rel,
      categoryFromPath: categoryId,
      name: data.name || "",
      description: data.description || "",
      short: shortDescription(data.description || ""),
      model: data.model || "inherit",
      tools: data.tools || "",
      toolList: toArray(data.tools),
      category: data.category || categoryId,
      tags: toArray(data.tags),
      color: data.color || "",
      version: data.version || "",
      hasFrontmatter,
      body: body.trim(),
      raw,
    };
  });
}
