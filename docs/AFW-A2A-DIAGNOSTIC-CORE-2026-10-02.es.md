# A2A: núcleo de diagnóstico público

2 octubre 2026. Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web; rama feat/afw-a2a-diagnostic-core-20261002. Preparación local, sin endpoint, Agent Card ni cambio productivo. No mejora externa de puntuación acreditada.

Implementado lib/public-a2a.mjs: JSON-RPC SendMessage, versión 1.0, ROLE_USER/ROLE_AGENT y respuesta message con partes data según especificación https://a2a-protocol.org/latest/specification/ consultada hoy. Entrada acotada a URL pública y locale es/en/pt. Reutiliza runPublicAudit y sus controles DNS/SSRF/redirect/timeout/tamaño; devuelve observación y buildScanActionPlan sin autorización de publicación.

Sin archivos, texto de instrucciones, callbacks, credenciales, taskId/contextId suministrados por cliente, mutaciones, expediente privado ni almacén de tareas. Límite de concurrencia por instancia (no equivale a límite distribuido). Errores saneados. No declara streaming, push ni interoperabilidad externa.

Cinco pruebas específicas pasan: salida fechada, entrada privada/ambigua, continuación/callback, concurrencia y saneamiento, incompatibilidad de métodos/versiones/batch/notifications. Falta transporte HTTP limitado, rate limiting distribuido antes de exposición, prueba de cliente independiente, canary remoto y promoción medida. Publicar tarjeta únicamente después de comprobar el servicio disponible.

DNS: consulta pública Google DoH DS agentfriendlyweb.dev el 02/10/2026 18:45:59.432 UTC: Status 0, AD true, Answer ausente. Sigue ausencia autenticada de DS, no validación positiva del dominio. cf 1.0.0-beta.5 instalado pero auth whoami indica no autenticado; no se mutó Cloudflare ni se cargaron credenciales.

Prueba PC apagado separada: declaración owner 14:59–15:32; UI horario avanzó a 16:00 pero no se observó recibo de ejecución. No aceptada por inferencia.

Rollback local: retirar módulo/pruebas antes de integrar. No hay recurso remoto que revertir. Siguiente bloque: transporte cerrado con presupuesto y contrato A2A independientes de OAuth privado, después canary y auditoría externa comparable.
