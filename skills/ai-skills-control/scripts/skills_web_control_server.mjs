#!/usr/bin/env node
import http from 'node:http';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { URL } from 'node:url';

const HOST = process.env.SKILLS_WEB_HOST || '127.0.0.1';
const PORT = Number(process.env.SKILLS_WEB_PORT || 18766);
const MANAGER = path.join(os.homedir(), 'scripts', 'skills_manage.sh');
const ALLOWED = new Set(['sync', 'dashboard', 'status', 'all']);

let running = false;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, status, body) {
  setCors(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function runManager(command) {
  return new Promise((resolve) => {
    const child = spawn(MANAGER, [command], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
      env: process.env,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('close', (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 1024 * 64) body = body.slice(0, 1024 * 64);
    });
    req.on('end', () => resolve(body));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);

  if (req.method === 'OPTIONS') {
    setCors(res);
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, running });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/run') {
    if (running) {
      sendJson(res, 409, { ok: false, error: 'busy' });
      return;
    }

    const raw = await parseBody(req);
    let command = '';

    try {
      const parsed = raw ? JSON.parse(raw) : {};
      command = String(parsed.command || '').trim();
    } catch {
      sendJson(res, 400, { ok: false, error: 'invalid_json' });
      return;
    }

    if (!ALLOWED.has(command)) {
      sendJson(res, 400, { ok: false, error: 'invalid_command' });
      return;
    }

    running = true;
    try {
      const result = await runManager(command);
      sendJson(res, 200, {
        ok: result.code === 0,
        command,
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr,
      });
    } finally {
      running = false;
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: 'not_found' });
});

server.listen(PORT, HOST, () => {
  console.log(`Skills web control server listening on http://${HOST}:${PORT}`);
});
