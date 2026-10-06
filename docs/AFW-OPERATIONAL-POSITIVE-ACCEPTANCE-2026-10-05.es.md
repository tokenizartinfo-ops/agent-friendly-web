# AFW: circuito operacional positivo y cierre verificado

Evidencia del5octubre2026 en BuenosAires, 6octubreUTC. Acepta un ensayo real acotado de cron→sonda pública→entrega firmada→checkpoint→watchdog→lectura cloud. No activa guardia continua ni acredita reparaciones automáticas.

## Alcance y procedencia

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT operacional acotado; ORIGIN operations.agentfriendlyweb.dev / operations-manager.agentfriendlyweb.dev, productor/watchdog sin rutas públicas; RESOURCE_TYPE Workers/crons/Access/D1; RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-producer, agent-friendly-web-operations-watchdog, agent-friendly-web-operations-manager y D1original603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION preparación cerrada, observación exclusiva de dos bordes públicos delegados, señales firmadas y dos GET cloud; ROLLBACK gatesfalse, deadlines/crons ausentes, retirar firma y token gestionado, restaurar selector y preservar journal.

Fuente localbb338f62efe356ba21453f8d794e1fb1fad31b06, con código del productor PR280/mainc11a0d0 y CI37391570075:906tests/906pass/0fail, lint/build success. Este bloque cambia configuración temporal, no código funcional ni esquema. No utiliza expedientes, correo, datos de clientes o recursos Tokenizart/Atelier. El journal sigue separado de QA; no se copian fixtures para obtener un resultado positivo.

## Diagnóstico y preparación estable

El ensayo anterior queda conservado en AFW-OPERATIONAL-CRON-RECEIPT-2026-10-05.es.md. La consulta específica GraphQL workersInvocationsScheduled confirmó ejecuciones históricas exitosas de este mismo productor en production. Accountsettings indicó standard/green_computefalse. El manejador respondió outcomeok/noRetryfalse en workerd local cerrado; eso solo descarta un fallo de carga en esa condición y no se cuenta como disparo remoto.

Se separó la propagación del cron de la ventana funcional. `wrangler triggers deploy` preparó ambos cron cada minuto con gatesfalse, sin deadline ni firma:

- Productor: created_on/modified_on00:36:06.722043UTC.
- Watchdog: created_on/modified_on00:36:20.807021UTC.

El tail del productor mostró una invocación programada Ok antes de00:47:56UTC mientras permanecía cerrado. Solo entonces se generó una firma temporal en memoria, se puso en custodia servidor y se preparó deadline01:02:57.332UTC (5octubre22:02:57BuenosAires). Nunca se imprimió, guardó en archivo o recuperó su valor.

Se activaron versiones con versions upload/deploy, sin reaplicar triggers: receptor63895f9c-427d-4eb4-a3c7-0908bd121392 y productor569a2ed6-c029-4be5-9418-c68716d20b75, al100%. API00:49:15 confirmó flagstrue, deadline común, presencia de firma y modified_on original del cron. Las seis rutas /mcp y metadataOAuth de delegated-canary/delegated-pilot habían devuelto404, correspondiente al modo esperadoclosed; sus versionesaa121311/94a3c291 no se modificaron.

La preparación estable produjo una aceptación positiva. Esto no demuestra cuál fue la causa interna de la ausencia de evidencia en el primer ensayo. GraphQL todavía devolvía listas vacías al aparecer el tail: su retraso no debe confundirse con ausencia absoluta de ejecución. Los timestamps D1 y outputs cloud siguientes son la constancia UTC; la presentación local del tail no se usa para convertir AM/PM.

## Productor y entrega firmada

Sin disparo manual ni ruta de ejecución HTTP. Primera lectura00:50:18UTC:

| Recurso | Primera confirmación Unixms | Segunda observación Unixms | Resultado |
| --- | --- | --- | --- |
| afw_delegated_canary | 1791247791045 | 1791247850499 | recovered/pending0/lease0 |
| afw_delegated_real_pilot | 1791247791690 | 1791247850731 | recovered/pending0/lease0 |

