# AFW: presupuesto único del gerente, preparación local

Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web. Sin deploy, migración remota, credencial, flag o cron modificado. PR245 quedó integrada en main fb81f1a después de revisión cloud y CI37312103815 aceptada.

Cuando el servidor habilita el canal de avisos, las reservas de investigaciones y avisos comparten el máximo de tres reservas durante las últimas24 horas y una tarea activa. Cada INSERT/UPDATE consulta ambos registros dentro de la transacción D1; no hay comprobación previa separada que permita carreras. Reservas expiradas consumen presupuesto hasta salir de la ventana; ACK o finish liberan la tarea activa, sin devolver presupuesto. Reintentos con requestId previo recuperan la misma reserva y no consumen otra.

El adaptador fija sharedNoticeBudget desde AFW_OPERATIONS_NOTICES_ENABLED o AFW_OPERATIONS_SHARED_BUDGET_ENABLED del servidor; ningún cuerpo HTTP puede elegirlo. Con ambos controles deshabilitados, investigaciones conservan compatibilidad con el esquema anterior sin tabla de avisos. Avisos requieren consumer-state además de sus tablas; si falta almacenamiento compartido, la operación falla cerrada y no incrementa attempts. No desplegar sobre un esquema incompleto ni confundir el límite de reservas con gasto efectivo de tokens.

Transición de cierre: habilitar AFW_OPERATIONS_SHARED_BUDGET_ENABLED al instalar el esquema compartido, antes de abrir avisos. Conservarlo true al apagar notices/watchdog/producer, al menos24 horas desde la última reserva de avisos, o permanentemente mientras exista ese esquema. Así las investigaciones siguen contando historial y leases de avisos aunque /notices devuelva404. Cierre completo del consumer/deadline continúa bloqueando todas las rutas. No apagar ambos controles mientras consumer siga activo y existan reservas recientes; esa combinación conserva exclusivamente compatibilidad legacy y no acredita presupuesto global. Regresión HTTP RED200 frente al409 esperado al cerrar notices; corregida para conservar409 mediante el control independiente.

RED: las pruebas permitían simultáneamente un aviso y una investigación; dos reservas expiradas de avisos y una investigación tampoco agotaban el presupuesto del otro canal. GREEN cubre ambos órdenes, reintentos, liberación por recibo, presupuesto mixto, concurrencia y ausencia de tabla con cero intentos. Fixtures autenticadas y workerd usan ahora ambos esquemas.

Rollback de código: main fb81f1a conserva el contrato anterior; no borrar tablas ni historial. Antes de un piloto remoto, verificar identidad/bindings/deadline y aplicar esquemas únicamente al recurso QA identificado. Cierre remoto debe conservar flags false/sin deadline/sin cron.

Siguiente bloque: cliente cloud durable para listado/claim/ACK, requestId persistido y reconciliación de respuesta perdida. El presupuesto no prueba despacho, recepción cloud, reparación automática ni guardia continua.

Validación local:812/812 pruebas, cero fallos; lint cero errores/dos warnings previos; build completo. Una fixture workerd antigua carecía de consumer-state y devolvió500; se completó el esquema local y la suite íntegra pasó. Sin cambios remotos.
