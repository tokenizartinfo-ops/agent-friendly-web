# Orientación con contexto mínimo consentido — 6 octubre 2026

Estado: proyección, almacenamiento, adaptador HTTP cerrado y UI de permiso preparados. Esquema SQL probado solo en SQLite local. Sin migración remota, transporte, lectura de contexto cloud ni activación. Aceptación visual de la nueva UI pendiente.

## Decisión de alcance

La primera orientación cloud utilizará únicamente tipo de sitio y objetivos seleccionados. No todos necesitan AF5 ni operaciones transaccionales: ese contexto permite conversar sobre un objetivo inmediato y una sola pregunta. Son declaraciones del usuario, no evidencia del sitio ni capacidad verificada.

No utilizar el consentimiento de transcripción/texto del copilot como permiso para Codex cloud. La finalidad propuesta es orientación de objetivos (`afw.assistance-goals-consent.v1`), específica para un pedido de ayuda, con vigencia máxima de diez minutos y retirada. La identidad operacional actual tampoco adquiere este acceso.

La proyección `lib/assistance-goal-context.mjs` exige concordancia entre propietario/proyecto, pedido, revisión, reserva de revisión y secuencia vigente del permiso. Acota la respuesta a la vigencia menor entre reserva y permiso. Solo acepta opciones conocidas; datos ambiguos requieren una pregunta posterior. No contiene nombres, correos, dominio, texto libre, audio, transcripciones, identificadores internos del owner ni instrucciones del usuario. No permite operaciones.

## Adaptador pendiente — orden obligatorio

1. Persistir consentimiento específico y revocación del usuario con idempotencia y secuencia; no crear grants desde un webhook. Interfaz: explicar datos, finalidad, destino Codex cloud y duración, con retirar visible y sin ocultar el borrador.
2. Resolver identidad de servicio de propósito distinto y reserva vigente por servidor; vincular el pedido original firmado, propietario y revisión mediante consultas primarias. Los argumentos de la función pura nunca deben venir directamente de JSON del cliente.
3. Preparar lectura de servicio con firma separada, ventana y denegación cerrada, sin Origin/browser token. Repetir autoridad después de esperas y antes de responder. La función pura no autentica por sí misma ni acredita estas consultas.
4. Devolver una propuesta o pregunta correlacionada en el expediente, con comprobación de revisión/permisos vigente también al entregarla. El usuario revisa; no guardar ni publicar automáticamente. Retirada no elimina el historial pero impide otra lectura y entrega.
5. Ensayo sintético de dos identidades, respuesta perdida, regrant, cambio de revisión, expiración/retirada y cierre. Solo después valorar un piloto real. No inferir guardia permanente ni enviar la invitación de Max por este documento.

## Validación

Prueba roja por función ausente y proyección exacta; casos de minimización, ventana, sustitución de identidad/reserva, finalidad, secuencia, revisión y declaraciones inválidas. Las pruebas puras no equivalen a aceptación remota ni a consentimiento humano.

Cuatro pruebas focalizadas y suite completa de1.002pruebas pasaron; lint focalizado sin errores. La proyección no está importada por ningún runtime ni publica datos.

## Almacenamiento separado preparado

`db/assistance-goal-consent.sql` es exclusivo de D1 privado de origen; no aplicarlo a la base operacional. `lib/assistance-goal-consent.mjs` registra concesiones/retiros append-only, secuencia independiente y TTL servidor de diez minutos. Reintentar el mismo intento no renueva la vigencia ni crea otra concesión. El retiro continúa posible aunque el expediente cambie. Las admisiones comparan propietario, revisión y fuente dentro del mismo INSERT; cambios durante esperas no escriben permisos.

La lectura combina propietario, fuente y última secuencia con sesión primaria. La secuencia es interna: un adaptador HTTP deberá excluirla del contrato público, resolver el actor y reloj por servidor, verificar CSRF, limitar cuerpos/rate y volver a cercar la respuesta. Este módulo no reemplaza esas garantías ni crea permisos para un cliente por sí mismo.

## Adaptador HTTP preparado cerrado

Ruta `/api/projects/[projectId]/assistance-consent`: GET de estado y POST de concesión/retiro. Resuelve JWT/propietario por servidor, origen/JSON exactos, cuerpo máximo768bytes/3segundos, límite de solicitudes, revisión/pedido y finalidad fija. Publica granted/issuedAt/expiresAt y stateVersion, nunca secuencia o actor. stateVersion es una marca de concurrencia, no una credencial ni permiso. Corta al cambiar ventana, identidad o inscripción visible durante las esperas y consulta otra vez el estado primario antes de responder.

Requiere flag nuevo `AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED=true`, selector propio existente y fecha UTC canónica `AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT` dentro de diez minutos. Ausentes por defecto: deniega404 antes de leer/escribir DB. La concesión se acota a esa ventana. Ningún config remoto o entorno cloud fue ampliado por preparar el adaptador.

