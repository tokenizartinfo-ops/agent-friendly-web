# Agent Friendly Web Public OKF v1 Design

**Fecha:** 2026-08-27  
**Estado:** propuesta tecnica para revision  
**Bloque:** 4A de distribucion agentica read-only  
**Origen objetivo:** `https://agentfriendlyweb.dev/okf/v0.2/`

## 1. Objetivo

Publicar un bundle OKF v0.2 propio de Agent Friendly Web para que personas y agentes puedan descargar, inspeccionar, versionar y reutilizar conocimiento publico verificado sobre la metodologia, el auditor, el Registry, AEO, crawlers y sus limites.

La entrega debe demostrar el principio que Agent Friendly Web recomienda a terceros: conocimiento legible sin SDK propietario, con procedencia, estado, fecha, licencia y checksums. No crea un servidor de conocimiento, no habilita herramientas y no convierte el metodo AF-0 a AF-5 en una certificacion oficial.

## 2. Alcance

### Incluido

- bundle estatico OKF v0.2;
- conceptos Markdown con YAML frontmatter conforme a la especificacion;
- indice raiz con version y atribucion;
- manifiesto de distribucion y checksums como extensiones del proyecto;
- generacion determinista desde una allowlist de fuentes publicas del repositorio;
- validacion de estructura, procedencia, links, secretos y rutas privadas;
- pagina humana que explica como descargar y consumir el bundle;
- descubrimiento desde `llms.txt`, `llms-full.txt`, AI Catalog, readiness, sitemap y mapa humano;
- licencia CC BY 4.0 para documentacion, con reserva de marcas y atribucion a Gabriel Mucchiut.

### Excluido

- contenido Nivel 1 a 4, expedientes, observaciones privadas o datos owner;
- escritura manual sobre archivos generados;
- indexacion en Google Cloud Knowledge Catalog;
- CLI, MCP, A2A, WebMCP, plugins, pagos o publicacion en sitios de clientes;
- RAG, embeddings, busqueda semantica o respuestas generadas por modelo;
- OKF de Tokenizart completo: el primer bundle de Agent Friendly Web solo enlaza el caso publico curado y no duplica su corpus.

## 3. Fronteras de autoridad

Las fuentes editoriales siguen siendo los documentos publicos versionados del repositorio. El bundle es una proyeccion derivada y reproducible.

La primera allowlist incluye:

- `docs/METHODOLOGY.es.md`;
- `docs/AEO-AND-CRAWLER-POLICY.es.md`;
- `docs/SECURITY.md`;
- `docs/SPECIFICATION.es.md`;
- `docs/TOKENIZART-CASE-2026-08-26.md`;
- `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`;
- contratos publicos ya desplegados para comparador e intake;
- catalogos publicos generados que tengan estado y procedencia verificables.

Agregar una fuente requiere modificar la allowlist, ejecutar tests y revisar el diff del bundle. El generador no recorre carpetas de forma indiscriminada.

## 4. Estructura del bundle

```text
public/okf/v0.2/
|-- index.md
|-- log.md
|-- manifest.json
|-- CHECKSUMS.sha256
|-- method/
|   |-- agent-friendly-web-method.md
|   |-- maturity-levels-af0-af5.md
|   `-- evidence-and-scoring.md
|-- discovery/
|   |-- public-audit.md
|   |-- aeo-and-crawler-policy.md
|   `-- public-discovery-resources.md
|-- registry/
|   |-- registry-and-provenance-states.md
|   `-- domain-verification-boundary.md
|-- assistance/
|   |-- intake-assistant-boundary.md
|   `-- readiness-comparison-boundary.md
`-- cases/
    `-- tokenizart-first-integral-case.md
```

`index.md` y cada concepto son documentos OKF. `log.md` registra cambios del bundle. `manifest.json` y `CHECKSUMS.sha256` son extensiones de distribucion de Agent Friendly Web; no se presentan como requisitos de OKF.

## 5. Contrato de concepto

Cada concepto contiene como minimo:

```yaml
---
type: Reference
title: "Titulo humano"
description: "Resumen de una linea"
resource: "https://agentfriendlyweb.dev/ruta-canonica"
tags: [agent-friendly-web]
status: stable
stale_after: 2026-11-25T00:00:00Z
generated:
  by: process:agent-friendly-web-okf-generator
  at: 2026-08-27T00:00:00Z
verified:
  - by: human:gabriel-mucchiut
    at: 2026-08-27T00:00:00Z
sources:
  - id: canonical-source
    resource: "https://github.com/tokenizartinfo-ops/agent-friendly-web/..."
    title: "Fuente canonica"
    author: person:gabriel-mucchiut
    last_modified: 2026-08-27
---
```

La fecha real de `generated.at`, `verified.at`, `last_modified` y `stale_after` se deriva de metadata versionada y del ciclo de revision. No se usa una fecha ficticia para lograr builds deterministas: el manifest de entrada fija la fecha de release y el generador la reproduce.

