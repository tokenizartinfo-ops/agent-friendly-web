# AFW: consumo agéntico integrado — diseño del primer bloque

Fecha: 19 de octubre de 2026.
Estado: propuesta escrita para revisión; Gabriel aprobó la dirección y el alcance del primer bloque en el chat AFW. Este documento no acredita implementación, tarifa, pago, permisos nuevos ni apertura comercial.
Base examinada: `45f97c1de6b1f4d22d4d99035419b27345440390`, repositorio `tokenizartinfo-ops/agent-friendly-web`.

## Propósito y alcance

Ampliar el mismo AFW para que personas, empresas y agentes externos utilicen su infraestructura. Web, API, MCP y A2A deberán compartir expedientes, versiones, decisiones y comprobaciones. Una empresa con su propio agente podrá acceder a la modalidad agéntica bajo las mismas condiciones de servicio que otros integradores.

El primer bloque define contratos de catálogo, cotización previa y continuidad. Su implementación inicial será una biblioteca interna pura, sin montar endpoints, efectuar cobros, crear expedientes, ejecutar modelos, consultar sitios ni publicar archivos. Los nombres de operaciones siguientes son identificadores de diseño; no son herramientas o rutas actualmente disponibles.

No comprende instalación automática, credenciales de hosting, ledger de cobros, proveedor de pagos, nuevas suscripciones, guardia permanente ni activación de clientes. Cada tramo posterior tendrá diseño y aceptación propios, dentro del mismo producto.

## Reutilización comprobada en fuente

| Base existente | Reutilización prevista | Límite |
| --- | --- | --- |
| `lib/public-mcp.mjs`, `lib/public-mcp-server.mjs`, `public/openapi.json` | Diagnóstico, metodología, perfiles y verificación pública ya definidos | No exponen todo el expediente ni habilitan mutaciones |
| `lib/delegated-project-mcp.mjs` | Resumen y evidencias con identidad y alcance resueltos por servidor | Lectura delegada; su permiso no habilita escritura, supervisión o pago |
| `lib/public-a2a-card.mjs` | Punto de entrada A2A de diagnóstico | La tarjeta actual excluye tareas reanudables y callbacks |
| `lib/publication-capsule.mjs`, `lib/capsule-outcome.mjs` | Cápsulas, manifiesto, decisiones y comparación fechada | Preparar/aprobar no acredita publicar; coincidencia de contenido no demuestra igualdad de bytes |
| `lib/delivery-plan.mjs` y documentación de entrega | Responsables, método y restricciones | Un plan declarado no confirma acceso al hosting |

Estas son referencias a fuente y recibos históricos; el catálogo operativo futuro necesitará comprobar su propio despliegue vigente antes de declarar una operación disponible. No promover capacidades de código por una inferencia.

## Diseño elegido y alternativas

Elegido: núcleo de dominio compartido con adaptadores por protocolo. Conserva el mismo estado y evita implementar facturación, decisiones o versiones de manera diferente en web y agentes.

Un catálogo de archivos solamente permite descubrir entregables pero deja sin resolver la continuidad del encargo. Un ejecutor genérico con acceso amplio a hosting amplía demasiado el alcance y no es el primer bloque. La evolución elegida añade capacidades pequeñas y comprobables al núcleo existente.

## Catálogo propuesto

Operaciones lógicas de este bloque:

- `afw.catalog.describe`: describir capacidades, límites y condiciones económicas.
- `afw.quote.preview`: preparar una cotización indicativa desde descriptores ya autorizados; no acepta ni reserva trabajo.
- `afw.dossier.next_step`: proyectar el siguiente paso desde una vista interna autorizada del expediente; no realiza lecturas por sí misma.

Cada entrada de catálogo deberá incluir `operationId`, `contractVersion`, propósito, entradas y salida esperadas, efectos, requisitos de identidad/consentimiento, límites de recursos, unidad económica, estado de disponibilidad y referencia de evidencia con fecha. Información privada y referencias de custodia nunca aparecerán en el catálogo público.

Disponibilidad y precio son ejes independientes. Estados de disponibilidad: `planned`, `source_only`, `verified_runtime`, `temporarily_unavailable`, `retired`. Solo `verified_runtime` con evidencia vigente permite ofrecer ejecución. Estados económicos: `unpriced`, `explicitly_free`, `quoted`. La ausencia de tarifa siempre significa `unpriced`, nunca precio cero.

