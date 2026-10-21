# AFW — candidata de seguridad Pro compatible con agentes

21 octubre 2026. Resultado de este bloque: propuesta concreta y desactivada, matriz de superficies, criterios de ensayo y recuperación. Continúa la [evaluación Pro](AFW-PRO-PLAN-LEVERAGE-2026-10-21.es.md). No instala reglas ni cambia tráfico, permisos, datos o contratos del producto.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT public_web; ORIGIN https://agentfriendlyweb.dev; RESOURCE_TYPE futura regla WAF de zona; RESOURCE_ID zona4b1a3fe4b6dcb81e9d6a633174c5939f/cuenta85d0d5dadac3341a564f22ce885e9eec. ALLOWED_ACTION de este bloque: GET de configuración y propuesta en GitHub. ROLLBACK de este bloque: revertir solo el commit documental si hace falta; no hay cambio remoto que revertir. No son destinos Tokenizart/Atelier ni otros hosts de la cuenta.

## Evidencia primaria y decisión

Lectura API23:33:40.067UTC: zona exacta y cuenta confirmadas, plan pro. Los entrypoints de http_request_firewall_managed, http_request_firewall_custom y http_request_cache_settings respondieron404. Esto acredita que no se encontró ese entrypoint explícito, no ausencia de DDoS, reglas internas u otras protecciones. Bots: enable_jsfalse, definitely_automatedallow, verified_botsallow, static_resource_protectionfalse, ai_bots_protectiondisabled. Los campos fight_mode y likely_automated no aparecieron en esa respuesta: quedan desconocidos, no false.

Lista de rulesets23:34:13.889UTC: Cloudflare Managed Ruleset efb7b8c949ac4650a09736fc376e9aee/version412 disponible, OWASP4814384a9e5d4991b9815dcfc25d2f1f/version88 y Free77454fe2d30c4220b5701f6fdfb893ba/version77 también listados. Disponibilidad no equivale a despliegue. Existe en otra fase AFW private release candidate routing1864f999067c4c279a580ab6fc63158e/http_request_late_transform/version3: se preserva sin leer/publicar sus valores internos ni modificarlo.

Recomendación: primer ensayo futuro pequeño con Cloudflare Managed Ruleset, solo GET/HEAD de portada y guía en el hostname canónico. Conservar las reglas habilitadas por defecto del proveedor y fijar únicamente la acción block para impedir que este ensayo introduzca challenges interactivos. No significa que una petición bloqueada reciba JSON ni que toda AFW quede cubierta; es una evaluación inicial de dos rutas HTML.

No activar OWASP, Super Bot Fight Mode, JavaScript detections, AI-bot blocking, reglas de caché ni excepciones en este mismo incremento. Su compatibilidad exige aceptación separada. No se necesita un skip: la candidata selecciona qué tráfico inspeccionaría; lo restante mantiene sus protecciones existentes.

## Candidata cerrada

[JSON revisable](evidence/2026-10-21-pro-security/managed-read-trial.proposal.json). Es un sobre documental, no un payload listo para enviar ni un instalador. Ningún workflow lo consume.

- state=proposal_only, applyAllowed=false, deploymentReady=false y candidateRule.enabled=false.
- Scope exacto: host agentfriendlyweb.dev; métodos GET/HEAD; paths / y /guia. Sin comodín de hostname, User-Agent, bot score Enterprise, IPs o principal.
- La expresión usa http.request.timestamp.sec, definido por Cloudflare como recepción UNIX en segundos. El ejemplo0→1 está deliberadamente vencido. Nunca reutilizarlo como una ventana actual ni eliminar la condición temporal para hacerlo pasar.
- Un ensayo posterior deberá generar una revisión nueva con inicio/fin enteros explícitos, duración máxima900segundos, evidencia/configuración frescas y habilitación deliberada. La sintaxis y la disponibilidad concreta en la fase deberán aceptarse por el proveedor antes de aplicar una regla activa.
- El plazo en el borde limita nuevas solicitudes admitidas por esa expresión; no elimina la regla, no garantiza terminar solicitudes ya en curso y no equivale a una prueba PC-off de AFW.
- overrides.action=block no incluye overrides.enabled, categorías o reglas específicas. No habilita masivamente reglas desactivadas por defecto.
- La versión412 es una observación, no un pin enviado a la API ni una promesa de inmovilidad: Cloudflare actualiza el ruleset. Una revisión posterior debe registrar la versión y revisar cambios; no presentar una detección como evaluación de una versión distinta.

