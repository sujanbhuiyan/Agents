# Taxonomy

The library is organized into **16 top-level categories**, defined once in
[`taxonomy.json`](../taxonomy.json) and rendered everywhere else. Each maps 1:1
to an installable plugin.

| # | Category | What lives here |
| --- | --- | --- |
| 01 | 🏗️ Engineering | Backend, frontend, full-stack, mobile, and system architecture. |
| 02 | 🔤 Languages & Frameworks | Idiomatic language/framework specialists (`python-pro`, `react-pro`, …). |
| 03 | ⚙️ Infrastructure & DevOps | Cloud, CI/CD, reliability, observability, platform ops. |
| 04 | 🧪 Quality & Testing | Testing, code review, performance, release confidence. |
| 05 | 🛡️ Security & Compliance | AppSec, threat detection, auditing, compliance. |
| 06 | 🧠 Data & AI | Data engineering, analytics, ML, applied AI. |
| 07 | 🎨 Design & UX | Product design, UX research, brand, visual craft. |
| 08 | 🗺️ Product & Management | Product strategy, delivery, discovery, coordination. |
| 09 | 📈 Marketing & Growth | Growth, content, SEO/GEO, ads, lifecycle. |
| 10 | 📣 Social Media | Platform-native social strategy and community. |
| 11 | 💰 Sales & Revenue | Sales engineering, deal strategy, outbound, RevOps. |
| 12 | 🏦 Business, Finance & Legal | Finance, legal, HR, support, back-office ops. |
| 13 | 🎮 Game Development | Game design + engine specialists (Unity, Unreal, Godot, Roblox). |
| 14 | 🌏 Regional Markets | Region-specific commerce/platform specialists (China-market, cross-border). |
| 15 | 🧬 Specialized Domains | Blockchain, XR, embedded, scientific, civil, creative/worldbuilding. |
| 16 | 🎛️ Meta & Orchestration | Agents that compose, route, and coordinate other agents. |

## Deciding where an agent goes

- **Role over technology.** A person who *builds React UIs* is Engineering /
  Design; a deep *React language expert* is Languages & Frameworks. Categorize by
  the job the agent is hired to do.
- **One home.** Every agent lives in exactly one category (the folder it sits in).
  Use `tags` for cross-cutting discovery instead of duplicating.
- **When two categories fit**, pick the one a user would *look in first*, and add
  the other as a tag.
- **Platform/region specialists** (Douyin, WeChat, Roblox) go in their domain
  category (Regional Markets, Game Development), not the generic one.

## Adding a category

1. Add the entry to `taxonomy.json` (keep the `NN-kebab` id format).
2. Create the matching `categories/<id>/` folder.
3. Run `npm run build` — the README, marketplace, and indexes pick it up.

Categories are deliberately broad. Sixteen is enough to keep ~200 agents
navigable without forcing false choices; resist the urge to over-split.
