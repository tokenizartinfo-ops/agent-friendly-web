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

## Reserva y composición de lectura preparadas

`readActiveAssistanceGoalLease` consulta metadatos operacionales primarios: pedido/ref/run/revisión exactos, topic orientation, reserva no terminada y vigente de máximo cinco minutos, sin revisión posterior del proyecto. Otro pedido de igual revisión conserva su identidad independiente; no sustituye ni suprime esta reserva. No autentica servicios ni concede consentimiento privado.

`createAssistanceGoalReader` compone adaptadores confiables de servidor: autenticar servicio de propósito `afw.goal-guidance.read.v1`, resolver inscripción privada por referencias opacas, comprobar reserva, capturar snapshot y recalcular la identidad HMAC del pedido mediante el contrato existente. Repite autenticación, inscripción, reserva y snapshot después de las esperas. Secuencia/revisión/fuente/declaraciones distintas deniegan; una nueva concesión no revive la captura anterior. La respuesta contiene únicamente el contrato mínimo y vence al menor límite de permiso, reserva y ventana explícita.

Estas dependencias no son callbacks enviados por el cliente. La función no implementa por sí misma autenticación criptográfica: devolver `{id,purpose}` no acredita identidad. No hay imports de runtime, ruta HTTP, nueva custodia ni lectura cloud. El siguiente adaptador deberá verificar identidad de servicio separada y firma de petición con finalidad/audiencia/ruta/ventana vinculadas, limitar cuerpos/rate y resolver todos los recursos por servidor. No reutilizar como permiso la identidad operacional, la firma de feedback ni el consentimiento de WorkersAI.

Las bases privadas y operacionales son independientes: las comprobaciones repetidas no forman una transacción distribuida ni garantizan revocación instantánea de datos ya recibidos. Este lector no autoriza invocar un modelo ni entregar luego una propuesta; esos puntos necesitan nuevas comprobaciones de permiso/reserva/revisión. Se probaron cambios durante awaits (retirada, regrant, propietario, revisión, identidad, reserva, configuración y objetivos), expiración y minimización. Ocho pruebas focalizadas pasaron tras pruebas rojas por módulo ausente. Sin operaciones ni promoción de clientes.

Suite completa local de1.030pruebas aprobada; lint focalizado sin errores. CI37543880440 aprobó el source93ac490 anterior; no acredita estos nuevos módulos hasta comprobar su propio HEAD. El servidor sintético local fue detenido; durante la recarga del harness apareció una advertencia de createRoot/HMR, por lo que no se acredita consola limpia ni aceptación visual completa. No apareció como error de la aplicación desplegada.

## API de servicio y Worker independientes preparados (6 de octubre)

Esta preparación sustituye el pendiente de autenticación del apartado anterior: `assistance-goal-service-identity.mjs` verifica JWT Access RS256 con emisor, audiencia única, tipo app, sujeto vacío e identidad dedicada, junto con HMAC de propósito/origen/ruta/hora/cuerpo. Excluye explícitamente identidades y audiencias operacionales; rechaza peticiones del navegador, firmas alteradas y timestamps fuera de un minuto. La clave de lectura debe ser distinta de la clave de señales. Validez criptográfica del JWT no equivale a revocación viva de Access.

`assistance-goal-http.mjs` limita JSON a 512 bytes y tres segundos, requiere rate limiter, inscripción única resuelta por servidor y ventana inmutable máxima de diez minutos. Solo recibe eventId, projectRef, runId y revision. Consulta fuente privada y reserva operacional primaria, repite identidad/permiso/propietario/revisión/reserva después de las esperas y entrega únicamente declaraciones mínimas con no-store. No recibe nombres, cuentas o recursos seleccionados por el cliente. Los errores devuelven códigos sin detalles privados.

El entrypoint independiente `worker/assistance-goal-context/index.mjs` y `wrangler.assistance-goal-context.jsonc` están cerrados por defecto, sin ruta, cron, bindings, secretos ni inscripción. `goal-context-canary.agentfriendlyweb.dev` es un origen planificado, no un hostname desplegado ni verificado. No se creó un Worker remoto ni se modificó ningún permiso o esquema remoto. El dry-run de Wrangler compiló 65,16 KiB (gzip 16,37 KiB).

Validación local: 1.039 pruebas aprobadas, incluyendo JWT RS256 y HMAC reales con claves sintéticas, cuerpos bloqueados, rate limit, cierre durante awaits y retiro append-only durante la segunda lectura de reserva. Las pruebas HTTP utilizan SQLite nativo con dos bases independientes; no acreditan aún este nuevo endpoint en workerd/D1 ni transporte cloud. Lint completo sin errores. La aceptación visual móvil/teclado/reduced-motion continúa pendiente. CI37551768844 aprobó el HEAD anterior 1ae642b; comprobar la CI del siguiente commit antes de integrar.

## Siguiente bloque: procedencia de la propuesta

