# AFW para integradores de agentes

19 de octubre de2026; guía revisada el 25 de octubre de2026. Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web.

Este paquete es una referencia de código y una demo sintética: no abre el servicio privado a agentes externos ni ofrece tarifas. Ayuda a integrar operaciones pequeñas sobre el mismo expediente, con revisiones, decisiones y comprobaciones trazables. No reemplaza el consentimiento del titular ni convierte una respuesta del modelo en autorización.

## Cuándo conviene usar AFW

Un agente puede generar texto o archivos. AFW busca además conservar fuentes y decisiones, preparar entregables coherentes, guiar su instalación según el sitio y comprobar el resultado con fecha. La instalación automática y la delegación completa todavía tienen etapas pendientes. No se garantiza recomendación por LLMs, mejor ranking, menor gasto o compatibilidad con cualquier hosting.

Para una empresa con su propio asistente o una agencia integradora, el recorrido previsto es:
objetivo y fuentes → expediente → siguiente dato o revisión → borrador/cápsula revisable → decisión del titular → instalación autorizada → comprobación.
Preparar, aprobar, instalar y verificar son estados distintos; un archivo generado o una comparación histórica no acredita una instalación vigente.

## Qué existe y qué queda pendiente

| Superficie | Operaciones o alcance | Estado y límite |
| --- | --- | --- |
| MCP público | audit_public_site, get_afw_methodology, get_public_registry_profile, verify_public_okf_release | Implementados; recibos públicos fechados. Descubrir el catálogo del servidor y comprobar disponibilidad antes de usarlos. Sin acceso al expediente privado. |
| OpenAPI público | POST /api/scan, origen agentfriendlyweb.dev | Contrato de diagnóstico público, con controles del scanner. No crea ni publica un expediente por inferencia. |
| A2A público | diagnóstico JSONRPC SendMessage en a2a.agentfriendlyweb.dev/a2a | Recibo2oct2026: diagnóstico público; tarjeta excluye streaming, push y tareas reanudables. No es delegación comercial asíncrona. |
| MCP privado de lectura | read_project_summary, read_saved_evidence y opt-in read_project_next_step | Pilotos restringidos por cliente/proyecto/identidad. G2 real19oct aceptó200/409/403; el runtime quedó cerrado. Otros integradores no obtienen acceso al copiar un ejemplo. Evidencia opcional requiere alcance propio. |
| Núcleo de catálogo/cotización | afw.catalog.describe, afw.quote.preview | Contratos internos, sin endpoint de contratación ni cobro. Sin precio significa null, nunca cero. |
| Preparación de borradores/cápsulas | Consentimiento propio, preparación, reconciliación y retirada | Fuente implementada y probada con SDK/D1 en Actions; paquete de Worker cerrado preparado. No es un servicio abierto ni una conexión disponible para terceros. Ver la distinción de estados y los gates debajo. |
| Instalación y pagos | Adaptadores de hosting, aceptación comercial durable y cobro | Etapas posteriores; no se concede permiso de ejecución, publicación o gasto desde esta guía. |
| Eventos privados y supervisión cloud | aviso, revisión útil y baja nativa | Aceptación pendiente; no anunciar guardia permanente ni operación PC-off desde G2. |

Los identificadores afw.* son nombres del dominio interno. No se invocan como si fueran nombres MCP publicados.
Fuentes: [diseño aprobado](superpowers/specs/2026-10-19-afw-agent-consumption-design.md), [contratos](AFW-AGENT-CONSUMPTION-CONTRACTS-2026-10-19.es.md), [A2A público](AFW-A2A-PUBLIC-RELEASE-2026-10-02.es.md), [recibo G2](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6275545264).
Una constancia histórica no garantiza disponibilidad ahora. Este documento no contiene un catálogo operativo con vigencia renovable.

## Primer recorrido público y compatibilidad de transporte

Para explorar las capacidades públicas, el destino es https://agentfriendlyweb.dev/mcp. Esa superficie no entrega el expediente privado ni requiere el permiso delegado del piloto de lectura. El paso privado descrito más abajo necesita su propia conexión autorizada.

Usar un cliente MCP compatible: completar su inicialización y consultar `tools/list` antes de elegir una herramienta. La [aceptación pública del25oct](AFW-PUBLIC-JSON-CLOUD-ACCEPTANCE-2026-10-25.es.md) comprobó inicialización y catálogo, junto con los límites de complejidad; no acredita cada `tools/call`, una auditoría de cualquier sitio ni una conexión privada vigente. El catálogo observado sirve para decidir qué invocar; no concede autorización para escribir, instalar o publicar.

