export const GITHUB_DRAFT_PR_CANARY_CONTRACT = 'agentfriendly.github-draft-pr-canary.v1';
export const GITHUB_DRAFT_PR_RECEIPT_CONTRACT = 'agentfriendly.github-draft-pr-receipt.v1';
export const BLOCK5D_REPOSITORY = 'tokenizartinfo-ops/agent-friendly-web-synthetic-origin';
export const BLOCK5D_CAPABILITY_REF = 'secretbroker://github/agent-friendly-web/block5d-synthetic-draft-pr';

const HASH = /^[a-f0-9]{64}$/;
const RUN_ID = /^ghrun-[a-f0-9]{24}$/;
const IDEMPOTENCY_KEY = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/;
const APPROVAL_CONTRACT = 'agentfriendly.remote-mutation-approval.v1';
const MAX_WINDOW_MS = 30 * 60 * 1000;
const MAX_CONTENT_BYTES = 128 * 1024;

function contentBytes(value) {
  return new TextEncoder().encode(String(value || '')).byteLength;
}

async function sha256(value) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((part) => part.toString(16).padStart(2, '0')).join('');
}

function isoDate(value, field) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`${field} must be a valid date`);
  return date.toISOString();
}

function probableSecret(value) {
  const source = String(value || '');
  return (
    /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i.test(source)
    || /\b(?:password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key)\s*[:=]\s*\S{6,}/i.test(source)
    || /\b(?:ghp|github_pat|sk_live|sk_test|xox[baprs])-[_a-z0-9]{12,}\b/i.test(source)
  );
}

function assertApprovedCapsule(capsule) {
  if (capsule?.contract !== 'agentfriendly.publication-capsule.v1' || capsule.status !== 'approved_for_manual_handoff') {
    throw new Error('Capsule is not approved for the Block 5D handoff');
  }
  const required = Array.isArray(capsule?.approvals?.requiredRoles) ? capsule.approvals.requiredRoles : [];
  if (!required.length || required.some((role) => capsule.approvals?.[role] !== 'approved')) {
    throw new Error('Every required capsule approval must be approved');
  }
}

function selectedFile(capsule, comparison, plan, canaryPath) {
  if (canaryPath !== '/llms.txt') throw new Error('Block 5D canary path must be /llms.txt');
  if (comparison?.contract !== 'agentfriendly.origin-comparison.v1' || comparison.status !== 'complete') {
    throw new Error('Origin comparison must be complete');
  }
  if (plan?.contract !== 'agentfriendly.draft-pr-plan.v1' || plan.status !== 'prepared_not_submitted') {
    throw new Error('Draft PR plan must be prepared and not submitted');
  }
  if (plan.remoteSubmission !== false || plan.mergeAllowed !== false) {
    throw new Error('The source plan must remain unsubmitted and unmergeable');
  }
  if (!plan.title || !plan.body || probableSecret(plan.title) || probableSecret(plan.body)) {
    throw new Error('Draft PR metadata is empty or contains a probable secret');
  }
  if (plan.repository !== BLOCK5D_REPOSITORY) throw new Error('Repository is outside the Block 5D allowlist');
  if (plan.baseBranch !== 'main') throw new Error('Block 5D base branch must be main');
  if (!Array.isArray(plan.files) || plan.files.length !== 1) throw new Error('Block 5D permits exactly one file');

  const manifest = capsule?.integrity?.manifestSha256;
  if (!HASH.test(String(manifest || '')) || comparison.manifestSha256 !== manifest || plan.manifestSha256 !== manifest) {
    throw new Error('Capsule, comparison and plan manifest do not match');
  }
  if (comparison.capsuleId !== capsule.capsuleId || plan.capsuleId !== capsule.capsuleId || plan.comparisonId !== comparison.comparisonId) {
    throw new Error('Capsule, comparison and plan references do not match');
  }

  const capsuleFile = capsule.files?.find((file) => file.destinationPath === canaryPath);
  const planFile = plan.files[0];
  if (!capsuleFile || capsuleFile.operation !== 'create_or_replace' || planFile.sourcePath !== canaryPath) {
    throw new Error('The canary file is not directly replaceable');
  }
  if (planFile.repositoryPath !== 'llms.txt' || planFile.mode !== 'create_or_update') {
    throw new Error('Block 5D repository path must be llms.txt');
  }
  if (!planFile.content || probableSecret(planFile.content) || !HASH.test(String(planFile.sha256 || ''))) {
    throw new Error('Block 5D file is empty, contains a probable secret or has an invalid hash');
  }
  if (contentBytes(planFile.content) > MAX_CONTENT_BYTES) {
    throw new Error('Block 5D file size exceeds 128 KiB');
  }
  if (planFile.content !== capsuleFile.content || planFile.sha256 !== capsuleFile.sha256) {
    throw new Error('Block 5D file hash or content does not match the approved capsule');
  }
  return planFile;
}

