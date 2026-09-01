---
type: Case Study
title: Tokenizart como primer caso integral
description: Linea de base, activos y roadmap verificable del primer caso publico.
resource: https://agentfriendlyweb.dev/casos/tokenizart
tags:
  - agent-friendly-web
  - tokenizart
  - case-study
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
    resource: https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e53166e/docs/TOKENIZART-CASE-2026-08-26.md
    title: "Caso Tokenizart: auditoria y transformacion agent-friendly"
    author: person:gabriel-mucchiut
    last_modified: 2026-08-27T00:00:00Z
---
# Tokenizart como primer caso integral

## 1. Objetivo

Tokenizart es el primer caso integral del metodo Agent Friendly Web. La meta no es sumar archivos aislados ni obtener una puntuacion cosmetica: es hacer que humanos, buscadores y agentes puedan descubrir, comprender, citar y, cuando corresponda, usar herramientas reales con limites claros.

El caso se publica y sigue en `https://agentfriendlyweb.dev/casos/tokenizart`. Esta atribucion permite verificar que plataforma, metodologia y responsables acompañan la transformacion. No constituye certificacion oficial, garantia de indexacion ni permiso para consultar informacion privada.

El Registry agrega una segunda representacion verificable en `https://agentfriendlyweb.dev/registry/tokenizart`, con formatos JSON y Markdown para agentes. El perfil inicial es un caso curado y aprobado por el fundador: no sustituye una futura verificacion DNS de `tokenizart.com`, no publica datos owner y conserva sus fuentes y limites.

La arquitectura debe comunicar una diferencia esencial:

- `tokenizart.com` presenta la identidad, filosofia, servicios, conocimiento y acceso al ecosistema;
- **Atelier es la plataforma operativa de Tokenizart**, donde un usuario autenticado prepara obras u objetos unicos, revisa sus datos y realiza las acciones habilitadas para su cuenta;
- `tokenizart-agentic` versiona CLI, contratos MCP, skills y exportaciones OKF;
- Owner Live es una frontera privada, read-only, con identidad, consentimiento, scopes y auditoria, separada del descubrimiento publico.

## 2. Resultado inicial reproducible

### Auditor Agent Friendly Web

| Superficie | Puntaje AF v1 | Nivel | Evidencia principal |
| --- | ---: | --- | --- |
| `https://tokenizart.com/` | 23/100 | AF-1 descubrible | `robots.txt` y sitemap presentes; sin `llms`, JSON-LD, Markdown negociado ni herramientas publicadas en el origen |
| `https://atelier.tokenizart.com/` | 14/100 | AF-0 invisible | `robots.txt` presente; sin sitemap, `llms`, JSON-LD ni catalogos publicos |
| Agent Friendly Web | 63/100 | AF-3 herramientas | auditor, sitemap, `llms`, OpenAPI y skill publicos; faltaban catalogos y politica Content Signals |

Estos puntajes son una fotografia. El metodo mantiene la puntuacion original para poder demostrar el progreso con la misma regla.

### Auditor externo de Cloudflare

El 2026-08-26, `isitagentready.com` clasifico:

- Tokenizart como **Level 1 - Basic Web Presence**;
- Atelier como **Level 0 - Not Ready**;
- Agent Friendly Web como **Level 1 - Basic Web Presence**.

El resultado externo confirma la direccion general del auditor propio, aunque utiliza otra escala y otros checks. No debe mezclarse un puntaje con el otro.

### Reauditoria externa de Tokenizart del 2026-08-30

Una nueva consulta directa a `https://isitagentready.com/api/scan` clasifico `https://tokenizart.com` como **Level 1 - Basic Web Presence**. La respuesta del proveedor no incluyo un puntaje numerico, por lo que no se inventa ni deriva uno.

Pasaron `robotsTxt`, `sitemap` y `robotsTxtAiRules`. Fallaron `linkHeaders`, `dnsAid`, `markdownNegotiation`, `contentSignals`, `apiCatalog`, `oauthDiscovery`, `oauthProtectedResource`, `authMd`, `mcpServerCard`, `a2aAgentCard`, `agentSkills`, `webMcp` y `ard`. Los checks comerciales fueron informativos o neutrales.

Esto fija la prelacion del caso Tokenizart:

1. publicar verdad y descubrimiento basico en `tokenizart.com`: Content Signals, archivos `llms`, cabeceras y catalogos;
2. publicar solo las skills, OpenAPI y tarjetas que correspondan a recursos reales y mantenibles;
3. tratar Markdown, ARD y WebMCP read-only como mejoras verificables;
4. conservar DNS, OAuth, A2A y pagos detras de gates propios, sin simular capacidades para aumentar el nivel externo.

### Resultado post despliegue de Agent Friendly Web v2

Despues de publicar Content Signals, Link headers, Agent Skills index, catalogo de recursos y API Catalog:

- el primer corte post despliegue llevo el auditor AF v1 de 63/100 a 65/100;
- el auditor externo paso de Level 1 a **Level 2 - Bot-Aware**;
- el siguiente requisito externo identificado es negociacion `Accept: text/markdown`.

### Resultado Agent Friendly Web v3

El 2026-08-26, luego de publicar la primera capa agent-native completa y repetir la auditoria sobre el dominio canonico:

