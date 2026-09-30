'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { previewIntakeDraft } from '../../lib/intake-draft-review.mjs';
import { applyCopilotReview } from '../../lib/copilot-review-epoch.mjs';
import { analyzeIntakeNotes } from '../../lib/intake-assistant.mjs';
import { dossierFieldLabels, dossierValueLabel } from '../../lib/dossier-field-labels.mjs';
import { classifyCopilotResponse } from '../../lib/copilot-ui-response.mjs';
import { defaultCopilotSelection } from '../../lib/copilot-review-selection.mjs';
import { appendVoiceSegment } from '../../lib/intake-copilot-audio.mjs';
import { planCopilotNextTurn } from '../../lib/copilot-next-turn.mjs';
import { previewCopilotNarrative } from '../../lib/copilot-narrative-draft.mjs';
import { validateCopilotWorkingDraft } from '../../lib/copilot-working-draft.mjs';
import { reviewedGoalProposal } from '../../lib/copilot-goal-contract.mjs';
import { emptyCopilotSession, visibleSessionResult } from '../../lib/copilot-session.mjs';
import { CopilotTurnAnswer } from './copilot-turn-answer';

type Draft = Record<string, string | string[]>;
type Locale = 'es' | 'en' | 'pt';
type Suggestion = { field: string; value: string | string[]; sourceExcerpt: string };
type GoalMode = 'discover' | 'explain' | 'query' | 'act' | 'transact';
type Result = { blocked: boolean; suggestions: Suggestion[]; warning: string; goalGuidance?: { mode: GoalMode; sourceExcerpt: string } | null };
type Session = { version: number; basedOnRevision: number; deferred: string[]; decisions: { field: string; choice: string }[]; pending: { suggestions: Suggestion[]; goalGuidance?: Result['goalGuidance'] } | null };
type WorkingDraft = { text: string; revision: number; session: Session };
const goalGuidanceCopy = {
  es: { intro: 'Entendí este objetivo de tu texto. Es una hipótesis para conversar, no una capacidad verificada ni una autorización.', discover: '¿Qué deberían poder encontrar primero los visitantes o asistentes?', explain: '¿Qué información necesitás explicar con claridad antes de avanzar?', query: '¿Qué datos concretos deberían poder consultar y quién puede verlos?', act: '¿Qué acción querés permitir, quién la autoriza y cómo se revierte?', transact: '¿Qué operación querés ofrecer y qué controles necesitaría antes de habilitarla?' },
  en: { intro: 'I understood this goal from your text. It is a discussion hypothesis, not a verified capability or permission.', discover: 'What should visitors or assistants find first?', explain: 'What information needs a clear explanation first?', query: 'Which specific data should be queryable, and who may see it?', act: 'Which action should be possible, who authorizes it, and how can it be reversed?', transact: 'Which transaction do you want to offer, and what controls would it need first?' },
  pt: { intro: 'Entendi este objetivo do seu texto. É uma hipótese para conversar, não uma capacidade verificada nem uma autorização.', discover: 'O que visitantes ou assistentes devem encontrar primeiro?', explain: 'Que informação precisa de uma explicação clara primeiro?', query: 'Quais dados devem ser consultáveis e quem pode vê-los?', act: 'Que ação você quer permitir, quem a autoriza e como revertê-la?', transact: 'Que transação você quer oferecer e quais controles ela exigiria antes?' },
};
const voiceCopy = {
  es: { title: 'Contármelo por audio', intro: 'Podés hablar en varios segmentos de hasta 30 segundos. Cada transcripción queda para corregir antes de sumarla a tu relato.', start: 'Grabar segmento', stop: 'Detener grabación', send: 'Transcribir este segmento', discard: 'Descartar segmento', add: 'Agregar transcripción al relato', transcript: '¿Así quisiste decirlo? Corregí o ampliá la transcripción.', consent: 'Marcá el permiso de envío antes de transcribir el audio.', ready: 'Escuchá el segmento antes de enviarlo. El archivo no se guarda en tu expediente.', unsupported: 'Este navegador no permite grabar audio aquí. Podés escribir tu relato.', microphone: 'No pude acceder al micrófono. Revisá el permiso del navegador o escribí tu relato.', failed: 'No pude transcribir este segmento. Podés reintentar o escribirlo.', tooLong: 'El relato completo supera el límite de 5000 caracteres. Resumí un segmento antes de agregarlo.', sensitive: 'La transcripción podría contener claves o datos privados. No la incorporé; revisá el audio y escribí una versión sin esos datos.' },
  en: { title: 'Tell me by voice', intro: 'You can speak in several segments of up to 30 seconds. Review each transcript before adding it to your account.', start: 'Record a segment', stop: 'Stop recording', send: 'Transcribe this segment', discard: 'Discard segment', add: 'Add transcript to account', transcript: 'Is this what you meant? Correct or expand the transcript.', consent: 'Check the processing permission before sending audio.', ready: 'Listen before sending. The recording is not saved to your dossier.', unsupported: 'This browser cannot record audio here. You can type your account.', microphone: 'I could not access the microphone. Check browser permission or type your account.', failed: 'I could not transcribe this segment. Retry or type it.', tooLong: 'The complete account exceeds 5000 characters. Shorten a segment before adding it.', sensitive: 'The transcript may contain keys or private details. I did not add it; review the recording and write a safe version.' },
  pt: { title: 'Contar por áudio', intro: 'Você pode falar em vários segmentos de até 30 segundos. Revise cada transcrição antes de acrescentá-la ao relato.', start: 'Gravar segmento', stop: 'Parar gravação', send: 'Transcrever este segmento', discard: 'Descartar segmento', add: 'Adicionar transcrição ao relato', transcript: 'Era isso que você queria dizer? Corrija ou amplie a transcrição.', consent: 'Marque a permissão de envio antes de transcrever o áudio.', ready: 'Ouça antes de enviar. A gravação não é salva no dossiê.', unsupported: 'Este navegador não pode gravar áudio aqui. Você pode escrever o relato.', microphone: 'Não consegui acessar o microfone. Confira a permissão do navegador ou escreva o relato.', failed: 'Não consegui transcrever este segmento. Tente novamente ou escreva.', tooLong: 'O relato completo ultrapassa 5000 caracteres. Resuma um segmento antes de adicioná-lo.', sensitive: 'A transcrição pode conter chaves ou dados privados. Não a adicionei; revise o áudio e escreva uma versão segura.' },
};
const selectionCopy = {
  es: 'Los campos que ya tienen datos quedan sin seleccionar. Si querés reemplazarlos, marcá la propuesta y revisá la diferencia antes de aplicarla.',
  en: 'Fields that already contain data stay unselected. To replace them, select the proposal and review the difference before applying it.',
  pt: 'Campos que já têm dados ficam desmarcados. Para substituí-los, selecione a proposta e revise a diferença antes de aplicá-la.',
};
const nextTurnCopy = {
  es: { review: 'Primero revisemos mi propuesta para {field}; salió de tu frase citada. Todavía no está guardada.', clarify: 'Ya hay un dato para {field} y tu relato sugiere otro. ¿Cuál es el correcto? No lo reemplazaré sin que lo revises.', ask: 'Para seguir, contame una sola cosa: {field}. Si todavía no lo sabés, podemos dejarlo pendiente.', summary: 'Con estos datos podemos revisar juntos el borrador. Si tenés dudas, te explico cualquier parte.' },
  en: { review: 'First, let us review my suggestion for {field}; it came from your quoted words. It is not saved yet.', clarify: 'There is already a value for {field}, and your account suggests another. Which is correct? I will not replace it without your review.', ask: 'To continue, tell me one thing: {field}. We can leave it pending if you do not know yet.', summary: 'We can review the draft together now. I can explain any part.' },
  pt: { review: 'Primeiro, vamos revisar minha sugestão para {field}; ela veio da sua frase citada. Ainda não foi salva.', clarify: 'Já existe um dado para {field}, e seu relato sugere outro. Qual está correto? Não vou substituí-lo sem sua revisão.', ask: 'Para continuar, conte-me uma coisa: {field}. Podemos deixar pendente se você ainda não souber.', summary: 'Podemos revisar o rascunho juntos agora. Posso explicar qualquer parte.' },
};
const narrativeCopy = {
  es: { review: 'Conservar mi relato en el borrador', intro: 'Puedo conservar tus palabras en las notas privadas del expediente. Revisá el texto completo antes de aplicarlo; después se guardará automáticamente.', preview: 'Relato que quedará en el borrador', apply: 'Aplicar relato al borrador', applied: 'El relato quedó en el borrador. Estoy guardando los cambios.', duplicate: 'Este relato ya está incluido en las notas del borrador.', tooLong: 'Las notas juntas superan 5000 caracteres. Resumí o quitá una parte antes de conservarlas.', sensitive: 'El relato podría contener claves o datos privados. Retiralos antes de conservarlo.', empty: 'Primero contame algo del sitio.', stale: 'Las notas del expediente cambiaron. Revisá de nuevo antes de aplicarlas.' },
  en: { review: 'Keep my account in the draft', intro: 'I can keep your words in the dossier’s private notes. Review the full text before applying it; it will then save automatically.', preview: 'Account to add to the draft', apply: 'Apply account to draft', applied: 'Your account is in the draft. I am saving the changes.', duplicate: 'This account is already in the draft notes.', tooLong: 'The combined notes exceed 5000 characters. Shorten or remove a part before keeping them.', sensitive: 'The account may include keys or private data. Remove them before keeping it.', empty: 'First, tell me something about the site.', stale: 'The dossier notes changed. Review them again before applying.' },
  pt: { review: 'Conservar meu relato no rascunho', intro: 'Posso conservar suas palavras nas notas privadas do dossiê. Revise o texto completo antes de aplicá-lo; depois será salvo automaticamente.', preview: 'Relato que ficará no rascunho', apply: 'Aplicar relato ao rascunho', applied: 'O relato está no rascunho. Estou salvando as alterações.', duplicate: 'Este relato já está nas notas do rascunho.', tooLong: 'As notas juntas ultrapassam 5000 caracteres. Resuma ou remova uma parte antes de conservá-las.', sensitive: 'O relato pode conter chaves ou dados privados. Remova-os antes de conservá-lo.', empty: 'Primeiro, conte-me algo sobre o site.', stale: 'As notas do dossiê mudaram. Revise-as novamente antes de aplicar.' },
};
const copy = {
  es: { title: 'Copilot inteligente', intro: 'Contame con tus palabras qué hace tu sitio y qué necesitás. El copilot propone datos; vos decidís qué incorporar.', privacy: 'Lo que escribís se autoguarda como relato privado de trabajo. Al pedir ayuda, tu texto o audio se procesa con Workers AI en Cloudflare. No incluyas claves ni datos privados. El audio no se guarda en el expediente; nada se publica automáticamente.', consent: 'Entiendo y acepto enviar este texto o segmento de audio a Workers AI en Cloudflare. Confirmo cada envío por separado.', grant: 'Activar ayuda con IA para este expediente', revoke: 'Revocar permiso para este expediente', granted: 'La ayuda con IA está autorizada para este expediente. Confirmás cada envío por separado.', revoked: 'El permiso está revocado. Podés seguir con la guía o volver a activarlo cuando quieras.', consentUnavailable: 'No pude comprobar el permiso. El copilot seguirá cerrado hasta que podamos hacerlo.', ask: 'Preparar propuestas', busy: 'Pensando con vos…', unavailable: 'El copilot no está disponible ahora. Podés seguir con la guía del expediente.', session: 'Tu sesión necesita renovarse. Conservá esta pestaña y volvé a iniciar sesión antes de reintentar.', projectUnavailable: 'No encuentro este expediente con tu sesión. Revisá que estés en el expediente correcto; no se aplicó ningún cambio.', rateLimited: 'Llegaste al límite temporal de consultas. Esperá un minuto o seguí con la guía del expediente.', review: 'Revisar cambios', apply: 'Aplicar al borrador', stale: 'El formulario cambió. Volvé a revisar las propuestas.', empty: 'No encontré datos suficientemente claros. Podés contármelo de otra forma.', source: 'Lo escribiste así', evidence: 'Esta propuesta sale de tu texto; todavía no verificamos ese dato en tu sitio.', applied: 'Aplicado al borrador. Se guarda automáticamente.' },
  en: { title: 'Intelligent copilot', intro: 'Tell me in your own words what your site does and what you need. The copilot proposes details; you decide what to include.', privacy: 'What you type is autosaved as a private working account. When you ask for help, your text or audio is processed with Workers AI on Cloudflare. Do not include keys or private data. Audio is not saved to your dossier; nothing is published automatically.', consent: 'I agree to send this text or audio segment to Workers AI on Cloudflare. I confirm each submission separately.', grant: 'Enable AI help for this dossier', revoke: 'Revoke permission for this dossier', granted: 'AI help is authorized for this dossier. You confirm each submission separately.', revoked: 'Permission is revoked. You can continue with the guide or enable it again whenever you choose.', consentUnavailable: 'I could not verify permission. The copilot stays closed until I can.', ask: 'Prepare suggestions', busy: 'Thinking with you…', unavailable: 'The copilot is unavailable right now. You can continue with the dossier guide.', session: 'Your session needs to be renewed. Keep this tab open and sign in again before retrying.', projectUnavailable: 'I cannot find this dossier in your session. Check that you opened the right one; no changes were applied.', rateLimited: 'You have reached the temporary request limit. Wait a minute or continue with the dossier guide.', review: 'Review changes', apply: 'Apply to draft', stale: 'The form changed. Review the suggestions again.', empty: 'I could not find clear enough details. You can rephrase them.', source: 'You wrote', evidence: 'This suggestion comes from your text; we have not verified it on your website.', applied: 'Applied to the draft. It saves automatically.' },
  pt: { title: 'Copilot inteligente', intro: 'Conte com suas palavras o que seu site faz e do que precisa. O copilot propõe dados; você decide o que incluir.', privacy: 'O que você escreve é salvo automaticamente como relato privado de trabalho. Ao pedir ajuda, seu texto ou áudio é processado com Workers AI na Cloudflare. Não inclua chaves nem dados privados. O áudio não é salvo no dossiê; nada é publicado automaticamente.', consent: 'Aceito enviar este texto ou segmento de áudio ao Workers AI na Cloudflare. Confirmo cada envio separadamente.', grant: 'Ativar ajuda com IA para este dossiê', revoke: 'Revogar permissão para este dossiê', granted: 'A ajuda com IA está autorizada para este dossiê. Você confirma cada envio separadamente.', revoked: 'A permissão foi revogada. Você pode seguir com o guia ou ativá-la novamente quando quiser.', consentUnavailable: 'Não consegui verificar a permissão. O copilot permanece fechado até que eu consiga.', ask: 'Preparar sugestões', busy: 'Pensando com você…', unavailable: 'O copilot não está disponível agora. Você pode continuar com o guia.', session: 'Sua sessão precisa ser renovada. Mantenha esta aba aberta e entre novamente antes de tentar de novo.', projectUnavailable: 'Não encontro este dossiê na sua sessão. Confira se abriu o correto; nenhuma alteração foi aplicada.', rateLimited: 'Você atingiu o limite temporário de consultas. Aguarde um minuto ou continue com o guia.', review: 'Revisar alterações', apply: 'Aplicar ao rascunho', stale: 'O formulário mudou. Revise as sugestões novamente.', empty: 'Não encontrei dados suficientemente claros. Você pode reformular.', source: 'Você escreveu', evidence: 'Esta sugestão vem do seu texto; ainda não verificamos esse dado no seu site.', applied: 'Aplicado ao rascunho. É salvo automaticamente.' },
};

