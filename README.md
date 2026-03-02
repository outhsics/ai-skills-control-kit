# AI Skills Control Kit

[English](#english) | [中文](#中文)

## Recruiter Snapshot

- Status: `active`
- Positioning: DevOps-style operations toolkit for AI coding agents
- Core Value: One command to sync, audit, and visualize multi-agent skill ecosystems
- Target Agents: Claude Code, Codex, Gemini CLI, Cursor, Antigravity
- Stack: Bash, Node.js, `vercel-labs/skills`, local dashboard automation
- Proof of Engineering: deterministic scripts, migration workflow, local-only control API
- Last Reviewed: `2026-03-02`

---

## English

### What This Is
AI Skills Control Kit is a production-ready local operations toolkit for managing agent skills across:

- Claude Code
- Codex
- Gemini CLI
- Cursor
- Antigravity

It provides:

- Deterministic CLI operations (`sync`, `status`, `dashboard`, `all`)
- Multi-agent skill synchronization through `vercel-labs/skills`
- Local dashboard generation for visibility and auditability
- Optional local web control API for one-click actions from the dashboard
- Portable install workflow for new machines

### Why This Exists
Most teams lose time and quality due to:

- Drift between agent skill folders
- Ad-hoc manual copying
- No visibility of coverage/missing skills
- Weak migration/recovery process

This kit standardizes those operations into one repeatable workflow.

### Repository Structure

```text
.
├── install.sh
├── README.md
├── README.zh-CN.md
└── skills/
    └── ai-skills-control/
        ├── SKILL.md
        ├── agents/openai.yaml
        └── scripts/
            ├── sync_skills_all_agents.sh
            ├── build_skills_dashboard.mjs
            ├── skills_web_control_server.mjs
            └── skills_manage.sh
```

### Prerequisites

- macOS/Linux shell environment
- `node >= 18`
- `npx` available
- `npx -y skills` can run (from `https://github.com/vercel-labs/skills`)
- Local agent config folders exist (at least one of the supported agents)

### Installation

```bash
chmod +x install.sh
./install.sh
```

This installs runtime scripts into `~/scripts`:

- `~/scripts/sync_skills_all_agents.sh`
- `~/scripts/build_skills_dashboard.mjs`
- `~/scripts/skills_web_control_server.mjs`
- `~/scripts/skills_manage.sh`

### Daily Operations

```bash
# Full run: sync + dashboard + status
~/scripts/skills_manage.sh all

# Sync only
~/scripts/skills_manage.sh sync

# Rebuild dashboard only
~/scripts/skills_manage.sh dashboard

# View current global skills
~/scripts/skills_manage.sh status
```

### Dashboard Button Mode (Optional)

1. Start local API server:

```bash
~/scripts/skills_manage.sh web
```

2. Open dashboard HTML and click buttons:

- `Run all`
- `Run sync`
- `Run dashboard`
- `Run status`

Default dashboard path:

```text
~/Documents/Obsidian Vault/20-Resources/工具/AI Skills 管理/skills-dashboard.html
```

### Operational Model

- Canonical source of truth: `~/.agents/skills`
- Agent-specific folders are synced/linked for compatibility
- All execution is local-first and explicit via CLI commands
- Dashboard acts as an observability layer, not hidden automation

### Migration to a New Machine

```bash
git clone https://github.com/outhsics/ai-skills-control-kit.git
cd ai-skills-control-kit
./install.sh
~/scripts/skills_manage.sh all
~/scripts/skills_manage.sh web
```

### Troubleshooting

- `npx skills` command fails:
  - verify Node/npm environment
  - run `npx -y skills --version`
- Dashboard not updated:
  - run `~/scripts/skills_manage.sh dashboard`
- Buttons show server offline:
  - run `~/scripts/skills_manage.sh web`
- A specific agent cannot see skills:
  - run `~/scripts/skills_manage.sh status`
  - then re-run `~/scripts/skills_manage.sh all`
  - restart that agent

### Security Notes

- Web control API binds to `127.0.0.1` only by default.
- All commands executed by the API are allowlisted (`sync`, `dashboard`, `status`, `all`).
- This kit manages local files with user-level permissions; review scripts before use in regulated environments.

### Open Source and Commercial Use

This project is intended for open-source collaboration and commercial operations.
It is designed to be transparent, scriptable, and auditable for team workflows.

### Contributing

1. Fork and create a branch
2. Keep scripts deterministic and idempotent
3. Update both language sections when changing behavior
4. Open PR with before/after usage examples

### License

MIT License. See [LICENSE](./LICENSE).

---

## 中文

### 这是什么
AI Skills Control Kit 是一套可用于生产环境的本地技能运维工具，用于统一管理以下 AI 工具的 skills：

- Claude Code
- Codex
- Gemini CLI
- Cursor
- Antigravity

它提供：

- 可重复执行的命令行运维入口（`sync`、`status`、`dashboard`、`all`）
- 基于 `vercel-labs/skills` 的多工具同步
- 本地可视化看板（覆盖率/缺失项可见）
- 可选本地 Web 控制 API（在看板上按钮触发命令）
- 新电脑迁移安装流程

### 为什么要做这套
常见问题是：

- 多工具 skills 目录长期漂移
- 手工复制不可追踪、易出错
- 看不到哪些工具缺失某个 skill
- 换电脑恢复成本高

本项目把这些动作标准化为一条可审计、可复用的流程。

### 目录结构

```text
.
├── install.sh
├── README.md
├── README.zh-CN.md
└── skills/
    └── ai-skills-control/
        ├── SKILL.md
        ├── agents/openai.yaml
        └── scripts/
            ├── sync_skills_all_agents.sh
            ├── build_skills_dashboard.mjs
            ├── skills_web_control_server.mjs
            └── skills_manage.sh
```

### 环境要求

- macOS/Linux shell 环境
- `node >= 18`
- 可用 `npx`
- 能执行 `npx -y skills`（来自 `https://github.com/vercel-labs/skills`）
- 本机已安装至少一个目标 AI 工具

### 安装

```bash
chmod +x install.sh
./install.sh
```

安装后会写入 `~/scripts`：

- `~/scripts/sync_skills_all_agents.sh`
- `~/scripts/build_skills_dashboard.mjs`
- `~/scripts/skills_web_control_server.mjs`
- `~/scripts/skills_manage.sh`

### 日常操作

```bash
# 全流程：同步 + 刷新看板 + 状态检查
~/scripts/skills_manage.sh all

# 仅同步
~/scripts/skills_manage.sh sync

# 仅刷新看板
~/scripts/skills_manage.sh dashboard

# 查看当前全局技能状态
~/scripts/skills_manage.sh status
```

### 看板按钮模式（可选）

1. 启动本地控制服务：

```bash
~/scripts/skills_manage.sh web
```

2. 打开 `skills-dashboard.html`，点击按钮执行：

- `Run all`
- `Run sync`
- `Run dashboard`
- `Run status`

默认看板路径：

```text
~/Documents/Obsidian Vault/20-Resources/工具/AI Skills 管理/skills-dashboard.html
```

### 运维模型

- 真源目录：`~/.agents/skills`
- 其它工具目录通过同步/软链接做兼容
- 所有动作命令化、显式执行
- 看板用于可视化观察，不做黑盒自动化

### 换电脑恢复

```bash
git clone https://github.com/outhsics/ai-skills-control-kit.git
cd ai-skills-control-kit
./install.sh
~/scripts/skills_manage.sh all
~/scripts/skills_manage.sh web
```

### 故障排查

- `npx skills` 失败：
  - 检查 Node/npm 环境
  - 执行 `npx -y skills --version`
- 看板数据不是最新：
  - 执行 `~/scripts/skills_manage.sh dashboard`
- 看板按钮显示 server offline：
  - 执行 `~/scripts/skills_manage.sh web`
- 某个工具看不到新 skill：
  - 先 `~/scripts/skills_manage.sh status`
  - 再 `~/scripts/skills_manage.sh all`
  - 重启对应工具

### 安全说明

- Web 控制服务默认只监听 `127.0.0.1`。
- 仅允许固定命令：`sync`、`dashboard`、`status`、`all`。
- 本项目会操作用户本地目录；在合规场景建议先审阅脚本后再落地。

### 开源与商用

本项目面向开源协作与商业化运维场景，强调透明、可脚本化、可审计。

### 贡献

1. Fork 后新建分支
2. 保持脚本幂等、可重复执行
3. 行为变更需同步更新中英文说明
4. PR 中提供前后操作示例

### 许可

MIT License，见 [LICENSE](./LICENSE)。
