# Model tiering

Every agent declares a `model` tier. Picking the right tier is a cost/quality
decision: reach for the heaviest model only where deep reasoning actually pays
off, and push deterministic work down to fast models.

| Tier | Use for | Examples |
| --- | --- | --- |
| 🔴 **opus** | High-stakes judgment, architecture, security review, multi-step strategy, anything where a wrong answer is expensive. | `backend-architect`, `security-engineer`, `code-reviewer`, `financial-analyst`, `agent-orchestrator` |
| 🟡 **sonnet** | The workhorse. Most implementation, design, content, and analysis. The default when unsure. | `frontend-developer`, `ui-designer`, `content-creator`, `data-engineer` |
| 🟢 **haiku** | Fast, deterministic, format-bound work where structure matters more than reasoning. | `cold-email-specialist`, `image-prompt-engineer`, `user-story-writer`, `visual-regression-tester` |

## Rules of thumb

- **Default to `sonnet`.** If you cannot articulate why an agent needs deeper
  reasoning, it does not.
- **Promote to `opus`** when the agent makes irreversible or high-blast-radius
  decisions (production architecture, security, money, legal, orchestration of
  other agents), or when the task requires holding many constraints at once.
- **Demote to `haiku`** when the agent's value is speed and consistency on a
  well-specified transform (drafting from a brief, extracting fields, generating
  a prompt, formatting output).
- `inherit` is valid — it runs the agent at whatever model the calling
  conversation is using. Use it sparingly; explicit tiers make cost predictable.

## Why tiering matters at scale

A 200-agent library that runs everything on the largest model is slow and
expensive. Tiering is what lets an orchestrator fan out — e.g. **opus designs the
architecture → haiku generates the boilerplate → sonnet writes the tests → opus
reviews** — and only pay for heavy reasoning at the two ends. See
[orchestration.md](orchestration.md).
