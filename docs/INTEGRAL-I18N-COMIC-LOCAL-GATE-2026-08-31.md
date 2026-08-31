# Gate local integral: idiomas y experiencia comic

**Fecha:** 2026-08-31  
**Estado:** release candidate local; sin despliegue remoto

## Alcance verificado

- Espanol conserva las rutas canonicas; ingles usa `/en/*` y portugues `/pt/*`.
- El selector de idioma navega por rutas allowlisted y no modifica identidad, permisos, datos privados ni contratos API.
- Recursos machine-readable, schemas y endpoints conservan URLs canonicas unicas: no se duplican ni traducen contratos.
- Registry, expediente y capsula localizan solo su interfaz. Los datos aportados por owners no se traducen automaticamente.
- La portada integra **La llamada**, el lema aprobado, el **Archivo del futuro** y la progresion visual F0-F5.
- El robot suma capacidades de forma acumulativa: antena/visor, mapa, cinturon, escudo/guante y uniforme final.
- Cada expediente visual enlaza a una ruta real o a un recurso canonico y declara un estado verificable sin presentar roadmap como capacidad desplegada.

## Calidad visual

- Ilustracion original en blanco, negro y sepia, sin logotipos de terceros.
- Asset optimizado de PNG 2,5 MB a WebP de aproximadamente 245 KB.
- Portada, archivo, auditoria y madurez revisados en Chromium a `1440x900` y `390x844`.
- El texto movil permanece legible, los CTA no se superponen y la escena de los dos robots se muestra completa debajo del contenido principal.
- Encabezados, expedientes y estados mantienen contraste; `prefers-reduced-motion` evita desplazamientos decorativos.

## Correccion tecnica incluida

Las rutas localizadas cargaban estaticamente el adaptador D1 de Cloudflare y fallaban bajo el servidor Node local por el esquema `cloudflare:`. `lib/registry-store.ts` ahora difiere esa importacion y usa perfiles Registry incorporados solo ante `ERR_UNSUPPORTED_ESM_URL_SCHEME`. Otros errores se vuelven a lanzar y no quedan ocultos.

## Verificacion

- `npm test`: **247/247 PASS**.
- `npm run lint`: **PASS**.
- `npm run build`: **PASS** con `vinext build`.
- QA visual: ES escritorio, EN movil, PT escritorio y anclas de archivo/auditoria.
- `git diff --check`: **PASS**; permanecen solo advertencias CRLF del entorno Windows.

## Limites y gate remoto

Este gate no publica una nueva version, no migra D1, no modifica DNS, no habilita conectores, no envia Draft PR y no escribe en sitios de terceros. El release remoto requiere una decision separada, smoke sobre el origen y recibo de rollback.

El proximo bloque es **5C local**: contrato fail-closed, adaptador sandbox, backup, canary sobre una ruta no critica, verificacion y rollback. Todo proveedor real debe permanecer deshabilitado hasta una nueva aprobacion.
