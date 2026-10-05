# Revisión privada: HTTP real de pausa y cierre — 5 de octubre de 2026

## Evidencia remota

Repositorio tokenizartinfo-ops/agent-friendly-web, runtime QA agent-friendly-web-operations-review, D1d43b321d-a5e1-4e1a-9fe2-c63bcb0e9f46, origen operations-review.agentfriendlyweb.dev. Versión de ensayo2b636248-73c5-404a-9e76-c0019d55fad9 con ventana hasta19:12:04.947UTC, identityfalse, review/reviewstrue. Access propio admitió exclusivamente el operador ya aprobado.

La pestaña nueva del mismo Chrome abrió una página autenticada200 sin pedir OTP: no asumir expiración de sesión a partir de una nota o duración configurada. Tras consultas repetidas, la undécima recarga observada mostró «Hagamos una pausa». Una recarga adicional con Network.responseReceived registrado devolvió status429 de documento. Solo se extrajo status, nunca headers, cookies o JWT. La nueva presentación HTML permitió observar el error sin el bloqueo previo; no se acredita la causa interna del bloqueo del inspector anterior.

Restauración35081ced-da54-48bc-a5a8-28fb611d1a06: los tres flagsfalse, sin deadline. Antes de restaurar Accessdeny, la misma pestaña/sesión recargó y mostró «Este ensayo está cerrado»; evento HTTP de documento404, sin redirección/login. Esto prueba retirada administrativa AFW en esa sesión, no identidad exacta del JWT byte a byte ni su claim exp, no inspeccionados. Después policy propia deny/everyone sin excepción restaurada. No nuevos permisos, secretos, constancias o datos de clientes.

D1 posterior: dos revisiones, una reserva superseded, foreign_key_check vacío. No se modificó la observación ni se produjo una nueva decisión. Receptor/manager y token de recepción vencido no se tocaron.

## Pendiente acotado

El método CDP para establecer headers de origen no está soportado por la herramienta; no se ejecutó el POST sintético previsto ni se alteraron headers. No eludir restricciones, no afirmar CSRF remoto aceptado. La prueba local workerd403 con JWT sintético y binding real sí existe en AFW-REVIEW-REAL-LIMITER-2026-10-05.es.md.

Siguiente aceptación pendiente: POST de origen extranjero bajo sesión real, con código403 observado y ausencia de escrituras, mediante mecanismo de prueba autorizado y soportado. Separar retirada de capacidad AFW (observada) de retirada individual de operador con JWT real firmado, aún pendiente si se exige este alcance adicional. Antes de guardia permanente: identidad de servicio vigente/custodiada y ámbito explícito; no renovar token temporal anterior por inferencia.

## Retirada individual y restauración comprobadas

Ensayo separado9c2bf7f7-4863-482c-b300-971a7b11de2b, misma sesión real aceptada, ventana19:16:39.595UTC. Sin copiar cookies/JWT, se retiró únicamente el binding server-owned AFW_OPERATIONS_REVIEW_OPERATOR_ID. La recarga mostró «Necesitamos comprobar el acceso», eventoHTTP401. Se restauró la referencia opaca previamente derivada de identidad firmada; otra recarga mostró el recorrido y eventoHTTP200 sin nuevo login. Por contraste200→401→200 bajo la misma sesión y configuración, la negativa se liga a la autorización del operador, no a un supuesto cambio de cuenta. No afirma identidad byte a byte del JWT ni inspección de exp. Ninguna revisión nueva ni POST ejecutado.

Cierre finala218094b-edb3-455f-a7d8-e9156d0a8c97: tres flagsfalse/sin deadline, pin custodiado presente, Accessdeny/everyone sin excepción verificado por API. Este cierre sustituye35081ced como último estado observado. Solo sigue pendiente CSRF POST remoto bajo mecanismo soportado, además de lifecycle/custodia de recepción antes de guardia permanente.
