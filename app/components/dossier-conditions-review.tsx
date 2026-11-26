'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

const fields = ['terms', 'privacy', 'product', 'whitePaper', 'accessibility'] as const;
const groups = [['terms', 'privacy', 'product', 'whitePaper'], ['accessibility']] as const;
const values = ['pending', 'reviewed', 'needs_changes', 'not_applicable'] as const;
type Field = typeof fields[number];
type Status = typeof values[number];
type Review = Record<Field, Status>;
type Locale = 'es' | 'en' | 'pt';
type Snapshot = { projectRevision: number; checkpoint: { id: string; revision: number; recordedAt: string; review: Review } | null };
type Feedback = 'loading' | 'idle' | 'readError' | 'saving' | 'saved' | 'changed' | 'unconfirmed';

const empty: Review = { terms: 'pending', privacy: 'pending', product: 'pending', whitePaper: 'pending', accessibility: 'pending' };
const copy = {
  es: {
    title: 'Accesibilidad y condiciones · AF-2', newTitle: 'Accesibilidad y condiciones para tu sitio nuevo',
    intro: 'Marcá qué pudiste revisar y qué conviene corregir. Contrastá la web, la compra y los canales oficiales.',
    newIntro: 'Prepará estas condiciones antes de publicar. Podés guardar lo que falta aunque todavía no tengas dominio.',
    groups: ['Documentación y políticas', 'Accesibilidad de tu sitio'],
    labels: ['Términos y condiciones', 'Política de privacidad', 'Política de producto y devoluciones', 'White paper', 'Accesibilidad'],
    prompts: ['Quién responde por la oferta y cómo se contrata.', 'Qué datos pide el sitio, para qué y cómo se ejercen los derechos.',
      'Qué incluye el producto, entrega, cambios, reembolsos y garantías. Confirmá quién vende y con qué respaldo.', 'Cómo funciona la propuesta, de dónde salen sus afirmaciones y cuáles son sus límites, si corresponde.',
      'Revisá contraste, teclado y lector de pantalla en las páginas y formularios importantes. Usá WAVE como apoyo para las páginas públicas.'],
    states: ['Pendiente', 'Revisado', 'Hay que corregir', 'No aplica'],
    boundary: 'Se guardan los estados en tu expediente privado. El responsable confirma los hechos. Las cuestiones legales se revisan con un profesional habilitado.',
    save: 'Guardar revisión', retry: 'Reintentar el mismo guardado', reload: 'Cargar la versión guardada',
    busy: 'Guardando la revisión…', loading: 'Cargando tu revisión…', done: 'Revisión guardada.',
    readError: 'Por ahora no pude cargar la revisión.',
    unconfirmed: 'No pude confirmar el guardado. Podés reintentar con los mismos estados.',
    changed: 'Cambió la revisión. Cargá la versión guardada. Conservaremos tus selecciones para que puedas compararlas.',
    refreshed: 'Cargué la versión guardada. Compará tus selecciones con lo que ya figura en el expediente.',
    previous: 'Estado guardado',
    session: 'Recuperá tu sesión para guardar la revisión.',
    blocked: 'Guardá los cambios del expediente antes de guardar esta revisión.',
    stale: 'Estos estados son de una revisión anterior del expediente. Volvé a comprobarlos antes de guardar.',
  },
  en: {
    title: 'Accessibility and conditions · AF-2', newTitle: 'Accessibility and conditions for your new site',
    intro: 'Mark what you checked and what needs attention. Compare the site, checkout, and official channels.',
    newIntro: 'Prepare these conditions before publication. Save outstanding items while you are still choosing a domain.',
    groups: ['Documents and policies', 'Website accessibility'],
    labels: ['Terms and conditions', 'Privacy policy', 'Product and returns policy', 'White paper', 'Accessibility'],
    prompts: ['Who is responsible for the offer and how people enter into an agreement.', 'Which data the site requests, why it requests it, and how people exercise their rights.',
      'What the product includes, delivery, exchanges, refunds, and warranties. Verify the seller and their authority.', 'How the offering works, evidence for its claims, and its limitations when relevant.',
      'Check contrast, keyboard operation, and screen reader use on key pages and forms. Use WAVE to support public page reviews.'],
    states: ['Pending', 'Reviewed', 'Needs changes', 'Not applicable'],
    boundary: 'These statuses stay in your private dossier. The owner confirms the facts. A qualified professional reviews legal questions.',
    save: 'Save review', retry: 'Retry the same save', reload: 'Load the saved version',
    busy: 'Saving review…', loading: 'Loading review…', done: 'Review saved.',
    readError: 'I could not load the review.',
    unconfirmed: 'I could not confirm the save. You can retry with the same statuses.',
    changed: 'The review changed. Load the saved version. Your choices will stay available for comparison.',
    refreshed: 'The saved version is loaded. Compare your choices with what is on file.',
    previous: 'Saved status',
    session: 'Restore your session to save the review.',
    blocked: 'Save the dossier changes before saving this review.',
    stale: 'These statuses belong to an earlier dossier revision. Check them again before saving.',
  },
  pt: {
    title: 'Acessibilidade e condições · AF-2', newTitle: 'Acessibilidade e condições para seu novo site',
    intro: 'Marque o que revisou e o que precisa de correção. Compare o site, a compra e os canais oficiais.',
    newIntro: 'Prepare estas condições antes de publicar. Saiba o que falta mesmo enquanto escolhe um domínio.',
    groups: ['Documentação e políticas', 'Acessibilidade do site'],
    labels: ['Termos e condições', 'Política de privacidade', 'Política de produto e devoluções', 'White paper', 'Acessibilidade'],
    prompts: ['Quem responde pela oferta e como contratar.', 'Quais dados o site solicita, por quê e como exercer os direitos.',
      'O que o produto inclui, entrega, trocas, reembolsos e garantias. Confirme quem vende e com qual autorização.', 'Como funciona a proposta, as evidências e os limites quando aplicável.',
      'Revise contraste, teclado e leitor de tela nas páginas e formulários principais. Use o WAVE como apoio nas páginas públicas.'],
    states: ['Pendente', 'Revisado', 'Precisa de correção', 'Não se aplica'],
    boundary: 'Os estados ficam no seu dossiê privado. O titular confirma os fatos. Um profissional habilitado revisa as questões jurídicas.',
    save: 'Salvar revisão', retry: 'Tentar o mesmo salvamento', reload: 'Carregar a versão salva',
    busy: 'Salvando revisão…', loading: 'Carregando revisão…', done: 'Revisão salva.',
    readError: 'Não consegui carregar a revisão.',
    unconfirmed: 'Não consegui confirmar o salvamento. Você pode tentar com os mesmos estados.',
    changed: 'A revisão mudou. Carregue a versão salva. Suas escolhas ficarão disponíveis para comparação.',
    refreshed: 'A versão salva foi carregada. Compare suas escolhas com as que estão no dossiê.',
    previous: 'Estado salvo',
    session: 'Recupere sua sessão para salvar a revisão.',
    blocked: 'Salve as mudanças do dossiê antes de salvar esta revisão.',
    stale: 'Estes estados são de uma revisão anterior do dossiê. Verifique de novo antes de salvar.',
  },
};

