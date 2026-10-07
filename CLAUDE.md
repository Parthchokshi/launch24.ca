@AGENTS.md
@docs/PRD.md

## Keep `docs/PRD.md` current (required)

`docs/PRD.md` is the single source of truth for this app's design, behavior,
settings, decisions, and removed features. It is imported above, so read it
before starting any task.

- If a task changes behavior, design, copy rules, a flag/env var, tracking, storage,
  or removes/hides a feature, **update the matching PRD section in the same commit**
  and add a one-line entry at the top of its Change log (§8).
- Record decisions in §5 with a date and the reason. When the owner changes their
  mind, mark the old entry `SUPERSEDED by …` and keep it; never delete history.
- Removed or hidden features go in §6 with how to bring them back. Unresolved or
  unverified things go in §7; delete them when resolved.
- If a request contradicts the PRD, say so before changing anything.
- Never put secret values in the PRD (setting names only).
- Before finishing, check that the PRD is accurate for what you changed.
