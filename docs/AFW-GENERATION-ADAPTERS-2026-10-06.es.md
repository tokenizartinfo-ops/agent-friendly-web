# Orientación: proveedor y presupuesto preparados

## Alcance

Preparación local del próximo bloque del piloto. No activa la orientación privada, no modifica producción ni crea el expediente del cliente. Sector de Sistemas todavía necesita una entrada real y el recorrido completo comprobado antes de recibir la invitación.

## Cambios

- `lib/assistance-goal-provider.mjs`: adaptador del mismo modelo Workers AI usado por el copilot de AFW, con una instrucción específica para una pregunta y su motivo. Solo recibe tipo de sitio y códigos de objetivos declarados. No recibe identidad, expediente completo, credenciales ni permisos de operación. Valida entrada y salida, limita tokens y no reintenta.
- `lib/assistance-goal-generation-budget.mjs` y esquema operativo aditivo: reserva atómica por recibo y por run. Se anida en la revisión ya admitida, mantiene el límite compartido de tres revisiones en 24 horas y bloquea otras revisiones activas. No guarda identidad privada ni declaraciones.
- La composición HTTP entrega únicamente referencias opacas al presupuesto; comprueba otra vez el permiso después de reservar y antes de inferir.

Una cancelación descarta la respuesta; no demuestra que Workers AI haya dejado de procesar datos ya enviados. Una reserva consumida no se reinicia ni se devuelve automáticamente tras errores, expiración o resultado incierto. La autorización privada continúa dependiendo del servicio, consentimiento vigente y recibo comprobados por la composición HTTP.

## Verificación y límites

Pruebas de entrada/salida inválida, cancelación antes y durante inferencia, una reserva ante llamadas concurrentes, bloqueo por expiración/completado/revisión nueva/esquema ausente/límite diario, y composición HTTP con almacenamiento SQLite real más binding AI simulado. La recuperación devuelve la misma propuesta sin otra inferencia. Esto no demuestra una llamada remota a Workers AI ni aceptación de un cliente.

No se aplicó este esquema a D1 remoto. El Worker cerrado permanece sin proveedor, presupuesto ni ruta de propuesta activados. Pendiente: composición del runtime cerrado, prueba workerd con D1, despliegue propio acotado con custodia diferenciada y prueba real de generación, lectura y retirada. Luego actualizar la fuente cloud y comprobar el recorrido directo que se invitará a Max a usar.

Suite completa:1083 pruebas aprobadas antes de agregar una comprobación adicional del entrypoint cerrado; sus dos casos pasan por separado. Lint completo sin errores (dos advertencias anteriores) y build completo aprobados. Logs en output ignorado. La revisión pública detectó además una excepción real de portada y se restauró el rollback documentado: ver `AFW-HOME-RECOVERY-2026-10-06.es.md`. Ese incidente tiene prioridad antes de invitar al cliente.