async function readSnapshot(response: Response): Promise<Snapshot> {
  if (!response.ok) throw Error('Conditions unavailable');
  const data = await response.json() as Snapshot;
  const checkpoint = data.checkpoint;
  if (!Number.isSafeInteger(data.projectRevision) || data.projectRevision < 1 || (checkpoint !== null &&
    (!checkpoint?.id || !Number.isSafeInteger(checkpoint.revision)
      || checkpoint.revision < 1 || checkpoint.revision > data.projectRevision
      || !fields.every(field => values.includes(checkpoint.review?.[field]))))) {
    throw Error('Invalid conditions receipt');
  }
  return data;
}

export function DossierConditionsReview({ projectId, revision, newSite, canSave, sessionRequired, locale, request,
  onPendingChange, saveRef, refreshDossier }: {
  projectId: string; revision: number; newSite: boolean; canSave: boolean; locale: Locale; request: typeof fetch;
  sessionRequired: boolean; onPendingChange: (value: boolean) => void;
  saveRef: RefObject<((confirmedRevision?: number) => Promise<boolean>) | null>;
  refreshDossier: (minimumRevision: number, signal: AbortSignal) => Promise<boolean>;
}) {
  const text = copy[locale];
  const endpoint = '/api/projects/' + encodeURIComponent(projectId) + '/conditions';
  const [draft, setDraft] = useState<Review>(empty);
  const [view, setView] = useState<Snapshot | null>(null);
  const [status, setStatus] = useState<Feedback>('loading');
  const [comparing, setComparing] = useState(false);
  const [open, setOpen] = useState(newSite);
  const inFlight = useRef(false);
  const pending = useRef<{ body: string; revision: number } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]);
    void request(endpoint, { cache: 'no-store', redirect: 'manual', signal })
      .then(readSnapshot)
      .then(latest => {
        if (controller.signal.aborted) return;
        setView(latest);
        setDraft(latest.checkpoint?.review ?? empty);
        setStatus('idle');
      }).catch(() => { if (!controller.signal.aborted) setStatus('readError'); });
    return () => controller.abort();
  }, [endpoint, request]);

  const retry = status === 'unconfirmed';
  const busy = status === 'saving';
  const saved = view?.checkpoint?.review ?? empty;
  const changed = fields.some(field => draft[field] !== saved[field]);
  const stale = Boolean((view?.checkpoint && view.checkpoint.revision < revision)
    || (view && changed && view.projectRevision < revision));
  const different = view !== null && view.projectRevision > revision;
  const writable = canSave && !sessionRequired && view !== null && !different
    && (status === 'idle' || status === 'saved');

  const save = useCallback(async () => {
    if (inFlight.current || sessionRequired || different) return false;
    if (!retry && (!writable || (!changed && !stale))) return false;
    const attempt = pending.current ?? {
      revision, body: JSON.stringify({ requestId: crypto.randomUUID(), expectedRevision: revision,
        previousId: view?.checkpoint?.id ?? null, review: draft }),
    };
    pending.current = attempt;
    inFlight.current = true;
    setStatus('saving');
    try {
      const response = await request(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' },
        body: attempt.body, redirect: 'manual', signal: AbortSignal.timeout(10000) });
      if (response.status === 409) {
        pending.current = null;
        setStatus('changed');
        return false;
      }
      const latest = await readSnapshot(response);
      if (latest.checkpoint?.revision !== attempt.revision) throw Error('Unconfirmed conditions revision');
      pending.current = null;
      setDraft(latest.checkpoint.review);
      setView(latest);
      setStatus('saved');
      setComparing(false);
      return true;
    } catch {
      setStatus('unconfirmed');
      return false;
    } finally {
      inFlight.current = false;
    }
  }, [changed, different, draft, endpoint, request, retry, revision, sessionRequired, stale, view, writable]);

  useEffect(() => {
    saveRef.current = (confirmedRevision?: number) => {
      if (!retry && (confirmedRevision !== undefined || stale || comparing)) {
        setOpen(true);
        return Promise.resolve(false);
      }
      return save();
    };
    return () => { saveRef.current = null; };
  }, [comparing, retry, save, saveRef, stale]);

  useEffect(() => {
    onPendingChange(changed || retry || busy);
  }, [busy, changed, onPendingChange, retry]);

  useEffect(() => () => onPendingChange(false), [onPendingChange]);

  async function reload() {
    if (inFlight.current || retry || sessionRequired) return;
    inFlight.current = true;
    setStatus('loading');
    try {
      const signal = AbortSignal.timeout(10000);
      const latest = await readSnapshot(await request(endpoint, { cache: 'no-store', redirect: 'manual', signal }));
      if (latest.projectRevision > revision && !(await refreshDossier(latest.projectRevision, signal))) {
        setStatus('changed');
        return;
      }
      const latestReview = latest.checkpoint?.review ?? empty;
      setDraft(Object.fromEntries(fields.map(field => [field, draft[field] === saved[field] ? latestReview[field] : draft[field]])) as Review);
      setView(latest);
      setComparing(changed);
      setStatus('idle');
    } catch {
      setStatus('readError');
    } finally {
      inFlight.current = false;
    }
  }

  const feedback = sessionRequired ? text.session : retry ? text.unconfirmed : busy ? text.busy
    : status === 'loading' ? text.loading : status === 'readError' ? text.readError
    : status === 'changed' || different ? text.changed : !canSave ? text.blocked
    : stale ? text.stale : comparing && changed ? text.refreshed : status === 'saved' ? text.done : '';

  return <details id="dossier-conditions" className="dossier-assistant" open={open}
    onToggle={event => setOpen(event.currentTarget.open)}>
    <summary id="dossier-conditions-title" tabIndex={0}>{newSite ? text.newTitle : text.title}</summary>
    <p>{newSite ? text.newIntro : text.intro}</p>
    <p><small>{text.boundary}</small></p>
    {view && <form onSubmit={event => { event.preventDefault(); void save(); }} aria-busy={busy}>
      {groups.map((group, groupIndex) => <fieldset key={group[0]} style={{ minWidth: 0 }}>
        <legend>{text.groups[groupIndex]}</legend>
        <div className="field-grid">
          {group.map(field => {
            const index = fields.indexOf(field);
            return <div key={field}>
              <label htmlFor={'conditions-' + field}>{text.labels[index]}</label>
              <p id={'conditions-hint-' + field}><small>{text.prompts[index]}</small></p>
              <select id={'conditions-' + field} aria-describedby={'conditions-hint-' + field} value={draft[field]}
                disabled={sessionRequired || busy || retry || different || (status !== 'idle' && status !== 'saved')}
                onChange={event => {
                  setDraft(previous => ({ ...previous, [field]: event.target.value as Status }));
                  if (status === 'saved') setStatus('idle');
                }}>
                {values.map((value, option) => value === 'not_applicable' && field === 'accessibility' ? null
                  : <option key={value} value={value}>{text.states[option]}</option>)}
              </select>
              {comparing && draft[field] !== saved[field] && <p><small>{text.previous} · {text.states[values.indexOf(saved[field])]}</small></p>}
            </div>;
          })}
        </div>
        {groupIndex === 1 && <p><a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">WAVE</a> · <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">WCAG 2.2</a></p>}
      </fieldset>)}
      <button className="primary-action" type="submit" disabled={sessionRequired || busy || different || (!retry && (!writable || (!changed && !stale)))}>
        {retry ? text.retry : text.save}
      </button>
    </form>}
    <p role="status">{feedback}</p>
    {!retry && (status === 'readError' || status === 'changed' || different) &&
      <button className="secondary-action" type="button" disabled={busy || status === 'loading' || sessionRequired} onClick={() => void reload()}>{text.reload}</button>}
  </details>;
}
