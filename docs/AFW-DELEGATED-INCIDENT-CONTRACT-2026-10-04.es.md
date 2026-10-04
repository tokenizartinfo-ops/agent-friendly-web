# Señales delegadas y registro operativo

Proyecto AFW, repositorio agent-friendly-web. Preparación local, sin despliegue ni señales remotas. No modifica los Workers delegados, Access, D1 de expedientes o permisos de usuarios.

## Contrato implementado

El registro conserva afw_public_web con sus tres checks originales. Admite además afw_delegated_canary y afw_delegated_real_pilot, exclusivamente con delegated_edge. Rechaza combinaciones cruzadas, recursos ajenos, campos adicionales y versiones que no sean UUID. No requiere migración: las tablas operativas existentes almacenan resource/check como texto sin ampliar datos personales.

observeDelegatedService usa los orígenes fijos del probe, expectativa explícita closed/available, fecha, ID de evento y versión UUID. Valida antes de consultar. Retorna el informe público saneado y una señal exacta de seis campos: eventId/resource/check/version/observedAt/result. No entrega cuerpos ni hace POST, firma, agenda, despliegue o lectura privada. La versión se debe comprobar por control plane antes de invocarlo: validar su formato no prueba procedencia. La expectativa debe corresponder al modo desplegado, incluida una ventana temporal de mantenimiento.

recordSignal agrupa por recurso/check/versión y conserva idempotencia, transacciones, orden cronológico y límite de investigaciones. Una recuperación anterior no borra un fallo más reciente; cerrar investigación no significa reparación. No se cambió esta política ni se agregó reconexión automática. El productor futuro debe limitar envío periódico de estados saludables para evitar crecer el historial sin necesidad.

## Verificación

Prueba roja del recurso delegado rechazado por el contrato anterior; prueba posterior aprobada. Probe503 dos veces crea una sola incidencia con dos fallos; probe404 esperado cierra la misma incidencia. Versiones, recursos, evento y modalidad inválidos no disparan consultas. Ingress HMAC acepta la señal delegada correcta202 y rechaza la combinación equivocada400 sin persistirla. Suites previas de autenticación, colisiones, fallos de almacenamiento, concurrencia y orden se conservan.

## Inventario remoto y siguiente entrega

Consulta API de solo lectura el4deoctubre: diez scripts con prefijo agent-friendly-web; ninguno con operat/monitor en el nombre. No se verificó un receptor desplegado bajo otro nombre, por lo que no anunciar operations.agentfriendlyweb.dev/signals como activo. Tampoco se creó un cron, webhook Codex, secreto o suscripción.

Siguiente bloque autónomo: identificar/provisionar Worker y D1 operativos aislados con configuración cerrada, sin reutilizar almacenamiento de expedientes. Definir identidad del productor y custodia de firma; verificar recepción remota sintética, duplicado y recuperación; después conectar periodicidad y consumidor cloud con sus contratos comprobados. Rollback de este bloque local: revertir código manteniendo el historial. Antes de un despliegue remoto registrar IDs, origen, acciones y versión de cierre. No pedir al cliente un login para una prueba operacional pública.
