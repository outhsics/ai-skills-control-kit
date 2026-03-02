# AI Skills Control Kit

目标：统一管理本机 AI 工具技能（Claude Code / Codex / Gemini CLI / Cursor / Antigravity），并提供本地可视化看板。

## 安装

```bash
chmod +x install.sh
./install.sh
```

## 日常使用

```bash
~/scripts/skills_manage.sh all
~/scripts/skills_manage.sh web
```

- `all`：同步 + 刷新看板 + 状态检查
- `web`：启动本地控制 API，网页按钮可直接执行命令

## 看板默认位置

```text
~/Documents/Obsidian Vault/20-Resources/工具/AI Skills 管理/skills-dashboard.html
```

## 作为技能安装（可选）

仓库发布后可用：

```bash
npx skills add <your-repo-url> --skill ai-skills-control -g -a codex -a claude-code
```