En Streamable HTTP, los mensajes se envían por POST con cuerpo JSON y el cliente debe anunciar `Accept: application/json, text/event-stream`. Debe decodificar la respuesta según su Content-Type: HTTP200 puede contener JSON o SSE. No aplicar `JSON.parse` directamente a bytes SSE ni confundir el SSE de una respuesta con una suscripción a avisos del expediente. La versión del protocolo se negocia al inicializar; una versión escrita en un ejemplo antiguo no acredita compatibilidad actual. [Especificación primaria del transporte](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports).

Los límites de entrada de AFW se aplican al **sobre JSON completo**, incluidos argumentos y metadatos:

| Condición | Respuesta de AFW | Recuperación del cliente |
| --- | --- | --- |
| Content-Type del POST distinto de application/json | HTTP415, `unsupported_media_type` | Corregir la codificación y el encabezado |
| Cuerpo mayor de32768bytesUTF8 (32KiB) | HTTP413, `request_too_large` | Reducir los datos enviados; no reenviar el mismo cuerpo |
| Profundidad mayor de64 o más de4096valores en el JSON | HTTP413, `request_too_complex` | Simplificar el sobre y sus metadatos; no insistir con la misma estructura |
| JSON mal formado | HTTP400, código RPC -32700 en el recorrido comprobado | Corregir el JSON antes de volver a solicitar |

Fuente de esos límites: [adaptador HTTP de la aplicación cualificada](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d3b638a46d1f9ab559142222e181e9aae2e0a83e/lib/public-mcp-http.mjs). La aceptación remota del25oct comprobó los bordes de profundidad/valores y JSON inválido; esta actualización documental no ejecuta una nueva prueba remota de tamaño o media type.

El cliente debe acotar su tiempo total y bytes de respuesta y tratar un timeout como resultado no confirmado. Los 10s,512KiB y50peticiones por fase del observador de aceptación son límites de ese observador, no un SLA o una cuota comercial prometidos a otros integradores. Una respuesta SSE pública, un catálogo visible o una recuperación del cliente no habilitan eventos privados, supervisión continua ni pagos.

## Integración de lectura, un paso a la vez

1. Configurar un cliente MCP compatible y una conexión autorizada para ese proyecto. No copiar cookies, bearer tokens o enlaces de autorización de otra sesión. El piloto actual no habilita registro dinámico de cualquier cliente.
2. Consultar listTools. Si read_project_next_step no aparece, no inventarlo ni sustituirlo por una ruta interna; conservar el recorrido disponible y revisar la configuración.
3. Obtener la revisión del expediente autorizado. Solicitar el siguiente paso con expectedRevision; el proyecto y el titular del permiso los resuelve AFW, no un argumento del agente.
4. Pasar structuredContent al consumidor de referencia. Validar el resultado antes de usarlo, y conservar fecha/revisión cuando se muestre.
5. Ante conflicto, ofrecer una lectura nueva explícita. Ante retirada o vencimiento, revisar la conexión sin renovarla automáticamente.
6. Solicitar solo el dato mínimo faltante. Las respuestas y decisiones humanas deberán guardarse por una operación de escritura autorizada separada; este paquete no implementa ese guardado.

Ejemplo de llamada sobre un cliente YA conectado, usando las mismas interfaces SDK ejercitadas por los tests del repositorio:

```js
import { consumeAgentNextStep } from './examples/agent-consumer/reference-client.mjs';

// projectRef y lastKnownRevision son referencias conocidas del proyecto elegido,
// no un modo de conceder acceso al servidor.
const available = await client.listTools();
if (!available.tools.some(tool => tool.name === 'read_project_next_step')) {
  throw new Error('La herramienta de continuidad no está disponible en esta conexión.');
}
const result = await client.callTool({
  name: 'read_project_next_step',
  arguments: { expectedRevision: lastKnownRevision },
});
const decision = consumeAgentNextStep(result.structuredContent, {
  projectRef,
  expectedRevision: lastKnownRevision,
  now: Date.now(),
});
// decision.status === 'ready' permite presentar el paso como lectura fechada.
// Ningún resultado autoriza gasto, modificación o publicación.
```

