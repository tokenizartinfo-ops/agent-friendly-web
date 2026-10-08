# Ejecutor acotado y admisión del servidor — aceptación de fuente

PR329 integrada en main `1792a64037ed0d4e55d0d7c4f47091864817f62e`, 8 de octubre de 2026 14:50:16 UTC. CI37793153502 aprobada. Fuente previa revisada `7bb2b6c`: 1184 pruebas aprobadas, una omitida por plataforma, cero fallos; lint sin errores y dos avisos previos; build correcto.

El transporte canónico impone origen, rutas, límites de tamaño y timeout. El ejecutor registra cada intento antes del envío, valida correlación y permite como máximo seis fases normales y un cierre sin reintento. Una observación del host fallida, caducada o bloqueada detiene el siguiente paso. Esto no acredita por sí solo disponibilidad remota.

La admisión del servidor usa configuración, identidad, inscripción y aprobación propias, separadas de las observaciones del host cloud. El registro D1 y sus guardas SQL rechazan efectos duplicados o posteriores al vencimiento. Las reservas se vinculan también al evento y request: cambiar identificadores no elude una aprobación o revocación. Una migración aditiva explícita agrega la guarda y su marker; no se aplicó en remoto. El cierre histórico legítimo se preserva.

Revisión independiente: transporte, runner y guardas de reserva aceptados sin P1/P2 pendientes. La aceptación corresponde a módulos internos desmontados de PR329. El adaptador HTTP posterior tiene revisión propia pendiente y no queda aceptado por este documento.

Pendientes: adaptador HTTP QA revisado, publicación y adopción ordinaria, observador host real, ensayo propio nuevo con devolución visible, cierre administrativo independiente y prueba dentro de un intervalo real de PC apagado. El vencimiento SQL no acredita retirada de un token ni restauración de política o bindings. No se invitó a Max, no se habilitó guardia permanente y no se repitió la entrega aceptada de revisión10.
