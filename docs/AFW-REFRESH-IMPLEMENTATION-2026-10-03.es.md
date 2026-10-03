# Renovación delegada: implementación local y preparación de release

Fecha: 2026-10-03. Estado: candidato implementado y probado localmente; servicio remoto permanece cerrado y renovación deshabilitada. No acredita renovación desde ChatGPT ni continuidad comercial.

## Comportamiento

AFW_OAUTH_REFRESH_ENABLED debe valer exactamente true. El modo ausente/false conserva authorization_code sin refresh. La configuración local, canary, ejemplo y piloto real fijan false. La metadata anuncia refresh_token solo en el modo habilitado.

Cada renovación vuelve a comprobar permiso original, propietario, cliente, resource, pin del expediente y alcance. El token dura como máximo cinco minutos o lo que reste del permiso original. No actualiza expires_at ni usa refreshTokenIdleTTL. El proveedor exige al menos sesenta segundos: durante el último minuto no se emiten nuevos tokens; los ya emitidos siguen sujetos al permiso hasta su vencimiento. Consentimiento mantiene diez minutos y explica renovación dentro de ese plazo.

Migración generada 0014_bizarre_excalibur.sql: tabla delegated_refresh_uses con hash SHA-256 como clave única, grant_id y expires_at; índice de caducidad. No contiene tokens en claro. Un INSERT SELECT atómico, unido al permiso vigente y propietario actual, permite reclamar cada credencial una sola vez. Se eliminan solo hashes operativos cuyo permiso ya venció; expedientes y constancias de consentimiento permanecen.

El proveedor 1.2.1 admite reintentos con la credencial anterior y puede emitir dos sucesores concurrentes sin este control. Las pruebas de caracterización lo reprodujeron con crypto/protocolo reales y almacenamiento local. El control AFW admite un solo sucesor y rechaza el repetido con invalid_request: invalid_grant en el callback del proveedor retiraría toda la familia y podría destruir el sucesor válido por un reintento normal. Retirada, pérdida de propiedad o expiración sí deniegan el permiso; cada lectura MCP sigue comprobándolo en D1.

## Fallos y recuperación

Si D1 falla, no se concede renovación. Si KV falla después del consumo atómico, la credencial permanece consumida: no reemitir un sucesor mediante reintento. Tampoco se almacena una respuesta con tokens para repetirla. Una respuesta perdida puede requerir volver a conectar con consentimiento; el expediente permanece guardado. La política prioriza no duplicar credenciales y distingue este límite de una renovación sin interrupciones garantizada. Un replay rechazado no se toma por sí solo como prueba de ataque ni retira el sucesor correcto.

## Evidencia y límites

Pruebas nuevas reprodujeron ausencia de refresh antes de implementar; ahora cubren rotación, concurrencia, reintento anterior sin destruir sucesor, plazo absoluto, alcance sin ampliación, identidad/cliente/resource/pin, cambio de propietario, retirada, modo deshabilitado, esquema ausente y fallo de escritura KV después de consumo. MCP real del fixture lee con token renovado y rechaza tras Desconectar; pantallas y registros no contienen credenciales en claro. Migración generada se aplica en SQLite del fixture. Bundling Wrangler dry-run aprobado con flags false.

No hubo migración remota, activación, consentimiento humano nuevo ni cambio de puntaje externo. El shim WorkerEntrypoint local no demuestra garantías de despliegue workerd/D1 distribuido: exigir prueba canary antes de abrir clientes.

## Siguientes pasos ejecutables

1. CI y revisión antes de integrar; registrar commit y resultados.
2. Publicar código cerrado y false con rollback a versión cerrada anterior; comprobar versión, bindings, pin y respuestas 404.
3. Aplicar migración aditiva primero en D1 canary separado, inspeccionando esquema y preservando grants/datos. No usar producción para ensayo. Preparar cliente explícito authorization_code + refresh_token y ventana acotada con rate limiter.
4. Verificar nuevo ciclo de credenciales en canary y en ChatGPT antes de servicio persistente/discovery. Una nueva aceptación debe comprobar lectura tras vencer el primer token, renovación dentro de permiso y denegación después de desconectar. El ingreso o consentimiento humano, si falta, será la intervención necesaria.
5. Recién después decidir duración comercial, aplicar esquema al piloto real y apertura proporcionada por cliente. Rollback: deshabilitar flags/restaurar Worker cerrado, conservar tabla y datos; no DROP remoto.

## Corrección de latencia de emisión

La revisión independiente encontró que el proveedor calcula su TTL relativo después del callback; una demora puede dejar el registro opaco de KV unos segundos más allá del permiso D1. AFW recalcula tras comprobaciones/consumo y limita expires_in en la respuesta después de la escritura del proveedor, con nueva comprobación de permiso y propietario. La vigencia efectiva siempre termina en la fecha D1, incluso si el registro KV todavía existe. No se afirma igualdad exacta entre TTL interno del proveedor y fecha de consentimiento. Prueba de demora de cinco segundos falló antes del fix, luego aprobó duración informada <=85s con 90s iniciales y denegación MCP exactamente en la fecha original usando token aún válido para el proveedor.

## Validación previa a integración

Suite local completa final: 730/730, cero fallos. Lint: cero errores y una advertencia histórica de imagen. Build y Wrangler dry-run cerrados aprobados. Revisión independiente detectó desfase de latencia, corregido y revisado sin otros hallazgos significativos. Las 23 pruebas focalizadas de protocolo/renovación pasan. Estos resultados locales no sustituyen aceptación cloud del nuevo ciclo.
