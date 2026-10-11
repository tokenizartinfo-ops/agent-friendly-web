# Admisión primaria de la ocurrencia propia

`readOwnAdmissionScope()` consulta el mismo preregistro SQLite que reservó e instaló la ocurrencia. Es un RPC fijo, sin selectores. Requiere habilitación explícita, reserva/configuración vigentes, originales y challenge actuales, intención y finalización válidas, consumo válido presente y dos lecturas D1 coherentes sin revocación. El checkpoint primario conjunto y la ventana de evidencia se comprueban después de los awaits. Devuelve pins validados y fechas de observación/evidencia/vencimiento: no devuelve admissionId ni reconstruye un permiso de despacho.

`readOwnClosureScope()` conserva su propósito documental: puede leer tras vencimiento o revocación D1. Ese estado no se acepta para avanzar. La retirada del preregistro/reserva sigue rechazando ambas lecturas; la recuperación administrativa propia no se sustituye por HTTP.

`createPrimaryOccurrenceHttpAdapter()` exige referencias y readers live/closure fijados por el servidor. Cada admisión coteja registro/aprobación completos con la fila D1 y revisa configuración antes de muestrear el reloj SQL al final. Ausencia, resultado malformado, pins ajenos, retirada o timeout rechazan; no hay fallback a admisión D1 sola. Stop usa exclusivamente el reader de cierre. El adaptador standalone existente conserva sus consumidores históricos y no se usa para abrir el ensayo propio.

También se normaliza y libera el resultado disposable del RPC install pendiente de PR388. El Workflow sigue persistiendo solo installation_pending.

Pruebas locales: ausencia del RPC y ausencia del nuevo adaptador fueron fallos reproducidos antes de implementar. Focalizadas finales 20/20: consumo coherente, flag cerrado, vencimiento, evidencia vieja, corrupción y restauración sintética, revocación D1 y cierre histórico; aprobación D1 sola rechazada, consulta primaria en cada admisión, retirada y stop por reader separado. Una preparación de fixture tenía expiresAt sin el margen de recuperación requerido; se corrigió la fixture, sin modificar el validador.

La revisión independiente encontró dos P2, reproducidos antes de corregir: retirada del permiso de cierre durante el lookup del journal y reloj SQL demorado que rejuvenecía una comprobación anterior. `beforeCloseAuthorize` relee el cierre después de esos awaits; la admisión conserva la fecha más antigua de sus originales/challenge y su freshUntil real. El reloj SQL debe seguir dentro de esa ventana. La fecha evidenceAt se conserva en el journal para que el fence SQL existente rechace también un batch demorado, sin cambiar esquema ni prometer atomicidad DO-D1. Se corrigieron en una sola pasada, sin una segunda revisión.

Suite final: 1537 aprobadas, cero fallos y dos omitidas (172110.739 ms). Lint sin errores, con dos warnings preexistentes; compilación aprobada.

Límite: fuente aún sin montaje HTTP propio remoto ni dispatcher real alojado. Las callbacks sintéticas de pruebas no acreditan origen cloud, permiso, scheduling, ejecución real o PC-off. La lectura DO y D1 no son una transacción distribuida; se requieren fences D1 existentes y el cierre administrativo para revocación. Siguiente paso: composición Worker cerrada de HTTP/JWT/limiter/readers y dispatcher real soportado, seguida de cierre/recuperación, custodia, publicación/adopción y ensayo integrado propio antes de acordar PC-off o invitar a Max.
