import {createHash} from 'node:crypto';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {createRetirementEvidenceReader} from './mcp-retirement-evidence.mjs';
import {createRetirementProviderReader} from './mcp-retirement-provider-reader.mjs';
import {createPublicationDeploymentReader} from './mcp-publication-deployment-reader.mjs';
const fail=()=>{throw Error('Private successor unavailable');};
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();for(const k of keys)if(!Object.hasOwn(v,k))fail();return v;};
const names=['AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_SUCCESSOR_POLICY','AFW_DOSSIER_PROVIDER_READ_TOKEN','DB','AFW_DOSSIER_EVENTS_NODE'];
/** Server-only mount. Credentials stay in the Worker; the Node receives none.
 * Original closure bypasses this constructor, never its live release readers. */
export function readOwnSuccessorHost({env,ctx,program,sourceRevision,window,now=Date.now}){
 const namespace=env.AFW_DOSSIER_EVENTS_NODE;
 if(typeof namespace?.idFromName!=='function'||typeof namespace?.idFromString!=='function')fail();
 const candidateId=namespace.idFromName('afw-own-event-first-successor-v1').toString();
 if(!(/^[0-9a-f]{64}$/).test(candidateId)||namespace.idFromString(candidateId).toString()!==candidateId)fail();
 if(env.AFW_DOSSIER_SUCCESSOR_ENABLED!=='true'){
  if(ctx.id.toString()===candidateId||env.AFW_DOSSIER_SUCCESSOR_POLICY)fail();
  return null;
 }
 const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]]))),raw=pins.AFW_DOSSIER_SUCCESSOR_POLICY;
 if(typeof raw!=='string'||raw.length>8192)fail();const p=exact(JSON.parse(raw),['scope','original','candidate','publication']);
 const publication=Object.freeze(exact(p.publication,['artifactKey','workerHash','deploymentId']));
 const resolved=resolveSuccessorPreparation({scope:p.scope,original:p.original,candidate:p.candidate,namespace}),c=resolved.candidate,scope=resolved.manifest.scope,original=resolved.original;
 if(c.containerId!==ctx.id.toString()||c.containerId!==candidateId||c.programHash!==createHash('sha256').update(program).digest('hex')||c.sourceRevision!==sourceRevision||c.startAt!==window.startAt||c.expiresAt!==window.expiresAt||!pins.DB?.withSession||typeof pins.AFW_DOSSIER_PROVIDER_READ_TOKEN!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(pins.AFW_DOSSIER_PROVIDER_READ_TOKEN)||!(/^[0-9a-f]{64}$/).test(publication.artifactKey)||!(/^[0-9a-f]{64}$/).test(publication.workerHash)||!(/^[0-9a-f-]{36}$/).test(publication.deploymentId))fail();
 const id=ctx.id,idFromName=namespace.idFromName,idFromString=namespace.idFromString,get=namespace.get,prepare=pins.DB.prepare,session=pins.DB.withSession;
 const current=()=>{if(!names.every(k=>env[k]===pins[k])||ctx.id!==id||id.toString()!==c.containerId||namespace.idFromName!==idFromName||namespace.idFromString!==idFromString||namespace.get!==get||pins.DB.prepare!==prepare||pins.DB.withSession!==session||namespace.idFromName(resolved.manifest.actorName).toString()!==c.containerId)fail();};current();
 const readCredential=async()=>{current();return pins.AFW_DOSSIER_PROVIDER_READ_TOKEN;};
 const readInstance=createRetirementProviderReader({resources:{accountId:scope.accountId,applicationId:scope.applicationId,containerId:original.containerId},readCredential});
 const retirement=createRetirementEvidenceReader({original,now,readInstance,readCustody:async({signal})=>{current();if(signal.aborted)fail();const originalId=namespace.idFromString(original.containerId);if(originalId.toString()!==original.containerId)fail();const result=await namespace.get(originalId).observeRetired();current();if(signal.aborted)fail();return result;}});
 const candidate=Object.freeze(Object.fromEntries(['trialId','programHash','sourceRevision','startAt','expiresAt','budget'].map(k=>[k,c[k]])));
 const successor=Object.freeze({version:'afw.successor-host.v1',plan:Object.freeze({scope,original,candidate,namespace}),readRetirement:async()=>{current();const r=await retirement.observe();current();return r;},readDeployment:async({signal})=>{current();const reader=await createPublicationDeploymentReader({db:pins.DB,artifactKey:publication.artifactKey,expected:{accountId:scope.accountId,workerName:scope.workerName,sourceRevision,programHash:c.programHash,workerHash:publication.workerHash},deployment:{namespaceId:scope.namespaceId,applicationId:scope.applicationId,deploymentId:publication.deploymentId,scopeHash:c.scopeHash},readCredential,now,signal});current();const r=await reader({signal});current();return r;}});
 return Object.freeze({successor,current});
}
