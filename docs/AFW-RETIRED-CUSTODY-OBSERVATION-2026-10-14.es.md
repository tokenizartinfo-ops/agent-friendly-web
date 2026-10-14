# Observación administrativa de custodia retirada

Fecha:2026-10-14. Proyecto AFW. Preparación interna, no montada en HTTP, RPC ni MCP.

`createNodeProcessCustody(...).observeRetired()` comprueba historia original sin requerir permiso vivo ni descifrar la capacidad del proceso. Debe construirse con el mismo contexto, fuente, programa, ventana y clave original; una versión nueva no puede fingir esa procedencia cambiando valores arbitrariamente. El adaptador administrativo confiable que proveerá esos valores aún está pendiente.

La lectura exige: estado DO firmado `withdrawn`; admisión y cierre primarios del mismo proceso/actor/programa/fuente/imagen; propietario, cliente, proyecto y recurso coincidentes; permiso OAuth retirado y evento de retirada de avisos del mismo contexto; fechas válidas; consentimiento original coincidente con la referencia firmada. Relee custodia y primaria para detectar cambios durante el recorrido. Un registro ausente, alterado, de otra fuente o con permisos vivos falla cerrado.

No escribe, no obtiene claves descifradas, no llama launch/observe/close del runtime y no recupera presupuestos. El resultado devuelve únicamente manifiesto original, fechas y propósito administrativo, con `physicalStopVerified:false` y `mayStartSuccessor:false` constantes. No publicar este objeto al cliente; contiene referencias operativas privadas. Un consumidor no debe tratarlo como autorización.

El cierre lógico no prueba parada física. El siguiente bloque debe combinar lectura administrativa de procedencia comprobada con estado real de Cloudflare, frescura y registro serializado de un nuevo ensayo. La observación histórica por sí sola no permite cambiar el nombre del actor, borrar historia ni ejecutar otro intento.

Pruebas: SQLite local con historia firmada real creada por la custodia; lectura tras vencimiento sin escrituras/runtime; rechazo de estados vivos, historia ausente y fuente ajena; rechazo de reactivación del grant entre lecturas. Las regresiones del módulo, host y D1 nativa se ejecutan por separado. Nada acredita todavía esta lectura en un despliegue remoto, una suscripción cloud aceptada o PC-off.
