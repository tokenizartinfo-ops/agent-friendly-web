export const HOME_MARKDOWN = `---
title: Agent Friendly Web
description: Auditoria y mejora progresiva para sitios comprensibles por personas y agentes.
canonical: https://agentfriendlyweb.dev/
---

# Agent Friendly Web

Agent Friendly Web ayuda a observar, documentar y mejorar como un sitio publico puede ser descubierto, comprendido y utilizado por agentes. Separa evidencia observada, declaraciones del owner, recomendaciones y capacidades futuras.

## Tu web como fuente propia

Menos clics humanos no significa menos valor para una web propia. Aunque la respuesta llegue a traves de un asistente, un sitio puede reunir el proposito, alcance, publico, fuentes, documentacion y herramientas reales de su responsable. AFW acompana a personas y organizaciones a comunicar ese valor por capas, con informacion clara, descubrible y verificable.

Una declaracion del propietario no equivale a una comprobacion. Deben distinguirse responsable, fecha, evidencia, limites e incertidumbre, y conservar coherencia con lo que realmente se ofrece. Esto facilita que personas y agentes puedan encontrar, interpretar y evaluar la informacion; no garantiza que la consulten, recomienden o elijan. La web tampoco es la unica fuente posible de un asistente.

## Qué hacemos en AFW

Te ayudamos a que tu sitio sea más fácil de encontrar, entender y utilizar. Ordenamos qué ofrecés, para quién y con qué respaldo. Te acompañamos a preparar contenidos, documentos y mejoras que hagan esa información más clara para personas y agentes de IA, con vos y con quien mantiene tu sitio.

La transformación agéntica ocurre por capas. No necesitás resolver todo de una vez: empezamos por lo que hoy necesita tu sitio. Cada nivel requiere evidencia y controles; un plan no equivale a una capacidad desplegada. Esta evolución no garantiza recomendaciones, citas, posición en buscadores ni ventas.

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
