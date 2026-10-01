# Primera tarea cloud: incidencia de arranque

Actualización posterior: una [tarea web de correo](AFW-CLOUD-MAIL-ACCEPTANCE-2026-10-01.es.md) sí ejecutó lectura Gmail y tiene cadencia horaria configurada. Es otro runtime, sin sandbox de código: no resuelve la incidencia de AFW Operations descrita abajo.

Fecha de observación 2026-10-01. Entorno publicado AFW Operations, repositorio visible `tokenizartinfo-ops/agent-friendly-web`, privacidad Solo yo, red restringida GitHub/npm, ningún secreto de red ni variable añadidos. Publicación confirmada; esto no acredita primera tarea iniciada.

Dos intentos sintéticos fallaron antes de crear una tarea: Nuevo chat en superficie Codex con Trabajar en Nube y AFW Operations seleccionado; continuidad desde el setup publicado `01a0f7d3-a806-76c5-a024-6ddf4ccb401b`. Ambos mostraron `Unable to determine project root for task`. El prompt permanece en pantalla; ningún resultado de ejecución ni recibo de tarea se generó. No afirmar PC apagado, evento activo o consumidor funcionando.

Se abrió Editar AFW Operations desde Configuración > Codex Cloud, borrador `01a0f831-c6d7-762c-831e-e32102e7d007`. Inspección del panel: repositorio correcto, instalación e inicio usan `/workspace/agent-friendly-web`; Avanzado ofrece Tailscale, sin campo raíz visible. No se cambiaron red, privacidad, scripts, permisos ni se republicó. La causa no está identificada: no atribuirla al repositorio, al navegador, al detached HEAD o al billing sin evidencia.

Siguiente: investigar cómo el producto resuelve la raíz del entorno publicado, contrastar con el setup y recuperar arranque sin recrear recursos ni ampliar accesos a ciegas. Una vez iniciada la tarea, exigir revisión/comandos/artefacto y después probar evento/cadencia con ordenador apagado.

Documentación oficial consultada: [entornos cloud](https://learn.chatgpt.com/docs/environments/cloud-environments) describe iniciar tareas desde entorno publicado; [tareas programadas](https://learn.chatgpt.com/docs/automations) describe eventos soportados Gmail/Slack/GitHub en planes elegibles. No demuestra disponibilidad concreta en esta cuenta ni un webhook arbitrario Cloudflare → Codex Cloud. Una tarea local de escritorio no sustituye esa aceptación.
