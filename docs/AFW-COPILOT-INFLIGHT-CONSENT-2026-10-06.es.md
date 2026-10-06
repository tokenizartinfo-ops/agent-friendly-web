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

27 pruebas focalizadas y suite completa de 997 pruebas pasaron; lint sin errores (dos advertencias previas) y build completado. Consulta SQL probada con SQLite real; no equivale a aceptación remota de D1. Los errores no contienen propuestas y conservan no-store. No se cambia el contrato público del consentimiento.
