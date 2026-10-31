import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseQaCloudClosedInvocation} from '../lib/mcp-qa-cloud-closed-invocation.mjs';
const at=1793458800000;
function env(){return {GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REF:'refs/heads/main',GITHUB_SHA:'a'.repeat(40),GITHUB_RUN_ATTEMPT:'1',GITHUB_RUN_ID:'123456789',RUNNER_OS:'Linux',AFW_QA_CLOSED_ENVIRONMENT:'afw-qa-cloud-closed-rollback',AFW_QA_CLOSED_OPERATION:'inspect',AFW_QA_CLOSED_SESSION_ID:'b'.repeat(64),AFW_QA_CLOSED_START_MS:String(at-1000),AFW_QA_CLOSED_EXPIRES_MS:String(at+599000)};}
test('cloud invocation binds the fixed repo, source, original epoch and diagnostic scope without reading credentials',()=>{
 const r=parseQaCloudClosedInvocation({env:env(),argv:[],now:()=>at});assert.equal(r.operation,'inspect');assert.equal(r.sourceSha,'a'.repeat(40));assert.equal(r.plan.startAt,at-1000);assert.equal(r.plan.expiresAt,at+599000);assert.equal(r.plan.purpose,'afw.qa-cloud-closed-rollback.v1');assert.equal(r.pins.qaCandidate.id,'0771c5f5-88b1-428a-b700-d51aa726b35f');assert.equal(r.pins.qaClosed.id,'c570b60b-95dc-48e1-89f3-9c4651691dbc');assert.equal(r.runId,'123456789');assert.equal(JSON.stringify(r).includes('TOKEN'),false);
});
for(const [key,value]of Object.entries({GITHUB_ACTIONS:'false',GITHUB_REPOSITORY:'other/repo',GITHUB_EVENT_NAME:'pull_request',GITHUB_REF:'refs/heads/feature',GITHUB_SHA:'bad',GITHUB_RUN_ATTEMPT:'2',GITHUB_RUN_ID:'../bad',RUNNER_OS:'Windows',AFW_QA_CLOSED_ENVIRONMENT:'afw-public-release',AFW_QA_CLOSED_OPERATION:'deploy',AFW_QA_CLOSED_SESSION_ID:'not-a-hash',AFW_QA_CLOSED_START_MS:String(at-600001),AFW_QA_CLOSED_EXPIRES_MS:String(at+600001)}))test('invocation blocks wrong '+key+' before constructing a transport',()=>{
 assert.throws(()=>parseQaCloudClosedInvocation({env:{...env(),[key]:value},argv:[],now:()=>at}),/unavailable/i);
});
test('closed restore is the only allowed effect and requires original margin',()=>{
 const e={...env(),AFW_QA_CLOSED_OPERATION:'restore_known_closed_candidate'},r=parseQaCloudClosedInvocation({env:e,argv:[],now:()=>at});assert.equal(r.operation,'restore_known_closed_candidate');
 assert.throws(()=>parseQaCloudClosedInvocation({env:{...e,AFW_QA_CLOSED_EXPIRES_MS:String(at+179999)},argv:[],now:()=>at}));
});
test('no CLI flags, getters, leading zeros, expiration renewal or inherited identity',()=>{
 assert.throws(()=>parseQaCloudClosedInvocation({env:env(),argv:['--target=other'],now:()=>at}));
 for(const value of ['01793458800000','1e12',' 1793458800000','1793458800000\n'])assert.throws(()=>parseQaCloudClosedInvocation({env:{...env(),AFW_QA_CLOSED_START_MS:value},argv:[],now:()=>at}));
 const e=env();Object.defineProperty(e,'GITHUB_REF',{get(){throw Error('must not execute getter');},enumerable:true});assert.throws(()=>parseQaCloudClosedInvocation({env:e,argv:[],now:()=>at}),/unavailable/i);
 assert.throws(()=>parseQaCloudClosedInvocation({env:Object.create(env()),argv:[],now:()=>at}));
});
test('manual cloud workflow separates read and restore permissions, requires main/attempt1 and cannot install a scheduler',async()=>{
 const y=await readFile(new URL('../.github/workflows/afw-qa-cloud-closed-rollback.yml',import.meta.url),'utf8');
 assert.match(y,/workflow_dispatch:/);assert.doesNotMatch(y,/schedule:|pull_request:|push:|workflow_run:|npm |npm\n|wrangler|curl|git push|secrets: inherit/);
 assert.match(y,/cancel-in-progress: false/);assert.match(y,/contents: read/);assert.match(y,/contents: write/);assert.equal((y.match(/github\.run_attempt == '1'/g)||[]).length,2);assert.equal((y.match(/github\.ref == 'refs\/heads\/main'/g)||[]).length,2);assert.equal((y.match(/environment: afw-qa-cloud-closed-rollback/g)||[]).length,2);assert.equal((y.match(/timeout-minutes: 10/g)||[]).length,2);assert.equal((y.match(/run: node scripts\/run-qa-cloud-closed-rollback\.mjs/g)||[]).length,2);
 assert.match(y,/AFW_QA_CLOSED_TOKEN: \$\{\{ secrets\.AFW_QA_CLOSED_TOKEN \}\}/);assert.match(y,/retention-days: 7/);
 const cli=await readFile(new URL('../scripts/run-qa-cloud-closed-rollback.mjs',import.meta.url),'utf8');
 assert.match(cli,/parseQaCloudClosedInvocation/);assert.match(cli,/createQaCloudClosedHttpAdapters/);assert.match(cli,/createPrivateQaCloudClosedRollback/);assert.doesNotMatch(cli,/console\.error|console\.log|execSync|spawn|retry|fetch\(/);
});
