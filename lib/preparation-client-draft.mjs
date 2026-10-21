import { readRecord, ref, oauthClientRef } from './agent-consumption-input.mjs';

// Internal metadata only: syntax validation never proves registration or grants access.
const ISSUER = 'https://preparation-canary.agentfriendlyweb.dev';
const AUTHORITY = Object.freeze({
  createAllowed: false, registrationVerified: false, sourceVerified: false,
  consentGranted: false, authorizationGranted: false, operationalReadiness: false,
  executionAllowed: false, chargeAllowed: false, publicationAllowed: false,
});
function freeze(value) {
  for (const child of Object.values(value)) if (child && typeof child === 'object') freeze(child);
  return Object.freeze(value);
}
export function buildPreparationClientDraft(input) {
  const config = readRecord(input, ['issuer', 'projectId', 'clientId']);
  if (!config || config.issuer !== ISSUER || !ref(config.projectId) || !oauthClientRef(config.clientId)) {
    return Object.freeze({ ...AUTHORITY, status: 'blocked', mcpServer: null });
  }
  const resource = ISSUER + '/mcp';
  return freeze({
    ...AUTHORITY, status: 'draft_only', pkceMethod: 'S256', callbackValidationRequired: true,
    mcpServer: {
      type: 'streamable-http', url: resource,
      extensions: { 'com.openai': { auth: {
        type: 'oauth',
        client: { mode: 'provided', clientId: config.clientId, tokenEndpointAuthMethod: 'none' },
        authorizationUrl: ISSUER + '/authorize?' + new URLSearchParams({ project: config.projectId }),
        tokenUrl: ISSUER + '/oauth/token', authorizationServerBase: ISSUER, resource,
        baseScopes: ['afw:project:read'], defaultScopes: ['afw:capsule:prepare'], oidcEnabled: false,
      } } },
    },
  });
}