La referencia estable afw_public_read_managed_trial_v1 identifica solo esta futura regla. No renueva permisos o plazos por cambiar una descripción. El token del uploader público tiene alcance Worker, no habilita WAF de zona por inferencia; no crear o ampliar credenciales desde este documento.

## Matriz de superficies

Fuente de rutas examinada: main6dd9d3d2; OpenAPI público solo declara POST/api/scan; app/mcp/route.ts y tarjeta A2A se evalúan según sus contratos propios. Presencia en fuente no equivale a nueva aceptación remota.

| Superficie | Papel | Alcance de esta candidata | Qué debe conservarse |
| --- | --- | --- | --- |
| apex / y /guia, GET/HEAD | Entrada humana y lectura pública | Únicas rutas del primer ensayo futuro | Respuesta y negociación legítimas, navegación y guía; ningún challenge nuevo |
| apex documentos de descubrimiento, /skills y /_next/static | Documentos/activos públicos | Fuera de esta regla; protección existente continúa | MIME/negociación/caché/hashes según cada contrato; acceso de herramientas legítimas |
| apex POST/api/scan | Diagnóstico público | Fuera de esta regla | JSON y estados del scanner, SSRF/redirect/timeouts/tamaño y límites de aplicación |
| apex /mcp | MCP público | Fuera de esta regla | Métodos, JSON-RPC/streaming y errores definidos por el servidor; no sustituir JSON por challengeHTML |
| a2a.agentfriendlyweb.dev/a2a y tarjeta | Diagnóstico público A2A independiente | Fuera por hostname exacto | JSON-RPC, lectura pública; sin tareas reanudables o callbacks inventados |
| apex /expediente* y /api/projects* | Expediente privado | Fuera de esta regla | Access y autorización de aplicación; visitante anónimo continúa302 hacia Access, no acceso por UA |
| canaries/operadores AFW | Ensayo y administración privados separados | Fuera por hostname exacto | Estado cerrado, identidad, consentimiento y configuración propios |
| Otros dominios/proyectos | Recursos ajenos a este bloque | Prohibidos | Ninguna modificación o excepción |

Verified bot y User-Agent no acreditan identidad del cliente. Una petición puede seguir siendo bloqueada por una protección existente aunque no coincida con la candidata. El éxito del smoke anterior no valida un cambio WAF futuro.

## Protocolo del ensayo posterior

1. Confirmar alcance/autorización, presupuesto y ventana original; comprobar ausencia de otra operación sobre esa zona/fase. Leer plan, bot config, managed entrypoint y ruleset actual. Guardar una copia recuperable de la configuración afectada por el canal privado autorizado, sin headers, credenciales, payloads o datos personales en Git público. Si existe un entrypoint nuevo o la observación cambió, revisar la propuesta; no sobrescribirlo con la fotografía404.
2. Preparar una nueva revisión con expresión temporal vigente y candidateRule habilitada solo para esa ventana. Si el entrypoint sigue ausente, crear únicamente el contenedor de fase necesario; si existe, agregar únicamente la regla propia después de revisar la fase vigente. No usar PUT de toda la fase ni duplicar referencias. Conservar IDs/ref/versión/hash y constancia de la única mutación. Un ACK incierto obliga a inspeccionar por ref, no a repetir creación.
3. Ejecutar desde un runner cloud GET/HEAD legítimos de / y /guia; comprobar negociación, estado/MIME y cuerpo esperado. La guía requiere un caso propio: el workflow afw-public-edge-check actual no la incluye. Repetir también sus ocho públicos y tres privados de forma acotada, sin login, auditoría nueva o escritura. Clientes con UA genérico y UA de prueba no deben obtener privilegios distintos.
4. Un único control sintético de detección contra la ruta propia, de marcador fijo e inocuo, deberá demostrar asociación a la regla/servicio WAF mediante un evento mínimo y su referencia/ray. Un403 solo no prueba qué componente lo produjo. Si el plan/dataset no permite observarlo, la detección queda pendiente; no activar más reglas ni log payloads para forzar evidencia.
5. Cerrar la regla y comprobarlo antes de terminar; contrastar el estado, respuestas legítimas, otras reglas y fases. Una ampliación a APIs, otros hosts, OWASP o políticas de bots requiere un bloque posterior y pruebas por protocolo, no una expresión global.

No presuponer modo Log en Pro, muestreo completo, entrega instantánea de eventos o acceso al bot score Enterprise. Security Events puede tener retraso y muestreo; ausencia de un evento no demuestra ausencia de detección. No recopilar IPs, cookies, correo, query completa o cuerpo del expediente. Conservar solo fecha, componente/acción/regla, referencia opaca y resultado.

### Casos que debe cerrar la ejecución real

