import {analyzeIntakeNotes} from './intake-assistant.mjs';
import {previewIntakeDraft} from './intake-draft-review.mjs';
import {normalizePublicUrl} from './methodology.mjs';
import {privateUiCopy} from './private-ui-copy.mjs';
export const QUESTION_FIELDS=Object.freeze(['organization','website','siteType','goals','audience','languages','cms','hosting']);
const siteTypes=new Set(privateUiCopy('es').intake.siteTypes.map(([code])=>code));
const goalCodes=new Set(privateUiCopy('es').intake.goals.map(([code])=>code));
const filled=value=>Array.isArray(value)?value.length>0:Boolean(String(value||'').trim());
export function missingIntakeQuestions(draft={},deferred=[],order=QUESTION_FIELDS) {
 const fields=[...new Set([...order.filter(field=>QUESTION_FIELDS.includes(field)),...QUESTION_FIELDS])];
 return fields.filter(field=>!filled(draft[field])&&!deferred.includes(field));
}
export function previewIntakeAnswer(draft,field,answer) {
 if(!QUESTION_FIELDS.includes(field))throw new Error('invalid');
 if(filled(draft[field]))throw new Error('stale');
 let value;
 if(field==='siteType'){
  if(typeof answer!=='string'||!siteTypes.has(answer))throw new Error('invalid');
  value=answer;
 }else if(field==='goals'){
  if(!Array.isArray(answer)||!answer.length||answer.length>12||answer.some(item=>!goalCodes.has(item)))throw new Error('invalid');
  value=[...new Set(answer)];
 }else if(field==='languages'){
  if(!Array.isArray(answer)||!answer.length||answer.some(item=>!['es','en','pt','it','fr'].includes(item)))throw new Error('invalid');
  value=[...new Set(answer)];
 }else{
  if(typeof answer!=='string'||answer.length>1200)throw new Error('invalid');
  value=answer.replace(/[\u0000-\u001f]/g,' ').replace(/\s+/g,' ').trim();
  if(!value)throw new Error('empty');
  const normalized=value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[.!?]+$/,'');
  if(['no se','no lo se','no lo se todavia','no estoy seguro','unknown','i do not know',"i don't know",'not sure','nao sei','ainda nao sei'].includes(normalized))throw new Error('unknown');
  if(analyzeIntakeNotes(value).blocked)throw new Error('sensitive');
  if(field==='website'){
   try{const raw=new URL(/^https?:\/\//i.test(value)?value:`https://${value}`);if(raw.search||raw.hash)throw new Error();value=normalizePublicUrl(value);}catch{throw new Error('website');}
   if(value.length>500)throw new Error('websiteLength');
  }
 }
 return previewIntakeDraft(draft,{blocked:false,suggestions:[{field,value}]},[field]);
}