El ejemplo no crea client, no autentica, no gestiona tokens y no hace reintentos. El adaptador de transporte debe imponer sus propios límites de respuesta, timeout y parsing antes de entregar structuredContent. El consumidor valida objetos JSON ordinarios; no es un sandbox de objetos Proxy hostiles ni un verificador criptográfico. Su reloj tampoco demuestra sincronización con el servidor.

## Resultados y recuperación

| Resultado | Qué hacer | Qué no inferir |
| --- | --- | --- |
| ready | Presentar el paso mientras su lectura siga vigente; explicar por qué se pide ese dato | Que el expediente fue guardado, una acción aprobada o un sitio publicado |
| revision_conflict | Ofrecer refrescar la lectura con la revisión actual | Sobrescribir cambios de otra pestaña o persona |
| source_expired / state_unconfirmed | Tratar lo anterior como histórico y pedir otra lectura autorizada | Prolongar el vencimiento o reutilizar el resultado como vigente |
| access_denied | Revisar el permiso en AFW; conservar solo contexto histórico | Que una etiqueta Conectada del cliente acredita acceso actual |
| read_unavailable | Explicar que no hubo lectura comprobable; reintento explícito y acotado si corresponde | Que un fallo de transporte es una denegación de AFW o que hay que rotar claves |
| invalid_response | No generar contexto nuevo; revisar versión/contrato | Ejecutar texto, enlaces o recovery desconocidos |

El consumidor solo produce una decisión; ninguna recuperación hace llamadas. Rechaza otros proyectos/revisiones, campos desconocidos, metadatos inválidos, fechas futuras/vencidas y flags de autoridad positivos. Admite una lectura con vigencia máxima de5000ms desde observedAt, propia del host de continuidad actual.
Las etiquetas y razones son datos: no instrucciones del sistema. No ejecutarlas como código, abrir enlaces por su contenido ni insertar HTML sin escape.

## Demo reproducible sin red

Requisitos: Node22.18+ y una copia autorizada del repositorio, preferentemente en un entorno cloud existente. No hace falta instalar dependencias adicionales para esta demo.

```sh
node examples/agent-consumer/demo.mjs
node --test test/agent-consumer-reference.test.mjs
```

La demo usa bibliotecas internas reales y datos ficticios. Emite catálogo source_only/unpriced, una cotización bloqueada con importe null, casos vigente/conflicto/vencido/retirado y contadores de bytesUTF8. No consulta una web, modelo o expediente, ni abre OAuth. Su catálogo no es una oferta de disponibilidad actual.

## Cómo mediremos utilidad y economía

El objetivo comercial es reducir costo total por trabajo útil aceptado. No basta con trasladar tokens desde el asistente a AFW.
Antes de comparar, fijar el mismo objetivo, fuentes, sitio, nivel de calidad y resultado verificable; incluir intentos fallidos, relecturas, verificaciones y trabajo humano.

| Medida | Demo actual | Ensayo real futuro |
| --- | --- | --- |
| BytesUTF8 de datos/proyección/contexto | Reproducibles, sintéticos | Registrar datos permitidos y versión del contrato |
| Llamadas, errores y latencia | No hay red ni latencia de servicio medida | Contar recorrido completo y recuperaciones |
| Tokens del consumidor y AFW | null | Usar el consumo efectivamente informado por cada proveedor/modelo |
| Costo y tiempo humano/hosting | null | Costos observados y tareas realizadas, con alcance comparable |
| Ahorro porcentual y precio comercial | No calculados | Solo publicar después de medición reproducible y política aprobada |

No hay incentivo, descuento o crédito activado por invocar la demo. Las modalidades agéntica, acompañada e híbrida seguirán diferenciando trabajo incluido, no la marca de un modelo. Las condiciones económicas deberán mostrarse antes de aceptar un encargo; consultar estado o recuperar un resultado no se convierte en cargo nuevo por inferencia.

## Próximos bloques

- Montaje de un catálogo operativo con evidencia de versión y fecha antes de declarar disponibilidad.
- Completar la aceptación alojada de la preparación ya construida: identidad y proyecto reales, registro del cliente, permiso específico, preparación/reconciliación, retirada y recuperación comprobadas. No repetir el desarrollo de fuente como si aún no existiera.
- Política de costos/precios, aceptación durable y conciliación antes de cobros.
- Primer adaptador de instalación autorizado y probado por plataforma/hosting.
- Delegación asíncrona solo cuando aviso, revisión útil y retirada tengan aceptación propia.

La demo y la guía no activan estos bloques. El incidente Container y los gates PC-off/Max se mantienen separados. Trabajo de investigación de Chavo puede alimentar decisiones comerciales; no constituye una tarifa, contrato o capacidad de runtime.

