'use client';

import { useEffect, useRef, useState } from 'react';
import { previewIntakeDraft, applyIntakeDraft } from '../../lib/intake-draft-review.mjs';
import { analyzeIntakeNotes } from '../../lib/intake-assistant.mjs';
import { dossierFieldLabels, dossierValueLabel } from '../../lib/dossier-field-labels.mjs';
import { classifyCopilotResponse } from '../../lib/copilot-ui-response.mjs';

type Draft = Record<string, string | string[]>;
type Locale = 'es' | 'en' | 'pt';
type Suggestion = { field: string; value: string | string[]; sourceExcerpt: string };
type Result = { blocked: boolean; suggestions: Suggestion[]; warning: string };
const copy = {
  es: { title: 'Copilot inteligente', intro: 'Contame con tus palabras qué hace tu sitio y qué necesitás. El copilot propone datos; vos decidís qué incorporar.', privacy: 'Al pedir ayuda, este texto se procesa con Workers AI en Cloudflare. No incluyas claves ni datos privados. Nada se guarda o publica automáticamente.', consent: 'Entiendo y acepto enviar este texto a Workers AI en Cloudflare para preparar propuestas. Puedo seguir con la guía sin hacerlo.', grant: 'Activar ayuda con IA para este expediente', revoke: 'Revocar permiso para este expediente', granted: 'La ayuda con IA está autorizada para este expediente. Confirmás cada envío por separado.', revoked: 'El permiso está revocado. Podés seguir con la guía o volver a activarlo cuando quieras.', consentUnavailable: 'No pude comprobar el permiso. El copilot seguirá cerrado hasta que podamos hacerlo.', ask: 'Preparar propuestas', busy: 'Pensando con vos…', unavailable: 'El copilot no está disponible ahora. Podés seguir con la guía del expediente.', session: 'Tu sesión necesita renovarse. Conservá esta pestaña y volvé a iniciar sesión antes de reintentar.', projectUnavailable: 'No encuentro este expediente con tu sesión. Revisá que estés en el expediente correcto; no se aplicó ningún cambio.', rateLimited: 'Llegaste al límite temporal de consultas. Esperá un minuto o seguí con la guía del expediente.', review: 'Revisar cambios', apply: 'Aplicar al borrador', stale: 'El formulario cambió. Volvé a revisar las propuestas.', empty: 'No encontré datos suficientemente claros. Podés contármelo de otra forma.', source: 'Lo escribiste así', evidence: 'Esta propuesta sale de tu texto; todavía no verificamos ese dato en tu sitio.', applied: 'Aplicado al borrador. Revisalo antes de guardar.' },
  en: { title: 'Intelligent copilot', intro: 'Tell me in your own words what your site does and what you need. The copilot proposes details; you decide what to include.', privacy: 'When you ask for help, this text is processed with Workers AI on Cloudflare. Do not include keys or private data. Nothing is saved or published automatically.', consent: 'I understand and agree to send this text to Workers AI on Cloudflare to prepare suggestions. I can continue with the guide without doing so.', grant: 'Enable AI help for this dossier', revoke: 'Revoke permission for this dossier', granted: 'AI help is authorized for this dossier. You confirm each submission separately.', revoked: 'Permission is revoked. You can continue with the guide or enable it again whenever you choose.', consentUnavailable: 'I could not verify permission. The copilot stays closed until I can.', ask: 'Prepare suggestions', busy: 'Thinking with you…', unavailable: 'The copilot is unavailable right now. You can continue with the dossier guide.', session: 'Your session needs to be renewed. Keep this tab open and sign in again before retrying.', projectUnavailable: 'I cannot find this dossier in your session. Check that you opened the right one; no changes were applied.', rateLimited: 'You have reached the temporary request limit. Wait a minute or continue with the dossier guide.', review: 'Review changes', apply: 'Apply to draft', stale: 'The form changed. Review the suggestions again.', empty: 'I could not find clear enough details. You can rephrase them.', source: 'You wrote', evidence: 'This suggestion comes from your text; we have not verified it on your website.', applied: 'Applied to the draft. Review it before saving.' },
  pt: { title: 'Copilot inteligente', intro: 'Conte com suas palavras o que seu site faz e do que precisa. O copilot propõe dados; você decide o que incluir.', privacy: 'Ao pedir ajuda, este texto é processado com Workers AI na Cloudflare. Não inclua chaves nem dados privados. Nada é salvo ou publicado automaticamente.', consent: 'Entendo e aceito enviar este texto ao Workers AI na Cloudflare para preparar sugestões. Posso continuar com o guia sem fazer isso.', grant: 'Ativar ajuda com IA para este dossiê', revoke: 'Revogar permissão para este dossiê', granted: 'A ajuda com IA está autorizada para este dossiê. Você confirma cada envio separadamente.', revoked: 'A permissão foi revogada. Você pode seguir com o guia ou ativá-la novamente quando quiser.', consentUnavailable: 'Não consegui verificar a permissão. O copilot permanece fechado até que eu consiga.', ask: 'Preparar sugestões', busy: 'Pensando com você…', unavailable: 'O copilot não está disponível agora. Você pode continuar com o guia.', session: 'Sua sessão precisa ser renovada. Mantenha esta aba aberta e entre novamente antes de tentar de novo.', projectUnavailable: 'Não encontro este dossiê na sua sessão. Confira se abriu o correto; nenhuma alteração foi aplicada.', rateLimited: 'Você atingiu o limite temporário de consultas. Aguarde um minuto ou continue com o guia.', review: 'Revisar alterações', apply: 'Aplicar ao rascunho', stale: 'O formulário mudou. Revise as sugestões novamente.', empty: 'Não encontrei dados suficientemente claros. Você pode reformular.', source: 'Você escreveu', evidence: 'Esta sugestão vem do seu texto; ainda não verificamos esse dado no seu site.', applied: 'Aplicado ao rascunho. Revise antes de salvar.' },
};

