export const HOME_MARKDOWN = `---
title: Agent Friendly Web
description: Auditoria y mejora progresiva para sitios comprensibles por personas y agentes.
canonical: https://agentfriendlyweb.dev/
---

# Agent Friendly Web

Agent Friendly Web ayuda a observar, documentar y mejorar como un sitio publico puede ser descubierto, comprendido y utilizado por agentes. Separa evidencia observada, declaraciones del owner, recomendaciones y capacidades futuras.

## Empezar

- Como empezamos: https://agentfriendlyweb.dev/#tu-primer-paso
- Expediente privado (requiere ingresar con una cuenta habilitada): https://agentfriendlyweb.dev/expediente
- Auditor publico: https://agentfriendlyweb.dev/
- Metodologia AF-0 a AF-5: https://agentfriendlyweb.dev/metodologia
- Verificacion externa AF-EV: https://agentfriendlyweb.dev/verificacion-externa
- Guia publica: https://agentfriendlyweb.dev/guia
- Caso Tokenizart: https://agentfriendlyweb.dev/casos/tokenizart

## Del objetivo a la comprobacion

1. Entender que ofrece el negocio, a quien y que deberia comprender un asistente. Separar declaraciones del propietario, fuentes y observaciones comprobables.
2. Preparar prioridades y archivos propuestos para revision. El propietario revisa el contenido y acuerda quien puede publicarlo: el o su mantenedor.
3. Una vez aplicados los cambios, comparar los archivos y registrar fecha, resultado y pendientes. Preparar una propuesta no demuestra que se haya publicado.

AFW busca informacion descubrible, verificable y eficiente. El puntaje orienta; no sustituye veracidad y utilidad. La vision futura incluye procesos y herramientas con IA por capas, cada una con alcance, permisos y comprobacion propios. La supervision cloud continua sigue en validacion y no se ofrece como servicio activo.

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
