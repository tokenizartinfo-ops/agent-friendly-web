export function isCopilotProjectAllowed({ enabled, allowedProjectId, projectId }) {
  if (enabled !== true || typeof allowedProjectId !== 'string' ||
    !allowedProjectId || allowedProjectId.length > 1500 || typeof projectId !== 'string') return false;
  let ids;
  if (allowedProjectId.trimStart().startsWith('[')) {
    try { ids = JSON.parse(allowedProjectId); } catch { return false; }
  } else ids = [allowedProjectId];
  if (!Array.isArray(ids) || !ids.length || ids.length > 10 ||
    ids.some(id => typeof id !== 'string' || !/^[a-z0-9][a-z0-9_-]{0,127}$/i.test(id)) ||
    new Set(ids).size !== ids.length) return false;
  return ids.includes(projectId);
}
