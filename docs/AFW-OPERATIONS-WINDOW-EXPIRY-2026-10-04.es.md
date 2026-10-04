# Ventana operativa con vencimiento por servidor

Preparación de código del 4 de octubre de 2026; no desplegada ni activada.

Receptor y manager requieren `AFW_OPERATIONS_WINDOW_EXPIRES_AT`, fecha UTC canónica `YYYY-MM-DDTHH:mm:ss.sssZ`. Cada petición consulta el reloj del Worker: fecha ausente, inválida o vencida bloquea la admisión incluso con flag habilitado. En el instante exacto del vencimiento también se bloquea. La firma, identidad de servicio, audiencia, limitador y flags existentes siguen siendo necesarios.

Este control no es un scheduler, no retira secretos/tokens y no cancela transacciones admitidas antes del vencimiento. El cierre administrativo y comprobación de bindings/Access continúan separados. No habilitar el productor periódico ni anunciar vigilancia autónoma por este cambio.

Próximo piloto: verificar código publicado cerrado conservando bindings reales, configurar la misma fecha de cierre en ambos servicios, admitir una ventana breve y comprobar bloqueo después del vencimiento desde un runner remoto. No pedir apagar el ordenador antes de acreditar ese cierre y el vínculo de la tarea con AFW Operations. No usar la configuración canónica del manager para sustituir bindings remotos de identidad preparados.

Rollback: restaurar versiones previas exclusivamente con flags deshabilitados; conservar D1/historia. Quitar este control no debe reabrir una ventana. Sin migraciones ni cambios de datos privados.
