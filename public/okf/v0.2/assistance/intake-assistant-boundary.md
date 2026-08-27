---
type: Service
title: Frontera del asistente de intake
description: Prototipo determinista que ordena texto y exige seleccion humana.
resource: https://agentfriendlyweb.dev/asistente
tags:
  - agent-friendly-web
  - intake
  - human-in-the-loop
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
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/BLOCK-3-INTAKE-ASSISTANT-CONTRACT.es.md
    title: Contrato del asistente de intake
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
---
# Frontera del asistente de intake

## Objetivo

Permitir que una persona describa su organizacion con datos incompletos o desordenados y reciba propuestas separadas por campo. El humano decide que conservar antes de copiar o usar el resultado.

## Limites de esta version

- procesamiento determinista en el navegador;
- campos allowlisted;
- deteccion fail-closed de credenciales probables;
- fragmento de origen y confianza por propuesta;
- seleccion humana obligatoria;
- sin modelo externo, persistencia, expediente, email, voz, pagos ni mutacion del sitio.

## Evolucion controlada

1. validar utilidad y falsos positivos con personas;
2. versionar idiomas y taxonomias;
3. agregar preview de diferencias contra el expediente;
4. pedir consentimiento field-scoped;
5. guardar solo campos elegidos en un endpoint autenticado e idempotente;
6. incorporar voz o correo mediante contratos y retencion separados.

Copiar una propuesta no equivale a publicarla ni a autorizar una implementacion.
