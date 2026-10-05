# AFW: aceptación local de reservas en workerd/D1

PR243 integrado en main78a27174966f48a06a55ef3e0f30c3403514fb8c; CI37254390218 pasó1m14s. La revisión cloud del diff no encontró bloqueos, sin ejecutar pruebas o alterar su checkout.

test/operations-notice-workerd.test.mjs compila los helpers reales con esbuild y ejecuta Miniflare/workerd con binding D1 local exclusivo. Aplica solamente watchdog-state, watchdog-inbox y notice-reservations en esa base efímera. El harness sintético existe únicamente dentro del test; no es un endpoint desplegado ni una ampliación de permisos.

Comprobado: admission1, reserva con requestId estable, reintento que conserva runId y plazo, ACK accepted repetido con recibo estable; nueva condición/revisión y segunda reserva; pausa real en D1 seguida de ACK superseded/repetido; flags cerradas impiden reserva. Lectura D1 independiente al final conserva2reservas con outcomes accepted/superseded y2constancias históricas en outbox. Dispose en finally cierra el runtime local. La prueba focalizada pasó; no cambió código de producto, recursos remotos o expedientes.

Esto complementa las pruebas SQLite del contrato. No acredita identidad autenticada, D1 remoto, entrega de avisos, llamada real de Codex cloud o vigilancia continua. El esquema de inbox/reservas sigue sin aplicar remotamente. El siguiente bloque es listado/adaptador autenticado cerrado, con consumidor fijado por servidor, revalidación al despacho y presupuesto coordinado antes de QA/cloud correlacionada. No repetir cron/PC-off ya aceptados.

Validación completa:802/802 pruebas,0fallos; lint0errores/dos warnings previos; build completo. Ningún recurso remoto fue modificado.
