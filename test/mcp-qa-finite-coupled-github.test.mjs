import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';
import {QA_CLOUD_CLOSED_PINS as pins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import archive from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};

const api=await import('../lib/mcp-qa-finite-http.mjs');
const workflow='.github/workflows/afw-finite-coupled-restore.yml';
const step='Restore exact QA after original owner closure';
const repository={id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'};
const owner={id:290715446,login:'tokenizartinfo-ops',type:'User'};
const root='/repos/'+repository.full_name;
const tagSha='f'.repeat(40);
function fixture(){
 const at=Date.parse('2026-11-19T12:40:00Z'),stamp=new Date(at).toISOString();
 const scope={intentId:'a'.repeat(64),controlHash:'b'.repeat(64),handoffHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),
  restoreFrom:at-10000,restoreBefore:at+170000};
 const key=hash({purpose:'afw.finite-coupled-qa-restore-key.v1',intentId:scope.intentId,controlHash:scope.controlHash,handoffHash:scope.handoffHash});
 const ref='refs/tags/afw-finite-coupled-qa-send/'+key;
 const marker='afw-coupled-qa-restore-'+key,{id:target,configurationHash,module}=pins.qaClosed;
 const record={purpose:'afw.finite-coupled-qa-send.v1',key,intentId:scope.intentId,controlHash:scope.controlHash,
  handoffHash:scope.handoffHash,sourceRevision:scope.sourceRevision,ownerReceiptHash:'1'.repeat(64),preparationHash:'2'.repeat(64),
  liveQa:{versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222'},
  closedQa:{versionId:target,configurationHash,module},archiveSha256:archive.archiveSha256,issuedAt:at,restoreBefore:scope.restoreBefore,annotation:marker,
  requestHash:hash({strategy:'percentage',versions:[{version_id:target,percentage:100}],annotations:{'workers/message':marker}})};
 const source={runId:123,scope};
 const env={GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REPOSITORY:repository.full_name,GITHUB_REPOSITORY_ID:String(repository.id),GITHUB_REF:'refs/heads/main',
  GITHUB_SHA:scope.sourceRevision,GITHUB_RUN_ID:String(source.runId),GITHUB_RUN_ATTEMPT:'1',GITHUB_WORKFLOW_REF:repository.full_name+'/'+workflow+'@refs/heads/main',
  GITHUB_ACTOR:owner.login,GITHUB_ACTOR_ID:String(owner.id),GITHUB_JOB:'restore',GITHUB_ACTION:'coupled_restore_once',
  AFW_COUPLED_RESTORE_ORIGINAL_PID:String(process.pid)};
 const f={source,env,record,events:[],terminalStep:false,branchDrift:false,lostRefAck:false,refExists:false,tag:null};
 const response=(status,value)=>Response.json(value,{status,headers:{date:stamp}});
 const stepStart=new Date(at-1000).toISOString(),started=new Date(at-2000).toISOString();
 const fetchImpl=async(url,init)=>{
  const u=new URL(url);assert.equal(u.hostname,'api.github.com');assert.ok(u.pathname.startsWith(root));assert.equal(init.headers.Authorization,'Bearer SYNTHETIC');
  const path=u.pathname.slice(root.length),method=init.method,body=init.body?JSON.parse(init.body):null;f.events.push({method,path});
  if(method==='GET'&&path==='/git/ref/heads/main')return response(200,{ref:'refs/heads/main',object:{type:'commit',sha:f.branchDrift?'e'.repeat(40):scope.sourceRevision}});
  if(method==='GET'&&path==='/actions/runs/123')return response(200,{id:123,run_attempt:1,actor:owner,triggering_actor:owner,repository,head_repository:repository,
   head_branch:'main',head_sha:scope.sourceRevision,event:'workflow_dispatch',path:workflow,status:'in_progress',created_at:started});
  if(method==='GET'&&path==='/actions/runs/123/attempts/1/jobs')return response(200,{total_count:1,jobs:[{id:456,run_id:123,name:'restore',
   started_at:started,head_sha:scope.sourceRevision,status:'in_progress',steps:[{name:step,number:4,started_at:stepStart,status:f.terminalStep?'completed':'in_progress',conclusion:f.terminalStep?'success':null}]}]});
  if(method==='GET'&&path==='/git/ref/tags/afw-finite-coupled-qa-send/'+key)return f.refExists?response(200,{ref,object:{type:'tag',sha:tagSha}}):response(404,{message:'Not Found'});
  if(method==='GET'&&path==='/git/tags/'+tagSha)return response(200,f.tag);
  if(method==='POST'&&path==='/git/tags'){
   assert.equal(body.message,JSON.stringify(record));
   f.tag={sha:tagSha,tag:body.tag,object:{type:'commit',sha:scope.sourceRevision},message:body.message};
   return response(201,f.tag);
  }
  if(method==='POST'&&path==='/git/refs'){
   assert.deepEqual(body,{ref,sha:tagSha});f.refExists=true;
   if(f.lostRefAck)throw Error('synthetic lost acknowledged ref');
   return response(201,{ref,object:{type:'tag',sha:tagSha}});
  }
  throw Error('unexpected fixture endpoint');
 };
 f.options={scope,runId:source.runId,credential:'SYNTHETIC',runtime:env,fetchImpl,now:()=>at,signal:new AbortController().signal};
 return f;
}
const create=()=>{assert.equal(typeof api.createPrivateQaFiniteCoupledGitHub,'function');return api.createPrivateQaFiniteCoupledGitHub;};

test('the original GitHub job retains a unique annotated send and independently reads its exact record',async()=>{
 const f=fixture(),make=create(),gh=make(f.options);
 const assertCurrent=()=>{},signal=f.options.signal;
 assert.equal(await gh.claimSend(f.record,signal,assertCurrent),'issued');
 assert.deepEqual(await gh.readSend(f.record.key,signal,assertCurrent),f.record);
 assert.equal(await gh.claimSend(f.record,signal,assertCurrent),'existing');
 assert.deepEqual(f.events.filter(x=>x.method==='POST').map(x=>x.path),['/git/tags','/git/refs']);
 const restarted=make({...f.options,runtime:{...f.env,AFW_COUPLED_RESTORE_ORIGINAL_PID:'0'}});
 assert.deepEqual(await restarted.readSend(f.record.key,signal,assertCurrent),f.record);
 assert.equal(await restarted.claimSend(f.record,signal,assertCurrent),'existing');
 assert.equal(f.events.filter(x=>x.method==='POST').length,2);
});

test('a lost GitHub ref ACK never grants the original writer or a retry',async()=>{
 const f=fixture(),make=create();f.lostRefAck=true;
 const assertCurrent=()=>{},signal=f.options.signal;
 assert.equal(await make(f.options).claimSend(f.record,signal,assertCurrent),'uncertain');
 assert.equal(await make(f.options).claimSend(f.record,signal,assertCurrent),'existing');
 assert.equal(f.events.filter(x=>x.method==='POST').length,2);
});
for(const bad of ['terminalStep','branchDrift','childProcess'])test(bad+' cannot acquire an independent QA publication claim',async()=>{
 const f=fixture(),make=create();
 if(bad==='childProcess')f.env.AFW_COUPLED_RESTORE_ORIGINAL_PID='0';else f[bad]=true;
 assert.equal(await make(f.options).claimSend(f.record,f.options.signal,()=>{}),'uncertain');
 assert.ok(f.events.every(x=>x.method==='GET'));
});

test('the GitHub restore entry rejects expired custody before its first remote operation',async()=>{
 const {runFiniteCoupledRestoreJob}=await import('../scripts/run-qa-finite-coupled-restore.mjs');
 const f=fixture(),{scope}=f.source;
 const e={ref:'main',repository,sender:owner,inputs:{intent_id:scope.intentId,control_hash:scope.controlHash,handoff_hash:scope.handoffHash,restore_before:String(scope.restoreBefore)}};
 const runtime={...f.env,AFW_QA_CLOSED_TOKEN:'SYNTHETIC',AFW_R2_BACKUPS_READ_TOKEN:'SYNTHETIC',GITHUB_TOKEN:'SYNTHETIC',GITHUB_EVENT_PATH:'fixture-event.json'};
 let fetches=0,reads=0;
 const result=await runFiniteCoupledRestoreJob({runtime,now:f.options.now,read:async path=>{reads++;assert.equal(path,'fixture-event.json');return Buffer.from(JSON.stringify(e));},
  fetchImpl:async()=>{fetches++;throw Error('unexpected live request');}});
 assert.equal(result.status,'admin_pending');assert.equal(reads,1);assert.equal(fetches,0);
});
