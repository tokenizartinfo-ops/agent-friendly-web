# Selección retenida de generación V2 para preparar cierre
31oct2026. Base main ee5641b9 (PR681).

Ampliar el resolver EXISTENTE con readRetained(H) y método privado IndependentClosure.readOwnQaRetainedGeneration(H). Mismo actor, storage real, linaje completo, HEAD exacto, hash de cápsula y pin nativo fuente/UUID. Mantener read(H) estricto: solo armed + ventana nominal vigente.

Resultado retenido: purpose distinto afw.qa-retained-generation-resolution.v2, metadata <=2048bytes, status pending/armed/withdrawn y withinWindow exacto; los cuatro flags de autoridad/liveness/readiness/retry siguen false. Denegar otro HEAD, corrupción, huérfanos, contexto/fuente/UUID distintos, selectores extra y cambios durante el lease. No fuente/cápsula/grants/políticas/credenciales/D1/provider/escrituras. El recibo retenido NO debe satisfacer createPrivateQaNamedAuthorization.

La selección fuera de ventana informa historia y permite al futuro host resolver su plan; no permite efectos de cleanup ni extiende closure.expiresAt. El futuro ejecutor debe verificar por separado paquete/hashes/política, autoridad de cierre y su ventana. Conservar contención actual closure dentro de nominal. Nada de ocultar V2 al host legacy, reciclar journals o reabrir grants.

Además reproducir el cruce de ventana nominal en la liquidación EXTERIOR del resolver: el observer interior puede terminar correctamente antes del borde y la envoltura devolverlo después aunque queden segundos de su lease. Comprobar clasificación nominal también en settlement exterior; si cambia, bloquear en ambos modos sin falsear un receipt nuevo.

Plan: RED remoto con el caso de cruce y métodos ausentes; composición real IndependentClosure tras withdrawal; implementación compartiendo código; CI enfocado/full/build, revisión exact head. No publicar runtime ni iniciar ensayo.
