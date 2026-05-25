# Contributing

Thanks for helping grow the library. Contributions are agents, fixes to agents,
or improvements to the tooling/docs.

## Quick start

```bash
git clone https://github.com/sujanbhuiyan/Agents.git
cd Agents
cp templates/agent-template.md categories/<NN-category>/<agent-name>.md
# edit your agent…
npm run check      # validate + rebuild all generated files
```

Open a PR. CI must be green before merge.

## The rules that CI enforces

1. **Frontmatter is valid** against [`schema/agent.schema.json`](schema/agent.schema.json):
   required `name`, `description`, `model`, `category`, `tags`.
2. **`name` is kebab-case and globally unique**, and equals the filename.
3. **`category` matches the folder** the file lives in, and that folder exists in
   `taxonomy.json`.
4. **Generated files are up to date** — run `npm run build` and commit the result.

Warnings (short description, missing trigger phrasing, thin body, unknown tool)
won't fail CI but reviewers will ask you to address them.

## Quality bar for a new agent

A good agent is **specific and opinionated**. Before submitting, check:

- [ ] The `description` says *when to use it* and includes at least one
      `<example>` + `<commentary>` block.
- [ ] The right [model tier](docs/model-tiering.md) (`sonnet` unless you can
      justify otherwise).
- [ ] `tools` are scoped to what the agent actually needs.
- [ ] The body has the standard sections (identity, when invoked, principles,
      method, deliverables, quality bar, boundaries).
- [ ] It does not duplicate an existing agent — extend the existing one instead.
- [ ] The body contains practitioner-grade specifics, not generic advice.

See the full [authoring guide](docs/authoring-guide.md).

## Don't hand-edit generated files

These are produced by `npm run build` and will be overwritten:

- `README.md` catalog table (between the `CATALOG` markers)
- `AGENTS.md`, `index.json`
- every `categories/*/README.md`
- every `categories/*/.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- everything in `dist/`

Edit `taxonomy.json`, the agent files, the `scripts/`, or the hand-written parts
of docs instead.

## Commit style

Conventional commits, e.g. `feat(06-data-ai): add vector-db-engineer`,
`fix(seo-specialist): tighten trigger phrasing`, `chore(scripts): …`.
