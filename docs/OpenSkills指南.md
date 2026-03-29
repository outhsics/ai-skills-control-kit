# OpenSkills 通用技能加载器指南

> **更新日期**: 2026-03-29
> **状态**: ⭐ 推荐使用
> **兼容性**: Claude Code, Codex, Cursor, Windsurf, Aider

---

## 📖 什么是 OpenSkills？

OpenSkills 是一个**通用技能加载器**，可以在任何 AI coding agent 中安装和加载 Anthropic SKILL.md 格式的技能。

### 🌟 核心优势

| 特性 | 说明 |
|------|------|
| **🔄 通用适配** | 一个技能，多个平台（Claude Code、Codex、Cursor、Windsurf、Aider） |
| **📦 统一格式** | 使用 Anthropic 的 SKILL.md 标准 |
| **⚡ 渐进式加载** | 只在需要时加载，保持上下文干净 |
| **📝 生成 AGENTS.md** | 为所有 agents 生成统一的技能描述 |
| **🌍 开源社区** | 活跃的社区支持和更新 |

---

## 🚀 快速开始

### 1. 安装 OpenSkills

```bash
# 全局安装（推荐）
npm install -g openskills

# 或使用 npx（无需安装）
npx openskills
```

### 2. 安装官方技能

```bash
# 安装 Anthropic 官方技能
openskills install anthropics/skills

# 查看已安装的技能
openskills list
```

### 3. 生成 AGENTS.md

```bash
# 生成技能配置文件
openskills sync -y

# AGENTS.md 会包含所有已安装技能的描述
```

---

## 🔧 与现有工具的对比

### vs Vercel Skills (`vercel-labs/skills`)

| 方面 | OpenSkills | Vercel Skills |
|------|------------|---------------|
| **维护状态** | ✅ 活跃（2026-01-17） | ⚠️ 较少更新 |
| **社区支持** | ✅ 强大 | ⚠️ 较小 |
| **文档质量** | ✅ 详细 | ⚠️ 基础 |
| **功能完整性** | ✅ 完整 | ✅ 完整 |
| **兼容性** | ✅ 更广泛 | ✅ Vercel 生态优化 |

### vs OpenSpace

| 方面 | OpenSkills | OpenSpace |
|------|------------|-----------|
| **定位** | 通用技能加载器 | 技能进化系统 |
| **核心功能** | 跨平台技能共享 | 自我修复、版本追踪 |
| **能否替代** | ❌ 不能替代 OpenSpace | ❌ 不能替代 OpenSkills |
| **关系** | 互补 | 互补 |

**结论**: OpenSkills 和 OpenSpace 是**互补关系**，不是替代关系！

```
OpenSkills (加载器)
    ↓
加载 SKILL.md 技能
    ↓
OpenSpace (进化引擎)
    ↓
技能自动进化
    ↓
上传到云端社区
```

---

## 📋 日常使用

### 基本命令

```bash
# 列出所有已安装的技能
openskills list

# 更新 AGENTS.md
openskills sync -y

# 从 GitHub 安装新技能
openskills install <username>/<repo>

# 更新已安装的技能
openskills update

# 移除技能
openskills remove <skill-name>

# 读取技能内容
openskills read <skill-name>
```

### 高级用法

```bash
# 安装到全局目录
openskills install anthropics/skills --global

# 安装到 .agent/skills（多代理环境）
openskills install anthropics/skills --universal

# 从本地路径安装
openskills install ./my-skill

# 从私有仓库安装
openskills install git@github.com:your-org/private-skills.git

# 读取多个技能
openskills read skill-one,skill-two
```

---

## 🎯 最佳实践

### 1. 项目级 vs 全局安装

```bash
# 项目级（推荐）
openskills install my-skill
# 安装到 ./.claude/skills/

# 全局级
openskills install my-skill --global
# 安装到 ~/.claude/skills/
```

### 2. 多代理环境

