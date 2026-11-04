import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {FINITE_INITIAL_CAPSULE_KEY as KEY,decodeFiniteInitialCapsule,sealFiniteInitialCapsule,encodeFiniteInitialCapsule} from './mcp-qa-finite-initial-capsule-records.mjs';
import {decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {decodeFiniteInitialMaterialRecord as materialRecord,initialCanonical as canonical,initialHex as hex,initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {FINITE_INITIAL_CLEANUP_PREFIX as P,FINITE_INITIAL_CLEANUP_KINDS as K,decodeFiniteInitialCleanupRecord as decode,sealFiniteInitialCleanupRecord as seal} from './mcp-qa-finite-initial-cleanup-records.mjs';
// SAME compiler literals as the full QA readers; DATA descriptors only here.
// Keeping their decoder/bootstrap modules out of the shared graph preserves M -> QA acyclicity.
const compiledRevision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
const compiledTree=globalThis.__AFW_FINITE_SOURCE_TREE__??'';
const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;
const fail=()=>{throw Error('Finite initial anchors unavailable');};
function descriptor(){
 if(!hex(compiledRevision,40)||!hex(compiledTree,40))fail();
 const e=fields(compiledResidency,['purpose','encoding','sourceRevision','sourceTree','sourceCheck','programHash','module','compressedSha256','compressedBytes','content']),module=fields(e.module,['name','sha256','bytes']);
 if(e.purpose!=='afw.finite-candidate-residency.v1'||e.encoding!=='gzip-base64.v1'||e.sourceCheck!=='git-inputs-before-after-v1'||e.sourceRevision!==compiledRevision||e.sourceTree!==compiledTree||!hex(e.programHash)||!hex(e.compressedSha256)||!Number.isSafeInteger(e.compressedBytes)||e.compressedBytes<1||e.compressedBytes>2098176||typeof e.content!=='string'||e.content.length!==4*Math.ceil(e.compressedBytes/3)||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e.content)||module.name!=='index.mjs'||!hex(module.sha256)||!Number.isSafeInteger(module.bytes)||module.bytes<1||module.bytes>2097152)fail();
 // This comparison does NOT qualify bytes, custody or primary state. The real
 // transport hashes actual baseline bytes and freshly qualifies its source;
 // the existing QA initial/owner readers retain the full decoder/primary gates.
 return Object.freeze({sourceRevision:compiledRevision,sourceTree:compiledTree,module});
}
/** Fixed factual read only. The caller retains its existing request/alarm scope. */
export async function readPrivateQaFiniteInitialAnchors({ctx,env},originalLease){
 const storage=ctx?.storage,get=storage?.get,list=storage?.list,getAlarm=storage?.getAlarm,transaction=storage?.transaction,sync=storage?.sync;
 const actor=ctx?.id,toString=actor?.toString,ns=env?.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,metadata=env?.AFW_QA_VERSION,qa=metadata?.id,db=env?.RELEASE_DB,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
 if([get,list,getAlarm,transaction,sync,toString,idFromName].some(x=>typeof x!=='function'))fail();
 const actorId=Reflect.apply(toString,actor,[]),resident=descriptor(),expected=resident;
 const guard=()=>{originalLease.assertCurrent();if(originalLease.signal.aborted||ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.getAlarm!==getAlarm||storage.transaction!==transaction||storage.sync!==sync||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||!hex(actorId)||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||Reflect.apply(idFromName,ns,['afw-own-successor-closure-v1']).toString()!==actorId||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.RELEASE_DB!==db||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
 const io=async(method,args)=>{guard();const result=await retain(Reflect.apply(method,storage,args));guard();return result;};
 const anchors=[],read=async k=>{const raw=await io(get,[k]);anchors.push(Object.freeze([k,raw]));return raw;};
 const raw=await read(KEY),capsule=decodeFiniteInitialCapsule(raw);
 if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qa||resident.sourceRevision!==capsule.sourceRevision||resident.sourceTree!==capsule.sourceTree||resident.module.sha256!==capsule.moduleHash)fail();
 const prep='afw.finite-initial-preparation.v1:';
 const entry=decodeFiniteInitialEntry(await read(prep+'entry')),claim=materialRecord('InitialClaim',await read(prep+'once')),selector=materialRecord('InitialSelector',await read(prep+'selector')),materialAck=materialRecord('InitialAck',await read(prep+'ack')),material=materialRecord('InitialMaterial',await read(prep+'material:'+capsule.materialHash));
 const rows=await io(list,[{prefix:P,limit:16}]),records={};
 if(rows.size>Object.keys(K).length)fail();
 for(const [k,v]of rows){const name=k.slice(P.length);if(!Object.hasOwn(K,name))fail();records[name]=decode(K[name],v);anchors.push(Object.freeze([k,v]));}
 const plan=records.plan,state=records.state;
 if(!plan||!state||state.planHash!==plan.recordHash)fail();
 const zero=seal('State',{planHash:plan.recordHash,deliveries:0,status:'pending',nextAt:plan.C0,previousHash:null});
 const rebuilt=sealFiniteInitialCapsule({entry,claim,selector,materialAck,material,plan,state:zero,arm:records['arm-ack'],send:records['activation-send'],activationAck:records['activation-ack'],completion:records['activation-completion'],recordedAt:capsule.recordedAt});
 if(encodeFiniteInitialCapsule(rebuilt)!==raw||plan.moduleHash!==resident.module.sha256||plan.moduleBytes!==resident.module.bytes)fail();
 // Current recovery state is deliberately distinct from the immutable zero-state commitment.
 if(state.nextAt!==(state.status==='complete'||state.deliveries===3?null:plan.C0+state.deliveries*60000)||state.deliveries===0&&canonical(state)!==canonical(zero))fail();
 const alarm=await io(getAlarm,[]);
 guard();return Object.freeze({capsule,entry,claim,selector,materialAck,material,plan,state,zero,records:Object.freeze(records),actorId,alarm,anchors:Object.freeze(anchors)});
}
