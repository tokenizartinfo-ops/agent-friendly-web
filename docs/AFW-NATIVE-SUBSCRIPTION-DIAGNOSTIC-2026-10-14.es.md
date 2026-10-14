# Diagnóstico del alta nativa de avisos

## Evidencia y límite

El ensayo propio del 14 de octubre de 2026 alcanzó el servidor desde el chat cloud `6acce402-29c8-83e9-929c-1224be576f8d`: una admisión de proceso, cero recibos de suscripción, un cierre y cero eventos. La instancia arrancó a las 13:12:29 UTC y quedó detenida a las 13:12:33 UTC. La comprobación remota posterior conserva esa instancia histórica detenida; no es una lista vacía.

El receptor utilizó `automations_create` con disparadores descubiertos mediante `automations_discover_webhook_schema`, sin programación horaria. Devolvió `ERROR` y un error inesperado del servicio de tareas, sin etapa ni correlación adicional. Esto no acredita una suscripción aceptada ni una baja nativa. Tampoco demuestra que Cron sea la causa del fallo.

La versión remota cerrada `3a9d7a81-de23-4e8b-bf9d-843b02e47514` conserva los seis indicadores desactivados, sin políticas de ensayo, cron ni tails. Ambos permisos originales se retiraron. La evidencia primaria está en `output/afw-native-lifecycle-closed-20261014.json`; el registro cronológico está en `output/afw-native-lifecycle-window-20261014.es.md`.

## Cambio local

El host registra únicamente un diagnóstico de fallo con campos estáticos/acotados:

- `event`: `afw.own_subscription_failed`.
- `stage`: `process_readiness`, `callback_verification`, `receipt_record` o `final_readiness`.
- `closureCompleted`: indica que la operación de cierre retornó correctamente; no prueba la terminación física. Si es falso, el cierre no quedó confirmado, aunque su intento de detener el proceso puede haberse ejecutado.
- `elapsedMs`: tiempo desde el comienzo de la preparación del proceso hasta el fallo, excluyendo autorización y preflight anteriores.
- `stageElapsedMs`: tiempo dentro de la etapa que falló. Incluye sus consultas y esperas internas; no equivale a tiempo de red del callback.
- `closureElapsedMs`: tiempo posterior al fallo dedicado al intento de cierre. No está incluido en los dos anteriores.

Los tiempos usan reloj monotónico, se redondean hacia abajo y se saturan a 600000 ms. Son diagnóstico, nunca autoridad, vigencia ni un motivo para prolongar plazos. Se emiten únicamente en fallos; no permiten reconstruir las duraciones individuales de etapas previas.

Cada etapa indica qué operación estaba en curso, no identifica por sí sola la causa. `callback_verification` incluye las comprobaciones previas del controlador; no significa que el callback haya recibido una petición.

El registro ocurre después de intentar cerrar. No incluye excepciones originales, cuerpos, URLs, referencias de usuario, secretos ni contenido del expediente. Si falla el logger, se conserva el error público genérico y el cierre ya intentado. No modifica permisos, presupuestos, reintentos, datos históricos ni plazos.

## Validación y siguiente ensayo

La regresión nueva falló primero por ausencia del diagnóstico y pasó después del cambio. Dieciséis pruebas dirigidas aprobaron, incluyendo los cuatro fallos inyectados, el fallo del journal de cierre y el arranque/cierre de un proceso Node real local. Una revisión independiente motivó el nombre `closureCompleted`, para no atribuir ausencia de intento de parada a un fallo del journal. El transporte y la plataforma de ese ensayo local no son evidencia de Cloudflare ni de recepción en ChatGPT.

Antes de otro ensayo remoto: completar revisión y comprobaciones del repositorio; publicar únicamente una candidata cerrada con reversión comprobada; disponer de observación saneada efectiva; resolver explícitamente la nueva admisión propia sin borrar ni reiniciar el presupuesto consumido. Preparar luego una ventana coordinada de alta y baja, sin evento de cliente. No reabrir el permiso vencido ni reutilizar su custodia.

La configuración local del canary mantiene `observability.enabled=false`. Agregar el diagnóstico no activa almacenamiento de logs ni garantiza que sea recuperable. El siguiente ensayo deberá preparar observación temporal limitada al Worker propio, guardar únicamente la proyección fija anterior y retirar esa observación al cerrar. No habilitar logs permanentes ni conservar cuerpos HTTP como sustituto de esta proyección. Nada de esto se activó con este cambio local.

La causa remota permanece pendiente. No pedir apagar el ordenador hasta acreditar alta, recepción útil, revisión cloud y retirada del mismo circuito.

Referencias consultadas: [MCP Events de OpenAI](https://developers.openai.com/plugins/build/mcp-events) y [API de Container de Cloudflare](https://developers.cloudflare.com/containers/api/durable-object-container/). La coincidencia del código con esas interfaces no demuestra su ejecución remota correcta.

## Resultado de verificación general

`npm run lint` y `npm run build` terminaron con código cero (dos advertencias existentes de lint). La suite completa con concurrencia cuatro terminó con 1.810 aprobadas, tres fallidas y dos omitidas. Al aislar secuencialmente los archivos fallidos quedaron seis aprobadas y un fallo en `assistance-private-admin-bootstrap-workerd.test.mjs`, al esperar una llamada de dispatch y observar cero. Su causa no está demostrada; no se alteraron sus plazos ni se ocultó la aserción. Este cambio permanece local, sin commit ni despliegue, pendiente de cerrar la validación general. Los logs de trabajo se conservan bajo `output/afw-subscription-diagnostic-*20261014.log`.

Comprobación posterior del 14oct: el caso native SAME-primary originals pasó solo (1/1); una copia ignorada del ensayo, instrumentada únicamente dentro del bundle local con etapa/tiempo, pasó4/4. Ejecutada junto a los ensayos de procedencia y runner pasó26/26, con1omitida. No se reprodujo el fallo y no se modificó la lógica/plazo del instalador. Se conserva la evidencia del fallo anterior; no se declara causa Windows ni causa raíz remota. El diagnóstico sigue limitado a etapas. Candidata destinada a revisión/CI, no a despliegue directo.

## Actualización de continuidad y tiempos
PR426 fue integrada en dfbe38e con CI38575092625 satisfactoria. PR427 fue integrada en 3ad495e con CI38576596752:1818 aprobadas,0fallos,1omitida; reduce lecturas522→362. Las referencias anteriores a candidata sin commit describen su momento histórico.

La extensión temporal conserva un matiz: si start() hace limpieza antes de rechazar, ese tiempo pertenece a process_readiness y elapsedMs; closureElapsedMs solo cubre el cierre posterior del host. Pruebas con reloj simulado verifican valores exactos y reinicio de etapa, además de los cuatro fallos y logger roto.

Repetición local con20ms artificiales por lectura completó esta vez (11345ms,362lecturas); no establecer un umbral causal determinista desde ensayos de carga. Con30ms falló: elapsedMs10314, callback_verification6539ms, cierre35ms;306lecturas. Estas duraciones son sintéticas y no demuestran latencia D1 ni fallo de servicio ChatGPT. No hubo operaciones remotas.
