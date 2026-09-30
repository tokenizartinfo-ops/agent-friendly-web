# Relato recuperable del copilot — bloque de implementación

El texto que la persona escribe en el copilot del piloto se conserva por separado como **relato privado de trabajo** en D1. Al volver al mismo expediente, la interfaz lo recupera. La persona puede borrarlo. Ninguna frase de esa bandeja pasa a ser dato del expediente hasta revisar y aplicar la propuesta correspondiente; la publicación sigue fuera de alcance.

La ruta `GET/PUT /api/projects/:projectId/copilot/working-draft` exige identidad Cloudflare Access, propiedad del proyecto y la misma bandera del piloto exacto. La escritura exige mismo origen, JSON acotado, máximo 5000 caracteres, filtro de credenciales, revisión optimista y clave de reintento. Un conflicto entre pestañas se muestra sin sobrescribir: se puede recuperar la versión del servidor o elegir conservar la local. La migración `0008_happy_klaw.sql` agrega una tabla aislada y vacía; no modifica filas históricas ni cambia la revisión del expediente.

No se usa Durable Objects porque todavía no existe edición simultánea en tiempo real ni coordinación de conexiones persistentes. La revisión optimista de D1 evita sobrescrituras silenciosas en este flujo. Un cierre abrupto antes del primer guardado confirmado, una conexión sin respuesta y el audio aún sin transcribir pueden perder el último material; la interfaz avisa cuando hay cambios pendientes. No se promete guardado garantizado en `beforeunload`.

## Puesta en marcha

Aplicar la migración 0008 a la D1 de AFW antes de servir el código nuevo. Mantener el piloto restringido al proyecto sintético bajo Access. Verificar con sesión privada: escribir un relato ficticio, esperar la confirmación, recargar, resolver un conflicto entre dos pestañas, borrar y recuperar el estado vacío. El smoke anónimo no prueba ese recorrido. Si falla el código, volver a la versión Worker anterior; conservar la tabla aditiva para no perder datos escritos. No ejecutar `DROP` como rollback.
