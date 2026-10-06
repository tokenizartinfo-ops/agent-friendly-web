# Expediente a supervisión cloud: implementación inicial

## Resultado y alcance

Se preparó el circuito `evento confirmado D1 → productor → webhook firmado → ledger operacional → consulta/reserva/revisión cloud`. Permanece deshabilitado y sin cron por defecto. No se alteró la ruta de guardado del cliente: el productor lee exclusivamente eventos ya confirmados y valida propietario, proyecto y fecha de inscripción del lado del servidor. Un fallo de recepción conserva el evento fuente; el cursor avanza únicamente con recibo exacto. No hubo deploy, migraciones remotas, lectura de clientes ni activación de guardia por este documento.

La proyección HMAC usa propósitos separados para proyecto y evento. Exporta solamente versión del contrato, referencias opacas, revisión, tipo y fecha; no exporta identidad, dominio, respuestas, nombres de campos, fuentes de texto ni transcripciones. Sus referencias siguen siendo privadas. Máximo tres proyectos inscritos y tres eventos por proyecto por invocación. La inscripción tiene `projectId`, `ownerId`, `since`; no aceptar esos valores desde la solicitud del cliente ni inscribir Sector antes de que cree su expediente y acepte el alcance necesario.

## Almacenamiento y admisión

Aplicar `worker/operations/dossier-supervision.sql` únicamente a D1 operacional/QA correspondiente y `dossier-supervision-cursors.sql` a la D1 de estado del puente. No aplicarlas por inferencia a D1 del expediente. Fuente DB queda como binding separado de lectura por contrato del productor; el binding D1 por sí mismo no impone read-only criptográfico. No entregar ese binding al gerente cloud.

Webhook interno: `operations.agentfriendlyweb.dev/dossier-events`, service binding `DOSSIER_RECEIVER`. Firma HMAC ligada a timestamp y cuerpo exacto, límite de cuerpo y tiempo, allowlist de referencias inscritas, bandera y ventana vigentes. Rechaza solicitudes del navegador. El receptor guarda recibos inmutables; repetir el mismo evento devuelve recibo duplicado, cambiar su contenido genera colisión. Retirar bandera, ventana, allowlist o firma cierra nuevas admisiones; no revierte un evento admitido anteriormente.

Productor independiente: `worker/dossier-supervision-producer/index.mjs`, configuración canónica cerrada `wrangler.dossier-supervision-producer.jsonc`. Antes de ensayo, añadir explícitamente `DOSSIER_SOURCE_DB` y `DOSSIER_BRIDGE_STATE_DB` con IDs verificados; por defecto no hay D1 ni firma ni programación. El cron del productor entrega metadata; no acredita que Codex se haya despertado.

## Gerente

En `operations-manager.agentfriendlyweb.dev` se prepararon `/dossiers`, `/dossiers/claim` y `/dossiers/finish` bajo la identidad de servicio existente, rate limit, ventana y flag propios. La allowlist se comprueba en cada nueva solicitud. Modo de expedientes excluye las rutas legacy del mismo manager para no multiplicar su presupuesto. Reserva exige presupuesto compartido con las investigaciones y avisos previos: máximo tres reservas/24 horas, una activa, lease de cinco minutos. Las tablas de esos presupuestos deben existir; si faltan, falla cerrado.

Estados terminales admitidos: `reviewed`, `intervention_required`, o `superseded` resuelto por servidor al detectar versión posterior. No existe `resolved` inferido por ACK. Una reserva nueva no autoriza leer contenido, modificar el expediente, enviar correos ni publicar cambios. `lib/operations-client.mjs` tiene cliente estricto para este contrato y no admite respuestas con campos extra ni señales duplicadas del mismo proyecto.

## Disparador cloud: límite comprobado

Documentación oficial consultada el 6 octubre: los disparadores de eventos publicados cubren Gmail, Slack y actividad de PR GitHub en web/móvil. No documenta un webhook arbitrario AFW dirigido a este chat: https://learn.chatgpt.com/docs/automations?surface=app#trigger-tasks-from-app-events.

