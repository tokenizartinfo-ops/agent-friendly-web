'use client';
import {CAPSULE_GUIDE_COPY,capsuleGuideState} from '../../lib/capsule-guidance.mjs';
import './capsule-guidance.css';
import {DeliveryAdvisor, type DeliveryScope} from './delivery-advisor';
export function CapsuleGuidance({state,locale,hasCapsule,canRefresh,onRefresh,deliveryScope}:{state:ReturnType<typeof capsuleGuideState>;locale:'es'|'en'|'pt';hasCapsule:boolean;canRefresh:boolean;onRefresh:()=>void;deliveryScope?:DeliveryScope}) {
 const copy=CAPSULE_GUIDE_COPY[locale];
 return <section className="capsule-guidance" aria-labelledby="capsule-guidance-title" data-guide-state={state}>
  <h3 id="capsule-guidance-title">{copy.title}</h3>
  <div aria-live="polite"><strong>{copy.states[state][0]}</strong><p>{copy.states[state][1]}</p></div>
  {hasCapsule?<nav aria-label={copy.title}><a href="#capsule-files-review">{copy.files}</a><a href="#capsule-comparison-review">{copy.compare}</a><a href="#capsule-decisions-review">{copy.decisions}</a></nav>:null}
  <details><summary>{copy.explain}</summary><p>{copy.explanation}</p></details>
  {state==='handoff'?<DeliveryAdvisor key={`${deliveryScope?.projectId||''}:${deliveryScope?.capsuleId||''}:${deliveryScope?.manifestSha256||''}`} locale={locale} scope={deliveryScope}/>:null}
  <p className="capsule-guidance-boundary">{copy.boundary}</p>
  <button type="button" className="secondary-action" disabled={!canRefresh} onClick={onRefresh}>{copy.refresh}</button>
 </section>;
}
