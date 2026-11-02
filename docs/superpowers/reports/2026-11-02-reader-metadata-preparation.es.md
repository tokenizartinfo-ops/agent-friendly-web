# AFW: metadata del lector existente — 2 noviembre 2026

Root consultó UNA vez, mediante Cloudflare MCP autorizado, GET /accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/9aa97ad1fc9afe3021cf69ea497d5190. Repositorio tokenizartinfo-ops/agent-friendly-web; recurso token AFW; acción permitida solo lectura de metadata. No consulta de contenidos/casos/Workflows, verificación con la clave guardada, cambios, renovación, nuevos permisos o extracción de secretos.

Timestamp comunicado por la herramienta:2026-11-02T20:34:58.485Z. Es fecha de esa observación de metadata, no medición de reloj ni cierre del runtime AFW.

Resultado saneado:
- Estado declarado active.
- not_before2026-10-28T03:00:00Z; expires_on2026-11-03T02:59:00Z, sin extensión.
- Individual Workers Content Read-Only (1b68681d11f443a4979c6d08c3211f13): solo canary7d96bc137a854faa875ee0f160119810 y operador eeb065ef40144ef1af6c5f75e7ab6b12.
- Workers Metadata Read-Only (da1261c3d38544a4bba805b22566f8b6) y Workers Containers Read (cfd39eebc07c4e3ea849e4b3d2644637): cuenta indicada.
- No grupo Workers Tail Read ni Workers Scripts Read/Write tradicional aparece en esta respuesta. No convertir nombres/metadata en prueba de capacidad de un endpoint concreto.

La búsqueda del OpenAPI oficial para GET Workflow list/status declara Workers Tail Read / Workers Scripts Read / Workers Scripts Write. No declara Metadata Read en esas operaciones. Esto deja la capacidad REST con9aa SIN VERIFICAR; no se efectuó un sondeo ni se amplió la clave. El binding nativo fijo Workflow.get(id).status() es una vía documentada distinta para una instancia exacta, sin promesa de listado ni queuedAt/calleridentity.

Este GET no prueba que AFW_MCP_CLOSURE_READ_TOKEN contenga esa clave, ni identidad efectiva/alcance actual del ejecutor, ni disponibilidad del proveedor, ni cierre de procesos. Sourcequalification/custody y actual endpointcapability siguen como gates de preparación. Mantener failclosed ante401/403; no asumir claveincorrecta ni reconectar/rotar porinferencias.

operationalReadiness=false. completePackage=false. PCoff=false.
