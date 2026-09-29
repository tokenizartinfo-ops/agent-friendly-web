'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import {dossierFieldLabels,dossierValueLabel} from '../../lib/dossier-field-labels.mjs';

type Value = string | string[] | undefined;
export type RebasePlan = { contract?:string; snapshot?:Record<string,unknown>; revision: number; changes: { field: string; before: Value; after: Value }[]; conflicts: { field: string; base: Value; local: Value; current: Value; reason?:string }[] };
const copy = {
  es: { title: 'Hay una versión más reciente', body: 'Tu borrador está a salvo en esta pestaña. Revisa los valores distintos. Los cambios compatibles se conservarán; nada se guardará todavía.', base: 'Antes', local: 'Mi cambio', current: 'Valor guardado', apply: 'Confirmar revisión del borrador', cancel: 'Volver sin cambiar', empty: 'Sin completar' },
  en: { title: 'A newer version is available', body: 'Your draft is safe in this tab. Review the different values. Compatible changes will be preserved; nothing will be saved yet.', base: 'Before', local: 'My change', current: 'Saved value', apply: 'Confirm draft review', cancel: 'Go back without changes', empty: 'Not provided' },
  pt: { title: 'Há uma versão mais recente', body: 'Seu rascunho está seguro nesta aba. Revise os valores diferentes. As alterações compatíveis serão mantidas; nada será salvo ainda.', base: 'Antes', local: 'Minha alteração', current: 'Valor salvo', apply: 'Confirmar revisão do rascunho', cancel: 'Voltar sem alterar', empty: 'Não preenchido' },
};

export function IntakeConflictReview({ plan, locale, onConfirm, onCancel }: { plan: RebasePlan; locale: 'es' | 'en' | 'pt'; onConfirm: (choices: Record<string, string>) => void; onCancel: () => void }) {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const text = copy[locale];
  const labels:Record<string,string>=dossierFieldLabels(locale);
  const show = (field:string,value: Value) => dossierValueLabel(field,value,locale) || text.empty;
  return <section aria-label={text.title} style={{ padding: 16, border: '2px solid currentColor', overflowWrap: 'anywhere' }}>
    <h2>{text.title}</h2><p>{text.body}</p>
    {plan.changes.map(change => <p key={change.field}><strong>{labels[change.field] || change.field}</strong><br />{text.current}: {show(change.field,change.before)}<br />{text.local}: {show(change.field,change.after)}</p>)}
    {plan.conflicts.map(conflict => <fieldset key={conflict.field} style={{ marginBlock: 16, minWidth: 0 }}>
      <legend>{labels[conflict.field] || conflict.field}</legend>
      {conflict.reason==='explicit_review'?<p>{locale==='es'?'Este dato requiere tu elección explícita. Conservamos una declaración; no concedemos permisos.':locale==='pt'?'Este dado exige sua escolha explícita. Mantemos uma declaração; não concedemos permissões.':'This detail needs your explicit choice. We retain a declaration; we do not grant permissions.'}</p>:null}
      <p>{text.base}: {show(conflict.field,conflict.base)}</p>
      {(['local', 'current'] as const).map(choice => <label key={choice} style={{ display: 'block', paddingBlock: 8 }}>
        <input type="radio" name={`conflict-${conflict.field}`} checked={choices[conflict.field] === choice} onChange={() => setChoices(previous => ({ ...previous, [conflict.field]: choice }))} /> {text[choice]}: {show(conflict.field,conflict[choice])}
      </label>)}
    </fieldset>)}
    <button type="button" className="primary-action" disabled={plan.conflicts.some(conflict => !choices[conflict.field])} onClick={() => onConfirm(choices)}><Check size={17} />{text.apply}</button>
    <button type="button" className="secondary-action" onClick={onCancel}><X size={17} />{text.cancel}</button>
  </section>;
}
