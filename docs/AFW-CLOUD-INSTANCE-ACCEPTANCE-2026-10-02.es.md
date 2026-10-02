# Publicación corregida y aceptación de instancia nueva

Evidencia del 2 de octubre de 2026. Exclusivamente AFW Operations y `tokenizartinfo-ops/agent-friendly-web`; producción y canary de correo sin cambios.

## Corrección y publicación

El borrador revisión 3 guardó `mount_path: agent-friendly-web` y ref `fd3219b3dd49a60c6ee161e1693a8158501b9d41`. Checkout limpio, rollback e informes fuera del repositorio. Setup del candidato: 689 pruebas, lint sin errores, build y smoke 11/11. La UI conservó Solo yo, dos dominios permitidos, ausencia de secretos de red y variables. Se guardó y publicó: la UI confirmó «Entorno publicado». Esto sustituye el estado pendiente del diagnóstico anterior, no sus observaciones históricas.

## Tarea nueva: arranque recuperado, aceptación fallida

Una tarea independiente se creó y ejecutó; ya no falló antes de crearse por resolución de raíz. A las 10:23:24 de Buenos Aires observó instancia running/connected, revisión 2, raíz y origin AFW correctos, HEAD del candidato y Git limpio. Modelo GPT-6.1 Sol Bajo observado en UI; metadata no acredita facturación efectiva ni identidad exacta del snapshot.

Lint y build pasaron (una advertencia histórica de imagen). npm test falló en cinco archivos, con rechazos EPERM de sockets y spawnSync git, JSON incompleto y una aserción fallida. D1 local falló con listen EPERM en loopback; servidor con uv_interface_addresses. Smoke 0/11, fetch failed porque el servidor no arrancó. No atribuir todos los fallos al mismo origen sin diagnóstico.

Informe saneado de esa instancia fuera de Git: `/workspace/work/afw-acceptance-20261002T132324Z/REPORT.es.md`. Outputs resultó de solo lectura. No se alteró código, recursos remotos, red ni permisos para hacer pasar comprobaciones.

## Siguiente cierre

Contrastar política de ejecución de setup y tarea, recoger evidencia del bloqueo y usar únicamente mecanismos admitidos. No omitir asserts ni declarar operación completa por el arranque recuperado. Tras aceptación de pruebas locales: conexión mediada con destino específico, envío propio idempotente, disparador/cadencia y prueba con PC apagada. Consumidor sigue deshabilitado; todavía no se acredita correo autónomo ni recorrido del primer cliente.
