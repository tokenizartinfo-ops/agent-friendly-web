// Native preview of the already qualified e62 public ZIP, in the ephemeral CI runner.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import {mkdir,realpath,stat,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {caseResult,journeyResult,readCapped} from './public-case-v2-acceptance.mjs';

const env=process.env;
assert.equal(env.GITHUB_ACTIONS,'true');
assert.equal(env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
for(const name of ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_API_KEY','CF_API_TOKEN','GH_TOKEN','GITHUB_TOKEN'])assert.ok(!env[name]);
const temp=await realpath(env.RUNNER_TEMP);
const root=await realpath(path.join(temp,'afw-e62-qualified-preview'));
assert.ok(root.startsWith(temp+path.sep));
const entry=path.join(root,'server/index.js'),assets=path.join(root,'client');
assert.ok((await stat(entry)).isFile());
assert.ok((await stat(assets)).isDirectory());
const work=path.join(temp,'afw-e62-preview-runtime');
await mkdir(work,{recursive:true});
const config=path.join(work,'preview.json');
await writeFile(config,JSON.stringify({
 name:'afw-e62-preview-ci',main:entry,compatibility_date:'2026-09-01',
 compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],no_bundle:true,find_additional_modules:true,
 rules:[{type:'ESModule',globs:['**/*.js','**/*.mjs'],fallthrough:true}],
 assets:{directory:assets,binding:'ASSETS',run_worker_first:false,not_found_handling:'none'},
 d1_databases:[{binding:'DB',database_name:'afw-preview-local',database_id:'00000000-0000-4000-8000-000000000528'}],
 dev:{ip:'127.0.0.1',port:8897},
},null,2));
const childEnv={PATH:env.PATH,HOME:env.HOME,TMPDIR:temp,CI:'true',NO_COLOR:'1',
 WRANGLER_SEND_METRICS:'false',XDG_CONFIG_HOME:path.join(work,'empty-cli-config')};
const cli=path.resolve('node_modules/wrangler/bin/wrangler.js');
const child=spawn(process.execPath,[cli,'dev','--local','--config',config,'--ip','127.0.0.1','--port','8897',
 '--no-bundle','--log-level','warn','--persist-to',path.join(work,'state')],{cwd:work,env:childEnv,stdio:['ignore','pipe','pipe']});
child.stdout.resume();child.stderr.resume();
let failed=false;
child.on('error',()=>{failed=true;});
child.on('exit',()=>{failed=true;});
const base='http://127.0.0.1:8897',pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
 const until=Date.now()+45000;let ready=false;
 while(Date.now()<until&&!failed){
  try{const r=await fetch(base+'/',{redirect:'manual',signal:AbortSignal.timeout(2000)});await r.body?.cancel();if(r.status===200){ready=true;break;}}catch{}
  await pause(200);
 }
 assert.ok(ready,'qualified native preview must start');
 for(const [locale,route]of [['es','/preguntas-frecuentes'],['en','/en/frequently-asked-questions'],['pt','/pt/perguntas-frequentes']]){
  const r=await fetch(base+route,{redirect:'manual',signal:AbortSignal.timeout(5000)});
  assert.equal(journeyResult('faq',locale,r.status,await readCapped(r)).ok,true,'FAQ '+locale);
 }
 const r=await fetch(base+'/casos/tokenizart',{redirect:'manual',signal:AbortSignal.timeout(5000)});
 assert.equal(caseResult(r.status,await readCapped(r)).ok,true,'dated case');
 const css=await fetch(base+'/_next/static/css/page.BTbpqG9k.css',{redirect:'manual',signal:AbortSignal.timeout(5000)});
 const bytes=await readCapped(css);assert.equal(css.status,200);assert.equal(bytes.length,5295);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),'886e5720c94e50fa627689cc2a2145a67fbf12837a5038e4f0a1f6dc335366c1');
 console.log(JSON.stringify({kind:'e62_qualified_native_preview',faqLocales:3,casePage:true,
  appRebuilt:false,cloudflareMutations:0,productionAcceptance:false,operationalReadiness:false}));
}finally{
 child.kill('SIGTERM');
}