export function IntakeIntelligentCopilot({ projectId, dossierRevision, locale, draft, onApply, onReviewDelivery, onWorkingPendingChange, onRegisterWorkingSave, onRegisterWorkingExit }: { projectId: string; dossierRevision: number; locale: Locale; draft: Draft; onApply: (draft: Draft, sourceValues?: Record<string, string | string[]>) => void; onReviewDelivery?: () => void; onWorkingPendingChange?: (pending: boolean) => void; onRegisterWorkingSave?: (save: (() => Promise<boolean>) | null) => void; onRegisterWorkingExit?: (allow: (() => void) | null) => void }) {
  const t = copy[locale];
  const v = voiceCopy[locale];
  const n = narrativeCopy[locale];
  const labels = dossierFieldLabels(locale);
  const label = (field: string) => field in labels ? labels[field as keyof typeof labels] : field;
  const [notes, setNotes] = useState('');
  const [session, setSession] = useState<Session>(emptyCopilotSession);
  const currentSession = useRef(session);
  useEffect(() => { currentSession.current = session; }, [session]);
  const recoveredResult = visibleSessionResult(session, draft);
  const result: Result | null = recoveredResult ? { ...recoveredResult, warning: t.evidence } : null;
  function setResult(value: Result | null) { setSession(current => ({ ...current, basedOnRevision: dossierRevision, pending: value ? { suggestions: value.suggestions, goalGuidance: value.goalGuidance || null } : null })); }
  function resetNarrativeDecisions() { setSession(current => ({ ...current, pending: null, decisions: [] })); }
  function decide(field: string, choice: 'discarded' | 'applied_to_draft') { setSession(current => ({ ...current, basedOnRevision: dossierRevision, decisions: [...current.decisions.filter(item => item.field !== field), { field, choice }].slice(-32) })); }
  const goalProposal = reviewedGoalProposal({ goalGuidance: result?.goalGuidance, currentGoals: draft.goals });
  const reviewGoalCopy = { es: 'Revisar esta interpretación del objetivo', en: 'Review this goal interpretation', pt: 'Revisar esta interpretação do objetivo' }[locale];
  const [fieldHistory, setFieldHistory] = useState<Record<string, { revision: number; savedAt: string; source?: string }>>({});
  const nextTurn = planCopilotNextTurn(draft, result, session.deferred, { revision: dossierRevision });
  const nextTurnField = nextTurn && 'field' in nextTurn && typeof nextTurn.field === 'string' ? nextTurn.field : '';
  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetch(`/api/projects/${encodeURIComponent(projectId)}/field-history`, { cache: 'no-store', signal: controller.signal })
      .then(async response => response.ok ? await response.json() as { fields?: Record<string, { revision: number; savedAt: string; source?: string }> } : null)
      .then(payload => { if (!controller.signal.aborted && payload?.fields && typeof payload.fields === 'object') setFieldHistory(payload.fields); })
      .catch(() => {});
    return () => controller.abort();
  }, [projectId, dossierRevision]);
  const [selected, setSelected] = useState<string[]>([]);
  const [changes, setChanges] = useState<ReturnType<typeof previewIntakeDraft> | null>(null);
  const [narrativeChanges, setNarrativeChanges] = useState<ReturnType<typeof previewIntakeDraft> | null>(null);
  const [narrativeStatus, setNarrativeStatus] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [clip, setClip] = useState<Blob | null>(null);
  const [clipUrl, setClipUrl] = useState('');
  const [transcriptDraft, setTranscriptDraft] = useState('');
  const [audioBusy, setAudioBusy] = useState(false);
  const [audioStatus, setAudioStatus] = useState('');
  const recorder = useRef<MediaRecorder | null>(null);
  const audioRequest = useRef<AbortController | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const recordingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const discardRecording = useRef(false);
  const clipUrlRef = useRef('');
  const [processingConsent, setProcessingConsent] = useState(false);
  const [consentState, setConsentState] = useState<{ projectId: string; value: 'loading' | 'granted' | 'revoked' | 'error' }>({ projectId, value: 'loading' });
  const projectConsent = consentState.projectId === projectId ? consentState.value : 'loading';
  const setProjectConsent = (value: 'loading' | 'granted' | 'revoked' | 'error') => setConsentState({ projectId, value });
  const [consentBusy, setConsentBusy] = useState(false);
  const requestEpoch = useRef(0);
  const reviewEpoch = useRef(-1);
  const narrativeEpoch = useRef(-1);
  const currentNotes = useRef(notes);
  const allowNavigation = useRef(false);
  useEffect(() => { allowNavigation.current = false; }, [notes]);
  const [workingSaved, setWorkingSaved] = useState<WorkingDraft>({ text: '', revision: 0, session: emptyCopilotSession() });
  const [workingState, setWorkingState] = useState<'loading' | 'ready' | 'saving' | 'error' | 'conflict'>('loading');
  const [workingConflict, setWorkingConflict] = useState<WorkingDraft | null>(null);
  const workingDirty = notes !== workingSaved.text || JSON.stringify(session) !== JSON.stringify(workingSaved.session);
  const [workingRetry, setWorkingRetry] = useState(0);
  function recoverWorking() {
    if (!workingConflict) return;
    requestEpoch.current += 1;
    currentNotes.current = workingConflict.text;
    setNotes(workingConflict.text); setSession(workingConflict.session); setWorkingSaved(workingConflict);
    setWorkingConflict(null); setChanges(null); setNarrativeChanges(null); setSelected([]); setStatus(''); setNarrativeStatus(''); setBusy(false); setProcessingConsent(false); setWorkingState('ready');
  }
  const workingInFlight = useRef<Promise<boolean> | null>(null);
  const workingCopy = {
    es: { saved: 'Tu relato de trabajo está guardado en privado. Aún no es un dato del expediente.', pending: 'Guardando tu relato de trabajo…', error: 'No pude guardar este relato. Seguí en esta pestaña o reintentá; no se agregó al expediente.', sensitive: 'No guardé este texto porque podría contener claves o credenciales. Quitalas antes de continuar.', conflict: 'Otra pestaña cambió este relato. Elegí qué versión conservar antes de seguir.', keep: 'Conservar lo que escribí aquí', recover: 'Recuperar la otra versión', retry: 'Reintentar guardado', loading: 'Recuperando tu relato privado…', clear: 'Borrar relato de trabajo' },
    en: { saved: 'Your working account is saved privately. It is not yet a dossier fact.', pending: 'Saving your working account…', error: 'I could not save this account. Keep this tab open or retry; it has not been added to the dossier.', sensitive: 'I did not save this text because it may contain credentials. Remove them to continue.', conflict: 'Another tab changed this account. Choose which version to keep.', keep: 'Keep what I wrote here', recover: 'Recover the other version', retry: 'Retry save', loading: 'Recovering your private account…', clear: 'Clear working account' },
    pt: { saved: 'Seu relato de trabalho está salvo em privado. Ainda não é um dado do dossiê.', pending: 'Salvando seu relato de trabalho…', error: 'Não consegui salvar este relato. Mantenha esta aba aberta ou tente novamente; ele não foi adicionado ao dossiê.', sensitive: 'Não salvei este texto porque pode conter senhas ou credenciais. Remova-as para continuar.', conflict: 'Outra aba alterou este relato. Escolha qual versão manter.', keep: 'Manter o que escrevi aqui', recover: 'Recuperar a outra versão', retry: 'Tentar salvar novamente', loading: 'Recuperando seu relato privado…', clear: 'Apagar relato de trabalho' },
  }[locale];
  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetch(`/api/projects/${projectId}/copilot/working-draft`, { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('read_failed');
        const payload = await response.json() as { draft?: Partial<WorkingDraft> };
        if (controller.signal.aborted) return;
        const recovered = { text: payload.draft?.text || '', revision: payload.draft?.revision || 0, session: payload.draft?.session || emptyCopilotSession() };
        setWorkingSaved(recovered);
        if (!currentNotes.current && !currentSession.current.pending && !currentSession.current.deferred.length && !currentSession.current.decisions.length) { currentNotes.current = recovered.text; setNotes(recovered.text); setSession(recovered.session); setWorkingState('ready'); }
        else if (currentNotes.current !== recovered.text || JSON.stringify(currentSession.current) !== JSON.stringify(recovered.session)) { setWorkingConflict(recovered); setWorkingState('conflict'); }
        else setWorkingState('ready');
      }).catch(error => { if (!(error instanceof DOMException && error.name === 'AbortError')) setWorkingState('error'); });
    return () => controller.abort();
  }, [projectId, workingRetry]);
  const saveWorkingNow = useCallback(async () => {
    if (workingInFlight.current) return workingInFlight.current;
    if (workingState !== 'ready' || !projectId) return false;
    if (!workingDirty) return true;
    const input = { text: notes, session, revision: workingSaved.revision, mutationKey: crypto.randomUUID(), locale };
    if (!validateCopilotWorkingDraft(input).ok) { setWorkingState('error'); return false; }
    const write = (async () => {
      setWorkingState('saving');
      try {
        const response = await fetch(`/api/projects/${projectId}/copilot/working-draft`, {
          method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input),
        });
        const payload = await response.json() as { code?: string; draft?: WorkingDraft };
        if (response.status === 409 && payload.draft) { setWorkingConflict(payload.draft); setWorkingState('conflict'); return false; }
        if (!response.ok || !payload.draft) throw new Error(payload.code || 'save_failed');
        setWorkingSaved(payload.draft);
        setWorkingState('ready');
        return currentNotes.current === input.text && JSON.stringify(currentSession.current) === JSON.stringify(input.session);
      } catch { setWorkingState('error'); return false; }
    })();
    workingInFlight.current = write;
    try { return await write; } finally { workingInFlight.current = null; }
  }, [workingState, notes, session, workingDirty, workingSaved, projectId, locale]);
  useEffect(() => {
    if (workingState !== 'ready' || !workingDirty || !projectId) return;
    const timer = window.setTimeout(() => { void saveWorkingNow(); }, 900);
    return () => window.clearTimeout(timer);
  }, [workingState, workingDirty, projectId, saveWorkingNow]);
  useEffect(() => { onWorkingPendingChange?.(workingDirty || workingState !== 'ready'); }, [workingDirty, workingState, onWorkingPendingChange]);
  useEffect(() => { onRegisterWorkingSave?.(saveWorkingNow); return () => onRegisterWorkingSave?.(null); }, [saveWorkingNow, onRegisterWorkingSave]);
  useEffect(() => { onRegisterWorkingExit?.(() => { allowNavigation.current = true; }); return () => onRegisterWorkingExit?.(null); }, [onRegisterWorkingExit]);
  useEffect(() => {
    if (!workingDirty && workingState === 'ready') return;
    const warn = (event: BeforeUnloadEvent) => { if (!allowNavigation.current) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [workingState, workingDirty]);
  useEffect(() => () => {
    discardRecording.current = true;
    audioRequest.current?.abort();
    if (recordingTimer.current) clearTimeout(recordingTimer.current);
    if (recorder.current?.state === 'recording') recorder.current.stop();
    stream.current?.getTracks().forEach(track => track.stop());
    if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current);
  }, []);
  function clearClip() {
    if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current);
    clipUrlRef.current = ''; setClipUrl(''); setClip(null);
  }
  async function startRecording() {
    setAudioStatus(''); setTranscriptDraft(''); clearClip();
    discardRecording.current = false;
    if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia) { setAudioStatus(v.unsupported); return; }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (discardRecording.current) { mediaStream.getTracks().forEach(track => track.stop()); return; }
      stream.current = mediaStream;
      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(type => MediaRecorder.isTypeSupported(type));
      if (!mimeType) { mediaStream.getTracks().forEach(track => track.stop()); setAudioStatus(v.unsupported); return; }
      const mediaRecorder = new MediaRecorder(mediaStream, { mimeType });
      recorder.current = mediaRecorder;
      const pieces: Blob[] = [];
      mediaRecorder.ondataavailable = event => { if (event.data.size) pieces.push(event.data); };
      mediaRecorder.onstop = () => {
        mediaStream.getTracks().forEach(track => track.stop()); stream.current = null;
        if (recordingTimer.current) clearTimeout(recordingTimer.current);
        const blob = new Blob(pieces, { type: mimeType });
        if (blob.size && !discardRecording.current) { const url = URL.createObjectURL(blob); clipUrlRef.current = url; setClipUrl(url); setClip(blob); setAudioStatus(v.ready); }
        setRecording(false);
      };
      mediaRecorder.start(); setRecording(true);
      recordingTimer.current = setTimeout(() => { if (mediaRecorder.state === 'recording') mediaRecorder.stop(); }, 30_000);
    } catch { stream.current?.getTracks().forEach(track => track.stop()); stream.current = null; setAudioStatus(v.microphone); }
  }
  function stopRecording() { if (recorder.current?.state === 'recording') recorder.current.stop(); }
  async function transcribeAudio() {
    if (!clip || !processingConsent || projectConsent !== 'granted') { setAudioStatus(v.consent); return; }
    if (clip.size > 2_000_000) { setAudioStatus(v.failed); clearClip(); return; }
    setAudioBusy(true); setAudioStatus(''); setProcessingConsent(false);
    const epoch = requestEpoch.current;
    const controller = new AbortController(); audioRequest.current = controller;
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}/copilot/audio`, { method: 'POST', cache: 'no-store', headers: { 'content-type': clip.type, 'x-afw-locale': locale, 'x-afw-processing-consent': 'afw-copilot-processing-v1' }, body: clip, signal: controller.signal });
      if (controller.signal.aborted || epoch !== requestEpoch.current) return;
      const kind = classifyCopilotResponse(response);
      if (kind !== 'ok') { setAudioStatus(kind === 'rate_limited' ? t.rateLimited : kind === 'session' ? t.session : kind === 'project_unavailable' ? t.projectUnavailable : v.failed); return; }
      const answer = await response.json() as { text: string };
      if (controller.signal.aborted || epoch !== requestEpoch.current) return;
      setTranscriptDraft(answer.text); clearClip();
    } catch { if (!controller.signal.aborted) setAudioStatus(v.failed); } finally { if (audioRequest.current === controller) audioRequest.current = null; setAudioBusy(false); }
  }
  function addTranscript() {
    const checked = analyzeIntakeNotes(transcriptDraft, locale);
    if (checked.blocked) { setAudioStatus(v.sensitive); return; }
    const next = appendVoiceSegment(notes, transcriptDraft);
    if (!next) { setAudioStatus(v.tooLong); return; }
    currentNotes.current = next; requestEpoch.current += 1; setNotes(next); setTranscriptDraft(''); resetNarrativeDecisions(); setChanges(null); setNarrativeChanges(null); setNarrativeStatus(''); setStatus(''); setAudioStatus('');
  }
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
      if (!value.granted) { discardRecording.current = true; audioRequest.current?.abort(); stopRecording(); clearClip(); setTranscriptDraft(''); requestEpoch.current += 1; setResult(null); setChanges(null); setBusy(false); }
    } catch { setProjectConsent('error'); setStatus(t.consentUnavailable); }
    finally { setConsentBusy(false); }
  }
  async function ask() {
    const safety = analyzeIntakeNotes(notes, locale);
    if (safety.blocked || !notes.trim() || !processingConsent || projectConsent !== 'granted') { setResult(null); setStatus(safety.warning || t.consentUnavailable); return; }
    const submittedNotes = notes;
    const epoch = ++requestEpoch.current;
    const isCurrent = () => epoch === requestEpoch.current && currentNotes.current === submittedNotes;
    setBusy(true); setProcessingConsent(false); setStatus(''); setChanges(null);
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
      setResult(answer); setSelected(defaultCopilotSelection(answer.suggestions,draft));
    } catch { if (isCurrent()) setStatus(t.unavailable); } finally { if (isCurrent()) setBusy(false); }
  }
  return <section className="assistant-prototype" aria-label={t.title}>
      <p role="status" className="assistant-privacy">{workingState === 'loading' ? workingCopy.loading : workingState === 'saving' || workingState === 'ready' && workingDirty ? workingCopy.pending : workingState === 'conflict' ? workingCopy.conflict : workingState === 'error' ? validateCopilotWorkingDraft({ text: notes, revision: workingSaved.revision, mutationKey: '00000000-0000-4000-8000-000000000000', locale }).code === 'sensitive_working_draft' ? workingCopy.sensitive : workingCopy.error : workingCopy.saved}</p>
    <details className="assistant-input-panel"><summary>{locale === 'en' ? 'Tell me in text or audio' : locale === 'pt' ? 'Contar por texto ou áudio' : 'Contármelo con texto o audio'}</summary><h2>{t.title}</h2><p>{t.intro}</p>
      <label>{t.title}<textarea rows={5} maxLength={5000} value={notes} onChange={event => { requestEpoch.current += 1; currentNotes.current = event.target.value; setNotes(event.target.value); setProcessingConsent(false); resetNarrativeDecisions(); setChanges(null); setNarrativeChanges(null); setNarrativeStatus(''); setStatus(''); setBusy(false); }} /></label>

      {workingState === 'error' ? <button type="button" className="secondary-action" onClick={() => { setWorkingState('loading'); setWorkingRetry(value => value + 1); }}>{workingCopy.retry}</button> : null}
      {notes && workingState === 'ready' ? <button type="button" className="secondary-action" onClick={() => { currentNotes.current = ''; setNotes(''); setSession(emptyCopilotSession()); setChanges(null); setNarrativeChanges(null); }}>{workingCopy.clear}</button> : null}
      {workingState === 'conflict' && workingConflict ? <div className="assistant-guidance"><button type="button" className="secondary-action" onClick={recoverWorking}>{workingCopy.recover}</button><button type="button" className="secondary-action" onClick={() => { setWorkingSaved(workingConflict); setWorkingConflict(null); setWorkingState('ready'); }}>{workingCopy.keep}</button></div> : null}
      <button type="button" className="secondary-action" disabled={!notes.trim()} onClick={() => { try { const preview = previewCopilotNarrative(draft, notes, locale); narrativeEpoch.current = requestEpoch.current; setNarrativeChanges(preview); setNarrativeStatus(preview.length ? '' : n.duplicate); } catch (error) { setNarrativeChanges(null); setNarrativeStatus(error instanceof Error && error.message === 'too_long' ? n.tooLong : error instanceof Error && error.message === 'sensitive' ? n.sensitive : n.empty); } }}>{n.review}</button>
      {narrativeStatus ? <p role="status">{narrativeStatus}</p> : null}
      {narrativeChanges?.length ? <div className="assistant-guidance"><p>{n.intro}</p><label>{n.preview}<textarea rows={6} readOnly value={String(narrativeChanges[0].after)} /></label><button type="button" className="primary-action" onClick={() => { try { onApply(applyCopilotReview(draft, narrativeChanges, narrativeEpoch.current, requestEpoch.current)); setNarrativeChanges(null); setNarrativeStatus(n.applied); } catch { setNarrativeChanges(null); setNarrativeStatus(n.stale); } }}>{n.apply}</button></div> : null}
      <p className="assistant-privacy">{t.privacy}</p>
      {projectConsent === 'granted' ? <><p className="assistant-privacy">{t.granted}</p><button type="button" className="secondary-action" disabled={consentBusy} onClick={() => changeProjectConsent('revoke')}>{t.revoke}</button></> : <><p className="assistant-privacy">{projectConsent === 'revoked' ? t.revoked : t.consentUnavailable}</p><button type="button" className="secondary-action" disabled={consentBusy || projectConsent === 'loading'} onClick={() => changeProjectConsent('grant')}>{t.grant}</button></>}
      <label className="assistant-privacy"><input type="checkbox" checked={processingConsent} disabled={projectConsent !== 'granted' || consentBusy} onChange={event => setProcessingConsent(event.target.checked)} /> {t.consent}</label>
      <div className="assistant-voice-panel"><h3>{v.title}</h3><p>{v.intro}</p>
        <button type="button" className="secondary-action" disabled={audioBusy || projectConsent !== 'granted' || (!recording && (!!clip || !!transcriptDraft))} onClick={recording ? stopRecording : startRecording}>{recording ? v.stop : v.start}</button>
        {clipUrl ? <><audio controls src={clipUrl} /><p>{v.ready}</p>{!processingConsent ? <p>{v.consent}</p> : null}<button type="button" className="secondary-action" disabled={audioBusy || !processingConsent} onClick={transcribeAudio}>{v.send}</button><button type="button" className="secondary-action" disabled={audioBusy} onClick={() => { clearClip(); setAudioStatus(''); }}>{v.discard}</button></> : null}
        {transcriptDraft ? <><label>{v.transcript}<textarea rows={4} maxLength={5000} value={transcriptDraft} onChange={event => setTranscriptDraft(event.target.value)} /></label><button type="button" className="secondary-action" onClick={addTranscript}>{v.add}</button></> : null}
        {audioStatus ? <p role="status">{audioStatus}</p> : null}
      </div>
      <button type="button" className="primary-action" disabled={busy || consentBusy || projectConsent !== 'granted' || !notes.trim() || !processingConsent} onClick={ask}>{busy ? t.busy : t.ask}</button>
    </details>
    <div className="assistant-review-panel" aria-live="polite">
      {status ? <p role="status">{status}</p> : null}
      {nextTurn.kind === 'summary' ? <div className="assistant-guidance"><p>{label('organization')}: {String(draft.organization || '—')}</p><p>{label('goals')}: {dossierValueLabel('goals', draft.goals || [], locale)}</p><p>{label('contentSources')}: {dossierValueLabel('contentSources', draft.contentSources || [], locale)}</p>{'actionId' in nextTurn && nextTurn.actionId === 'review_scope' ? <button type="button" className="primary-action" onClick={onReviewDelivery}>{locale === 'en' ? 'Review delivery and verification' : locale === 'pt' ? 'Revisar entrega e verificação' : 'Revisar entrega y comprobación'}</button> : null}</div> : null}
      {nextTurn.kind === 'ask' && nextTurnField ? <CopilotTurnAnswer key={nextTurnField} field={nextTurnField} draft={draft} locale={locale} onApply={onApply} /> : null}
      {nextTurnField ? <button type="button" className="secondary-action" onClick={() => { if (nextTurn.kind === 'review' || nextTurn.kind === 'clarify') decide(nextTurnField, 'discarded'); else setSession(current => ({ ...current, deferred: [...new Set([...current.deferred, nextTurnField])] })); setChanges(null); }}>{locale === 'en' ? 'Leave this for later' : locale === 'pt' ? 'Deixar para depois' : 'Dejarlo para después'}</button> : null}
      {session.deferred.length ? <button type="button" className="secondary-action" onClick={() => setSession(current => ({ ...current, deferred: [] }))}>{locale === 'en' ? 'Return to pending questions' : locale === 'pt' ? 'Retomar perguntas pendentes' : 'Retomar preguntas pendientes'}</button> : null}
        {nextTurn ? <p role="status" className="assistant-guidance">{nextTurnCopy[locale][nextTurn.kind as keyof typeof nextTurnCopy.es].replace('{field}', nextTurnField ? label(nextTurnField) : '')}{nextTurn.kind === 'clarify' && nextTurnField && fieldHistory[nextTurnField] ? ` ${fieldHistory[nextTurnField].source === 'copilot_reviewed' ? locale === 'en' ? 'You previously reviewed a copilot suggestion for this field; that does not verify the website.' : locale === 'pt' ? 'Você já revisou uma sugestão do copilot para este campo; isso não verifica o site.' : 'Antes revisaste una propuesta del copilot para este dato; eso no verifica el sitio.' : locale === 'en' ? 'The dossier records a previous change to this field; let us check it together.' : locale === 'pt' ? 'O dossiê registra uma alteração anterior neste campo; vamos conferi-la juntos.' : 'El expediente registra un cambio anterior en este dato; revisémoslo juntos.'}` : ''}</p> : null}
      {result ? <><p>{result.suggestions.length || result.goalGuidance ? result.warning : t.empty}</p>{nextTurnField === 'goals' && goalProposal && result.goalGuidance ? <div className="assistant-guidance"><p>{goalGuidanceCopy[locale].intro}</p><p><em>{t.source}: {result.goalGuidance.sourceExcerpt}</em></p><p>{goalGuidanceCopy[locale][result.goalGuidance.mode]}</p><p>{label('goals')}: {dossierValueLabel('goals', goalProposal.value, locale)}</p><button type="button" className="secondary-action" onClick={() => { try { reviewEpoch.current = requestEpoch.current; setChanges(previewIntakeDraft(draft, { suggestions: [goalProposal] }, ['goals'])); setStatus(''); } catch { setChanges(null); setStatus(t.stale); } }}>{reviewGoalCopy}</button></div> : null}{result.suggestions.length ? <><p>{t.evidence}</p><p>{selectionCopy[locale]}</p></> : null}
        <div className="assistant-suggestion-list">{result.suggestions.filter(item => item.field === nextTurnField).map(item => <label key={item.field}>
          <input type="checkbox" checked={selected.includes(item.field)} onChange={() => { setSelected(current => current.includes(item.field) ? current.filter(value => value !== item.field) : [...current, item.field]); setChanges(null); }} />
          <span><strong>{label(item.field)}</strong><small>{dossierValueLabel(item.field, item.value, locale)}</small><em>{t.source}: {item.sourceExcerpt}</em></span>
        </label>)}</div>
        <button type="button" className="secondary-action" disabled={!selected.some(field => field === nextTurnField)} onClick={() => { try { reviewEpoch.current = requestEpoch.current; setChanges(previewIntakeDraft(draft, result, selected.filter(field => field === nextTurnField))); setStatus(''); } catch { setChanges(null); setStatus(t.stale); } }}>{t.review}</button>
        {changes ? <div><ul>{changes.map((change: { field: string; after: string | string[] }) => <li key={change.field}>{label(change.field)}: {dossierValueLabel(change.field, change.after, locale)}</li>)}</ul>
          <button type="button" className="primary-action" disabled={!changes.length} onClick={() => { try { onApply(applyCopilotReview(draft, changes, reviewEpoch.current, requestEpoch.current), Object.fromEntries(changes.map((change: { field: string; after: string | string[] }) => [change.field, change.after]))); changes.forEach((change: { field: string }) => decide(change.field, 'applied_to_draft')); setChanges(null); setStatus(t.applied); } catch { setChanges(null); setStatus(t.stale); } }}>{t.apply}</button></div> : null}
      </> : null}
    </div>
  </section>;
}
