import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {projectFinitePublicConfiguration,finitePublicStaticExpectation} from './mcp-qa-finite-profile.mjs';
import {BOOTSTRAP,bootstrapCanonical,bootstrapHash,bootstrapFields,bootstrapFreeze} from './mcp-qa-finite-bootstrap-record.mjs';
const fail=()=>{throw Error('Finite QA bootstrap publication unavailable');};
const ROOT='/accounts/'+BOOTSTRAP.accountId,PATH=ROOT+'/workers/scripts/'+BOOTSTRAP.workerName+'/deployments?per_page=1';
const CONFIG=['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'];
const READONLY=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
/** Narrow QA-role comparison. Only issuer's actual compiler supplies staging.
 * No full-package qualification is called or bypassed; no authority returned. */
export async function readFiniteQaBootstrapPublication({staging,request,check}){
 check();if(staging?.purpose!=='afw.finite-native-compiler-staging.v1'||staging.sourceCheck!==BOOTSTRAP.sourceCheck||staging.completePackage!==false||staging.operationalReadiness!==false)fail();
 const d=staging.modules?.qaLive,bytes=staging.files?.['qaLive/index.mjs'];
 if(!(bytes instanceof Uint8Array)||bytes.length!==d?.module?.bytes||bootstrapHash(bytes)!==d.module.sha256||d.provenance?.kind!=='compiled-source.v1'||d.provenance.sourceRevision!==staging.sourceRevision||d.provenance.sourceTree!==staging.sourceTree||bootstrapCanonical(d.publicStatic)!==bootstrapCanonical(finitePublicStaticExpectation('qaLive')))fail();
 const first=finiteQaPointer(await request(PATH));check();
 const v=finiteCfEnvelope((await request(ROOT+'/workers/workers/'+BOOTSTRAP.workerName+'/versions/'+first.versionId+'?include=modules')).value);check();
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Object.keys(v).some(k=>![...CONFIG,...READONLY].includes(k))||v.id!==first.versionId||!Array.isArray(v.urls)||v.urls.length||!Array.isArray(v.modules)||v.modules.length!==1||!Array.isArray(v.bindings))fail();
 // Deny returned secret values before projection or ANY configuration hash.
 for(const b of v.bindings)if(b?.type==='secret_text')bootstrapFields(b,['name','type']);
 const m=bootstrapFields(v.modules[0],['name','content_type','content_base64']);
 if(m.name!==d.module.name||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string'||m.content_base64.length>Math.ceil(d.module.bytes/3)*4)fail();
 const observed=Buffer.from(m.content_base64,'base64');if(observed.toString('base64')!==m.content_base64||observed.length!==bytes.length||bootstrapHash(observed)!==d.module.sha256||!observed.equals(Buffer.from(bytes)))fail();
 new TextDecoder('utf-8',{fatal:true}).decode(observed);
 if(CONFIG.some(k=>!Object.hasOwn(v,k)))fail();
 const configuration=Object.fromEntries(CONFIG.map(k=>[k,v[k]]));
 projectFinitePublicConfiguration({role:'qaLive',metadata:configuration});
 if(bootstrapCanonical(v.exports)!==bootstrapCanonical(d.module.exports))fail();
 const last=await request(PATH);check();if(bootstrapCanonical(finiteQaPointer(last))!==bootstrapCanonical(first))fail();
 return bootstrapFreeze({qaLive:{...first,module:d.module,publicStatic:d.publicStatic},observedAt:last.date});
}
