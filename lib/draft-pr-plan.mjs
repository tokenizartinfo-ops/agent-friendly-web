export const DRAFT_PR_PLAN_CONTRACT = 'agentfriendly.draft-pr-plan.v1';

const HASH = /^[a-f0-9]{64}$/;
const REPOSITORY = /^[a-zA-Z0-9_.-]{1,100}\/[a-zA-Z0-9_.-]{1,100}$/;
const BRANCH = /^[a-zA-Z0-9][a-zA-Z0-9._/-]{0,199}$/;

function probableSecret(value) {
  const source = String(value || '');
  return (
    /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i.test(source) ||
    /\b(?:password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key)\s*[:=]\s*\S{6,}/i.test(source) ||
    /\b(?:ghp|github_pat|sk_live|sk_test|xox[baprs])-[_a-z0-9]{12,}\b/i.test(source)
  );
}

function cleanText(value, max = 500) {
  const result = String(value || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
  if (probableSecret(result)) throw new Error('Draft PR metadata must not contain a credential or secret');
  return result;
}

function safeRepositoryPath(value) {
  const path = String(value || '').trim();
  if (
    !path ||
    path.startsWith('/') ||
    path.includes('\\') ||
    path.split('/').includes('..') ||
    /[\u0000-\u001f]/.test(path) ||
    /^\.github\/workflows(?:\/|$)/i.test(path) ||
    /^(?:package|npm|pnpm|yarn|bun)-?lock/i.test(path)
  ) {
    throw new Error('Repository path is outside the allowlist');
  }
  return path;
}

function proposedBranch(capsule) {
  const ref = String(capsule.capsuleId || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').slice(0, 12);
  if (!ref) throw new Error('Capsule reference is invalid');
  return `agentfriendly/capsule-${ref}-v${Number(capsule.version)}`;
}

function comparisonByDestination(comparison) {
  return new Map((comparison.resources || []).map((resource) => [resource.destinationPath, resource]));
}

export function buildDraftPrPlan(raw = {}) {
  const { capsule, comparison } = raw;
  if (capsule?.contract !== 'agentfriendly.publication-capsule.v1') throw new Error('Publication capsule contract is invalid');
  if (comparison?.contract !== 'agentfriendly.origin-comparison.v1' || comparison.status !== 'complete') {
    throw new Error('A complete origin comparison is required');
  }
  if (comparison.capsuleId !== capsule.capsuleId || comparison.manifestSha256 !== capsule?.integrity?.manifestSha256) {
    throw new Error('Comparison manifest does not match the capsule manifest');
  }
  const repository = cleanText(raw.repository, 201);
  if (!REPOSITORY.test(repository)) throw new Error('GitHub repository must use owner/name');
  const baseBranch = cleanText(raw.baseBranch, 200);
  if (!BRANCH.test(baseBranch) || baseBranch.includes('..')) throw new Error('Base branch is invalid');
  const reviewer = cleanText(raw.reviewer || '', 200);
  const mappings = raw.pathMappings && typeof raw.pathMappings === 'object' ? raw.pathMappings : {};
  const resourceIndex = comparisonByDestination(comparison);

  const files = (capsule.files || []).map((file) => {
    const resource = resourceIndex.get(file.destinationPath);
    if (!resource || ['blocked', 'unavailable'].includes(resource.status)) throw new Error('Comparison is incomplete for one or more files');
    const isManual = file.operation === 'manual_merge' || file.operation === 'manual_embed';
    const repositoryPath = isManual
      ? safeRepositoryPath(`.agentfriendly/proposals/${String(file.packagePath).split('/').at(-1)}`)
      : safeRepositoryPath(mappings[file.destinationPath]);
    if (!HASH.test(String(file.sha256 || '')) || typeof file.content !== 'string' || probableSecret(file.content)) {
      throw new Error('Draft PR file contains an invalid hash or secret');
    }
    return {
      sourcePath: file.destinationPath,
      repositoryPath,
      mode: isManual ? 'proposal_only' : 'create_or_update',
      sha256: file.sha256,
      content: file.content,
    };
  });

  const branch = proposedBranch(capsule);
  const title = `Agent Friendly Web: capsule v${capsule.version} for ${capsule.target.hostname}`;
  const body = [
    '## Agent Friendly Web technical draft',
    '',
    `Capsule: ${capsule.capsuleId} v${capsule.version}`,
    `Manifest: ${capsule.integrity.manifestSha256}`,
    reviewer ? `Human reviewer: ${reviewer}` : 'Human reviewer: pending assignment',
    '',
    '**Status: No enviado / not submitted.**',
    'This plan cannot merge, deploy or modify the target website.',
    'Manual proposal files under `.agentfriendly/proposals/` require integration review.',
  ].join('\n');

  const externalVerifierTests = Array.isArray(raw.externalVerifierTests)
    ? raw.externalVerifierTests.slice(0, 12).map((test) => ({
        provider: cleanText(test.provider, 120),
        url: cleanText(test.url, 500),
        phase: 'post_deployment_read_only',
      }))
    : [];

  return {
    contract: DRAFT_PR_PLAN_CONTRACT,
    planId: cleanText(raw.planId || crypto.randomUUID(), 120),
    capsuleId: capsule.capsuleId,
    comparisonId: comparison.comparisonId,
    manifestSha256: capsule.integrity.manifestSha256,
    repository,
    baseBranch,
    branch,
    title,
    body,
    status: 'prepared_not_submitted',
    remoteSubmission: false,
    mergeAllowed: false,
    files,
    localContractTests: files.map((file) => ({ type: 'http_get_and_sha256', path: file.sourcePath, expectedSha256: file.sha256 })),
    externalVerifierTests,
    rollback: files.map((file) => ({ repositoryPath: file.repositoryPath, mode: 'revert_draft_branch_commit_or_close_unmerged_pr' })),
    generatedAt: raw.generatedAt || new Date().toISOString(),
  };
}

export function validateDraftPrPlan(value) {
  if (!value || value.contract !== DRAFT_PR_PLAN_CONTRACT) throw new Error('Draft PR plan contract is invalid');
  if (!value.planId || !value.capsuleId || !value.comparisonId || !HASH.test(String(value.manifestSha256 || ''))) {
    throw new Error('Draft PR plan identity is invalid');
  }
  if (!REPOSITORY.test(String(value.repository || '')) || !BRANCH.test(String(value.baseBranch || '')) || !BRANCH.test(String(value.branch || ''))) {
    throw new Error('Draft PR plan target is invalid');
  }
  if (value.status !== 'prepared_not_submitted' || value.remoteSubmission !== false || value.mergeAllowed !== false) {
    throw new Error('Draft PR plan must remain unsubmitted and unmergeable');
  }
  if (!Array.isArray(value.files) || !value.files.length) throw new Error('Draft PR plan has no files');
  for (const file of value.files) {
    safeRepositoryPath(file.repositoryPath);
    if (!HASH.test(String(file.sha256 || '')) || probableSecret(file.content)) throw new Error('Draft PR plan file is invalid');
  }
  return value;
}

