import {normalizeIntake} from './intake.mjs';
import {normalizePublicUrl} from './methodology.mjs';
const origin=value=>{try{return new URL(normalizePublicUrl(value)).origin;}catch{return '';}};
const present=value=>Array.isArray(value)?value.length>0:typeof value==='string'&&value.trim()!==''&&value!=='unknown';
const dated=(value,now)=>typeof value==='string'&&Number.isFinite(Date.parse(value))&&Date.parse(value)<=now;

/** Metadata only: no dossier values, raw event payloads or certification. */
export function dossierTrustSummary({draft={},saved={},revision=0,fields={},observation=null,now=Date.now()}={}){
 const current=normalizeIntake(draft),stored=normalizeIntake(saved);
 const history=fields&&typeof fields==='object'&&!Array.isArray(fields)?fields:{};
 const items=Object.keys(current).filter(field=>field!=='deferredQuestions'&&present(current[field])).map(field=>{
  const changed=JSON.stringify(current[field])!==JSON.stringify(stored[field]);
  const raw=history[field],valid=raw&&Number.isSafeInteger(raw.revision)&&raw.revision>=1&&raw.revision<=revision&&dated(raw.savedAt,now);
  return {field,kind:changed?'draft':valid&&raw.source==='copilot_reviewed'?'copilot_reviewed':'owner_declared',savedAt:!changed&&valid?raw.savedAt:null};
 });
 const sameOrigin=origin(current.website)&&origin(current.website)===origin(stored.website);
 const reading=observation&&sameOrigin&&origin(observation.target)===origin(stored.website)&&dated(observation.checkedAt,now)
  ? {target:observation.target,checkedAt:observation.checkedAt}:null;
 return {items,observation:reading,declarationsVerified:false};
}
