# AFW — coherencia del descubrimiento A2A público

21oct2026. [PR556](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/556). Corrección de metadatos y catálogo; no una capacidad nueva ni autorización privada.

## Contradicción y evidencia

El manifiesto publicado agent-readiness aún declaraba a2a planned y api-catalog omitía la tarjeta. GET al apex /.well-known/agent-card.json a22:01:58.597UTC devolvió200, diagnóstico público JSONRPC1.0, sin streaming/push/private dossiers. La tarjeta del subdominio también devolvió200 en la lectura acotada anterior.

API Cloudflare22:02:49.450UTC confirmó el Worker independiente agent-friendly-web-a2a, versión3238969a-d5e8-45c6-9417-fc19452b762a a100%, deploymentc154472a, tresbindings y ambos flagsA2A true. No cambió ese servicio. La [aceptación de SendMessage del2oct](AFW-A2A-PUBLIC-RELEASE-2026-10-02.es.md) conserva su fecha y alcance; un GET de tarjeta/configuración no repite ni reemplaza esa aceptación.

Producción web distinta: lectura22:02:48.710UTC, versión9d4b1396-df9d-461d-adc5-a116ad2b005b a100%, deployment4065eed7, fuente pública61e03107/10bindings. No confundir con main, la fuente A2A o el canary privado.

## Cambio y límites

agent-readiness informa el diagnóstico público como deployed/public-read-only, rutas de tarjeta/interfaz y observaciones fechadas de tarjeta/configuración. Excluye expresamente expedientes privados, delegación asíncrona, streaming y push. Su nota distingue evidencia de descubrimiento de aceptación SendMessage. El catálogo enlaza una única tarjeta del apex y conserva MCP/CLI/OpenAPI.

No se cambian observaciones del proveedor externo, puntaje, OAuth, precio, instalación, límites del diagnóstico, eventos, permisos, schema o configuración. La presencia de la tarjeta no ofrece guardia cloud, cobro o ejecución con el equipo apagado.

## Verificación y entrega

Las regresiones precedieron al cambio. RED77fd3fe0, CI39683851460/job119512808042:2735PASS/2FAIL/1SKIP existente. Fallaron exactamente planned frente a deployed y0 frente a1 tarjeta en el GET real del catálogo; no hubo error de import/transporte ni fallo fuera de ese alcance.

Primera corrección d99fd54a/CI39684392842 resolvió ambas regresiones nuevas y dejó2735PASS/2FAIL/1SKIP: fallaron dos expectativas históricas planned en las pruebas de guía/cápsula. Búsqueda de fuente encontró exactamente tres expectativas A2A en total. Se alinean esas dos restantes con deployed/public-read-only, añadiendo exclusiones explícitas de expediente privado y delegación asíncrona; no se eliminan ni relajan las comprobaciones de guía o cápsula.

Los siguientes resultados GREEN, revisión, integración y publicación se registran en la PR y tracker497 con revisiones concretas; este documento no los anticipa. Fuente por API GitHub, pruebas/builds en Actions, sin dependencias o compilación local.

Publicación debe ser backport mínimo desde61e03107, con artefacto exacto, configuración/bindings/recuperación propios leídos nuevamente. No desplegar main o wranglerdefault. Antes del cambio remoto, comprobar material de rollback de9d4b1396 recuperable, tráfico y hashes; después, comprobar metadatos, catálogo, assets y Access sin login. No crear nuevas rutas o modificar el Worker A2A por esta corrección.

Reversión de fuente mediante una revisión nueva; runtime solo a la versión/material conservados sin rebobinar datos. operationalReadiness=false y PCoff=false permanecen separados de esta entrega pública.
