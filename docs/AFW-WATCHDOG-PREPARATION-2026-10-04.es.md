# AFW: lectura independiente de vigencia operacional

Bloque acotado autorizado dentro de la operación AFW. `lib/operations-watchdog.mjs` prepara una lectura para un futuro consumidor/watchdog, no un runtime ni alertas activos. Solo D1 operaciones y dos recursos delegados fijos; no expedientes, correo, tokens de lease ni payloads de eventos. No migración ni cambio remoto.

El consumidor debe aportar configuración resuelta por servidor y versión comprobada en control plane. El helper no acredita por sí solo esa comprobación: ninguna ruta HTTP recibe configuración del cliente. Pausa deliberada devuelve paused sin leer D1; no avisar silencio al cerrar una prueba. Estado enabled exige configuración válida antes de IO.

Lee únicamente columnas explícitas de constancias. Devuelve nombres cerrados de condiciones: checkpoint_missing/invalid, clock_invalid, configuration_changed, observation_stale, delivery_pending/stale, service_failed. Conserva la diferencia entre falta de observación y falta de recibo; no usa la fecha de un deploy como pulso. Ventana15min compartida con producerFreshness. Errores de storage se sustituyen por error fijo, sin detalles del proveedor.

La salida es un diagnóstico puntual; no reserva incidentes, no actualiza last_result, no envía correo ni cierra fallas. Seis pruebas cubren pausa, saneamiento, edades, cambio de configuración, storage y lectura del schema SQLite real sin mutaciones. Suite755/755, lint sin errores (warning histórico img), build correcto. Aceptación remota y schedule independiente pendientes.

## Siguiente implementación operacional

1. Definir identidad del consumidor y transporte realmente disponible en la cuenta cloud. Aceptar lectura/reserva propia con presupuesto global, pausa y trazabilidad; no dar acceso genérico Cloudflare al sandbox.
2. Correlacionar señal persistida con ejecución cloud y resultado. El ACK del receptor no es un recibo del gerente. Lectura puntual de correo, envío propio y código cloud conservan sus recibos separados.
3. Ejecutar watchdog fuera del proceso que vigila. Persistir transiciones y deduplicar avisos; una lectura fallida es problema del watchdog, no estado sano. No generar un incidente nuevo por cada consulta repetida.
4. Probar ausencia del productor y entrega interrumpida con datos sintéticos, comprobar aviso/recuperación y cierre sin repetir efectos. Mantener límite de intentos y rollback que preserve D1.
5. Solo entonces habilitar cadencia permanente. No presentar una tarea desktop como ejecución cloud con PC apagado.
