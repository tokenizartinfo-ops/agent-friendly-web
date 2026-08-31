'use client';

import { useMemo, useRef, useState } from 'react';
import { CheckCircle2, FlaskConical, RotateCcw, ShieldCheck, TestTube2 } from 'lucide-react';
import { createEphemeralConnector, prepareControlledConnectorRun } from '../../lib/controlled-connector.mjs';
import { privateUiCopy } from '../../lib/private-ui-copy.mjs';

type Locale = 'es' | 'en' | 'pt';
type CapsuleFile = {
  packagePath: string; destinationPath: string; operation: string; mediaType: string; sha256: string; content: string;
};
type Capsule = {
  contract: string; capsuleId: string; status: string; expiresAt?: string;
  target: { origin: string; hostname: string };
  approvals: { requiredRoles: string[]; owner: string; maintainer: string };
  integrity: { manifestSha256: string };
  files: CapsuleFile[];
};
type OriginComparison = {
  contract: string; comparisonId: string; capsuleId: string; manifestSha256: string; status: string; resources: Array<{ destinationPath: string; status: string }>;
};
type DraftPrPlan = {
  contract: string; planId: string; capsuleId: string; comparisonId: string; manifestSha256: string; status: string;
  remoteSubmission: false; mergeAllowed: false;
  files: Array<{ sourcePath: string; repositoryPath: string; mode: string; sha256: string; content: string }>;
};
type Receipt = {
  receiptId: string; status: string; resultSha256: string | null; remoteMutation: false; verification: string;
};
type Connector = ReturnType<typeof createEphemeralConnector>;

export function ConnectorSandbox({
  capsule,
  comparison,
  plan,
  locale = 'es',
}: {
  capsule: Capsule;
  comparison: OriginComparison;
  plan: DraftPrPlan;
  locale?: Locale;
}) {
  const copy = privateUiCopy(locale).capsule.connector;
  const canaryPath = useMemo(() => capsule.files.find((file) =>
    file.operation === 'create_or_replace' && ['/llms.txt', '/llms-full.txt'].includes(file.destinationPath),
  )?.destinationPath || '', [capsule.files]);
  const connectorRef = useRef<Connector | null>(null);
  const runRef = useRef<Awaited<ReturnType<typeof prepareControlledConnectorRun>> | null>(null);
  const [phase, setPhase] = useState<'idle' | 'ready' | 'dry' | 'applied' | 'rolled_back'>('idle');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [message, setMessage] = useState(canaryPath ? copy.idle : copy.unavailable);
  const [confirmApply, setConfirmApply] = useState(false);
  const [confirmRollback, setConfirmRollback] = useState(false);
  const [busy, setBusy] = useState(false);

  async function prepare() {
    if (!canaryPath) return;
    setBusy(true);
    try {
      const run = await prepareControlledConnectorRun({ capsule, comparison, plan, canaryPath });
      runRef.current = run;
      connectorRef.current = createEphemeralConnector({ [canaryPath]: '# Synthetic prior state for the local sandbox.\n' });
      setReceipt(null);
      setPhase('ready');
      setMessage(copy.ready);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.idle);
    } finally { setBusy(false); }
  }

  async function dryRun() {
    if (!runRef.current || !connectorRef.current) return;
    setBusy(true);
    try {
      const next = await connectorRef.current.dryRun(runRef.current) as Receipt;
      setReceipt(next);
      setPhase('dry');
      setMessage(copy.dryReady);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.idle);
    } finally { setBusy(false); }
  }

  async function applyCanary() {
    if (!runRef.current || !connectorRef.current) return;
    setBusy(true);
    try {
      const next = await connectorRef.current.applyCanary(runRef.current, { confirmCanary: confirmApply }) as Receipt;
      setReceipt(next);
      setPhase('applied');
      setMessage(copy.applied);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.idle);
    } finally { setBusy(false); }
  }

  async function rollback() {
    if (!runRef.current || !connectorRef.current) return;
    setBusy(true);
    try {
      const next = await connectorRef.current.rollback(runRef.current.runId, { confirmRollback }) as Receipt;
      setReceipt(next);
      setPhase('rolled_back');
      setMessage(copy.rolledBack);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.idle);
    } finally { setBusy(false); }
  }

  const activeStep = phase === 'idle' ? 0 : phase === 'ready' ? 1 : phase === 'dry' ? 2 : phase === 'applied' ? 3 : 4;

  return (
    <section className="connector-lab" aria-labelledby="connector-lab-title">
      <header>
        <div><span>{copy.eyebrow}</span><h3 id="connector-lab-title">{copy.title}</h3><p>{copy.body}</p></div>
        <strong><ShieldCheck size={17} />{copy.localOnly}</strong>
      </header>

      <ol className="connector-lab-steps">
        {copy.steps.map((step, index) => (
          <li key={step} data-state={activeStep > index ? 'done' : activeStep === index ? 'active' : 'pending'}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            {activeStep > index ? <CheckCircle2 size={17} /> : null}
          </li>
        ))}
      </ol>

      <div className="connector-lab-canary">
        <TestTube2 size={18} />
        <span>{copy.canary}</span>
        <code>{canaryPath || '—'}</code>
        <b>{copy.remoteOff}</b>
      </div>

      <div className="connector-lab-controls">
        <button type="button" onClick={prepare} disabled={busy || !canaryPath}><FlaskConical size={16} />{copy.prepare}</button>
        <button type="button" onClick={dryRun} disabled={busy || phase !== 'ready'}><TestTube2 size={16} />{copy.dryRun}</button>
        <label><input type="checkbox" checked={confirmApply} onChange={(event) => setConfirmApply(event.target.checked)} /><span>{copy.confirmApply}</span></label>
        <button type="button" onClick={applyCanary} disabled={busy || phase !== 'dry' || !confirmApply}><CheckCircle2 size={16} />{copy.apply}</button>
        <label><input type="checkbox" checked={confirmRollback} onChange={(event) => setConfirmRollback(event.target.checked)} /><span>{copy.confirmRollback}</span></label>
        <button type="button" onClick={rollback} disabled={busy || phase !== 'applied' || !confirmRollback}><RotateCcw size={16} />{copy.rollback}</button>
      </div>

      <p className="connector-lab-message" aria-live="polite">{message}</p>
      {receipt ? (
        <dl className="connector-lab-receipt">
          <div><dt>{copy.receipt}</dt><dd><code>{receipt.receiptId}</code></dd></div>
          <div><dt>Status</dt><dd>{receipt.status}</dd></div>
          <div><dt>SHA-256</dt><dd><code>{receipt.resultSha256 ? `${receipt.resultSha256.slice(0, 16)}...` : '—'}</code></dd></div>
          <div><dt>remoteMutation</dt><dd><code>{String(receipt.remoteMutation)}</code></dd></div>
        </dl>
      ) : null}
    </section>
  );
}
