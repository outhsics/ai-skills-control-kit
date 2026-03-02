#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const home = os.homedir();
const vault = process.env.OBSIDIAN_VAULT || path.join(home, 'Documents/Obsidian Vault');

const AGENTS = [
  { id: 'claude-code', name: 'Claude Code', dir: '~/.claude/skills' },
  { id: 'codex', name: 'Codex', dir: '~/.codex/skills' },
  { id: 'gemini-cli', name: 'Gemini CLI', dir: '~/.gemini/skills' },
  { id: 'cursor', name: 'Cursor', dir: '~/.cursor/skills' },
  { id: 'antigravity', name: 'Antigravity', dir: '~/.gemini/antigravity/skills' },
];

const canonicalDirRaw = '~/.agents/skills';
const defaultOutput = path.join(vault, '20-Resources/工具/AI Skills 管理/skills-dashboard.html');
const outputPath = process.argv[2] ? resolveHome(process.argv[2]) : defaultOutput;
const canonicalDir = resolveHome(canonicalDirRaw);

function resolveHome(p) {
  return p.startsWith('~/') ? path.join(home, p.slice(2)) : p;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listSkillNames(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory() || entry.isSymbolicLink())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

async function getNodeType(p) {
  try {
    const stat = await fs.lstat(p);
    if (stat.isSymbolicLink()) return 'symlink';
    if (stat.isDirectory()) return 'directory';
    return 'other';
  } catch {
    return 'missing';
  }
}

async function buildData() {
  const canonicalSkills = await listSkillNames(canonicalDir);
  const agents = [];

  for (const agent of AGENTS) {
    const resolvedDir = resolveHome(agent.dir);
    const installed = await exists(resolvedDir);
    const skills = installed ? await listSkillNames(resolvedDir) : [];
    agents.push({ ...agent, resolvedDir, installed, skills });
  }

  const allNames = new Set(canonicalSkills);
  for (const agent of agents) {
    for (const skill of agent.skills) allNames.add(skill);
  }

  const skills = [];
  const sortedNames = Array.from(allNames).sort((a, b) => a.localeCompare(b));

  for (const name of sortedNames) {
    const canonicalPath = path.join(canonicalDir, name);
    const canonicalType = await getNodeType(canonicalPath);
    const matrix = {};
    let coverage = 0;

    for (const agent of agents) {
      const p = path.join(agent.resolvedDir, name);
      const type = await getNodeType(p);
      const present = type !== 'missing';
      if (present) coverage += 1;
      matrix[agent.id] = { present, type, path: p };
    }

    skills.push({
      name,
      canonical: { path: canonicalPath, present: canonicalType !== 'missing', type: canonicalType },
      coverage,
      totalAgents: agents.length,
      matrix,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    canonicalDir,
    agents: agents.map(({ skills: _skills, ...rest }) => rest),
    skills,
  };
}

function renderHtml(data) {
  const dataJson = JSON.stringify(data).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AI Skills Dashboard</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 16px;">
  <h1>AI Skills Dashboard</h1>
  <p id="meta"></p>
  <pre id="cmd">先在终端运行: ~/scripts/skills_manage.sh web</pre>
  <button onclick="run('all')">Run all</button>
  <button onclick="run('sync')">Run sync</button>
  <button onclick="run('dashboard')">Run dashboard</button>
  <button onclick="run('status')">Run status</button>
  <pre id="tbl"></pre>
  <script>
    const data = ${dataJson};
    document.getElementById('meta').textContent = 'Generated: ' + new Date(data.generatedAt).toLocaleString();
    document.getElementById('tbl').textContent = JSON.stringify(data.skills.map(s => ({skill: s.name, coverage: s.coverage + '/' + data.agents.length})), null, 2);
    async function run(command) {
      const out = document.getElementById('cmd');
      out.textContent = 'running ' + command + ' ...';
      try {
        const r = await fetch('http://127.0.0.1:18766/api/run', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({command})
        });
        const j = await r.json();
        out.textContent = (j.ok ? 'ok' : 'fail') + '\n' + ((j.stdout || '') + (j.stderr || '')).slice(-10000);
      } catch (e) {
        out.textContent = 'request error: ' + e;
      }
    }
  </script>
</body>
</html>`;
}

const data = await buildData();
const html = renderHtml(data);
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, html, 'utf8');
console.log(`Wrote dashboard: ${outputPath}`);
