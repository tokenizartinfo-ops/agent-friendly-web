'use client';
import {useEffect,useState} from 'react';
import {capsuleOutcome,capsuleOutcomeText,OUTCOME_COPY} from '../../lib/capsule-outcome.mjs';
type Props={capsule:Parameters<typeof capsuleOutcome>[0]['capsule'];comparison?:Parameters<typeof capsuleOutcome>[0]['comparison'];comparisonState:string;history?:Parameters<typeof capsuleOutcome>[0]['history'];locale:'es'|'en'|'pt'};
export function CapsuleOutcome(props:Props){
 const [now,setNow]=useState(()=>Date.now());
 useEffect(()=>{
  const refresh=setTimeout(()=>setNow(Date.now()),0);
  const expiry=Date.parse(props.capsule?.expiresAt||'');
  const timer=Number.isFinite(expiry)&&expiry>Date.now()?setTimeout(()=>setNow(Date.now()),Math.min(expiry-Date.now()+1,2147483647)):null;
  return()=>{clearTimeout(refresh);if(timer!==null)clearTimeout(timer);};
 },[props.capsule,props.comparison,props.comparisonState,props.history]);
 const outcome=capsuleOutcome({...props,now}),copy=OUTCOME_COPY[props.locale];
 if(!outcome)return null;
 function download(){
  const current=capsuleOutcome({...props,now:Date.now()});if(!current)return;
  const url=URL.createObjectURL(new Blob([capsuleOutcomeText(current,props.locale)],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='afw-resumen-v'+outcome.version+'.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <details id="capsule-outcome-review" className="capsule-guidance"><summary>{copy.title}</summary><dl><dt>{copy.proposal}</dt><dd>v{outcome.version} · {outcome.files.length}</dd><dt>{copy.decision}</dt><dd>{copy.decisions[outcome.decision as keyof typeof copy.decisions]}</dd><dt>{copy.reading}</dt><dd>{copy.observations[outcome.observation as keyof typeof copy.observations]}{outcome.observedAt?<> · <time dateTime={outcome.observedAt}>{new Date(outcome.observedAt).toLocaleString(props.locale)}</time></>:null}</dd></dl><p>{copy.actions[outcome.next as keyof typeof copy.actions]}</p><p>{copy.boundary}</p><button type="button" className="secondary-action" onClick={download}>{copy.download}</button></details>;
}
