# Orchestration: composing agents

A library of specialists is only as good as your ability to combine them. The
[`16-meta-orchestration`](../categories/16-meta-orchestration/README.md) category
exists for exactly this — agents whose job is to route to, sequence, and
coordinate other agents.

## The orchestrator pattern

An orchestrator does **not** do the work itself. It:

1. **Decomposes** a request into discrete sub-tasks.
2. **Selects** the right specialist for each (by reading agent `description`s and
   `tags` — this is why good trigger phrasing matters).
3. **Sequences** them, deciding what runs in parallel vs. in order.
4. **Hands off** context between agents and **synthesizes** the results.

`agent-orchestrator` is the generalist entry point; `tech-lead-orchestrator`,
`chief-of-staff`, and `multi-agent-coordinator` are specialized variants.

## Phased hand-offs (the cost-smart pattern)

Mix model tiers across a workflow so you only pay for heavy reasoning where it
matters. A typical feature build:

```
opus    backend-architect      → designs the API + data model
haiku   <language>-pro          → generates boilerplate from the spec
sonnet  frontend-developer      → builds the UI against the contract
sonnet  test-automation-engineer→ writes the test suite
opus    code-reviewer           → reviews the whole change before merge
```

Reasoning is concentrated at the two ends (design, review); the middle is fast
and cheap. See [model-tiering.md](model-tiering.md).

## Worked workflows

**Ship a marketing campaign**
```
trend-researcher → content-creator → seo-specialist
                                   → social-media-strategist → {instagram-curator, tiktok-strategist}
                 → geo-citation-strategist (AI-search visibility)
```

**Launch a new product surface**
```
product-manager → backend-architect → frontend-developer → ui-designer
               → qa-test-engineer → security-engineer → code-reviewer
```

**Stand up a data product**
```
data-engineer → analytics-engineer → ai-engineer → model-qa-specialist
             → data-analytics-reporter
```

## Writing your own orchestration

Reference specialists by their `name` and let the orchestrator's `description`
explain when to engage it. Keep orchestrators in `16-meta-orchestration` so they
are easy to find, and give them `opus` unless they are pure routing logic.
