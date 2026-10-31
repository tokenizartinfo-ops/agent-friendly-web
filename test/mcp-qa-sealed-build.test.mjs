import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const api=()=>import('../scripts/build-private-qa-closed-context.mjs');
test('closed QA configuration requires metadata, fixed class and all activation flags false',async()=>{
 const m=await api(),raw=await readFile('wrangler.independent-closure-qa.jsonc','utf8');
 assert.equal(m.validatePrivateQaClosedConfiguration(raw),true);
 const rollback=await readFile('wrangler.independent-closure-qa.rollback.jsonc','utf8');assert.equal(m.validatePrivateQaClosedConfiguration(rollback,true),true);assert.throws(()=>m.validatePrivateQaClosedConfiguration(rollback),/Closed QA package unavailable/);
 const base=JSON.parse(raw);
 for(const edit of [
 c=>{c.vars.AFW_QA_PRIMARY_ADMISSION_ENABLED='true';},
 c=>{delete c.vars.AFW_QA_ORIGINALS_ENABLED;},
 c=>{delete c.version_metadata;},
 c=>{c.version_metadata.binding='SELF_REPORTED';},
 c=>{c.workflows=c.workflows.filter(w=>w.class_name!=='PrivateQaNamedConfirmation');},
 c=>{c.d1_databases.push({binding:'AFW_QA_DOSSIER_DB',database_id:'foreign'});},
 c=>{c.routes.push({pattern:'https://foreign.invalid/*'});},
 c=>{c.triggers.crons.push('* * * * *');},
 c=>{c.migrations.push({tag:'reset',deleted_classes:['IndependentClosure']});},
 ]){const c=structuredClone(base);edit(c);assert.throws(()=>m.validatePrivateQaClosedConfiguration(JSON.stringify(c)),/Closed QA package unavailable/);}
});
test('sealed QA package verifies its exact source before building',async()=>{
 const m=await api(),revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 await assert.rejects(()=>m.buildPrivateQaClosedContext({cwd:process.cwd(),sourceRevision:'0'.repeat(40)}),/Closed QA package unavailable/);
 await assert.rejects(()=>m.buildPrivateQaClosedContext({cwd:process.cwd(),sourceRevision:revision,entry:'foreign.mjs'}),/Closed QA package unavailable/);
});
