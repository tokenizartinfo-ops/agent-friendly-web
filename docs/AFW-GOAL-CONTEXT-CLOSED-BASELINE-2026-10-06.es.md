# AFW: base cerrada del lector de objetivos

Fecha local: 6 de octubre de 2026. Recibo API de despliegue:2026-10-07T01:02:12.525213Z.

## Recurso y procedencia

- Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web.
- Fuente exacta42d7fd0c09bcbf5e2b212e5ebfce32358157a810, rama docs/afw-copilot-closed-release-20261006, checkout limpio antes del despliegue.
- CI37554891633 exitosa:1.052tests/pass, lint sin errores (dos advertencias previas) y build completo.
- Cuenta85d0d5dadac3341a564f22ce885e9eec confirmada por Wrangler whoami. CLIcf1.0.0-beta.5 no autenticada; no se usó para operaciones remotas.
- Worker nuevo agent-friendly-web-goal-context-canary. Ausencia previa confirmada por API10007.
- Versión87142980-bce1-47ab-853c-01678e00686a al100%; carga74,63KiB/gzip18,30KiB; inicio3ms.
- Cloudflare aceptó compatibility_date2026-09-28. Esto acredita carga/startup, no ejecución de la lectura habilitada.

## Estado cerrado comprobado por API

Settings200: único binding plain_text AFW_GOAL_CONTEXT_ENABLED=false. No D1, secretos, rate limiter, inscripción, AI ni service binding.
Subdomain200: enabled=false y previews_enabled=false. Schedules200:[]; Wrangler informó «No targets deployed».
No se creó DNS ni dominio de acceso. goal-context-canary.agentfriendlyweb.dev continúa como origen planificado. No hubo solicitudes privadas cloud ni llamadas a modelos.

El canary web previo mantiene assets/AI y D1propia2b518988-eacb-4c31-b760-4e58c3c0285b, copilot/feedbackfalse. No se mutaron webcanary, productor, receptor, Access, custodia operacional, expedientes ni recursos de clientes.

## Preservación y rollback

La versión base87142980 queda conservada como rollback del nuevo recurso. Para una futura activación, volver a esta versión y comprobar flagfalse, ningún binding privado, subdominios/previews deshabilitados y schedulesvacío. Cerrar por separado cualquier ruta/dominio/política/token creado en ese futuro bloque: rollback de código no los revoca por sí solo.
No eliminar ledger ni historial como rollback. Este despliegue no realizó migraciones. No reutilizar una identidad/token operacional como autorización de objetivos privados.

## Criterio del siguiente ensayo

1. Añadir ledger idempotente de propuestas/entregas: una respuesta perdida debe recuperarse sin renovar permiso ni regenerar innecesariamente; reviewed/proposed no equivale a delivered/resolved.
2. Preparar propósito/autenticación/custodia propios de propuesta. El coordinador interno usa adaptadores confiables aún sin transporte criptográfico real ni proveedor configurado.
3. Preservar y ensayar migraciones aditivas únicamente en D1propia; no usar datos o esquema de producción por inferencia. Vincular identidad, audiencia, ruta, cuerpo y ventana finita a inscripción sintética propia.
4. Probar petición real, retirada/regrant/cierre y retorno a expediente con una pregunta y motivo; comprobar aceptación visual pendiente.
5. Restaurar versiónbase, flags/bindings/rutas/políticas/token y comprobar retirada desde cloud antes de considerar cualquier promoción de cliente.

No se declara piloto productivo ni guardia permanente. La publicación cloud actual del source43c54af no incorpora automáticamente estas preparaciones ni prueba custodia/red privada para este propósito.
