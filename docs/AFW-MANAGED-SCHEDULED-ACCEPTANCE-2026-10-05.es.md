# AFW: ciclo programado con identidad gestionada aceptado

## Evidencia del disparador y ejecutor

Automation `6ac42c5f75288191b991f0d8fc04cc74`, chat normal cloud AFW `01a10e3b-05fe-72b1-aa51-24163557a012`. Ocurrencia única prevista5octubre2026 20:17America/Buenos_Aires (23:17UTC), sin run_now ni ejecución manual. `last_run_time=2026-10-05T23:21:46.289582+00:00`: demora4min46.290s, sin garantía de puntualidad.

Turno programado `01a10e5f-8e35-71a1-91ce-e5c42335d6dc`, preflight23:22:03UTC: entorno/fuente publicada exactos, revisión25/25, observaciones actuales/enforced/bindingsready, HEAD `a4d90d438cb5ebca855e46637aff91ec45610b9f`, origin canónico y checkout limpio. Permiso de ejecución de red soportado; proxy/CA/TLS preservados. Metadata de modelo no disponible al ejecutor; GPT6.1SolBajo fue la selección UI observada al crear la tarea, no una atribución de metadata del turno.

Los módulos reales createOperationsClient/runNoticeCycle ejecutaron una vez: GET `/notices/receipts`23:22:36.102UTC y GET `/notices`23:22:36.231UTC, ambos200. Wrapper impedía POST/otrasrutas antes de red. Resultado `reviewed`, `close_obsolete`, `producer_paused`, `superseded`, reserva sintética `da244660-5e84-4616-ae03-057cd8314b65`. Sin escrituras, reintentos, claim/ACK, correo ni reenvío de avisos.

## Ensayo anterior conservado

La primera ocurrencia23:07UTC registró last_run23:12:01.073424UTC. Una consulta de metadata enviada por root coincidió con el arranque y desvió el turno antes de HTTP: no acepta ciclo funcional. Se corrigió el contrato para conservar la tarea ante consultas, se observó el segundo ensayo externamente sin mensajes y se retiró una exigencia de metadata de modelo no expuesta por el runtime. El entorno/fuente/red/identidad/ventana siguen siendo precondiciones obligatorias. No se amplió vigencia de credenciales ni se simuló el disparo mediante ejecución manual.

## Alcance y cierre independiente

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT QA sintética; ORIGIN operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE manager/Access/D1/automation; RESOURCE_ID manager y D1QA `d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46`; ALLOWED_ACTION una ejecución programada, dos GET sintéticas y retirada; ROLLBACK flags/deadline cerrados, D1operacional original, token disabled y selector Access anterior; preservar historial.

Ventana QA cerraba23:35UTC; manager temporal `4f2c1b66-95a0-42c2-8d32-ff3f012175aa`. La lectura independiente D1 posterior mantiene dos revisiones/una reserva y foreign_key_check vacío. Productor/receptor/watchdog operacionales permanecieron cerrados durante todo el ensayo.

Cierre: manager `0424a048-d084-48f7-90b3-03c0d9ee66a2`, seisflagsfalse, deadline ausente, D1 original `603c471d-19bb-4530-9773-c02e18b29840`; token gestionado disabled y selector anterior restaurado, comprobados mediante API. Peek23:23:23UTC confirma automationdisabled/nextnull y last_run de segundaocurrencia. No ejecuciones futuras ni guardia permanente.

Este bloque acepta scheduler→contextoAFW→cliente real→lectura terminal→cierre con identidad gestionada. La operación continua del circuito productor/watchdog/receptor requiere promoción propia conforme AFW-MANAGED-OPERATING-PLAN-2026-10-05.es.md. No repetir PCapagada/CSRF/carga de claves ya aceptadas.
