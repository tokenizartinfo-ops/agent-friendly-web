export const GUIDE_QUESTION_FIELDS=Object.freeze(['organization','website','siteType','goals','audience','languages','cms','hosting']);
const present=value=>Array.isArray(value)?value.length>0:typeof value==='string'&&value.trim().length>0;

/** Private navigation preference: field names only, never answers or permission. */
export function normalizeDeferredQuestions(value,draft={}){
 if(!Array.isArray(value)||value.length>GUIDE_QUESTION_FIELDS.length||value.some(field=>typeof field!=='string'))return [];
 return [...new Set(value)].filter(field=>GUIDE_QUESTION_FIELDS.includes(field)&&!present(draft[field]));
}
