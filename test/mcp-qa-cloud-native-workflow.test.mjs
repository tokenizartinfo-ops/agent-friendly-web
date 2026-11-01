import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parse} from 'yaml';
const expression=s=>String.fromCharCode(36)+'{{ '+s+' }}';
test('native observation hook has exact owner/repository/issue/main/attempt gates and shares the finite writer queue',async()=>{
 const text=await readFile('.github/workflows/afw-qa-cloud-native-observation.yml','utf8'),w=parse(text),j=w.jobs.observe;
 assert.deepEqual(w.on,{issue_comment:{types:['created']}});assert.deepEqual(w.permissions,{contents:'read'});assert.deepEqual(Object.keys(w.jobs),['observe']);
 for(const gate of ["github.event_name == 'issue_comment'","github.event.action == 'created'","github.ref == 'refs/heads/main'","github.run_attempt == '1'",'github.event.repository.id == 1347578006',"github.repository == 'tokenizartinfo-ops/agent-friendly-web'",'github.event.issue.number == 497','!github.event.issue.pull_request','github.event.comment.user.id == 290715446',"github.event.comment.user.login == 'tokenizartinfo-ops'","github.event.comment.user.type == 'User'",'github.event.sender.id == 290715446',"github.event.sender.login == 'tokenizartinfo-ops'","github.event.sender.type == 'User'","github.event.comment.author_association == 'OWNER'","startsWith(github.event.comment.body, '/afw-qa-native-observe-restore v1 ')"])assert.ok(j.if.includes(gate),gate);
 assert.doesNotMatch(j.if,/\|\|/);assert.equal(j['runs-on'],'ubuntu-24.04');assert.equal(j['timeout-minutes'],12);assert.equal(j.environment,'afw-qa-cloud-closed-rollback');assert.deepEqual(j.permissions,{contents:'write'});assert.deepEqual(j.concurrency,{group:'afw-qa-cloud-closed-rollback',queue:'max','cancel-in-progress':false});
 for(const name of ['afw-qa-cloud-clone.yml','afw-qa-cloud-closed-rollback.yml']){const old=parse(await readFile('.github/workflows/'+name,'utf8'));assert.ok(Object.values(old.jobs).some(job=>job.concurrency?.group===j.concurrency.group&&job.concurrency?.queue==='max'&&job.concurrency?.['cancel-in-progress']===false),name);}
 assert.equal(w.env,undefined);assert.equal(j.env,undefined);assert.doesNotMatch(text,/workflow_dispatch:|schedule:|pull_request_target:|AFW_RELEASE_PUBLISH_TOKEN|secrets: inherit|id-token:|environment: production|continue-on-error:|shell:/);
});
test('native hook checks out exact source and exposes only existing credentials to the two trusted entries',async()=>{
 const w=parse(await readFile('.github/workflows/afw-qa-cloud-native-observation.yml','utf8')),steps=w.jobs.observe.steps;
 const checkout=steps.filter(s=>s.uses?.startsWith('actions/checkout@'));assert.equal(checkout.length,1);assert.equal(checkout[0].uses,'actions/checkout@v4');assert.deepEqual(checkout[0].with,{ref:expression('github.sha'),'persist-credentials':false,'fetch-depth':1});
 const node=steps.find(s=>s.uses==='actions/setup-node@v4');assert.equal(node.with['node-version'],22);
 const run=steps.filter(s=>s.run);assert.deepEqual(run.map(s=>s.run),[
  'npm ci --ignore-scripts --no-audit --no-fund',
  'node scripts/qa-native-baseline-prepare.mjs',
  'node --test test/mcp-qa-legacy-inspection-native.test.mjs test/mcp-qa-arm-observation-native.test.mjs test/mcp-qa-closed-observation-v2-native.test.mjs',
  'node scripts/qa-native-wrapper-build.mjs',
  'node scripts/qa-cloud-native-observation.mjs'
 ]);
 assert.equal(run[0].env,undefined);
 assert.deepEqual(run[1].env,{AFW_QA_CLOSED_TOKEN:expression('secrets.AFW_QA_CLOSED_TOKEN')});
 assert.deepEqual(run[2].env,{AFW_QA_INSPECTION_BASE_MODULE:expression('runner.temp')+'/afw-qa-legacy-exact-base.mjs'});
 assert.equal(run[3].env,undefined);
 assert.deepEqual(run[4].env,{AFW_QA_CLOSED_TOKEN:expression('secrets.AFW_QA_CLOSED_TOKEN'),GITHUB_TOKEN:expression('github.token')});
 for(const i of [0,2,3])assert.doesNotMatch(JSON.stringify(run[i]),/secrets\.|github\.token|AFW_QA_CLOSED_TOKEN|GITHUB_TOKEN/);
 assert.ok(run.every(s=>!s.run.includes(expression('github.event.comment.body'))));assert.ok(run.every(s=>!s.run.includes('--output')));
});
test('native hook preserves metadata-only bounded seven-day artifacts and independent baseline/qualification/build order',async()=>{
 const w=parse(await readFile('.github/workflows/afw-qa-cloud-native-observation.yml','utf8')),steps=w.jobs.observe.steps,artifacts=steps.filter(s=>s.uses?.includes('upload-artifact'));
 assert.equal(artifacts.length,1);const a=artifacts[0];assert.equal(a.uses,'actions/upload-artifact@v4');assert.equal(a.if,'always()');assert.equal(a.with['retention-days'],7);assert.equal(a.with['if-no-files-found'],'error');
 assert.deepEqual(a.with.path.trim().split(/\s+/),['afw-qa-native-observation-result.json','afw-qa-native-observation-entry-failure.json']);assert.equal(a.with['include-hidden-files'],undefined);assert.ok(steps.indexOf(a)>steps.findIndex(s=>s.run==='node scripts/qa-cloud-native-observation.mjs'));
 for(const [path,required,forbidden]of [
  ['scripts/qa-native-baseline-prepare.mjs',/inspectQaNativeCommand/,/validateQaNativeObservationCommand|claimQa|runQaNativeMetadataObservation|writeFile\(.*(admission|ticket)/],
  ['scripts/qa-cloud-native-observation.mjs',/validateQaNativeObservationCommand/,/inspectQaNativeCommand|eval\(|new Function/]
 ]){const entry=await readFile(path,'utf8');assert.match(entry,required);assert.doesNotMatch(entry,forbidden);assert.match(entry,/flag:'wx'/);assert.match(entry,/mode:0o600/);}
 const p=await readFile('scripts/qa-native-baseline-prepare.mjs','utf8');assert.match(p,/validateQaClosedBaseVersion\(e\.result\)/);assert.match(p,/method:'GET'/);assert.match(p,/afw-qa-legacy-exact-base\.mjs/);assert.equal((p.match(/inspectQaNativeCommand\(options\)/g)??[]).length,2);assert.doesNotMatch(p,/method:'(?:POST|PUT|PATCH|DELETE)'/);
 const entry=await readFile('scripts/qa-cloud-native-observation.mjs','utf8');assert.match(entry,/validateQaNativeArtifact/);assert.match(entry,/assertQaLifecycleWindow\(admission,'cleanup'\)/);
});
