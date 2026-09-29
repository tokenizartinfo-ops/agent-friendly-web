import {previewScanScope} from './scan-scope-transfer.mjs';

/** A dossier link may carry the reference only for the same canonical origin. */
export function canCarryScopeToProject(scopeText,projectWebsite){
 try{return previewScanScope(scopeText,projectWebsite).websiteMatches===true;}catch{return false;}
}

/** Keep known matching dossiers visible before unrelated ones without changing server pagination. */
export function orderProjectsForScope(projects,scopeText){
 if(!scopeText)return [...projects];
 return [...projects].sort((left,right)=>
  Number(canCarryScopeToProject(scopeText,right.website))-
  Number(canCarryScopeToProject(scopeText,left.website)));
}
