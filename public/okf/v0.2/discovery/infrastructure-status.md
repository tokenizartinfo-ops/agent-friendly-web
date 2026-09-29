---
type: Reference
title: Infraestructura y piloto privado de Agent Friendly Web
description: Observaciones fechadas, alcance privado y limites del piloto reducido.
resource: https://agentfriendlyweb.dev/.well-known/infrastructure-status.json
tags:
  - agent-friendly-web
  - infrastructure
  - cloudflare
  - provenance
status: stable
stale_after: 2026-09-21T00:00:00Z
generated:
  by: process:afw-infrastructure-ledger
  at: 2026-09-14T00:00:00Z
verified:
  - by: process:afw-infrastructure-ledger-review
    at: 2026-09-14T00:00:00Z
sources:
  - id: source-1
    resource: https://agentfriendlyweb.dev/.well-known/infrastructure-status.json
    title: AFW infrastructure observation 2026-09-14
    author: organization:agent-friendly-web
    last_modified: 2026-09-14T00:00:00Z
---
# Infraestructura y piloto privado

## Estado observado: 2026-09-14

El origen canonico es https://agentfriendlyweb.dev. Cloudflare Workers sirve el sitio publico y el expediente privado. Cloudflare Access conserva una lista limitada de cuentas autorizadas; el piloto no abre el registro comercial.

El expediente permite guardar contexto, revisar conflictos soportados y preparar, comparar, rechazar y descargar capsulas. La verificacion del dominio no autoriza por si sola una instalacion. Las capsulas sinteticas de QA no son entregables aprobados para un sitio real.

## Evidencia y limites

Se verifico recuperacion tras cierre explicito de sesion, reingreso y guardado. No se espero el vencimiento natural del TTL. Los conflictos de campos no soportados requieren asistencia y bloquean la escritura.

La base contiene datos de pruebas persistidos; no se publico un recuento nuevo. Las afirmaciones historicas de cero filas, seis migraciones o unica cuenta canary no deben extrapolarse al estado actual.

Release utiliza el mismo Worker y base productiva, no una base aislada. La regla temporal que fijaba su version esta deshabilitada. Canary es un entorno distinto: sus mediciones historicas conservan su propia fecha.

Pagos, correo comercial, instalacion remota y vinculacion CRM ampliada no estan habilitados en este piloto. No se declara el lanzamiento comercial ni AF-5 por haber completado estas pruebas.

## Siguiente etapa

Validar el recorrido asistido de un cliente y resolver las pruebas remotas de CRM antes de reintroducir esa vinculacion. No confundir estado documentado con monitorizacion continua.

## Separacion de proyectos y recuperacion

Tokenizart es un caso de referencia, no el runtime de AFW. Companion, Copilot, Atelier y Owner Live pertenecen a Tokenizart y no comparten esta autorizacion.

Sites esta retirado y no es un destino de recuperacion. Se conserva la version anterior del Worker para rollback de codigo; no se afirma una restauracion integral de base de datos.
