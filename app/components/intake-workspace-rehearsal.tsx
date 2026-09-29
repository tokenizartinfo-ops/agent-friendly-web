'use client';

import { useMemo, useState } from 'react';
import { IntakeWorkspace } from './intake-workspace';
import { createIntakeRehearsal } from '../../lib/intake-workspace-rehearsal.mjs';

export function IntakeWorkspaceRehearsal() {
  const [locale, setLocale] = useState<'es' | 'en' | 'pt'>('es');
  const [transport] = useState(() => createIntakeRehearsal({ versioned: true, failInitialRead: typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('readFailure') === '1' }));
  const [autoSave, setAutoSave] = useState(false);
  const rehearsal = useMemo(() => ({ ...transport, autoSave }), [transport, autoSave]);
  const [failureArmed, setFailureArmed] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  return <>
    <header style={{ padding: 24 }}>
      <h1>Ensayo local del expediente</h1>
      {/* Full document navigation is intentional for the local beforeunload rehearsal. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/asistente">Salir del ensayo</a>
      <label><input type="checkbox" checked={autoSave} onChange={event => setAutoSave(event.target.checked)} /> Autoguardado simulado</label>
      <p>Cliente ficticio. Guardado solo en memoria, sin servidor, correo ni publicación. Recargar reinicia la prueba.</p>
      <label>Idioma del formulario <select value={locale} onChange={event => setLocale(event.target.value as 'es' | 'en' | 'pt')}><option value="es">ES</option><option value="en">EN</option><option value="pt">PT</option></select></label>
      <button className="secondary-action" onClick={() => { transport.failNext(); setFailureArmed(true); }}>Simular fallo del próximo guardado</button>
      {failureArmed ? <p role="status">Fallo programado para un solo intento. Después puedes reintentar el guardado.</p> : null}
      <button className="secondary-action" disabled={sessionExpired} onClick={() => { transport.expireSession(); setSessionExpired(true); }}>Simular sesión vencida</button>
      <button className="secondary-action" disabled={!sessionExpired} onClick={() => { transport.restoreSession(); setSessionExpired(false); }}>Restablecer sesión simulada</button>
      <button className="secondary-action" onClick={() => transport.simulateRemoteEdit()}>Simular cambio desde otra pestaña</button>
      <button className="secondary-action" onClick={() => transport.simulateRemoteWebsite()}>Simular cambio remoto de sitio</button>
      <button className="secondary-action" onClick={() => transport.loseNextResponse()}>Simular respuesta perdida después de guardar</button>
      <p role="status">{sessionExpired ? 'Sesión simulada vencida. El próximo guardado será rechazado.' : 'Sesión simulada disponible. Restablecerla no guarda el borrador: confirma el guardado cuando estés listo.'}</p>
    </header>
    <IntakeWorkspace userName="Cliente ficticio" userEmail="demo@example.invalid" locale={locale} rehearsal={rehearsal} />
  </>;
}