Primera confirmación corresponde a00:49:51UTC; segundo ciclo a00:50:50UTC. Ambos tiempos avanzaron automáticamente, separados aproximadamente59segundos. Eventos16→18 por dos confirmaciones; el segundo ciclo conservó18 y las confirmaciones anteriores. Tail continuó mostrando ejecuciones programadas Ok. Esto acepta entrega real firmada por servicebinding, persistencia y supresión saludable de duplicados; no se inventó una falla de servicio.

## Watchdog sin alerta falsa

Después de confirmar checkpoints frescos, se activó3d0a5a30-55eb-4f13-a479-dece03f2177b con tresflagstrue/deadline común y cron sin cambios. Tail mostró invocaciones Ok. D1 registró ambos recursos healthy, revision1, previous_conditionvacío, changed_at1791247910380 (00:51:50.380UTC). Lecturas siguientes avanzaron checked_at conservando revision1: outbox0/inbox0. El primer estado saludable no fabricó un aviso recovered sin una condición problemática previa.

## Lectura desde cloud

Managercdb24f1f-17b3-4f91-a343-de7d59169e2b al100%, D1operacional original; consumer/notices/producer/watchdogtrue, sharedbudget/reviewsfalse, sin cron propio. Selector Access exclusivo del token gestionado1bf43326, habilitado temporalmente sin modificar vigencia4noviembre22:09:32UTC ni rotar claves.

Chat cloud existente01a10e3b-05fe-72b1-aa51-24163557a012, turno01a10eb3-b134-70a4-b454-9551d0a18035. Preflight actual/current/enforced/bindingsready, revisión29/29, publicación38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac423b3521081a3a3f40cb4fc25bfc0, HEADa4d90d438cb5ebca855e46637aff91ec45610b9f, origin canónico/checkoutlimpio. Snapshot cloud y fuente backend son distintos; no afirmar que cloud estaba en main nuevo.

Outputs reales verificados mediante read_thread, además del resumen final:

- 00:54:21.129UTC GET /notices/receipts200.
- 00:54:21.310UTC GET /notices200.
- 00:54:21.311UTC statusidle/requests2/blockedfalse.

Módulos createOperationsClient/runNoticeCycle, Node --use-env-proxy y permiso adicional de ejecución de red soportado. Wrapper rechazaba POST, rutas/destinos adicionales, query/hash, tercera consulta y vencimiento antes de red. Proxy/CA/TLS preservados. Sin retries, claim/ACK, correo, automations, gitfetch/checkout ni mutaciones. No hubo que pedir login o volver a cargar claves.

## Cierre independiente

00:54:53UTC token gestionado disabled y selector anterior d12150c5 restaurado. Configuraciones cerradas explícitas, retirar ambos cron, DELETE firma exclusivamente en receptor/productor, detener tails y runtime local propios. La eliminación de secretos creó versiones adicionales; no usar los IDs iniciales de rollback como versión final.

API00:56:20UTC comprobó100%, todas las gatesfalse, ningún deadline ni cron, D1original en los cuatro:

- Receptor03ba90ef-9f42-4f06-9c0e-7ccb02ca5206; firmaausente.
- Productor87584dce-f191-4779-8cbb-48a2a2d59f6a; firmaausente/servicebindingconservado.
- Watchdogbf9322b6-1e3c-4747-86d5-6dd103327981.
- Manager835b5bf2-5e29-40cd-919c-840b20a8d420; custodia de clientIDservidor conservada, seisflagsfalse.

Journal final18events/2incidents/2investigations; watchdoghealthy2/revision1; outbox/inbox/reservations/reviews0, foreign_key_check vacío. Últimas observaciones1791248090537/1791248090768; confirmed_at sigue1791247791045/1791247791690, pending0/lease0. API00:56:56 revalidó token disabled, vigencia original y selector anterior. Programación del chat cloud no se modificó por esta ejecución manual de aceptación; permanece la retirada documentada en la aceptación programada previa.

## Continuación

Este circuito acotado ya está aceptado. No repetir PCapagada, CSRF, entrada de credenciales o esta misma aceptación sin cambios relevantes. El siguiente bloque es promoción de cadencia/ventana, presupuesto, expiración y responsable de cierre conforme AFW-MANAGED-OPERATING-PLAN-2026-10-05.es.md. Una lectura idle no repara incidentes ni acredita guardia permanente. Conservar la preparación cerrada del cron y su verificación como paso previo obligatorio a abrir futuras ventanas.
