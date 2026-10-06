# Custodia específica del ensayo de correo cómic

Proyecto AFW, mail-canary, 6 de octubre de 2026. El owner creó mediante Cloudflare la identidad `AFW Comic Mail Own Pilot 20261006`, ID bc8e2673-6ef8-40c5-84bf-ad1d5921931e. La API redujo inmediatamente su duración a 24h y la dejó deshabilitada. GET independiente confirmó enabled=false y vencimiento 2026-10-07T12:44:03Z (7 de octubre, 09:44 Buenos Aires). Ningún valor de clave fue leído o copiado a registros.

Inventario acotado de las 24 aplicaciones: cero lecturas fallidas, cero reglas any_valid_service_token y cero referencias a la identidad nueva. Operador y consumidor de correo conservan sus políticas deny. Worker conserva tres banderas false y EMAIL ausente. Rollback de esta preparación: mantener identidad deshabilitada y políticas/Worker cerrados, sin borrar historial ni otros bindings.

## Publicación

El draft del editor 01a10e31-b63e-7693-9b1b-1c82f497e008 agregó exclusivamente AFW_COMIC_MAIL_ACCESS_CLIENT_ID y AFW_COMIC_MAIL_ACCESS_CLIENT_SECRET. Ambos usan custodia de entorno y destino exclusivo mail-consumer-canary.agentfriendlyweb.dev. Se preservaron los cuatro bindings anteriores, scripts, red y repositorio/commit.

El owner ingresó las dos claves en el formulario privado, guardó borrador y publicó. UI confirmó Entorno publicado/Publicado. Metadata independiente confirmó has_saved_binding=true para ambos y source version nueva:

`38a3072b-f1e2-410e-9272-3c7e7eb434cb~cecfgver_6ac4eeb23d8c81a38fef3d60e9dced82`.

El commit publicado permanece a4d90d438cb5ebca855e46637aff91ec45610b9f; no equivale al main actual. La versión operacional anterior 6ac423b3521081a3a3f40cb4fc25bfc0 permanece como referencia histórica, no como alias de la publicación nueva. Draft revisión3 conserva esa base histórica. El editor informa red/readiness unknown: esto no acredita autenticación ni claves incorrectas.

## Selección de la prueba

La tarea antigua 01a0fd44-ed76-701d-8891-e028a2ce9032 conserva source6abfcf90 y no recibió los nuevos bindings: preflight informó missing y se detuvo sin requests. No pedir recopia al owner por esta diferencia de contexto.

La creación con create_thread target chatgptWorkCloud produjo un chat general (6ac4efa4-1568-83e8-a90d-bd0534d25545), sin environment_status; se detuvo sin operaciones. Ese destino no acredita vínculo con el entorno configurado de Codex. Para el ensayo se usó Chat nuevo en la interfaz Codex, con Nube, AFW Operations y GPT-6.1 Sol Bajo visibles antes de enviar el prompt. La nueva tarea debe confirmar la source exacta, red enforced y ambos bindings ready antes de cualquier handshake. La selección visual y el inicio de tarea no prueban ese resultado.

## Siguiente aceptación

Preflight correcto primero; luego handshake acotado con el servicio cerrado y retirada con la misma custodia. Después, separadamente, revisión del snapshot visual, ventana servidor <=10min, aprobación/hash, un consumo y recibo, recepción propia, duplicado bloqueado y cierre. No utilizar bindings viejos, prolongar la identidad, habilitar guardia permanente ni invitar clientes desde esta publicación. Los permisos se retiran preservando recibos y journal.

## Ensayos y cierre comprobado

La tarea 01a11149-575a-71a8-93ed-0bf188ae401c confirmó red enforced y ambos bindings ready en una preparación; al reanudar apareció «The environment configuration changed. Try again.» antes de HTTP. El chequeo posterior volvió a unknown. No demuestra claves incorrectas ni un handshake exitoso.

La tarea nueva 01a11150-19b6-716d-8b13-f5769d743034 mantuvo el ensayo en un solo turno. Finalizó 2026-10-06T13:05:47Z con source correcta/current y running/connected, pero red y ambos bindings unknown. date -u terminó exit 0 y completó la espera de 20 segundos. Ejecutó cero GET y cero envíos; se detuvo por el preflight. La hipótesis de reanudación no quedó confirmada.

El permiso temporal fue retirado a las 13:10 UTC: token deshabilitado y política consumer restaurada a deny/everyone. El retiro ocurrió después del límite previsto 13:08 UTC; el ensayo había finalizado antes del límite, sin HTTP, y el Worker permaneció cerrado. No presentar el límite de la tarea como expiración automática de la política Access. Para futuros ensayos, resolver primero el preflight y asegurar una retirada independiente del diálogo antes de habilitar temporalmente Access.

Pendiente: disponibilidad verificable de la red y custodia en executor cloud, autenticación HTTP real y posterior circuito propio aprobado. La publicación de valores privados está confirmada; no solicitar recopia por estados unknown. No hay prueba de guardia permanente ni envío a clientes.

## Diagnóstico posterior de metadata

Turno 01a11166-989b-709c-8d09-0be664a92960, en la misma tarea publicada: source exacta, current=true, executor connected=true, policy enforced y ambos bindings comic ready. No cambió configuración ni ejecutó HTTP. El schema de environment_status solo admite lectura sin argumentos; no ofrece refresh/reconciliation. Consultar tras setup es el mecanismo observado. Esta recuperación no prueba la causa del unknown previo ni autenticación del consumidor.

## Aceptación HTTP real y retirada

6 de octubre, UTC, tarea cloud normal 01a11150-19b6-716d-8b13-f5769d743034, misma publicación y bindings nuevos. Executor usó permiso de red soportado, proxy y TLS conservados; GET únicos sin redirects/retries ni lectura de secretos.

- 13:30:06.244Z: anónimo, 302 text/html, exit0; Access protegido.
- 13:31:41.518Z: autenticado con identidad comic habilitada temporalmente, 404 application/json/unavailable=true, exit0; atravesó Access y encontró el Worker cerrado.
- 13:32:40.152Z: mismos bindings tras retirada, 302 text/html, exit0; siguiente lectura vuelve a Access.

El primer PUT de habilitación tuvo error de transporte; GET independiente confirmó disabled antes de un nuevo PUT confirmado. No se repitió HTTP. Token quedó disabled y política deny/everyone antes de13:32:10Z, dentro del límite13:34Z. No EMAIL, POST, envíos ni datos de clientes. El handshake y retirada están aceptados; siguiente bloque separado: snapshot visual aprobado, ventana servidor, consumo único propio/recibo/duplicado/cierre. No repetir custodia ni pedir recopia por el unknown histórico.
