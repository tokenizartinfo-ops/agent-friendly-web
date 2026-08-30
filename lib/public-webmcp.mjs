function safeErrorMessage(payload, status) {
  const message = payload && typeof payload === 'object' && typeof payload.error === 'string'
    ? payload.error
    : `Public audit failed with status ${status}`;
  return message.replace(/[\r\n\t]+/g, ' ').slice(0, 240);
}

export function createPublicAuditWebMcpTool({ fetchImpl = globalThis.fetch } = {}) {
  if (typeof fetchImpl !== 'function') throw new TypeError('fetchImpl must be a function');
  return {
    name: 'afw.audit_public_site',
    description: 'Run the Agent Friendly Web public read-only audit for one public HTTP website.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        url: { type: 'string', description: 'Public HTTP or HTTPS website to audit.', maxLength: 2048 },
      },
      required: ['url'],
    },
    async execute(input = {}) {
      const url = typeof input.url === 'string' ? input.url.trim() : '';
      if (!url) throw new Error('Se requiere una URL publica.');
      const response = await fetchImpl('/api/scan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new Error(`Public audit failed with status ${response.status}`);
      }
      if (!response.ok) throw new Error(safeErrorMessage(payload, response.status));
      return JSON.stringify(payload);
    },
  };
}
