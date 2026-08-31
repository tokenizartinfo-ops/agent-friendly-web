'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Bot, ExternalLink, RotateCcw, ShieldCheck, UserRound } from 'lucide-react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { PUBLIC_GUIDE_INITIAL_CONTEXT, respondToPublicGuide } from '../../lib/public-guide.mjs';
import { localizedPath } from '../../lib/site-i18n.mjs';
import { publicToolsCopy } from '../../lib/public-tools-copy.mjs';

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

type Locale = 'es' | 'en' | 'pt';

export function PublicGuideChat({ locale = 'es' }: { locale?: Locale } = {}) {
  const copy = publicToolsCopy(locale).guideUI;
  const first = useMemo(() => respondToPublicGuide({ locale, message: '', context: PUBLIC_GUIDE_INITIAL_CONTEXT }), [locale]);
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
    const turn: GuideTurn = respondToPublicGuide({ locale, message: text, context });
    const nextId = nextMessageIdRef.current;
    nextMessageIdRef.current += 2;
    const visitorText = turn.blocked ? copy.blocked : text;
    setMessages((current) => [
      ...current,
      { id: nextId, role: 'visitor', text: visitorText },
      { id: nextId + 1, role: 'guide', turn },
    ]);
    setContext(turn.next_context);
    setDraft('');
  };

  const reset = () => {
    const turn: GuideTurn = respondToPublicGuide({ locale, message: '', context: PUBLIC_GUIDE_INITIAL_CONTEXT });
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
            <div><strong id="public-guide-title">{copy.identity}</strong><small>{copy.status}</small></div>
          </div>
          <button type="button" className="public-guide-reset" onClick={reset} title={copy.resetTitle}>
            <RotateCcw size={15} /> {copy.reset}
          </button>
        </header>

        <div ref={messagesRef} className="public-guide-messages" aria-live="polite" aria-label={copy.conversation}>
          {messages.map((message) => message.role === 'visitor' ? (
            <article className="public-guide-message is-visitor" key={message.id}>
              <span className="public-guide-message-icon" aria-hidden="true"><UserRound size={16} /></span>
              <div className="public-guide-bubble"><p>{message.text}</p></div>
            </article>
          ) : (
            <article className="public-guide-message is-guide" key={message.id} data-blocked={message.turn.blocked || undefined}>
              <span className="public-guide-message-icon" aria-hidden="true"><Bot size={17} /></span>
              <div className="public-guide-bubble">
                <span className="public-guide-mode">{message.turn.mode === 'simple' ? copy.simple : message.turn.mode === 'detailed' ? copy.detailed : copy.standard}</span>
                <p>{message.turn.answer}</p>
                {message.turn.sources.length ? (
                  <div className="public-guide-sources" aria-label={copy.sources}>
                    <strong>{copy.sources}</strong>
                    {message.turn.sources.map((source) => (
                      <a href={source.url} key={source.id}>{source.title}<ExternalLink size={12} /></a>
                    ))}
                  </div>
                ) : null}
                {message.turn.quick_replies.length ? (
                  <div className="public-guide-replies" aria-label={copy.replies}>
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
          <label htmlFor="public-guide-input">{copy.input}</label>
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
              placeholder={copy.placeholder}
            />
            <button type="button" onClick={() => send()} disabled={!draft.trim()} aria-label={copy.send}>
              <ArrowUp size={19} /> <span>{copy.sendShort}</span>
            </button>
          </div>
          <p><ShieldCheck size={14} /> {copy.keyboard}</p>
        </div>
      </div>

      <aside className="public-guide-boundary" aria-label={copy.boundary}>
        <span>{copy.boundary}</span><h2>{copy.boundaryTitle}</h2><p>{copy.boundaryBody}</p>
        <dl>
          <div><dt>{copy.answers}</dt><dd>{copy.catalog}</dd></div>
          <div><dt>{copy.sourceLabel}</dt><dd>{copy.allowlisted}</dd></div>
          <div><dt>{copy.actions}</dt><dd>{copy.none}</dd></div>
          <div><dt>{copy.privateData}</dt><dd>{copy.noAccess}</dd></div>
        </dl>
        <a href={localizedPath('assistant', locale) || '/asistente'}>{copy.assistantLink} <ExternalLink size={14} /></a>
      </aside>
    </section>
  );
}
