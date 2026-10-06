# Entrada breve: publicación y comprobación, 6 octubre

PR290 integrada en main `1cc54f336b66e3ba77d5102bdd6e5277b4b7bcf8`, CI925 aprobadas. Artefacto construido desde `8d1ac1a` (solo plan documental adicional a main), Worker `agent-friendly-web-web-production`. Primera versión desplegada `a88c6d98-f2d3-4d85-aa3d-f3971bc3bffc`; versión efectiva final `68fbcb76-8d7e-4a20-8c1c-bd82f57aebd2` al 100% tras restaurar configuración vigente.

El deploy vinext no conservó los valores del piloto incluidos en la configuración temporal y aplicó los valores base false/vacío. Se restauraron por settings API inmediatamente y se verificaron nuevamente: AFW_COPILOT_ENABLED=true, AFW_COPILOT_PROJECT_ID=6e972c18-cae1-402b-b959-646abd8499d7, AFW_REMOTE_DEPLOY_ENABLED=false, D1=d26fc9d2-df5a-4957-8e58-cc4c945faad8. No migrations, cambios de Access ni ampliación del piloto. Para siguientes deploys, comprobar la configuración generada efectiva antes de publicar; el dry-run no detectó esta diferencia.

Chrome normal, sesión owner, `/expediente`: después de cargar mostró guía breve por defecto, pregunta de audiencia y botón para ver el expediente completo. No se editaron datos de producción. Evidencia local ignorada: `output/brief-entry-production-20261006.png`. Guardado y recuperación de una respuesta fueron aceptados previamente en Canary; esta comprobación de producción fue de lectura.

Rollback de código previo: `00861678-d968-41d3-be85-180896a321b7`, preservar D1 y los valores efectivos del piloto. Un rollback de versión no acredita por sí solo restauración de settings; verificar ambos.

La guía local no acredita conversación IA ni guardia cloud. Max todavía no recibió invitación corregida y no se creó su expediente en su nombre.
