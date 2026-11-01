# Fetch nativo para la observación cerrada

PROJECTAFW/repoagent-friendly-web/entornoprivate-qa-closed. No nuevo runtime ni permiso por este diseño.

## Evidencia primaria

Fuente691/main7e951e15/tree5eea3cf3 cualificada en41261162102/job124714538938:25nativasPASS, BASEc570395915B/hash4b557 y wrapper47464B/a36b9d13. Intención técnica05a8a41318207ee557fae3bda4392a3880f8ca613dec839f16a91a685916312a CONSUMIDA; no repetirla. Un upload9441b1ad/DEP542de9c4, un Workflow afw-qa-arm-05a8..., resultado blocked/active_deployments/request_failed/httpStatusnull/reads2. Un restore confirmado c570/DEP95941c31 a01:31:22UTC. Readback independiente25GET01:31:54.628UTC: módulos/configs31/29/7bindings y14/8/3false,20Workflows terminales, Containers/cron/tails vacíos, namespaces/exposición conservados. Recibo issue497#6551817333. Sin OAuth/grant/reserva/D1/DO/KV/Container/Max.

## Diagnóstico y límite

El mock anterior sustituía global fetch y no construía un Request real de Workers. La documentación primaria https://developers.cloudflare.com/workers/runtime-apis/request/ describe que redirect:error produce TypeError antes de enviar; Workers admite follow o manual. cache:no-store sigue permitido en compat2026-09-07, no necesita relajarse. Este contrato también tiene antecedentes AFW de entrega/health en PR224; no atribuirlo a incidente, permisos o cliente por inferencia.

Primero reproducir en Workflow/Miniflare con fetch nativo real y outboundService fijo: probar que Request error rechaza sin envío, exigir dos snapshots completos por el transporte real, y un302 que nunca visite su Location. El backend de prueba devuelve respuestas sintéticas y no llama la red. Después, solo el modo nativo del adaptador usa manual; cualquier status distinto200 sigue rechazado antes del cuerpo. Modo Node/GHA conserva error; cabeceras/no-store/fecha/caché/tamaño/128GETs/2concurrentes/original5s/AbortSignal/pins/fences sin cambios. No follow, nuevo URL o scope.

Pruebas dirigidas y completas/lint/build/revisión antes de merge. Nueva cualificación de fuente y nuevo intento técnico separado solo tras esa evidencia; no reutilizar ventana05a8 ni pedir un grant humano. operationalReadinessfalse; no ARM/guard/retirada/PCoff por esta corrección.
