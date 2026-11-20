import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {qualifyFiniteNativeSourceContext,readFiniteNativeCustody} from './mcp-qa-finite-source-authority.mjs';
const fail=()=>{throw Error('Finite QA publication bridge unavailable');};
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa';
/** Private source composition only. Missing separately approved native custody
 * or 4C native context keeps this unavailable. No caller success/pins accepted.
 * Does not replace existing direct canary/operator-byte qualification. */
export async function readFiniteQaPublicationBridge(options={}){
 let wire,timer,stop,parent,controller;
 try{
  if(!options||Object.keys(options).some(k=>!['ctx','env','intentId','sourceRevision','fetchImpl','now','signal'].includes(k)))fail();
  const {ctx,env,intentId,sourceRevision,fetchImpl=fetch,now=Date.now}=options;
  parent=options.signal;if(!(parent instanceof AbortSignal))fail();controller=new AbortController();stop=()=>controller.abort();parent.addEventListener('abort',stop,{once:true});if(parent.aborted)stop();timer=setTimeout(stop,5000);const signal=controller.signal;
  const capture=()=>{
   const {id:actor,storage}=ctx;
   const {AFW_QA_VERSION:metadata,AFW_INDEPENDENT_CLOSURE:qa,RELEASE_DB:db,
    AFW_RELEASE_EVENTS_NODE:node,AFW_MCP_CLOSURE_READ_TOKEN:credential}=env;
   return {actor,actorId:actor.toString(),actorString:actor.toString,storage,transaction:storage.transaction,
    metadata,version:metadata.id,qa,qaName:qa.idFromName,db,session:db.withSession,
    node,nodeName:node.idFromName,credential};
  };
  const began=now(),mono=performance.now();
  qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision});
  const native=capture(),{version,credential}=native;
  if(native.qa===native.node||[native.actorString,native.transaction,native.qaName,native.session,native.nodeName]
   .some(method=>typeof method!=='function'))fail();
  let last=began;
  const check=()=>{
   const at=now();
   if(signal.aborted||options.signal!==parent||options.ctx!==ctx||options.env!==env||
      options.intentId!==intentId||options.sourceRevision!==sourceRevision||!Number.isSafeInteger(at)||
      at<last||at-began>=5000||performance.now()-mono>=5000)fail();
   const current=capture();
   if(Object.keys(native).some(key=>current[key]!==native[key]))fail();
   last=at;qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision});
  };
  check();const custody=readFiniteNativeCustody();check();
  // The native identity must be independently source-qualified, never GHA9db.
  if(!custody||custody.id==='9db7901af95faf07e6f7ef378045328e'||custody.tokenKind!=='account')fail();
  wire=finiteSeedWire({fetchImpl,now,signal,credential,origin:'https://api.cloudflare.com/client/v4',check,limit:1048576,requests:3});
  const verified=finiteCfEnvelope((await wire.request(ROOT+'/tokens/verify')).value);check();
  if(!verified||Object.keys(verified).some(k=>!['id','status','expires_on','not_before'].includes(k))||verified.id!==custody.id||verified.status!=='active'||!Number.isSafeInteger(custody.expiresAt)||Date.parse(verified.expires_on)!==custody.expiresAt||custody.expiresAt<=now()||verified.not_before!=null&&(!Number.isSafeInteger(Date.parse(verified.not_before))||Date.parse(verified.not_before)>now()))fail();
  const path=ROOT+'/workers/scripts/'+QA+'/deployments?per_page=1',before=finiteQaPointer(await wire.request(path));check();
  if(before.versionId!==version)fail();
  const material=await readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl,now,signal});check();
  const pub=material.seed.qaPublication;
  if(pub.qaLive.versionId!==version||pub.qaLive.deploymentId!==before.deploymentId||custody.expiresAt<material.primaryEvidence.R1)fail();
  // This fixed source check must bind the actual native actor/bindings/profile
  // to the same-role manifest; a metadata UUID match is insufficient.
  qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed:material.seed});check();
  const after=finiteQaPointer(await wire.request(path));check();
  if(after.versionId!==before.versionId||after.deploymentId!==before.deploymentId)fail();
  return Object.freeze({...material,qaPublicationBridgeVerified:true,qaCodeProvenanceVerified:false,scopeVerified:false,operationalReadiness:false});
 }catch{fail();}finally{wire?.close();clearTimeout(timer);parent?.removeEventListener('abort',stop);controller?.abort();}
}
