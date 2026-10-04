# AFW: recepción e investigación cloud correlacionadas

Evidencia del 4 de octubre de 2026. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated operations synthetic QA; ORIGIN operations.agentfriendlyweb.dev / operations-manager.agentfriendlyweb.dev; RESOURCE_TYPE Workers/Access/operations D1; RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-manager, D1 603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION señal sintética firmada, consulta/reserva/diagnóstico y recuperación de ensayo, apertura temporal. ROLLBACK cerrar ambos flags/token, retirar firma, conservar historia. Ninguna modificación de clientes, Tokenizart, producer o cron.

## Resultado aceptado

- Receiver candidato b3042691-b94b-4860-b8e3-c3fb7422149a recibió 202 una señal HMAC sintética. Firma aleatoria generada en memoria, entrada Wrangler por stdin, sin persistir ni imprimir.
- Evento afw-cloud-correlation-1791143446768, observedAt 2026-10-04T19:50:46.768Z; resource afw_delegated_canary, check delegated_edge, versión canary aa121311-2d88-4a2f-ad54-b52193cd1c20 comprobada por control plane. No se provocó un fallo real de ese servicio.
- Fingerprint f9fa28e7202993a40e938d8ba33cea62f05af51ccc25aa0040fd39fd5722537c fue leído y reservado por la instancia AFW Operations publicada, HEAD491118a. Thread 01a1084b-83a4-7585-9dfd-6287e36de014, turn 01a10878-bfae-75cf-8120-495e550aa3cf.
- requestId 288ff014-a448-457f-8c0f-35ddb2fe02ee guardado antes de claim; runId f8860dc2-5416-4bbf-bea0-9bbc8042c08d. list/claim/finish una vez cada uno, Node --use-env-proxy, exit0/stderr vacío/JSON validado.
- Reserva a 19:52:16.271UTC, vence19:57:16.271; finish a19:52:16.692UTC. D1 consultado independientemente confirmó consumer_ref afw-cloud-manager, mismos IDs/fingerprint, requested_outcome/outcome diagnosed, phase review/state failed. Diagnóstico explícito: ensayo sintético, no justifica reparación o certificación de recuperación.
- Solo después del recibo independiente se envió recuperación sintética202. D1 confirmó recovered/closed. Diagnóstico y recuperación conservan causas distintas.

## Cierre comprobado

Runner con deadline de180s y finally retiró firma y cerró receptor; POST posterior503 a19:53:17.094UTC. API comprobó receptor861bc360-edd6-40da-a0a4-7109bd36d918 y manager31ff4c39-1949-4e6d-b2d2-25cb12e9a9ee, ambos100%/flagsfalse/cero secretos Worker. Token consumidor deshabilitado, versión2 y vencimiento original conservados. Ledger:12eventos/2incidencias/2checkpoints/1investigación, sin borrar historia. No permisos privados o cadencia modificados.

Acepta recepción firmada → consumidor cloud manual → reserva → diagnóstico → recibo durable independiente. No acepta disparo autónomo, fallo real reparado, aviso entregado por watchdog ni ordenador apagado. La instancia usada es el setup vinculado al entorno publicado; no confundirla con una tarea operativa recurrente creada desde ese entorno.

## Programación: impedimento observado

Inventario de la instancia cloud solo ofrece environment_status, lectura/actualización de borrador y wait_for_environment. Ninguna herramienta de schedules/automations ni campo de thread/env/modelo/fecha. Su estado futuro no está garantizado. UI Chrome: el formulario web de Nueva tarea > Avanzado permite zona horaria/chat nuevo/modelo/esfuerzo, pero no entorno publicado. Menú de esta sesión de configuración solo Renombrar/Compartir/Copiar/Archivar. Chat Work general no expone Work in > Cloud en la interfaz observada; selector de proyectos vacío. No crear scheduler local ni shell en espera como sustituto.

Documentación oficial consultada: [entornos](https://learn.chatgpt.com/docs/environments/cloud-environments) describe Work in > Cloud y nuevas tareas con entorno publicado; [programación](https://learn.chatgpt.com/docs/automations) distingue tareas web con herramientas conectadas y ejecución local. No demuestra que esta cuenta permita vincular una programación al entorno. No afirmar un webhook arbitrario de suscripción.

## Próximo ensayo, cuando exista vínculo acreditado

1. Crear tarea operativa usando AFW Operations explícitamente, verificar source_config_id/version y checkout; preferencia GPT6.1Sol bajo/Standard/suscripción. No reciclar onboarding como guardia.
2. Probar un único disparo hosted inmediato, con un evento sintético nuevo y permisos temporales. Acreditar schedulerID/runID, hora del disparo, taskID, source_revision y correlación D1. Rechazar scratch o ausencia de cliente; no crear procesos dormidos.
3. Programar una única prueba posterior con cierre automático remoto verificado antes de pedir apagar el ordenador. La prueba no puede depender de este runner local para generar señal/cerrar permisos.
4. Owner confirma intervalo apagado; comparar timestamps de scheduler, producer y D1. Un aviso móvil o tarea terminada sin la correlación no prueba el ciclo.
5. Solo entonces decidir cadencia continua y watchdog independiente. Conservar una investigación global/tres reservas24h, supresión de salud repetida, custodia con vigencia explícita y avisos únicamente relevantes.

Prompt operativo acotado: verifica contexto del entorno y repo; consulta metadata list por cliente/proxy; si no hay elegibles termina silenciosamente; si hay una señal autorizada, guarda requestId antes de claim, diagnostica con evidencia del recurso y termina diagnosed o blocked dentro de lease. Conserva runId/revisión/horas. No despliegues, publiques, leas clientes, copies secretos, cambies permisos/presupuesto ni marques recuperación sin señal independiente. Informa solo fallo relevante, resultado comprobado o acción humana indispensable. Este prompt no activa un disparador.
