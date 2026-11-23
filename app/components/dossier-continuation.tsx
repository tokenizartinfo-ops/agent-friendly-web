'use client';

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';

type Locale = 'es' | 'en' | 'pt';
type Draft = {
  kind: 'advanced' | 'new_site';
  level: string;
  progress: string;
  pending: string;
  nextStep: string;
  approvedVersion: string;
  responsible: string;
};
type Checkpoint = Omit<Draft, 'level'> & { id: string; recordedAt: string; revision: number; level: string | null };
type Snapshot = { projectRevision: number; checkpoint: Checkpoint | null };
type Props = { projectId: string; revision: number; canSave: boolean; withoutWebsite: boolean; locale: Locale; request: typeof fetch;
  sessionRequired: boolean; onPendingChange: (pending: boolean) => void;
  saveRef: MutableRefObject<((confirmedRevision?: number) => Promise<boolean>) | null>;
};

const copy = {
  es: {
    title: 'Retomar este expediente',
    intro: 'Guardá lo que falta y el próximo paso para retomarlo con AFW en una sesión autorizada. Evitá incluir contraseñas o claves.',
    kind: '¿Qué querés retomar?', kinds: ['Una mejora de AF-3 a AF-5', 'El diseño o los cambios de un sitio nuevo'],
    level: 'Nivel de la mejora', choose: 'Elegí el nivel',
    progress: 'Qué ya avanzó (opcional)', pending: 'Qué quedó pendiente', nextStep: 'Cuál es el próximo paso',
    approvedVersion: 'Referencia de la última versión aprobada (opcional)',
    responsible: 'De quién depende', people: ['AFW', 'Titular', 'Mantenedor del sitio', 'Proveedor'],
    saved: 'Punto de continuación guardado', revision: 'Revisión del expediente', save: 'Guardar punto de continuación',
    loading: 'Buscando el punto guardado…', saving: 'Guardando el punto de continuación…',
    changed: 'Hay cambios guardados en otra sesión o revisión. Consultá el punto vigente antes de guardar. Tus notas siguen en el formulario.',
    stale: 'Este punto corresponde a una revisión anterior. Revisá qué sigue vigente antes de usarlo.',
    blocked: 'Confirmá primero el guardado de la revisión actual del expediente.',
    readError: 'No pude consultar el punto guardado. Podés volver a consultarlo.',
    refresh: 'Consultar punto guardado', retry: 'Reintentar el mismo guardado',
    saveError: 'No pude confirmar el guardado. Podés reintentar con las mismas notas.',
    invalid: 'Revisá los campos antes de volver a guardar.',
    reference: 'Copiar enlace privado', copied: 'Enlace copiado. Compartilo en la sesión autorizada.',
    copyError: 'Usá el enlace del expediente para retomarlo en una sesión autorizada.',
  },
  en: {
    title: 'Resume this dossier',
    intro: 'Save what remains and the next step so you can resume with AFW in an authorized session. Leave out passwords and keys.',
    kind: 'What would you like to resume?', kinds: ['An AF-3 to AF-5 improvement', 'Design or changes for a new website'],
    level: 'Improvement level', choose: 'Choose the level',
    progress: 'Work so far (optional)', pending: 'What remains', nextStep: 'Next step',
    approvedVersion: 'Last approved version reference (optional)',
    responsible: 'Who can move it forward', people: ['AFW', 'Owner', 'Site maintainer', 'Provider'],
    saved: 'Continuation saved', revision: 'Dossier revision', save: 'Save continuation',
    loading: 'Finding the saved continuation…', saving: 'Saving the continuation…',
    changed: 'Another session or revision has saved changes. Check the current continuation before saving. Your notes remain in the form.',
    stale: 'This continuation refers to an earlier revision. Check what still applies before using it.',
    blocked: 'Confirm that the current dossier revision is saved first.',
    readError: 'I could not load the saved continuation. You can check again.',
    refresh: 'Check saved continuation', retry: 'Retry the same save',
    saveError: 'I could not confirm the save. You can retry with the same notes.',
    invalid: 'Review the fields before saving again.',
    reference: 'Copy private link', copied: 'Link copied. Share it in the authorized session.',
    copyError: 'Use the dossier link to resume in an authorized session.',
  },
  pt: {
    title: 'Retomar este dossiê',
    intro: 'Guarde o que falta e o próximo passo para retomar com AFW em uma sessão autorizada. Evite incluir senhas ou chaves.',
    kind: 'O que você quer retomar?', kinds: ['Uma melhoria de AF-3 a AF-5', 'O design ou as mudanças de um site novo'],
    level: 'Nível da melhoria', choose: 'Escolha o nível',
    progress: 'O que já avançou (opcional)', pending: 'O que ficou pendente', nextStep: 'Próximo passo',
    approvedVersion: 'Referência da última versão aprovada (opcional)',
    responsible: 'De quem depende', people: ['AFW', 'Titular', 'Responsável pelo site', 'Provedor'],
    saved: 'Ponto de continuação salvo', revision: 'Revisão do dossiê', save: 'Salvar ponto de continuação',
    loading: 'Buscando o ponto salvo…', saving: 'Salvando o ponto de continuação…',
    changed: 'Outra sessão ou revisão salvou mudanças. Consulte o ponto vigente antes de salvar. Suas notas continuam no formulário.',
    stale: 'Este ponto se refere a uma revisão anterior. Confira o que ainda se aplica antes de usá-lo.',
    blocked: 'Confirme primeiro o salvamento da revisão atual do dossiê.',
    readError: 'Não foi possível consultar o ponto salvo. Você pode consultar de novo.',
    refresh: 'Consultar ponto salvo', retry: 'Repetir o mesmo salvamento',
    saveError: 'Não foi possível confirmar o salvamento. Você pode repetir com as mesmas notas.',
    invalid: 'Confira os campos antes de salvar novamente.',
    reference: 'Copiar link privado', copied: 'Link copiado. Compartilhe na sessão autorizada.',
    copyError: 'Use o link do dossiê para retomar em uma sessão autorizada.',
  },
};

