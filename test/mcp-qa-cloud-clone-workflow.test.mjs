import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('cloud clone hook is exact owner/source/attempt, finite, serialized and dependency-free',async()=>{
 const w=await readFile('.github/workflows/afw-qa-cloud-clone.yml','utf8');
 for(const s of ['issue_comment:','types: [created]',"github.ref == 'refs/heads/main'","github.run_attempt == '1'",'github.event.repository.id == 1347578006','github.event.issue.number == 497','github.event.comment.user.id == 290715446','github.event.sender.id == 290715446',"github.event.comment.author_association == 'OWNER'","startsWith(github.event.comment.body, '/afw-qa-deploy-observe-restore v1 ')",'group: afw-qa-cloud-closed-rollback','queue: max','cancel-in-progress: false','timeout-minutes: 12','environment: afw-qa-cloud-closed-rollback','contents: write','AFW_QA_CLOSED_TOKEN: '+String.fromCharCode(36)+'{{ secrets.AFW_QA_CLOSED_TOKEN }}','GITHUB_TOKEN: '+String.fromCharCode(36)+'{{ github.token }}','run: node scripts/qa-cloud-clone.mjs','persist-credentials: false','retention-days: 7'])assert.ok(w.includes(s),s);
 assert.doesNotMatch(w,/workflow_dispatch:|schedule:|npm ci|npm install|npx |shell:|force|AFW_RELEASE_PUBLISH_TOKEN/);assert.equal(w.includes('run: '+String.fromCharCode(36)+'{{'),false);
 const old=await readFile('.github/workflows/afw-qa-cloud-closed-rollback.yml','utf8');assert.match(old,/queue: max/);
 const cli=await readFile('scripts/qa-cloud-clone.mjs','utf8');assert.match(cli,/validateQaLifecycleCommand/);assert.match(cli,/runQaClosedCloudClone/);assert.match(cli,/assertQaLifecycleWindow/);assert.match(cli,/mode:0o600/);assert.match(cli,/flag:'wx'/);assert.match(cli,/AFW_QA_CLOSED_CLONE_RESULT /);assert.doesNotMatch(cli,/console\.log\(.*(event|credential|process\.env|token)/i);
});
