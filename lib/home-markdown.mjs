export const HOME_MARKDOWN = `---
title: Agent Friendly Web
description: Auditoria y mejora progresiva para sitios comprensibles por personas y agentes.
canonical: https://agentfriendlyweb.dev/
---

# Agent Friendly Web

Agent Friendly Web ayuda a observar, documentar y mejorar como un sitio publico puede ser descubierto, comprendido y utilizado por agentes. Separa evidencia observada, declaraciones del owner, recomendaciones y capacidades futuras.

## Empezar

- Auditor publico: https://agentfriendlyweb.dev/
- Metodologia AF-0 a AF-5: https://agentfriendlyweb.dev/metodologia
- Verificacion externa AF-EV: https://agentfriendlyweb.dev/verificacion-externa
- Guia publica: https://agentfriendlyweb.dev/guia
- Caso Tokenizart: https://agentfriendlyweb.dev/casos/tokenizart

## Recursos para agentes

- OpenAPI: https://agentfriendlyweb.dev/openapi.json
- API Catalog: https://agentfriendlyweb.dev/api-catalog
- ARD: https://agentfriendlyweb.dev/.well-known/ard.json
- MCP Server Card: https://agentfriendlyweb.dev/.well-known/mcp/server-card.json
- Agent Skills: https://agentfriendlyweb.dev/.well-known/agent-skills/index.json
- OKF v0.2: https://agentfriendlyweb.dev/okf/v0.2/index.md
- External readiness: https://agentfriendlyweb.dev/.well-known/external-readiness.json

## Limites

La escala AF es una metodologia propia y no una certificacion oficial. La evidencia publica no garantiza indexacion, ranking, citacion o recomendacion por un proveedor. OAuth, A2A, DNS-AID y pagos solo se publican cuando existe una capacidad real y verificada.
`;

export function createHomeMarkdownResponse() {
  return new Response(HOME_MARKDOWN, {
    headers: {
      'cache-control': 'public, max-age=3600',
      'content-type': 'text/markdown; charset=utf-8',
      vary: 'Accept',
    },
  });
}