export function IntakeIntelligentCopilot({ projectId, locale, draft, onApply }: { projectId: string; locale: Locale; draft: Draft; onApply: (draft: Draft) => void }) {
  const t = copy[locale];
  const labels = dossierFieldLabels(locale);
  const label = (field: string) => field in labels ? labels[field as keyof typeof labels] : field;
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [changes, setChanges] = useState<ReturnType<typeof previewIntakeDraft> | null>(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [processingConsent, setProcessingConsent] = useState(false);
  const [consentState, setConsentState] = useState<{ projectId: string; value: 'loading' | 'granted' | 'revoked' | 'error' }>({ projectId, value: 'loading' });
  const projectConsent = consentState.projectId === projectId ? consentState.value : 'loading';
  const setProjectConsent = (value: 'loading' | 'granted' | 'revoked' | 'error') => setConsentState({ projectId, value });
  const [consentBusy, setConsentBusy] = useState(false);
  const requestEpoch = useRef(0);
  const currentNotes = useRef(notes);
  useEffect(() => {
    let active = true;
    fetch(`/api/projects/${encodeURIComponent(projectId)}/copilot-consent`, { cache: 'no-store' })
      .then(async response => { if (!response.ok) throw new Error('consent_unavailable'); return response.json() as Promise<{ granted: boolean }>; })
      .then(value => { if (active) setConsentState({ projectId, value: value.granted ? 'granted' : 'revoked' }); })
      .catch(() => { if (active) setConsentState({ projectId, value: 'error' }); });
    return () => { active = false; };
  }, [projectId]);
  async function changeProjectConsent(action: 'grant' | 'revoke') {
    setConsentBusy(true); setStatus(''); setProcessingConsent(false);
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}/copilot-consent`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, cache: 'no-store',
        body: JSON.stringify({ action, consentVersion: 'afw-copilot-processing-v1', idempotencyKey: crypto.randomUUID() }),
      });
      if (!response.ok) throw new Error('consent_unavailable');
      const value = await response.json() as { granted: boolean };
      setProjectConsent(value.granted ? 'granted' : 'revoked');
      if (!value.granted) { requestEpoch.current += 1; setResult(null); setChanges(null); setBusy(false); }
    } catch { setProjectConsent('error'); setStatus(t.consentUnavailable); }
    finally { setConsentBusy(false); }
  }
  async function ask() {
    const safety = analyzeIntakeNotes(notes, locale);
    if (safety.blocked || !notes.trim() || !processingConsent || projectConsent !== 'granted') { setResult(null); setStatus(safety.warning || t.consentUnavailable); return; }
    const submittedNotes = notes;
    const epoch = ++requestEpoch.current;
    const isCurrent = () => epoch === requestEpoch.current && currentNotes.current === submittedNotes;
    setBusy(true); setProcessingConsent(false); setStatus(''); setChanges(null); setResult(null);
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}/copilot`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, cache: 'no-store',
        body: JSON.stringify({ locale, notes, processingConsentVersion: 'afw-copilot-processing-v1' }),
      });
      if (!isCurrent()) return;
      const responseKind = classifyCopilotResponse(response);
      if (responseKind !== 'ok') {
        setStatus(responseKind === 'rate_limited' ? t.rateLimited : responseKind === 'session' ? t.session
          : responseKind === 'project_unavailable' ? t.projectUnavailable : t.unavailable);
        return;
      }
      const answer = await response.json() as Result;
      if (!isCurrent()) return;
      setResult(answer); setSelected(answer.suggestions.map(item => item.field));
    } catch { if (isCurrent()) setStatus(t.unavailable); } finally { if (isCurrent()) setBusy(false); }
  }
  return <section className="assistant-prototype" aria-label={t.title}>
    <div className="assistant-input-panel"><h2>{t.title}</h2><p>{t.intro}</p>
      <label>{t.title}<textarea rows={5} maxLength={5000} value={notes} onChange={event => { requestEpoch.current += 1; currentNotes.current = event.target.value; setNotes(event.target.value); setProcessingConsent(false); setResult(null); setChanges(null); setStatus(''); setBusy(false); }} /></label>
      <p className="assistant-privacy">{t.privacy}</p>
      {projectConsent === 'granted' ? <><p className="assistant-privacy">{t.granted}</p><button type="button" className="secondary-action" disabled={consentBusy} onClick={() => changeProjectConsent('revoke')}>{t.revoke}</button></> : <><p className="assistant-privacy">{projectConsent === 'revoked' ? t.revoked : t.consentUnavailable}</p><button type="button" className="secondary-action" disabled={consentBusy || projectConsent === 'loading'} onClick={() => changeProjectConsent('grant')}>{t.grant}</button></>}
      <label className="assistant-privacy"><input type="checkbox" checked={processingConsent} disabled={projectConsent !== 'granted' || consentBusy} onChange={event => setProcessingConsent(event.target.checked)} /> {t.consent}</label><button type="button" className="primary-action" disabled={busy || consentBusy || projectConsent !== 'granted' || !notes.trim() || !processingConsent} onClick={ask}>{busy ? t.busy : t.ask}</button>
    </div>
    <div className="assistant-review-panel" aria-live="polite">
      {status ? <p role="status">{status}</p> : null}
      {result ? <><p>{result.suggestions.length ? result.warning : t.empty}</p>{result.suggestions.length ? <p>{t.evidence}</p> : null}
        <div className="assistant-suggestion-list">{result.suggestions.map(item => <label key={item.field}>
          <input type="checkbox" checked={selected.includes(item.field)} onChange={() => { setSelected(current => current.includes(item.field) ? current.filter(value => value !== item.field) : [...current, item.field]); setChanges(null); }} />
          <span><strong>{label(item.field)}</strong><small>{dossierValueLabel(item.field, item.value, locale)}</small><em>{t.source}: {item.sourceExcerpt}</em></span>
        </label>)}</div>
        <button type="button" className="secondary-action" disabled={!selected.length} onClick={() => { try { setChanges(previewIntakeDraft(draft, result, selected)); setStatus(''); } catch { setChanges(null); setStatus(t.stale); } }}>{t.review}</button>
        {changes ? <div><ul>{changes.map((change: { field: string; after: string | string[] }) => <li key={change.field}>{label(change.field)}: {dossierValueLabel(change.field, change.after, locale)}</li>)}</ul>
          <button type="button" className="primary-action" disabled={!changes.length} onClick={() => { try { onApply(applyIntakeDraft(draft, changes)); setChanges(null); setStatus(t.applied); } catch { setChanges(null); setStatus(t.stale); } }}>{t.apply}</button></div> : null}
      </> : null}
    </div>
  </section>;
}
