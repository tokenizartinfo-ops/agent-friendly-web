import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page=readFileSync(new URL('../app/casos/tokenizart/page.tsx',import.meta.url),'utf8');
const audit=JSON.parse(readFileSync(new URL('../public/cases/tokenizart/public-audit-2026-11-03.json',import.meta.url),'utf8'));
test('current scores use the single dated evidence source, distinct origins and human dates',()=>{
 assert.ok(page.includes('const currentAudits = publicAudit.observations;'));
 assert.ok(page.includes('public-audit-2026-11-03.json'));
 assert.deepEqual(audit.observations.map(x=>[x.origin,x.score]),[['https://tokenizart.com',87],['https://atelier.tokenizart.com',87],['https://agentfriendlyweb.dev',95]]);
 assert.equal(audit.runtimeSourceRevision,null);
 assert.ok(page.includes("timeZone: 'UTC'"));
 assert.ok(page.includes('{observationDate(audit.checkedAt)}'));
 for(const x of audit.observations){assert.equal(x.llmsStatus,200);assert.equal(x.sitemapStatus,200);}
});
test('historical scores are preserved only in a collapsed history, not current metric cards',()=>{
 const start=page.indexOf('id="previous-measurements"'),end=page.indexOf('</details>',start);
 assert.ok(start>0);const history=page.slice(start,end);
 for(const n of ['23/100','14/100','70/100']){assert.ok(history.includes(n));assert.equal(page.split(n).length,2);}
 assert.ok(history.includes('sin una medición independiente reproducible'));
 assert.ok(!page.includes('architecture-band'));
 assert.ok(page.includes("import styles from './tokenizart-case.module.css'"));
 assert.ok(!/<details[^>]*\sopen[\s=>]/.test(page));
 const profile=JSON.parse(readFileSync(new URL('../registry/builtin/tokenizart.v1.json',import.meta.url),'utf8'));
 assert.equal(profile.readiness.score,23);
});
test('methodology and chronology preserve limits without presenting scores as certification',()=>{
 assert.ok(page.includes('no acredita permisos, acciones, pagos'));
 assert.ok(page.includes('No se probaron operaciones'));
 assert.ok(page.includes('no realizamos una nueva medición de Cloudflare'));
 assert.ok(page.includes('no cuándo se instaló'));
 for(const date of ['2026-08-26','2026-09-09','2026-11-03'])assert.ok(page.includes('dateTime="'+date+'"'));
 assert.ok(page.includes('id="historical-downloads"'));
 assert.ok(page.includes('No instalarlo sobre los archivos actuales'));
 assert.ok(page.includes('/?site=tokenizart.com#auditar'));
});
