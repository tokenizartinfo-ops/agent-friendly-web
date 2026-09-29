'use client';
import {useEffect,useRef,useState} from 'react';
import {missingIntakeQuestions,previewIntakeAnswer} from '../../lib/intake-question-coach.mjs';
import {QUESTION_COPY} from '../../lib/intake-question-copy.mjs';
import {applyIntakeDraft} from '../../lib/intake-draft-review.mjs';
import {languageChoices} from '../../lib/intake-choice-compatibility.mjs';
import './intake-question-coach.css';
import {scopeQuestionGuide,SCOPE_QUESTION_COPY} from '../../lib/scope-question-guide.mjs';
import type {ReviewedScope} from './scope-import';
type Locale='es'|'en'|'pt';
type Draft=Record<string,string|string[]>;
type Field=keyof typeof QUESTION_COPY.es.fields;
type Change={field:string;before?:string|string[];after:string|string[]};
type CachedAnswer={text:string;languages:string[]};
export function IntakeQuestionCoach({draft,locale,onApply,reviewedScope=null}:{draft:Draft;locale:Locale;reviewedScope?:ReviewedScope;onApply:(draft:Draft)=>void}) {
 const [deferred,setDeferred]=useState<string[]>([]);
 const [answers,setAnswers]=useState<Record<string,CachedAnswer>>({});
 const guide=scopeQuestionGuide(draft,reviewedScope,locale);
 const scopeCopy=SCOPE_QUESTION_COPY[locale];
 const [message,setMessage]=useState('');
 const region=useRef<HTMLElement>(null);
 const moveFocus=useRef(false);
 const copy=QUESTION_COPY[locale];
 const missing=missingIntakeQuestions(draft);
 const field=missingIntakeQuestions(draft,deferred,guide?.order)[0] as Field|undefined;
 const pending=deferred.filter(item=>missing.includes(item));
 useEffect(()=>{if(moveFocus.current){region.current?.querySelector<HTMLElement>('.coach-question h3,.coach-done')?.focus();moveFocus.current=false;}},[field]);
 return <section ref={region} className="intake-question-coach" aria-labelledby="question-coach-title">
  <h2 id="question-coach-title">{copy.title}</h2><p>{copy.intro}</p>
  {guide?<aside className="coach-scope" aria-label={scopeCopy.title}><strong>{scopeCopy.title}</strong><p>{scopeCopy.intro}</p><ul>{guide.actions.map(action=><li key={action}>{action}</li>)}</ul><p>{scopeCopy.limit}</p></aside>:null}
  {field?<Answer key={field} cached={answers[field]} reason={guide?.reasons[field]} onRemember={value=>setAnswers(current=>({...current,[field]:value}))} field={field} draft={draft} locale={locale} onApply={next=>{moveFocus.current=true;onApply(next);setAnswers(current=>({...current,[field]:{text:"",languages:[]}}));setMessage(copy.applied);}} onSkip={()=>{moveFocus.current=true;setDeferred(current=>[...current,field]);setMessage('');}}/>:<p className="coach-done" tabIndex={-1}>{copy.done}</p>}
  {pending.length?<div className="coach-pending"><strong>{copy.pending}</strong><ul>{pending.map(item=><li key={item}>{copy.fields[item as Field][0]}</li>)}</ul><button type="button" onClick={()=>{moveFocus.current=true;setDeferred([]);setMessage('');}}>{copy.resume}</button></div>:null}
  <p role="status">{message}</p><p>{copy.local}</p>
 </section>;
}
function Answer({field,draft,locale,onApply,onSkip,cached,onRemember,reason}:{field:Field;draft:Draft;locale:Locale;cached?:CachedAnswer;onRemember:(value:CachedAnswer)=>void;reason?:string;onApply:(draft:Draft)=>void;onSkip:()=>void}) {
 const [answer,setAnswer]=useState(cached?.text||'');
 const [languages,setLanguages]=useState<string[]>(cached?.languages||[]);
 const [changes,setChanges]=useState<Change[]|null>(null);
 const [error,setError]=useState('');
 const copy=QUESTION_COPY[locale];
 function showError(reason:unknown){const key=reason instanceof Error?reason.message:'invalid';setError(copy.errors[key as keyof typeof copy.errors]||copy.errors.stale);}
 const display=(value:string|string[])=>Array.isArray(value)?languageChoices(locale,value).filter(([code])=>value.includes(code)).map(([,label])=>label).join(', '):value;
 return <div className="coach-question" data-field={field}>
  <h3 tabIndex={-1}>{copy.fields[field][1]}</h3><p id="coach-reason">{reason||copy.fields[field][2]}</p>
  {field==='languages'?<fieldset><legend>{copy.answer}</legend>{languageChoices(locale,[]).map(([code,label])=><label className="coach-language" key={code}><input type="checkbox" checked={languages.includes(code)} onChange={()=>{const next=languages.includes(code)?languages.filter(item=>item!==code):[...languages,code];setLanguages(next);onRemember({text:answer,languages:next});setChanges(null);setError('');}}/>{label}</label>)}</fieldset>:<label>{copy.answer}<textarea id="coach-answer" value={answer} aria-describedby="coach-reason" rows={3} onChange={event=>{setAnswer(event.target.value);onRemember({text:event.target.value,languages});setChanges(null);setError('');}}/><small>{answer.length}/1200</small></label>}
  {error?<p role="alert">{error}</p>:null}
  <div className="coach-actions"><button type="button" onClick={()=>{setError('');try{setChanges(previewIntakeAnswer(draft,field,field==='languages'?languages:answer));}catch(reason){setChanges(null);showError(reason);}}}>{copy.review}</button><button type="button" onClick={onSkip}>{copy.skip}</button></div>
  {changes?.length?<div className="coach-preview"><strong>{copy.proposed}</strong><p>{display(changes[0].after)}</p><button type="button" onClick={()=>{try{onApply(applyIntakeDraft(draft,changes));setChanges(null);}catch(reason){setChanges(null);showError(reason);}}}>{copy.apply}</button><button type="button" onClick={()=>setChanges(null)}>{copy.edit}</button></div>:null}
 </div>;
}
