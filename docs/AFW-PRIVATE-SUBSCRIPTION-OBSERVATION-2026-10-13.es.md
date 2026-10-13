# Observación privada de la suscripción original

Este bloque prepara una lectura interna de custodia para el único ensayo AFW. No registra herramientas MCP, métodos RPC, rutas HTTP ni permisos nuevos. No inicia Node, envía callbacks, renueva plazos o recupera un ACK perdido. No se monta remotamente mediante este documento.

## Qué se comprueba

El controlador observe(id) valida el registro autenticado, presupuesto original y cifrado usando la misma clave de custodia. Comprueba los cuatro pins de autorización y su vigencia antes, durante y después del ACK de lectura. Devuelve solo estado pendiente/activo/retirado, vencimiento separado, fechas de verificación/observación, hostname del callback y recibo HTTP saneado. Un recibo HTTP mantiene cloudReviewConfirmed=false. Nunca devuelve SID, ruta/query de callback, secreto, cifrado o referencias de identidad/permiso.

El host observeSubscription() no recibe SID del caller: lee la constancia primaria ligada a los ocho pins originales y a la imagen/programa/fuente, usa su generación y vuelve a comparar la constancia tras la lectura. El permiso de lectura y la ventana original deben seguir vigentes. No necesita readiness de monitorización para observar un registro retirado, pero un grant revocado o una identidad/fuente distinta no permite leerlo. Una constancia ausente retorna null y no acredita retirada.

## Diferencias que no deben confundirse

La expiración puede coexistir con state=active; no se convierte artificialmente en state=withdrawn. El cierre de custodia puede detener el proceso conservando la suscripción activa en su registro. Solo observar el estado terminal del controlador demuestra que ese registro pasó por retirada. Esto no demuestra por sí mismo que el consumidor ChatGPT se eliminó, quién inició la retirada ni que se completó una revisión cloud.

Para aceptar la retirada nativa hay que correlacionar la UI/acción real y su respuesta con observaciones anteriores/posteriores de este mismo registro, bajo el mismo permiso vigente, y sin ejecutar manualmente unsubscribe para fabricar el resultado. El broker externo sigue requiriendo la ventana viva: preparar la retirada ANTES de su vencimiento. Proceso físico detenido y consumidor nativo retirado son pruebas separadas.

## Verificación

Las pruebas usan SQLite y el host firmado sintético existentes: sin registro no hay boot; cierre de custodia no se presenta como unsubscribe; el unsubscribe original sí devuelve estado retirado; una lectura no cambia historia ni envía; falla ante clave/registro/autoridad alterados, permiso vencido, ACK perdido o cambio de autorización durante el ACK. El bucle de callback/plataforma es sintético, no acredita recepción cloud real o PC-off.

La observación queda INTERNAL y sin montaje. Su publicación/uso remoto necesita un canal privado identificado y acotado, con autorización y preservación verificadas; no exponerla añadiendo una herramienta de expediente al catálogo público.
