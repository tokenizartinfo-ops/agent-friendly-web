---
type: Methodology
title: Metodo Agent Friendly Web
description: Alcance, reglas de evidencia y revision de la metodologia publica.
resource: https://agentfriendlyweb.dev/metodologia
tags:
  - agent-friendly-web
  - methodology
  - evidence
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
# Metodo Agent Friendly Web

## Alcance

El metodo organiza una transformacion tecnica y editorial. La puntuacion sirve para priorizar y comparar mediciones del mismo sitio a lo largo del tiempo. No certifica calidad comercial, seguridad integral, posicionamiento AEO ni recomendacion por parte de una LLM.

## Reglas de evidencia

1. Un codigo HTTP exitoso no basta: se verifica tipo y contenido.
2. Una ruta declarada en documentacion pero ausente en produccion no puntua.
3. Un desarrollo en rama, staging o release candidate se informa por separado.
4. Las herramientas privadas no se infieren desde la interfaz publica.
5. Las recomendaciones no aumentan la puntuacion hasta que se implementen y vuelvan a medir.

## Revision

Cada informe debe conservar: URL, fecha UTC, version del metodo, recursos consultados, codigos HTTP, evidencia detectada, limites y hash/export cuando se publique como artefacto.