Antes de invocar un modelo y entregar una propuesta, persistir un recibo privado de lectura asociado a la secuencia exacta de consentimiento capturada, fuente, propietario, revisión, eventId, projectRef, runId, hash del contexto y vencimiento mínimo. Usar INSERT condicional en la base primaria que compruebe los mismos valores y permiso vigente. El recibo no será una credencial ni incluirá narrativa o audio. Una concesión nueva no debe autorizar una respuesta calculada bajo la concesión anterior.

La entrega deberá comprobar otra vez recibo, autoridad, reserva y revisión; presentar una pregunta o siguiente paso, sin publicar ni aplicar cambios automáticamente. Primero probar rechazo por retiro/regrant/cambio de revisión, expiración, respuesta duplicada y pérdida de respuesta en workerd/D1 local. Después preparar preservación y rollback para el canary propio, custodia dedicada y activación finita. No promover a clientes ni guardia permanente por este bloque.

Aceptación nativa adicional: el endpoint compuesto se compiló con esbuild y ejecutó en workerd/Miniflare con dos bindings D1 locales separados, JWT RS256 y HMAC sintéticos. Lectura mínima 200 seguida de retiro append-only y nueva lectura 403; historial de dos eventos y narrativa intactos. El binario local admite hasta compatibilityDate 2026-09-07, utilizada en esta prueba; no acredita la fecha 2026-09-28 configurada para el futuro Worker remoto. Build completo aprobado. Son 1.039 pruebas de suite más esta prueba nativa adicional; la siguiente CI debe confirmar el total de 1.040.

## Recibo privado y propuesta acotada preparados

`db/assistance-goal-read-receipts.sql` añade un ledger independiente en la fuente privada. Conserva referencia opaca, fuente, propietario, revisión, secuencia exacta de consentimiento, reserva, huellas SHA-256 del contexto y del pedido original y vencimiento; no almacena narrativa, audio ni texto de propuesta. El INSERT condicional comprueba estado primario, fuente y última concesión en la misma sentencia. Reintentar el mismo run/concesión recupera el mismo recibo, sin renovar. Su ID es correlación, no una credencial.

El lector HTTP ahora exige persistir el recibo antes de devolver `{context,receipt}` y vuelve a comprobar servicio, inscripción, reserva y snapshot después de persistir. Una retirada puede dejar un recibo histórico de lectura sin entregar contexto; esto no reactiva permisos. `readCurrentAssistanceGoalReceipt` verifica la concesión original, revisión, propietario, fuente y huellas, y repite la consulta primaria después de los hashes asíncronos. Se reprodujeron y corrigieron retirada durante hash y sustitución del pedido original.

`createAssistanceGoalProposal` prepara un coordinador interno sin endpoint, modelo o proveedor configurado. Requiere autenticación real de un propósito separado `afw.goal-guidance.propose.v1` mediante futuros adaptadores de servidor, inscripción, reserva y recibo vigentes. Repite comprobaciones antes y después de generar. El callback de generación recibe solo declaraciones mínimas y su condición declarada, sin IDs internos, secuencia o datos owner. Devuelve una pregunta breve y su motivo, ambos texto plano acotado, sin enlaces, HTML, campos extras ni autorización para operaciones; exige revisión del usuario.

El límite de espera es el menor entre treinta segundos, ventana y recibo. La señal AbortSignal solicita cancelación al vencimiento; un proveedor que ya recibió datos o ignora cancelación puede seguir procesando, pero esa respuesta no se devuelve. Regrant/retirada/revisión/identidad/cierre/reserva distinta invalidan la respuesta capturada. Las verificaciones entre bases independientes siguen sin constituir una transacción distribuida ni revocar datos ya recibidos.

Evidencia: 1.052 pruebas locales completas, lint y build aprobados. En workerd/D1 local: JWT/HMAC reales para lectura, persistencia de un único recibo tras reintento, propuesta sintética de una pregunta y retirada durante generación con denegación403 sin devolver la propuesta; historial y narrativa conservados. La autenticación del coordinador en ese harness es un fixture confiable de prueba, no autenticación HTTP ni acceso cloud. La fecha local sigue limitada a2026-09-07. Dry-run del Worker:74,63KiB/gzip18,30KiB, única flagfalse.

CI37553387573 aprobó exactamente0920f11 (1.040pruebas/lint/build) antes de este bloque; comprobar la próxima revisión. Lectura API de settings confirmó el canary web con DB propia2b518988 y copilot/feedbackfalse, y ausencia del Worker goal-context. No se migraron esquemas remotos, configuraron secretos ni activaron permisos.

Próximos cierres: comprobar CI exacta; preparar Worker independiente cerrado y conservar versión base de rollback; después ledger idempotente de propuestas/entregas para recuperar respuestas perdidas sin regeneración ni falsa entrega. Antes de abrir acceso: custodia/identidad del propósito nuevo, política Access, inscripción propia, migración aditiva con preservación, recepción real en el expediente y aceptación visual pendiente. No invitar a clientes ni activar guardia permanente desde evidencia local.
