# Manifiesto y actor del primer sucesor

2026-10-14. Preparación interna, sin despliegue ni apertura del ensayo.

`resolveSuccessorPreparation` fija un manifiesto canónico con cuenta, Worker propio, namespace declarado, aplicación, referencias de owner/proyecto, recurso, manifiesto original y candidato. Incluye versión, programa, ventana de hasta diez minutos y presupuesto uno. Una variación cambia scopeHash; el orden de las propiedades aportadas no lo cambia. Copia y congela valores primitivos; rechaza campos extra, getters y objetos coercibles.

El actor se deriva del nombre fijo `afw-own-event-first-successor-v1` usando idFromName del binding suministrado por el servidor. Comprueba idFromString y que el actor sea distinto del original. No acepta nombre/actor arbitrario, no llama get, no arranca Node y no altera la política del intento original.

La salida contiene candidato listo para `createSuccessorReservation`, manifiesto y mayBoot=false. La reserva sigue siendo singleton e inmutable: disponer de este nombre no es permiso para eludir la historia original ni para crear otro ensayo.

## Límites de procedencia

El hash compromete lo declarado por el servidor; no demuestra que namespaceId corresponda al binding, que cuenta/Worker/app sean los desplegados ni que la fuente tenga CI aceptada. El montaje administrativo debe verificarlos antes de reservar y nuevamente antes de consumo ejecutable. No exponer esta preparación como herramienta MCP pública ni tratar prepared como autorización.

## Verificación

Tres pruebas de contrato comprueban determinismo, sensibilidad a alcance/candidato/original, rechazo de entorno ajeno, coerción y getters. Una integración con namespace y D1 nativos locales resuelve actor real de Miniflare y enfrenta dos candidatos contra la misma reserva. Se mantienen las siete regresiones SQLite de reserva. No acredita infraestructura remota ni aceptación cloud.

Siguiente bloque: montaje privado de procedencia y consumo ejecutable con nueva autorización actual, ligados al scopeHash y a la reserva. Cron del proveedor y ciclo nativo de avisos continúan siendo evidencias independientes.
