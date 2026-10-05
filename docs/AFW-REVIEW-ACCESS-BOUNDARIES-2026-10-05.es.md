# Límites de acceso de revisión — 5 de octubre de 2026

## Resultado comprobado

Sobre main `bbf2595bd20629ba5e0ce7a701a832c3fed951ff` (PR260/261), se amplía la aceptación de la vista integrada sin cambiar código de producción. Referencia de continuación: `AFW-REVIEW-ACCESS-ACCEPTANCE-PLAN-2026-10-05.es.md`.

Tres pruebas adicionales del Worker con JWT firmado y SQLite verifican: retirada de flag o subject mientras el token sigue vigente, denegación del limitador/proveedor antes de leer almacenamiento y navegación superior legítima frente a Origin/fetch ajenos. No constituyen una nueva autorización ni una consulta a un registro de revocación Access.

Una prueba adicional ejecuta el entrypoint real en workerd/Miniflare con D1 efímera: lectura autenticada, cierre persistente, replay idéntico, constancia terminal y retirada de capacidad cambiando la configuración del runtime. El mismo JWT todavía válido recibe404 en GET y POST; una sola fila del journal y reservas/outcome originales intactos. Es aceptación local del mecanismo de cierre, no prueba de propagación remota. Clave sintética en memoria y limitador de prueba, sin red ni credenciales reales. SQL de triggers instalado completo.

Suite completa local890/890, cero fallos. Cambios exclusivamente en pruebas y documentación; CI y revisión se acreditan en el PR del bloque. La compilación de fuente previa permanece como evidencia fechada, no como una nueva publicación.

## Inventario remoto de solo lectura

Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web, cuenta85d0d5dadac3341a564f22ce885e9eec. CLIcf v1.0.0-beta.5 sin sesión. Se utilizó el conector API tras descubrir métodos/path y verificar la cuenta entre las disponibles. Solo GET de recursos definidos; no filas ni secretos.

- Worker propuesto `agent-friendly-web-operations-review`: API10007, no existe en esta cuenta. Esto no acredita ausencia de otros Workers.
- Access con filtro exacto `operations-review.agentfriendlyweb.dev`:200, cero aplicaciones coincidentes. No acredita ausencia de políticas más amplias por otros dominios/rutas; inventariarlas antes de exponer el origen.
- Segunda consulta Access filtrada por agentfriendlyweb.dev, coincidencia no exacta:200, nueve aplicaciones y una página completa; sus destinos devueltos no incluyen operations-review ni un wildcard de subdominios. Las rutas privadas del apex y los servicios canary/receptor permanecen separados. Este inventario no comprueba DNS/rutas Worker ni una eventual configuración ajena al resultado del filtro; volver a verificar al provisionar.
- D1operativa `603c471d-19bb-4530-9773-c02e18b29840`:200, nombre agent-friendly-web-operations y versión production. Metadatos solamente; no consulta a tablas ni prueba del esquema reviews.

No Worker/ruta/DNS/Access/token/D1/scheduler modificado. No se pidió un nuevo login al owner. Las pruebas aceptadas PC-off/scheduler permanecen cerradas; este bloque no aumenta puntuación externa ni habilita una guardia permanente.

## Próximo resultado

Preparar una QA de revisión aislada, con identidad y recursos concretos, default deny, ventana breve y rollback cerrado. Antes de solicitar autenticación humana, confirmar políticas que podrían cubrir el origen y custodia servidor. Aceptar allí el limitador real y la denegación tras retirada con token vigente; verificar Access por separado. Preservar datos operativos y no reutilizar el token receptor vencido. El documento de plan define matriz y criterios; estas pruebas no los sustituyen.
