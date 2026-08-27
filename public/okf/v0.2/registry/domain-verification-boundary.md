---
type: Policy
title: Frontera de verificacion de dominio
description: Que acredita un challenge publico y que permisos no concede.
resource: https://agentfriendlyweb.dev/registry
tags:
  - agent-friendly-web
  - domain-verification
  - security
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
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/SPECIFICATION.es.md
    title: Especificacion funcional y tecnica v1
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
  - id: source-2
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/SECURITY.md
    title: Seguridad y fronteras publicas
    author: agent-friendly-web/editorial-v1
    last_modified: 2026-08-27T00:00:00Z
---
# Frontera de verificacion de dominio

### 3.4 Verificacion de dominio

1. El owner guarda un sitio valido en su expediente.
2. Elige archivo HTTP o registro TXT DNS y crea un challenge separado del autosave.
3. El sistema muestra instrucciones copiables y un vencimiento.
4. La comprobacion usa acceso publico read-only y limita los intentos.
5. El resultado acredita control temporal del dominio, no permiso de escritura ni propiedad juridica.

## Fronteras del Registry y del expediente

- El escaner publico continua siendo read-only y no persiste resultados.
- Guardar una observacion requiere sesion, propiedad del expediente y `confirmSave: true`.
- La observacion persistida conserva URL normalizada, fecha, evidencia booleana, puntuacion y metadata tecnica limitada. Descarta cuerpos, errores crudos, stacks, cookies y cabeceras sensibles.
- La verificacion de dominio prueba control temporal mediante archivo HTTP o TXT DNS. No entrega acceso al hosting, CMS, DNS ni codigo.
- Los challenges vencen, no pueden reutilizarse y fallan cerrados tras diez intentos.
- Publicar exige dominio vigente, coincidencia exacta del hostname, contrato `agentfriendly.owner-attestation.v1` y `confirmPublicProjection: true`.
- El perfil publico se construye desde una proyeccion allowlisted. Emails operativos, notas internas y campos privados no forman parte del contrato publico.
- Cada publicacion crea una version nueva. Las versiones publicadas son inmutables; la version anterior queda superseded pero puede conservarse como evidencia historica.
- Un perfil incorporado como caso curado no puede ser reemplazado por un registro D1 con el mismo slug.
