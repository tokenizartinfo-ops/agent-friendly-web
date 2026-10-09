# Montaje cerrado real del intercambio autenticado

2026-10-09, QA propia AFW. PR363/source371f4db4922245b6deb74114c3f4b818bd1ce372, CI37974341787success, merge21735b707176ea0a89bd1f6e5e018c807568cac6 a18:37:52UTC.

## Publicación comprobada

Wrangler OAuth confirmó cuenta85d0d5dadac3341a564f22ce885e9eec con permisos Workers. Antes de mutar se fijó scope propio18:37–18:55UTC, máximo2deploys/20GETs, sin instancias Workflow ni nuevas claves, Access, rutas, namespaces, SQL, cron o AI.

Se desplegó primero recuperación e5f4bc05-c1a3-4ec1-9c24-f676cdb416d6, deployment60d03c53-67db-4b5b-a407-f9f2979fd0cd; GET18:38:33UTC confirmó100%, bootstrap/challengefalse, pins/identityvacíos y cron[]. Después se desplegó candidata7ae36679-b855-4a6e-b6df-fbf4daec9bf2, deployment0ddc4d10-45bd-466c-9720-e73bedc1b433; GET18:39:43UTC confirmó100% y los mismos controles cerrados.

Se preservaron namespaceIndependentClosure070c4a7708eb4592a3ded7c117a88225, namespacePrivateQaPreregistration6f30104244424152b800bc64d5f4cfac, D1676ca49e-af71-4f2f-a12d-11f13de78a51 tanto id como database_id, Workflowafw-own-qa-private-bootstrap y secretAFW_QA_IDENTITY_API_TOKEN por nombre/tipo, sin leer valor. Workersdev y previewsfalse. La ruta conserva patrón https://operations-manager.agentfriendlyweb.dev/assistance/occurrences/*, script propio y fail_openfalse; su ID se recreó a dc87700b9af946729bf2e5af0be796bd. No afirmar preservación del ID.

La recuperación siempre devuelve404 y registerfalse incluso con flags accidentalmente habilitados, conservando las clases y el historial; su preparación nativa verificó rollback real y lectura histórica. No hubo eliminación o nueva migración de namespaces, SQL ni ejecución de un desafío remoto.

## Verificación proporcional

Suite1388pass/0fail/2skip, lint0errores/2avisosprevios, build y dryruns candidata/rollbackexit0. Revisión fresca independiente sinP1/P2; native Worker+SQLiteDO comprueba firma, registro previo, cuota total persistente, retirada, concurrencia, reinicio y rollback. La CI exacta final pasó antes de integrar/desplegar. Logs/readbacks saneados en output/afw-private-challenge-runtime-*; scope cerrado tras2deploys, sin ampliar ventana.

## Próximo gate real

GETAccess18:38:56UTC confirmó la app propia287c0a17-38dd-43bf-af3d-4675952b74a7 sobre occurrences/* y policy33ee6be0-2d09-4503-b5ae-cd97ddbb5bab deny/everyone. Esa app no cubre el nuevo path interno /assistance/custody/confirm: no asumir JWT/audience ni protección de ese path. Antes de exponerlo se debe definir protección propia exacta, identidad/custodia temporal, presupuesto y rollback; no ampliar la app base de otros recursos por conveniencia.

Faltan preregistro real en ventana vigente, desafío consumido y correlacionado con una ejecución cloud oficial y journal primario; luego reserva CAS de recursos, instalación, cierre integrado y una única programación alojada. Solo después preparar PC-off y el piloto de Max con preview/consentimiento. No guardia permanente, credenciales nuevas ni intervención del owner requeridas por este montaje cerrado.