El chat cloud AFW `01a11150-19b6-716d-8b13-f5769d743034` inventarió sus herramientas: create/update admiten programación y condition_watch, pero no selector de entorno/thread ni esquema de webhook; discover_webhook_schema no está expuesto. No creó programación ni hizo HTTP. Por ello el webhook de recepción AFW no equivale al despertar cloud. Próxima aceptación: publicar la fuente apropiada del entorno, probar una ejecución acotada vinculada y su recibo de claim/finish, después configurar una cadencia o evento compatible. No usar automatización desktop para simular ejecución con PC apagada ni fallback de API de pago sin decisión propia.

## Validación inicial

19 pruebas específicas de SQLite/transport/servicio/cliente y una adicional workerd/D1: pérdida de recibo, reintento, cursor durable, firma falsa, retirada, identidad incorrecta, referencia ajena, revisión posterior, presupuesto y lease. Suite completa anterior a agregar la prueba workerd: 944/944. Lint sin errores; build/CI y publicación se registran por separado cuando terminen.

## Aprendizaje progresivo

La observación operacional no es una orden de cambio. El gerente registra la fricción con referencia opaca, evidencia fechada y comportamiento esperado; separa hipótesis de causa confirmada. Reproduce con datos sintéticos, propone un diff y valida pruebas proporcionales. Una corrección pasa por revisión, despliegue con rollback y comprobación posterior antes de cerrar el incidente. Los cambios legales, históricos, de consentimiento o alcance mantienen controles específicos. El Fix-Center arquitectónico solo recibe aprendizaje técnico saneado, nunca el expediente o transcripción del cliente.

La siguiente capa deberá incluir solicitudes de ayuda y fallos operativos explícitos, además de estos eventos de guardado; y un servicio de lectura consentida para repreguntas dentro de AFW. Este primer puente no completa esas funciones ni acredita acompañamiento permanente.

## Publicación cerrada y siguiente aceptación

PR292 integrada en `d770e1fd23b661c306437cd3e0ae32af6711b226`; CI `37489047007` pasó. Upload local desde `506c2af7e9068bbdc0816e53a4d353ca0dcd5980`, comparado sin diferencias de código lib/worker/config con el merge.

Lectura API posterior al deploy el 6 octubre confirmó al 100%: receiver `ef76fe2f-a759-489e-9ea8-4d4fe7925423`, manager `c6b17015-47a8-43c6-9702-7c5edf9b8c14`, nuevo productor `50ff0dc2-0918-4d2d-9da8-7f0ce8c96780`. Los tres tienen cron vacío. Receiver conserva flag false; manager conserva sus seis flags false, identidad de servicio y D1 original `603c471d-19bb-4530-9773-c02e18b29840`. Productor tiene flag false, inscripciones vacías y únicamente service binding: ninguna D1 ni firma. No hubo migraciones ni inscripción/lectura de clientes.

Rollback: receiver previo `03ba90ef-9f42-4f06-9c0e-7ccb02ca5206`; manager previo `835b5bf2-5e29-40cd-919c-840b20a8d420`; nuevo productor se mantiene cerrado, sin bindings fuente/estado/firma ni cron. Preservar D1 e identidad y verificar settings efectivos, no solo versión.

Corrección de inventario cloud: peek/list sí muestran asociación persistida `thread_id`, aunque create no la exponga como parámetro. Programación `6ac42c5f75288191b991f0d8fc04cc74` deshabilitada, ligada al chat AFW `01a10e3b-05fe-72b1-aa51-24163557a012`, candidata a reutilizar. Esto no acredita webhook arbitrario ni el nuevo cliente: fuente publicada todavía `a4d90d438cb5ebca855e46637aff91ec45610b9f`. Preparar publicación nueva preservando custodia/red y verificar checkout/readiness en ejecución ordinaria antes de activar cadencia. No repetir PC apagada ya aceptado como sustituto de este circuito.

Próximo bloque: ensayo con eventos de expediente propio, D1 QA operacional y cursor separadas, inscripción/owner resueltos por servidor, firma en custodia y ventana finita. Verificar entrega, reintento, reserva cloud, finish y retirada; restaurar D1 original y cerrar admisiones. Sector sigue sin inscribir ni contactar por este release.

