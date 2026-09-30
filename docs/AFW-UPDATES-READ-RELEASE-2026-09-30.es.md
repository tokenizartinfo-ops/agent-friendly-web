# Novedades: recuperación del historial guardado

PR #132, fuente `644e6055105d3ef12a46417d7bd803feb6537c84`. El desplegable distingue consulta pendiente, consulta fallida e historial vacío confirmado. Una lectura se confirma para el expediente y sitio guardado concretos; el resultado de otro ámbito no sirve. El reintento desde novedades recupera observaciones guardadas sin ejecutar ni guardar otra auditoría. Una consulta fallida no demuestra pérdida de datos.

La guía de coincidencia de archivos de PR #130 permanece incluida. No se modifican puntaje, permisos ni aprobación/publicación. El seguimiento automático sigue sin activarse por una preferencia.

## Evidencia y producción

- 607 pruebas generales aprobadas; ocho pruebas de lectura/historial repetidas después del ajuste final del efecto. Lint final sin errores, advertencia existente de imagen; tipos y compilación final aprobados.
- CI de PR y main aprobada. Artefacto exacto del run `36790450606`: `afw-build-644e6055105d3ef12a46417d7bd803feb6537c84`.
- Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, producción `https://agentfriendlyweb.dev`.
- Cuenta `85d0d5dadac3341a564f22ce885e9eec`, Worker `agent-friendly-web-web-production`.
- Versión activa `0f3eb3e6-38dd-46b7-9a1d-a31f92e47001`, deployment `d4a8a3d3-b67e-41a6-9807-1d467f6ab751`, 100 % desde `2026-09-30T23:22:31.959547Z`, confirmado por API.
- 11 comprobaciones previas con override y 11 posteriores aprobadas. Reportes privados locales: `output/end-to-end-qa/updates-read-staged-smoke.json` y `updates-read-public-smoke.json`.
- Access, D1, cuota y piloto de un expediente conservados; sin migraciones, scheduler, invitaciones ni publicación remota habilitada.
- Rollback de código: `8c36db0d-4bba-4af3-bdb1-1bf14c582a83` al 100 %, conservando datos e historial D1/migración 0010.

## Continuidad

Chrome autorizado no estaba disponible para control automático. La aceptación visual privada de novedades y guía sigue pendiente; se solicitó reconexión conservando cuenta/sesión. El smoke público no prueba esa interacción ni un recorrido de cliente externo. No se guardó una captura nueva.

El [paquete del primer cliente](AFW-FIRST-CLIENT-PACKAGE.es.md) está preparado: objetivo proporcional, una pregunta a la vez, guardado recuperable, propuesta/decisión/entrega/evidencia y soporte manual. No acredita incorporación ni amplía Access o rollout.

Próximos cierres: abrir Novedades con sesión del owner y comprobar la acción de revisión; recuperar el caso API pendiente del piloto sin rehacer MA-06/07. Luego concretar una beta acompañada con un cliente identificado. Mantener pendientes separados: revocación de token activo, scheduler y presupuesto monetario diario no acreditados. Auditoría externa Cloudflare reservada para 2026-10-01.