const levels = ['AF-3', 'AF-4', 'AF-5'];
const people = ['afw', 'owner', 'maintainer', 'provider'];

function fieldsFrom(checkpoint: Checkpoint): Draft {
  const { kind, level, progress, pending, nextStep, approvedVersion, responsible } = checkpoint;
  return { kind, level: level ?? '', progress, pending, nextStep, approvedVersion, responsible };
}

async function readSnapshot(response: Response): Promise<Snapshot> {
  if (!response.ok || response.headers.get('content-type')?.split(';')[0] !== 'application/json') {
    throw new Error('Continuation unconfirmed');
  }
  const value: Snapshot = await response.json();
  if (!Number.isSafeInteger(value?.projectRevision) || value.projectRevision < 1
    || (value.checkpoint !== null && (!/^continuation-[0-9a-f]{64}$/.test(value.checkpoint?.id) || !Number.isFinite(Date.parse(value.checkpoint.recordedAt))))) {
    throw new Error('Continuation unconfirmed');
  }
  return value;
}

export function DossierContinuation({ projectId, revision, canSave, withoutWebsite, locale, request, sessionRequired, onPendingChange, saveRef }: Props) {
  const text = copy[locale];
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [draft, setDraft] = useState<Draft>({
    kind: withoutWebsite ? 'new_site' : 'advanced',
    level: '', progress: '', pending: '', nextStep: '', approvedVersion: '', responsible: 'afw',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'changed' | 'readError' | 'saveError' | 'invalid'>('idle');
  const [copyStatus, setCopyStatus] = useState('');
  const panel = useRef<HTMLDetailsElement>(null);
  const busy = useRef(false);
  const attemptedRead = useRef(false);
  const changedDraft = useRef(false);
  const pendingSave = useRef<{ body: string; revision: number } | null>(null);
  const endpoint = '/api/projects/' + encodeURIComponent(projectId) + '/continuation';
  const saved = snapshot?.checkpoint;
  const textFields = ['progress', 'pending', 'nextStep', 'approvedVersion'] as const;
  const isBusy = status === 'loading' || status === 'saving';
  const retry = status === 'saveError';
  const hasCurrentContext = snapshot !== null && !['changed', 'readError'].includes(status);
  const canWrite = canSave && hasCurrentContext && snapshot.projectRevision <= revision;

  useEffect(() => {
    if (window.location.hash === '#dossier-continuation' && panel.current) panel.current.open = true;
  }, []);

  function change<K extends keyof Draft>(field: K, value: Draft[K]) {
    changedDraft.current = true;
    onPendingChange(true);
    setDraft(current => ({ ...current, [field]: value }));
  }

  async function refresh() {
    if (busy.current || pendingSave.current || sessionRequired) return;
    busy.current = true;
    attemptedRead.current = true;
    setStatus('loading');
    try {
      const latest = await readSnapshot(await request(endpoint, { cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(10000) }));
      setSnapshot(latest);
      if (latest.checkpoint && !changedDraft.current) setDraft(fieldsFrom(latest.checkpoint));
      setStatus('idle');
    } catch {
      setStatus('readError');
    } finally {
      busy.current = false;
    }
  }

  const save = useCallback(async (confirmedRevision?: number) => {
    const targetRevision = confirmedRevision ?? revision;
    const justSavedDossier = confirmedRevision !== undefined && hasCurrentContext
      && confirmedRevision >= revision && confirmedRevision >= snapshot.projectRevision;
    if (sessionRequired || busy.current || (!retry && !canWrite && !justSavedDossier)) return false;
    const attempt = pendingSave.current ?? {
      revision: targetRevision,
      body: JSON.stringify({
        ...draft, level: draft.kind === 'advanced' ? draft.level : null,
        requestId: crypto.randomUUID(), expectedRevision: targetRevision, previousId: saved?.id ?? null,
      }),
    };
    pendingSave.current = attempt;
    onPendingChange(true);
    busy.current = true;
    setStatus('saving');
    try {
      const response = await request(endpoint, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: attempt.body, redirect: 'manual',
        signal: AbortSignal.timeout(10000),
      });
      if (response.status === 409 || response.status === 400) {
        pendingSave.current = null;
        setStatus(response.status === 409 ? 'changed' : 'invalid');
        return false;
      }
      const latest = await readSnapshot(response);
      if (latest.checkpoint?.revision !== attempt.revision) throw new Error('Wrong checkpoint revision');
      pendingSave.current = null;
      changedDraft.current = false;
      onPendingChange(false);
      setSnapshot(latest);
      setDraft(fieldsFrom(latest.checkpoint));
      setStatus('idle');
      return true;
    } catch {
      setStatus('saveError');
      return false;
    } finally {
      busy.current = false;
    }
  }, [canWrite, draft, endpoint, hasCurrentContext, onPendingChange, request, retry, revision, saved?.id, sessionRequired, snapshot]);

  useEffect(() => {
    saveRef.current = save;
    return () => { saveRef.current = null; };
  }, [save, saveRef]);

  async function copyReference() {
    try {
      const url = new URL(window.location.pathname, window.location.origin);
      url.searchParams.set('project', projectId);
      url.hash = 'dossier-continuation';
      await navigator.clipboard.writeText(url.href);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyError);
    }
  }

  return <details ref={panel} id="dossier-continuation" className="dossier-assistant" onToggle={event => {
    if (event.currentTarget.open && !attemptedRead.current) void refresh();
  }}>
    <summary>{text.title}</summary>
    <div hidden={sessionRequired}>
    <p>{text.intro}</p>
    <p role="status">{status === 'idle' ? copyStatus : text[status]}</p>
    {['readError', 'changed'].includes(status) ? <button type="button" className="secondary-action" onClick={() => void refresh()}>{text.refresh}</button> : null}
    {saved ? <section aria-label={text.saved}>
      <p><strong>{text.saved}</strong> · {text.revision} {saved.revision} · <time dateTime={saved.recordedAt}>{new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(saved.recordedAt))}</time></p>
      {saved.revision !== Math.max(revision, snapshot?.projectRevision ?? 0) ? <p className="inline-warning">{text.stale}</p> : null}
      <dl>
        <dt>{text.kind}</dt><dd>{saved.kind === 'advanced' ? saved.level : text.kinds[1]}</dd>
        {textFields.filter(field => saved[field]).map(field => <div key={field}><dt>{text[field]}</dt><dd>{saved[field]}</dd></div>)}
        <dt>{text.responsible}</dt><dd>{text.people[people.indexOf(saved.responsible)]}</dd>
      </dl>
      <button type="button" className="secondary-action" onClick={() => void copyReference()}>{text.reference}</button>
    </section> : null}
    {snapshot ? <form onSubmit={event => { event.preventDefault(); void save(); }} aria-busy={isBusy}>
      <fieldset disabled={isBusy || retry || !canWrite} className="field-grid">
        <label>{text.kind}<select value={draft.kind} onChange={event => change('kind', event.target.value as Draft['kind'])}>
          <option value="advanced">{text.kinds[0]}</option><option value="new_site">{text.kinds[1]}</option>
        </select></label>
        {draft.kind === 'advanced' ? <label>{text.level}<select required value={draft.level} onChange={event => change('level', event.target.value)}>
          <option value="">{text.choose}</option>{levels.map(level => <option key={level}>{level}</option>)}
        </select></label> : null}
        {textFields.map(field => <label key={field}>{text[field]}<textarea rows={2} value={draft[field]}
          maxLength={field === 'approvedVersion' ? 120 : 360} required={field === 'pending' || field === 'nextStep'}
          onChange={event => change(field, event.target.value)} /></label>)}
        <label>{text.responsible}<select value={draft.responsible} onChange={event => change('responsible', event.target.value)}>
          {people.map((person, index) => <option key={person} value={person}>{text.people[index]}</option>)}
        </select></label>
      </fieldset>
      {(!canSave || snapshot.projectRevision > revision) && !retry ? <p>{text.blocked}</p> : null}
      <button type="submit" className="secondary-action" disabled={isBusy || (!canWrite && !retry)}>{retry ? text.retry : text.save}</button>
    </form> : null}
    </div>
  </details>;
}
