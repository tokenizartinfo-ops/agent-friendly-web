export const CONTROLLED_CONNECTOR_RUN_CONTRACT = 'agentfriendly.controlled-connector-run.v1';
export const CONNECTOR_RECEIPT_CONTRACT = 'agentfriendly.connector-receipt.v1';

const HASH = /^[a-f0-9]{64}$/;
const RUN_ID = /^run-[a-f0-9]{24}$/;
const CANARY_PATHS = new Set(['/llms.txt', '/llms-full.txt']);
const MAX_CONTENT_BYTES = 128 * 1024;

async function sha256(value) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((part) => part.toString(16).padStart(2, '0')).join('');
}

function probableSecret(value) {
  const source = String(value || '');
  return (
    /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i.test(source)
    || /\b(?:password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key)\s*[:=]\s*\S{6,}/i.test(source)
    || /\b(?:ghp|github_pat|sk_live|sk_test|xox[baprs])-[_a-z0-9]{12,}\b/i.test(source)
  );
}

function isoDate(value, field) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`${field} must be a valid date`);
  return date.toISOString();
}

function assertApproved(capsule) {
  if (capsule?.contract !== 'agentfriendly.publication-capsule.v1') throw new Error('Capsule contract is invalid');
  if (capsule.status !== 'approved_for_manual_handoff') throw new Error('Capsule is not approved for controlled handoff');
  const requiredRoles = Array.isArray(capsule?.approvals?.requiredRoles) ? capsule.approvals.requiredRoles : [];
  if (!requiredRoles.length || requiredRoles.some((role) => capsule.approvals?.[role] !== 'approved')) {
    throw new Error('Every required human approval must be approved');
  }
}

function assertEvidence(capsule, comparison, plan) {
  if (comparison?.contract !== 'agentfriendly.origin-comparison.v1' || comparison.status !== 'complete') {
    throw new Error('Origin comparison must be complete');
  }
  if (plan?.contract !== 'agentfriendly.draft-pr-plan.v1' || plan.status !== 'prepared_not_submitted') {
    throw new Error('Draft plan must be prepared and not submitted');
  }
  if (plan.remoteSubmission !== false) throw new Error('Remote submission must remain disabled');
  if (plan.mergeAllowed !== false) throw new Error('Merge must remain disabled');
  const manifest = capsule?.integrity?.manifestSha256;
  if (!HASH.test(String(manifest || '')) || comparison.manifestSha256 !== manifest || plan.manifestSha256 !== manifest) {
    throw new Error('Capsule, comparison and plan manifest do not match');
  }
  if (comparison.capsuleId !== capsule.capsuleId || plan.capsuleId !== capsule.capsuleId || plan.comparisonId !== comparison.comparisonId) {
    throw new Error('Capsule, comparison and plan references do not match');
  }
}

function publicOrigin(value) {
  let url;
  try { url = new URL(String(value || '')); } catch { throw new Error('Connector origin must be public HTTPS'); }
  const hostname = url.hostname.toLowerCase();
  const privateHost = (
    hostname === 'localhost'
    || hostname.endsWith('.localhost')
    || hostname === '[::1]'
    || /^(127\.|10\.|192\.168\.|169\.254\.)/.test(hostname)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
  );
  if (url.protocol !== 'https:' || url.origin !== String(value).replace(/\/$/, '') || url.username || url.password || privateHost) {
    throw new Error('Connector origin must be public HTTPS');
  }
  return url.origin;
}

function selectedCanary(capsule, plan, canaryPath) {
  if (!CANARY_PATHS.has(canaryPath)) throw new Error('Canary path is outside the controlled allowlist');
  const file = capsule.files?.find((candidate) => candidate.destinationPath === canaryPath);
  const planFile = plan.files?.find((candidate) => candidate.sourcePath === canaryPath);
  if (!file || file.operation !== 'create_or_replace' || !planFile || planFile.mode !== 'create_or_update') {
    throw new Error('Canary must select one directly replaceable file from the approved plan');
  }
  if (!file.content || new TextEncoder().encode(file.content).byteLength > MAX_CONTENT_BYTES || probableSecret(file.content)) {
    throw new Error('Canary content is empty, oversized or contains a probable secret');
  }
  if (!HASH.test(String(file.sha256 || '')) || file.sha256 !== planFile.sha256 || file.content !== planFile.content) {
    throw new Error('Canary hash or content does not match the approved plan');
  }
  return file;
}

export function validateControlledConnectorRun(run) {
  if (!run || run.contract !== CONTROLLED_CONNECTOR_RUN_CONTRACT || !RUN_ID.test(String(run.runId || ''))) {
    throw new Error('Controlled connector run identity is invalid');
  }
  if (run.provider !== 'ephemeral_memory' || run.environment !== 'local_sandbox' || run.status !== 'ready_for_local_sandbox') {
    throw new Error('Controlled connector provider or environment is invalid');
  }
  if (run.remoteMutation !== false || run.maxWrites !== 1 || run.rollbackRequired !== true) {
    throw new Error('Controlled connector safety boundary is invalid');
  }
  if (!HASH.test(String(run.manifestSha256 || '')) || !CANARY_PATHS.has(run?.canary?.destinationPath)) {
    throw new Error('Controlled connector manifest or canary is invalid');
  }
  if (!HASH.test(String(run.canary.sha256 || '')) || !run.canary.content || probableSecret(run.canary.content)) {
    throw new Error('Controlled connector canary content is invalid');
  }
  return run;
}

