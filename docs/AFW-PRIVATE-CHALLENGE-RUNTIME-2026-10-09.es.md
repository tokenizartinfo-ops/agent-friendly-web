# Intercambio privado en el preregistro real de AFW

## Alcance preparado

El Worker propio `agent-friendly-web-independent-closure-qa` puede conducir únicamente POST `/assistance/custody/confirm`, sin query, al mismo Durable Object `PrivateQaPreregistration`, nombre interno fijo `own-qa`. No se agrega otro namespace ni se exponen métodos administrativos por HTTP. El registro continúa mediante el Workflow privado previamente verificado.

El servicio requiere `AFW_QA_CHALLENGE_ENABLED=true` explícito y configuración de identidad administrativa `AFW_QA_CHALLENGE_IDENTITY`. Esta configuración exacta contiene enabled, origin, teamDomain, audience, clientId, principalRef, expiresAt y revision. No se acepta configuración enviada por el consumidor. Los certificados proceden únicamente del hostname Cloudflare Access configurado; la firma RS256, audience única, tipo de servicio, clientId y ventana se verifican antes de acceder a la cuota. Configuración ausente o incorrecta deniega.

La solicitud de nonce y su confirmación requieren dos lecturas activas del preregistro verdadero y correspondencia completa con los pins administrativos. Consultar historia para el cierre no habilita el intercambio. La retirada del preregistro impide consumir el nonce incluso con un JWT todavía válido.

## Presupuesto conservador

El presupuesto utiliza una transacción en el mismo almacenamiento persistente del DO: dos intentos autenticados totales por actor inmutable, destinados a solicitar y confirmar una única prueba. No es una cuota de dos por minuto: no se renueva por tiempo, revisión, identidad o reinicio. Una solicitud autorizada malformada, un intento previo sin registro o un ACK incierto puede gastar presupuesto. Ese caso requiere reconciliación administrativa; nunca limpiar claves, repetir automáticamente o crear otro actor para sortear el límite.

Este presupuesto acotado no declara el servicio listo para múltiples clientes ni una guardia permanente. La futura política operativa debe separarse de esta aceptación propia.

## Recuperación

La candidata y la configuración de rollback incluyen bootstrap y challenge deshabilitados, pins e identidad vacíos y cron vacío. No se añade aún una ruta externa del desafío. La clase de rollback conserva namespace, preregistro, desafío y cuota; deniega HTTP y registro incluso ante flags accidentalmente habilitados. Su lectura histórica y retirada permanecen internas para reconciliar el cierre.

## Evidencia y límites

Las pruebas ejercitan el Worker y DO reales bajo workerd/Miniflare, almacenamiento SQLite, firma JWT RS256, solicitud/confirmación, retirada, solicitudes simultáneas, reinicio y rollback con conservación de historia. Solo se sustituye la respuesta externa de certificados por claves sintéticas. La prueba del presupuesto cubre ACK perdido y reloj regresivo.

Esto acredita fuente e integración local; la versión remota y los controles observados se registran separadamente. No acredita un desafío remoto consumido desde Codex cloud, reserva real de recursos, instalación, cierre integrado, ordenador apagado ni permiso de Max. Esos siguen como gates operativos.
