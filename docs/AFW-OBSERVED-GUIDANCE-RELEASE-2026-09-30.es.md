# Guía tras comprobar los archivos de una cápsula

PR #130 integrada en `6c822c57eab95a98c92eb4d21a0c326726f64b1a`. La guía reconoce los archivos coincidentes de la cápsula aprobada en la última lectura. Exige identidad de cápsula/manifiesto, conjunto completo de rutas, operaciones y hashes propuestos compatibles. Una coincidencia de texto normalizado no implica igualdad de bytes. No modifica aprobaciones ni puntaje ni garantiza vigencia o certificación del sitio.

Validación local: 606 pruebas, lint sin errores con advertencia existente de imagen, tipos y compilación aprobados. CI de PR y main aprobada. Artefacto exacto del run `36788583808`: `afw-build-6c822c57eab95a98c92eb4d21a0c326726f64b1a`.

## Producción

- Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, origen `https://agentfriendlyweb.dev`.
- Cuenta `85d0d5dadac3341a564f22ce885e9eec`, Worker `agent-friendly-web-web-production`.
- Versión `8c36db0d-4bba-4af3-bdb1-1bf14c582a83`, deployment `a4b56d49-09ae-4636-bec1-bd83d1c98777`, 100 % desde `2026-09-30T23:04:46.500608Z`, confirmados por API.
- Smoke previo con override y posterior a promoción: 11 comprobaciones aprobadas en cada ejecución.
- Conservados Access, D1, piloto de un expediente, cuota e inferencia. Sin migraciones ni activación de publicación remota.
- Rollback de código: versión `6fa4148c-8d5f-4f6b-93e9-23f79c256726` al 100 %, conservando historial D1 y migración 0010.

## Pendientes y continuidad

La comprobación visual privada del mensaje y del desplegable de novedades sigue pendiente: el navegador Chrome autorizado ya no estaba disponible para control automático. No se obtuvo una captura nueva ni se requirió otro login. El smoke público no acredita esa interacción privada. La lectura coincidente de MA-06 sigue siendo histórica: su destino sintético fue retirado; no repetirla como si siguiera instalado.

Continuar MA-08 comprobando estados de consulta fallida/vacía y su siguiente acción. Una preferencia de seguimiento sigue sin activar scheduler. Después, aceptación privada del piloto y paquete acotado de primer cliente según operaciones de beta; no incorporar identidades externas por inferencia.
