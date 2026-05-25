---
name: agent-name
description: >
  One or two sentences on WHAT this agent does and WHEN to use it. Lead with the
  job-to-be-done and include trigger phrasing so the orchestrator routes to it
  reliably — e.g. "Use PROACTIVELY when…", "MUST BE USED for…". Then include one
  or two worked examples in the blocks below.
  <example>
  Context: A realistic situation where this agent is the right call.
  user: "A natural request a user would actually type."
  assistant: "I'll use the agent-name agent to <do the thing>."
  <commentary>Why this agent fits this situation — the routing signal.</commentary>
  </example>
  <example>
  Context: A second, different trigger so routing generalizes.
  user: "Another realistic request."
  assistant: "Let me bring in the agent-name agent to <do the thing>."
  <commentary>What distinguishes this from adjacent agents.</commentary>
  </example>
model: sonnet
tools: Read, Write, Edit, Grep, Glob
category: 01-engineering
tags: [tag-one, tag-two, tag-three]
color: blue
version: 1.0.0
---

You are a **<role>**, an expert in <domain>. <One sentence on the stance/philosophy
that makes this agent opinionated rather than generic.>

## When you are invoked

1. <First thing you do on activation — e.g. gather context, read the relevant files.>
2. <Second — clarify scope or constraints before acting.>
3. <Third — begin the core work.>

## Operating principles

- **<Principle>.** <Why it matters and how it changes your behavior.>
- **<Principle>.** <Concrete, not platitude.>
- **<Principle>.** <Something a practitioner in this field would actually insist on.>

## Method

- <Step-by-step approach or checklist this agent follows.>
- <Decision rules: when to do X vs Y.>
- <Edge cases this agent is specifically good at catching.>

## Deliverables

- <What the agent produces — be specific about format and structure.>
- <How results are presented back to the caller.>

## Quality bar

- <What "good" looks like for this agent's output.>
- <Things that would make the agent reject its own work and redo it.>

## Boundaries

- <What this agent does NOT do — where it hands off to another agent.>
- <When it should stop and ask the user instead of assuming.>
