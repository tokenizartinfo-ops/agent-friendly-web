# Apertura controlada de consulta de expedientes

Estado: plan operativo; no publicación ni ampliación de permisos. Base aceptada: renovación acotada sintética y del resumen propio, retirada desde AFW y consentimiento mínimo. Ver AFW-REFRESH-ACCEPTANCE-2026-10-03.es.md y AFW-MINIMUM-CONSENT-2026-10-03.es.md.

## Primera versión útil

Conservar diez minutos de consentimiento como modalidad inicial: renovar conexión dentro de ese plazo, no renovar el permiso indefinidamente. Resumen por defecto, evidencia opcional expresa, sin herramientas para guardar/cambiar/publicar. El asistente hace una pregunta útil por vez, diferencia carga del expediente de capacidad AF y fecha de evidencia de estado actual. La respuesta faltante del owner no se inventa.

Una lectura fallida no acredita que el borrador se perdió ni identifica por sí sola retirada, caducidad o fallo de red. Mensaje de recuperación: «Tu expediente sigue guardado. No pude consultarlo con esta conexión; podés revisar el permiso en AFW». Solo afirmar que se retiró cuando existe evidencia autoritativa. Tras Desconectar no reconectar por inferencia; una futura conexión requiere decisión explícita. La frase genérica «caducó» del cliente ChatGPT no demuestra la causa concreta.

## Orden de ejecución

1. Inventariar origen estable, Worker, D1/KV, audiencia Access, registro exacto del cliente y callback; verificar estado actual y rollback. Mantener la separación de clientes mediante identidad del servidor, no correos/proyectos enviados por la herramienta.
2. Decidir modalidad beta de duración corta y política para nuevos clientes. Una ampliación futura del plazo necesita un contrato separado; no introducir30días por costumbre.
3. Preparar selección de expediente dentro del owner verificado. El límite actual del piloto fija uno; quitarlo no demuestra aislamiento remoto entre clientes. Probar selección y rechazo cruzado con dos sesiones reales antes de abrir a un cliente externo.
4. Vincular conexiones/recuperación desde el expediente y el asistente, sin que el cliente copie scopes, tokens o códigos. Mantener el guardado y la siguiente pregunta aunque la conexión se retire.
5. Registrar disponibilidad del servicio y soporte, retiro, caducidad, incidente y rollback. Probar el flujo normal y una denegación con el cliente ChatGPT real; conservar recibos anteriores válidos sin repetir por rutina.
6. Publicar discovery y auth.md únicamente hacia el origen estable activo con contrato real. No enlazar desde apex un canary cerrado ni publicar secretos, owners o expedientes. Cada documento debe describir los endpoints que realmente existen.
7. Volver a auditar externamente el origen público después de publicar. Registrar PASS/FAIL/fecha y score solo si fue devuelto. La aceptación de OAuth no acredita100/100 ni resuelve DNSSEC.

## Primer cliente y gerente cloud

Sector de Sistemas sigue como caso inicial asistido: recepción de acceso, objetivo declarado, carga guiada, propuesta, entrega, comprobación y seguimiento. El owner del cliente confirma datos ambiguos y permisos de hosting; la cápsula se adapta al proveedor y queda trazabilidad de responsables/accesos. No sustituir su objetivo por el de AFW ni completar campos para subir un porcentaje.

Codex cloud puede consultar y ayudar a diagnosticar dentro de herramientas y permisos comprobados. El acceso de lectura de este bloque no permite enviar correo, aplicar fixes, publicar ni gestionar los permisos del cliente. Disparadores, envío aprobado y pruebas con PC apagada tienen recibos separados: no inferir gerente permanente desde una lectura OAuth satisfactoria.

## Límites y cierre

El roadmap no autoriza saltarse custodia, consentimiento o permisos específicos de clientes. Cierre de apertura: dos identidades aisladas en runtime estable, alcance seleccionado correctamente, retirada/vencimiento comprobados, soporte de recuperación, rollback y documentación pública coherentes. Los pilotos permanecen cerrados hasta el siguiente bloque concreto; no hay acceso permanente activado por este plan.
