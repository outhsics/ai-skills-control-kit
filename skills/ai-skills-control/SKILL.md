---
name: ai-skills-control
description: Manage and sync local agent skills across Claude Code, Codex, Gemini CLI, Cursor, and Antigravity with a repeatable CLI workflow and a local web dashboard.
---

# AI Skills Control

## When to use
Use this skill when the user asks to:
- sync skills across multiple local AI tools
- check skill coverage/missing links between tools
- maintain a local dashboard for skill management
- package and migrate their skill setup to another machine

## Core workflow

1. Sync skills to target agents:

```bash
~/scripts/sync_skills_all_agents.sh
```

2. Rebuild dashboard HTML:

```bash
node ~/scripts/build_skills_dashboard.mjs
```

3. Check current global status:

```bash
npx -y skills ls -g
```

4. Optional web control mode (for dashboard buttons):

```bash
~/scripts/skills_manage.sh web
```

## Script entrypoint

Use the unified wrapper command:

```bash
~/scripts/skills_manage.sh all
```

Supported subcommands:
- `sync`
- `dashboard`
- `status`
- `web`
- `all`

## References

If needed, load these files:
- `scripts/sync_skills_all_agents.sh`
- `scripts/build_skills_dashboard.mjs`
- `scripts/skills_web_control_server.mjs`
- `scripts/skills_manage.sh`
