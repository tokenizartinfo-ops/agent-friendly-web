import {createHash} from 'node:crypto';
import {materializeMcpPrivatePublication,PRIVATE_PUBLICATION_TARGET} from './mcp-private-publication-template.mjs';
const fail=()=>{throw Error('Public publication snapshot unavailable');};
const exact=(x,keys)=>{if(!x||Object.getPrototypeOf(x)!==Object.prototype||Reflect.ownKeys(x).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(x,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const hash=x=>createHash('sha256').update(x).digest('hex');
const gitHash=x=>createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0').update(x).digest('hex');
const names=['template.mjs','materializer.mjs','template.json','build.json'];

/** Public code transport only. The caller supplies Git/source pins independently
 * and may persist these entries only in the existing public AFW repository. */
export async function createMcpPublicPublicationSnapshot(input){
 try{
  exact(input,['files','expectedSourceRevision','expectedSourceTree','expectedMaterializerHash']);
  const {files:provided,expectedSourceRevision,expectedSourceTree,expectedMaterializerHash}=input;
  exact(provided,names);
  const files=Object.freeze({...provided});
  if(!hex(expectedSourceRevision,40)||!hex(expectedSourceTree,40)||!hex(expectedMaterializerHash,64))fail();
  for(const name of names){
   const cap=name==='template.mjs'?2097152:name==='materializer.mjs'?65536:16384;
   if(typeof files[name]!=='string'||Buffer.byteLength(files[name])>cap)fail();
  }
  const m=JSON.parse(files['template.json']),r=JSON.parse(files['build.json']);
  exact(r,['operatorSourceRevision','operatorSourceTree','artifactSourceRevision','artifactSourceTree','artifactKey','workerHash','programHash','templateHash','templateBytes','materializerHash','materializerBytes','materialized','realPolicyAccepted','remotePublished','invoked','operationalReadiness']);
  if(r.operatorSourceRevision!==expectedSourceRevision||r.artifactSourceRevision!==expectedSourceRevision||
   r.operatorSourceTree!==expectedSourceTree||r.artifactSourceTree!==expectedSourceTree||
   ['materialized','realPolicyAccepted','remotePublished','invoked','operationalReadiness'].some(k=>r[k]!==false)||
   m.artifactSourceRevision!==expectedSourceRevision||m.artifactSourceTree!==expectedSourceTree||
   ['artifactKey','workerHash','programHash','templateHash','templateBytes'].some(k=>r[k]!==m[k])||
   r.materializerHash!==expectedMaterializerHash||hash(files['materializer.mjs'])!==expectedMaterializerHash||
   r.materializerBytes!==Buffer.byteLength(files['materializer.mjs'])||hash(files['template.mjs'])!==r.templateHash)fail();
  const policy={operation:'publish',startAt:0,expiresAt:1,pins:{...PRIVATE_PUBLICATION_TARGET,baseVersionId:'00000000-0000-4000-8000-000000000000'}};
  await materializeMcpPrivatePublication({template:files['template.mjs'],manifest:m,policyJson:JSON.stringify(policy),expectedTemplateHash:r.templateHash});
  const entries=[],add=(path,content)=>entries.push(Object.freeze({path,mode:'100644',type:'blob',content,sha:gitHash(content)}));
  const raw=Buffer.from(files['template.mjs'],'utf8');
  for(let offset=0,index=0;offset<raw.length;offset+=49152,index++){
   add('template-'+String(index).padStart(4,'0')+'.b64',raw.subarray(offset,offset+49152).toString('base64'));
  }
  add('materializer.b64',Buffer.from(files['materializer.mjs'],'utf8').toString('base64'));
  add('template.json',files['template.json']);add('build.json',files['build.json']);
  add('README.md','# AFW public publication template\n\nPublic code and provenance only. Source '+expectedSourceRevision+', tree '+expectedSourceTree+'.\nReassemble numbered template chunks as base64 bytes; materializer.b64 is UTF8 code.\nNo live policy, materialized index, credentials or owner data are included by this build contract.\nThis snapshot is not a deployment, runtime grant, subscription or PC-off acceptance.\nKeep immutable: never update, force or replace this ref.\n');
  const receipt={format:'afw-public-publication-snapshot-v1',sourceRevision:expectedSourceRevision,sourceTree:expectedSourceTree,
   templateHash:r.templateHash,templateBytes:r.templateBytes,materializerHash:r.materializerHash,materializerBytes:r.materializerBytes,
   files:entries.map(e=>({path:e.path,sha:e.sha,bytes:Buffer.byteLength(e.content)})),materialized:false,remotePublished:false,invoked:false,operationalReadiness:false};
  add('preservation.json',JSON.stringify(receipt,null,2)+'\n');
  return Object.freeze({ref:'refs/heads/artifacts/afw-publication-template-'+expectedSourceRevision,entries:Object.freeze(entries),
   sourceRevision:expectedSourceRevision,sourceTree:expectedSourceTree,materialized:false,remotePublished:false});
 }catch{fail();}
}
