# AFW para integradores de agentes

19 de octubre de2026. Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web.

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
| Preparación con escritura, instalación y pagos | borradores/cápsulas, aceptación durable, adaptadores de hosting | Roadmap: no hay permiso de ejecución por estas filas. |
| Eventos privados y supervisión cloud | aviso, revisión útil y baja nativa | Aceptación pendiente; no anunciar guardia permanente ni operación PC-off desde G2. |

Los identificadores afw.* son nombres del dominio interno. No se invocan como si fueran nombres MCP publicados.
Fuentes: [diseño aprobado](superpowers/specs/2026-10-19-afw-agent-consumption-design.md), [contratos](AFW-AGENT-CONSUMPTION-CONTRACTS-2026-10-19.es.md), [A2A público](AFW-A2A-PUBLIC-RELEASE-2026-10-02.es.md), [recibo G2](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6275545264).
Una constancia histórica no garantiza disponibilidad ahora. Este documento no contiene un catálogo operativo con vigencia renovable.

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
- Preparación de borradores/cápsulas con identidad, alcance de escritura, revisión optimista, idempotencia, auditoría y rollback propios.
- Política de costos/precios, aceptación durable y conciliación antes de cobros.
- Primer adaptador de instalación autorizado y probado por plataforma/hosting.
- Delegación asíncrona solo cuando aviso, revisión útil y retirada tengan aceptación propia.

La demo y la guía no activan estos bloques. El incidente Container y los gates PC-off/Max se mantienen separados. Trabajo de investigación de Chavo puede alimentar decisiones comerciales; no constituye una tarifa, contrato o capacidad de runtime.
