# Piloto propio de correo: revisión preparada

## Seguimiento: aprobación registrada, envío bloqueado antes del intento

El owner declaró haber pulsado Aprobar. La consulta primaria aún mostró draft y la pantalla no pudo confirmar estado; una recarga recuperó la lectura. El agente registró la aprobación ya autorizada por el owner mediante el botón, y comprobó approved con vigencia diez minutos. No atribuir el fallo transitorio a expiración de sesión sin evidencia.

El turno cloud 01a0fd63-516e-70a4-abff-c8549062e1af ejecutó un POST: 403 application/json, curl 0, sin segundo intento. D1 conservó approved, attempt_id null y cero recibos. La prueba diagnóstica posterior usó una clave sin mensaje y devolvió service_request_required: rechazo previo a identidad/custodia. El código requería request.body null; un transporte vacío con stream presente reproduce el rechazo. Nueva prueba falló antes del fix y pasó después. Lectura acotada distingue cero bytes de contenido, rechaza cualquier byte incluso con Content-Length 0 declarado, limita lecturas y tiempo, cancela stream, preserva rechazo de Origin. No afirmar todavía que el fix remoto haya enviado correo o validado JWT.

Verificación local: 691/691 pruebas, lint sin errores (advertencia img existente), build aprobado. Ambos Access restaurados deny; flags false y bindings EMAIL/limitador/identidad de servicio retirados. D1 preservada, no envío confirmado. Publicar corrección solo en canary y renovar aprobación exacta si venció antes de un nuevo consumo; nunca prolongar una decisión silenciosamente.

Proyecto AFW, repositorio agent-friendly-web, mail-canary, 2 de octubre de 2026. Access/proxy aceptado según AFW-CLOUD-PROXY-CONNECTION-2026-10-02.es.md. No producción ni clientes.

Borrador own-cloud-mail-20261002-01 guardado en D1 dedicado e1d480e2-e369-4f0b-ae7d-5cab3b7eee16. Hash d71120b7a94a8c18457881929a2dcfb10a6998e20de39dbf0d7e76f2018b874b coincide en custodia y outbox; lectura primaria confirma draft, decision_ref y attempt_id null, recibos cero. Contenido privado permanece en D1, no se copia aquí.

Settings del Worker existente agent-friendly-web-mail-canary actualizados mediante API, sin cambio de código: operador true, servicio false. Subject humano heredado sin leer valor; identidad de servicio copiada directamente entre recursos de custodia sin emitir valor. EMAIL restringe destino a la cuenta propia del owner y remitente a hello@agentfriendlyweb.dev; MAIL_RATE_LIMITER namespace 2026100201, 2 solicitudes/60 segundos. Consumidor Access deny everyone. Operador Access allow únicamente identidad propia previamente usada, sesión 5 minutos.

Chrome muestra /message/own-cloud-mail-20261002-01, contenido exacto, estado borrador y botón Aprobar este mensaje habilitado. No aprobación ni envío efectuado por el agente. Aprobación humana dura diez minutos y no acredita envío.

Próxima acción humana: revisar y aprobar ese mensaje. Después: verificar decisión/hash/vigencia en primaria, habilitar consumidor exacto solo para este piloto, comprobar JWT activo y ejecutar POST sin cuerpo ni Origin desde cloud, conservar recibo y probar segunda consulta sin nuevo intento. No reintentar un resultado incierto. La llegada al buzón se comprueba por separado.

Rollback: flags false, retirar EMAIL/limitador/identidad de servicio añadidos, ambas políticas deny, conservar D1 y decisiones. No purga, cron ni cambios en producción. Credencial vence 3 de octubre de 2026 10:50 Buenos Aires; no renovación implícita.

Fuentes consultadas: https://developers.cloudflare.com/email-service/api/send-emails/workers-api/ y https://developers.cloudflare.com/email-service/configuration/send-bindings/. El contrato email.send y messageId concuerda con el consumidor existente.
