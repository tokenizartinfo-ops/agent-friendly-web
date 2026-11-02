// SYNTHETIC PRIVATE SOURCE/CUSTODY ONLY. Static esbuild substitution; never runtime evidence.
import {createHash} from 'node:crypto';
import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../../lib/mcp-qa-finite-profile.mjs';
import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
const sha=x=>createHash('sha256').update(x).digest('hex');
const script='export class AfwOwnEventNode {} export class AfwNodeControl {} export default {fetch(){return new Response(null,{status:404})}}';
const descriptor={name:'index.mjs',sha256:sha(script),bytes:Buffer.byteLength(script)};
const freeze=v=>{if(v&&typeof v==='object'&&!(v instanceof Uint8Array)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
export function syntheticPreparation(phase,source){
 const v=structuredClone(finitePublicProfileTemplate('canaryLive'));
 for(const b of v.bindings){
  if(b.privateSlot){delete b.privateSlot;b.text=b.name==='AFW_OAUTH_PILOT_CLIENT_ID'?source.clientId:b.name==='AFW_OAUTH_PILOT_PROJECT_ID'?source.project.projectId:'';}
  if(b.name.endsWith('_ENABLED'))b.text='false';
  if(b.name==='AFW_DELEGATED_OAUTH_ENABLED'&&phase!=='closed_ui')b.text='true';
  if(b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED'&&phase==='notice_consent')b.text='true';
 }
 v.bindings.push({name:'ACCESS_AUD',type:'plain_text',text:source.access.audience},{name:'ACCESS_TEAM_DOMAIN',type:'plain_text',text:source.access.teamDomain},{name:'AFW_OAUTH_PILOT_EXPIRES_AT',type:'plain_text',text:new Date(source.window.expiresAt).toISOString()},{name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'88231',simple:{limit:30,period:60}},{name:'AFW_DOSSIER_MONITORING_OWNER_POLICY',type:'plain_text',text:''});
 v.bindings.sort((a,b)=>a.name<b.name?-1:1);return v;
}
export async function initializeSyntheticConnectionMaterial(ctx){
 const source=await ctx.storage.get('fixture:source'),configuration=syntheticPreparation('closed_ui',source);
 source.initialBaseline={...source.initialBaseline,moduleHash:descriptor.sha256,configurationHash:activationConfigurationHash(configuration),bindingsHash:sha(JSON.stringify(configuration.bindings))};
 await ctx.storage.put('fixture:source',source);
 return {source,configuration,script,module:descriptor,restorationHash:restorationConfigurationHash(configuration)};
}
export async function readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease){
 lease.assertCurrent();
 const source=await ctx.storage.get('fixture:source'),pre=await ctx.storage.get('connection-preparation:'+preconnectionId+':record');
 if(!source||!pre||env.RELEASE_DB===env.DB)throw Error('SYNTHETIC material missing original source');
 const initial=await ctx.storage.get('connection-preparation:'+preconnectionId+':source'),original=JSON.parse(initial).source;
 const baseline={versionId:source.currentPublication.versionId,deploymentId:source.currentPublication.deploymentId,module:descriptor,configuration:syntheticPreparation(source.phase,source)};
 const rollback={versionId:original.initialBaseline.versionId,deploymentId:original.initialBaseline.deploymentId,module:descriptor,configuration:syntheticPreparation('closed_ui',original)};
 const candidateConfiguration=stage==='finite'?structuredClone(finitePublicProfileTemplate('canaryLive')):syntheticPreparation(stage==='connection'?'read_consent':'notice_consent',source);
 for(const b of candidateConfiguration.bindings)if(b.privateSlot){delete b.privateSlot;b.text='SYNTHETIC-PRIVATE-'+b.name;}
 const candidate={sourceRevision:source.sourceRevision,role:stage==='finite'?'canaryLive':'preparation',module:descriptor,configuration:candidateConfiguration,publicStatic:stage==='finite'?finitePublicStaticExpectation('canaryLive'):null};
 const storage=ctx.storage,db=env.RELEASE_DB,core=v=>JSON.stringify(Object.fromEntries(Object.entries(v).filter(([k])=>!['phase','currentPublication'].includes(k))));
 return freeze({ownerSource:source,baseline,rollback,candidate,bytes:{baseline:new TextEncoder().encode(script),rollback:new TextEncoder().encode(script),candidate:new TextEncoder().encode(script)},async assertCurrent(child){
  child.assertCurrent();if(ctx.storage!==storage||env.RELEASE_DB!==db||env.AFW_QA_VERSION?.id!==source.qaVersionId)throw Error('SYNTHETIC custody drift');
  const latest=await storage.get('fixture:source');child.assertCurrent();if(core(latest)!==core(source))throw Error('SYNTHETIC source drift');
 }});
}
