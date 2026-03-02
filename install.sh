#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_SCRIPTS="$BASE_DIR/skills/ai-skills-control/scripts"
DEST_SCRIPTS="$HOME/scripts"

if [[ ! -d "$SRC_SCRIPTS" ]]; then
  echo "Missing source scripts: $SRC_SCRIPTS"
  exit 1
fi

mkdir -p "$DEST_SCRIPTS"

install_script() {
  local src="$1"
  local name
  name="$(basename "$src")"
  cp "$src" "$DEST_SCRIPTS/$name"
  chmod +x "$DEST_SCRIPTS/$name"
  echo "Installed: $DEST_SCRIPTS/$name"
}

install_script "$SRC_SCRIPTS/sync_skills_all_agents.sh"
install_script "$SRC_SCRIPTS/build_skills_dashboard.mjs"
install_script "$SRC_SCRIPTS/skills_web_control_server.mjs"
install_script "$SRC_SCRIPTS/skills_manage.sh"

echo
echo "Done. Next:"
echo "1) ~/scripts/skills_manage.sh all"
echo "2) ~/scripts/skills_manage.sh web"
