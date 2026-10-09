# Solicitud autenticada de desafío bajo autorización previa

9 octubre 2026. Preparación de fuente para QA propia; no despliegue ni permiso para clientes.

El servicio autenticado puede solicitar un único nonce mediante el mismo endpoint fijo de confirmación, únicamente si el operador activa explícitamente `allowChallengeRequest` y configura una preparación confiable. El modo predeterminado conserva el rechazo. La petición exacta `{challenge:"request"}` no permite seleccionar recursos, declarar identidad, aprobarse, registrar autorizaciones ni instalar permisos.

`createPreregisteredExchangePreparation` conecta las lecturas reales del preregistro inmutable aceptado en PR357. Exige registro previo del operador, comprueba dos lecturas activas y compara los pins vigentes. Nunca registra durante una petición, ni usa el historial de cierre como autoridad. El host comprueba JWT, identidad, versión de configuración, tiempo y límites antes y después de las esperas; retirada o cambio bloquean la respuesta. Si ya se emitió el nonce, una respuesta perdida o retirada posterior no habilita otra emisión.

La prueba native workerd/SQLite Durable Object comprueba que dos peticiones simultáneas producen una única emisión, dos confirmaciones producen un único éxito y la retirada permanente impide nuevos usos. La prueba con preregistro real verifica falta de autorización, retirada e historial conservado. Un callback positivo es una dependencia interna, nunca una prueba de reserva de recursos.

Verificación local: 12 pruebas focales/native; suite1378 aprobadas/0fallos/2omitidas; lint y build exit0. Tras añadir una validación defensiva del principal se repitieron las11pruebas unitarias del host. Revisión independiente de toda la rama y del guard final sin P1/P2. Los registros completos quedan en output/afw-private-challenge-bootstrap-*. La CI comprobará la fuente final antes de integrar.

Inventario GET16:54:39UTC: el Worker QA conserva versión24932e39, DO070c4a77, D1676ca49e y cron vacío. No nuevos bindings, rutas, credenciales o montajes. Evidencia saneada output/afw-closure-qa-inventory-20261009T165439Z.json.

Siguiente bloque: montar el intercambio privado cerrado con preregistro administrativo previo, configuración fija y rollback; correlacionar ejecución cloud oficial con desafío/journal primario. La reserva administrativa real, el cierre independiente, la programación única y el intervalo de PC apagado siguen pendientes. No solicitar apagar todavía ni invitar a Max.
