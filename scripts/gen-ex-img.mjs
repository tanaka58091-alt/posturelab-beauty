// ===================================================================
// Codex CLI（ChatGPT枠内）で種目イラストをバッチ生成
//   ・冪等: ex-img/raw/<id>.png があればスキップ（枠切れで止まっても再実行で続きから）
//   ・処方に出る頻度順（ex-img/_order.json）
//   ・数枚ずつ並列
//   ・参考画像 ex-img/_ref.png を毎回添付して画風を固定
// 使い方:
//   node scripts/gen-ex-img.mjs --ids pl_pelvic_curl --noref        # 基準画像づくり
//   node scripts/gen-ex-img.mjs --limit 30 --concurrency 2           # 頻度上位30を生成
// ===================================================================
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { buildPrompt } from './ex-img-prompt.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CODEX = process.env.CODEX_BIN || '/Applications/Codex.app/Contents/Resources/codex';
const RAW = path.join(ROOT, 'ex-img', 'raw');
const LOG = path.join(ROOT, 'ex-img', 'log');
const REF = path.join(ROOT, 'ex-img', '_ref.png');
const GEN_DIR = path.join(os.homedir(), '.codex', 'generated_images');
fs.mkdirSync(RAW, { recursive: true }); fs.mkdirSync(LOG, { recursive: true });

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i+1] : d; };
const LIMIT = Number(opt('--limit', 20));
const CONC = Number(opt('--concurrency', 2));
const TIMEOUT = Number(opt('--timeout', 420)) * 1000;
const NOREF = args.includes('--noref');
const IDS = opt('--ids', null);

let order = [];
if (IDS) order = IDS.split(',').map(s => s.trim()).filter(Boolean);
else order = JSON.parse(fs.readFileSync(path.join(ROOT, 'ex-img', '_order.json'), 'utf8')).filter(r => r.freq > 0).map(r => r.id);

const todo = order.filter(id => !fs.existsSync(path.join(RAW, id + '.png'))).slice(0, LIMIT);
console.log(`対象 ${todo.length} 件（並列 ${CONC}・参考画像 ${NOREF ? 'なし' : (fs.existsSync(REF) ? 'あり' : '★見つからない')}）`);
if (!NOREF && !fs.existsSync(REF)) { console.error('ex-img/_ref.png がありません。まず --noref で基準画像を作ってください'); process.exit(1); }

const newestGenerated = (since) => {
  try {
    return fs.readdirSync(GEN_DIR).map(f => path.join(GEN_DIR, f))
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f) && fs.statSync(f).mtimeMs >= since)
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0] || null;
  } catch { return null; }
};

function runOne(id){
  return new Promise((resolve) => {
    const out = path.join(RAW, id + '.png');
    const started = Date.now();
    const prompt = buildPrompt(id, { withRef: !NOREF });
    const cliArgs = ['exec', '--skip-git-repo-check', '--sandbox', 'workspace-write', '-C', RAW,
      '-o', path.join(LOG, id + '.last.txt')];
    if (!NOREF) cliArgs.push('-i', REF);
    cliArgs.push('--', prompt);
    const logStream = fs.createWriteStream(path.join(LOG, id + '.log'));
    const child = spawn(CODEX, cliArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
    child.stdout.pipe(logStream); child.stderr.pipe(logStream);
    const timer = setTimeout(() => { child.kill('SIGKILL'); }, TIMEOUT);
    child.on('close', (code) => {
      clearTimeout(timer);
      // 保存先に無ければ ~/.codex/generated_images の新しいファイルを拾う（ハマりポイント対策）
      if (!fs.existsSync(out)) {
        const g = newestGenerated(started);
        if (g) { fs.copyFileSync(g, out); }
      }
      const ok = fs.existsSync(out) && fs.statSync(out).size > 20000;
      const sec = Math.round((Date.now() - started) / 1000);
      console.log(`${ok ? '✅' : '❌'} ${id}  ${sec}s${ok ? '' : ` (exit ${code})`}`);
      resolve({ id, ok, sec, code });
    });
  });
}

const results = [];
let cursor = 0;
async function worker(){
  while (cursor < todo.length){
    const id = todo[cursor++];
    results.push(await runOne(id));
  }
}
await Promise.all(Array.from({ length: Math.min(CONC, todo.length) }, worker));
const ok = results.filter(r => r.ok).length;
console.log(`\n完了: 成功 ${ok} / 失敗 ${results.length - ok}`);
const statusPath = path.join(ROOT, 'ex-img', '_status.json');
const prev = fs.existsSync(statusPath) ? JSON.parse(fs.readFileSync(statusPath, 'utf8')) : {};
results.forEach(r => { prev[r.id] = { ok: r.ok, sec: r.sec, at: new Date().toISOString() }; });
fs.writeFileSync(statusPath, JSON.stringify(prev, null, 1));
