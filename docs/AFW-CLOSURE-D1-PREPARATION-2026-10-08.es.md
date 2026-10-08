# Cierre del ensayo mediante estado primario D1

Adaptador interno `createClosureD1Actions`: callbacks de revocación de plan, cierre del journal y lectura del paso emitido. La configuración es exclusiva del servidor, ligada a la aprobación completa, identidad, manifest digest, occurrence y referencia de baseline. No acepta configuración del consumidor ni habilita rutas, bases, credenciales o alarmas remotas.

La revocación se registra en la tabla primaria append-only. El cierre requiere que la aprobación exacta esté revocada y conserva `completed` o `stopped`; para trabajo activo utiliza la transición atómica existente. Un ledger ausente queda desconocido, no se inventa una ejecución parada. La lectura posterior comprueba el mismo plan e identidad. Una respuesta perdida después del commit admite recuperación por lectura, sin otra escritura.

Revisión independiente: P2 por validación de reloj/input solamente antes del await de catálogo. Regresión nativa reprodujo `verified:true/revoked` frente a `unknown` al retroceder el reloj durante esa lectura. Se corrigió con guard sincrónico inmediatamente antes del INSERT real, sin el await intermedio de schema del helper genérico. La misma regresión incluye edición del input durante el lookup. Prueba nativa final de ese bloque pasó; lint específico exit0.

Las pruebas usan SQLite D1 de workerd con triggers reales y dos clientes sobre la misma base sintética. El reloj del cierre está inyectado a la fecha límite; eso no prueba que transcurrió una ventana remota o de PC apagado. Cubren revocación única, rechazo previo al plazo, plan/identidad incorrectos, preservación de todas las filas completadas, ledger no iniciado, concurrencia, y pérdida de acknowledgment seguida de lectura verificada.

La suite general local, lint general y build se interrumpieron antes de registrar resumen/exit: evidencia parcial conservada, ninguna aprobación global inferida. La verificación focal y CI del commit exacto se registran en continuidad al concluir. No modificar skips, fixtures o aislamiento para ocultar fallos.

Este adaptador no devuelve `restored` administrativo. Ese paso requiere un actor alojado independiente, custodia fuera del runner y lectura real del estado Cloudflare. Inventario de Workers del 8oct17:51:19UTC: no existe `agent-friendly-web-independent-closure`. La tarea ordinaria cloud ya adoptó la publicación `cecfgver_6ac7d4f7f02081a3b71aa624ba0d001a` con fuente `c6b4f592…`, red restringida/enforced, 10 custodias listas y un intercambio metadata-only aceptado; ese recibo no certifica HTTP operativo ni este nuevo adaptador.

Pendientes: actor/administración real, QA propia integrada con recepción y devolución visible, aceptación con PC apagado, preview/aprobación de la invitación a Max y su consentimiento. Sin invitación, guardia permanente, migración remota ni cambios de cliente en este bloque.
