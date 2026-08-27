---
type: Methodology
title: Evidencia y puntuacion
description: Ponderaciones, reglas y diagnosticos auxiliares del auditor.
resource: https://agentfriendlyweb.dev/metodologia
tags:
  - agent-friendly-web
  - evidence
  - scoring
status: stable
stale_after: 2026-11-25T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-08-27T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-08-27T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/METHODOLOGY.es.md
    title: Metodologia Agent Friendly Web v1
    author: person:gabriel-mucchiut
    last_modified: 2026-08-27T00:00:00Z
---
# Evidencia y puntuacion

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

## Reglas de evidencia

1. Un codigo HTTP exitoso no basta: se verifica tipo y contenido.
2. Una ruta declarada en documentacion pero ausente en produccion no puntua.
3. Un desarrollo en rama, staging o release candidate se informa por separado.
4. Las herramientas privadas no se infieren desde la interfaz publica.
5. Las recomendaciones no aumentan la puntuacion hasta que se implementen y vuelvan a medir.

## Diagnosticos auxiliares

La implementacion 0.2 agrega observaciones que no modifican el puntaje AF v1: Content Signals, grupos explicitos de crawlers de IA, API Catalog, catalogo publico de recursos, Agent Skills index y la ruta vigente de MCP server card. Se informan por separado hasta que una version futura del metodo defina ponderaciones y permita comparar una ventana de calibracion suficiente.

Un catalogo de proyecto debe declarar que no es un estandar oficial. Una ruta MCP, OpenAPI o skill solo se considera capacidad cuando su contenido es valido y el servicio o artefacto enlazado existe.
