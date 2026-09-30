# Reapertura de entrega desde el copiloto y novedades

PR #134, fuente `7c049daa3ff435d6f1d91c6b5a83977cdeefb9b7`. Ambos botones usan una acción compartida que abre explícitamente Entrega antes de llevar el foco al resumen y desplazar la página. Funciona si la persona cerró manualmente el desplegable y la solicitud de apertura React seguía verdadera. No revela el formulario completo, modifica datos ni ejecuta auditorías.

## Evidencia

- 609 pruebas aprobadas. Lint sin errores, advertencia existente de imagen. Tipos y compilación aprobados.
- CI de PR y main aprobada. Artefacto exacto del run `36792347279`: `afw-build-7c049daa3ff435d6f1d91c6b5a83977cdeefb9b7`.
- Prueba local de reapertura repetida y orden apertura/foco/desplazamiento; destino inexistente no se presenta como revelado.
- El owner confirmó manualmente el camino normal de Novedades y la fecha antes de este despliegue: [recibo manual](AFW-UPDATES-MANUAL-ACCEPTANCE-2026-09-30.es.md). No atribuirle una prueba de esta reapertura nueva ni una captura del agente.

## Producción y reversión

Proyecto AFW, repositorio `tokenizartinfo-ops/agent-friendly-web`, entorno producción, origen `https://agentfriendlyweb.dev`. Cuenta `85d0d5dadac3341a564f22ce885e9eec`, Worker `agent-friendly-web-web-production`.

Versión `c6175cff-42ca-490d-8507-96c5fce23126`, deployment `090aebbb-1f08-42aa-93fc-da4921e9fbc2`, 100 % desde `2026-09-30T23:44:31.67117Z`, confirmado por API. Smoke previo con override y posterior: 11 comprobaciones aprobadas en cada ejecución. Reportes privados locales `output/end-to-end-qa/delivery-navigation-staged-smoke.json` y `delivery-navigation-public-smoke.json`.

Sin migraciones ni cambios de Access, D1, cuota, piloto de inferencia o publicación remota. Rollback de código: `0f3eb3e6-38dd-46b7-9a1d-a31f92e47001` al 100 %, conservando los datos y el historial/migración 0010.

## Continuidad sin repetir trabajo

MA-08 camino normal confirmado por el owner. La lectura visual del agente siguió bloqueada por la herramienta de Chrome; no equivale a sesión vencida. Pendientes: respuesta manual sobre el mensaje de la guía, reapertura de esta versión en navegador y casos privados de consulta fallida. Las pruebas locales no sustituyen esa aceptación.

No repetir MA-06/07 ni solicitar OTP de la identidad QA retirada. El destino sintético de MA-06 fue retirado y la comparación coincidente guardada es histórica. [Paquete del primer cliente](AFW-FIRST-CLIENT-PACKAGE.es.md) preparado, sin incorporación ni ampliación del piloto. Mantener nueva inferencia del caso API, revocación de token activo, scheduler y presupuesto monetario diario como pendientes separados. Auditoría externa Cloudflare prevista para 2026-10-01.