export function validateGitHubDraftPrCanary(run) {
  if (!run || run.contract !== GITHUB_DRAFT_PR_CANARY_CONTRACT || !RUN_ID.test(String(run.runId || ''))) {
    throw new Error('Block 5D run identity is invalid');
  }
  if (run.repository !== BLOCK5D_REPOSITORY || run.baseBranch !== 'main') throw new Error('Block 5D repository or base is invalid');
  if (run.provider !== 'github' || run.environment !== 'synthetic_repository' || run.status !== 'ready_for_approval') {
    throw new Error('Block 5D provider, environment or status is invalid');
  }
  if (run.remoteMutation !== true || run.draft !== true || run.mergeAllowed !== false || run.maxFiles !== 1 || run.approvalRequired !== true) {
    throw new Error('Block 5D safety boundary is invalid');
  }
  if (run.capabilityRef !== BLOCK5D_CAPABILITY_REF || !IDEMPOTENCY_KEY.test(String(run.idempotencyKey || ''))) {
    throw new Error('Block 5D capability or idempotency key is invalid');
  }
  if (!HASH.test(String(run.manifestSha256 || '')) || !HASH.test(String(run.contentSha256 || ''))) {
    throw new Error('Block 5D integrity metadata is invalid');
  }
  const preparedAt = isoDate(run.preparedAt, 'preparedAt');
  const expiresAt = isoDate(run.expiresAt, 'expiresAt');
  if (new Date(expiresAt) <= new Date(preparedAt) || new Date(expiresAt) - new Date(preparedAt) > MAX_WINDOW_MS) {
    throw new Error('Block 5D expiration window is invalid');
  }
  const request = run.request;
  if (!request || request.repository !== run.repository || request.baseBranch !== run.baseBranch || request.branch !== run.branch) {
    throw new Error('Block 5D request target is invalid');
  }
  if (!request.title || !request.body || probableSecret(request.title) || probableSecret(request.body)) {
    throw new Error('Block 5D request metadata is invalid');
  }
  if (request.draft !== true || request.mergeAllowed !== false || !Array.isArray(request.files) || request.files.length !== 1) {
    throw new Error('Block 5D request must contain one unmergeable Draft PR file');
  }
  const file = request.files[0];
  if (file.path !== 'llms.txt' || file.mode !== 'create_or_update' || file.sha256 !== run.contentSha256 || !file.content || probableSecret(file.content)) {
    throw new Error('Block 5D request file is invalid');
  }
  if (contentBytes(file.content) > MAX_CONTENT_BYTES) throw new Error('Block 5D request file size exceeds 128 KiB');
  return run;
}

export async function prepareGitHubDraftPrCanary(raw = {}) {
  const { capsule, comparison, plan } = raw;
  assertApprovedCapsule(capsule);
  if (raw.capabilityRef !== BLOCK5D_CAPABILITY_REF) throw new Error('Block 5D capability alias is invalid');
  if (!IDEMPOTENCY_KEY.test(String(raw.idempotencyKey || ''))) throw new Error('Block 5D idempotency key is invalid');
  const preparedAt = isoDate(raw.preparedAt || new Date().toISOString(), 'preparedAt');
  const expiresAt = isoDate(raw.expiresAt, 'expiresAt');
  if (new Date(expiresAt) <= new Date(preparedAt) || new Date(expiresAt) - new Date(preparedAt) > MAX_WINDOW_MS) {
    throw new Error('Block 5D approval preparation has expired or exceeds 30 minutes');
  }
  if (capsule.expiresAt && new Date(preparedAt) >= new Date(isoDate(capsule.expiresAt, 'capsule.expiresAt'))) {
    throw new Error('Capsule approval has expired');
  }
  const file = selectedFile(capsule, comparison, plan, String(raw.canaryPath || ''));
  const computedSha256 = await sha256(file.content);
  if (computedSha256 !== file.sha256) throw new Error('Block 5D content hash does not match the file');
  const identity = [capsule.capsuleId, comparison.comparisonId, plan.planId, capsule.integrity.manifestSha256, raw.idempotencyKey].join(':');
  const suffix = (await sha256(identity)).slice(0, 24);
  const run = {
    contract: GITHUB_DRAFT_PR_CANARY_CONTRACT,
    runId: `ghrun-${suffix}`,
    capsuleId: capsule.capsuleId,
    comparisonId: comparison.comparisonId,
    planId: plan.planId,
    manifestSha256: capsule.integrity.manifestSha256,
    contentSha256: file.sha256,
    repository: BLOCK5D_REPOSITORY,
    baseBranch: 'main',
    branch: `afw/canary-${suffix.slice(0, 12)}`,
    provider: 'github',
    environment: 'synthetic_repository',
    status: 'ready_for_approval',
    remoteMutation: true,
    draft: true,
    mergeAllowed: false,
    maxFiles: 1,
    approvalRequired: true,
    capabilityRef: BLOCK5D_CAPABILITY_REF,
    idempotencyKey: raw.idempotencyKey,
    request: {
      repository: BLOCK5D_REPOSITORY,
      baseBranch: 'main',
      branch: `afw/canary-${suffix.slice(0, 12)}`,
      title: `[Synthetic canary] ${plan.title}`,
      body: `${plan.body}\n\nBlock 5D boundary: Draft PR only. Merge and deployment are prohibited.`,
      draft: true,
      mergeAllowed: false,
      files: [{ path: 'llms.txt', mode: 'create_or_update', sha256: file.sha256, content: file.content }],
    },
    preparedAt,
    expiresAt,
  };
  return validateGitHubDraftPrCanary(run);
}

