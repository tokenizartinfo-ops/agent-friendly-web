import {createHash} from 'node:crypto';
import {materializeMcpPrivateConfirmation} from './mcp-private-confirmation-template.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const fail=()=>{throw Error('Public named template snapshot unavailable');};
const exact=(x,keys)=>{if(!x||Object.getPrototypeOf(x)!==Object.prototype||Reflect.ownKeys(x).length!==keys.length||keys.some(k=>{const d=Object.getOwnPropertyDescriptor(x,k);return !d?.enumerable||!Object.hasOwn(d,'value');}))fail();};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const hash=x=>createHash('sha256').update(x).digest('hex');
const gitHash=x=>createHash('sha1').update('blob '+Buffer.byteLength(x)+'\0').update(x).digest('hex');
const names=['template.mjs','materializer.mjs','template.json','private-template-build.json'];
const pinKeys=['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck'];

/** Public transport only. Independent operator Git pins and the accepted frozen
 * receipt are supplied by the trusted build caller, never by artifact code. */
export async function createMcpPublicNamedTemplateSnapshot(input){
 try{
  exact(input,['files','expectedOperatorRevision','expectedOperatorTree','expectedFrozenArtifact','expectedMaterializerHash']);
  const {files:provided,expectedOperatorRevision,expectedOperatorTree,expectedFrozenArtifact:sourcePin,expectedMaterializerHash}=input;
  exact(provided,names);exact(sourcePin,pinKeys);
  const files=Object.freeze({...provided}),pin=Object.freeze({...sourcePin});
  if(!hex(expectedOperatorRevision,40)||!hex(expectedOperatorTree,40)||!hex(expectedMaterializerHash,64)||
   !uuid(pin.baseVersionId)||!hex(pin.sourceRevision,40)||!hex(pin.sourceTree,40)||
   !['artifactKey','programHash','workerHash'].every(k=>hex(pin[k],64))||
   !Number.isSafeInteger(pin.workerBytes)||pin.workerBytes<1||pin.workerBytes>2097152||pin.sourceCheck!=='git-inputs-before-after-v1'||
   pin.artifactKey!==hash(JSON.stringify([RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,pin.workerHash])))fail();
  for(const name of names){
   const cap=name==='template.mjs'?2097152:name==='materializer.mjs'?65536:16384;
   if(typeof files[name]!=='string'||Buffer.byteLength(files[name])>cap)fail();
  }
  const m=JSON.parse(files['template.json']),r=JSON.parse(files['private-template-build.json']);
  exact(r,['operatorSourceRevision','operatorSourceTree','templateHash','templateBytes','materializerHash','materializerBytes','artifactJsonHash','artifactJsonBytes','artifactSourceRevision','artifactSourceTree','artifactKey','workerHash','programHash','materialized','realPolicyAccepted','remotePublished','invoked']);
  if(r.operatorSourceRevision!==expectedOperatorRevision||r.operatorSourceTree!==expectedOperatorTree||
   r.artifactSourceRevision!==pin.sourceRevision||r.artifactSourceTree!==pin.sourceTree||
   ['artifactKey','workerHash','programHash'].some(k=>r[k]!==pin[k])||
   ['materialized','realPolicyAccepted','remotePublished','invoked'].some(k=>r[k]!==false)||
   !hex(r.artifactJsonHash,64)||!Number.isSafeInteger(r.artifactJsonBytes)||r.artifactJsonBytes<pin.workerBytes||r.artifactJsonBytes>4194304||
   m.artifactSourceRevision!==pin.sourceRevision||m.artifactSourceTree!==pin.sourceTree||
   ['artifactKey','workerHash','programHash','templateHash','templateBytes'].some(k=>r[k]!==m[k])||
   r.materializerHash!==expectedMaterializerHash||hash(files['materializer.mjs'])!==expectedMaterializerHash||
   r.materializerBytes!==Buffer.byteLength(files['materializer.mjs'])||hash(files['template.mjs'])!==r.templateHash)fail();
  const policy={operation:'confirm_named',startAt:0,expiresAt:1,plan:{activationKey:'d'.repeat(64),artifactKey:pin.artifactKey,trialId:'e'.repeat(64),configurationHash:'f'.repeat(64),startAt:0,expiresAt:1},
   observation:{versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:RELEASE_TARGET.namespaceId,applicationId:RELEASE_TARGET.namespaceId,configuration:{bindings:[]}}};
  await materializeMcpPrivateConfirmation({template:files['template.mjs'],manifest:m,policyJson:JSON.stringify(policy),expectedTemplateHash:r.templateHash});
  const entries=[],add=(path,content)=>entries.push(Object.freeze({path,mode:'100644',type:'blob',content,sha:gitHash(content)}));
  const raw=Buffer.from(files['template.mjs'],'utf8');
  for(let offset=0,index=0;offset<raw.length;offset+=49152,index++)add('template-'+String(index).padStart(4,'0')+'.b64',raw.subarray(offset,offset+49152).toString('base64'));
  add('materializer.b64',Buffer.from(files['materializer.mjs'],'utf8').toString('base64'));
  add('template.json',files['template.json']);add('private-template-build.json',files['private-template-build.json']);
  add('README.md','# AFW public named confirmation template\n\nOperator source '+expectedOperatorRevision+', tree '+expectedOperatorTree+'.\nHistorical Worker source '+pin.sourceRevision+', tree '+pin.sourceTree+'.\nReassemble numbered base64 chunks as bytes, then decode UTF8. materializer.b64 is public source code.\nThe build contract excludes policy.json, index.mjs and frozen-artifact.json. No live grant or owner data is supplied.\nReceipt artifactJsonHash identifies the historical build output; those bytes are deliberately not part of this snapshot.\nThis is not a deployment, confirmation, native reservation, subscription or PC-off acceptance. Never overwrite this ref.\n');
  const receipt={format:'afw-public-named-template-snapshot-v1',operatorSourceRevision:expectedOperatorRevision,operatorSourceTree:expectedOperatorTree,frozenArtifact:pin,
   templateHash:r.templateHash,templateBytes:r.templateBytes,materializerHash:r.materializerHash,materializerBytes:r.materializerBytes,
   files:entries.map(e=>({path:e.path,sha:e.sha,bytes:Buffer.byteLength(e.content)})),materialized:false,remotePublished:false,invoked:false,operationalReadiness:false};
  add('preservation.json',JSON.stringify(receipt,null,2)+'\n');
  return Object.freeze({ref:'refs/heads/artifacts/afw-named-template-'+expectedOperatorRevision,entries:Object.freeze(entries),
   operatorSourceRevision:expectedOperatorRevision,artifactSourceRevision:pin.sourceRevision,materialized:false,remotePublished:false});
 }catch{fail();}
}
