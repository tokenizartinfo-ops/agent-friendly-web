import {normalizeIntake} from './intake.mjs';
import {dossierDirtyFields} from './dossier-progress.mjs';
import {normalizePublicUrl} from './methodology.mjs';
export const FIRST_RESULT_QUESTION_ORDER=Object.freeze(['website','goals','organization','siteType','audience','languages','cms','hosting']);
const site=value=>{try{return new URL(normalizePublicUrl(value)).origin;}catch{return '';}};

/** Guidance only: reading is always an explicit existing product action. */
export function dossierFirstStep({loaded=false,projectId='',draft={},saved={},sessionRequired=false,conflict=false,saving=false,reading=false,workingPending=false,observationState='loading',observation=null}={}){
 let state='loading',action=null;
 const value=normalizeIntake(draft),stored=normalizeIntake(saved);
 if(sessionRequired)state='session';
 else if(conflict)state='conflict';
 else if(!loaded)state='loading';
 else if(saving||reading)state=saving?'saving':'reading';
 else if(!site(value.website)){state='guide';action='guide';}
 else if(!projectId||workingPending||dossierDirtyFields(value,stored).length){state='save';action='save';}
 else if(!stored.goals.length){state='goal';action='guide';}
 else if(observationState==='failed'){state='read_failed';action='retry_read';}
 else if(observationState!=='ready')state='loading';
 else if(observation&&site(observation.target)===site(stored.website)&&Number.isFinite(Date.parse(observation.checkedAt))){state='observed';action='review';}
 else{state='ready';action='audit';}
 return {state,action,automatic:false,publicationAuthorized:false};
}
