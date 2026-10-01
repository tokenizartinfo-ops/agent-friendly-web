# OAuth delegado: aceptación real y cierre del canary

Fecha: 2026-10-01. Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, entorno `delegated-canary`, origen `https://delegated-canary.agentfriendlyweb.dev`. Esta aceptación usa exclusivamente el proyecto sintético `oauth-canary-owner`, no un expediente de cliente productivo.

## Resultado comprobado

El owner autorizó la lectura desde su sesión real de Chrome. El cliente local intercambió el código mediante PKCE y consultó `read_project_summary` y `read_saved_evidence` por MCP. El resumen correspondió al proyecto sintético propio; la colección de observaciones estaba vacía. No acredita lectura de observaciones reales fechadas ni una auditoría nueva.

La primera conexión confirmó lectura, pero el token venció antes de comprobar su retirada. Se generó una segunda autorización, conservando la sesión humana. Tras esa lectura, el owner desconectó ambos permisos y el cliente comprobó: «Desconexión comprobada: la siguiente lectura fue rechazada con el token aún vigente». El proceso terminó con exit code 0. No se conservaron códigos, estado, PKCE, cookies ni tokens en el repositorio.

Consulta agregada de D1 del canary: dos grants, dos intercambios, dos revocados; última revocación `2026-10-01T13:13:35.512Z`. No hubo escrituras en esa consulta. La evidencia del cliente distingue revocación de simple vencimiento. La interfaz también mostró ambos permisos como `revoked`.

## Retirada del servicio temporal

Se desplegó la fuente integrada `5eaa028a1ff5275fa3fdd1aa77f654e9fce6280d`, que incorpora las correcciones de PR142 y su recibo PR143, con `AFW_DELEGATED_OAUTH_ENABLED:false`. Worker `agent-friendly-web-delegated-canary`, versión cerrada `4775ff39-b406-4f62-8eaa-d4d336a80446`, deployment `23a4679f-0840-4a10-aa3e-122f8f8cc983`, 100%, `2026-10-01T13:16:26.727363Z`.

D1 `6a728254-1494-4039-802e-b39288a55fcc` y KV `6b94ff702e504e14a7730cee73a0f6ff` se conservaron; no se eliminaron datos ni recursos. Dominio y Access permanecen vinculados al Worker cerrado. Siete comprobaciones posteriores aprobadas: MCP, metadata OAuth y registro devuelven 404; las tres rutas humanas consultadas mantienen redirección a Access. Deshabilitar el canary no lo convierte en un servicio comercial disponible.

Rollback técnico: versión anterior `27238a30-4ace-49de-bfec-d833449582a8`, limitada al mismo canary y plazo. No reabrirla por defecto ni reutilizar enlaces efímeros. Una nueva ventana debe tener objetivo, vigencia y aceptación propios.

Producción comprobada sin cambios: Worker `agent-friendly-web-web-production`, deployment `83a8bd57-2af6-4131-a4a7-1bd049cd3123`, versión `d09bcf52-6fae-4c34-bfec-40b715384205`, 100%. Sin migraciones productivas, ampliación de identidades, discovery OAuth en el apex ni cambios Tokenizart/Atelier.

## Continuidad operativa

La aceptación sintética real de consentimiento → lectura → retirada queda cerrada. Las pruebas negativas e interoperabilidad local están documentadas en los recibos anteriores; esta sesión no pretende haber repetido todos esos casos en edge.

Siguiente bloque: preparar el piloto útil de lectura de un expediente real, con cliente explícitamente elegido, registro exacto, vínculo propietario, resumen proporcionado y evidencia fechada. Reutilizar el servicio de dominio y presentar permiso/desconexión con lenguaje humano; no ampliar scopes ni publicar por esta aceptación. Verificar la compatibilidad del cliente antes de pedir al owner otro consentimiento.

A2A continúa como bloque posterior: revisión acotada de URL pública, con estados persistidos, límites, idempotencia y resultado verificable antes de anunciar Agent Card. Escritura, instalación y publicación siguen siendo alcances separados. Revisión externa DNSSEC/puntaje pendiente de su nueva observación; no atribuir puntos a este canary cerrado.