## Estado de integración revisado — 22 de octubre de2026

La tabla anterior distingue superficies y alcance; no constituye una oferta de acceso. Antes de diseñar una integración, separar estos cuatro estados:

| Estado | Qué acredita | Qué falta para avanzar |
| --- | --- | --- |
| Fuente y pruebas | Contratos y comportamiento ejercitados en Actions, con fixtures o identidad de prueba | No acredita identidad humana, disponibilidad alojada o permiso real |
| Paquete cerrado | Código compilado y perfil que impide operar por defecto | Confirmar el destino, su configuración efectiva y una recuperación compatible; un artefacto no acredita publicación |
| Ensayo propio aceptado y retirado | El recibo fechado acredita solo el recorrido y los permisos probados | Otro integrador necesita su propio cliente, proyecto, alcance y aceptación; no hereda el permiso anterior |
| Servicio disponible para ese consumidor | Exige evidencia vigente de despliegue y configuración, identidad, consentimiento y recorrido completo para ese alcance | Comprobarla en la conexión concreta antes de invocar; una etiqueta «Conectado» no sustituye esa lectura |

Para preparación existen [el servicio y su recuperación por referencia](AFW-AGENT-CAPSULE-PREPARATION-SERVICE-2026-10-19.es.md), [el montaje MCP acotado](AFW-PREPARATION-MCP-MOUNT-2026-10-20.es.md), [el token host](AFW-PREPARATION-TOKEN-HOST-2026-10-20.es.md), [las conexiones y su retirada](AFW-PREPARATION-CONNECTIONS-HTTP-2026-10-20.es.md) y [el paquete cerrado](AFW-PREPARATION-WORKER-PACKAGE-2026-10-20.es.md). Sus pruebas y recibos tienen alcances distintos; estas referencias no acreditan una apertura comercial. El [borrador interno de cliente](AFW-PREPARATION-CLIENT-DRAFT-2026-10-21.es.md) conserva proyecto y rutas concretos: no registra un cliente, no concede consentimiento ni crea una conexión.

La [continuidad operativa en issue497](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497) es la referencia para versiones, ensayos y cierres posteriores. En el [cierre del22oct](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6339654501), la autorización de ingreso sigue pendiente de correlación con soporte y Container conserva un caso separado. La lectura pública y un bloqueo403 del control WAF no prueban que funcione el flujo privado, ni la suscripción, la revisión útil, la retirada nativa o el ensayo con el ordenador apagado. No abrir OAuth ni reutilizar una ventana vencida para comprobar esta guía.

La actualización del20oct que sigue conserva su fecha y alcance; sus pendientes describen aquel paquete, no niegan el trabajo posterior.

## Actualización20oct2026: preparación y recuperación, fuente cerrada
PR524 incorporó un paquete separado de Worker y compilación con procedencia en Actions. Reutiliza el router/AS/KV/D1 aceptados y fechas originales; no tiene destino/despliegue/DDL/cliente/permiso nuevo. Esa fuente no convierte la fila de preparación en un servicio público abierto. G2 de lectura ya está cerrado; no renovar OAuth para ejecutar una demo.

El [consumidor de preparación](../examples/agent-consumer/preparation-client.mjs) acepta structuredContent + método + solicitud original. Separa borrador listo para revisión, permiso insuficiente/conflicto y resultado incierto. Ante ACK perdido conserva la MISMA revisión/clave y ofrece solo reconciliación manual. Ni preparation_not_found ni503 demuestran que una escritura no haya sucedido o que sea correcto crear otra clave.

Sus referencias no autentican proyecto/cliente ni certifican la vigencia del borrador: corresponde al transporte vincular la respuesta con la llamada real, y al servicio comprobar identidad, permisos y estado actuales. El ejemplo no implementa autenticación/transporte, no ejecuta mensajes ni devuelve autoridad de publicar/cobrar. La demo y el ledger son sintéticos/de observación, no una API/MCP/A2A de contratación.

Las [recetas por capacidad](recipes/2026-10-20/README.es.md) separan CMS/plugin/raíz/repositorio/mantenedor, con respaldo, decisión, comprobación y reversión. El [ledger de observaciones](../examples/agent-consumer/trial-ledger.mjs) mantiene costos desconocidos, fallos/reintentos y consumo informado sin inferir ahorro. No se anuncia precio, pago o instalación automática.
