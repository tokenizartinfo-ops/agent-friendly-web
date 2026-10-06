# AFW: entrega y revisión cloud del expediente propio

Evidencia del 6 de octubre de 2026. Ensayo propio y acotado; no inscripción de clientes ni guardia permanente. Contrato y preparación: AFW-DOSSIER-SUPERVISION-CONTRACT-2026-10-06.es.md.

**Resultado final: aceptado y cerrado.** Tres eventos entregados, una revisión de última versión, lectura programada real HTTP200 y retirada HTTP401. Todos los flags/ventanas/cron cerrados; bases originales restauradas y QA preservada. Los apartados siguientes conservan secuencia y fricciones observadas; no convertir sus estados intermedios en pendientes actuales.

## Alcance y procedencia

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, fuente funcional publicada `d770e1fd23b661c306437cd3e0ae32af6711b226`. Instancia cloud `01a111f5-83b3-766d-baf1-fe7d05af102f`, host durable, AFW Operations / GPT-6.1 Sol Bajo. No fetch/checkout para sustituir la fuente publicada.

Fuente del ensayo: expediente propio sintético en web canary, base `2b518988-eacb-4c31-b760-4e58c3c0285b`. Owner resuelto por servidor y custodiado en inscripción secreta; no exportado aquí. Ledger QA `dcd5daef-0856-4da3-bf95-7dddbf7cf303`, cursores QA `c28f23db-bf68-4461-adbd-b5e8bf72d493`. El ledger operacional original `603c471d-19bb-4530-9773-c02e18b29840` no recibe fixtures.

## Entrega confirmada

Ventana abierta a las 16:21:28 UTC, vencimiento 16:41:28.365 UTC. Cron `* * * * *` creado 16:21:34.059582 UTC, sin redeploy ni reinicio de modified_on durante propagación. Tail saneado confirmó eventos scheduled con outcome ok y cero excepciones.

El receptor recibió tres eventos confirmados de las revisiones 1, 2 y 3. `received_at` 1791303989847, 1791303991114 y 1791303991882; cursor final revisión 3 actualizado 1791303992356. Solo metadata contractual; ningún contenido del expediente. Ejecuciones posteriores conservaron tres eventos, sin nuevas revisiones ni duplicaciones. Productor cerrado y cron retirado tras confirmar entrega, antes de retirar el consumidor.

## Cliente cloud y revisión

Preflight fresco 16:20:59 UTC: fuente limpia, instancia running/current, revisiones 8/8, enforced y ambas bindings OPERATIONS ready. GET de comprobación a las 16:23:46.608 UTC devolvió 200/lista vacía mientras se propagaba cron; ese resultado no se contó como entrega.

Un nuevo turno a las 16:28:57 UTC devolvió enforcement/bindings unknown. No hizo HTTP ni creó reserva. Unknown no acredita claves incorrectas: el handshake de ejecución UTC con `with_additional_permissions` y `additional_permissions.network.enabled=true`, sin red, materializó la política antes de volver a comprobarla. Tras handshake: running/current, revisiones 22/22, enforced y ready.

| UTC | Operación | Resultado |
| --- | --- | --- |
| 16:30:47.644 | GET /dossiers | 200, una señal de revisión 3 |
| 16:30:48.358 | POST /dossiers/claim | 200, una reserva |
| 16:30:48.750 | POST /dossiers/finish | 200, reviewed |
| 16:30:49.047 | GET /dossiers | 200, lista vacía |

Node usó proxy gestionado y CA/TLS intactos, wrapper exclusivo al origen `https://operations-manager.agentfriendlyweb.dev`, sin query, redirect ni retries y máximo cuatro solicitudes. `reviewed` acredita revisión de metadata; no lectura privada, reparación o resolución del expediente.

Correlación operacional privada:

- projectRef `20e8568508707863cb307acd83e8154174f6ed1c7957baf60f87543a1ee188ec`
- eventId última revisión `c05e3363b28b4211071c3d53ee3afd8f64ea22d4730eb482ab1ed5bf92f35ee3`
- requestId `ea98789f-1658-43c7-af39-a330fd815bc4`
- runId `f93f3776-9474-463b-af26-39fac42f2ad5`
- inicio 1791304248509, fin 1791304248917, expiry 1791304548509

