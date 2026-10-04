# Ensayo programado del productor por binding interno

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated operational QA; ORIGIN receptor operations.agentfriendlyweb.dev, productor sin ruta pública. RESOURCE_TYPE Workers/D1/cron. RESOURCE_ID agent-friendly-web-operations, agent-friendly-web-operations-producer y D1 operaciones603c471d-19bb-4530-9773-c02e18b29840. ALLOWED_ACTION apertura temporal firmada, cron acotado y consulta agregada de constancias. ROLLBACK publicar ambas configuraciones canónicas disabled, retirar cron/firma y preservar D1/historial. Delegados canaryaa121311 y real94a3c291 permanecen cerrados; no modificar datos privados ni Access.

Preflight: receptor4157f63d y productor7ebc8570 al100%, sin ejecución activa; dos eventos históricos, una incidencia y cero constancias. Código de producción PR222/CI747. Wrapper QA ignorado impone deadline de diez minutos a recepción y ejecución, sin rutas públicas nuevas ni permisos de reparación. Firma temporal generada en memoria y custodiada solo como secreto Worker; no archivo/chat/Git. Cron de prueba cada minuto, con cierre automático del operador en finally y budget acotado. Esto no es una activación permanente ni prueba de PC apagado.

Resultado manual remoto aceptado a las15:57UTC; ejecución programada pendiente. No llamar éxito a la sola existencia del cron.

Extensión del alcance del ensayo: permitir un disparo manual remoto firmado mediante ruta QA temporal en el receptor existente, que solo delega al productor interno con validación HMAC/deadline. Sin rutas públicas nuevas del productor ni operaciones de clientes. Distinguir su resultado de una ejecución cron; retirar la ruta QA al cerrar y verificar404. El cron no produjo constancias dentro del budget de cuatro minutos; ello no confirma causa. Cloudflare documenta propagación hasta quince minutos: https://developers.cloudflare.com/workers/configuration/cron-triggers/ . No confundir falta de observación con aceptación programada ni prolongar una firma indefinidamente.

## Causa y corrección comprobadas

Los primeros disparos manuales registraron dos observaciones pendientes, confirmed_at0, sin invocar el receptor. Workerd reprodujo TypeError al construir Request con redirect:error; Node aceptaba esa opción. Cambiar a manual evita seguir redirecciones; el receptor sigue exigiendo202/JSON/accepted/fingerprint y las sondas sus estados exactos. Dos pruebas nuevas de runtime fallaron antes y pasaron después. No se relajaron HMAC, identidad, límites ni origen fijo.

La primera corrección entregó señales202 pero las sondas todavía usaban error, generando fallos sintéticos; su segunda corrección eliminó esos falsos negativos. Se conserva todo el historial, sin borrar eventos para obtener una prueba verde.

## Aceptación final manual

- Candidatos temporales: receptor114f8e27-1fba-4fe8-a6cf-a54e83fdb852, productor93b9543c-5bf3-41c7-ba70-7ca7493e6e93.
- Ambos recursos sanos según expectativa closed; primer ciclo entregado con dos recibos202.
- Segundo ciclo observado y suprimido por salud reciente, sin nuevos eventos.
- Canary confirmed_at1791129441628, observed_at1791129443852; real confirmed_at1791129442397, observed_at1791129444168; ambos recovered/delivery_pending0.
- Ocho eventos acumulados: dos históricos, cuatro fallos sintéticos durante diagnóstico y dos recuperaciones. No datos de expedientes.
- Cierre15:58:09UTC; receptor05ff8b9e-e8ba-4fd5-a3b3-6148fd71fa07 y productor7c1b5ac7-c57e-4035-bf90-7829dec402ff, flagsfalse, cero secretos, schedules[], binding solo receptor y D1 aislada. Ruta QA404 comprobada.
- npm test749/749, lint sin errores (un warning previo de img), build correcto.

Próximos bloques: aceptación de cron con ventana que contemple propagación; consumidor cloud con recibo real; watchdog independiente de silencio. Esta prueba no acredita notificación a Codex ni operación con PC apagado. No activar cadencia permanente antes de resolver esos criterios.
