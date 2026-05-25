# Architecture

This repository is built on one idea: **author an agent once, in one canonical
format, and compile it everywhere.** Everything else — the catalog, the
marketplace, the per-platform outputs — is generated from that single source.

```
┌─────────────────────────────────────────────────────────────────┐
│  CANONICAL SOURCE (hand-written, the only thing you edit)         │
│  categories/<id>/<agent-name>.md   ← YAML frontmatter + prompt    │
│  taxonomy.json                     ← the 16 categories            │
└───────────────────────────────┬─────────────────────────────────┘
                                 │  scripts/ (zero runtime deps)
                ┌────────────────┼─────────────────────┐
                ▼                ▼                     ▼
      build-index.mjs     build-platforms.mjs    gen-marketplace.mjs
                │                │                     │
                ▼                ▼                     ▼
   index.json            dist/claude-code/      .claude-plugin/
   AGENTS.md             dist/cursor/           marketplace.json
   README catalog        dist/prompts/          categories/*/plugin.json
   category READMEs       dist/agents.json
```

## Why this design

| Decision | Rationale |
| --- | --- |
| **Single source of truth** | The catalog, counts, and indexes are *generated*. They can never drift from reality, and a 200-agent repo stays navigable without hand-maintenance. |
| **Canonical = Claude Code format** | It is the most expressive subagent format (frontmatter + system prompt) and the most widely adopted. Other targets are a strict subset, so compiling *down* is lossless. |
| **Numbered category folders** | Stable ordering, self-documenting tree, and a clean 1:1 mapping to installable plugins (the VoltAgent pattern). |
| **Zero runtime dependencies** | The tooling is plain Node ESM with a constrained frontmatter parser. `git clone && npm run build` works on a fresh machine with nothing installed. |
| **Generated artifacts are committed** | `index.json`, `AGENTS.md`, READMEs, and the marketplace are committed so the repo is browsable and installable on GitHub without a build step. `dist/` is the exception — it is pure build output and git-ignored. |

## The directory map

```
Agents/
├── taxonomy.json                 # the 16 categories (source of truth)
├── index.json                    # generated machine-readable catalog
├── AGENTS.md                     # generated flat A–Z catalog
├── README.md                     # hand-written intro + generated catalog table
├── categories/
│   └── NN-name/
│       ├── README.md             # generated category table
│       ├── .claude-plugin/       # generated plugin manifest
│       └── <agent>.md            # ← canonical agents (hand-written)
├── schema/agent.schema.json      # JSON Schema for frontmatter
├── templates/agent-template.md   # copy this to start a new agent
├── scripts/                      # the build + validate pipeline
├── docs/                         # you are here
└── .claude-plugin/marketplace.json  # generated marketplace
```

## The pipeline

| Command | What it does |
| --- | --- |
| `npm run validate` | Lints every agent's frontmatter (required fields, kebab-case names, duplicate detection, category/folder match). Fails CI on any error. |
| `npm run build` | Runs all three generators below. |
| `npm run build:index` | Regenerates `index.json`, `AGENTS.md`, category READMEs, and the README catalog table. |
| `npm run build:platforms` | Compiles every agent into `dist/claude-code`, `dist/cursor`, `dist/prompts`, and `dist/agents.json`. |
| `npm run build:marketplace` | Regenerates the plugin marketplace. |
| `npm run check` | `validate` then `build` — the full pre-commit gate. |

See [authoring-guide.md](authoring-guide.md) to write an agent, [model-tiering.md](model-tiering.md)
for the model rubric, [multi-platform.md](multi-platform.md) for the compile targets, and
[orchestration.md](orchestration.md) for composing agents together.
