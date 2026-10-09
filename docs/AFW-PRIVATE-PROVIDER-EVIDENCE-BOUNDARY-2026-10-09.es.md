# Límites de las fuentes administrativas reales

Preparación de Task2 del plan privado de provisioning, 9 octubre 2026. Consulta del esquema del conector Cloudflare, sin llamadas a recursos ni modificaciones remotas. Este documento fija el límite del lector siguiente; no certifica un inventario real.

| Fuente | Campos disponibles en el esquema consultado | Qué debe comprobar el lector |
| --- | --- | --- |
| GET de service token y listado paginado | id, created_at, updated_at, expires_at, enabled, duration; el client_id se conserva únicamente en la custodia privada | Recurso exacto, vigencia, estado y continuidad de creación. El listado debe estar completo, con páginas y fecha; un listado parcial no demuestra ausencia de conflictos. |
| GET de aplicación Access y sus políticas paginadas | Aplicación efectiva y reglas include/exclude/require de cada política | Host/ruta/audience exactos, selector de servicio y ausencia de una regla adicional que amplíe el acceso. No reutilizar la aplicación compartida del gerente. |
| GET de settings y deployments del Worker propio | Bindings efectivos; despliegues con id, created_on, versiones y porcentaje | Worker, namespaces, base y Workflow esperados, cierres y versión servida. No declarar una versión instalada porque solo exista en una lista. |
| GET de schedules del Worker propio | schedules con cron y fechas | Configuración real del disparador. Una programación no prueba que haya ejecutado ni su resultado. |

El esquema del GET de service token consultado **no enumera una versión del secreto**, pero esto no demuestra que la API real no la entregue. Comprobación posterior 21:43–21:44UTC: el listado y GET de la identidad propia retirada sí devuelven `client_secret_version`; GET observó versión2 y enabled=false, con vencimiento8oct. Se conserva como metadata real de esa identidad histórica, sin reactivarla ni trasladarla a otro ensayo. `updated_at`, ID, nombre y `client_id` nunca se convierten en `keyVersion` ni `vaultRef`. Cuando el proveedor aporta la versión real, se valida ese campo opcional; cuando falta, no se inventa. Nunca imprimir ni guardar valores de secretos en el journal.

La misma comprobación detectó que el GET puntual omitía `name` y el listado lo incluía. El lector nuevo solo completa ese campo usando el elemento de ID exacto del inventario consultado independientemente y comprueba su digest contra los pins. Esto corrige la incompatibilidad del lector sin sustituir evidencia por un nombre declarado. Antes de activar la instalación, el cierre existente también debe reconciliar esa forma real: actualmente su transporte exige name en el GET puntual. No relajar su validación ni asumir que sus fixtures demuestran compatibilidad con el proveedor real.

La correlación cloud se obtiene de la tarea, turno y comando originales, junto con HEAD/config/publicación constatados oficialmente. La salida de un comando puede identificar un recibo; no autentica por sí sola la publicación ni el entorno. La recepción se resuelve desde el diario primario de preregistro y debe corresponder al mismo recordRef, receiptRef y ventana. No rellenar datos ausentes con constantes sintéticas, referencias elegidas por el consumidor o resultados de readiness.

El journal conserva únicamente referencias opacas de estas fuentes y sus digests. El lector futuro debe resolver sus originales, comprobar procedencia, consistencia y vigencia, y repetir las lecturas necesarias antes del commit de reserva. Una referencia registrada, aunque pase todas las pruebas de almacenamiento, sigue sin acreditar una capacidad operativa.
