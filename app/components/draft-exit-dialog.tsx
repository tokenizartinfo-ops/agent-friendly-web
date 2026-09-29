'use client';

import { useEffect, useRef } from 'react';

const messages = {
  es: ['Revisa tus cambios antes de salir', 'Los cambios pendientes pueden perderse. Si un autoguardado ya fue enviado, puede completarse aunque salgas. Salir no deshace lo guardado.', 'Seguir editando', 'Salir ahora'],
  en: ['Review your changes before leaving', 'Pending changes may be lost. An autosave already sent may finish even if you leave. Leaving does not undo saved changes.', 'Keep editing', 'Leave now'],
  pt: ['Revise suas alterações antes de sair', 'Alterações pendentes podem ser perdidas. Um salvamento automático já enviado pode terminar mesmo após sair. Sair não desfaz o que foi salvo.', 'Continuar editando', 'Sair agora'],
};

export function DraftExitDialog({ locale, onStay, onLeave }: { locale: 'es' | 'en' | 'pt'; onStay: () => void; onLeave: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stayButton = useRef<HTMLButtonElement>(null);
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
      <button ref={stayButton} type="button" onClick={onStay} style={{ flex: '1 1 170px', minHeight: 48, padding: 12, fontSize: 16, fontWeight: 700, background: '#181818', color: '#fff', border: '2px solid #181818', borderRadius: 4 }}>{copy[2]}</button>
      <button type="button" onClick={onLeave} style={{ flex: '1 1 170px', minHeight: 48, padding: 12, fontSize: 16, fontWeight: 700, background: '#fff', color: '#181818', border: '2px solid #181818', borderRadius: 4 }}>{copy[3]}</button>
    </div>
  </dialog>;
}
