# Renovación de lectura delegada: contrato de implementación

Estado: diseño preparado, sin refresh implementado ni servicio abierto. Antecedente: aceptación real de lectura/retirada y publicación cerrada descritas en AFW-CONNECTION-EXPIRY-2026-10-03.es.md.

## Resultado buscado

Evitar que el asistente pierda una lectura por el vencimiento de un token corto mientras el permiso original sigue vigente. Renovar un token no prolonga consentimiento, no agrega alcance y no reactiva un permiso retirado. El piloto conserva diez minutos de permiso y cinco minutos de token hasta una decisión explícita posterior sobre duración comercial.

## Contrato del servidor

1. Implementar detrás de una bandera deshabilitada por defecto. Metadata anuncia refresh_token solo cuando ese recorrido esté habilitado y comprobado; no anunciarlo en el apex antes de aceptación real.
2. En cada renovación resolver el permiso original por servidor. Comprobar identidad vinculada, cliente, recurso, proyecto permitido, propietario actual, alcance original, ausencia de retirada y vencimiento. Ante dato ausente o fallo de lectura, denegar; no usar caché de autorización como sustituto.
3. El token nuevo vence como máximo en min(ahora + cinco minutos, vencimiento original). No modificar expires_at del permiso ni conceder afw:evidence:read si no estaba autorizado.
4. Rotar la credencial de renovación en una operación atómica. Guardar identificadores y hashes, nunca credenciales en claro en D1, logs, navegador, correo o documentos. No introducir un almacén propio sin revisar primero las garantías del proveedor OAuth ya utilizado.
5. Una credencial consumida no emite otra familia. Diseñar y probar concurrencia/reintentos antes de elegir política de replay: dos solicitudes simultáneas no deben conceder dos sucesores ni convertir un reintento normal en una ampliación. Un replay confirmado retira la familia según política documentada.
6. Desconectar retira permiso y familia. Cada lectura MCP sigue comprobando el permiso vigente; un token criptográficamente válido no basta. Cambio de propietario, retirada o plazo vencido también deniegan renovación.
7. Rollback deshabilita la bandera y mantiene comprobación de grants en cada lectura. No borrar expedientes ni historial para revertir código; documentar compatibilidad de datos antes de cualquier migración.

## Acompañamiento

Con permiso vigente: renovación silenciosa dentro del alcance autorizado. Con plazo vencido: «Tu expediente sigue guardado. Podemos volver a conectar el asistente y revisar qué querés compartir». Con retirada: «Desconectaste este asistente; ya no puede consultar tu expediente». No reconectar automáticamente ni presentar un fallo de red como retirada. Mostrar nombre, alcance y fecha; pedir una acción concreta cuando sea necesaria.

## Pruebas y orden de avance

- Inspeccionar implementación/documentación primaria del proveedor y su rotación, almacenamiento y callback de refresh; registrar versión y limitaciones antes de elegir extensión.
- Pruebas locales primero: refresh válido dentro del plazo; caducidad absoluta; retirada con access token vivo; scope/client/resource/proyecto ajenos; cambio de propietario; replay; concurrencia; errores de almacenamiento; rollback.
- Verificar que summary y evidence siguen aislados, y que no hay tokens en respuestas de conexiones, URL o logs. Metadata debe corresponder al modo activo.
- Publicar inicialmente cerrado en canary separado con rollback. Abrir una ventana acotada solo para nueva aceptación del ciclo desde ChatGPT; esa aceptación sí cambia credenciales y no queda cubierta por la prueba anterior.
- Después de esa evidencia decidir duración comercial y apertura por cliente. No prometer continuidad permanente, guardia cloud ni aumento de auditoría externa a partir de esta preparación.

Cierre de este bloque: contrato y matriz preparados; implementación, pruebas de refresh y aceptación real pendientes. No requiere ahora intervención del owner.
