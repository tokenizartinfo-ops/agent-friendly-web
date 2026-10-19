# AFW: integración nativa de preparación sobre HTTP
19oct2026. Proyecto AFW / tokenizartinfo-ops/agent-friendly-web.
Estado de esta candidata: verificación en Actions pendiente; los recibos exactos de la PR/issue497, no este encabezado, determinan la aceptación.

## Qué se verifica
Un Worker de prueba combina la fronteraHTTP508, lease request-local, OAuthResourceServer1.2.1, puente506/host505, registrador507 y dominio504 sobre D1 real de Miniflare/workerd. El servidor usa agents0.22.0/createMcpHandler y @modelcontextprotocol/server2.0.0. Clientes Client/StreamableHTTPClientTransport2.0.0 negocian legacy y pin2026-07-28.
El fetch del cliente está adaptado únicamente a dispatchFetch(example.invalid) del runtime CI. Es HTTP real de los SDK sobre Request/Response/workerd, sin socket externo o hosting público. No se usa InMemoryTransport ni un falso resultado de herramienta. La DB/SQL/transactions/trigger de esta ocurrencia son los de D1 del runner.

## Qué sigue siendo sintético
El validador devuelve identidad/token/contexto ficticios y el limiter es determinista. La prueba no verifica firmas, OAuth exchange, OTP, consentimiento humano, perfil real o autoridad de producción. El SDK sí construye ctx.auth y el código real proyecta/cerca ese contexto; eso no convierte el stub en autenticación real.
Headers x-ci y contadores son instrumentación exclusiva de la fixture. Los offsets monotónicos de4s/6s son inyección de tiempo, no latencia observada. Política/expiración sintéticas se fijan una vez al primer fetch y no se renuevan entre llamadas; cada request conserva su propio lease original.
D1 instala las migraciones y el DDL propuesto SOLO en su base efímera del runner; no es una migración autorizada o aplicada al canary. Las flags true existen solo en la fixture y no cambian configuración de ningún servicio.

## Criterios
- Solicitudes grandes/malformadas/batch/origen ajeno/método no admitido: rechazo antes de validar token o leer/escribir D1.
- Audience, vencimiento o bearer sintéticos incompatibles: SDK rechaza; scopes de lectura no preparan.
- Cliente HTTP ve exactamente las2tools y schemas/hints; argumentos adicionales y revisión incompatible no reservan trabajo.
-5s originales cubren autenticación:6s simulados fallan sin nueva admisión;4s consumidos dejan<=1000ms en expires_at-reserved_at real.
- Preparación entrega DTO acotado con tres flagsfalse y una sola cápsula/evento. Cliente moderno concilia la misma referencia preparada desde legacy.
- Se pierde el ACK HTTP solo después de comprobar commit preparado; cliente no hace otro POST de escritura. Lectura explícita con misma solicitud recupera referencia/version sin repetir trabajo.
- Retirada en D1 deniega la siguiente lectura de ambos clientes y conserva historial.
Las assertions calculan expectativas literales y consultan efectos reales de D1. No son tests del texto de una documentación.

## Sin reconexión o red ajena
El consumidor fija misma-origin, onInsufficientScope:throw, maxStepUpRetries0 y maxRetries0 de reconexión. No dispone de authProvider, callback, issuer externo o credencial real. El fetch de prueba rechaza cualquier otro origen y solo registra operación/método/status, sin headers/tokens/payloads owner.
El fallo de ACK se introduce entre la respuesta del Worker y el SDK cliente. No acredita una falla de red de Internet ni de Cloudflare; sí ejercita la decisión de no repetir la escritura y de conciliar.

## Estado operativo
Solo tests/documentación de fuente; ningún módulo o entrypoint de producción nuevo. CI/main/revisión y los límites aceptados constan en PR portadora/issue497. Si el ensayo revela una incompatibilidad real se documentará con RED antes de cambiar el producto.
La siguiente etapa conserva consentimiento/scope de preparación real, schema/migración/reversión y montaje/rollout propios, con prueba de integración actual del cliente que lo consumirá. Esta fixture no abre catálogo, conexión o servicio.
G2 aceptado/cerrado no se repite. Container02382110, suscripción/aviso/revisiónútil/bajanativa, PC-off y Max permanecen independientes. operationalReadiness=false.
Revertir solo fuente mediante PR; no borrar ni recrear recursos, namespaces o historia remota. Ningún build/install/clon local, token/contratación/API de pago/correo a Max.

## Referencias
[SDK: pruebas de servidor con Client y fetch adaptado](https://ts.sdk.modelcontextprotocol.io/v2/testing).
[SDK: versiones legacy y modern](https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions).
[SDK: cliente StreamableHTTP y opciones de reconexión/step-up](https://ts.sdk.modelcontextprotocol.io/v2/api/@modelcontextprotocol/client/client/streamableHttp.html).
Estos documentos oficiales se contrastaron19oct2026; la dependencia exacta del repositorio y el resultado ejecutado en Actions son la evidencia del ensayo, no la disponibilidad de una versión futura o de un host remoto.
Plan/ledger: docs/superpowers/plans/2026-10-19-afw-capsule-preparation-native-http.md.
