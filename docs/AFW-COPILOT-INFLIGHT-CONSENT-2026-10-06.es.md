# Copilot: permiso vigente durante texto y audio — 6 octubre 2026

## Problema y alcance

La prueba local reprodujo una respuesta 200 después de retirar el consentimiento durante la inferencia; debía devolver 403 sin propuestas. No es evidencia de un incidente de producción.

Las rutas privadas de texto y audio comprueban ahora identidad, proyecto habilitado, propietario, revisión y última secuencia de consentimiento antes de inferir y antes de responder. Cada lectura de autoridad combina propietario y consentimiento en una consulta a D1 con sesión first-primary. Revocar y volver a conceder no revive una petición anterior: exige iniciar otra.

Se conservan modelos, borradores, ratelimit, revisión humana y contrato de consentimiento público. La secuencia no sale al navegador. No se escribe el resultado automáticamente ni se habilita el copilot en remoto.

## Límites y continuación

La comprobación entrega una instantánea fresca; no cancela un procesamiento ya enviado al proveedor ni borra sus efectos. La verificación del JWT respeta su vigencia, pero no acredita consulta remota de revocación a Access en cada paso. Cambios de flags comprobados son los de la configuración visible a la petición; una nueva versión del Worker no modifica el env de una invocación anterior.

No amplía el permiso de Codex cloud para leer contenido privado: la revisión cloud existente sigue usando metadatos. Ese acceso requiere un contrato de finalidad, alcance y retirada independiente. No hay migración ni apertura para clientes.

## Criterio de cierre

Prueba roja observada 200 frente a 403; pruebas de retirada en texto/audio, cambio de propietario/revisión, regrant, límites y consulta SQL real; suite, lint y build antes de integrar. Promoción remota y aceptación autenticada son posteriores y separadas.

## Validación local

30 pruebas focalizadas y suite completa de 998 pruebas pasaron; lint sin errores (dos advertencias previas) y build completado. Consulta SQL probada con SQLite real; no equivale a aceptación remota de D1. Los errores no contienen propuestas y conservan no-store. No se cambia el contrato público del consentimiento.

La interfaz distingue permiso modificado y revisión desactualizada de una sesión vencida; conserva relato/audio local sin aplicar resultados. Se volvió a comprobar la época de la petición después de interpretar el error, para no mostrar mensajes de una consulta anterior.

## Integración y canary cerrado

PR306 integrada en main 43c54af2623e88f727c47c5ba59944acbcbc97e8; CI37534601844 pasó. El árbol del commit probado 63398bc coincide exactamente con main. Canary propio desplegado en versión 2d5e340e-a187-4184-9d6f-adc5cd48c7c4 al 100%, comprobado 21:36:01.851Z: copilot, ayuda, feedback y despliegue remoto deshabilitados; sin cron ni ventana; D1 propio 2b518988 preservado con assets, AI, limitador y cuatro custodias existentes. Selectores y Access idénticos al rollback c6aca9a8-bad4-4283-abb3-ac2a40d78fb6, cuya recuperación se comprobó antes de cambiar. No SQL remoto ni inferencia real.

El guard está en el canary cerrado: no afirmar promoción productiva ni aceptación autenticada de una retirada durante AI. La prueba de revisión fechada anterior permanece aceptada y cerrada según AFW-ASSISTANCE-FEEDBACK-2026-10-06.es.md.
