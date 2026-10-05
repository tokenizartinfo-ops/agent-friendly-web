# AFW: publicación cerrada del watchdog independiente

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated operations; ORIGIN Worker sin ruta pública; RESOURCE_TYPE Worker/operations D1; RESOURCE_ID agent-friendly-web-operations-watchdog, D1 603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION crear Worker cerrado y aplicar solo esquema watchdog aditivo. ROLLBACK flagfalse, deadline ausente, schedules[], sin rutas/secretos; conservar tablas/historial, nunca DROP. No manager/token, expedientes, Tokenizart o correo modificados.

## Fuente y comprobaciones

PR238 integrado, main `d5bdceeebb06a1ffd5860e6f20ff66af7ecc468c`; código desplegado de rama `763116e`, equivalente a main en runtime, configuración y ambos helpers (diff vacío comprobado). CI37249165899 pasó. Suite786/786, lint sin errores/dos warnings previos, build y dry-run Worker completos. Wrangler autenticado en cuenta85d0d5dadac3341a564f22ce885e9eec; API conector usado para lecturas acotadas. No secretos creados o leídos.

Preflight confirmó Worker ausente y ninguna tabla operations_watchdog previa. Base operacional tenía16eventos/2incidencias/2investigaciones/2checkpoints. Se aplicaron únicamente las dos CREATE TABLE IF NOT EXISTS de worker/operations/watchdog-state.sql mediante Wrangler --remote y config watchdog con DB/ cuenta explícitas. No cadena de migraciones de expedientes ni fixtures sobre checkpoints históricos.

## Estado remoto verificado

- Worker `agent-friendly-web-operations-watchdog`, versión `fdd0b7f7-e9ea-4fe2-9b93-ac9469716404`,100%.
- AFW_OPERATIONS_WATCHDOG_ENABLED=false y AFW_OPERATIONS_PRODUCER_ENABLED=false; sin deadline o secretos.
- Binding exclusivo OPERATIONS_STATE_DB a D1 operacional603c471d; solo variables de configuración fija para los dos recursos delegados.
- schedules[], workers.dev=false, previews_enabled=false. Deploy reportó No targets; no ruta pública configurada. Fetch del código siempre404, no endpoint de ejecución.
- D1 posterior conserva16eventos/2incidencias/2investigaciones/2checkpoints. Nuevas tablas operations_watchdog_state y operations_watchdog_outbox existen, ambas0filas. Lecturas de verificación sin escrituras.

Esto acredita publicación cerrada y esquema aditivo remoto, **no ejecución remota del watchdog ni aviso entregado**. Se mantiene separado de la aceptación del consumidor cloud por horario. Un productor cerrado no debe generar alarmas de silencio por una activación inadvertida; la configuración se verifica antes de abrir una ventana. La configuración canónica no sincroniza automáticamente cambios de intención del productor.

## Próximo ensayo

Usar D1 de QA dedicada para fixtures sintéticos, con los mismos esquemas y Worker/config de ensayo acotados, sin editar operaciones_probe_state histórico. No agregar un endpoint público para dispararlo. Cron remoto con margen de propagación y deadline servidor; probar falta de checkpoint/entrega pendiente, reiteración sin duplicados, recuperación observada y pausa silenciosa. Leer los recibos por una vía independiente y cerrar schedule/flag/deadline/bindings de prueba preservando historial.

Solo después conectar consumidor de avisos con fence de revisión/pausa actual, acuse/idempotencia y entrega comprobada. Aviso pendiente no es enviado; no anunciar vigilancia continua. No repetir PC-off, list/claim/finish aceptados, login o custodia del manager para esta prueba. El historial de preparación local conserva su fecha; este recibo sustituye exclusivamente los pendientes de publicación y esquema remoto.
