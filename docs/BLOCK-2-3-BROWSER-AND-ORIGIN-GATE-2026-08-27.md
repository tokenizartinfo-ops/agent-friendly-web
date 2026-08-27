# Gate de navegador y origen: Bloques 2 y 3

**Fecha:** 2026-08-27  
**Origen:** `https://agentfriendlyweb.dev`  
**Version publicada:** Sites 15  
**Commit publicado:** `f63f451060581763e8760f0290947a1ffba0282b`  
**Resultado:** aprobado para cerrar el gate publico; sin habilitar transferencia al expediente ni nuevas mutaciones

## Alcance verificado

La revision cubrio las superficies publicas incorporadas por los Bloques 2 y 3:

- biblioteca sectorial inicial en espanol, ingles y portugues;
- comparador local de observaciones;
- asistente determinista de intake;
- contratos publicos `readiness-comparison.v1` e `intake-assistant.v1`;
- nueva auditoria read-only del propio origen;
- fronteras negativas de las rutas privadas.

No se probaron ni autorizaron voz, correo, pagos, MCP, A2A, WebMCP, escritura en sitios de terceros ni transferencia de propuestas al expediente autenticado.

## Revision humana en navegador

### Sectores e idiomas

La ruta `/sectores` presenta seis perfiles, enlaza las variantes `/en/sectors` y `/pt/setores`, y mantiene navegacion hacia auditoria, medicion, expediente y recursos agenticos. Los enlaces observados resuelven a destinos reales y la pagina distingue evidencia disponible de capacidades futuras.

### Comparador

La ruta `/medir-mejora`:

- recalcula diferencias en vivo y conserva limites de 0 a 100 para puntaje;
- separa puntaje, cantidad de evidencias y periodo;
- declara que el resultado no garantiza ranking, indexacion ni recomendacion;
- no escribe en `localStorage`, `sessionStorage`, cookies ni D1;
- vuelve a sus valores iniciales al recargar.

Se verifico el escenario inicial `20 -> 55`, con diferencia `+35`, y una modificacion manual `37 -> 55`, con diferencia `+18`.

### Asistente de intake

La ruta `/asistente` transformo un texto de museo desordenado en propuestas field-scoped para organizacion, sitio, idiomas, CMS, audiencia, objetivos y notas. Cada propuesta conserva el fragmento de origen y requiere seleccion humana.

Una entrada sintetica con apariencia de API key fue rechazada antes de producir propuestas. El navegador no registro cookies ni claves en `localStorage` o `sessionStorage`. Copiar la propuesta continua siendo una accion local: no guarda, publica ni modifica el expediente.

### Presentacion y accesibilidad basica

- escritorio y movil conservaron jerarquia, controles legibles y navegacion funcional;
- no se observo overflow horizontal en el viewport movil inspeccionado;
- no se registraron errores, warnings ni issues en consola durante el recorrido;
- los cambios de resultado se anuncian mediante regiones `aria-live`.

## Contratos y origen

Respondieron `200`:

- `/`;
- `/sectores`;
- `/asistente`;
- `/llms.txt`;
- `/.well-known/readiness-comparison-contract.json`;
- `/.well-known/intake-assistant-contract.json`.

La auditoria publica read-only del propio origen registro:

- puntaje `70` y nivel metodologico `AF-3 herramientas`;
- discovery, answerability y trust verificados;
- OpenAPI, API Catalog, AI Catalog, skills, `llms.txt`, `llms-full.txt`, sitemap, robots y datos estructurados detectados;
- negociacion Markdown, MCP, WebMCP y pagos no detectados.

La peticion con `Accept: text/markdown` continuo respondiendo `text/html`; Markdown for Agents permanece pendiente y no se contabiliza como capacidad desplegada.

## Pruebas negativas privadas

Sin identidad autenticada:

- `GET /api/projects` respondio `401`;
- `PUT /api/projects` respondio `401`;
- `GET /api/projects/probe/domain-claims` respondio `401`.

Estas pruebas no sustituyen el smoke positivo de dos identidades autenticadas. Ese control sigue pendiente antes de transferir propuestas o declarar cerrado el gate privado completo.

## Verificacion del repositorio

- `npm test`: 86 pruebas aprobadas;
- `npm run lint`: aprobado;
- `npm run build`: aprobado;
- commit local, commit publicado y Sites 15 coinciden en `f63f451`.

## Decision y siguiente gate

El gate publico de Bloques 2 y 3 queda cerrado. El siguiente trabajo no debe escribir automaticamente las propuestas del asistente en el expediente.

La secuencia aprobada es:

1. especificar Bloque 4 como distribucion agentica read-only;
2. empezar por exportacion OKF publica y verificable;
3. agregar CLI local con JSON y `--dry-run`;
4. exponer MCP read-only solo despues de contratos, autenticacion cuando corresponda, limites y pruebas;
5. mantener transferencia de propuestas, plugins, WebMCP, A2A, pagos, voz, correo y adaptadores mutantes bajo gates separados.

