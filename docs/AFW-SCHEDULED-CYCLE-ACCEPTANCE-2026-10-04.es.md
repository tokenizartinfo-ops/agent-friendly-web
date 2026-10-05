# AFW: ciclo operacional cloud programado aceptado

Evidencia del 4 de octubre de 2026, Buenos Aires; UTC 5 de octubre. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated synthetic operations; ORIGIN operations.agentfriendlyweb.dev / operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Workers/Access/operations D1; RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-manager, D1 603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION una señal sintética firmada, consumidor programado temporal, recuperación sintética y clausura. ROLLBACK flags/token cerrados, deadline/firma retirados; conservar historial. Sin clientes, Tokenizart, scopes privados o cron permanente modificados.

## Cadena aceptada y límites

Señal sintética firmada → tarea cloud disparada por horario → list/claim/finish una vez → recibo D1 independiente → recuperación sintética separada → cierre de accesos verificado. No hubo lanzamiento manual ni reintentos del consumidor. `diagnosed` confirma clasificación del ensayo; no certifica reparación de un fallo real. Este ciclo no prueba vigilancia continua, entrega de alertas watchdog, un webhook arbitrario, estabilidad de latencia ni una nueva prueba PC-off.

El ensayo anterior cancelado permanece en [su recibo](AFW-SCHEDULED-CYCLE-TRIAL-2026-10-04.es.md). Este intento mantuvo la ventana hasta obtener el resultado y usó TZID explícito desde creación.

## Señal y ventana

Control plane verificó canary `aa121311-2d88-4a2f-ad54-b52193cd1c20`, cerrado; no se provocó una caída real. Firma temporal aleatoria en memoria/stdin y secreto Worker, sin archivo/chat/Git. Evento `afw-scheduled-20261005-0019`, resource `afw_delegated_canary`, check `delegated_edge`, observedAt `2026-10-05T00:16:22.130Z`, recepción202/processed1. Fingerprint `f9fa28e7202993a40e938d8ba33cea62f05af51ccc25aa0040fd39fd5722537c`.

Receiver cerrado inmediatamente, versión `f28ca3bc-02d3-44d4-9a3e-0722493988c2`, flagfalse/sin firma/deadline. Manager temporal `574a087d-370a-486a-af0e-4513800a6dda`, deadline servidor `2026-10-05T00:34:00.000Z`. Identidad/audiencia/D1 comparadas con Access; limitador10/60 conservado. Token existente temporalmente habilitado, sin rotación o extensión: versión2, expiry `2026-10-05T17:39:03Z`. Presupuesto previo una reserva en24h y attempts1; no ampliado.

Automation única `6ac2eccc7d808191bcf946a8d1f2c72d`, thread `01a1090b-8557-7242-9bc9-8277bb300018`/durable. Prevista21:19 Buenos Aires; ventana00:19–00:34UTC. `last_run_time=2026-10-05T00:23:33.795649+00:00`, demora4m33.8s. Turno programado `01a10971-c3b7-7300-bdda-b810ff5980a6`; preflight a00:24:03.526UTC y ejecutor00:24:12.130–00:24:13.521UTC. Scheduler y ejecución tienen marcas distintas; no prometer puntualidad exacta.

## Procedencia y recibo independiente

Environment status cloud running/connected/current, source_config_id `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfg_6abe6b6814a481a3aa2299efe46e2fe6`, revisión29. Git stdout: origen https://github.com/tokenizartinfo-ops/agent-friendly-web.git, HEAD `d405902aa669e263b260b150ff785380ce30c104`, árbol limpio incluyendo untracked. Este checkout de tarea existente no acredita restauración fresca del snapshot publicado.

Ejecutor `/workspace/afw-operations/scheduled-cycle.mjs`, hash `ab0e40963646e460e65ee8589ac4c1ffacab362ec320bac7e1ffbf7a04f9a89a`; manifiesto hash `489e586d7364b491ef8e11739441de225429634540b6bfe672a86a351cf0969e`. Ambos comprobados antes de una invocación Node --use-env-proxy, exit0. RequestId fsync antes de claim; runId/expiresAt guardados antes de finish. Checkpoint conservado; sin lectura/impresión de valores secretos.

Root consultó D1 independientemente antes de recuperar:

- requestId `bdf01984-1d38-43db-b589-adc7ac60842a` y runId `1c7c4db3-8980-4843-9478-3f9250e7a0cb` coinciden con la constancia cloud.
- consumer_ref `afw-cloud-manager`, fingerprint y observed_at1791159382130 coinciden con la señal.
- reserved_at1791159853023, expires_at1791160153023 y finished_at1791159853338: lease vigente, requested_outcome=outcome=`diagnosed`.
- Incidente quedó `failed/review`, attempts2: diagnóstico conservado sin inventar recuperación.

## Recuperación separada y clausura

Solo después de esa consulta se retiró acceso consumidor y se envió recuperación sintética202, evento `afw-scheduled-20261005-0019-recovered`, observedAt `2026-10-05T00:25:50.206Z`. D1 confirmó `recovered/closed`, attempts2; historial16eventos/2incidencias/2investigaciones y cero investigaciones activas. Sin borrados.

API final: receiver `1d265a51-96d5-4d2d-ae4f-417c70fcd83c` y manager `a827a2dc-ee05-4f03-9374-4c6d9056ce81`, ambos100%, flagsfalse, cero secretos Worker y sin deadline. Tokenfalse, versión2/expiry original. Peek confirmó automation is_enabledfalse, next_run_timenull y mismo thread; no hizo falta update. Estas versiones sustituyen los cierres anteriores solo como estado comprobado de este ensayo.

## Continuidad

No repetir este ciclo, PC-off, login o transporte aceptados por falta de contexto. Cron del productor ya aceptado: [recibo](AFW-CRON-ACCEPTANCE-2026-10-04.es.md). Próximo resultado necesario: watchdog independiente, pausa deliberada silenciosa, diferencia entre observación vencida y entrega pendiente, transición/aviso deduplicados y recuperación comprobada. Su helper [está preparado](AFW-WATCHDOG-PREPARATION-2026-10-04.es.md), pero no es un runtime activo. Mantenerlo fuera del proceso que vigila; no otorgar acceso Cloudflare genérico al sandbox. Definir identidad vigente y renovación/revocación antes de cadencia estable; la identidad temporal actual no habilita una guardia permanente. Conservar los límites y los cierres existentes.