Sigue pendiente la aceptación visual, lectura de servicio con identidad/reserva separadas, entrega de preguntas/propuestas, migración propia y aceptación real. La ruta de consentimiento no lee ni transmite contexto a Codex cloud; conceder no inicia una consulta. La UI explica ese estado con precisión.

Validación ampliada del almacenamiento/adaptador:16pruebas focalizadas y suite completa de1.014pruebas pasaron; lint sin errores (dos advertencias previas) y build completado. Se comprobó timeout real de3segundos y cancelación del cuerpo, límites, CSRF, idempotencia, expiración, propiedad y carrera de escritura. No hubo SQL ni permisos remotos.

## Retiro frente a una autorización atrasada y UI preparada

Se reprodujo primero el fallo: una concesión anterior al retiro podía llegar tarde y devolver200/reactivar. El POST ahora exige la marca de estado consultada; una concesión nueva compara esa marca y el INSERT compara la secuencia del proyecto en la misma operación SQL. El retiro no depende de una marca vigente. Un reintento ya registrado devuelve el estado vigente sin renovar permiso. La prueba nativa SQLite introduce el retiro entre la comprobación y el INSERT: se conserva solo el retiro, la concesión falla409 y la lectura deniega.

`AssistanceGoalConsent` aparece dentro del pedido de orientación únicamente con flag y ventana canónica explícitos; ambos siguen ausentes remotamente. Explica tipo de sitio/objetivos, destino, vigencia y límites. Retirar permanece disponible aunque haya cambios sin confirmar. Una respuesta perdida conserva el mismo intento; consultar no confirma ese intento ni lo renueva. Retirar explícitamente reemplaza una concesión incierta y el servidor bloquea su llegada tardía. Conflictos409 obligan a consultar el estado antes de una nueva concesión. Respuestas tardías de vistas desmontadas no actualizan la UI. No descarta audio, narrativa ni borrador.

El lector cliente limita JSON a512bytes/3segundos, cancela streams bloqueados y rechaza metadatos privados o fechas incoherentes. Suite completa de1.019pruebas aprobada, seguida de una prueba nativa adicional aprobada de retiro durante el INSERT. Lint sin errores y dos advertencias anteriores; build final aprobado. El ensayo visual desktop/móvil no está acreditado: Chrome3 no estuvo disponible para control. Harness sintético local en output/goal-consent-preview, sin Cloudflare ni datos reales; servidor detenido al terminar el intento. No promocionar esta UI como aceptada ni desplegarla abierta por los checks locales.

### Comprobación posterior de escritorio

Chrome4 volvió a responder en la misma extensión/perfil. Ensayo local sintético: concesión con respuesta perdida mostró incertidumbre; consultar recuperó el estado sin borrar el intento; reintentar confirmó el mismo recibo y conservó la fecha; cambios sin confirmar bloquearon conceder, pero retirar continuó habilitado y devolvió estado sin permiso activo. Captura local: output/afw-goal-permission-local-20261006.png. El harness usa el componente real, estilos del contenedor y fuentes de fallback, no el recorrido autenticado ni la tipografía de producción. CI37539068247 aprobó1.020pruebas/lint/build para e413608.

La conexión se interrumpió al preparar390x844; el inventario posterior no mostró Chrome. No se acredita móvil, teclado ni reducción de movimiento. No confundir la aceptación funcional de este harness con una migración o permiso real. Tampoco pedir otro OTP por una desconexión de control.

## Snapshot primario interno preparado

`lib/assistance-goal-snapshot.mjs` selecciona en una sola consulta primaria la revisión, tipo de sitio, objetivos, fuente de orientación y último permiso propio. No selecciona narrativa, dominio, correo ni audio. Deniega retiradas, expiración, propietario/fuente/revisión distintos, finalidad anterior o declaraciones desconocidas. Es preparación de almacenamiento: sus identificadores internos no deben serializarse como respuesta HTTP/cloud. No autentica servicio, resuelve reserva ni confirma la correlación HMAC por sí mismo.

Antes de conectarlo: autenticar una identidad de propósito separado; resolver inscripción/fuente por servidor; recalcular evento/referencia con el contrato firmado vigente; consultar reserva activa por servidor; capturar snapshot, proyectar únicamente el contrato mínimo y volver a comprobar reserva, secuencia, revisión y ventana después de esperas y antes de entrega. No crear concesiones desde un webhook. Dos pruebas nativas SQLite pasaron tras reproducir el módulo ausente; sin endpoint, SQL remoto, importación runtime o lectura privada cloud.

Validación del snapshot: suite completa local de1.022pruebas aprobada y lint focalizado sin errores. El build anterior y CI de e413608 no incluyen este nuevo módulo, que no se importa en runtime; la CI de esta nueva preparación deberá comprobar el HEAD exacto antes de integrar.
