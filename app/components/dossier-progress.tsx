'use client';
import {useEffect,useState} from 'react';
import {dossierProgress} from '../../lib/dossier-progress.mjs';
import {DOSSIER_PROGRESS_COPY} from '../../lib/dossier-progress-copy.mjs';
import {dossierFieldLabels} from '../../lib/dossier-field-labels.mjs';
import './dossier-progress.css';

type Draft=Record<string,string|string[]>;
type Props={draft:Draft;saved:Draft;loaded:boolean;projectId:string;status:string;sessionRequired:boolean;conflict:boolean;verified:boolean;verifiedUntil:string;locale:'es'|'en'|'pt';rehearsal:boolean;onRetryLoad:()=>void};
export function DossierProgress(props:Props){
 const [now,setNow]=useState(()=>Date.now());
 useEffect(()=>{const expiry=Date.parse(props.verifiedUntil);if(!Number.isFinite(expiry))return;const delay=expiry-Date.now();if(delay<=0&&now>=expiry)return;const timer=window.setTimeout(()=>setNow(Date.now()),Math.max(0,Math.min(delay+1,2147483647)));return()=>window.clearTimeout(timer);},[props.verifiedUntil,now]);
 const {locale,rehearsal,onRetryLoad}=props,model=dossierProgress({...props,now}),copy=DOSSIER_PROGRESS_COPY[locale];
 const state=copy.states[model.state as keyof typeof copy.states];
 const labels:Record<string,string>=dossierFieldLabels(locale);
 function navigate(){
  const target=document.getElementById(model.target||'');if(!target)return;
  if(target instanceof HTMLDetailsElement)target.open=true;
  const focus=target.matches('button')?target:target.querySelector<HTMLElement>('.coach-question h3,.coach-done,input:not(:disabled),select:not(:disabled),button:not(:disabled),[tabindex]')||target;
  if(!focus.hasAttribute('tabindex')&&!focus.matches('input,select,button'))focus.setAttribute('tabindex','-1');
  target.scrollIntoView({block:'center',behavior:'auto'});focus.focus({preventScroll:true});
 }
 return <section className="dossier-progress" data-state={model.state} aria-labelledby="dossier-progress-title">
  <h2 id="dossier-progress-title">{copy.title}</h2><p>{copy.intro}</p>
  {props.loaded?<><p className="progress-count">{copy.basic}: <strong data-testid="basic-count">{model.basicCount}/{model.basicTotal}</strong></p>
   <p>{model.savedBasicCount===null?copy.noSaved:<>{copy.saved}: <strong data-testid="saved-basic-count">{model.savedBasicCount}/{model.basicTotal}</strong></>}</p>
   {model.changed.length?<details className="progress-changes"><summary>{copy.changed} ({model.changed.length})</summary><ul>{model.changed.map(field=><li key={field}>{labels[field]||field}</li>)}</ul></details>:null}
   {model.missing.length?<details className="progress-pending"><summary>{copy.pending} ({model.missing.length})</summary><ul>{model.missing.map(field=><li key={field}>{labels[field]}</li>)}</ul></details>:null}
   {model.decisions.length?<details className="progress-decisions"><summary>{copy.decisions} ({model.decisions.length})</summary><ul>{model.decisions.map(group=><li key={group}>{copy.groups[group as keyof typeof copy.groups]}</li>)}</ul></details>:null}
  </>:null}
  <div className="progress-next" aria-live="polite"><h3>{state[0]}</h3><p>{state[1]}</p></div>
  {state[2]?<button type="button" className="progress-action" onClick={model.state==='unavailable'?onRetryLoad:navigate}>{state[2]}</button>:null}
  {!rehearsal&&['session','unavailable'].includes(model.state)?<a href={locale==='en'?'/en/dossier':locale==='pt'?'/pt/dossie':'/expediente'} target="_blank" rel="noopener noreferrer">{copy.signin}</a>:null}
  {rehearsal?<small>{copy.rehearsal}</small>:null}
 </section>;
}
