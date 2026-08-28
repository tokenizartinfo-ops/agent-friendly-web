# Bloque 5A: gate de capsula de publicacion local

**Fecha:** 2026-08-28
**Estado:** candidato local verificado, sin publicacion remota
**Alcance:** contratos y planificacion offline
**No autoriza:** instalacion, conexion, escritura ni produccion

## Para que sirve

Este bloque convierte una propuesta de mejora agentica en un objeto tecnico limitado y revisable. La capsula indica exactamente que dominio, entorno, archivos y rutas se pretenden cambiar; conserva el contenido publico, los hashes actuales y propuestos, la expiracion, las comprobaciones posteriores y el mecanismo de rollback.

La capsula evita dos extremos incorrectos: pedir acceso general al sitio o entregar un ZIP sin procedencia, alcance ni control. El owner aprueba la finalidad y el contenido. El mantenedor aprueba la operacion tecnica. Ese doble consentimiento es obligatorio y queda representado por eventos separados, metadata-only y vinculados al digest de una sola capsula.

## Implementado localmente

- contrato `agentfriendly.publication-capsule.v1`;
- allowlist explicita de rutas publicas agenticas;
- contenido UTF-8 con limites de 128 KiB por archivo y 512 KiB por capsula;
- rechazo de traversal, rutas duplicadas, media types no permitidos y contenido con credenciales probables;
- SHA-256 por archivo, digest determinista de capsula e idempotencia;
- firma y verificacion Ed25519 sin incorporar la clave privada al paquete;
- expiracion entre un minuto y catorce dias;
- maquina de estados append-only desde `draft` hasta aprobacion, aplicacion, verificacion o rollback;
- aprobaciones owner y mantenedor ligadas al actor y scopes declarados;
- adaptador offline que prepara un plan de Draft PR con rama, cambios, post-checks y rollback;
- contrato de Draft PR con `draft: true`, `executed: false` y sin merge automatico.

## Flujo humano y tecnico

1. El owner verifica el dominio mediante el expediente privado.
2. Agent Friendly Web prepara los archivos publicos y genera la capsula.
3. La capsula se firma fuera del modelo y queda inmutable.
4. El owner revisa rutas, contenido, hashes y finalidad, y aprueba.
5. El mantenedor revisa la operacion tecnica y aprueba el scope exacto.
6. El adaptador genera un plan de Draft PR para inspeccion.
7. Un conector futuro podra crear el Draft PR, pero el merge seguira siendo una decision separada.
8. Una verificacion posterior compara estado HTTP y hashes; un fallo no se convierte automaticamente en `verified`.

## Lo que no hace

- **GitHub App: no implementada.** No se instala una aplicacion, no se solicita un token y no se llama a la API de GitHub.
- **Draft PR remoto: no implementado.** El adaptador solo devuelve el plan que un conector futuro deberia ejecutar.
- **WordPress: no implementado.** No existe plugin, Ability, Application Password ni escritura en un CMS.
- no crea ramas, commits, pull requests ni merges;
- no escribe archivos locales ni remotos;
- no usa `fetch`, shell, Wrangler, Octokit, sesiones, cookies ni credenciales;
- no persiste capsulas, aprobaciones o eventos en D1/R2;
- no cambia DNS, Cloudflare Access, billing ni infraestructura;
- no publica los nuevos contratos en los catalogos de capacidades desplegadas.

## Contratos candidatos

| Contrato | Archivo | Funcion |
| --- | --- | --- |
| `agentfriendly.publication-capsule.v1` | `/schemas/publication-capsule.v1.json` | contenido, alcance, hashes, expiracion y firma |
| `agentfriendly.publication-event.v1` | `/schemas/publication-approval.v1.json` | dominio, aprobaciones, ejecucion, verificacion y rollback metadata-only |
| `agentfriendly.draft-pr-plan.v1` | `/schemas/draft-pr-plan.v1.json` | plan offline de Draft PR, post-checks y rollback |

Los archivos existen en el repositorio como candidatos. No se anuncian en `llms.txt`, AI Catalog, readiness ni MCP hasta que exista una superficie publicada y verificada.

## Controles negativos

La suite debe rechazar:

- ruta fuera de allowlist o con traversal;
- ruta repetida;
- reemplazo o eliminacion sin hash previo;
- secreto o credencial probable;
- archivo o capsula sobredimensionados;
- firma, contenido o digest alterados;
- capsula vencida;
- aprobacion de otra capsula;
- actor o scope incorrecto;
- salto de `draft` a `applying`;
- plan de repositorio sin aprobacion del mantenedor;
- repositorio o rama base malformados;
- capsula que no use modo `pull_request`.

## Evidencia de esta rama

Pruebas focalizadas:

```text
publication-capsule.test.mjs
publication-consent.test.mjs
draft-pr-adapter.test.mjs
publication-capsule-docs.test.mjs
```

La suite completa, lint, build y auditoria de dependencias de produccion forman parte del gate final de la rama. Ningun resultado local se describira como despliegue.

## Proximo gate

El siguiente paso seguro es una fixture de repositorio sintetico que transforme el plan en un diff y un recibo reproducible, todavia sin API remota. Despues se elegira separadamente entre:

1. flujo manual para que el mantenedor aplique o abra el Draft PR;
2. GitHub App con instalacion por repositorio y permisos minimos;
3. adaptador WordPress en un entorno de prueba con backup y rollback.

La recomendacion es estabilizar primero la fixture Git y el recibo. WordPress reutilizara el mismo contrato cuando la capsula y el rollback hayan probado su interoperabilidad.
