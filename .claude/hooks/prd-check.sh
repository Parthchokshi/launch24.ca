#!/usr/bin/env bash
# Stop hook: if source files changed since docs/PRD.md was last updated, make Claude update it.
# Blocks at most once per stop (stop_hook_active guard), so it can't loop.
input="$(cat)"
echo "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true' && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
# Compare against the last commit that touched the PRD: any src/ change since then
# (committed, staged, unstaged, or untracked) needs a PRD update too.
last_prd="$(git log -1 --format=%H -- docs/PRD.md 2>/dev/null)"
[ -z "$last_prd" ] && exit 0

changed="$( { git diff --name-only "$last_prd" 2>/dev/null; git ls-files --others --exclude-standard; } | sort -u )"
echo "$changed" | grep -q '^src/' || exit 0          # no app changes since the PRD
echo "$changed" | grep -qx 'docs/PRD.md' && exit 0   # PRD already being updated

echo "You changed files under src/ but docs/PRD.md was not updated. Per CLAUDE.md, update the relevant PRD sections (current state, settings, decisions, removed features, open items) and add a Change log line, or say why no PRD update is needed." >&2
exit 2
