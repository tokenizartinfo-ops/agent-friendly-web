# Siguiente paso contextual en el expediente AFW — 2026-09-29

La guía proporcional del expediente ahora ofrece una sola acción enlazada con la sección pertinente. Prioriza objetivo declarado, fuentes públicas y control del sitio. Cuando esas bases existen, invita a describir un caso de herramienta/acción/transacción o a revisar las preferencias de descubrimiento. El enlace navega dentro del formulario; no guarda datos, no publica y no activa recursos.

Se añadieron pruebas de prioridad y destino para los estados informativo, indeterminado, de herramientas, transaccional y sin fuentes. Pasaron 513/513 pruebas, TypeScript, lint sin errores (un aviso `<img>` previo) y build. El ensayo local respondió HTTP 200, pero la herramienta de navegador agotó el tiempo al capturar su estado; no se considera verificada la interacción visual de este bloque.

## Publicación verificada

La PR #54 quedó integrada en `main` en `82cc699fb69a4b2386dbf2436587a30f6db3b690`. El build se cargó con configuración productiva local ignorada SHA-256 `ae68f7d1e245a19858a83e95b09841a0847c15e9406baac364d7934c57ab0da3`; el dry-run y la versión cargada confirmaron D1 `d26fc9d2-df5a-4957-8e58-cc4c945faad8`, Cloudflare Access, AI, cuota 5/60, `AFW_COPILOT_ENABLED=false` e ID vacío. No hubo migración.

La versión `e5e04e49-731e-4209-aa22-68bff506544e` se asoció primero al 0% y luego al 100% en el deployment `c5956776-5db7-4ce3-81fb-a5f89bb2ca9a`. El smoke productivo confirmó ocho rutas públicas HTTP 200 y tres privadas HTTP 302 de Access. El rollback es devolver el 100% a `2accce03-595f-4d02-98da-d6703c7a03d4`, sin restaurar ni borrar D1. La interacción visual privada continúa pendiente de verificación por timeout de la herramienta de navegador.
