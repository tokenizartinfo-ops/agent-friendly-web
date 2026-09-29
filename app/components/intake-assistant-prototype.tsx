'use client';

import { useMemo, useState } from 'react';
import { Check, Clipboard, FileSearch, ShieldAlert, Sparkles } from 'lucide-react';
import { analyzeIntakeNotes } from '../../lib/intake-assistant.mjs';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';
import { previewIntakeDraft, applyIntakeDraft } from '../../lib/intake-draft-review.mjs';
import { intakeDraftCopy } from '../../lib/intake-draft-copy.mjs';
import type {ReviewedScope} from './scope-import';
import {IntakeQuestionCoach} from './intake-question-coach';

type Suggestion = {
  field: string;
  value: string | string[];
  sourceExcerpt: string;
  confidence: string;
};

type Locale = 'es' | 'en' | 'pt';
type Draft = Record<string, string | string[]>;
type Change = { field: string; before?: string | string[]; after: string | string[] };

export function IntakeAssistantPrototype({ locale = 'es', draft, onApply, reviewedScope = null }: { locale?: Locale; draft?: Draft; reviewedScope?: ReviewedScope; onApply?: (draft: Draft) => void } = {}) {
  const copy = publicToolsCopy(locale).intake;
  const draftCopy = intakeDraftCopy[locale];
  const guidance = {
    es: {privacy:'Revisar el texto no guarda datos. Vos elegís qué aplicar al borrador y cuándo guardar.',contract:'Primero revisá los cambios propuestos. Después podés aplicarlos al formulario, corregirlos y guardar cuando estés listo.'},
    en: {privacy:'Reviewing the text saves no data. You choose what to apply to the draft and when to save.',contract:'First review the proposed changes. Then apply them to the form, edit them and save when ready.'},
    pt: {privacy:'Revisar o texto não salva dados. Você escolhe o que aplicar ao rascunho e quando salvar.',contract:'Primeiro revise as alterações propostas. Depois aplique ao formulário, corrija e salve quando estiver pronto.'}
  }[locale];
  const [changes, setChanges] = useState<Change[] | null>(null);
  const [draftMessage, setDraftMessage] = useState<'' | 'applied' | 'stale'>('');
  const [notes, setNotes] = useState(draft ? '' : copy.example);
  const [result, setResult] = useState<ReturnType<typeof analyzeIntakeNotes> | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const updateNotes = (value: string) => {
    setNotes(value);
    setResult(null);
    setSelected([]);
    setCopied(false);
    setChanges(null);
    setDraftMessage('');
  };

  const selectedSuggestions = useMemo(() => {
    if (!result) return [];
    return (result.suggestions as Suggestion[]).filter((item) => selected.includes(item.field));
  }, [result, selected]);

  const review = () => {
    const next = analyzeIntakeNotes(notes, locale);
    setResult(next);
    setSelected(next.blocked ? [] : (next.suggestions as Suggestion[]).map((item) => item.field));
    setCopied(false);
    setChanges(null);
    setDraftMessage('');
  };

  const toggle = (field: string) => {
    setSelected((current) => current.includes(field) ? current.filter((item) => item !== field) : [...current, field]);
    setChanges(null);
    setDraftMessage('');
    setCopied(false);
  };

  const applyReviewed = () => {
    if (!draft || !onApply || !changes?.length) return;
    try {
      onApply(applyIntakeDraft(draft, changes));
      setChanges(null);
      setDraftMessage('applied');
    } catch {
      setChanges(null);
      setDraftMessage('stale');
    }
  };
  const display = (value?: string | string[]) => Array.isArray(value) ? value.join(', ') : value || draftCopy.empty;

  const copyReviewed = async () => {
    const payload = Object.fromEntries(selectedSuggestions.map((item) => [item.field, item.value]));
    await navigator.clipboard.writeText(JSON.stringify({ contract: 'intake-assistant-review.v1', proposals: payload }, null, 2));
    setCopied(true);
  };

  return (
    <>
    {draft && onApply ? <IntakeQuestionCoach draft={draft} locale={locale} reviewedScope={reviewedScope} onApply={onApply}/> : null}
    <section className="assistant-prototype">
      <div className="assistant-input-panel">
        <div className="assistant-panel-heading"><Sparkles size={20} /><div><span>{copy.freeContext}</span><h2>{copy.freeTitle}</h2></div></div>
        <label htmlFor="intake-notes">{copy.secretWarning}</label>
        <textarea id="intake-notes" value={notes} onChange={(event) => updateNotes(event.target.value)} rows={9} />
        <button className="primary-action" type="button" onClick={review}><FileSearch size={17} /> {copy.review}</button>
        <p className="assistant-privacy"><ShieldAlert size={16} /> {draft ? guidance.privacy : copy.privacy}</p>
      </div>

      <div className="assistant-review-panel" aria-live="polite">
        <div className="assistant-panel-heading"><Check size={20} /><div><span>{copy.humanReview}</span><h2>{copy.choose}</h2></div></div>
        {!result ? <p className="assistant-empty">{copy.empty}</p> : null}
        {result?.blocked ? <div className="assistant-blocked"><ShieldAlert size={18} /><p>{result.warning}</p></div> : null}
        {result && !result.blocked ? (
          <>
            <div className="assistant-suggestion-list">
              {(result.suggestions as Suggestion[]).map((item) => (
                <label key={item.field}>
                  <input type="checkbox" checked={selected.includes(item.field)} onChange={() => toggle(item.field)} />
                  <span><strong>{copy.fields[item.field] || item.field}</strong><small>{Array.isArray(item.value) ? item.value.join(', ') : item.value}</small><em>{copy.source}: {item.sourceExcerpt}</em></span>
                </label>
              ))}
            </div>
            <button className="secondary-action" type="button" onClick={copyReviewed} disabled={!selectedSuggestions.length}><Clipboard size={16} /> {copied ? copy.copied : copy.copy}</button>
            <p className="assistant-contract-note">{draft ? guidance.contract : copy.contract}</p>
            {draft && onApply ? <>
              <button className="secondary-action" type="button" disabled={!selectedSuggestions.length} onClick={() => { setChanges(previewIntakeDraft(draft, result, selected)); setDraftMessage(''); }}><FileSearch size={16} /> {draftCopy.preview}</button>
              {changes ? <div className="assistant-suggestion-list">
                {changes.length ? changes.map(change => <div key={change.field}>
                  <strong>{copy.fields[change.field] || change.field}</strong>
                  <p>{draftCopy.before}: {display(change.before)}</p><p>{draftCopy.after}: {display(change.after)}</p>
                </div>) : <p>{draftCopy.noChanges}</p>}
                <button className="primary-action" type="button" disabled={!changes.length} onClick={applyReviewed}><Check size={16} /> {draftCopy.apply}</button>
                <button className="secondary-action" type="button" onClick={() => setChanges(null)}>{draftCopy.cancel}</button>
              </div> : null}
              {draftMessage ? <p role="status">{draftCopy[draftMessage]}</p> : null}
            </> : null}
          </>
        ) : null}
      </div>
    </section>
    </>
  );
}
