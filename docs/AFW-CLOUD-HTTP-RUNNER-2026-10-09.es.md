# Ejecutor cloud de una ocurrencia HTTP propia

`scripts/afw-run-http-occurrence.mjs` ejecuta el wrapper existente. El script anterior `afw-occurrence-host-bridge.mjs` conserva su contrato de comprobación de metadatos: no ejecuta el recorrido.

## Uso por el host confiable

1. Adoptar realmente una publicación que contenga este ejecutable. Comprobar HEAD y origen, sin checkout/reset para simular adopción. Registrar por separado fuente del cliente y artefacto servidor.
2. Preparar fuera del checkout un archivo de metadatos con únicamente `manifest` y `planDigest`, máximo8192 bytes/UTF-8. No incluir credenciales ni texto del cliente. La aprobación primaria del servidor debe coincidir con ese plan; el archivo no concede permiso. Mantener limpio el checkout.
3. Iniciar `node scripts/afw-run-http-occurrence.mjs <ruta-metadata>` en un proceso interactivo mediante la herramienta cloud soportada. Credenciales exclusivamente en las dos variables administradas existentes, con identidad propia y vigencia comprobadas aparte de su estado ready.
4. Ante cada trama `observe`, hacer una consulta nueva a `environment_status` soportada en esa misma tarea. Proyectar su structuredContent mediante `projectEnvironmentStatus`; responder por stdin con version/type=observation/id/nonce/cloud correlacionados. No anticipar seis respuestas ni reutilizar una consulta. Cada intercambio tiene presupuesto de10segundos.
5. Consumir un único `occurrenceResult`. Exit0 solamente indica recorrido completed; el resultado `intervention_required` no significa problema reparado. Exit1 indica stopped/unavailable. Verificar luego la evidencia primaria y cierre independiente; no reiniciar ante una respuesta perdida.

Los seis POST tienen origen fijo y presupuesto existente: create/list/admit-claim/claim/admit-finish/finish. Máximo un stop adicional, sin retry ni redirección. No hay scheduler, renovación, guardia permanente, aprobación desde el navegador ni herramientas de publicación.

## Evidencia local

Prueba de proceso con checkout Git real y HTTP sintético: seis observaciones y seis operaciones, rechazo antes de HTTP por observación incongruente, archivos inválidos/extra secreto/missing/oversized con salida saneada. Revisión independiente:3pass más8casos adversariales (vacío/UTF-8/null/array/campo ausente/argv ausente/directorio/argv extra), sinP1/P2. La limpieza de pruebas Git añade reintentos acotados por EBUSY de Windows, sin alterar permisos o presupuestos.

Esto no acredita custodia nueva, montaje remoto de aprobación/catálogo, ejecución cloud, programación ni PC apagado. Esos gates se aceptan por separado con evidencia fechada. Max no recibe mensajes por este bloque.

Verificación final local:1320 casos,1318pass/0fail/2skip; lint0errors/2warnings preexistentes y build aceptado. Enfocadas29pass/0fail/1skip. Logs en output/afw-http-entrypoint-{full-test-final,focused,lint,build}-20261009.log. El fallo EBUSY de la ejecución anterior queda como evidencia histórica y fue resuelto con cleanup acotado, no con exclusión de pruebas.
