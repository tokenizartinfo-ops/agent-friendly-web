'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, Check, LockKeyhole, Mail, Send, ShieldCheck, X } from 'lucide-react';
import { CONTACT_COPY } from '../../lib/contact-copy.mjs';
import { validateContactPreview } from '../../lib/contact-intake.mjs';
import { TurnstileWidget } from './turnstile-widget';

type Locale = 'es' | 'en' | 'pt';
type ContactIntakeProps = {
  domain: string;
  locale: Locale;
  captureEnabled?: boolean;
  endpoint?: string;
  turnstileSiteKey?: string;
  syntheticTokenProbe?: boolean;
};

const blankForm = {
  email: '', name: '', organization: '', role: '', objective: 'receive_plan',
  requestedPlanConsent: false, commercialContactConsent: false, productUpdatesConsent: false,
};

export function ContactIntake({
  domain,
  locale,
  captureEnabled = false,
  endpoint = '/api/contact-intake',
  turnstileSiteKey = '',
  syntheticTokenProbe = false,
}: ContactIntakeProps) {
  const copy = CONTACT_COPY[locale] || CONTACT_COPY.es;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [preview, setPreview] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const normalizedDomain = useMemo(() => domain.replace(/^https?:\/\//, '').split('/')[0], [domain]);

  function change(field: keyof typeof blankForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setRequestId('');
    setTurnstileToken('');
    setMessage('');
  }

  function review(event: React.FormEvent) {
    event.preventDefault();
    const idempotencyKey = requestId || crypto.randomUUID();
    const validation = validateContactPreview({
      ...form,
      domain: normalizedDomain,
      locale,
      source: 'public_audit',
      idempotencyKey,
    });
    if (!validation.ok) {
      setMessage(copy.invalid);
      return;
    }
    setRequestId(idempotencyKey);
    setPreview(true);
  }

  async function send() {
    if (!captureEnabled || !turnstileToken || sending) return;
    setSending(true);
    setMessage('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: endpoint.startsWith('https://') ? 'include' : 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          domain: normalizedDomain,
          locale,
          source: 'public_audit',
          idempotencyKey: requestId,
          turnstileToken,
        }),
      });
      setMessage(response.ok ? copy.sent : copy.invalid);
    } catch {
      setMessage(copy.invalid);
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button className="contact-intake-open" type="button" onClick={() => setOpen(true)}>
        <Mail size={17} aria-hidden="true" /> {copy.open}
      </button>
    );
  }

  return (
    <section className="contact-intake" aria-labelledby="contact-intake-title">
      <header>
        <div><span>{copy.eyebrow}</span><h3 id="contact-intake-title">{copy.title}</h3><p>{copy.intro}</p></div>
        <button type="button" className="icon-button" aria-label={copy.close} title={copy.close} onClick={() => setOpen(false)}><X size={18} /></button>
      </header>
      <div className="contact-preview-notice"><LockKeyhole size={16} /><strong>{copy.previewNotice}</strong></div>

      {preview ? (
        <div className="contact-review" aria-live="polite">
          <div className="contact-review-heading"><ShieldCheck size={22} /><div><span>{copy.summary}</span><strong>{form.email}</strong></div></div>
          <dl>
            <div><dt>{copy.fields.domain}</dt><dd>{normalizedDomain}</dd></div>
            <div><dt>{copy.fields.objective}</dt><dd>{copy.objectives[form.objective as keyof typeof copy.objectives]}</dd></div>
          </dl>
          <ul>
            <li><Check size={15} /> {copy.consents.requestedPlan}</li>
            {form.commercialContactConsent ? <li><Check size={15} /> {copy.consents.commercial}</li> : null}
            {form.productUpdatesConsent ? <li><Check size={15} /> {copy.consents.updates}</li> : null}
          </ul>
          <p>{copy.notSent}</p>
          {captureEnabled && turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} /> : null}
          {syntheticTokenProbe ? (
            <input
              type="hidden"
              data-afw-synthetic-turnstile-token={turnstileToken}
              value={turnstileToken}
              readOnly
            />
          ) : null}
          <div className="contact-actions">
            <button type="button" className="secondary-button" onClick={() => setPreview(false)}><ArrowLeft size={16} /> {copy.edit}</button>
            <button type="button" disabled={!captureEnabled || !turnstileToken || sending} onClick={send}><Send size={16} /> {captureEnabled ? copy.send : copy.unavailable}</button>
          </div>
          {message ? <p className="contact-status" role="status">{message}</p> : null}
        </div>
      ) : (
        <form className="contact-form" onSubmit={review}>
          <div className="contact-fields">
            <label>{copy.fields.email}<input type="email" required value={form.email} onChange={(event) => change('email', event.target.value)} autoComplete="email" /></label>
            <label>{copy.fields.name}<input value={form.name} onChange={(event) => change('name', event.target.value)} autoComplete="name" /></label>
            <label>{copy.fields.organization}<input value={form.organization} onChange={(event) => change('organization', event.target.value)} autoComplete="organization" /></label>
            <label>{copy.fields.role}<input value={form.role} onChange={(event) => change('role', event.target.value)} /></label>
            <label><span>{copy.fields.domain}</span><input value={normalizedDomain} readOnly /></label>
            <label>{copy.fields.objective}<select value={form.objective} onChange={(event) => change('objective', event.target.value)}>{Object.entries(copy.objectives).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          </div>
          <div className="contact-consents">
            <label><input type="checkbox" required checked={form.requestedPlanConsent} onChange={(event) => change('requestedPlanConsent', event.target.checked)} /><span><strong>{copy.consents.requestedPlan}</strong><small>{copy.required}</small></span></label>
            <label><input type="checkbox" checked={form.commercialContactConsent} onChange={(event) => change('commercialContactConsent', event.target.checked)} /><span>{copy.consents.commercial}<small>{copy.optional}</small></span></label>
            <label><input type="checkbox" checked={form.productUpdatesConsent} onChange={(event) => change('productUpdatesConsent', event.target.checked)} /><span>{copy.consents.updates}<small>{copy.optional}</small></span></label>
          </div>
          {message ? <p className="error-message" role="alert">{message}</p> : null}
          <button type="submit"><ShieldCheck size={17} /> {copy.preview}</button>
        </form>
      )}
    </section>
  );
}
