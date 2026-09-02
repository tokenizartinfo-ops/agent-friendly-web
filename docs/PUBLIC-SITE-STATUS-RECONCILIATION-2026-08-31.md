# Reconciliacion integral de estados publicos

**Fecha:** 2026-08-31

**Alcance:** home, rutas humanas del sitemap y manifiestos machine-readable

**Resultado:** correccion preparada; sin activar correo, CRM, pagos, A2A ni contacto publico

## Hallazgo principal

La portada mostraba una referencia real de `95/100` para `agentfriendlyweb.dev`, pero la seccion **Lectura por capas** construia siete filas sinteticas con puntaje cero y estado `Pendiente` hasta que la persona ejecutara una auditoria. No era trabajo pendiente ni un resultado remoto desactualizado: era un placeholder de interfaz que contradecia la referencia visible.

La correccion usa el mismo desglose observado que produjo el puntaje de referencia:

| Capa | Referencia |
| --- | ---: |
| Descubrimiento y rastreo | 20/20 |
| Contenido listo para respuestas | 20/20 |
| Contenido legible por agentes | 15/15 |
| APIs y herramientas | 20/20 |
| Interaccion web experimental | 10/10 |
| Identidad, evidencia y gobierno | 10/10 |
| Comercio agentico | 0/5 |

La fecha `2026-08-31` y la frontera sin pagos permanecen visibles. Cuando se audita otro dominio, el resultado nuevo sustituye el desglose de referencia.

## Auditoria de rutas humanas

Se recorrieron las 48 rutas HTML publicadas en `sitemap.xml` y se buscaron estados `pendiente`, `planned`, `research` y equivalentes en espanol, ingles y portugues.

Los estados que permanecen son deliberados:

- A2A no publica Agent Card ni servicio remoto;
- x402/MPP no tienen recurso pago ni transaccion activa;
- correo no tiene casilla, DNS, proveedor, lectura ni envio;
- CRM Lite es solo un planificador local metadata-only;
- voz y guardado asistido conservan gates propios;
- las verificaciones de dominio y aprobaciones de capsulas pueden estar pendientes por expediente individual.

No se modifican estados historicos de documentos, challenges o aprobaciones: alli `pending` es un valor de dominio valido.

## Contratos incorporados al inventario publico

Los contratos ya fusionados de Gate 6C y Gate 6D se publican con limites explicitos y sin inflar capacidades:

- `/.well-known/email-operations-contract.json`: `planned_draft_only`;
- `/.well-known/crm-lite-contract.json`: `local_planning_only`.

Ambos aparecen en AI Catalog, ARD, readiness y mapa del sitio. La publicacion del contrato no activa proveedor, DNS, persistencia, contactos reales, propuestas, email ni pagos.

**Actualizacion 2026-09-02:** `/.well-known/email-operations-contract.json` avanza de `planned_draft_only` a `inbound_canary_verified`. Email Routing, DNS y la entrega sintetica desde un remitente externo quedaron verificados para los tres aliases activos; `no-reply@` no entrego. Proveedor de salida, envio, auto-respuestas, lectura de cuerpos, adjuntos y persistencia permanecen deshabilitados.

**Actualizacion Gate 6C.2A:** Cloudflare Email Service queda seleccionado como proveedor previsto bajo `provider_selected_remote_unconfigured`. `/.well-known/email-inbound-canary-contract.json` y `/.well-known/email-outbound-canary-contract.json` se incorporan al readiness, AI Catalog, ARD y mapa humano. El dominio emisor, DNS de salida, binding, billing y envio siguen deshabilitados; la seleccion no se contabiliza como capacidad de salida activa.

## Inconsistencia terminologica separada

La metodologia historica contiene dos formulaciones de AF-5: `Transaccional` y `agent-native con gobierno`. La referencia actual llega a 95/100 sin comercio porque las otras seis capas suman 95. Esa diferencia no se cambia silenciosamente en esta correccion: requiere una decision terminologica HITL y una migracion coordinada de metodologia, OKF, MCP, FAQ y documentos.

## Pruebas requeridas

1. pruebas unitarias del desglose de referencia y suma 95;
2. prueba de ausencia del placeholder `Pendiente` en la home inicial;
3. prueba de catalogos y readiness para contratos locales;
4. suite completa, lint y build;
5. QA visual de escritorio y movil en ES/EN/PT;
6. crawl posterior del sitemap y auditoria publica del origen.

## Verificacion remota posterior a v34

La publicacion se reconcilio contra el origen, no solo contra el codigo local:

- 48 rutas del `sitemap.xml` respondieron `200`;
- la home ya no contiene `Que vamos a medir`, `What we will measure` u `O que vamos medir`;
- no aparecen etiquetas exactas `Pendiente`, `Pending` o `Pendente` en la lectura inicial por capas;
- el unico uso humano exacto de `pendiente` pertenece a la guia AEO y describe correctamente lo que una nueva medicion todavia debe comprobar;
- 16 recursos bajo `/.well-known/` respondieron `200` y los JSON se pudieron parsear;
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `openapi.json` y el catalogo API respondieron con sus tipos esperados;
- el auditor publico devolvio `95/100`, con seis capas verificadas y comercio agentico `0/5`;
- los tres enlaces que no responden a visitantes anonimos corresponden a los expedientes privados ES/EN/PT y devuelven `403` por diseno, no por enlace roto.

La inconsistencia terminologica de AF-5 sigue separada en Fix Center. No se modifica la metodologia historica como parte de una correccion de interfaz.
