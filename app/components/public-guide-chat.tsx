'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Bot, ExternalLink, RotateCcw, ShieldCheck, UserRound } from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { PUBLIC_GUIDE_INITIAL_CONTEXT, respondToPublicGuide } from '../../lib/public-guide.mjs';

type GuideSource = { id: string; title: string; url: string };
type GuideContext = { topic: string | null; mode: 'simple' | 'standard' | 'detailed'; pending_follow_up: string | null };
type GuideTurn = {
  contract: string;
  topic: string;
  mode: GuideContext['mode'];
  blocked: boolean;
  answer: string;
  quick_replies: string[];
  sources: GuideSource[];
  next_context: GuideContext;
};
type ChatMessage = { id: number; role: 'visitor'; text: string } | { id: number; role: 'guide'; turn: GuideTurn };

function initialTurn(): GuideTurn {
  return respondToPublicGuide({ message: '', context: PUBLIC_GUIDE_INITIAL_CONTEXT });
}

export function PublicGuideChat() {
  const first = useMemo(() => initialTurn(), []);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, role: 'guide', turn: first }]);
  const [context, setContext] = useState<GuideContext>(first.next_context);
  const [draft, setDraft] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const nextMessageIdRef = useRef(2);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const send = (value = draft) => {
    const text = value.trim();
    if (!text) return;
    const turn: GuideTurn = respondToPublicGuide({ message: text, context });
    const nextId = nextMessageIdRef.current;
    nextMessageIdRef.current += 2;
    const visitorText = turn.blocked ? 'Mensaje bloqueado por posible credencial.' : text;
    setMessages((current) => [
      ...current,
      { id: nextId, role: 'visitor', text: visitorText },
      { id: nextId + 1, role: 'guide', turn },
    ]);
    setContext(turn.next_context);
    setDraft('');
  };

  const reset = () => {
    const turn = initialTurn();
    nextMessageIdRef.current = 2;
    setMessages([{ id: 1, role: 'guide', turn }]);
    setContext(turn.next_context);
    setDraft('');
  };

  return (
    <section className="public-guide-workspace" aria-labelledby="public-guide-title">
      <div className="public-guide-tool">
        <header className="public-guide-toolbar">
          <div className="public-guide-identity">
            <span className="public-guide-avatar" aria-hidden="true"><Bot size={22} /></span>
            <div><strong id="public-guide-title">Guia AF</strong><small>Publica · determinista · sin memoria permanente</small></div>
          </div>
          <button type="button" className="public-guide-reset" onClick={reset} title="Reiniciar la conversacion">
            <RotateCcw size={15} /> Reiniciar
          </button>
        </header>

        <div ref={messagesRef} className="public-guide-messages" aria-live="polite" aria-label="Conversacion con la guia publica">
          {messages.map((message) => message.role === 'visitor' ? (
            <article className="public-guide-message is-visitor" key={message.id}>
              <span className="public-guide-message-icon" aria-hidden="true"><UserRound size={16} /></span>
              <div className="public-guide-bubble"><p>{message.text}</p></div>
            </article>
          ) : (
            <article className="public-guide-message is-guide" key={message.id} data-blocked={message.turn.blocked || undefined}>
              <span className="public-guide-message-icon" aria-hidden="true"><Bot size={17} /></span>
              <div className="public-guide-bubble">
                <span className="public-guide-mode">{message.turn.mode === 'simple' ? 'Explicacion simple' : message.turn.mode === 'detailed' ? 'Explicacion detallada' : 'Guia publica'}</span>
                <p>{message.turn.answer}</p>
                {message.turn.sources.length ? (
                  <div className="public-guide-sources" aria-label="Fuentes de esta respuesta">
                    <strong>Fuentes</strong>
                    {message.turn.sources.map((source) => (
                      <a href={source.url} key={source.id}>{source.title}<ExternalLink size={12} /></a>
                    ))}
                  </div>
                ) : null}
                {message.turn.quick_replies.length ? (
                  <div className="public-guide-replies" aria-label="Opciones para continuar">
                    {message.turn.quick_replies.map((reply) => (
                      <button type="button" key={reply} onClick={() => send(reply)}>{reply}</button>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="public-guide-composer">
          <label htmlFor="public-guide-input">Escribi tu pregunta</label>
          <div>
            <textarea
              id="public-guide-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Ejemplo: ¿por donde empiezo a mejorar mi sitio?"
            />
            <button type="button" onClick={() => send()} disabled={!draft.trim()} aria-label="Enviar pregunta">
              <ArrowUp size={19} /> <span>Enviar</span>
            </button>
          </div>
          <p><ShieldCheck size={14} /> Enter envia · Shift+Enter agrega una linea · No incluyas claves ni datos de pago.</p>
        </div>
      </div>

      <aside className="public-guide-boundary" aria-label="Alcance de esta guia">
        <span>Lo que hace hoy</span>
        <h2>Te orienta sin tomar control.</h2>
        <p>Explica el producto, mantiene el hilo inmediato y enlaza evidencia publica. La charla se borra al recargar la pagina.</p>
        <dl>
          <div><dt>Respuestas</dt><dd>Catalogo publico</dd></div>
          <div><dt>Fuentes</dt><dd>Allowlisted</dd></div>
          <div><dt>Acciones</dt><dd>Ninguna</dd></div>
          <div><dt>Datos privados</dt><dd>Sin acceso</dd></div>
        </dl>
        <a href="/asistente">Necesito ordenar datos para mi proyecto <ExternalLink size={14} /></a>
      </aside>
    </section>
  );
}
