// Zero-dependency YAML-frontmatter parser for the constrained schema this repo uses.
// Supported shapes (documented in CONTRIBUTING.md):
//   key: scalar            -> string (quotes stripped)
//   key: |  / key: >       -> block scalar (multi-line; used by `description`)
//   key: [a, b, c]         -> inline array
//   key:\n  - a\n  - b     -> block array
// Anything more exotic is intentionally unsupported so the format stays lintable.

export function parseFrontmatter(raw) {
  const text = String(raw).replace(/^﻿/, "");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text, hasFrontmatter: false };
  return { data: parseYamlSubset(m[1]), body: m[2] ?? "", hasFrontmatter: true };
}

function stripQuotes(s) {
  s = s.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

function parseInlineArray(s) {
  const inner = s.trim().replace(/^\[/, "").replace(/\]$/, "").trim();
  if (!inner) return [];
  return inner
    .split(",")
    .map((x) => stripQuotes(x))
    .filter((x) => x.length);
}

function parseYamlSubset(fmText) {
  const lines = fmText.split(/\r?\n/);
  const data = {};
  const keyRe = /^([A-Za-z0-9_-]+):(.*)$/;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || /^\s/.test(line)) {
      i++;
      continue; // blank or indented line with no open key — skip
    }
    const km = line.match(keyRe);
    if (!km) {
      i++;
      continue;
    }
    const key = km[1];
    const rest = km[2].trim();

    // Block scalar (| or >, with optional chomping indicator)
    if (/^[|>][+-]?$/.test(rest)) {
      i++;
      const buf = [];
      while (i < lines.length) {
        const l = lines[i];
        if (l.trim() === "") { buf.push(""); i++; continue; }
        if (/^\s/.test(l)) { buf.push(l); i++; continue; }
        break;
      }
      const indents = buf.filter((b) => b.trim()).map((b) => b.match(/^(\s*)/)[1].length);
      const min = indents.length ? Math.min(...indents) : 0;
      data[key] = buf.map((b) => b.slice(min)).join("\n").replace(/\n+$/, "");
      continue;
    }

    // Inline array
    if (rest.startsWith("[")) {
      data[key] = parseInlineArray(rest);
      i++;
      continue;
    }

    // Empty value -> maybe a block array follows
    if (rest === "") {
      const arr = [];
      let j = i + 1;
      let isArray = false;
      while (j < lines.length) {
        const l = lines[j];
        if (l.trim() === "") { j++; continue; }
        const am = l.match(/^\s+-\s+(.*)$/);
        if (am) { arr.push(stripQuotes(am[1])); isArray = true; j++; continue; }
        if (/^\s/.test(l)) { j++; continue; }
        break;
      }
      if (isArray) { data[key] = arr; i = j; continue; }
      data[key] = "";
      i++;
      continue;
    }

    // Plain scalar
    data[key] = stripQuotes(rest);
    i++;
  }
  return data;
}
