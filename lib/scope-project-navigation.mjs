import {previewScanScope} from './scan-scope-transfer.mjs';

/** A dossier link may carry the reference only for the same canonical origin. */
export function canCarryScopeToProject(scopeText,projectWebsite){
 try{return previewScanScope(scopeText,projectWebsite).websiteMatches===true;}catch{return false;}
}