## Cotización propuesta

Entrada: operación, versión, modalidad de servicio, descriptores de alcance y revisión; contexto autorizado aportado por el host y una política de precios interna versionada. No admite que el agente establezca propietario, tarifa, descuento, impuesto o privilegio mediante texto libre.

Salida: estado, operación/versión, hash del alcance normalizado, revisión de catálogo, revisión de política de precios, moneda y exponente monetario explícitos, líneas de importe, total, plazo de validez y requisitos pendientes. La cotización indicativa siempre lleva `executionAllowed=false`, `chargeAllowed=false` y `publicationAllowed=false`.

Reglas:

1. Sin política aprobada o con operación sin precio: `pricing_unavailable`, total nulo y ninguna autorización. Un fixture de precio no es una tarifa comercial.
2. La modalidad agéntica reduce trabajo humano incluido; la modalidad acompañada lo declara como una línea propia. La marca del modelo o el hecho de ser una persona no determina por sí solo la tarifa.
3. Los importes se representan en unidades menores enteras con moneda/exponente configurados; no asumir dos decimales para todas las monedas. Cantidades inválidas, incompatibles o fuera del rango entero seguro se rechazan.
4. Toda diferencia entre alcance, versión, evidencia necesaria o política de precios exige revisar la cotización. Un ahorro o descuento se muestra por separado, con regla y vigencia.
5. La futura aceptación durable deberá ligar identidad contratante, proyecto, alcance, importe máximo y vencimiento. No se implementa en este bloque ni puede sustituirse por una respuesta del modelo.
6. Autorizar gasto, aportar datos, aprobar contenido y permitir publicación son decisiones distintas. Ninguna se deriva automáticamente de las otras.
7. La previsualización de este bloque es cálculo puro: no activa análisis remoto costoso ni una operación facturable por consultar una cotización.

Proveedor, monedas comerciales y valores se seleccionarán tras medición de costo y compatibilidad. Hasta entonces el estado operativo económico seguirá sin precio y sin cobro; no se publican importes ilustrativos como oferta.

## Continuidad propuesta

La proyección recibe una vista ya resuelta por el servidor: referencia opaca de expediente, revisión, referencias de propuesta/cápsula si existen, datos pendientes y decisiones vigentes. El adaptador futuro hará la lectura autenticada; la biblioteca pura no autentica ni concede acceso.

La respuesta contiene estado conocido, fecha/revisión, un siguiente paso con su motivo, dato mínimo faltante y referencias a evidencia autorizada. Los campos desconocidos permanecen pendientes. Una vista vencida o un conflicto de revisión exige refrescar; no inventa campos ni confirma guardados.

El contrato deberá permitir obtener un resumen y ampliar una sección bajo demanda. El acceso a cada detalle se revalidará en el servidor. Las políticas de reuso privado incluirán identidad, proyecto, alcance y vigencia; un hash coincidente no permite compartir datos entre clientes ni omitir una retirada.

## Economía e incentivos

Objetivo a comprobar: menor costo total por encargo aceptado. Contabilizar procesamiento AFW, tokens del consumidor, llamadas, persistencia, verificación, soporte y tiempo humano; incluir costo de actualización de recetas por plataforma. No atribuir ahorro global por ocultar procesamiento dentro de AFW.

Beneficios a diseñar: contexto resumido, consulta incremental, reuso vigente, referencias estables y operaciones por trabajo útil. Descuentos o créditos por volumen/reuso deberán tener reglas públicas, límites y cuenta contratante identificada; no se activan por este documento.

La política futura distinguirá replay idéntico de trabajo nuevo. Una clave repetida con el mismo alcance deberá recuperar el resultado/cargo original; con otro alcance deberá rechazar conflicto. Ante resultado de cobro desconocido se conciliará antes de otro intento. Estas garantías necesitan persistencia y pruebas en el bloque económico posterior; A2A por sí solo no asegura deduplicación de cobros.

No se cobrarán nuevamente estados/reintentos como si fueran trabajos nuevos. Un nuevo análisis solicitado o un cambio legítimo de alcance podrá requerir nueva cotización explícita. El precio por trabajo y la asistencia adicional estarán visibles antes de aceptar.

## A2A, MCP y pagos

