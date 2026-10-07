#!/usr/bin/env bash
# Stop hook: if source files changed but docs/PRD.md did not, make Claude update it.
# Blocks at most once per stop (stop_hook_active guard), so it can't loop.
input="$(cat)"
echo "$input" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true' && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
base="origin/main"
git rev-parse --verify -q "$base" >/dev/null || base="HEAD"

changed="$( { git diff --name-only "$base" 2>/dev/null; git ls-files --others --exclude-standard; } | sort -u )"
echo "$changed" | grep -q '^src/' || exit 0          # no app changes
echo "$changed" | grep -qx 'docs/PRD.md' && exit 0   # PRD already updated

echo "You changed files under src/ but docs/PRD.md was not updated. Per CLAUDE.md, update the relevant PRD sections (current state, settings, decisions, removed features, open items) and add a Change log line, or say why no PRD update is needed." >&2
exit 2
