import {normalizeIntake} from './intake.mjs';

const fields=Object.keys(normalizeIntake({}));
const lists=new Set(['goals','languages','contentSources','desiredCapabilities','authorizedResources']);
const deliberate=new Set(['role','control','authorizedResources','desiredCapabilities','publicationPreference','crawlerSearchPolicy','crawlerTrainingPolicy','approverName','approverEmail','maintainerName','maintainerEmail','monitoringPreference']);
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const copy=value=>Array.isArray(value)?[...value]:value;
const snapshot=value=>Object.fromEntries(Object.entries(value).map(([field,item])=>[field,copy(item)]));
function valid(field,value){return fields.includes(field)&&(lists.has(field)?Array.isArray(value)&&value.length<=12&&value.every(item=>typeof item==='string'&&item.length<=80):typeof value==='string'&&value.length<=(field==='website'?500:1200));}

/** Separate from assistant proposals: these are manual form edits, reviewed after a 409. */
export function planDossierRebase(base,draft,current,revision){
 if(!Number.isSafeInteger(revision)||revision<1)throw Error('invalid_revision');
 const changes=[],conflicts=[];
 for(const field of new Set([...Object.keys(base),...Object.keys(draft)])){
  if(equal(base[field],draft[field]))continue;
  if(!valid(field,draft[field]))throw Error('invalid_proposal');
  if(equal(draft[field],current[field]))continue;
  if(deliberate.has(field)||!equal(base[field],current[field]))conflicts.push({field,base:copy(base[field]),local:copy(draft[field]),current:copy(current[field]),reason:deliberate.has(field)?'explicit_review':'concurrent_change'});
  else changes.push({field,before:copy(current[field]),after:copy(draft[field])});
 }
 return {contract:'afw.dossier-rebase.v1',revision,snapshot:snapshot(current),changes,conflicts};
}

export function resolveDossierRebase(current,revision,plan,choices){
 if(plan?.contract!=='afw.dossier-rebase.v1'||!Array.isArray(plan.changes)||!Array.isArray(plan.conflicts))throw Error('invalid_plan');
 if(!Number.isSafeInteger(revision)||revision<1||revision!==plan.revision)throw Error('stale_revision');
 if(!equal(current,plan.snapshot))throw Error('stale_snapshot');
 const seen=new Set(),updates=[];
 for(const change of plan.changes){
  if(deliberate.has(change.field))throw Error('explicit_review_required');
  if(seen.has(change.field)||!valid(change.field,change.after))throw Error('invalid_proposal');
  if(!equal(current[change.field],change.before))throw Error('stale_snapshot');
  seen.add(change.field);updates.push([change.field,copy(change.after)]);
 }
 for(const conflict of plan.conflicts){
  if(seen.has(conflict.field)||!valid(conflict.field,conflict.local))throw Error('invalid_proposal');
  if(!equal(current[conflict.field],conflict.current))throw Error('stale_snapshot');
  seen.add(conflict.field);
  if(choices[conflict.field]!=='local'&&choices[conflict.field]!=='current')throw Error('missing_choice');
  if(choices[conflict.field]==='local')updates.push([conflict.field,copy(conflict.local)]);
 }
 return {...snapshot(current),...Object.fromEntries(updates)};
}
