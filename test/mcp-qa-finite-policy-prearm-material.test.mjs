import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import test from 'node:test';
import {build} from 'esbuild';
import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
import {finiteActivationConfigurationHash} from '../lib/mcp-activation-observer.mjs';

const sha=body=>createHash('sha256').update(body).digest('hex');
let project;
async function getProject(){
 if(!project){
  const result=await build({
   entryPoints:['lib/mcp-qa-finite-policy-prearm-material.mjs'],bundle:true,write:false,format:'esm',
   platform:'node',external:['node:*'],plugins:[{name:'SYNTHETIC retained-rollback codec only',setup(builder){
    // The historical codec is independently tested against its immutable
    // provider pin. No historical byte fixture is published for this test.
    builder.onLoad({filter:/mcp-qa-finite-initial-upload-records\.mjs$/},()=>({
     contents:"export function decodeFiniteInitialUploadRecord(kind,raw){const value=JSON.parse(raw); if(value.kind!==kind)throw Error('fixture kind'); return value;}",
     loader:'js',
    }));
   }}],
  });
  project=(await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].contents).toString('base64'))).projectFiniteSetupPrearmMaterial;
 }
 return project;
}
function fixture(){
 const h='a'.repeat(64),sourceRevision='b'.repeat(40),sourceTree='c'.repeat(40),qaVersionId='qa-fixed',programHash='d'.repeat(64);
 const candidateBytes=Buffer.from('export default {};'),rollbackBytes=Buffer.from('export default {test:1};');
 const candidateModule={name:'index.mjs',bytes:candidateBytes.length,sha256:sha(candidateBytes)};
 const sourceCheck='git-inputs-before-after-v1',candidate={sourceRevision,sourceTree,programHash,module:candidateModule,sourceCheck,bytes:candidateBytes};
 const native={sourceRevision,qaVersionId,T0:1000};
 const configuration=structuredClone(finitePublicProfileTemplate('canaryLive'));
 for(const binding of configuration.bindings)if(binding.privateSlot){delete binding.privateSlot;binding.text='SYNTHETIC';}
 const receipt={stage:'finite',versionId:'active-prearm',deploymentId:'active-deployment',receiptHash:h,moduleHash:candidateModule.sha256,configurationHash:finiteActivationConfigurationHash(configuration)};
 const project={projectId:'SYNTHETIC',revision:1,synthetic:true};
 const ownerSource={sourceRevision,qaVersionId,actorId:h,phase:'finite_prearm',project,currentPublication:receipt};
 const capsule={capsuleHash:h,preconnectionId:h,qaVersionId,sourceRevision,sourceTree,moduleHash:candidateModule.sha256,activatedVersionId:'initial-M',I0:0,C0:2000};
 const originalContext={artifact:{sourceRevision,sourceTree,programHash,workerHash:candidateModule.sha256,sourceCheck},trialId:h};
 const plan={entryHash:h,manifestHash:h,baselineVersionId:'closed-version',baselineDeploymentId:'closed-deployment'};
 const prefix='afw.finite-initial-upload.v1:'+h+':';
 const rollbackModule={index:0,bytes:rollbackBytes.length,sha256:sha(rollbackBytes)};
 const backupRaw=[
  [prefix+'backup',JSON.stringify({kind:'Backup',recordHash:h,baselineVersionId:plan.baselineVersionId,baselineDeploymentId:plan.baselineDeploymentId,moduleBytes:rollbackBytes.length,moduleHash:sha(rollbackBytes),rawConfiguration:configuration,chunks:[rollbackModule],retainedIds:{preconnectionId:h,trialId:h}})],
  [prefix+'receipt',JSON.stringify({kind:'Receipt',manifestHash:h,uploadedVersionId:capsule.activatedVersionId})],
  [prefix+'chunk:000',JSON.stringify({kind:'Chunk',manifestHash:h,...rollbackModule,content:rollbackBytes.toString('base64')})],
 ];
 const snapshot={capsuleHash:h,preconnectionId:h,anchor:{anchors:{capsule,material:{originalContext},plan,state:{deliveries:0},zero:{deliveries:0},alarm:capsule.C0},backupRaw},
  physical:{pointer:{versionId:receipt.versionId,deploymentId:receipt.deploymentId},currentConfiguration:configuration},installed:{receipt,receipts:[{}, {}, receipt]},
  cleanupScope:{source:h},pendingUsed:false,selected:{binding:null,preparation:{prepId:h,sourceRevision,actorId:h,project,selectedAt:900,commandBy:1100,connection:{noticesHash:h}}},
  preparation:{noticeLink:{sequence:1,eventHash:h}},noticeRows:{events:[{sequence:1}]}};
 return {observed:{ownerSource,snapshot},native,candidate,rollbackBytes};
}
test('prearm material reuses exact expediente, deployment, canary and retained rollback bytes',async()=>{
 const f=fixture(),read=await getProject(),r=read(f.observed,f.native,f.candidate);
 assert.equal(r.originalContext.artifact.script,f.candidate.bytes.toString());
 assert.equal(r.baseline.versionId,'active-prearm');
 assert.equal(r.rollback.versionId,'closed-version');
 assert.deepEqual(Buffer.from(r.bytes.rollback),f.rollbackBytes);
});
const cases={
 'stale expediente':f=>f.observed.snapshot.selected.preparation.project={...f.observed.ownerSource.project,revision:2},
 'foreign notice':f=>f.observed.snapshot.noticeRows.events[0].sequence=2,
 'stale publication':f=>f.observed.snapshot.physical.pointer.versionId='foreign',
 'used selection':f=>f.observed.snapshot.selected.binding={already:true},
 'different native version':f=>f.native.qaVersionId='foreign',
 'changed rollback bytes':f=>{
  const row=f.observed.snapshot.anchor.backupRaw[2],chunk=JSON.parse(row[1]);
  chunk.content=Buffer.from('changed').toString('base64');row[1]=JSON.stringify(chunk);
 },
};
for(const [label,mutate] of Object.entries(cases))test('prearm material rejects '+label,async()=>{
 const f=fixture(),read=await getProject();mutate(f);assert.throws(()=>read(f.observed,f.native,f.candidate));
});
