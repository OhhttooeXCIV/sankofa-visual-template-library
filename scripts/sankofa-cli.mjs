#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const command = args.find((arg) => !arg.startsWith('--')) || 'doctor';
const dryRun = args.includes('--dry-run') || !args.includes('--apply');
const json = args.includes('--json');
const project = args.find((arg, index) => index > 0 && !arg.startsWith('--')) || '';

const labels = ['bug','feature','enhancement','documentation','security','accessibility','performance','dependencies','ci','backend','frontend','uat','blocked','good first issue'];
const statuses = ['ToDo','In Progress','Review','In Review','Rejected','Done'];
const root = process.cwd();

function result(ok, message, details = {}) {
  const payload = { ok, command, dryRun, message, ...details };
  console.log(json ? JSON.stringify(payload, null, 2) : `${ok ? 'OK' : 'ERROR'}: ${message}`);
  if (!ok) process.exitCode = 1;
}

function validate() {
  const required = ['package.json', 'src', 'docs/public', 'packages/ui', 'packages/contracts', 'packages/config', 'packages/supabase'];
  const missing = required.filter((item) => !fs.existsSync(path.join(root, item)));
  result(missing.length === 0, missing.length ? `Missing platform paths: ${missing.join(', ')}` : 'Platform structure is valid', { missing });
}

function doctor() {
  const checks = {
    node: Number(process.versions.node.split('.')[0]) >= 20,
    git: fs.existsSync(path.join(root, '.git')),
    packages: fs.existsSync(path.join(root, 'packages')),
    workflows: fs.existsSync(path.join(root, '.github/workflows')),
    supabaseRegionDefaulted: (process.env.SUPABASE_REGION || 'sa-east-1') === 'sa-east-1'
  };
  result(Object.values(checks).every(Boolean), 'Environment diagnostics complete', { checks });
}

function plan() {
  if (!project && command === 'create') return result(false, 'create requires a project name');
  if (command === 'create' && !dryRun) {
    const slug = project.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const target = path.resolve(root, '..', slug);
    if (!target.startsWith(path.resolve(root, '..'))) return result(false, 'Project path is outside the workspace parent');
    if (fs.existsSync(target)) return result(false, `Target already exists: ${target}`);
    const template = path.join(root, 'templates', 'react-vite-app');
    for (const entry of fs.readdirSync(template, { withFileTypes: true })) {
      const from = path.join(template, entry.name);
      const to = path.join(target, entry.name);
      if (entry.isDirectory()) {
        fs.cpSync(from, to, { recursive: true });
      } else {
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(from, to);
      }
    }
    for (const file of ['package.json','index.html','README.md','.env.example','src/main.jsx']) {
      const filePath = path.join(target, file);
      if (fs.existsSync(filePath)) fs.writeFileSync(filePath, fs.readFileSync(filePath, 'utf8').replaceAll('__PROJECT_SLUG__', slug).replaceAll('__PROJECT_NAME__', project));
    }
    return result(true, `Generated ${project}`, { target, project, slug });
  }
  result(true, dryRun ? 'No changes applied; execution plan generated' : 'Operation is ready for the configured adapter', {
    project,
    steps: ['frontend: React/Vite + pinned packages', 'backend: isolated Supabase project', 'hosting: static-first Vercel', 'governance: teams, labels, Project V2 board', 'ci: reusable quality/security/Supabase/hosted workflows'],
    board: { name: project, statuses },
    labels,
    nextAction: dryRun ? 'Re-run with --apply after reviewing the plan' : 'Credentials and scoped adapters are required for external mutations'
  });
}

switch (command) {
  case 'doctor': doctor(); break;
  case 'validate': validate(); break;
  case 'create': case 'sync': case 'project:configure': case 'supabase:bootstrap': case 'github:configure': case 'vercel:configure': plan(); break;
  default: result(false, `Unknown command: ${command}`);
}
