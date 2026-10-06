# Orientación con contexto mínimo consentido — 6 octubre 2026

Estado: proyección pura y almacenamiento preparados; esquema SQL probado solo en SQLite local, con adaptador HTTP cerrado; sin migración remota, UI de permiso, transporte, lectura de contexto cloud ni activación.

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

Ruta `/api/projects/[projectId]/assistance-consent`: GET de estado y POST de concesión/retiro. Resuelve JWT/propietario por servidor, origen/JSON exactos, cuerpo máximo768bytes/3segundos, límite de solicitudes, revisión/pedido y finalidad fija. Publica solo granted/issuedAt/expiresAt, nunca secuencia o actor. Corta al cambiar ventana, identidad o inscripción visible durante las esperas y consulta otra vez el estado primario antes de responder.

Requiere flag nuevo `AFW_ASSISTANCE_GOAL_CONTEXT_ENABLED=true`, selector propio existente y fecha UTC canónica `AFW_ASSISTANCE_GOAL_CONTEXT_EXPIRES_AT` dentro de diez minutos. Ausentes por defecto: deniega404 antes de leer/escribir DB. La concesión se acota a esa ventana. Ningún config remoto o entorno cloud fue ampliado por preparar el adaptador.

Sigue pendiente la UI, lectura de servicio con identidad/reserva separadas, entrega de preguntas/propuestas, migración propia y aceptación real. La ruta de consentimiento no lee ni transmite contexto a Codex cloud; conceder no inicia una consulta. Los mensajes deberán explicar ese estado con precisión.

Validación ampliada del almacenamiento/adaptador:16pruebas focalizadas y suite completa de1.014pruebas pasaron; lint sin errores (dos advertencias previas) y build completado. Se comprobó timeout real de3segundos y cancelación del cuerpo, límites, CSRF, idempotencia, expiración, propiedad y carrera de escritura. No hubo SQL ni permisos remotos.
