# Limitador real de revisión en workerd — 5 de octubre de 2026

## Resultado

Una nueva aceptación local utiliza el binding real ratelimits de Miniflare/workerd, namespace sintético aislado,10 consultas/60s, sin reemplazar limit() por un mock. Diez GET autenticados devuelven200; el undécimo devuelve429/try_later. Antes de esas lecturas, POST con Origin extranjero devuelve403/same_origin_required y no consume el presupuesto de las diez consultas. La tabla de revisiones permanece vacía.

La misma instancia y JWT RS256 sintético, cuya vigencia es cinco minutos respecto del reloj servidor inyectado, pasan a configuración review=false. GET y POST devuelven404, y D1 permanece sin revisiones. Se ejerce la revocación de capacidad AFW por configuración, no la retirada de políticas Access ni identidad cloud. Las claves solo existen en memoria del test; no se guardan credenciales, tokens ni claims privados.

Evidencia: test/operations-review-real-limiter.test.mjs, ejecución local1/1 correcto, binding auténtico y schema/triggers completos. Source factory interna idéntica a producción excepto clave/reloj sintéticos, sin wrapper que sustituya el limitador. La regresión separada operations-review-entrypoint-workerd prueba el bundle de despliegue sin modificar. Las aceptaciones anteriores de constancias y replay siguen vigentes; no se repiten.

## Límite y siguiente bloque

Esto fortalece aceptación local; no demuestra429 en Cloudflare, CSRF de navegador remoto ni retirada de JWT real tras cierre. El inspector Chrome sigue impidiendo atribuir código HTTP a su bloqueo. No abrir otra ventana ni solicitar OTP solo para repetir esto; conservar QA cerrada y dos constancias previas. La aceptación remota necesita navegación/observación compatibles y sesión humana al momento de una prueba concreta.

Siguiente trabajo autónomo: verificar que los consumidores de avisos mantengan el bloqueo del historial revisado y publiquen una causa comprensible de supresión, sin volver a reservar o enviar avisos cerrados. Mantener separación entre constancia guardada, entrega y reparación; no abrir guardia permanente hasta lifecycle/custodia y aceptación remota pendientes.
