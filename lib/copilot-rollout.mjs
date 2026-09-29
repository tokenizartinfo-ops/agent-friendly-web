export function isCopilotProjectAllowed({ enabled, allowedProjectId, projectId }) {
  return enabled === true
    && typeof allowedProjectId === 'string'
    && allowedProjectId.length > 0
    && allowedProjectId !== '*'
    && typeof projectId === 'string'
    && projectId === allowedProjectId;
}
