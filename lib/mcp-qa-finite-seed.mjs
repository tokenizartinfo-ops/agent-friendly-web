import {createHash} from 'node:crypto';

// Pure structural codec. Hashes/true assertions establish no runtime authority,
// profile semantics, artifact availability, custody or child-create SEND evidence.
const fail=()=>{throw Error('Finite material unavailable');};
const SEED='afw.finite-material-seed.v1',ENVELOPE='afw.finite-material-seed-envelope.v1';
const MANIFEST='afw.finite-native-package.v1',MANIFEST_DOMAIN='afw.finite-native-manifest.v1';
const ROLES=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
const COMPATIBILITY=['qaClassesPreserved','qaNamespacesPreserved','canaryClassesPreserved','canaryNamespacesPreserved','closedEntrypointsDenied','legacyContainmentQualified'];
const bytes=v=>Buffer.byteLength(v,'utf8');
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const positive=v=>Number.isSafeInteger(v)&&v>0;
const digest=(domain,text)=>createHash('sha256').update(domain+'\n','utf8').update(text,'utf8').digest('hex');
function fields(v,keys){
 if(!v||Array.isArray(v)||typeof v!=='object'||Object.keys(v).length!==keys.length||keys.some(k=>!Object.hasOwn(v,k)))fail();
 return v;
}
// Snapshot own data descriptors without invoking getters/toJSON; bounded before
// schema/canonical processing. Reject exotic prototypes and sparse/extended arrays.
function snapshot(v,depth=0,budget={nodes:0}){
 if(++budget.nodes>2048||depth>12)fail();
 if(v===null||typeof v==='boolean')return v;
 if(typeof v==='number'){if(!Number.isSafeInteger(v))fail();return v;}
 if(typeof v==='string'){if(bytes(v)>32768)fail();return v;}
 if(!v||typeof v!=='object')fail();
 const array=Array.isArray(v);if(Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
 const keys=Reflect.ownKeys(v),out=array?[]:{};
 if(array){if(!Number.isSafeInteger(v.length)||v.length>2048||keys.length!==v.length+1)fail();}
 for(const key of keys){
  if(array&&key==='length')continue;
  if(typeof key!=='string'||['__proto__','prototype','constructor','toJSON'].includes(key))fail();
  if(array&&(!/^(0|[1-9][0-9]*)$/.test(key)||Number(key)>=v.length))fail();
  const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();
  out[key]=snapshot(d.value,depth+1,budget);
 }
 if(array&&out.length!==v.length)fail();return Object.freeze(out);
}
function canonical(v){
 if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';
 if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
 return JSON.stringify(v);
}
function manifestShape(m){
 fields(m,['purpose','sourceRevision','sourceTree','sourceCheck','buildWorkflowHash','modules','compatibility']);
 if(m.purpose!==MANIFEST||!hex(m.sourceRevision,40)||!hex(m.sourceTree,40)||m.sourceCheck!=='git-inputs-and-configuration-before-after-v1'||!hex(m.buildWorkflowHash))fail();
 fields(m.modules,ROLES);
 for(const role of ROLES){
  const d=fields(m.modules[role],['sourceRevision','sourceTree','module','configurationHash','profileHash','bindingsHash']);
  if(!hex(d.sourceRevision,40)||!hex(d.sourceTree,40)||['configurationHash','profileHash','bindingsHash'].some(k=>!hex(d[k])))fail();
  const module=fields(d.module,['name','sha256','bytes','exports']);
  if(module.name!=='index.mjs'||!hex(module.sha256)||!positive(module.bytes)||module.bytes>3145728||!Array.isArray(module.exports)||module.exports.length>128)fail();
  for(let i=0;i<module.exports.length;i++){
   const name=module.exports[i];if(typeof name!=='string'||!/^[A-Za-z_$][A-Za-z0-9_$]{0,127}$/.test(name)||i>0&&module.exports[i-1]>=name)fail();
  }
 }
 fields(m.compatibility,COMPATIBILITY);if(COMPATIBILITY.some(k=>m.compatibility[k]!==true)||bytes(canonical(m))>24576)fail();
 return m;
}
/** Exact five-role structural manifest; historical descriptor pins stay intact. */
export function validateFinitePackageManifest(value){return manifestShape(snapshot(value));}
/** Specific manifest encoding/hash helpers share the codec's private validation. */
export function encodeFinitePackageManifest(value){return canonical(validateFinitePackageManifest(value));}
export function hashFinitePackageManifest(value){return digest(MANIFEST_DOMAIN,encodeFinitePackageManifest(value));}
function seedShape(s){
 fields(s,['purpose','repository','repositoryId','intentId','sourceRevision','commandId','finalizer','build','manifest']);
 if(s.purpose!==SEED||s.repository!=='tokenizartinfo-ops/agent-friendly-web'||s.repositoryId!==1347578006||!hex(s.intentId)||!hex(s.sourceRevision,40)||typeof s.commandId!=='string'||!/^[1-9][0-9]*$/.test(s.commandId))fail();
 const f=fields(s.finalizer,['runId','attempt','jobId','workflowPath','seedStep']);
 if(!positive(f.runId)||!positive(f.jobId)||f.attempt!==1||f.workflowPath!=='.github/workflows/afw-finite-finalizer.yml'||f.seedStep!=='seed-material')fail();
 const b=fields(s.build,['workflowPath','runId','attempt','artifactId','artifactName','artifactDigest','manifestHash']);
 if(b.workflowPath!=='.github/workflows/afw-finite-native-package.yml'||!positive(b.runId)||b.attempt!==1||!positive(b.artifactId)||b.artifactName!=='afw-finite-native-package-'+s.sourceRevision||typeof b.artifactDigest!=='string'||!/^sha256:[a-f0-9]{64}$/.test(b.artifactDigest)||!hex(b.manifestHash))fail();
 const m=manifestShape(s.manifest);
 if(m.sourceRevision!==s.sourceRevision||b.manifestHash!==digest(MANIFEST_DOMAIN,canonical(m)))fail();
 return s;
}
export function encodeFiniteMaterialSeed(seed){
 const s=seedShape(snapshot(seed)),text=canonical({purpose:ENVELOPE,seed:s,seedHash:digest(SEED,canonical(s))});
 if(bytes(text)>32768)fail();return text;
}
export function decodeFiniteMaterialSeed(text){
 if(typeof text!=='string'||bytes(text)>32768)fail();
 let parsed;try{parsed=JSON.parse(text);}catch{fail();}
 const envelope=fields(snapshot(parsed),['purpose','seed','seedHash']);
 if(envelope.purpose!==ENVELOPE||!hex(envelope.seedHash))fail();
 const seed=seedShape(envelope.seed),encoded=encodeFiniteMaterialSeed(seed);
 // Exact canonical equality also rejects duplicate (including escaped duplicate)
 // JSON keys: parsing necessarily loses those bytes, so they cannot roundtrip.
 if(text!==encoded||envelope.seedHash!==digest(SEED,canonical(seed)))fail();
 return Object.freeze({seed,seedHash:envelope.seedHash});
}
