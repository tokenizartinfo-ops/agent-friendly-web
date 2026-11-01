import {decodeFiniteMaterialSeed} from './mcp-qa-finite-seed.mjs';
import {finiteSeedWire} from './mcp-qa-finite-seed-wire.mjs';
import {readFiniteSeedPrimary,qualifyFiniteSeedLineage} from './mcp-qa-finite-seed-primary.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
const fail=()=>{throw Error('Finite material seed unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
/** Public immutable technical seed, never an authorization or fresh-ready cache.
 * Fixed anonymous GET only, 11 requests maximum under the original 5s lease. */
export async function readFiniteMaterialSeed(options={}){
 let wire;
 try{
  if(!options||Object.keys(options).some(k=>!['intentId','sourceRevision','fetchImpl','now','signal'].includes(k)))fail();
  const {intentId,sourceRevision,fetchImpl=fetch,now=Date.now,signal=new AbortController().signal}=options;
  if(!hex(intentId,64)||!hex(sourceRevision,40))fail();
  wire=finiteSeedWire({fetchImpl,now,signal,origin:GH});
  const get=async path=>(await wire.request(path)).value;
  const ref=await get('/git/ref/tags/afw-finite-observer-create/'+intentId);
  if(ref.ref!=='refs/tags/afw-finite-observer-create/'+intentId||ref.object?.type!=='tag'||!hex(ref.object.sha,40))fail();
  const tagSha=ref.object.sha,tag=await get('/git/tags/'+tagSha);
  if(tag.sha!==tagSha||tag.tag!=='afw-finite-observer-seed-'+intentId||tag.object?.type!=='commit'||tag.object.sha!==sourceRevision)fail();
  const {seed,seedHash}=decodeFiniteMaterialSeed(tag.message);
  if(seed.intentId!==intentId||seed.sourceRevision!==sourceRevision)fail();
  const primary=await readFiniteSeedPrimary({get,seed,phase:'reader',now}),lineage=await qualifyFiniteSeedLineage({get,seed,now});
  wire.assert();
  return Object.freeze({seed,seedHash,tagSha,primaryEvidence:Object.freeze({...primary,...lineage})});
 }catch{fail();}finally{wire?.close();}
}
