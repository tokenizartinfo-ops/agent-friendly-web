# Orientación con contexto mínimo consentido — 6 octubre 2026

Estado: proyección pura preparada; sin endpoint, tabla de permisos, transporte, lectura remota ni activación.

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
