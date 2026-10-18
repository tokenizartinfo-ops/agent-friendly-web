import {GUIDE_QUESTION_FIELDS} from './dossier-guide-continuity.mjs';
import {QUESTION_COPY} from './intake-question-copy.mjs';
import {privateUiCopy} from './private-ui-copy.mjs';
import {goalChoices,languageChoices,languageSelection} from './intake-choice-compatibility.mjs';

/** A private, descriptive review only; no permissions, verification or completion inference. */
export function intakeAnswerReview(draft={},locale='es'){
 const labels=(QUESTION_COPY[locale]||QUESTION_COPY.es).fields,form=privateUiCopy(locale).intake;
 return GUIDE_QUESTION_FIELDS.flatMap(field=>{
  let value=draft[field];
  if(field==='goals'||field==='languages'){
   if(!Array.isArray(value))return [];
   const selected=field==='languages'?languageSelection(value):value.filter(item=>typeof item==='string'&&item.trim());
   const choices=field==='goals'?goalChoices(locale,selected):languageChoices(locale,selected);
   value=selected.map(code=>choices.find(([key])=>key===code)?.[1]||code).join(', ');
  }else if(field==='siteType')value=form.siteTypes.find(([code])=>code===value)?.[1]||value;
  return typeof value==='string'&&value.trim()?[{field,label:labels[field][0],value:value.trim()}]:[];
 });
}
