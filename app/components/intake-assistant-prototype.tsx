'use client';

import { useMemo, useState } from 'react';
import { Check, Clipboard, FileSearch, ShieldAlert, Sparkles } from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { analyzeIntakeNotes } from '../../lib/intake-assistant.mjs';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';

type Suggestion = {
  field: string;
  value: string | string[];
  sourceExcerpt: string;
  confidence: string;
};

type Locale = 'es' | 'en' | 'pt';

export function IntakeAssistantPrototype({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = publicToolsCopy(locale).intake;
  const [notes, setNotes] = useState(copy.example);
  const [result, setResult] = useState<ReturnType<typeof analyzeIntakeNotes> | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const selectedSuggestions = useMemo(() => {
    if (!result) return [];
    return (result.suggestions as Suggestion[]).filter((item) => selected.includes(item.field));
  }, [result, selected]);

  const review = () => {
    const next = analyzeIntakeNotes(notes, locale);
    setResult(next);
    setSelected(next.blocked ? [] : (next.suggestions as Suggestion[]).map((item) => item.field));
    setCopied(false);
  };

  const toggle = (field: string) => setSelected((current) => current.includes(field) ? current.filter((item) => item !== field) : [...current, field]);

  const copyReviewed = async () => {
    const payload = Object.fromEntries(selectedSuggestions.map((item) => [item.field, item.value]));
    await navigator.clipboard.writeText(JSON.stringify({ contract: 'intake-assistant-review.v1', proposals: payload }, null, 2));
    setCopied(true);
  };

  return (
    <section className="assistant-prototype">
      <div className="assistant-input-panel">
        <div className="assistant-panel-heading"><Sparkles size={20} /><div><span>{copy.freeContext}</span><h2>{copy.freeTitle}</h2></div></div>
        <label htmlFor="intake-notes">{copy.secretWarning}</label>
        <textarea id="intake-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={9} />
        <button className="primary-action" type="button" onClick={review}><FileSearch size={17} /> {copy.review}</button>
        <p className="assistant-privacy"><ShieldAlert size={16} /> {copy.privacy}</p>
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
            <p className="assistant-contract-note">{copy.contract}</p>
          </>
        ) : null}
      </div>
    </section>
  );
}
