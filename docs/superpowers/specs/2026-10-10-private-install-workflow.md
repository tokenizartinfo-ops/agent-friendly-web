# Instalación administrativa propia

Base: 18df3fdf15b6297f4aceb74ae8a1489679467db5. Parte acotada del brief de despacho/cierre.

Extender el Workflow existente con `{operation:'install',recordRef}` exacto. Usa el mismo control vivo, preregistro y `installOwn()` sin selectores, credenciales ni permisos del caller. Un paso sin reintentos invoca el instalador ya protegido por presupuestos persistidos. Solo persiste `installation_pending` para pending/dispatch_attempted; no devuelve locators, permisos ni éxito de ejecución. Resultado desconocido unavailable, nunca reintento automático. Control se verifica antes/después del paso y RPC. Reinicio/caché no acredita nueva llamada ni éxito cloud; readback queda separado.

Tareas: tests RED; implementación de composición y mount privado en Workflow; unit/native GREEN; una revisión de rama; suite/lint/build/dry-run; evidencia. No despliegue remoto ni apertura de flags. Dispatcher real y servidor HTTP permanecen pendientes.

Ruling: dividir el brief en esta entrada administrativa ejecutable — reduce el alcance de revisión sin inventar un dispatcher o scheduler. No afirmar el cierre integral hasta completar las dependencias.