Los tipos permanecen descriptivos y tolerables por consumidores genericos. Se usan inicialmente `Reference`, `Methodology`, `Policy`, `Service` y `Case Study`; no se crea una taxonomia obligatoria.

## 6. Generacion determinista

El repositorio incorpora:

- `config/okf-public-sources.v1.json`: allowlist, concepto destino, tipo, recurso, estado y fechas;
- `scripts/generate-okf-public.mjs`: lee solo fuentes allowlisted, extrae secciones delimitadas por configuracion y escribe el bundle;
- `scripts/validate-okf-public.mjs`: valida conformance, seguridad, links y checksums;
- `test/okf-public-distribution.test.mjs`: contrato y regresiones.

El generador falla si:

- falta una fuente o un selector configurado;
- un concepto no tiene `type`;
- aparece un path local, email privado, secreto probable o ruta privada;
- un recurso canonico no usa HTTPS publico;
- un checksum no coincide;
- un archivo generado cambio sin actualizar el manifest de release;
- un link relativo sale del bundle o apunta a un concepto inexistente.

El generador no resume con un LLM. La primera version usa plantillas y secciones editoriales exactas para que el resultado sea reproducible y auditable.

## 7. Publicacion y descubrimiento

La publicacion agrega:

- `/conocimiento-abierto`: pagina humana con alcance, licencia, version, descarga y limites;
- `/okf/v0.2/index.md`: entrada canonica del bundle;
- `/okf/v0.2/manifest.json`: inventario, hashes, version y fecha;
- `/okf/v0.2/CHECKSUMS.sha256`: verificacion independiente;
- enlaces desde `llms.txt`, `llms-full.txt`, `/.well-known/ai-catalog.json`, `/.well-known/agent-readiness.json`, `/mapa-del-sitio` y el footer.

No se crea `/.well-known/okf.json` en esta entrega porque OKF v0.2 no exige un mecanismo universal de descubrimiento. El AI Catalog existente puede anunciar el bundle como convencion propia y debe etiquetarlo de ese modo.

La pagina humana distingue:

- **formato:** OKF v0.2;
- **contenido:** documentacion de Agent Friendly Web;
- **estado:** publicado y read-only;
- **licencia:** CC BY 4.0 para documentacion;
- **marca:** no concedida por la licencia;
- **limite:** no es una certificacion, API, MCP ni garantia de descubrimiento por terceros.

## 8. Relacion con Tokenizart

El concepto `cases/tokenizart-first-integral-case.md` explica que Tokenizart es el primer caso integral y enlaza sus perfiles publicos HTML, JSON y Markdown y su paquete agent-friendly ya publicado. No incorpora contenido owner ni presenta CLI, MCP o skills de Tokenizart como endpoints productivos.

El bundle OKF de Tokenizart existente en `tokenizart-agentic` funciona como referencia tecnica para estructura, manifest y procedencia. Conserva su propio ciclo editorial y no se copia dentro del bundle Agent Friendly Web.

## 9. Seguridad y privacidad

- solo fuentes publicas allowlisted;
- cero lectura o escritura D1;
- cero autenticacion requerida para descargar;
- cero llamados externos durante generacion;
- scanner de secretos y paths locales antes del build;
- no se incluyen correos de expedientes, nombres de mantenedores, identificadores de usuario, challenges de dominio ni payloads de auditorias privadas;
- los checksums permiten detectar alteraciones sin afirmar firma criptografica o autoria legal.

## 10. Pruebas y gate de release

La entrega pasa solamente si:

1. cada `.md` no reservado tiene frontmatter YAML parseable y `type` no vacio;
2. `index.md` declara `okf_version: "0.2"`;
3. `log.md` respeta el formato reservado de OKF;
4. todos los hashes se regeneran y validan;
5. no aparecen patrones de secretos, rutas locales ni datos privados;
6. la pagina humana y todos los recursos responden `200` con tipos de contenido correctos;
7. AI Catalog, readiness, `llms.txt` y sitemap descubren la entrega sin inventar un estandar;
8. `npm test`, `npm run lint` y `npm run build` pasan;
9. el origen publicado se vuelve a auditar y registra OKF como recurso de conocimiento, no como MCP o herramienta;
10. el bundle descargado coincide con el commit y la version Sites desplegados.

## 11. Secuencia posterior

Cerrar 4A no autoriza 4B ni 4C:

- **4B - CLI local read-only:** consumira auditoria publica, perfiles Registry y bundles OKF; salida JSON, `--dry-run`, sin escritura remota.
- **4C - MCP read-only:** expondra recursos y tools verificables despues de contratos, threat model, limites, autenticacion para cualquier dato no publico y pruebas de cliente.

Plugins, WebMCP, A2A, pagos y capsula de publicacion permanecen fuera del Bloque 4A.

## 12. Criterio de exito

Un consumidor debe poder descargar el bundle desde el origen canonico, leerlo como Markdown plano, verificar su integridad, conocer de donde proviene cada concepto y distinguir con claridad lo desplegado de lo planificado. Todo ello debe ser posible sin cuenta, SDK, modelo, credenciales ni confianza en una base de datos propietaria.
