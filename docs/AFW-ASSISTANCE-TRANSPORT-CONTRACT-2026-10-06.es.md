# AFW: señal operacional de ayuda

Implementación local de proyección y validación; no transporte, endpoint, migración o activación remota por este bloque.

`lib/assistance-supervision-contract.mjs` define `afw-assistance-event-v1`: eventId opaco, projectRef opaca, revisión del pedido, kind assistance_requested, categoría enumerada y fecha canónica. HMAC separa el propósito de las señales de guardado existentes. No incluye UUID del intento, ID privado del expediente, correo, dominio, respuestas, transcripción ni notas. Rechaza campos privados o estados de resolución añadidos.

El productor futuro debe seleccionar filas comprometidas mediante propietario vigente, inscripción y fecha de inicio comprobados por servidor. La proyección pura no acredita esa selección. No se debe exponer como endpoint para recibir filas arbitrarias del navegador.

Dos solicitudes distintas pueden pertenecer a la misma revisión: se deduplican por identidad del evento, nunca únicamente por número de revisión. El cursor actual de guardados no sirve para consumirlas. Diseñar entrega por evento con recibo persistido, reintento del mismo ID tras respuesta perdida y lote acotado. No avanzar entrega sin comprobar el recibo exacto firmado/correlacionado. El journal privado ya hace atómica la recepción del pedido; no añadir una llamada remota al camino UI.

Siguientes bloques: ledger y estado de entrega separados; firma y ruta de servicio propia; ventana finita y presupuesto compartido con otras investigaciones; aceptación local D1 de respuesta perdida, dos pedidos en una revisión, cierre durante awaits y exclusión de otra identidad; despliegue cerrado; ensayo propio autenticado. No ampliar silenciosamente `afw-dossier-event-v1` ni reutilizar referencias de su inscripción para este propósito.

La revisión operacional de categoría y fecha no es una respuesta sobre el contenido del expediente. Para repreguntar con datos privados hace falta un servicio consentido distinto. La aplicación solo mostrará revisión o respuesta cuando tenga recibo real y correlacionado; una revisión vieja requiere reevaluación tras edición.

Verificación local: primero tres regresiones fallaron por módulo ausente; después pasaron junto con ocho pruebas existentes de supervisión. Lint acotado y CI integral son comprobaciones separadas. Este contrato no acredita guardia permanente ni disponibilidad para clientes.