| Caso | Resultado requerido |
| --- | --- |
| Petición legítima de portada/guía dentro de ventana | Contrato de respuesta conservado, sin nuevo challenge |
| HEAD y negociación pública admitida | MIME/headers/estado correctos; no inventar soporte desde un GET |
| /api/scan, MCP o A2A | Fuera del scope de la nueva regla; comprobar contrato correspondiente antes de ampliar |
| /expediente y API privada anónimos | Access continúa exigido; UA no concede autoridad |
| Otro hostname, POST o path fuera de la lista | No coincide con esta regla; no implica omitir otras protecciones |
| Instante anterior al inicio o desde el fin original | No admite nuevas coincidencias, sin renovación automática |
| Detección sintética controlada | Componente/regla correlacionados, no inferencia desde403 |
| ACK incierto o cambio concurrente | Inspección y pausa; sin retry de creación o rollback global |
| Bot field ausente, etapa no observada o datos muestreados | unknown/pending, nunca false/operational |
| Cierre/recuperación | Regla propia desactivada y lectura posterior conforme; demás recursos intactos |

## Recuperación sin pérdida de cambios concurrentes

El objetivo primario es retirar el comportamiento del ensayo, no imponer toda una configuración vieja. Tras lectura fresca, verificar que el ID/ref corresponde a la regla propia y comparar su estado con el recibo de creación; desactivar únicamente esa regla mediante la operación por ID que admita la API. No restaurar a ciegas un ruleset completo ni borrar otras reglas que hayan llegado después.

Si la fase originalmente no existía, una fase nueva con la regla desactivada no equivale a restaurar la ausencia física: conserva comportamiento cerrado, y su eventual retirada será una decisión separada. No borrar el entrypoint como limpieza rutinaria. Si la recuperación no se confirma o cambió otro actor la regla, mantener el gate de rollout bloqueado y revisar. El fin de la expresión es una salvaguarda adicional, no sustituye el readback de cierre.

Este bloque no probó una recuperación remota porque no creó recursos. No anunciar enforcement, menos abuso, mejora de puntaje externo o compatibilidad WAF aceptada desde el JSON o los casos de diseño.

## Correcciones de uso de herramientas

Cloudflare indica actualmente que modificar Super Bot Fight Mode mediante Rulesets API ya no está soportado y puede generar comportamiento inesperado. Cualquier ajuste posterior debe usar el mecanismo oficial disponible y comprobado; no fabricar reglas en http_request_sbfm. Las excepciones skip de WAF custom rules son un mecanismo distinto: si alguna vez se necesitan, deben dirigirse solo al componente y superficie correspondientes, sin saltar Access o la autorización del producto. Esta candidata no crea esas excepciones.

Cloudflare también desaconseja habilitar todas las reglas administradas mediante overrides por sus posibles falsos positivos. Se conserva la selección por defecto. Una acción block sigue pudiendo rechazar tráfico legítimo: el scope y la comprobación del ensayo son necesarios.

## Verificación y continuidad del bloque documental

Se comprobó JSON válido, estados cerrados, expresión de ejemplo vencida, ausencia de override enabled y ausencia de bypass por UA/score. Es revisión de estructura y fuente, no ejecución de un motor WAF ni validación de la expresión por Cloudflare. Sin nuevos paquetes, scripts, workflows, archivos locales o despliegues. Revisión/CI de la PR portadora se registran en su propio recibo.

La carga pública cloud ya aceptada queda en [recibo6328709349](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6328709349): no repetirla o promover su copia idéntica para probar esta propuesta. Lectura de soporte en este bloque no encontró mensajes nuevos de Cloudflare; Container02382110 conserva la última escalación técnica21oct12:20:40UTC y OTP02389649 el acuse21oct21:11:09UTC. No repetir OTP/consentimientos, renovar permisos o enviar a Max. operationalReadiness=false;PCoff=false; monitorPAUSED.

## Fuentes primarias consultadas21oct2026

- [Managed Rules: disponibilidad, overrides y actualizaciones](https://developers.cloudflare.com/waf/managed-rules/).
- [Cloudflare Managed Ruleset: defaults y configuración](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/).
- [Recepción temporal http.request.timestamp.sec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/).
- [Super Bot Fight Mode: excepciones y cambio de soporte de Rulesets API](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/).
- [Orden de fases, WAF y Access](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/).
- [Security Events y límites de observación](https://developers.cloudflare.com/waf/analytics/security-events/).
- Esquema OpenAPI oficial Cloudflare de Create zone ruleset rule/overrides consultado mediante el conector, más lecturas primarias fechadas de esta cuenta.
