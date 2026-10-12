# Montaje privado del DO de eventos

Fuente preparada para un Worker OAuth propio con DO SQLite y proceso Node originales. Flags cerradas por defecto, sin cron, alarmas, proxy público ni guardia permanente. El montaje no acredita despliegue ni adopción de la cuenta.

Un broker interno obtiene contexto OAuth ya validado, comprueba la política fija del servidor y el permiso actual en el mismo D1, y llama únicamente al DO configurado. No elige namespace, owner o proyecto a partir del selector del cliente. El DO vuelve a resolver la misma autorización y usa su ctx original; su fetch público siempre deniega. El control HTTP virtual procede de un WorkerEntrypoint privado con props del arranque original, no del cuerpo o encabezados del cliente.

El cierre privado del operador conserva las referencias originales de servidor/DO/configuración pero puede ejecutarse cuando la ventana venció o Events se deshabilitó. Solo solicita cierre y persistencia terminal; no arranca Node ni entrega información. Listar, suscribir, consumir y entregar mantienen sus guardas activas; el modo histórico no se registra en MCP ni se toma de una solicitud.

El programa Node se incorpora desde el bundle de producto, con revisión de fuente explícita y hash de bytes calculado, a una compilación independiente del Worker. No incluye claves ni valores privados. La configuración de ejemplo es local, sin rutas ni recursos reales, y mantiene las funciones deshabilitadas. El productor interno invoca únicamente deliverSaved contra eventos originales.

La activación en canary exige preservar antes configuración activa, bindings, esquemas y rollback. Readback12oct: canary real mantiene OAuth true y solo tablas originales; faltan las tablas de monitoring/custodia y el binding DO. No aplicar el ejemplo directamente ni migrar el D1 de producción del otro piloto.

Wrangler4.128 rechaza todavía la policy actual `durable_object` de Containers. El ejemplo solo verifica la compilación cerrada del Worker/DO, sin app Container. El proveedor sí documenta esa policy y la imagen gestionada: su app deberá configurarse mediante la API acotada con namespace original y rollback; no reemplazarla por una imagen Docker ni atribuir ese recurso al dry-run.

La verificación de cuenta debe seguir el [circuito oficial MCP Events](https://developers.openai.com/plugins/build/mcp-events): rescan del plugin, suscripción explícita desde Work cloud, callback real verificado, evento guardado, respuesta útil y retiro. El ACK HTTP no prueba revisión terminada. Solo tras esa comprobación propia y el cierre observado se acordará PC-off; Max requiere preview aprobado y consentimiento propio.
