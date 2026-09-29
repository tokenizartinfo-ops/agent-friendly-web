import { runCloudflareNativeSmoke } from './smoke-cloudflare-native-local.mjs';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (version && !/^[a-f0-9-]{36}$/.test(version)) throw new Error('Invalid version');
const headers = version ? { 'Cloudflare-Workers-Version-Overrides': `agent-friendly-web-web-production="${version}"` } : {};
const fetchImpl = (url, options = {}) => fetch(url, { ...options, headers: { ...options.headers, ...headers } });
const smoke = await runCloudflareNativeSmoke({ baseUrl: 'https://agentfriendlyweb.dev', mode: 'public-edge', fetchImpl });
const checks = [];
for (const [path, marker] of [
  ['/casos/tokenizart', 'Publicacion verificada: 2026-09-09'],
  ['/en/cases/tokenizart', '2026-09-09'],
  ['/pt/casos/tokenizart', '2026-09-09'],
  ['/registry/tokenizart/profile.json', 'historico'],
  ['/registry/tokenizart/profile.md', 'historico'],
  ['/cases/tokenizart/RUNBOOK.es.md', 'historico'],
]) {
  const r = await fetchImpl(`https://agentfriendlyweb.dev${path}`, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  const body = await r.text();
  checks.push({ path, status: r.status, ok: r.status === 200 && body.includes(marker) });
}
const ledger = await fetchImpl('https://agentfriendlyweb.dev/.well-known/infrastructure-status.json');
const actual = createHash('sha256').update(Buffer.from(await ledger.arrayBuffer())).digest('hex');
const expected = createHash('sha256').update(readFileSync('public/.well-known/infrastructure-status.json')).digest('hex');
checks.push({ path: 'ledger-preserved', ok: actual === expected, sha256: actual });
const report = { observedAt: new Date().toISOString(), version: version || 'normal-public-request', smoke, checks, ok: smoke.ok && checks.every(c => c.ok) };
writeFileSync(version ? '../override-verification.json' : '../public-verification.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
