# Gate de release: Bloque 4A OKF publico

**Fecha:** 2026-08-27  
**Origen:** `https://agentfriendlyweb.dev`  
**Version publicada:** Sites 16  
**Commit publicado:** `cb97b64a2f044b5dc060b14a3a4aff6c544e8976`  
**PRs:** `#8` implementacion y `#9` portabilidad CRLF  
**Resultado:** publicado y verificado como conocimiento publico read-only

## Necesidad

Agent Friendly Web necesita demostrar que el conocimiento publico puede distribuirse con procedencia, version, responsable, vigencia e integridad verificables. El bundle OKF v0.2 complementa las paginas humanas, `llms.txt`, JSON-LD, OpenAPI y los catalogos del proyecto. No sustituye esos contratos ni convierte una declaracion en una capacidad ejecutable.

## Alcance publicado

La release `0.2` contiene 11 conceptos allowlisted y 15 recursos logicos:

- metodologia Agent Friendly Web, evidencia y niveles AF-0 a AF-5;
- auditoria publica, recursos de descubrimiento y politica AEO/crawlers;
- Registry, estados de procedencia y verificacion de dominio;
- limites del asistente de intake y del comparador;
- Tokenizart como primer caso integral;
- `index.md`, `log.md`, `manifest.json` y `CHECKSUMS.sha256`.

El manifiesto fija fecha de publicacion, fecha de revision, licencia documental CC BY 4.0, marcas reservadas y verificador `human:gabriel-mucchiut`. Las fuentes editoriales quedan separadas de los derivados generados.

## Integridad y distribucion

- El generador usa un manifiesto allowlisted y fechas versionadas; no depende de la hora de ejecucion.
- El validador analiza YAML estructuralmente, inventario, links relativos, rutas publicas, indicadores de secretos y SHA-256.
- Los archivos generados usan saltos LF para producir hashes portables.
- `CHECKSUMS.sha256` se sirve mediante una ruta determinista con `Content-Type: text/plain; charset=utf-8`; el contenido proviene del mismo generador y evita que el servidor de archivos estaticos suprima la cabecera MIME.
- La pagina humana `/conocimiento-abierto` explica version, alcance, licencia, limites y secuencia de verificacion.

## Gate local

- `npm run generate:okf`: 11 conceptos, 15 recursos;
- segunda generacion y `git diff --exit-code`: reproducible;
- `npm run validate:okf`: aprobado;
- `npm test`: 100 pruebas aprobadas;
- `npm run lint`: aprobado sin warnings;
- `npm run build`: aprobado;
- matriz HTTP local: pagina HTML, Markdown, JSON y checksums con `200`, cuerpos no vacios y tipos de contenido utilizables;
- navegador escritorio y movil: jerarquia legible, enlaces funcionales, sin solapamientos ni errores de consola.

## Limites expresos

Este release no habilita ni puntua como desplegados:

- CLI, MCP, A2A, WebMCP, plugins o skills ejecutables;
- autenticacion owner, expedientes privados o datos de Tokenizart Nivel 1 a 4;
- escritura en sitios, CMS, Registry o infraestructura de terceros;
- pagos, x402, credenciales, secretos ni acciones autonomas;
- certificacion universal, garantia de indexacion, ranking o recomendacion por LLMs.

OKF se publica como recurso de conocimiento verificable. La presencia del bundle no debe inflar el nivel AF ni presentarse como una herramienta activa.

## Publicacion y observacion

Sites 16 se publico desde el commit exacto indicado. En `https://agentfriendlyweb.dev` respondieron `200` la pagina humana, `index.md`, `manifest.json`, `CHECKSUMS.sha256`, `llms.txt`, AI Catalog, Readiness y sitemap, con cuerpos no vacios y tipos MIME correctos. La verificacion remota reprodujo correctamente los 14 hashes enumerados por `CHECKSUMS.sha256`.

La auditoria publica posterior mantuvo puntaje `70` y nivel `AF-3 herramientas`. Ese resultado es correcto: OKF queda descubierto como conocimiento publico, no se contabiliza como MCP, tool execution ni certificacion. La revision visual de produccion paso en escritorio y movil. No aparecieron errores o warnings de la aplicacion; Chrome solo informo deprecaciones provenientes del script administrado de proteccion de Cloudflare.

## Rollback

Si falla integridad, MIME, navegacion o build remoto, se revierte a Sites 15. No hay migraciones de D1, secretos ni datos que revertir.

## Siguiente gate

El Bloque 4A queda cerrado. El proximo bloque recomendado es 4B: una CLI local read-only, con JSON estable y `--dry-run`. El Bloque 4C MCP permanece separado y requiere especificacion, threat model y aprobacion propios.

## Referencias primarias

- Especificacion OKF v0.2: `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md`
- Anuncio y señales de confianza de OKF v0.2: `https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals/`
