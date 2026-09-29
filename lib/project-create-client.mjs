export function createProjectRequest(fields, key, transport = fetch) {
  const body = JSON.stringify({ contract: 'agentfriendly.project-create.v1', confirmCreate: true,
    idempotencyKey: key, website: fields.website, organization: fields.organization || '' });
  let pending;
  return function submit() {
    if (pending) return pending;
    pending = (async () => {
      const response = await transport('/api/projects', { method: 'POST', headers: { 'content-type': 'application/json' }, body });
      const payload = await response.json();
      if (!response.ok || typeof payload?.project?.id !== 'string' || !payload.project.id) throw Object.assign(new Error('Project creation not confirmed'), { status: response.status });
      return payload.project;
    })().finally(() => { pending = undefined; });
    return pending;
  };
}
