# Diagnóstico saneado del preflight WAF

21oct2026Argentina. Cambio acotado de observación, sin despliegue.

## Problema observado y límite de la evidencia

El [ensayo03](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6330882288) se detuvo antes de iniciar el PATCH de activación con una comparación genérica. Su excepción no conservó qué componente difería. La lectura posterior22oct02:00:45.347UTC coincidió con la base: regla v1false y ventana vencida; catálogo y bots iguales. Esa segunda lectura no explica la primera. No se atribuye la causa a propagación, credenciales, Container, un escritor externo o una actualización de Cloudflare.

## Diseño

`diagnosePublicWafSnapshot(expected, observed, checkedAt)` compara únicamente las proyecciones conocidas de entrypoint propio, catálogo de metadata y bots. Expected debe ser la regla cerrada propia de AFW. La regla, su contenedor y el orden de sus reglas se comparan íntegramente; enumerar el catálogo en otro orden no cambia su contenido. Faltantes, desconocidos, duplicados, accesores y estructuras fuera de límites fallan cerrados.

El recibo incluye solo fecha ISOUTC válida, coincidencia y rutas de campo estáticas por componente. No copia expresión, descripción, IDs, valores de bots, objetos de fase privada, claves, headers ni campos desconocidos. Los inputs no quedan referenciados en el recibo. Un valor ausente no se transforma enfalse.

`snapshotMatches` solo expresa igualdad de esas proyecciones en las entradas entregadas. No verifica frescura, autenticidad, integridad o completitud de la API, cuenta, fase paginada, entorno, autorización, managedversion fijada, ventana original, concurrencia o CAS. No es una atestación. `mutationAllowed`, enforcement, readiness y PC-off siemprefalse. No importa clientes de red, no hace IO y no ejecuta ninguna mutación. No está montado en producción ni habilita un nuevo ensayo.

## Verificación y siguiente uso

Fixtures en GitHub cubren coincidencia, diferencias por campo, metadata de versión, separación de null/false/ausencia, orden del catálogo, inserción de regla ajena, forma desconocida, accesores, tamaños y recibo sin referencias a los inputs. El workflow público ejecuta estas fixtures; su lectura y control opcional mantienen los defaults previos. En PR no consulta producción.

Antes de usarlo en otra operación, el orquestador deberá conservar su recibo saneado ANTES de decidir si escribe, junto con la procedencia de los snapshots y el plan original. No reconstruir retrospectivamente el snapshot perdido del ensayo03 ni reanudar sus límites. La excepción genérica previa permanece en su constancia histórica.

Container02382110/OTP02389649 y circuito cloud útil/retirada/PC-off continúan separados, sin nuevo ensayo privado. Fuente/CI no acreditan protección WAF. No nueva ventana, token, recurso o envío al cliente.
