/** Choose a review action from saved context; never infer publication or a required AF level. */
/** @param {{actions?:Array<{id:string,state:string}>,control?:string,unsaved?:boolean,missingBasicCount?:number}} input */
export function observationNextStep({actions=[],control='unknown',unsaved=false,missingBasicCount=0}={}){
 if(unsaved)return {kind:'save_draft',target:'dossier-save'};
 if(missingBasicCount>0)return {kind:'complete_basics',target:'dossier-assistant'};
 if(control==='unknown')return {kind:'clarify_control',target:'dossier-control'};
 if(control==='provider')return {kind:'coordinate_provider',target:'dossier-control'};
 if(control==='none')return {kind:'request_access',target:'dossier-control'};
 const next=actions.find(action=>action.state!=='detected');
 return next?{kind:'review_action',target:'dossier-capsule',actionId:next.id}:{kind:'choose_goal',target:'dossier-goals'};
}
