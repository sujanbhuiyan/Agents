#!/usr/bin/env node
// One command to regenerate every derived artifact from the canonical agents.
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const run = (script) =>
  execFileSync(process.execPath, [path.join(here, script)], { stdio: "inherit" });

console.log("▸ Building catalog index…");
run("build-index.mjs");
console.log("\n▸ Generating marketplace…");
run("gen-marketplace.mjs");
console.log("\n▸ Compiling platform outputs…");
run("build-platforms.mjs");
console.log("\n✓ Build complete.");