function validateApproval(approval, run, at) {
  if (!approval || approval.contract !== APPROVAL_CONTRACT || approval.status !== 'approved') {
    throw new Error('A specific Block 5D approval is required');
  }
  if (approval.runId !== run.runId || approval.repository !== BLOCK5D_REPOSITORY || approval.operation !== 'create_synthetic_draft_pr' || approval.maxFiles !== 1) {
    throw new Error('Block 5D approval scope or repository does not match');
  }
  if (!approval.approvalId || probableSecret(approval.approvalId) || !approval.approvedBy || probableSecret(approval.approvedBy)) {
    throw new Error('Block 5D approval metadata is invalid');
  }
  const approvedAt = isoDate(approval.approvedAt, 'approval.approvedAt');
  const expiresAt = isoDate(approval.expiresAt, 'approval.expiresAt');
  if (new Date(approvedAt) > new Date(at) || new Date(expiresAt) <= new Date(at)) throw new Error('Block 5D approval has expired');
  return approval;
}

function verifyProviderResult(result, repository) {
  if (!result || !Number.isInteger(result.id) || result.draft !== true || result.merged === true) {
    throw new Error('GitHub provider did not return an unmerged Draft PR');
  }
  let url;
  try { url = new URL(String(result.url || '')); } catch { throw new Error('GitHub provider result is not verifiable'); }
  const expectedPath = `/${repository}/pull/${result.id}`;
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.pathname !== expectedPath || url.search || url.hash) {
    throw new Error('GitHub provider result does not match the synthetic repository');
  }
  return url.toString();
}

export async function executeGitHubDraftPrCanary(run, controls = {}) {
  validateGitHubDraftPrCanary(run);
  const at = isoDate(controls.at || new Date().toISOString(), 'execution date');
  if (new Date(at) >= new Date(run.expiresAt)) throw new Error('Block 5D run has expired');
  if (controls.enabled !== true) throw new Error('GitHub Draft PR remote submission is disabled');
  const approval = validateApproval(controls.approval, run, at);
  if (!controls.client || typeof controls.client.createDraftPullRequest !== 'function') {
    throw new Error('Injected GitHub Draft PR client is unavailable');
  }
  const receipts = controls.receipts instanceof Map ? controls.receipts : null;
  const previous = receipts?.get(run.runId);
  if (previous) {
    if (previous.contract !== GITHUB_DRAFT_PR_RECEIPT_CONTRACT || previous.runId !== run.runId || previous.contentSha256 !== run.contentSha256) {
      throw new Error('Block 5D idempotency receipt diverged');
    }
    return { ...previous, replayed: true };
  }
  const computedSha256 = await sha256(run.request.files[0].content);
  if (computedSha256 !== run.contentSha256) throw new Error('Block 5D request content diverged before submission');
  const result = await controls.client.createDraftPullRequest(run.request);
  const url = verifyProviderResult(result, run.repository);
  const receipt = {
    contract: GITHUB_DRAFT_PR_RECEIPT_CONTRACT,
    receiptId: `ghreceipt-${(await sha256(`${run.runId}:${result.id}:${run.contentSha256}`)).slice(0, 24)}`,
    runId: run.runId,
    approvalId: approval.approvalId,
    provider: 'github',
    environment: 'synthetic_repository',
    repository: run.repository,
    branch: run.branch,
    pullRequestId: result.id,
    url,
    status: 'submitted_as_draft',
    draft: true,
    remoteMutation: true,
    mergeAllowed: false,
    contentSha256: run.contentSha256,
    recordedAt: at,
    replayed: false,
  };
  receipts?.set(run.runId, receipt);
  return receipt;
}
