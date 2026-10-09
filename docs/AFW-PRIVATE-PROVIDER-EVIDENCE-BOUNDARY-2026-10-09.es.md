# Límites de las fuentes administrativas reales

Preparación de Task2 del plan privado de provisioning, 9 octubre 2026. Consulta del esquema del conector Cloudflare, sin llamadas a recursos ni modificaciones remotas. Este documento fija el límite del lector siguiente; no certifica un inventario real.

| Fuente | Campos disponibles en el esquema consultado | Qué debe comprobar el lector |
| --- | --- | --- |
| GET de service token y listado paginado | id, created_at, updated_at, expires_at, enabled, duration; el client_id se conserva únicamente en la custodia privada | Recurso exacto, vigencia, estado y continuidad de creación. El listado debe estar completo, con páginas y fecha; un listado parcial no demuestra ausencia de conflictos. |
| GET de aplicación Access y sus políticas paginadas | Aplicación efectiva y reglas include/exclude/require de cada política | Host/ruta/audience exactos, selector de servicio y ausencia de una regla adicional que amplíe el acceso. No reutilizar la aplicación compartida del gerente. |
| GET de settings y deployments del Worker propio | Bindings efectivos; despliegues con id, created_on, versiones y porcentaje | Worker, namespaces, base y Workflow esperados, cierres y versión servida. No declarar una versión instalada porque solo exista en una lista. |
| GET de schedules del Worker propio | schedules con cron y fechas | Configuración real del disparador. Una programación no prueba que haya ejecutado ni su resultado. |

El esquema del GET de service token **no aporta una versión del secreto**. `updated_at`, ID, nombre y `client_id` no se convierten en `keyVersion` ni `vaultRef`. Si el contrato de custodia exige esa versión, se necesita su constancia privada de creación/rotación y su procedencia verificada, o el gate permanece pendiente. Nunca imprimir ni guardar valores de secretos en el journal.

La correlación cloud se obtiene de la tarea, turno y comando originales, junto con HEAD/config/publicación constatados oficialmente. La salida de un comando puede identificar un recibo; no autentica por sí sola la publicación ni el entorno. La recepción se resuelve desde el diario primario de preregistro y debe corresponder al mismo recordRef, receiptRef y ventana. No rellenar datos ausentes con constantes sintéticas, referencias elegidas por el consumidor o resultados de readiness.

El journal conserva únicamente referencias opacas de estas fuentes y sus digests. El lector futuro debe resolver sus originales, comprobar procedencia, consistencia y vigencia, y repetir las lecturas necesarias antes del commit de reserva. Una referencia registrada, aunque pase todas las pruebas de almacenamiento, sigue sin acreditar una capacidad operativa.
