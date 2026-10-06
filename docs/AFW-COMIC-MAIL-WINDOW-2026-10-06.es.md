# Ventana del ensayo de correo visual

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`. Preparación local del canary de correo; no apertura ni envío remoto por este bloque.

## Comportamiento

Cuando `MAIL_BRAND_ENABLED=true`, el operador y el consumidor requieren `MAIL_BRAND_PILOT_STARTS_AT` y `MAIL_BRAND_PILOT_EXPIRES_AT` en UTC ISO canónico. La duración máxima es diez minutos. Una ventana ausente, inválida, futura o vencida devuelve 404/unavailable incluso con identidad todavía vigente.

La autorización se comprueba nuevamente después de operaciones asíncronas y antes del proveedor. Si el plazo vence después de reservar el intento, se cancela sin enviar ni repetir. La aprobación humana vence en el menor plazo entre diez minutos y el cierre del ensayo.

Esto no renueva identidades, no concede permisos y no retira correos que el proveedor ya aceptó. Conserva constancias e historial. El modo de texto anterior mantiene su contrato cuando la bandera visual está apagada: apagar esa bandera por sí sola no sustituye cerrar operador y consumidor.

## Evidencia local

Regresiones con SQLite real cubren plazo vencido con JWT vigente, cruce durante lectura del cuerpo, limitador y reserva del intento. Se comprobó RED→GREEN frente al control anterior para los casos privados.

El navegador local aprobó un borrador sintético en una ventana real de 45 segundos. Después del vencimiento, consultar devolvió 404/unavailable y deshabilitó las acciones, aunque el JWT sintético seguía vigente diez minutos. El servidor y la pestaña locales quedaron cerrados. No se utilizó proveedor ni D1 remoto.

## Continuidad

La consulta cloud actual devolvió red y readiness de ambos bindings desconocidos; no acredita custodia disponible ni un error de autenticación. La identidad anterior de correo está vencida y no debe reutilizarse. Configuración rastreada: tres banderas apagadas y ambas fechas vacías.

Próximo: integrar esta preparación, verificar publicación cerrada y luego preparar identidad específica/custodia para un único destinatario propio. Solo después realizar aprobación, envío único, recibo y cierre. La guardia permanente y el primer cliente siguen como bloques separados. El último despliegue fechado continúa documentado en `AFW-COMIC-MAIL-CLOSED-RELEASE-2026-10-05.es.md`.

Verificación final de esta preparación: npm test 921/921, lint cero errores y dos advertencias preexistentes, build exit 0 y git diff --check sin errores.
