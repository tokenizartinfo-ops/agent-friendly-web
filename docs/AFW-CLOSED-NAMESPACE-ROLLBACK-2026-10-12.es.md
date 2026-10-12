# Recuperación cerrada sin retirar el namespace

El ensayo remoto del 12 de octubre de 2026 comprobó que Cloudflare rechaza activar la antigua versión aa121311 porque carece del export AfwOwnEventNode ya provisionado: API100402 orphaned_provisioned_namespace. La operación falló y la versión cerrada abad4519 permaneció activa. La mera disponibilidad de una versión antigua no acreditaba recuperabilidad.

worker/mcp-own/closed-rollback.mjs conserva los exports vivos AfwOwnEventNode y AfwNodeControl. Deniega incondicionalmente HTTP y RPC, incluso ante flags habilitadas, sin consultar dependencias, datos, claves, almacenamiento o Container. No reconstruye presupuestos ni borra filas, namespace, aplicación o historia. Es una versión de emergencia compatible, no la reproducción byte a byte del Worker antiguo ni un servicio operativo.

Solo se publica con las mismas rutas/bindings y después de comprobar que no existe proceso activo. Si se admitió un proceso, retirar seguimiento, cerrar usando la fuente original y verificar la parada física antes de cambiar a esta entrada; su método close rechaza y no acredita parada. No sustituye esa comprobación. Mantener originales y cualquier actividad legítima posterior.

Verificación proporcional: ensayo nativo workerd con SQLite preexistente intacta, seis RPC privados rechazados y HTTP/control404; CI exacta. Después publicar cerrada y comprobar adopción real, recursos e instancias; volver a la versión propia cerrada aceptada sin recrear namespace. Esto no habilita OAuth, Events, consentimientos, callbacks, guardia o PC-off.
