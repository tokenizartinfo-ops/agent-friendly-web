# Metodologia Agent Friendly Web v1

Autor: Gabriel Mucchiut.

## Alcance

El metodo organiza una transformacion tecnica y editorial. La puntuacion sirve para priorizar y comparar mediciones del mismo sitio a lo largo del tiempo. No certifica calidad comercial, seguridad integral, posicionamiento AEO ni recomendacion por parte de una LLM.

## Capas y ponderacion

| Capa | Peso | Evidencia principal |
| --- | ---: | --- |
| Descubrimiento y rastreo | 20 | `robots.txt`, sitemap y enlaces de descubrimiento |
| Contenido listo para respuestas | 20 | JSON-LD y respuestas directas consistentes |
| Contenido legible por agentes | 15 | `llms.txt` y negociacion Markdown validada |
| APIs y herramientas | 20 | OpenAPI, MCP y skills con contratos observables |
| Interaccion web experimental | 10 | WebMCP declarado y distinguido como borrador |
| Identidad, evidencia y gobierno | 10 | autoria, fuentes, responsables y fechas |
| Comercio agentico | 5 | mecanismos de pago documentados y verificables |

## Niveles

- **AF-0 Invisible (0-17):** no hay señales suficientes.
- **AF-1 Descubrible (18-35):** rastreo basico y localizacion de contenidos.
- **AF-2 Legible (36-53):** contenido estructurado y apto para respuestas.
- **AF-3 Herramientas (54-71):** contratos publicos para APIs, MCP o skills.
- **AF-4 Delegable (72-89):** identidad, permisos, auditoria y acciones acotadas.
- **AF-5 Transaccional (90-100):** operaciones y pagos con controles completos.

## Reglas de evidencia

1. Un codigo HTTP exitoso no basta: se verifica tipo y contenido.
2. Una ruta declarada en documentacion pero ausente en produccion no puntua.
3. Un desarrollo en rama, staging o release candidate se informa por separado.
4. Las herramientas privadas no se infieren desde la interfaz publica.
5. Las recomendaciones no aumentan la puntuacion hasta que se implementen y vuelvan a medir.

## Diagnosticos auxiliares

La implementacion 0.2 agrega observaciones que no modifican el puntaje AF v1: Content Signals, grupos explicitos de crawlers de IA, API Catalog, catalogo publico de recursos, Agent Skills index y la ruta vigente de MCP server card. Se informan por separado hasta que una version futura del metodo defina ponderaciones y permita comparar una ventana de calibracion suficiente.

Un catalogo de proyecto debe declarar que no es un estandar oficial. Una ruta MCP, OpenAPI o skill solo se considera capacidad cuando su contenido es valido y el servicio o artefacto enlazado existe.

## Estado de tecnologias

- `robots.txt`, sitemap, Schema.org/JSON-LD y OpenAPI son bases estables.
- MCP 2026-07-28 es la especificacion vigente utilizada como referencia en esta version.
- A2A 1.0 es la referencia para futura comunicacion entre agentes. Una Agent Card solo cuenta cuando describe un servicio real y accesible.
- `llms.txt` es una propuesta comunitaria; puede ayudar a orientar, pero no obliga a los crawlers.
- WebMCP es un borrador de W3C Community Group y no una recomendacion W3C.
- x402 y MPP son mecanismos emergentes para pagos agenticos; su presencia no reemplaza controles legales, comerciales y de seguridad.
- Un manifiesto propio, un catalogo de recursos o una insignia deben declarar que son convenciones del proyecto y no normas oficiales.

## Revision

Cada informe debe conservar: URL, fecha UTC, version del metodo, recursos consultados, codigos HTTP, evidencia detectada, limites y hash/export cuando se publique como artefacto.
