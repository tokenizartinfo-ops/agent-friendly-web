import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
const fail=()=>{throw Error('Finite child primary unavailable');};
const KINDS=['reservation','admission','launch'];
/** Fixed server evidence, never request-supplied exclusions. Each complete
 * inventory writer must match one exact native journal record, and vice versa.
 * Global counts remain factual; only the computed OTHER set is empty. */
export function validateFiniteChildPrimary({control,value,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,x=fields(value,['purpose','primary','nativeJournal','writers']);
 if(x.purpose!=='afw.qa-finite-child-primary.v1'||!Array.isArray(x.writers)||x.writers.length>3)fail();
 const g=fields(x.nativeJournal,['status','identity','identityHash','sealed','seal','sealHash','writers','unresolvedWriters','launchNeverIssued','authorizesEffects','operationalReadiness']);
 const identity=finiteAdmissionIdentity(c),identityHash=hash({purpose:'afw.own-finite-admission.v1',identity});
 if(g.status!=='observed'||!same(g.identity,identity)||g.identityHash!==identityHash||g.sealed!==false||g.seal!==null||g.sealHash!==null||g.authorizesEffects!==false||g.operationalReadiness!==false)fail();fields(g.writers,KINDS);
 const owned=[];for(const kind of KINDS){
  const record=g.writers[kind];if(record===null)continue;fields(record,['claim','settlement']);
  const q=fields(record.claim,['purpose','identityHash','kind','issuedAt','deadline']);
  if(q.purpose!=='afw.own-finite-admission.v1:writer'||q.identityHash!==identityHash||q.kind!==kind||!time(q.issuedAt)||q.issuedAt<p.T0||q.issuedAt>=Math.min(p.N1,p.selectors.expiresAt)||q.issuedAt>now()||q.deadline!==p.N1)fail();
  if(record.settlement!==null){const r=fields(record.settlement,['purpose','identityHash','kind','claimHash','primaryRowHash','settledAt']);if(r.purpose!=='afw.own-finite-admission.v1:settled'||r.identityHash!==identityHash||r.kind!==kind||r.claimHash!==hash(q)||!(/^[a-f0-9]{64}$/).test(r.primaryRowHash)||!time(r.settledAt)||r.settledAt<q.issuedAt||r.settledAt>now())fail();}
  owned.push({intentId:p.intentId,controlHash:c.controlHash,actorId:p.resources.containerId,kind,claimHash:hash(q),phase:record.settlement===null?'issued':'settled'});
 }
 const seen=new Set();for(const writer of x.writers){
  const w=fields(writer,['intentId','controlHash','actorId','kind','claimHash','phase','current','newScope','unresolved']);
  if(seen.has(w.kind)||['current','newScope','unresolved'].some(k=>typeof w[k]!=='boolean')||!owned.some(o=>Object.keys(o).every(k=>o[k]===w[k])))fail();seen.add(w.kind);
 }
 if(seen.size!==owned.length||g.unresolvedWriters!==owned.filter(x=>x.phase==='issued').length||g.launchNeverIssued!==(g.writers.launch===null))fail();
 const q=x.primary?.quiescence;
 if(!q||q.completeInventory!==true||q.currentWriters!==x.writers.filter(w=>w.current).length||q.newScopeWriters!==x.writers.filter(w=>w.newScope).length||q.unresolvedWrites!==x.writers.filter(w=>w.unresolved).length||q.inventoryHash!==hash(x.writers)||q.receiptsHash!==hash(g))fail();
 return Object.freeze({primary:x.primary,ownedWriters:Object.freeze(owned)});
}
