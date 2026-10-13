# Diagnóstico de una invocación cerrada

El ensayo previo del 13 de octubre no obtuvo un registro de cron dentro de su ventana acotada. La versión remota sí declara los handlers `fetch` y `scheduled`. Sus logs persistentes están desactivados; una consulta vacía de logs no demuestra ausencia de ejecución. El tail registró un diagnóstico HTTP de la versión correcta, y las métricas agregadas registraron dos consultas exitosas; ninguna acredita una ejecución de cron.

La instrumentación utiliza el modo de servidor existente `stable-minute`. Después de una invocación programada sin acción, comprueba que las seis capacidades estén explícitamente cerradas y que no exista política de entrega ni de consentimiento de avisos. Solo entonces emite un mensaje `afw.closed.scheduled` con revisión pública de fuente, cron fijo, fecha programada y fecha observada. Sin ese modo explícito no lee otras opciones ni emite el diagnóstico.

No selecciona Node, consulta grants, accede a almacenamiento, arranca procesos, crea consentimiento ni cambia presupuestos. No incluye identidad, respuesta del expediente, SID, callback, secretos ni argumentos recibidos de una persona. El comportamiento de entrega y cierre permanece separado y no emite este mensaje mientras tenga política.

El testigo aporta observación de una invocación cerrada; no acredita permisos, readiness firmado, recepción de un consumidor, una revisión cloud útil ni PC-off. La comprobación remota debe correlacionar Worker, versión y fuente aceptada, cron real y fechas del proveedor. Una impresión local o un mensaje sembrado no la sustituye. El tail de diagnóstico es temporal y se retira al finalizar, igual que el cron; no se habilita almacenamiento general de logs ni guardia permanente.

Pruebas: cuatro pruebas unitarias de egress, cierre y rechazo; fixture separado de Worker nativo que captura su salida real y comprueba MCP404 sin bindings privados. La primera captura mediante logger/spy de consola no capturaba stdout del runtime hijo; se corrigió el harness y se preservaron los checks. La aceptación remota sigue pendiente.