```bash
# 使用 --universal 模式
openskills install anthropics/skills --universal
# 安装到 ./.agent/skills/

# 优先级：
# 1. ./.agent/skills/
# 2. ~/.agent/skills/
# 3. ./.claude/skills/
# 4. ~/.claude/skills/
```

### 3. 技能开发工作流

```bash
# 1. 创建技能目录
mkdir my-skill
cd my-skill

# 2. 创建 SKILL.md
cat > SKILL.md << 'EOF'
---
name: my-skill
description: 我的自定义技能
---

# 技能说明

当用户需要 XXX 时，使用此技能。
EOF

# 3. 本地测试
openskills install ./my-skill
openskills read my-skill

# 4. 发布到 GitHub
git init
git add .
git commit -m "Add my-skill"
gh repo create my-skill --public
git remote add origin git@github.com:your-username/my-skill.git
git push -u origin main

# 5. 其他人可以安装
openskills install your-username/my-skill
```

---

## 🔗 配置 AI Agents

### Claude Code

```bash
# 1. 生成 AGENTS.md
openskills sync -y

# 2. 复制到 Claude Code 目录
cp AGENTS.md ~/.claude/AGENTS.md

# 3. 重启 Claude Code
```

### Codex CLI

```bash
# 1. 生成 AGENTS.md
openskills sync -y

# 2. 复制到 Codex 目录
cp AGENTS.md ~/.codex/AGENTS.md

# 3. 重启 Codex
```

### Cursor/Windsurf

```bash
# 复制 AGENTS.md 到项目根目录
cp AGENTS.md /your-project/AGENTS.md
```

---

## 📚 推荐技能

### 官方技能

```bash
# Anthropic 官方技能集合
openskills install anthropics/skills
```

### 社区技能

```bash
# OpenSpace 相关
openskills install outhsics/ai-skills-control-kit

# 更多技能可以在 GitHub 搜索
# 搜索关键词: "openskills", "SKILL.md", "claude-code-skills"
```

---

## ⚠️ 注意事项

### 1. 与 OpenSpace 的关系

- **OpenSkills**: 技能加载器，负责分发和加载
- **OpenSpace**: 技能进化系统，负责自我修复和改进
- **两者互补，不冲突**

### 2. 技能格式要求

所有技能必须使用 **Anthropic SKILL.md 格式**：

```markdown
---
name: skill-name
description: 技能描述
---

# 技能标题

技能详细说明...
```

### 3. 版本兼容性

- **Node.js**: >= 20.6.0
- **Git**: 用于克隆仓库
- **AI Agents**: 支持 SKILL.md 或 AGENTS.md 格式

---

## 🛠️ 故障排查

### 技能不生效

```bash
# 1. 检查技能列表
openskills list

# 2. 重新生成 AGENTS.md
openskills sync -y

# 3. 检查 AGENTS.md 位置
ls -la ~/.claude/AGENTS.md
ls -la ~/.codex/AGENTS.md

# 4. 重启 AI Agent
```

### 安装失败

```bash
# 检查 Node.js 版本
node --version  # 应该 >= 20.6.0

# 检查 Git
git --version

# 清理缓存
rm -rf ~/.openskills
openskills install anthropics/skills
```

---

## 📖 相关资源

- **GitHub**: https://github.com/numman-ali/openskills
- **npm**: https://npm.im/openskills
- **Anthropic Skills**: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

---

## 🎯 总结

OpenSkills 是目前**最通用、最活跃**的技能加载器：

✅ 优势：
- 跨平台兼容性最强
- 社区活跃，文档完善
- 与现有工具互补

⚠️ 注意：
- 不能替代 OpenSpace 的进化功能
- 需要遵循 SKILL.md 格式

💡 建议：
- **新项目优先使用 OpenSkills**
- **与 OpenSpace 配合使用**
- **定期更新技能库**

---

**最后更新**: 2026-03-29
**维护者**: AI Skills Control Kit
