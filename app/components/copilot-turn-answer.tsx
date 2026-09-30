'use client';
import { useState } from 'react';
import { previewIntakeAnswer } from '../../lib/intake-question-coach.mjs';
import { previewIntakeDraft, applyIntakeDraft } from '../../lib/intake-draft-review.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';
import { dossierValueLabel } from '../../lib/dossier-field-labels.mjs';

type Draft = Record<string, string | string[]>;
type Locale = 'es' | 'en' | 'pt';
type Change = { field: string; before?: string | string[]; after: string | string[] };
/** Manual answers share the reviewed draft/save circuit; no AI consent is required. */
export function CopilotTurnAnswer({ field, draft, locale, onApply }: { field: string; draft: Draft; locale: Locale; onApply: (draft: Draft) => void }) {
  const [text, setText] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [preview, setPreview] = useState<Change[] | null>(null);
  const [error, setError] = useState('');
  const form = privateUiCopy(locale).intake;
  const options: string[][] = field === 'goals' ? form.goals : field === 'contentSources' ? form.content : field === 'control' ? form.controls : field === 'languages' ? ['es', 'en', 'pt', 'it', 'fr'].map((code, index) => [code, form.languages[index]]) : [];
  const copy = {
    es: { answer: 'Tu respuesta', review: 'Revisar respuesta', apply: 'Confirmar y guardar', error: 'No pude aplicar esta respuesta. Revisala; si no lo sabés, podemos dejarlo pendiente.' },
    en: { answer: 'Your answer', review: 'Review answer', apply: 'Confirm and save', error: 'I could not apply this answer. Review it; we can leave it pending if you are unsure.' },
    pt: { answer: 'Sua resposta', review: 'Revisar resposta', apply: 'Confirmar e salvar', error: 'Não consegui aplicar esta resposta. Revise; podemos deixá-la pendente se não souber.' },
  }[locale];
  function review() {
    try {
      const choice = field === 'control' ? values[0] : values;
      if (options.length && (!values.length || values.some(value => !options.some(([code]) => code === value)))) throw new Error('invalid');
      const proposal = ['goals', 'contentSources', 'control'].includes(field)
        ? previewIntakeDraft(draft, { suggestions: [{ field, value: field === 'goals' ? [...new Set([...(Array.isArray(draft.goals) ? draft.goals : []), ...values])] : choice }] }, [field])
        : previewIntakeAnswer(draft, field, field === 'languages' ? values : text);
      setPreview(proposal); setError('');
    } catch { setPreview(null); setError(copy.error); }
  }
  return <div className="assistant-guidance">
    {options.length ? <fieldset><legend>{copy.answer}</legend>{options.map(([code, label]) => <label key={code}><input type={field === 'control' ? 'radio' : 'checkbox'} name={`copilot-${field}`} checked={values.includes(code)} onChange={() => { setValues(current => field === 'control' ? [code] : current.includes(code) ? current.filter(value => value !== code) : [...current, code]); setPreview(null); }} />{label}</label>)}</fieldset> : <label>{copy.answer}<textarea rows={2} maxLength={1200} value={text} onChange={event => { setText(event.target.value); setPreview(null); }} /></label>}
    {error ? <p role="alert">{error}</p> : null}
    <button type="button" className="secondary-action" onClick={review}>{copy.review}</button>
    {preview?.length ? <div><p>{dossierValueLabel(field, preview[0].after, locale)}</p><button type="button" className="primary-action" onClick={() => { try { onApply(applyIntakeDraft(draft, preview)); setPreview(null); } catch { setError(copy.error); setPreview(null); } }}>{copy.apply}</button></div> : null}
  </div>;
}