export async function prepareControlledConnectorRun(raw = {}) {
  const { capsule, comparison, plan } = raw;
  assertApproved(capsule);
  assertEvidence(capsule, comparison, plan);
  const preparedAt = isoDate(raw.preparedAt || new Date().toISOString(), 'preparedAt');
  if (capsule.expiresAt && new Date(preparedAt) >= new Date(isoDate(capsule.expiresAt, 'expiresAt'))) {
    throw new Error('Capsule approval has expired');
  }
  const file = selectedCanary(capsule, plan, String(raw.canaryPath || ''));
  const computedSha256 = await sha256(file.content);
  if (computedSha256 !== file.sha256) throw new Error('Canary hash does not match its content');
  const origin = publicOrigin(capsule.target?.origin);
  const identity = [capsule.capsuleId, comparison.comparisonId, plan.planId, capsule.integrity.manifestSha256, file.destinationPath].join(':');
  const run = {
    contract: CONTROLLED_CONNECTOR_RUN_CONTRACT,
    runId: `run-${(await sha256(identity)).slice(0, 24)}`,
    capsuleId: capsule.capsuleId,
    comparisonId: comparison.comparisonId,
    planId: plan.planId,
    manifestSha256: capsule.integrity.manifestSha256,
    origin,
    provider: 'ephemeral_memory',
    environment: 'local_sandbox',
    status: 'ready_for_local_sandbox',
    remoteMutation: false,
    maxWrites: 1,
    rollbackRequired: true,
    canary: {
      packagePath: file.packagePath,
      destinationPath: file.destinationPath,
      mediaType: file.mediaType,
      bytes: new TextEncoder().encode(file.content).byteLength,
      sha256: file.sha256,
      content: file.content,
    },
    preparedAt,
  };
  return validateControlledConnectorRun(run);
}

async function receipt(run, status, fields = {}, at = new Date().toISOString()) {
  const recordedAt = isoDate(at, 'receipt date');
  return {
    contract: CONNECTOR_RECEIPT_CONTRACT,
    receiptId: `receipt-${(await sha256(`${run.runId}:${status}`)).slice(0, 24)}`,
    runId: run.runId,
    status,
    provider: 'ephemeral_memory',
    environment: 'local_sandbox',
    origin: run.origin,
    destinationPath: run.canary.destinationPath,
    remoteMutation: false,
    replayed: false,
    ...fields,
    recordedAt,
  };
}

async function contentHash(value) {
  return value === undefined ? null : sha256(value);
}

export function createEphemeralConnector(initialFiles = {}) {
  const files = initialFiles instanceof Map ? initialFiles : new Map(Object.entries(initialFiles));
  const executions = new Map();

  return {
    async inspect(path) {
      return files.get(path);
    },

    async dryRun(run, options = {}) {
      validateControlledConnectorRun(run);
      const beforeSha256 = await contentHash(files.get(run.canary.destinationPath));
      return receipt(run, 'dry_run_ready', {
        beforeSha256,
        proposedSha256: run.canary.sha256,
        resultSha256: beforeSha256,
        verification: 'not_applied',
        rollbackAvailable: false,
      }, options.at);
    },

    async applyCanary(run, options = {}) {
      validateControlledConnectorRun(run);
      if (options.confirmCanary !== true) throw new Error('Explicit canary confirmation is required');
      const existing = executions.get(run.runId);
      if (existing?.phase === 'rolled_back') throw new Error('This connector run was already rolled back');
      if (existing?.phase === 'applied') {
        const currentSha256 = await contentHash(files.get(run.canary.destinationPath));
        if (currentSha256 !== run.canary.sha256) throw new Error('Canary changed outside the connector after apply');
        return { ...existing.appliedReceipt, replayed: true };
      }

      const path = run.canary.destinationPath;
      const previousExists = files.has(path);
      const previousContent = files.get(path);
      const beforeSha256 = await contentHash(previousContent);
      files.set(path, run.canary.content);
      const resultSha256 = await contentHash(files.get(path));
      if (resultSha256 !== run.canary.sha256) {
        if (previousExists) files.set(path, previousContent); else files.delete(path);
        throw new Error('Canary verification failed; the sandbox was restored');
      }
      const appliedReceipt = await receipt(run, 'applied_to_ephemeral_sandbox', {
        beforeSha256,
        proposedSha256: run.canary.sha256,
        resultSha256,
        verification: 'passed',
        rollbackAvailable: true,
      }, options.at);
      executions.set(run.runId, { phase: 'applied', run, previousExists, previousContent, appliedReceipt });
      return appliedReceipt;
    },

    async rollback(runId, options = {}) {
      if (options.confirmRollback !== true) throw new Error('Explicit rollback confirmation is required');
      const execution = executions.get(runId);
      if (!execution) throw new Error('Applied connector run was not found');
      if (execution.phase === 'rolled_back') return { ...execution.rollbackReceipt, replayed: true };
      const { run } = execution;
      const currentSha256 = await contentHash(files.get(run.canary.destinationPath));
      if (currentSha256 !== run.canary.sha256) throw new Error('Canary diverged or changed outside the connector');
      if (execution.previousExists) files.set(run.canary.destinationPath, execution.previousContent);
      else files.delete(run.canary.destinationPath);
      const expectedSha256 = await contentHash(execution.previousContent);
      const resultSha256 = await contentHash(files.get(run.canary.destinationPath));
      if (resultSha256 !== expectedSha256) throw new Error('Rollback verification failed');
      const rollbackReceipt = await receipt(run, 'rolled_back', {
        beforeSha256: run.canary.sha256,
        proposedSha256: expectedSha256,
        resultSha256,
        verification: 'passed',
        rollbackAvailable: false,
      }, options.at);
      executions.set(runId, { ...execution, phase: 'rolled_back', rollbackReceipt });
      return rollbackReceipt;
    },
  };
}
