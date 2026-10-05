# AFW: recuperación cloud de avisos aceptada

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA sintética aislada; ORIGIN operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Worker/Access/D1; RESOURCE_ID agent-friendly-web-operations-manager, token d12150c5-ba69-412e-bed0-6415103fc2ec, D1QA59974788-5771-4bf5-aba1-a3fba1b70e7e. ALLOWED_ACTION publicación cerrada y ensayo único con respuestas descartadas. ROLLBACK tokenfalse/flagsfalse/sin deadline/cron[], manager restaurado a D1operaciones603c471d-19bb-4530-9773-c02e18b29840; conservar historial.

Fuente33cfdde3dc636334af801ec8ecab7a98a92210f2, PR248/main, CI37317566751 pass1m17s; suite823, lint cero errores/dos warnings previos, build completo. Wrangler4.128.0/account verificados; cf1beta sin sesión, usado solo para descubrir versión. API confirmó identidad/audiencia/limitador y dominio propio antes de mutar. Inventario Access23 apps/una página: cero any_valid_service_token, única referencia del token en aplicación exclusiva5b7e6f71/política73bf6a0f. No ampliación de permisos o vigencia: tokenversión2 conserva expiry2026-10-05T17:39:03Z.

Publicación cerrada7e068a72-0fbc-46cc-879a-ae520b6988e7, flagsfalse/DBoperativa/cron[]/cero secretos. QA recibió exclusivamente esquemas aditivos schema.sql, consumer-state.sql, watchdog-inbox.sql y notice-reservations.sql; antes12outbox/0inbox/0reservas. Fixture manual identificada como sintética: canary paused8→attention9 con delivery_pending, una nueva outbox/inbox; no sondeo real ni inferencia de fallo del sitio. Realpilot permanece paused8.

Versión acotada2946ed2a-bfab-4673-90d5-fef1e417ee2e vinculada EXCLUSIVAMENTE a D1QA. Flags de gates del manager true, deadline2026-10-05T13:58:33.172Z, sin cron o secretos Worker. Esto no activó productor/watchdog real. Token activado únicamente durante el ensayo y cerrado en finally sin extender vencimiento.

Chat cloud01a1090b-8557-7242-9bc9-8277bb300018/durable; turno01a10c4b-80de-7032-bcbd-9b1036d69fd4. Checkout actualizado no destructivamente al origen canónico/33cfdde/clean, sourceconfig/custodia originales preservados. Node --use-env-proxy ejecutó script fuera repo, un proceso/tres instancias nuevas de createOperationsClient y runNoticeCycle reales. Primer ciclo descarta respuesta200 de claim y termina sin retry. Segundo recupera runId desde recibos y descarta respuesta200 de ACK. Tercero recupera accepted y devuelve reconciled. Contadores:1claim descartado/1ACK descartado; exit0,2.902s. Revisado script/ejecución, no solo declaración final del agente; ningún header o valor de credenciales expuesto.

Consulta D1 independiente correlaciona una ÚNICA reserva:
- requestId0c2e268e-3740-4802-8707-62a0113d08c4
- runIdabe39d5e-ea1d-4225-af38-6309ad5df611
- resource afw_delegated_canary/revision9
- reserved_at1791207702484, expires_at1791208002484, acknowledged_at1791207703112
- outcome accepted.

La clausura comprobada por API: manager0afdc102-53eb-436a-b7a9-c9cf9670eedf al100%, binding603c471d de operaciones restaurado, cinco flagsfalse, deadline ausente, cero secretos y schedules[]. Tokenfalse/versión2/expiryoriginal. QA canarypaused10 y realpilotpaused8,13outbox/1inbox/1reserva preservados. D1operativa intacta:16eventos/2incidencias/2investigaciones/2checkpoints/0watchdogstate/0watchdogoutbox. No esquemas inbox/reservation aplicados a DBoperativa, datos de clientes o recursos Tokenizart.

Esto acepta recuperación durable desde Codex cloud contra D1remota tras perder respuestas, conservando identidad y presupuesto. No acredita disparador nuevo de avisos, guardia permanente, diagnóstico, reparación ni contacto al cliente. PC-off y scheduler de investigaciones tienen sus recibos anteriores; no repetirlos. Siguiente: conectar el ciclo aceptado al disparador hosted existente con cierre temporal y notificación solo de cambios; definir resolución trazable de review_required y vigencia/custodia de identidad antes de habilitar cadencia permanente.