A2A coordinará encargos y artefactos cuando AFW implemente y pruebe esas capacidades; MCP expondrá operaciones específicas. Ambos adaptadores deberán mapear el mismo contrato interno y declarar versiones/capacidades realmente compatibles. La cancelación de una tarea, la retirada de un permiso y la baja de una suscripción son operaciones diferentes.

La futura capa de pagos se integrará con un proveedor adecuado para servicios AFW y mantendrá separados estado del trabajo y estado económico. El cliente podrá necesitar un checkout propio de AFW. No asumir elegibilidad de cobro dentro de ChatGPT: la documentación oficial consultada hoy limita la aprobación del checkout de plugins a bienes físicos. Tampoco asumir disponibilidad de un medio de pago por existir un estándar.

## Aceptación del primer bloque a implementar

Criterios todavía NO ejecutados en este documento:

| Caso | Resultado requerido |
| --- | --- |
| Operación existente en código sin prueba de despliegue vigente | No presentarla como disponible para ejecutar |
| Política de precios ausente o vencida | Cotización sin precio; sin cargo ni ejecución |
| Política de prueba con moneda/exponente y alcance válidos | Cálculo determinista exacto; sin IO o autorización |
| Importe, cantidad o revisión incompatibles | Error estructurado; sin valor parcial presentado como válido |
| Solicitud de publicación incluida en una operación de preparación | Rechazo del alcance; no convertirla en permiso |
| Proyección sin identidad resuelta o con revisión incompatible | No revelar contenido; pedir recuperación autorizada |
| Resumen suficiente para el siguiente paso | Una acción breve y detalles referenciados, sin expediente completo |
| Dos modalidades con distinto trabajo incluido | Diferencia económica explicada por líneas y alcance |

En la implementación se comprobarán falta de política, expiración, revisiones cambiadas, límites de importes y ausencia de IO con fixtures sintéticos. El plan de implementación fijará firmas, límites exactos y comandos de prueba antes de codificar. Ninguna de estas filas acredita una prueba realizada.

## Etapas siguientes del mismo roadmap

1. Contratos y biblioteca pura de catálogo/cotización/proyección; sin endpoints o efectos.
2. Adaptador de lectura/continuidad autorizado, reutilizando el expediente y la lectura delegada; aceptación por cliente/protocolo.
3. Preparación de borradores/cápsulas con permisos de escritura específicos y revisión optimista.
4. Política económica y aceptación durable, conciliación de cargos e integración de pago elegible.
5. Primer adaptador real de instalación con copia recuperable, aplicación acotada y verificación.
6. Delegación asíncrona y supervisión cuando suscripción, recepción útil, retirada y cierre tengan aceptación propia.

Las etapas2–6 no quedan implementadas ni autorizadas operativamente por la creación de este documento. El incidente privado de Containers y el ensayo PC-off mantienen sus gates independientes; diseñar este bloque no requiere reabrirlos.

## Ejecución con mínimo uso del ordenador

Este documento y su enlace comercial se editan por API en GitHub, en rama de documentación aislada desde la base examinada. No se crean clones, paquetes, imágenes o dependencias en el PC. Las futuras verificaciones usarán GitHub Actions existente; una tarea Codex/Chavo requerirá comprobar su entorno específico antes de ejecutarla. Trabajo remoto en repositorio no equivale a una guardia autónoma permanente.

Reversión documental: cerrar la propuesta sin fusionar o revertir su commit mediante otra revisión. Preservar main, historial, evidencia única, secretos y material de rollback. No alterar workflows, permisos o facturación por una preferencia de ejecución cloud.

## Fuentes y revisión

- Visión, modalidades y prioridad de recursos: instrucciones directas de Gabriel en este chat,19oct2026.
- [Plan comercial vigente](../../AFW-COMMERCIAL-OPERATING-PLAN-2026-10-18.es.md).
- [Cápsulas y evolución de entrega](../../A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md).
- [OpenAI: descubrimiento y evaluación de metadata](https://developers.openai.com/plugins/guides/optimize-metadata).
- [OpenAI: monetización y límites actuales de checkout](https://developers.openai.com/plugins/build/monetization).
- [A2A: especificación, tareas, capacidades e idempotencia](https://a2a-protocol.org/latest/specification/).

Las fuentes oficiales se consultaron19oct2026. Los identificadores de contrato AFW aquí propuestos no son extensiones estándar ni capacidades publicadas. La propuesta queda lista para revisar antes de fijar el plan técnico; no afirma ahorro, demanda pagada o recomendación por modelos.
