# Lector privado del estado de la instancia original

2026-10-14. Código preparado, sin montaje ni credencial nueva.

`createRetirementProviderReader` fija en construcción la cuenta Cloudflare, aplicación y actor originales. Solo ejecuta GET al endpoint oficial `/accounts/{account_id}/containers/applications/{application_id}/instances/{instance_id}`; contrato comprobado contra OpenAPI de Cloudflare en esta fecha. El invocador debe coincidir con esos identificadores y aportar AbortSignal. La identidad del proveedor procede de custodia del servidor.

Cada invocación solicita una respuesta nueva sin caché; rechaza respuestas marcadas HIT/STALE u otro estado no permitido, Age mayor de cero, redirecciones, errores del proveedor, cuerpos mayores de 64 KiB e identidades ajenas. El plazo máximo es cinco segundos, con cancelación y comprobación monotónica tras cada espera. No reintenta. Solo devuelve campos necesarios para el verificador de retiro; no propaga cuerpos de error, credenciales, configuración ni variables del proceso.

## Alcance de la prueba

Las pruebas ejercitan HTTP simulado con Response/ReadableStream nativos, incluyendo bloqueo de red/cuerpo, aborto, límites, identidad y composición con `createRetirementEvidenceReader`. La composición efectúa dos peticiones y conserva `mayStartSuccessor:false`.

Esto garantiza el comportamiento del transporte bajo su dependencia fetch de confianza. No convierte el estado del proveedor en una garantía absoluta: la API devuelve el último estado conocido de la instancia; `status.updated_at` sigue siendo fecha de transición. Las pruebas no acreditan credenciales reales, despliegue, lectura de custodia original remota, recepción del consumidor cloud o PC-off.

Siguiente montaje: autoridad privada con manifiesto y clave originales, validación del recurso y sin método de ejecución. Mantener cerrado el runtime y preservar la historia original. Solo después podrá evaluarse la admisión serial de otro ensayo propio; el lector no la autoriza.

## Custodia original sin host de ejecución

`createRetiredCustodyReader` recibe únicamente contexto, manifiesto, ventana y clave originales desde el servidor. Expone solo `observeRetired`; no acepta un runtime. La transacción de almacenamiento solo entrega `get`, y las tres operaciones del runtime interno siempre fallan. No construye el programa actual ni requiere permiso vivo para observar un cierre pasado. No demuestra por sí sola procedencia de entradas: el montaje privado debe fijarlas y conservar la clave original.

Una prueba SQLite comprueba igualdad de registros y una sola ejecución histórica; los dos escenarios D1/DO nativos ahora leen retiro mediante esta fachada, incluidos reinicio y pérdida de custodia. Todo sigue local y sin métodos públicos nuevos.
