import {createHash} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
// Build literals only. The compiler imports this module in QA, never canary.
// No HTTP/RPC output, registration, env override, caller bytes or authority.
const compiled=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;
const revision=globalThis.__AFW_QA_SOURCE_REVISION__??'';
const tree=globalThis.__AFW_FINITE_SOURCE_TREE__??'';
const program=globalThis.__AFW_NODE_PROGRAM__??'';
const LIMIT=2097152,COMPRESSED_LIMIT=LIMIT+1024;
const fail=()=>{throw Error('Finite candidate residency unavailable');};
const hash=v=>createHash('sha256').update(v).digest('hex');
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
}
function decode(value){
 try{
  const e=fields(value,['purpose','encoding','sourceRevision','sourceTree','sourceCheck','programHash','module','compressedSha256','compressedBytes','content']);
  const m=fields(e.module,['name','sha256','bytes']);
  if(e.purpose!=='afw.finite-candidate-residency.v1'||e.encoding!=='gzip-base64.v1'||e.sourceCheck!=='git-inputs-before-after-v1'||!hex(revision,40)||!hex(tree,40)||e.sourceRevision!==revision||e.sourceTree!==tree||!hex(e.programHash,64)||typeof program!=='string'||!program.length||Buffer.byteLength(program)>LIMIT||hash(program)!==e.programHash||m.name!=='index.mjs'||!hex(m.sha256,64)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>LIMIT||!hex(e.compressedSha256,64)||!Number.isSafeInteger(e.compressedBytes)||e.compressedBytes<1||e.compressedBytes>COMPRESSED_LIMIT||typeof e.content!=='string'||e.content.length!==4*Math.ceil(e.compressedBytes/3)||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e.content))fail();
  const compressed=Buffer.from(e.content,'base64');
  if(compressed.length!==e.compressedBytes||compressed.toString('base64')!==e.content||hash(compressed)!==e.compressedSha256)fail();
  const bytes=gunzipSync(compressed,{maxOutputLength:LIMIT});
  if(bytes.length!==m.bytes||hash(bytes)!==m.sha256||!Buffer.from(new TextDecoder('utf-8',{fatal:true}).decode(bytes)).equals(bytes))fail();
  // Exact compiler encoding: rejects concatenated members, trailing bytes,
  // optional gzip metadata and alternate encodings even if decoded bytes match.
  if(!gzipSync(bytes,{level:9,mtime:0}).equals(compressed))fail();
  return Object.freeze({module:Object.freeze(m),programHash:e.programHash,sourceRevision:e.sourceRevision,sourceTree:e.sourceTree,sourceCheck:e.sourceCheck,bytes});
 }catch{fail();}
}
// Eager validation keeps the actual QA-only emitted dependency/residency real.
// An ordinary source import without compiler material remains closed.
const resident=compiled===null?null:decode(compiled);
/** Private in-process byte custody only; this does not qualify runtime/source
 * authority, original Q, current pointers, historical inputs or complete package. */
export function readPrivateQaFiniteCandidate(...args){
 if(args.length||!resident)fail();
 return Object.freeze({...resident,bytes:new Uint8Array(resident.bytes)});
}
