# Paquete del Worker de preparación de AFW
20 de octubre de 2026 · fuente y compilación; servicio sin desplegar.

Este paquete reutiliza el router de preparación aceptado, el proveedor OAuth existente y las mismas comprobaciones primarias de KV/D1. Permite preparar una entrega aislada del servicio de agentes sin ampliar el Worker de lectura G2 ni el sitio público. Tener el archivo compilado no acredita un servicio disponible, una suscripción de avisos, una revisión cloud útil, retirada nativa de avisos ni operación con el ordenador apagado. operationalReadiness=false.

## Entrada y autoridad
`worker/mcp-preparation/index.mjs` exporta el Worker por defecto y `createDelegatedPreparationWorker({accessVerifier?,now?,monotonic?})` para integración de fuente. El Worker por defecto usa el verificador Access real aceptado; no recibe funciones, permisos, URLs o clientes desde JSON, encabezados o argumentos de una herramienta. Las claves efímeras de CI existen solo en su fixture.

Sin `AFW_DELEGATED_PREPARATION_ROUTER_ENABLED=true`, responde404/no-store sin mirar otras dependencias, cuerpo, identidad o relojes. Configuración habilitada incompleta o inválida devuelve503 opaco/no-store y no confiere ejecución, cobro o publicación.

Solo entrega las cinco rutas aceptadas: `/authorize`, `/oauth/token`, `/mcp`, `/connections`, `/connections/revoke`. No añade discovery, registro de clientes, refresh, administración, bootstrap o fallback al piloto G2.

## Configuración de servidor requerida
Son valores confiados del servidor, no un formulario público. Este documento no selecciona recursos o fechas para activar un ensayo.

| Campo | Restricción |
| --- | --- |
| AFW_OAUTH_ISSUER | Origen HTTPS canónico |
| AFW_OAUTH_RESOURCE | Exactamente issuer + /mcp |
| AFW_OAUTH_PILOT_PROJECT_ID / CLIENT_ID | Referencias acotadas y registro real correspondiente |
| AFW_PREPARATION_TRIAL_STARTED_AT / AFW_OAUTH_PILOT_EXPIRES_AT | Fechas UTC ISO con milisegundos; ventana original positiva de hasta600000ms |
| AFW_PREPARATION_MANAGEMENT_STARTED_AT / EXPIRES_AT | Ventana humana independiente con las mismas reglas |
| AFW_PREPARATION_CLIENT_NAME | Texto requerido, no vacío, hasta200caracteres |
| AFW_PREPARATION_LOCALE | es/en/pt; ausente usa es |

Los flags adicionales y bindings de los hosts aceptados siguen siendo necesarios: modo window, preparación y gestión activadas explícitamente, DB, OAUTH_KV, limitador y Access válidos. Este paquete no los crea, inventa o sustituye. El perfil fijo es `afw.preparation-consent.v1`. No transforma fechas vencidas en now+duración. Si la gestión termina antes del permiso del agente, conserva la gestión humana y cierra los puertos del agente. Una ventana humana válida puede mostrar y retirar permisos propios aun después del vencimiento del perfil del agente.

## Plazos, continuidad y errores
Cada petición habilitada crea una sola lease original de5000ms antes de decodificar configuración o componer hosts. La prestan router/hosts/SQL; el Worker la cierra al terminar. Se conserva la comprobación final de respuesta del host aceptado, sin una segunda capa asíncrona que declare autoridad después de su entrega.

El cambio observado de un valor de configuración o referencia de opciones durante una espera real invalida esa petición. Es un límite dentro de la petición, no una revocación distribuida persistente. Una nueva petición compone hosts privados de nuevo sobre el mismo KV/D1, con las mismas fechas originales; no supone que Workers conserve la identidad del objeto env. La retirada duradera depende de D1 y se comprueba en cada operación. Reiniciar la fábrica no reconstruye un grant retirado.

Los límites de los hosts siguen siendo4096bytes de entrada,32768 de respuesta y8192 de URL, con identidad, Origin, rate limit y SQL primario. Un resultado desconocido tras una escritura exige reconciliación:503 no demuestra cancelación física ni permite repetir una preparación con una clave nueva.

## Compilación en la nube
`scripts/build-preparation-worker.mjs <revision-exacta>` se ejecuta en Actions con Node22 y npmci del lockfile existente. Exige HEAD exacto y entradas Git sin cambios antes y después de compilar. El builder de biblioteca solo etiqueta bytes; la CLI y el workflow prueban la procedencia Git. Esa comprobación no es una atestación independiente de dependencias instaladas.

El workflow `AFW preparation Worker build only` usa permisos contents:read, checkout sin credenciales persistidas, un máximo de15minutos y artefactos de7días. Solo acepta PR del mismo repositorio o main; no llama a Cloudflare ni necesita tokens. No contiene un programa Node/imagen de Container, configuración de runtime o plan de despliegue.

Salidas del runner:
- `output/preparation-worker/index.mjs`: ESM sin sourcemap, entre1 y2097152bytes.
- `build.json`: sourceRevision/sourceTree, sourceCheck, SHA256 real de los bytes, tamaño y marcadores buildOnly/runtimeConfigIncluded.

La publicación del merge genera su propio artefacto nuevo; no se renombra el del candidato. Conservar el recibo de Actions y digest; el ZIP temporal no es almacenamiento permanente de una release. No se requiere descargarlo ni compilar en el ordenador del owner.

## Qué se prueba y qué falta
Miniflare/workerd ejecuta la entrada real, SDK OAuth/PKCE real, KV/D1 y migraciones en una base efímera propia. Prueba configuración cerrada/malformada, permisos explícitos de lectura/borrador, fechas no renovadas, preparación/reconciliación, retirada duradera, cambio observado durante identidad retenida y vencimiento original. No acredita identidad humana/JWKS alojados, DDL remoto, recursos, consentimiento de un cliente o operación cloud permanente.

Antes de desplegar: seleccionar target aislado; verificar cuenta/proyecto/origen/revisión/bindings/esquema/cliente/custodia; preservar configuración y datos y comprobar una reversión sin destruir namespace; acotar un ensayo propio y verificar el recorrido real. Reutilizar un dato del piloto anterior o un artefacto buildOnly no cumple esos requisitos. G2 ya cerrado no se repite por este paquete.

Reversión de fuente: base5295b5d6d14f22d937a9feebf76e2db6eda7ceb0 conservada en Git. Ningún runtime, namespace o dato remoto fue cambiado por este bloque; no hay un rollback remoto ejecutado que se pueda acreditar.
