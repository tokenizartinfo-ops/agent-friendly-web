import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {FINITE_PREPARATION_CLEANUP_PREFIX as P,decodeFinitePreparationCleanupRecord as decode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {decodeFinitePreparationRecord as prep} from './mcp-qa-finite-preparation-records.mjs';
import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
const fail=()=>{throw Error('Finite preparation cleanup unavailable');};
/** Factual recovery DATA only; no admission, enrollment writer or readiness. */
export async function readPrivateQaFinitePreparationCleanup(options,originalLease){
 if(arguments.length!==2)fail();const {ctx,env}=fields(options,['ctx','env']);fields(originalLease,['signal','assertCurrent']);const signal=originalLease.signal,assertCurrent=originalLease.assertCurrent;
 const storage=ctx?.storage,get=storage?.get,list=storage?.list,transaction=storage?.transaction,sync=storage?.sync,getAlarm=storage?.getAlarm,actor=ctx?.id,toString=actor?.toString,metadata=env?.AFW_QA_VERSION,qa=metadata?.id,ns=env?.AFW_INDEPENDENT_CLOSURE,idFromName=ns?.idFromName,db=env?.RELEASE_DB,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
 const guard=()=>{assertCurrent();if(originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||signal.aborted||ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.transaction!==transaction||storage.sync!==sync||storage.getAlarm!==getAlarm||ctx.id!==actor||actor.toString!==toString||env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==idFromName||Reflect.apply(toString,actor,[])!==Reflect.apply(idFromName,ns,['afw-own-successor-closure-v1']).toString()||env.AFW_QA_VERSION!==metadata||metadata.id!==qa||env.RELEASE_DB!==db||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();};
 if([get,list,transaction,sync,getAlarm,toString,idFromName].some(x=>typeof x!=='function'))fail();
 const io=async(method,args)=>{guard();const value=await retain(Reflect.apply(method,storage,args));guard();return value;};
 const rows=await io(list,[{prefix:P,limit:3}]);
 if(rows.size===0)return null;
 if(rows.size>2||!rows.has(P+'enrollment')||[...rows.keys()].some(k=>![P+'enrollment',P+'ack'].includes(k)))fail();
 const enrollment=decode('Enrollment',rows.get(P+'enrollment')),ack=rows.has(P+'ack')?decode('Ack',rows.get(P+'ack')):null;
 const a=await retain(readPrivateQaFiniteInitialAnchors({ctx,env},originalLease));guard();
 const c=a.capsule;
 if(await io(get,['afw.qa-finite-trial.v1:head'])!==undefined||(await io(list,[{prefix:'afw.finite-policy-effect.v1:',limit:1}])).size)fail();
 const prefix='connection-preparation:'+c.preconnectionId;
 const read=async(k,kind)=>prep(kind,await io(get,[k]));
 const pre=await read(prefix+':record','Preconnection'),snapshot=await read(prefix+':source','OwnerSourceSnapshot'),stage=await read(prefix+':connection:approval','StageApproval'),approval=await read('connection-approval:'+stage.approvalHash,'ConfigurationApproval');
 const ticket=await read('owner-ticket:'+snapshot.initialTicketHash,'Ticket'),use=await read('owner-ticket:'+snapshot.initialTicketHash+':use','TicketUse'),map=await read('owner-project-ref:'+ticket.projectRef,'ProjectRef');
 const scoped=await io(list,[{prefix:prefix+':',limit:16}]);
 if(scoped.size!==3||[...scoped.keys()].some(k=>![prefix+':record',prefix+':source',prefix+':connection:approval'].includes(k)))fail();
 qualifyFinitePreparationEnrollmentFacts({anchors:a,enrollment,ack,preconnection:pre,sourceSnapshot:snapshot,stageApproval:stage,approval,ticket,ticketUse:use,projectRef:map});
 // Any later permission or nominal effect requires Unit2, never this fallback.
 for(const suffix of ['grant','notice','connection','notices:approval','finite:approval'])if(await io(get,[prefix+':'+suffix])!==undefined)fail();
 for(const [k,v]of rows)if(await io(get,[k])!==v)fail();
 guard();return Object.freeze({enrollment,ack});
}
