# Bloque 2: sectores, idiomas, frescura y medicion

**Estado:** implementado para validacion y release  
**Fecha:** 2026-08-27

## Alcance

Esta ampliacion transforma la guia AEO general en una primera biblioteca aplicable a organizaciones concretas. Publica rutas en espanol, ingles y portugues para arte y colecciones, museos, instituciones, comercios, plataformas y profesionales.

No se presenta como traduccion integral de todo el producto. Es la primera capa multidioma canonica y permite validar tono, enlaces alternativos, sitemap y comprension antes de ampliar el resto de las pantallas.

## Frescura de fuentes

`crawler-policy-catalog.v1` incorpora `sourceReview` con fecha revisada, proximo control, cadencia de 30 dias y estado. La fecha no demuestra que un proveedor no haya cambiado antes: obliga a revisar la fuente oficial antes de aplicar una politica productiva.

## Comparacion

`readiness-comparison.v1` compara dos snapshots limitados a 0-100, cantidad de evidencias y fecha. El prototipo es local y no persistente. Los valores ingresados manualmente no se convierten en observaciones verificadas.

Una comparacion valida para un informe debe conservar:

1. mismo dominio y version de metodologia;
2. fecha UTC;
3. URLs y estados observados;
4. cambio implementado y referencia de version;
5. limites y evidencia pendiente.

No garantiza indexacion, ranking, recomendacion, trafico ni una respuesta identica de un modelo.
