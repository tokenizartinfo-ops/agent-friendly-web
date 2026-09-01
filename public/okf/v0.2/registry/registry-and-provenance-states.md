---
type: Reference
title: Registry y estados de procedencia
description: Separacion entre declaraciones owner, observaciones y control de dominio verificado.
resource: https://agentfriendlyweb.dev/registry
tags:
  - agent-friendly-web
  - registry
  - provenance
status: stable
stale_after: 2026-11-30T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-09-01T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-09-01T00:00:00Z
sources:
  - id: source-1
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/SPECIFICATION.es.md
    title: Especificacion funcional y tecnica v1
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
  - id: source-2
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/39acfeeecc9f39911d2a5467893c36dc2223e253/docs/SECURITY.md
    title: Seguridad y fronteras publicas
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-09-01T00:00:00Z
---
# Registry y estados de procedencia

### 3.5 Observacion privada y publicacion

1. El escaner publico no almacena resultados.
2. El owner puede ordenar una auditoria fechada y saneada con `Auditar y guardar observacion`.
3. Declaraciones y observaciones conservan procedencia separada.
4. Antes de publicar se muestra la proyeccion exacta y se exige confirmacion expresa.
5. El Registry crea una version inmutable en HTML, JSON y Markdown.
6. Actualizar el expediente privado no modifica automaticamente un perfil ya publicado.

## 5. Modelo de persistencia

`site_projects` conserva el expediente actual del usuario. `project_events` registra creacion y actualizaciones con metadata minima: tipo, fecha, campos presentes y porcentaje de completitud. No registra secretos ni el contenido completo de cada cambio.

`registry_sites` conserva la identidad normalizada del sitio. `domain_claims` registra challenges de vida corta e intentos. `scan_observations` conserva auditorias saneadas iniciadas expresamente por el owner. `owner_attestations` conserva la autorizacion de la proyeccion publica y `public_profiles` sus versiones inmutables. La visibilidad privada es el estado inicial.

## 6. Salidas actuales de Bloque 1

- auditor publico no persistente;
- expediente privado progresivo;
- verificacion de dominio por archivo HTTP o TXT DNS;
- observacion privada, fechada y saneada;
- Registry publico con perfiles HTML, JSON y Markdown versionados;
- primer perfil curado: Tokenizart, con Atelier identificado como plataforma operativa separada.

## Evidencia y afirmaciones

El Registry separa tres estados:

- `owner_declared`: afirmado y autorizado por el responsable;
- `observed`: comprobado en una fuente publica fechada;
- `verified`: control del dominio comprobado por un challenge vigente.

Ninguno de estos estados certifica indexacion, recomendacion, posicionamiento, seguridad integral ni adopcion por un proveedor de IA.