- el auditor AF v1 alcanzo **70/100, AF-3 herramientas**;
- respondieron HTTP 200 la portada, demostrador de evolucion, `robots.txt`, sitemap, `llms.txt`, `llms-full.txt`, OpenAPI, API Catalog, AI Catalog, indice de skills, manifiesto de readiness y `security.txt`;
- `/expediente` permanecio cerrado y redirigio a autenticacion;
- `Accept: text/markdown` continuo devolviendo HTML, por lo que Markdown for Agents sigue pendiente;
- MCP, A2A, CLI y x402 se conservan como capacidades futuras o experimentales y no se presentan como servicios activos.

La mejora es evidencia de que el proceso funciona. No se agrega una respuesta falsa para alcanzar otro nivel, y el puntaje no implica indexacion, recomendacion ni certificacion de terceros.

### Crawlers observados

Pruebas publicas con user agents de OpenAI, Anthropic, Perplexity, Google, Apple, Amazon, Meta, Cohere y Common Crawl devolvieron HTTP 200 para el inicio y `robots.txt` de Tokenizart y Atelier. Esto demuestra accesibilidad HTTP en la prueba, no indexacion, recomendacion ni uso garantizado por esos proveedores.

## 5. Activos agenticos existentes

El repositorio publico `tokenizart-agentic` contiene CLI read-only, contratos MCP, skills y exportaciones OKF en estado **release candidate**. Es evidencia del trabajo tecnico, pero no equivale a endpoints productivos en `tokenizart.com`.

La politica de publicacion es:

1. publicar documentos y manifests que describan con exactitud el estado;
2. versionar contratos y artefactos;
3. verificar endpoint, ownership, seguridad, limites, privacidad y soporte;
4. solicitar aprobacion de produccion;
5. recien entonces anunciar una herramienta como disponible.

Owner Live read-only permanece fuera de este caso publico. No debe aparecer en `llms.txt` como herramienta abierta ni exponer datos owner.

## 7. Roadmap de ejecucion

### Fase P0 - Contenido y verdad publica

- Definir una portada con idioma, titulo, descripcion y un unico H1 coherentes.
- Consolidar paginas duplicadas y retirar del sitemap contenido obsoleto.
- Publicar explicaciones citables de Tokenizart, Atelier, Mint, Certify, NFC, privacidad, Gallery, vouchers, ERC-721 y ERC-4337.
- Incorporar JSON-LD que coincida con el contenido visible.

### Fase P1 - Descubrimiento por maquinas

- Instalar `llms.txt` y `llms-full.txt` en ambos origenes.
- Actualizar `robots.txt` sin perder restricciones existentes.
- Incorporar sitemap en Atelier y Link headers utiles.
- Revisar AI Crawl Control en Cloudflare y registrar la configuracion observada.
- Evaluar Markdown for Agents en Tokenizart, primero con prueba y rollback.
- Publicar un manifiesto ARD compatible y su enlace de descubrimiento solo despues de validar el paquete en preview.
- Repetir la auditoria externa y registrar cada fotografia en el perfil AF-EV del caso.

### Fase P2 - Herramientas reales

- Publicar el indice de skills solo con artefactos descargables, versionados y verificables.
- Publicar OpenAPI y MCP card cuando los endpoints read-only tengan URL estable, seguridad, rate limits y soporte.
- Marcar CLI, MCP, OKF y skills como `release_candidate` hasta completar esos gates.
- Incorporar WebMCP exclusivamente para tools publicas read-only que existan en la pagina y fallen cerradas.

### Fase P3 - Owner Live read-only

- Mantener identidad Atelier, consentimiento, scope, expiracion, revocacion y auditoria.
- Habilitar primero un unico usuario allowlisted mediante una aprobacion separada.
- No mezclar esta frontera con el auditor publico ni con los crawlers.

### Fase P4 - Acciones y pagos

- Evaluar x402/MPP solo para servicios transaccionales definidos.
- No usar pagos como sustituto de autorizacion.
- Mint, Certify, NFC, transfer, vouchers, privacidad, uploads y firma wallet requieren contratos, confirmacion humana, idempotencia y auditoria propios.

## 9. Criterio de exito

El caso alcanza su primer objetivo cuando:

- Tokenizart y Atelier explican correctamente su relacion;
- los archivos publicos son accesibles con HTTP 200 y contenido correcto;
- el sitemap y JSON-LD coinciden con las paginas humanas;
- los crawlers permitidos no reciben bloqueos accidentales;
- ninguna capacidad privada o candidata se presenta como produccion;
- una segunda auditoria demuestra la mejora y registra los checks aun pendientes.

Llegar a "100% agent-friendly" no significa activar todos los protocolos. Significa que cada capacidad necesaria esta publicada, verificable, segura y correctamente limitada; y que lo que no existe se declara como roadmap, no como servicio.

Agent Friendly Web aplica la misma regla sobre si misma. Su manifiesto publico distingue recursos desplegados, candidatos, capacidades planificadas y lineas de investigacion. El MCP remoto read-only ya desplegado se diferencia del candidato WebMCP de navegador; A2A y x402 siguen sin anunciarse como operativos. Ninguna capacidad se considera desplegada hasta que exista endpoint o integracion, contrato, seguridad y prueba reproducible.
