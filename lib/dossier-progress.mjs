import {normalizeIntake} from './intake.mjs';
import {QUESTION_FIELDS,missingIntakeQuestions} from './intake-question-coach.mjs';
import {normalizePublicUrl} from './methodology.mjs';

const present=value=>Array.isArray(value)?value.length>0:Boolean(String(value||'').trim());
const groups=[
 {id:'identity',fields:['role','siteType'],target:'dossier-identity'},
 {id:'goals',fields:['goals'],target:'dossier-goals'},
 {id:'content',fields:['contentSources'],target:'dossier-content'},
 {id:'control',fields:['control'],target:'dossier-control'},
 {id:'resources',fields:['authorizedResources'],target:'dossier-capabilities'},
 {id:'publication',fields:['publicationPreference','crawlerSearchPolicy','crawlerTrainingPolicy'],target:'dossier-publication'},
 {id:'responsibility',fields:['approverName','approverEmail'],target:'dossier-governance'},
];
function basics(value){
 const draft=normalizeIntake(value);
 try{const url=new URL(normalizePublicUrl(draft.website));if(/[\s%]/.test(url.hostname))throw Error('invalid_host');}catch{draft.website='';}
 return {draft,missing:missingIntakeQuestions(draft)};
}
export function dossierDirtyFields(draft,saved){
 const current=normalizeIntake(draft),base=normalizeIntake(saved);
 const fields=Object.keys(current).filter(field=>JSON.stringify(current[field])!==JSON.stringify(base[field]));
 if(String(draft.website||'').trim()&&!current.website&&!fields.includes('website'))fields.push('website');
 return fields;
}
/** Read-only navigation, not validation or authorization for delivery. */
export function dossierProgress({draft={},saved={},loaded=false,projectId='',status='loading',sessionRequired=false,conflict=false,verified=false,verifiedUntil='',now=Date.now()}={}){
 const current=basics(draft),base=basics(saved);
 const normalized=normalizeIntake(draft);
 const changed=dossierDirtyFields(draft,saved);
 const decisions=groups.filter(group=>group.fields.some(field=>!present(normalized[field])||(field==='control'&&normalized[field]==='unknown')));
 let state,target;
 if(sessionRequired){state='session';target='dossier-session';}
 else if(!loaded){state=status==='loading'?'loading':'unavailable';target=null;}
 else if(conflict){state='conflict';target='dossier-conflict';}
 else if(status==='saving'){state='saving';target=null;}
 else if(!current.draft.website){state=String(draft.website||'').trim()?'website':'basics';target=state==='website'?'dossier-website':'dossier-assistant';}
 else if(status==='error'){state='retry';target='dossier-save';}
 else if(changed.length||!projectId){state='unsaved';target='dossier-save';}
 else if(current.missing.length){state='basics';target='dossier-assistant';}
 else if(decisions.length){state='decisions';target=decisions[0].target;}
 else if(!verified || !(Date.parse(verifiedUntil)>now)){state='verification';target='dossier-verification';}
 else{state='delivery';target='dossier-capsule';}
 return {state,target,basicCount:QUESTION_FIELDS.length-current.missing.length,basicTotal:QUESTION_FIELDS.length,savedBasicCount:loaded&&projectId?QUESTION_FIELDS.length-base.missing.length:null,missing:current.missing,changed,decisions:decisions.map(group=>group.id),publicationAuthorized:false};
}
