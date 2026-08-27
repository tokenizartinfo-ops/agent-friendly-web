---
type: Service
title: Frontera del comparador de evidencia
description: Comparacion local antes y despues sin promesas de ranking o recomendacion.
resource: https://agentfriendlyweb.dev/medir-mejora
tags:
  - agent-friendly-web
  - comparison
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
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/BLOCK-2-SECTOR-MULTILINGUAL-MEASUREMENT.es.md
    title: Contrato de comparacion de evidencia
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
---
# Frontera del comparador de evidencia

## Comparacion

`readiness-comparison.v1` compara dos snapshots limitados a 0-100, cantidad de evidencias y fecha. El prototipo es local y no persistente. Los valores ingresados manualmente no se convierten en observaciones verificadas.

Una comparacion valida para un informe debe conservar:

1. mismo dominio y version de metodologia;
2. fecha UTC;
3. URLs y estados observados;
4. cambio implementado y referencia de version;
5. limites y evidencia pendiente.

No garantiza indexacion, ranking, recomendacion, trafico ni una respuesta identica de un modelo.
