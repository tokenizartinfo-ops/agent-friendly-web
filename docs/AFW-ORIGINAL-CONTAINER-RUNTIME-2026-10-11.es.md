# Runtime Container ligado al proceso original

Preparación posterior a PR405/main540a182. Ejecución inline autorizada. Sin publicación ni API de cuenta; no repetir el probe de viabilidad eliminado.

El resultado será un adaptador de la API `ctx.container` que solo arranca desde la custodia original. El programa y revisión se fijan por servidor, y el hash se calcula de sus bytes. El Container recibe únicamente el descriptor y capacidad de servicio por env, nunca claves por argv o logs. Se conserva imagen fija, puerto8080, Internet para HTTPS nativo y control HTTP virtual único hacia el mismo DO.

La preparación exige `container.running` real más un desafío firmado del puerto. El estado running por sí solo no demuestra que Node esté preparado. No hay reintento de start, recreación de namespace ni recuperación de presupuesto tras ACK desconocido. Una espera de preparación puede sondear el mismo proceso sin ejecutarlo otra vez y solo dentro del plazo y señal originales.

Custodia crea la capacidad de sondeo desde su cipher original cada vez que observe la preparación, incluso tras reinicio del DO. El buffer descifrado se borra después de derivar claves; el hook recibe únicamente una fábrica de desafío/verificación, no otra clave persistida. Evitar recursión con createBridge, que también verifica preparación. Mantener comprobaciones primarias antes y después del hook y todos los fences/estados existentes.

El timeout de inactividad se configura después de start y al observar un original todavía vivo tras reinicio del DO; limitado al tiempo restante. No sustituye el plazo monotónico fijo de Node, que no se renueva con tráfico. Cerrar solicita destroy del original; no se acredita stop físico solo por ACK, y la custodia sigue distinguiendo stop requested.

Control se crea desde contexto/props de servidor; ningún ID del cuerpo o encabezado selecciona DO. No interceptar HTTPS ni reemplazar CA. Las pruebas con ctx sintético y Node hijo no prueban origen de Cloudflare ni consentimiento real. Antes de hosting debe existir composición concreta con el OAuth original, SAME D1/DO, esquema propio, flags cerradas, recursos identificados, rollback y lectura remota de adopción.

Fuentes oficiales: https://developers.cloudflare.com/containers/api/durable-object-container/ ; https://developers.cloudflare.com/containers/configuration/outbound-traffic/ ; https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/ ; https://developers.cloudflare.com/containers/concepts/architecture/ . running precede preparación, intercept HTTP se puede configurar antes/después, inactivity no sobrevive reinicio y monitor pendiente puede conservar actividad.

El fallo histórico de presupuesto5s en Windows permanece explícito; comprobar coste real del instalador antes del ensayo integrado. Este bloque no activa PC-off, guardia permanente ni Max.

Pruebas preparadas: plataforma ctx sintética comprueba orden start/timeout, env/argv, preparación manipulada, caída, expiry, ACKstart perdido y cancelación de puerto colgado sin otro launch. Un proceso hijo ejecuta el Node de producto y su preparación firmada; al reconstruir el adaptador verifica el mismo proceso y luego SIGTERM/cierre. La APIctx sigue simulada: no atribuir la verificación criptográfica local a procedencia Cloudflare. Las pruebas de puerto8080 comparten un solo archivo/proceso de Node para no competir con otra fixture; no cambia el puerto de producto. Custodia rechaza reutilizar la fábrica de sondeo al terminar la invocación original.
