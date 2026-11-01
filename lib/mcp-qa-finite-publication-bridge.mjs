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
 let wire;
 try{
  if(!options||Object.keys(options).some(k=>!['ctx','env','intentId','sourceRevision','fetchImpl','now','signal'].includes(k)))fail();
  const {ctx,env,intentId,sourceRevision,fetchImpl=fetch,now=Date.now,signal}=options;
  const version=env?.AFW_QA_VERSION?.id,began=now(),mono=performance.now();let last=began;
  const check=()=>{const at=now();if(signal.aborted||!Number.isSafeInteger(at)||at<last||at-began>=5000||performance.now()-mono>=5000||env.AFW_QA_VERSION?.id!==version)fail();last=at;qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision});};
  check();const custody=readFiniteNativeCustody();check();
  // The native identity must be independently source-qualified, never GHA9db.
  if(!custody||custody.id==='9db7901af95faf07e6f7ef378045328e'||custody.tokenKind!=='account')fail();
  wire=finiteSeedWire({fetchImpl,now,signal,credential:env.AFW_MCP_CLOSURE_READ_TOKEN,origin:'https://api.cloudflare.com/client/v4',check,limit:1048576,requests:3});
  const verified=finiteCfEnvelope((await wire.request(ROOT+'/tokens/verify')).value);check();
  if(verified?.id!==custody.id||verified.status!=='active'||Date.parse(verified.expires_on)!==custody.expiresAt||custody.expiresAt<=now()||verified.not_before!=null&&Date.parse(verified.not_before)>now())fail();
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
 }catch{fail();}finally{wire?.close();}
}
