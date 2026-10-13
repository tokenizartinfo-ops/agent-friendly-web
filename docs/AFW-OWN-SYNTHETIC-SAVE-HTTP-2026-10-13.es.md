# Pantalla mínima para el guardado del ensayo propio

## Recorrido

La pantalla `/qa/expediente` identifica el ensayo como sintético, separado de clientes. Pregunta qué se quiere mejorar primero, descubrimiento o comprensión del contenido. Un solo botón guarda esa respuesta en la D1 privada mediante el writer aceptado en PR417. La confirmación muestra la revisión y explica que aún no acredita recepción ni revisión cloud.

La tipografía comic en todo el cuerpo conserva la preferencia expresa de Gabriel. Paleta papel/tinta/verde, HTML seleccionable, foco visible y controles de al menos 48px. No hay imágenes, scripts, paneles acumulados ni progreso que confunda porcentaje de llenado con capacidad AF. Visual QA remota sigue pendiente mientras Chrome no admite control; las pruebas HTML no la sustituyen.

## Montaje y acceso

Solo el Worker del ensayo delegado intercepta la ruta exacta. `AFW_DOSSIER_OWN_SAVE_ENABLED` debe ser true expresamente; por defecto devuelve 404 antes de leer identidad o datos. El host exige el origen delegated-canary.agentfriendlyweb.dev, proyecto oauth-canary-owner, OAuth/Events/monitoring habilitados, modo window con deadline original válido, política/DB/namespace originales y fuente/programa embebidos. No se monta bajo el dominio público ni se amplía el alcance de las herramientas MCP.

La identidad humana Access se verifica por firma, team, audience, subject y vencimiento, independientemente del permiso de lectura OAuth. Debe coincidir con el owner fijado por servidor. El formulario contiene una referencia firmada específica de propósito y scope, revisión original, UUID v4 de intento, emisión y vencimiento; no grant ni identidad crudos, callback o secretos. Cookie __Host HttpOnly/Secure/SameSite=Strict, Origin exacto, CSP form-action self y Referrer-Policy same-origin. Entradas duplicadas, extras, sobredimensionadas o alteradas se rechazan.

El host exige el probe firmado de la custodia original antes del guardado: la nueva operación privada readReadiness no inicia ni renueva el proceso. Repite todos los pins y flags capturados antes y después de cada await, incluidos team/audience y deadline/modo de servicio. El callback se repite directamente antes del batch; los controles SQL del writer siguen siendo necesarios. GET no concede monitoring ni guarda objetivos.

La ventana del formulario nunca supera la original, ni la identidad Access. Reintentar la misma respuesta usa el mismo intento; una respuesta distinta con ese ticket produce conflicto, sin sobrescribir. Se conservan historial y presupuesto ONE. El guardado no dispara una entrega por sí solo: el operador finito sigue usando el recibo original y el evento guardado, tras ACK nativo positivo y configuración/cierre comprobados.

## Verificación y entrega

Pruebas del handler, composición, host firmado y runtime nativo confirman guardado/replay, rechazo de identidad/CSRF/origen/cuerpo/plazo, probes sin arranque, cierre histórico y montaje cerrado. Una prueba altera cada pin de Access/flags/clave/modo/deadline durante el último probe previo al batch y exige revisión/eventos intactos. La fixture nativa verifica JWT RS256 con JWKS local y D1 real workerd; no acredita cuenta humana ni Node remoto.

Antes de activar: revisión independiente y CI exactas; bundle y closed deploy explícito con OWN_SAVE false, mismas DB/KV/DO/claves y rollback compatible; sin cron ni instancias. No crear secreto ni aplicar migraciones. Access deberá incluir exclusivamente `/qa/expediente` en la aplicación humana propia ya existente, preservando audience, política, TTL y otras rutas. Respaldar y verificar recuperación antes de esa mutación y comparar después. La ruta de Access por sí sola no habilita el flag ni una escritura.

Después: control de Chrome y visual QA; nueva ventana original propia con lectura/purpose reales; consumidor nativo creado UNA vez; verificación callback/recibo original/readiness; guardar una respuesta desde el formulario y comprobar evento/revisión; programar dispatch y cierre originales; acordar apagado. No entregar preliminarmente y luego reiniciar el presupuesto. Verificar respuesta útil cloud, retiro del consumidor y paro físico por separado. Sin Max ni guardia permanente por esta preparación.