## Preflight remoto aislado, 6 octubre

Se crearon únicamente dos D1 independientes: ledger QA `afw-dossier-supervision-qa-20261006` / `dcd5daef-0856-4da3-bf95-7dddbf7cf303`, cursor QA `afw-dossier-cursors-qa-20261006` / `c28f23db-bf68-4461-adbd-b5e8bf72d493`. Se aplicaron dossier-supervision.sql, consumer-state.sql y notice-reservations.sql al ledger; dossier-supervision-cursors.sql al estado. Lectura de sqlite_master confirmó las cuatro tablas esperadas del ledger y la única tabla del cursor. No se conectaron a Workers ni se activaron firmas, ventanas, Access o cron; no tocaron D1 operacional ni cliente. Retirada consiste en dejarlas sin bindings ni admisión; conservar recibos futuros, no borrar por inferencia.

Fuente propia candidata comprobada en D1 web-canary `2b518988-eacb-4c31-b760-4e58c3c0285b`: proyecto sintético `project-fbf254fea385024ddbfa6cf06e2b6c615416a0025010822f7fcbdfdf4fbed272`, tres eventos confirmados con revisiones 1/2/3, tipos created/updated y propietario de cada evento igual al del proyecto. Se consultaron solo existencia, revisión, fechas y coincidencia de propietario; no respuestas ni transcripción. La inscripción sigue pendiente y nunca debe inferirse de este inventario.

Editor cloud antiguo verificó fetch autenticado y checkout limpio detached `d770e1f`, con módulo y métodos nuevos presentes. El guardado devolvió `CONFLICT/draft_not_editable`: el borrador publicado conserva ref antigua. Preparar checkout no actualiza la fuente publicada. Hace falta nuevo editor desde la configuración existente y publicación verificada, conservando bindings/scripts/red. Control Chrome no respondió al seleccionar la pestaña existente «Editar AFW Operations»; se pidió reconexión, sin diagnosticar credenciales ni solicitar copia de secretos.

## Nueva publicación cloud confirmada; instancia anterior no actualizada

Al recuperar Chrome se abrió la edición del entorno existente desde Ajustes → Codex Cloud → AFW Operations → Editar. Editor nuevo `01a111ed-42bd-73bf-a1cd-5b3dcade9014`, draft `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgdraft_5f98cde15a0c81a380639e5f8b2f60e7`, revisión 2. Verificó checkout limpio/origin y guardó solo repositories con commit `d770e1fd23b661c306437cd3e0ae32af6711b226`, preservando seis requisitos/bindings, scripts, instrucciones y red. Se confirmó el repositorio AFW ya autorizado y se publicó por UI, que terminó en «Entorno publicado».

Metadata posterior del editor: source_config_version_id `38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac51ab2c9fc81a398c76c7bfc4c6132`, observaciones actuales/spec8, ref nueva en draft. Readiness/enforcement del editor unknown, no diagnóstico de claves.

Preflight independiente del chat ordinario `01a11150-19b6-716d-8b13-f5769d743034` confirmó que conserva versión `…cecfgver_6ac4eeb23d8c81a38fef3d60e9dced82` y HEAD `a4d90d…`: cliente nuevo ausente. Su current/enforced y bindings OPERATIONS ready no demuestran adopción de la nueva publicación. No ejecutó HTTP ni alteró checkout. No se expone mecanismo de revinculación de esa instancia: siguiente aceptación requiere tarea ordinaria nueva seleccionando AFW Operations y verificando versión/ref/readiness reales. No reutilizar la programación antigua como prueba del cliente nuevo por inferencia; requiere validar asociación a la instancia correcta.

Dry-run de configuración QA cerrada en `output/dossier-supervision-qa-closed.json` pasó: bindings source web-canary y cursor QA comprobados, flag false/inscripciones vacías/crons vacíos. No se desplegó esa configuración ni se aplicaron dichos bindings. Ambos almacenes QA siguen vacíos por lectura independiente (events/runs/investigations/reservations/cursors cero). Ninguna ventana, firma, cron, identidad o inscripción activada.
