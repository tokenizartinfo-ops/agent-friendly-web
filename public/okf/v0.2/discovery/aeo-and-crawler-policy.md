---
type: Policy
title: AEO y politica de crawlers
description: Decisiones separadas para descubrimiento, recuperacion y entrenamiento.
resource: https://agentfriendlyweb.dev/aeo-y-crawlers
tags:
  - agent-friendly-web
  - aeo
  - crawlers
status: stable
stale_after: 2026-12-01T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-09-02T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-09-02T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/AEO-AND-CRAWLER-POLICY.es.md
    title: AEO y politica de crawlers
    author: person:gabriel-mucchiut
    last_modified: 2026-08-27T00:00:00Z
---
# AEO y politica de crawlers

## Objetivo

Agent Friendly Web utiliza AEO para hacer mas comprensible y citable el conocimiento real de una organizacion. No reemplaza SEO: lo complementa con respuestas claras, entidades consistentes, fuentes, fechas, limites y formatos legibles por maquinas.

El responsable humano sigue siendo quien decide que contenido publicar, que crawlers permitir y que usos reservar. La plataforma registra esa intencion, la contrasta con evidencia observable y evita presentar una recomendacion como un hecho ya desplegado.

## Tres decisiones separadas

1. **Busqueda y descubrimiento:** crawlers que localizan paginas para indices o respuestas con enlaces.
2. **Recuperacion solicitada:** fetchers que consultan una pagina porque una persona se lo pidio a un asistente.
3. **Entrenamiento y otros usos generativos:** controles que cada proveedor define para mejorar modelos o productos.

Permitir una finalidad no obliga a permitir las restantes. `robots.txt` comunica preferencias voluntarias; no protege informacion privada. Autenticacion, autorizacion y controles de acceso siguen siendo necesarios.

## Implementacion actual

- `/aeo-y-crawlers`: explicacion humana, comparacion SEO/AEO/agent-ready, matriz y limites.
- `/.well-known/crawler-policy-catalog.json`: contrato `crawler-policy-catalog.v1` para agentes.
- `/llms.txt`, `/llms-full.txt`, AI Catalog, sitemap y mapa del sitio enlazan los recursos.
- El catalogo diferencia user agents, fetchers y tokens de control como `Google-Extended`.

## Medicion prevista

Cada intervencion futura conservara una linea de base, cambios aplicados, fecha, fuentes, respuestas observadas y limitaciones. El reporte puede mostrar mejora de claridad o descubrimiento, pero no atribuye automaticamente ranking, trafico, conversion o recomendacion a un cambio aislado.
