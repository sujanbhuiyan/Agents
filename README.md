<div align="center">

# 🤖 Agents

### A curated, multi-platform library of specialized AI agents.

**Author once. Run in Claude Code, Cursor, or anywhere.**

[![validate](https://github.com/sujanbhuiyan/Agents/actions/workflows/validate.yml/badge.svg)](https://github.com/sujanbhuiyan/Agents/actions/workflows/validate.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![node >= 18](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](package.json)

[Browse the full catalog →](AGENTS.md) · [How it works](docs/architecture.md) · [Contribute](CONTRIBUTING.md)

</div>

---

Every agent is a single Markdown file with a clear job-to-be-done, an
auto-delegation `description`, a deliberate [model tier](docs/model-tiering.md),
and a scoped tool policy. One canonical source compiles to every runtime — and
the entire catalog below is **generated** from those files, so it never drifts.

## Why this library

- **🎯 Specific, not generic.** Each agent is opinionated and practitioner-grade —
  built from the best patterns across the top community collections, then curated
  and standardized.
- **🧩 Author once, run anywhere.** Canonical agents compile to Claude Code
  subagents, Cursor rules, and plain prompts. [How →](docs/multi-platform.md)
- **🗂️ Navigable at scale.** 16 categories, a generated A–Z index, tags, and a
  searchable `index.json`. Find the right agent in seconds.
- **🎛️ Built to compose.** A dedicated orchestration layer turns specialists into
  multi-agent workflows with cost-smart [phased hand-offs](docs/orchestration.md).
- **✅ Trustworthy.** CI validates frontmatter, enforces unique names, and fails
  if the generated catalog is stale. No hand-maintained indexes.

## Quickstart

**Claude Code — install a focused pack via the marketplace**
```text
/plugin marketplace add sujanbhuiyan/Agents
/plugin install engineering-agents
```

**Claude Code — install everything by hand**
```bash
git clone https://github.com/sujanbhuiyan/Agents.git
cp -r Agents/categories/**/*.md ~/.claude/agents/
```

**Cursor / any other tool**
```bash
git clone https://github.com/sujanbhuiyan/Agents.git && cd Agents
npm run build
cp dist/cursor/*.mdc  your-project/.cursor/rules/   # Cursor
#   …or use dist/prompts/<name>.md as a system prompt anywhere
```

Full install matrix in [docs/multi-platform.md](docs/multi-platform.md).

## Catalog

<!-- CATALOG:START -->

| # | Category | Agents | Focus |
| --- | --- | --- | --- |
| 01 | 🏗️ **[Engineering](categories/01-engineering/README.md)** | 1 | Core software engineering — backend, frontend, full-stack, mobile, and system architecture. |
| 02 | 🔤 **[Languages & Frameworks](categories/02-languages-frameworks/README.md)** | 0 | Deep language and framework specialists with idiomatic, production-grade expertise. |
| 03 | ⚙️ **[Infrastructure & DevOps](categories/03-infrastructure-devops/README.md)** | 0 | Cloud, CI/CD, reliability, observability, and platform operations. |
| 04 | 🧪 **[Quality & Testing](categories/04-quality-testing/README.md)** | 0 | Testing, code review, performance, and release confidence. |
| 05 | 🛡️ **[Security & Compliance](categories/05-security-compliance/README.md)** | 0 | Application security, threat detection, auditing, and regulatory compliance. |
| 06 | 🧠 **[Data & AI](categories/06-data-ai/README.md)** | 0 | Data engineering, analytics, machine learning, and applied AI systems. |
| 07 | 🎨 **[Design & UX](categories/07-design-ux/README.md)** | 0 | Product design, UX research, brand, and visual craft. |
| 08 | 🗺️ **[Product & Management](categories/08-product-management/README.md)** | 0 | Product strategy, delivery, discovery, and team coordination. |
| 09 | 📈 **[Marketing & Growth](categories/09-marketing-growth/README.md)** | 0 | Growth, content, SEO/GEO, advertising, and lifecycle marketing. |
| 10 | 📣 **[Social Media](categories/10-social-media/README.md)** | 0 | Platform-native social strategy, content, and community engagement. |
| 11 | 💰 **[Sales & Revenue](categories/11-sales-revenue/README.md)** | 0 | Sales engineering, deal strategy, outbound, and revenue operations. |
| 12 | 🏦 **[Business, Finance & Legal](categories/12-business-finance-legal/README.md)** | 0 | Finance, legal, HR, support, and back-office operations. |
| 13 | 🎮 **[Game Development](categories/13-game-development/README.md)** | 0 | Game design and engine specialists — Unity, Unreal, Godot, Roblox, and Blender. |
| 14 | 🌏 **[Regional Markets](categories/14-regional-markets/README.md)** | 0 | Region-specific commerce and platform specialists (China-market and cross-border). |
| 15 | 🧬 **[Specialized Domains](categories/15-specialized-domains/README.md)** | 0 | Blockchain, XR, embedded, scientific, civil, and creative/worldbuilding domains. |
| 16 | 🎛️ **[Meta & Orchestration](categories/16-meta-orchestration/README.md)** | 0 | Orchestrators and coordinators that compose, route, and manage other agents. |
| | **Total** | **1** | 🔴 1 opus · 🟡 0 sonnet · 🟢 0 haiku |

<!-- CATALOG:END -->

> Full alphabetical index: [AGENTS.md](AGENTS.md) · Machine-readable: [index.json](index.json)

## How it works

```
categories/<id>/<agent>.md   ─┐
taxonomy.json                 ├─►  scripts/  ─►  index.json · AGENTS.md · READMEs
(the only files you edit)    ─┘                  marketplace · dist/{claude-code,cursor,prompts}
```

| Doc | What's inside |
| --- | --- |
| [architecture.md](docs/architecture.md) | The author-once-compile-everywhere design. |
| [taxonomy.md](docs/taxonomy.md) | The 16 categories and how to place an agent. |
| [model-tiering.md](docs/model-tiering.md) | When to use opus / sonnet / haiku. |
| [orchestration.md](docs/orchestration.md) | Composing agents into workflows. |
| [multi-platform.md](docs/multi-platform.md) | Compile targets and install paths. |
| [authoring-guide.md](docs/authoring-guide.md) | How to write a great agent. |

## Develop

```bash
npm run validate   # lint frontmatter (CI gate)
npm run build      # regenerate catalog, marketplace, and platform outputs
npm run check      # validate + build
```

Zero runtime dependencies — just Node ≥ 18.

## Contributing

New agents and improvements are welcome. Start with the
[authoring guide](docs/authoring-guide.md) and the
[contribution rules](CONTRIBUTING.md). Be specific, be opinionated, don't
duplicate.

## Credits

Architecture and curation informed by the best of the open-source agent
ecosystem — including
[VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents),
[wshobson/agents](https://github.com/wshobson/agents),
[contains-studio/agents](https://github.com/contains-studio/agents), and
[davila7/claude-code-templates](https://github.com/davila7/claude-code-templates).

## License

[MIT](LICENSE) © Sujan Bhuiyan
