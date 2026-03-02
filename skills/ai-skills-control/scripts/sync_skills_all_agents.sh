#!/usr/bin/env bash
set -euo pipefail

agents=(
  "claude-code"
  "codex"
  "gemini-cli"
  "cursor"
  "antigravity"
)

sources=(
  "$HOME/.codex/skills"
  "$HOME/.claude/skills"
  "$HOME/.cursor/skills"
)

agent_flags=()
for agent in "${agents[@]}"; do
  agent_flags+=("-a" "$agent")
done

echo "Syncing skills to: ${agents[*]}"

for source in "${sources[@]}"; do
  [[ -d "$source" ]] || continue
  echo
  echo "Source: $source"
  npx -y skills add "$source" -g "${agent_flags[@]}" --skill '*' -y
done

echo
echo "Creating compatibility links for agent-specific global skill folders..."
canonical_dir="$HOME/.agents/skills"
compat_targets=(
  "$HOME/.codex/skills"
  "$HOME/.cursor/skills"
  "$HOME/.gemini/skills"
  "$HOME/.gemini/antigravity/skills"
)

for target in "${compat_targets[@]}"; do
  mkdir -p "$target"
  for skill_dir in "$canonical_dir"/*; do
    [[ -d "$skill_dir" ]] || continue
    skill_name="$(basename "$skill_dir")"
    dest="$target/$skill_name"
    if [[ -e "$dest" || -L "$dest" ]]; then
      continue
    fi
    ln -s "$skill_dir" "$dest"
  done
done

echo
echo "Verification:"
npx -y skills ls -g "${agent_flags[@]}"
