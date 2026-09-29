'use client';

import {useMemo, useState} from 'react';
import {ArrowRight, Check, Download, FileCheck2} from 'lucide-react';
import {ACTION_PLAN_COPY, buildScanActionPlan, prepareScopeBrief} from '../../lib/scan-action-plan.mjs';
import {localizedPath} from '../../lib/site-i18n.mjs';
import './scan-action-plan.css';
import {exportScanScope} from '../../lib/scan-scope-transfer.mjs';

type Props = {
  scan: {target:string;checkedAt:string;evidence:Record<string,boolean>;limits:string[]};
  locale: 'es'|'en'|'pt';
};
type Signal = {id:string;label:string;state:'detected'|'not_detected'|'unverified'};

export function ScanActionPlan({scan,locale}:Props) {
  const copy=ACTION_PLAN_COPY[locale];
  const plan=useMemo(()=>{
    try { return buildScanActionPlan(scan,locale); } catch { return null; }
  },[scan,locale]);
  const [selected,setSelected]=useState<string[]>([]);
  const [control,setControl]=useState('unknown');
  const [reviewed,setReviewed]=useState(false);
  const [message,setMessage]=useState('');
  if(!plan) return <p role="alert">{copy.exportError}</p>;
  const actions=plan.actions.filter(action=>action.state!=='detected');
  const detected=plan.actions.filter(action=>action.state==='detected');

  function changeSelection(id:string) {
    setSelected(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id]);
    setReviewed(false);
    setMessage('');
  }

  function downloadScope() {
    if(!plan) return;
    try {
      const brief=prepareScopeBrief(plan,{selected,reviewed,control});
      const text=[
        `# ${copy.reviewTitle}`, '', brief.observedUrl,
        `${copy.observation}: ${brief.checkedAt}`, '',
        ...brief.actions.flatMap(action=>[
          `## ${action.title}`, '',
          ...action.signals.map((signal:Signal)=>`- ${signal.label}: ${copy.states[signal.state]}`), '',
          `**${copy.deliverable}:** ${action.deliverable}`,
          `**${copy.self}:** ${action.self}`, `**${copy.assisted}:** ${action.assisted}`, '',
        ]),
        `## ${copy.control}`,copy.controls[control as keyof typeof copy.controls], '',
        `## ${copy.pendingTitle}`, ...brief.pending.map((item:string)=>`- ${item}`), '',
        `## ${copy.capsuleTitle}`,copy.capsuleText,copy.dossierNote,copy.noDossier,'',
        ...brief.scanLimits.map(item=>`- ${item}`), '',
        ...brief.limitations, '',copy.review,
      ].join('\n');
      const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));
      const link=document.createElement('a');
      link.href=url;
      link.download=`afw-scope-${new URL(brief.target).hostname}-${locale}.md`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      setMessage(copy.downloaded);
    } catch { setMessage(copy.exportError); }
  }

  function downloadTransfer() {
    try {
      const text=exportScanScope(scan,{selected,reviewed,control},locale);
      const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
      const link=document.createElement('a');
      link.href=url;link.download=`afw-scope-${new URL(plan!.target).hostname}.json`;
      document.body.appendChild(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage(copy.downloaded);
    } catch {setMessage(copy.exportError);}
  }

  return <section className="scan-action-plan" aria-labelledby="action-plan-title">
    <header>
      <span className="plan-eyebrow"><FileCheck2 size={17} aria-hidden="true"/>{copy.eyebrow}</span>
      <h2 id="action-plan-title">{copy.title}</h2>
      <p>{copy.intro}</p>
      <p className="plan-observation">{plan.observedUrl} · {copy.observation}: <time dateTime={plan.checkedAt}>{new Date(plan.checkedAt).toLocaleString(locale)}</time></p>
    </header>
    <p className="plan-evidence-limit">{copy.evidenceLimit}</p>
    <div className="plan-actions">
      {actions.map((action,index)=><article key={action.id} className="plan-action" data-selected={selected.includes(action.id)}>
        <div className="plan-action-heading"><span className="plan-number">{String(index+1).padStart(2,'0')}</span><h3>{action.title}</h3></div>
        <ul className="plan-signals">{action.signals.map((signal:Signal)=><li key={signal.id}><strong>{signal.label}</strong><span>{copy.states[signal.state]}</span></li>)}</ul>
        <dl>
          <dt>{copy.deliverable}</dt><dd>{action.deliverable}</dd>
          <dt>{copy.self}</dt><dd>{action.self}</dd>
          <dt>{copy.assisted}</dt><dd>{action.assisted}</dd>
        </dl>
        <label className="plan-select"><input type="checkbox" checked={selected.includes(action.id)} onChange={()=>changeSelection(action.id)} aria-label={`${copy.select}: ${action.title}`}/>{copy.select}</label>
      </article>)}
    </div>
    {detected.length>0?<details className="plan-detected"><summary>{copy.detectedTitle} ({detected.length})</summary><p>{copy.detectedNote}</p><ul>{detected.map(action=><li key={action.id}><Check size={16} aria-hidden="true"/>{action.title}</li>)}</ul></details>:null}
    <p className="plan-advanced">{copy.advanced}</p>
    {actions.length>0?<div className="plan-review">
      <h3>{copy.reviewTitle}</h3>
      <p aria-live="polite">{selected.length?`${selected.length} ${selected.length===1?copy.selectedOne:copy.selected}`:copy.empty}</p>
      {selected.length>0?<ul>{plan.actions.filter(action=>selected.includes(action.id)).map(action=><li key={action.id}>{action.title}</li>)}</ul>:null}
      <label className="plan-control" htmlFor="plan-control">{copy.control}</label>
      <select id="plan-control" value={control} onChange={event=>{setControl(event.target.value);setReviewed(false);setMessage('');}}>
        {Object.entries(copy.controls).map(([value,label])=><option key={value} value={value}>{label}</option>)}
      </select>
      <h4>{copy.pendingTitle}</h4><ul>{copy.pending.map(item=><li key={item}>{item}</li>)}</ul>
      <label className="plan-confirm"><input type="checkbox" checked={reviewed} disabled={!selected.length} onChange={event=>{setReviewed(event.target.checked);setMessage('');}}/>{copy.review}</label>
      <button type="button" className="plan-download" disabled={!selected.length||!reviewed} onClick={downloadScope}><Download size={17} aria-hidden="true"/>{copy.download}</button>
      <button type="button" className="plan-download" disabled={!selected.length||!reviewed} onClick={downloadTransfer}><Download size={17} aria-hidden="true"/>{locale==='es'?'Llevar al expediente (.json)':locale==='en'?'Transfer to dossier (.json)':'Levar ao dossiê (.json)'}</button>
      <p role="status">{message}</p>
      <p className="plan-session">{copy.session}</p>
      <div className="plan-capsule">
        <h4>{copy.capsuleTitle}</h4><p>{copy.capsuleText}</p>
        <a href={localizedPath('dossier',locale)||'/expediente'}>{copy.dossier}<ArrowRight size={16} aria-hidden="true"/></a>
        <p>{copy.dossierNote}</p><p>{copy.noDossier}</p>
      </div>
    </div>:null}
    <p className="plan-boundary">{copy.noGuarantee}</p>
  </section>;
}
