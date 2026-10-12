# Formularios nativos de avisos y comprobación de origen

## Problema y corrección

El12/10/2026 el owner pudo abrir el formulario real del ensayo y enviar «Permitir avisos temporales», pero AFW respondió que no podía confirmar el permiso. La primaria confirmó cero decisiones de avisos, cero procesos admitidos y cero eventos guardados. El canary quedó cerrado antes de investigar.

La página enviaba `Referrer-Policy: no-referrer`, mientras su guardia CSRF exige que el `Origin` del POST coincida exactamente con el issuer. Según la documentación normativa de comportamiento de navegadores, `no-referrer` convierte en `null` el Origin de un envío HTML en modo navigate. Los tests existentes construían el Origin correcto artificialmente y no detectaban esa incompatibilidad. No se capturaron las cabeceras del POST humano original; la contradicción del código y el comportamiento documentado respaldan esta causa, y queda pendiente confirmar el recorrido remoto corregido.

La respuesta del formulario usa ahora `Referrer-Policy: same-origin`: preserva el origen en el POST propio, sin enviar referrer a otro origen. El handler sigue rechazando Origin nulo, ausente o extranjero. No se añade fallback por Referer, no se acepta Origin null y no se cambian Access, cookies, CSRF, permisos, expiraciones, callbacks ni presupuesto del ensayo.

Referencia: [MDN: Effect on the Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy#effect_on_the_origin_header).

## Validación y límites

Regresión observada primero fallando por la política anterior; los13 tests del handler pasan con la corrección. La prueba incluye rechazo de Origin ausente/nulo/externo, cero decisiones antes del consentimiento y éxito con origen propio/identidad/cookie válidos; se conserva CSP form-action self.

Un fixture local descartable en Chrome, sin cuentas ni permisos, mostró ERR_BLOCKED_BY_CLIENT en ambos POST automatizados, antes de registrar entradas en el servidor local. Por tanto, esa superficie no acredita un envío nativo corregido ni atribuye el bloqueo de automatización a la política del producto. No cambiar ni eludir protecciones del navegador para hacerlo funcionar.

Antes de otro permiso: aceptar fuente y CI, desplegar la candidata cerrada con las mismas claves/recursos y rollback comprobado. Preparar todo antes de la ventana original. El primer envío real corregido debe comprobarse con consentimiento humano, constancia primaria y una respuesta «Guardé tu decisión». Solo después actualizar herramientas y probar asociación/suscripción nativa, entrega cloud útil y cierre original. Ninguna de estas verificaciones equivale aún a PC-off o guardia permanente. No utilizar datos de Max en esta QA.
