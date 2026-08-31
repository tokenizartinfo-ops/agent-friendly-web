import { validateDraftPrPlan } from './draft-pr-plan.mjs';

function providerRequest(plan) {
  validateDraftPrPlan(plan);
  return {
    repository: plan.repository,
    baseBranch: plan.baseBranch,
    branch: plan.branch,
    title: plan.title,
    body: plan.body,
    draft: true,
    mergeAllowed: false,
    files: plan.files.map((file) => ({
      path: file.repositoryPath,
      content: file.content,
      sha256: file.sha256,
      mode: file.mode,
    })),
  };
}

export class DryRunDraftPrProvider {
  async prepare(plan) {
    return {
      provider: 'dry_run',
      status: 'prepared_not_submitted',
      remoteSubmission: false,
      mergeAllowed: false,
      request: providerRequest(plan),
    };
  }
}

export class GitHubDraftPrProvider {
  constructor({ enabled = false, client = null } = {}) {
    this.enabled = enabled === true;
    this.client = client;
  }

  async submit(plan) {
    if (!this.enabled) throw new Error('GitHub Draft PR remote submission is disabled');
    if (!this.client || typeof this.client.createDraftPullRequest !== 'function') {
      throw new Error('GitHub Draft PR client is unavailable');
    }
    const request = providerRequest(plan);
    const result = await this.client.createDraftPullRequest(request);
    if (!result?.draft || !Number.isInteger(result.id) || !/^https:\/\/github\.com\//.test(String(result.url || ''))) {
      throw new Error('GitHub provider did not create a verifiable draft');
    }
    return {
      provider: 'github',
      status: 'submitted_as_draft',
      draft: true,
      mergeAllowed: false,
      id: result.id,
      url: result.url,
    };
  }
}
