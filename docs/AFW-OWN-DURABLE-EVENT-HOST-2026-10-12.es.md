# Acoplamiento privado de eventos y proceso original

Estado: preparación de fuente; sin montaje, permisos nuevos, publicación remota ni prueba de ordenador apagado.

La invocación del mismo DO comparte la custodia del proceso y el controlador de suscripción. La lectura de readiness dentro de la transacción de consumo no puede iniciar otra transacción SQLite en espera de la primera. El adaptador debe prestar únicamente lectura del mismo snapshot, conservar el ACK exterior real, rechazar escritura anidada y referencias usadas después del callback y aislar las cadenas asincrónicas concurrentes. No se despacha a Node dentro de una transacción ni durante su ACK.

La composición se construye con contexto OAuth, proyecto, D1, almacenamiento del ctx original, ventana, claves y programa fijados por el servidor. El cuerpo del cliente nunca aporta identidad de plataforma. La suscripción valida forma, callback y selector autorizado antes de arrancar infraestructura. Consume usa el puente firmado y el controlador con identidad verificada por solicitud. Retirar la suscripción debe seguir siendo posible con identidad OAuth vigente aunque el propósito de seguimiento se haya retirado; solicita cierre del proceso sin arrancarlo.

Las pruebas locales pueden demostrar SQL, firmas y el circuito privado completo con una plataforma y callback sintéticos. No acreditan procedencia Cloudflare, recepción del cliente real ni una revisión terminada en Codex cloud. El productor que invoque deliver debe aportar metadatos de un evento realmente guardado; esa operación interna no se publica como método MCP.

Antes del ensayo remoto siguen pendientes el montaje concreto en el mismo OAuth/D1/DO, contexto resuelto por servidor, configuración y rollback comprobados, permiso de seguimiento propio, callback real, revisión cloud completada y cierre físico observado. La guardia permanente y el envío a Max conservan sus gates separados.
