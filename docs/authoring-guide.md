# Authoring guide

How to write an agent that is specific, opinionated, and routes reliably.

## 1. Start from the template

```bash
cp templates/agent-template.md categories/<NN-category>/<agent-name>.md
```

The filename **must** equal the `name` field, in kebab-case (`api-tester.md` →
`name: api-tester`). Names are globally unique across the whole repo.

## 2. Fill the frontmatter

```yaml
---
name: api-tester
description: >
  Designs and runs comprehensive API test suites — contract, integration,
  load, and security checks. Use PROACTIVELY after API routes change or before
  a release.
  <example>
  Context: A new endpoint was just added.
  user: "I added POST /orders — can you make sure it's solid?"
  assistant: "I'll use the api-tester agent to build a contract + edge-case suite for /orders."
  <commentary>New endpoint = test coverage gap; api-tester owns API validation.</commentary>
  </example>
model: sonnet
tools: Read, Write, Edit, Bash, Grep
category: 04-quality-testing
tags: [api, testing, integration, load-testing]
color: green
version: 1.0.0
---
```

Field rules live in [`schema/agent.schema.json`](../schema/agent.schema.json).
The four fields Claude Code reads are `name`, `description`, `model`, `tools`;
`category`, `tags`, `color`, `version` are repo-local metadata for the catalog.

### The `description` is the most important field

It is what an orchestrator (and Claude Code's auto-delegation) reads to decide
whether to route to this agent. Make it earn the routing:

- Lead with the **job-to-be-done**, not a personality.
- Include **trigger phrasing**: `Use when…`, `Use PROACTIVELY…`, `MUST BE USED for…`.
- Include **one or two `<example>` blocks** with a `<commentary>` explaining the
  routing signal. This single technique measurably improves delegation accuracy.

### Pick the model tier deliberately

See [model-tiering.md](model-tiering.md). Default `sonnet`; promote to `opus` for
high-stakes judgment; demote to `haiku` for fast deterministic work.

### Scope tools to what the agent needs

Omitting `tools` inherits everything. Prefer an explicit allowlist — a
read-only reviewer should not have `Write` or `Bash`.

## 3. Write the body (the system prompt)

Keep the standard section structure so agents feel consistent:

- **Identity line** — `You are a <role>…` with an opinionated stance.
- **When you are invoked** — what you do on activation.
- **Operating principles** — concrete, field-specific convictions (not platitudes).
- **Method** — the steps/checklist/decision rules you follow.
- **Deliverables** — exactly what you produce and in what shape.
- **Quality bar** — what "good" looks like; what makes you redo your work.
- **Boundaries** — what you don't do and when you hand off or ask.

Write for a practitioner. "Be helpful and write clean code" is filler. "Prefer
composition over inheritance; flag any function over 50 lines for extraction" is
an agent.

## 4. Validate and build

```bash
npm run validate    # must pass with 0 errors
npm run build       # regenerates all indexes + outputs
```

Never hand-edit `README.md`'s catalog table, `AGENTS.md`, `index.json`, the
per-category `README.md`s, or anything in `dist/` — they are generated.

## 5. Open a PR

CI runs `validate` + `build` and fails on schema errors or duplicate names. See
[CONTRIBUTING.md](../CONTRIBUTING.md).
