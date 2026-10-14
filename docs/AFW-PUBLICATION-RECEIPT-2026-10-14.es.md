# Recibo privado de publicación

## Resultado y alcance

El diario `mcp-publication-journal.mjs` conserva un intento inmutable por cuenta, Worker y SHA-256 de los bytes del Worker. Solo después de confirmar la escritura primaria llama al adaptador interno de subida. Exige un identificador de versión y una lectura concordante antes de guardar el recibo. La operación completa tiene plazo y cancelación; un resultado desconocido consume el intento y requiere conciliación, nunca reenvío automático.

`mcp-publication-deployment-reader.mjs` obtiene ese recibo desde la base primaria y lo coteja con la fuente y los hashes esperados por el operador. Compone el lector existente, que vuelve a consultar despliegue, versión, binding y aplicación, y repite la lectura del despliegue. El recibo por sí solo no acredita tráfico activo, retiro del proceso anterior, permiso de usuario ni ejecución cloud.

## Límite de confianza

Es composición privada, sin ruta pública. El constructor comprueba que los bytes corresponden a `workerHash`; la asociación con `programHash`, revisión y árbol depende del constructor de release verificado y de su custodia. No acepta esos metadatos como una prueba independiente. Los adaptadores de publicación y consulta son servicios internos de confianza; las pruebas usan sustitutos explícitos. El transporte multipart real aún debe implementarse y verificarse antes de utilizar esta composición remotamente.

La tabla de recibos es histórica. Una escritura aplicada cuyo ACK se pierde puede aparecer después en conciliación, pero no devuelve éxito al llamante original ni autoriza repetir la publicación. La composición de lectura solo utiliza esa historia para una consulta nueva, nunca para reconstruir un permiso de ejecución.

## Verificación

Pruebas SQLite: duplicados concurrentes, bytes alterados, respuesta de versión ajena, pérdida de ACK antes/después de subida, plazo, cancelación y lectura del recibo contra cuatro consultas simuladas al proveedor. Se complementan con las pruebas del lector de despliegue sobre cambios de tráfico, caché y namespace. No son prueba de subida real ni de PC apagado.

## Próximo límite operativo

Antes de un ensayo remoto: resolver el gate del proveedor, implementar/cotejar transporte real y metadatos explícitos, preservar el despliegue cerrado y reversión compatible, aplicar el esquema solamente en su recurso privado aprobado y verificar adopción de la fuente. Después aún faltan consentimiento vigente, alta/baja nativa, evento útil y cierre independiente. Max y la prueba con PC apagado permanecen pendientes.