Lectura independiente del ledger confirmó exactamente esta reserva terminal. No publicar estas referencias en distribución pública/RAG.

## Programación, retirada y siguientes bloques

Prueba programada única solicitada desde la misma instancia, sin recurrencia, con preflight y una sola lectura de lista final. Asociación y turno efectivo todavía pendientes de recibo en este punto del documento; crear una programación no demuestra ejecución.

Automatización `6ac5228595008191b7626de8c3f9c180`, título `AFW dossier scheduled acceptance 20261006`: peek confirmó thread_id de la nueva instancia. Primer turno programado `01a11210-96ae-76d0-86b9-8ead3c800041`, inicio 1791304439 y fin 1791304470, se detuvo sin HTTP: el prompt exigía introspección de threadID/turnID no expuesta al executor. La observación externa confirmó origen del turno y fuente; esa condición innecesaria se corrigió para mantener la correlación fuera del executor. Solo esta automatización se reprogramó con DTSTART 20261006T163620Z, sin recurrencia; conservar este intento como evidencia de fricción, no como aceptación HTTP.

Después del recibo: deshabilitar programación, identidad gestionada y restaurar selector previo; cerrar flags/deadline, restaurar D1 original del receptor/manager, verificar settings, versiones y cron vacíos. Conservar ledger/cursor y fuente propia. Retirada HTTP aún pendiente en este punto del documento.

La reprogramación de la primera one-off no produjo otro turno en el plazo observado; causa interna no demostrada. Se deshabilitó esa entrada y se creó una nueva one-off `6ac52423b29481919d8ac217f42952f0`, mismo thread, DTSTART 20261006T163959Z, sin recurrencia. Turno real `01a11216-088a-76c4-a2f7-32ba60bfce84`, inicio 1791304796 y fin 1791304846, confirmó fuente/HEAD publicados y GET `/dossiers` **200, cantidad 0**, a las **16:40:39.965 UTC**. Observación externa sin mensajes durante arranque. Se acepta asociación + ejecución programada + resultado correlacionado; no se repite prueba PC apagada ya aceptada anteriormente.

A las 16:41:25.758 UTC, token gestionado deshabilitado y selector previo restaurado. Se conservó versión2 y expiry 2026-11-04T22:09:32Z: sin rotación, renovación ni nueva custodia. Receptor y manager cerrados, sin deadline/flag dossier y con D1 original restaurada; productor previamente cerrado/sin cron. Verificación independiente final y HTTP de retirada siguen en curso.

Verificación independiente 16:42:09.023 UTC: receptor `3c7dc696-0afc-44b6-a3e7-778cd4fb9467` y manager `b8023b14-3e3e-4f17-9845-e0ee2edb64fb`, 100%, flags false/sin ventana/D1 original; productor `1253601b-c769-4850-ac24-a96c47498d35`, 100%, false/sin ventana y cron vacío. Los tres schedules vacíos. Ledger preservado: tres eventos, una revisión terminal, cero pendientes. Firma e inscripción permanecen en custodia secreta con productor cerrado para evitar recodificar referencias; no son autorización de activación. No redeploy que cambie el tipo de esos bindings.

Cloud confirmó ambas automatizaciones deshabilitadas por peek. Prueba de retirada independiente, sin retry ni POST: **GET /dossiers 401 a 16:42:09.736 UTC**. Quedan aceptadas entrega, revisión cloud, ejecución programada y retirada. No promueve guardia permanente, lectura privada o clientes.

## Mejora concreta de despliegue

La configuración canónica declaraba `AFW_DOSSIER_ENROLLMENTS` como plain var vacía aunque ahora pertenece a secret custody. Se elimina esa declaración; falta de inscripción sigue fallando cerrado y flag inicial permanece false/sin ventana/sin cron. Prueba de regresión reproduce primero el conflicto y luego pasa tras la corrección. No se redeploya el productor para este cambio administrativo: estado remoto cerrado ya comprobado.

Siguiente capa preparada en AFW-ASSISTANCE-SUPERVISION-NEXT-LAYER-2026-10-06.es.md: pedido explícito de ayuda, fallos comprobados, recibos en aplicación y contexto privado consentido. El correo a Max sigue pendiente de revisión propia y de aceptación del recorrido app-first; este ensayo no promueve clientes.
