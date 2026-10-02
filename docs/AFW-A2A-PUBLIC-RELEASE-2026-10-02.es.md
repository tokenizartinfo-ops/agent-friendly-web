# A2A público: aceptación y auditoría externa

## Producción comprobada

2 de octubre de 2026, 20:53 UTC. Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web, ambiente producción. Worker independiente `agent-friendly-web-a2a`, dominio `a2a.agentfriendlyweb.dev`; cuenta y zona declaradas en `wrangler.a2a-production.jsonc`. No incorpora bindings privados ni modifica el Worker web.

Código del runtime: `ee62698`. Versión cerrada inicial `0aff6a36-39c0-4be6-b5ee-e27d4b936cb4`, comprobada HTTP404. Servicio habilitado primero sin descubrimiento: `c9a7ec99-84fa-40d9-ac56-25169d304a19`. Versión pública con descubrimiento: `3238969a-d5e8-45c6-9417-fc19452b762a`. API confirma ambos flags true y limitador dedicado 26100202, 6 solicitudes/60 segundos. Este límite nativo es eventual por ubicación, no un presupuesto global estricto.

Ruta exacta `agentfriendlyweb.dev/.well-known/agent-card.json`, ID `a591d752b088447b96dc37639d0247b6`. Conserva el resto del sitio y sus controles de Access. La tarjeta anuncia únicamente JSONRPC A2A1.0 SendMessage para diagnóstico público. No anuncia expedientes privados, transacciones, streaming ni callbacks.

Cliente HTTPS nativo separado aceptó servicio y tarjeta del dominio principal: 15 sondas, 13 HTTP200; bloqueo de URL privada (-32602), versión incompatible (-32009), publicación no autorizada y ráfaga429. Recibos locales ignorados: `output/a2a-public/service-receipts.json` y `apex-receipts.json`. No acredita interoperabilidad con un SDK oficial ni consultas privadas de ChatGPT.

Revisión independiente: corregidos drenaje de ambas familias DNS y envelope JSON-RPC de errores de parseo; código de capacidad -32000. Suite completa717/717; lint sin errores (advertencia preexistente de imagen) y build aprobado.

## Auditor externo

Consulta efectiva a isitagentready.com/mcp, 20:53:10–20:53:23 UTC:

| Perfil | Nivel | PASS | FAIL |
| --- | --- | --- | --- |
| all | 5/5 Agent-Native | 12 | 4 |
| content | 5/5 Agent-Native | 6 | 1 |
| apiApp | 5/5 Agent-Native | 12 | 4 |

Antes, all/apiApp eran4/5 con11PASS y5FAIL. A2A Agent Card ahora pasa. Pendientes: dnsAid, oauthDiscovery, oauthProtectedResource, authMd. El proveedor no devolvió puntuación numérica: esto no demuestra100/100 ni actualiza por inferencia el73/100 informado antes por el owner. Nivel externo5 tampoco certifica capacidades transaccionales.

Respuestas completas locales: `output/external-audit-2026-10-02T20-53-01-862Z`. SHA256 all: `8464c32312130c35454300baa6ad3dfaeb3b57866cde8fa4d1f7e343fc4a6985`; content: `3fd5475704f2f2fcae54e82456ce7cb315166672338750ebfcd6f796fc3a1643`; apiApp: `02a857e5c8740d272e137d7828346ea2c9c426168c83d75fac1b4ffa65b8a9c2`. Repetir con `node scripts/audit-external-readiness.mjs`.

## Continuidad y rollback

Acción autorizada: diagnóstico público acotado, publicación y comprobación; ninguna mutación de expedientes. Para cerrar: `npx wrangler deploy --config wrangler.a2a-production.jsonc --var A2A_ENABLED:false --var A2A_DISCOVERY_ENABLED:false`. Verificar404 en servicio y tarjeta; caché de tarjeta hasta60 segundos. Registrar flags cerrados en configuración si el cierre será permanente. Para retirar la ruta, eliminar únicamente el ID indicado y quitarla de configuración; no eliminar el dominio principal ni sus bindings.

Siguiente bloque: servicio OAuth privado real y registro de cliente ChatGPT antes de publicar metadatos OAuth/Auth.md. DNSSEC sigue pendiente según lectura anterior; comprobar DS y estado actual antes de atribuir progreso. La prueba del gerente cloud con PC apagada continúa separada y no se acredita con este despliegue.
