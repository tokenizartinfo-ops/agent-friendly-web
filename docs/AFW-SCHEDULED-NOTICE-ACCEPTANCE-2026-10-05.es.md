# AFW: recepción programada de un aviso aceptada

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA sintética aislada; ORIGIN operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Worker/Access/D1/hosted automation; RESOURCE_ID manager propio, D1QA59974788-5771-4bf5-aba1-a3fba1b70e7e, automatización6ac2eccc7d808191bcf946a8d1f2c72d. ALLOWED_ACTION una recepción sintética programada y clausura. ROLLBACK token deshabilitado, manager cerrado con D1operativa original603c471d-19bb-4530-9773-c02e18b29840, conservar tablas e historial.

## Evidencia aceptada

Fuente congelada33cfdde3dc636334af801ec8ecab7a98a92210f2, PR248/CI37317566751:823 tests, lint cero errores/dos warnings existentes y build completo. El ensayo anterior de pérdida de respuestas tiene su recibo separado en AFW-NOTICE-CLOUD-ACCEPTANCE-2026-10-05.es.md.

Fixture manual sintética canary paused12→attention13, delivery_pending, admitida en inbox; realpilot permanece paused8. No acredita sondeo o fallo real. Manager9cb3d31b-f6a0-41fa-85f7-573fe94fd540 ligado exclusivamente a QA, gates temporales true, deadline14:29:49.185Z; cron vacío y sin secretos Worker. Token habilitado temporalmente, sin ampliar vencimiento2026-10-05T17:39:03Z.

Automatización existente ligada al chat01a1090b-8557-7242-9bc9-8277bb300018/durable, ocurrencia única2026-10-05 11:12 America/Buenos_Aires/14:12UTC. Sin run_now ni lanzamiento manual del ciclo. Peek posterior: last_run_time2026-10-05T14:18:10.023198+00:00, enabledfalse; demora6m10.023s. No garantía de puntualidad.

Turno programado01a10c6d-dea0-7612-bc90-6c0c979241bf comprobó contexto cloud, origen Git canónico/HEAD33cfdde/árbol limpio. Node --use-env-proxy ejecutó /workspace/afw-operations/notice-scheduled-revision13.mjs fuera del repositorio, usando createOperationsClient/runNoticeCycle reales una sola vez. Inicio14:18:30.654Z/cierre14:18:32.800Z, exit0; received y posterior lectura de recibo accepted. No reintentos, diagnósticos o reparación.

Consulta D1 independiente confirma resource afw_delegated_canary/revision13, runId eb00744f-d84a-4d4c-a7d0-584e848e1e6b, reserved_at1791209911986, acknowledged_at1791209912296, outcomeaccepted. Dos reservas totales: revisión9 anterior y revisión13 actual; ninguna reserva del intento11.

## Clausura verificada

Manager final a27a3088-fa6a-454f-9712-64312e518861, D1operativa original restaurada, cinco flagsfalse, deadline ausente, schedules[] y cero secretos confirmados por API. Tokenfalse con vencimiento original. QA canarypaused14/realpilotpaused8, recibos preservados. D1operativa mantiene16eventos/2incidencias/2investigaciones; inbox/reservations todavía no aplicadas allí. Automatización deshabilitada por su única ocurrencia, confirmado sin nueva ejecución.

## Intentos anteriores y regla para próximos ensayos

El primer intento se clausuró13:54:30.779Z antes de su hora13:54:32Z: root contó respuestas inmediatas de wait_threads como intervalos transcurridos. Fixture11 quedó sin reserva; conservarlo. La reprogramación14:00:50 disparó14:07:21.590570Z durante la compactación, con piloto cerrado: turno01a10c63 terminó Operational request unavailable, sin reserva. No atribuirlo a fallo del producto o del programador.

Preparar fixture/ventana/token ANTES de programar. Medir timeout con reloj real Date.now, nunca cantidad de respuestas. wait_threads puede regresar inmediatamente para un chat idle incluso con cursor actualizado; aplicar backoff real de30s. Correlacionar turno nuevo posterior al horario, comando real y D1; cerrar en finally ante éxito/error/timeout, manteniendo historial. next_run_time null no demuestra fallo de ejecución.

## Alcance y próximos bloques

Acepta disparador hosted→ciclo real→reserva/ACK→recibo D1 de un aviso sintético. No acredita guardia permanente, nuevo ensayo PC-off, reparación, aviso a cliente ni restauración de un snapshot cloud nuevo. No repetir pruebas ya aceptadas. Preparar resolución trazable de review_required y esquema aditivo operativo cerrado; antes de cadencia permanente resolver vigencia/custodia de identidad y política de escalamiento. No extender automáticamente la identidad temporal ni borrar recibos para desbloquear presupuesto.
