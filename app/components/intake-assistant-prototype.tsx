'use client';

import { useMemo, useState } from 'react';
import { Check, Clipboard, FileSearch, ShieldAlert, Sparkles } from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { analyzeIntakeNotes } from '../../lib/intake-assistant.mjs';

type Suggestion = {
  field: string;
  value: string | string[];
  sourceExcerpt: string;
  confidence: string;
};

const fieldLabels: Record<string, string> = {
  organization: 'Organizacion',
  website: 'Sitio web',
  audience: 'Audiencia',
  goals: 'Objetivos',
  languages: 'Idiomas',
  cms: 'CMS',
  hosting: 'Alojamiento',
  notes: 'Notas de contexto',
};

const example = 'Somos Museo Sur. Nuestro sitio es museosur.org. Queremos que nos encuentren coleccionistas, investigadores y visitantes. La web usa WordPress y debe explicarse en espanol, ingles y portugues.';

export function IntakeAssistantPrototype() {
  const [notes, setNotes] = useState(example);
  const [result, setResult] = useState<ReturnType<typeof analyzeIntakeNotes> | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const selectedSuggestions = useMemo(() => {
    if (!result) return [];
    return (result.suggestions as Suggestion[]).filter((item) => selected.includes(item.field));
  }, [result, selected]);

  const review = () => {
    const next = analyzeIntakeNotes(notes);
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
        <div className="assistant-panel-heading"><Sparkles size={20} /><div><span>Contexto libre</span><h2>Contanos lo que sabes, aunque este desordenado.</h2></div></div>
        <label htmlFor="intake-notes">No incluyas claves, passwords, tokens ni datos de pago.</label>
        <textarea id="intake-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={9} />
        <button className="primary-action" type="button" onClick={review}><FileSearch size={17} /> Revisar propuesta</button>
        <p className="assistant-privacy"><ShieldAlert size={16} /> No se guarda, no se envia por email y no modifica tu expediente ni tu sitio.</p>
      </div>

      <div className="assistant-review-panel" aria-live="polite">
        <div className="assistant-panel-heading"><Check size={20} /><div><span>Revision humana</span><h2>Elegis que propuestas conservar.</h2></div></div>
        {!result ? <p className="assistant-empty">Todavia no analizamos el texto. El resultado aparecera separado por campo y con su fragmento de origen.</p> : null}
        {result?.blocked ? <div className="assistant-blocked"><ShieldAlert size={18} /><p>{result.warning}</p></div> : null}
        {result && !result.blocked ? (
          <>
            <div className="assistant-suggestion-list">
              {(result.suggestions as Suggestion[]).map((item) => (
                <label key={item.field}>
                  <input type="checkbox" checked={selected.includes(item.field)} onChange={() => toggle(item.field)} />
                  <span><strong>{fieldLabels[item.field] || item.field}</strong><small>{Array.isArray(item.value) ? item.value.join(', ') : item.value}</small><em>Origen: {item.sourceExcerpt}</em></span>
                </label>
              ))}
            </div>
            <button className="secondary-action" type="button" onClick={copyReviewed} disabled={!selectedSuggestions.length}><Clipboard size={16} /> {copied ? 'Propuesta copiada' : 'Copiar propuesta revisada'}</button>
            <p className="assistant-contract-note">Copiar no equivale a guardar ni publicar. La integracion con el expediente autenticado requiere un gate posterior.</p>
          </>
        ) : null}
      </div>
    </section>
  );
}
