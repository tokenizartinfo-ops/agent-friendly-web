import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {execFileSync,spawnSync} from 'node:child_process';
import vm from 'node:vm';
try{
 const e=process.env,sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 for(const key of ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE'])assert.equal(e[key],undefined);assert.equal(process.versions.node,'22.23.4');assert.equal(e.GITHUB_JOB,'readonly');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');
 const git=(...a)=>execFileSync('git',a,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim(),sourceTree=git('rev-parse','HEAD^{tree}');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.match(sourceTree,/^[a-f0-9]{40}$/);
 const same='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',wf='.github/workflows/afw-finite-budget-qualification.yml',bytes=fs.readFileSync(same),workflow=fs.readFileSync(wf,'utf8');assert.equal(blob(bytes),git('rev-parse','HEAD:'+same));assert.equal(blob(Buffer.from(workflow)),git('rev-parse','HEAD:'+wf));assert(bytes.length<=2600000);
 const moduleLines=workflow.split('\n').filter(x=>x.startsWith('          _r3_module='));assert.equal(moduleLines.length,1);const p=JSON.parse(moduleLines[0].slice('          _r3_module='.length));assert.equal(p.cap,65536);const zipped=Buffer.from(p.data,'base64');assert.equal(zipped.toString('base64'),p.data);assert.equal(zipped.length,p.zipBytes);assert.equal(sha(zipped),p.zipSha256);const raw=gunzipSync(zipped,{maxOutputLength:65536});assert.equal(raw.length,p.bytes);assert.equal(sha(raw),p.sha256);const program=raw.toString('utf8');
 const begin=program.indexOf(' const text=new TextDecoder'),end=program.indexOf(' assert.equal(fs.realpathSync(e.RUNNER_TEMP)');assert(begin>0&&end>begin);const region=program.slice(begin,end),prefix=bytes.subarray(0,2260109);
 const built=vm.runInNewContext('(function(){'+region+';return{payload,expected,v2,derived:v2Derived};})()',{assert,Buffer,TextDecoder,gunzipSync,bytes,prefix,sha,blob},{timeout:5000});
 assert.equal(built.v2.pins.policy.sha256,'91277fb4b570ce9f18d49e8c16fe6d48b556b8bb89781de81bcde97cae8b31ac');assert.equal(built.v2.pins.schema.sha256,'860b21333ac3195ca89dce08fa7f6dbaee73e0f81d91b0381ad2b9a9665d483c');assert.equal(built.v2.pins.driver.sha256,'d773dbda3d55624dbfc2cfe68b705015efc20bc4601c8e0d585583a3e9db8182');
 vm.runInNewContext(built.v2.preflight,{...built,assert,Buffer,process,fs,sha,blob,program,e,sourceTree,vm,execFileSync,spawnSync},{timeout:20000});
}catch{process.exitCode=1;}
