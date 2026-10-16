# Envío preparado del evento propio

Problema: el ensayo exigía publicar una segunda configuración después del alta para conocer subscriptionId. La confirmación administrativa anterior no acreditaba esa nueva configuración. Además, el paquete usado mantenía el guardado propio deshabilitado.

Se añade una variante privada y optativa del plan ya existente:

```json
{"receipt":"original","eventId":"identificador-del-evento-previsto","dispatchAt":0,"closeAt":60000}
```

Ejemplo deliberadamente vencido, no apto para publicar. Los tiempos reales deben satisfacer los mismos límites y minuto exacto del plan previo. No se aceptan selectores mezclados. El formato anterior con subscriptionId y el formato de solo cierre siguen disponibles.

El identificador del evento propio es determinista: SHA-256 del JSON de la tupla `["afw.own-synthetic-save.v1", subject, projectId, idempotencyKey]`, según saveOwnSyntheticGoal. Prepararlo no crea el evento ni acredita un guardado. La configuración optativa AFW_DOSSIER_OWN_SAVE_KEY fija un UUIDv4 de idempotencia para este único ensayo. No es una credencial. El host verifica que el evento del schedule corresponde al mismo usuario, proyecto y clave. Una clave malformada no vuelve al modo aleatorio.

El formulario incorpora esa clave en su ticket firmado y liga su scope a ella, además del grant, identidad, fuente, contenedor y ventana existentes. Conserva cookie Secure/HttpOnly/SameSite, origen, Access y CSRF. No permite al navegador elegir otra clave. El host detecta cambios de clave o schedule durante las comprobaciones. Sin esta opción conserva el comportamiento anterior. Volver a abrir el formulario después del guardado no autoriza un segundo cambio: es un ensayo de un solo evento y puede devolver conflicto si se pretende cambiar de revisión o respuesta con la misma clave.

Al dispararse, deliverOwnSaved consulta el recibo primario original usando grant, usuario, proyecto, cliente, recurso, contenedor, programa y fuente fijados por servidor. Comprueba elegibilidad actual, preparación firmada del proceso y generación. Lee el evento desde la base original y vuelve a comprobar el recibo. La entrega conserva el presupuesto y las comprobaciones de autorización existentes. No busca el evento más reciente ni acepta callbacks o IDs de suscripción del navegador.

La nueva función se expone solo por RPC privado del Durable Object, no como herramienta MCP ni endpoint HTTP público. No crea procesos, no renueva permisos y no reintenta un envío consumido. El cierre conserva el comportamiento histórico incluso después del vencimiento.

Estado: código local, no desplegado. La prueba integrada prepara configuración inmutable antes del alta, guarda mediante GET/POST del formulario, envía mediante schedule, rechaza duplicado, retira suscripción y cierra. Usa SQLite y puente firmado locales; Access, proveedor y callback son fixtures. Falta revisión del cambio y aceptación de fuente antes de construir un paquete remoto completo con guardado habilitado. También falta resolver/observar el catálogo cloud. Pruebas locales no acreditan cron remoto, callback real, revisión ChatGPT ni PC-off.
