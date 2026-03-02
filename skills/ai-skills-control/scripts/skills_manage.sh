#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="${SKILLS_CTRL_BASE_DIR:-$HOME/scripts}"
SYNC_SCRIPT="$BASE_DIR/sync_skills_all_agents.sh"
DASH_SCRIPT="$BASE_DIR/build_skills_dashboard.mjs"
WEB_SERVER_SCRIPT="$BASE_DIR/skills_web_control_server.mjs"
DASH_FILE="${SKILLS_DASHBOARD_FILE:-$HOME/Documents/Obsidian Vault/20-Resources/工具/AI Skills 管理/skills-dashboard.html}"

usage() {
  cat <<'USAGE'
Usage: skills_manage.sh <command>

Commands:
  sync       Sync skills to claude-code/codex/gemini-cli/cursor/antigravity
  dashboard  Rebuild local web dashboard HTML
  status     Show global skills summary
  web        Start local web control API (for dashboard buttons)
  all        Run sync + dashboard + status
USAGE
}

cmd="${1:-all}"

case "$cmd" in
  sync)
    "$SYNC_SCRIPT"
    ;;
  dashboard)
    node "$DASH_SCRIPT"
    echo "Dashboard: $DASH_FILE"
    ;;
  status)
    npx -y skills ls -g
    ;;
  web)
    node "$WEB_SERVER_SCRIPT"
    ;;
  all)
    "$SYNC_SCRIPT"
    node "$DASH_SCRIPT"
    npx -y skills ls -g
    echo "Dashboard: $DASH_FILE"
    ;;
  *)
    usage
    exit 1
    ;;
esac
