'use client';

import { useEffect, useRef, useState } from 'react';

const messages = {
  es: ['Guardemos tus cambios antes de salir', 'Voy a esperar la confirmación del guardado. Si no se puede completar, seguirás aquí con tu borrador para resolverlo.', 'Seguir editando', 'Guardar y salir', 'Salir sin guardar', 'No pude confirmar el guardado. Tu borrador sigue en esta pestaña; revisá el aviso y volvé a intentarlo.'],
  en: ['Let us save your changes before leaving', 'I will wait for the save confirmation. If it cannot finish, your draft will stay here so you can resolve it.', 'Keep editing', 'Save and leave', 'Leave without saving', 'I could not confirm the save. Your draft remains in this tab; review the notice and try again.'],
  pt: ['Vamos salvar suas alterações antes de sair', 'Vou aguardar a confirmação. Se não for possível concluir, seu rascunho continuará aqui para você resolver.', 'Continuar editando', 'Salvar e sair', 'Sair sem salvar', 'Não consegui confirmar o salvamento. Seu rascunho continua nesta aba; confira o aviso e tente novamente.'],
};

export function DraftExitDialog({ locale, saving, onStay, onSaveLeave, onLeave }: { locale: 'es' | 'en' | 'pt'; saving: boolean; onStay: () => void; onSaveLeave: () => Promise<boolean>; onLeave: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stayButton = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const copy = messages[locale];
  useEffect(() => {
    const previous = document.activeElement;
    const node = dialog.current;
    node?.showModal();
    stayButton.current?.focus();
    return () => {
      node?.close();
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);
  return <dialog ref={dialog} aria-labelledby="draft-exit-title" aria-describedby="draft-exit-description"
    onCancel={event => { event.preventDefault(); onStay(); }}
    style={{ margin: 'auto', position: 'fixed', inset: 0, width: 'min(480px, calc(100vw - 32px))', boxSizing: 'border-box', maxHeight: 'calc(100dvh - 32px)', overflow: 'auto', padding: 24, border: '3px solid #181818', borderRadius: 8, color: '#181818', background: '#fff' }}>
    <h2 id="draft-exit-title" style={{ fontSize: 24, lineHeight: 1.25, margin: '0 0 16px', fontFamily: 'Arial, sans-serif' }}>{copy[0]}</h2>
    <p id="draft-exit-description" style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 24 }}>{copy[1]}</p>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <button ref={stayButton} type="button" disabled={submitting || saving} onClick={onStay} style={{ flex: '1 1 170px', minHeight: 48, padding: 12, fontSize: 16, fontWeight: 700, background: '#181818', color: '#fff', border: '2px solid #181818', borderRadius: 4 }}>{copy[2]}</button>
      <button type="button" disabled={submitting || saving} onClick={async () => { setSubmitting(true); setFailed(false); try { if (!await onSaveLeave()) setFailed(true); } catch { setFailed(true); } finally { setSubmitting(false); } }} style={{ flex: '1 1 170px', minHeight: 48, padding: 12, fontSize: 16, fontWeight: 700, background: '#fff', color: '#181818', border: '2px solid #181818', borderRadius: 4 }}>{submitting || saving ? '…' : copy[3]}</button>
    </div>
    {failed ? <p role="alert">{copy[5]}</p> : null}
    <button type="button" disabled={submitting || saving} onClick={onLeave} style={{ marginTop: 16, border: 0, background: 'transparent', textDecoration: 'underline', cursor: 'pointer' }}>{copy[4]}</button>
  </dialog>;
}
