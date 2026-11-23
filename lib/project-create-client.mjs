export function createProjectRequest(fields, key, transport = fetch) {
  const body = JSON.stringify({ contract: 'agentfriendly.project-create.v1', confirmCreate: true,
    idempotencyKey: key, website: fields.withoutWebsite ? '' : fields.website, organization: fields.organization || '',
    ...(fields.withoutWebsite === true ? { withoutWebsite: true, ownerBinding: fields.ownerBinding } : {}) });
  let pending;
  return function submit() {
    if (pending) return pending;
    pending = (async () => {
      const response = await transport('/api/projects', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body,
        ...(fields.withoutWebsite ? { redirect: 'manual', signal: AbortSignal.timeout(15000) } : {}),
      });
      if (!response.ok) throw Object.assign(new Error('Project creation not confirmed'), { status: response.status });
      const payload = await response.json();
      if (typeof payload?.project?.id !== 'string' || !payload.project.id) throw new Error('Project creation not confirmed');
      return payload.project;
    })().finally(() => { pending = undefined; });
    return pending;
  };
}
