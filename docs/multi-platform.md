# Multi-platform: author once, run anywhere

The canonical agents under `categories/` are written in the Claude Code subagent
format. `npm run build:platforms` compiles each one into every supported runtime
under `dist/`. Nothing in `dist/` is hand-edited.

| Target | Output | Format notes |
| --- | --- | --- |
| **Claude Code** | `dist/claude-code/agents/<name>.md` | Minimal frontmatter (`name`, `description`, `model`, `tools`) + system prompt. Drop into `~/.claude/agents/` (user) or `.claude/agents/` (project). |
| **Cursor** | `dist/cursor/<name>.mdc` | Cursor "project rule": `description` + `globs` + `alwaysApply: false`, body = system prompt. Drop into `.cursor/rules/`. |
| **Generic / any LLM** | `dist/prompts/<name>.md` | Plain system prompt with no runtime-specific frontmatter. Paste into Windsurf, ChatGPT, an API `system` message, or any other harness. |
| **Programmatic** | `dist/agents.json` | Universal manifest — every agent with metadata and pointers to its compiled outputs. |

## Install paths

**Claude Code — the whole library**
```bash
git clone https://github.com/sujanbhuiyan/Agents.git
cp -r Agents/categories/**/*.md ~/.claude/agents/   # canonical files work as-is
```

**Claude Code — one focused pack (via the marketplace)**
```text
/plugin marketplace add sujanbhuiyan/Agents
/plugin install engineering-agents
```

**Cursor**
```bash
npm run build
cp Agents/dist/cursor/*.mdc  your-project/.cursor/rules/
```

**Anywhere else**
```bash
npm run build
# use Agents/dist/prompts/<name>.md as a system prompt
```

## Why the canonical format is Claude Code

It is a strict superset of what the other targets need: a name, a routing
description, an optional model + tool policy, and a system prompt. Compiling
*down* to Cursor or a plain prompt only drops fields; nothing is lost in
translation. If a future runtime needs a new shape, it is one more emitter in
`scripts/build-platforms.mjs` — the 200 agents never change.
