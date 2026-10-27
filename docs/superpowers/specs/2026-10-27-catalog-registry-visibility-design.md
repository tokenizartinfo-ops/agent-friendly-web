# AFW: comprobación acotada de consistencia del registro público

El intento ed21 del 27oct2026 hizo un único PUT público, después falló en su primera comprobación; no creó versión ni tráfico. La lectura primaria posterior encontró el valor/metadata/expiry esperados; el cierre retiró únicamente ese registro. El contador de lecturas sitúa el fallo después del ACK y en el readback. No se conservó el detalle del primer GET y no se atribuye su causa exacta a red o proveedor. KV documenta consistencia eventual: https://developers.cloudflare.com/kv/concepts/how-kv-works/ .

## Decisión de implementación
Opciones consideradas por el implementador: mantener el rechazo inmediato (seguro pero confunde ausencia transitoria con fallo terminal); repetir PUT (descartado: puede duplicar una escritura de resultado incierto); observar de forma acotada después de un ACK válido. Se elige la tercera dentro de la autorización del owner para diagnosticar y resolver autónomamente. No requiere servicio nuevo ni un cambio del Worker.

Solo tras ACK exitoso exacto, hasta nueve observaciones del mismo registro a intervalos de 7.500ms; ocho lecturas adicionales como máximo. La primera coincidencia exacta habilita continuar, nunca un valor ajeno. Una respuesta inválida/error de red se detiene, no se reintenta. Se conserva el límite total110000ms, presupuesto64lecturas y ventana original<=600000ms; no se renueva plazo, registro, grant o permiso. Si falta margen para esperar y escribir antes del límite de90segundos, detenerse.

El cierre restaura el host cerrado antes de tocar KV. Tras UN DELETE de la clave propia, una lectura aún propia puede observarse de nuevo con el mismo límite; un conflicto ajeno detiene sin borrarlo. ACK desconocido conserva uncertain/mayRetryfalse sin observaciones de continuación ni repetición. Etapas saneadas separan ACK, readback y agotamiento; no guardar valores, claves ni identificadores owner.

No cambia contratos públicos, permisos, actor, reserva, cron, código desplegado, receptor o consentimiento. La prueba de catálogo necesitará nueva ventana tras aceptación de la corrección. PC-off y operationalReadiness siguen false.