# Continuidad del relato privado del copilot

## Problema y corrección

El relato de trabajo tiene su propio guardado: incluye el texto escrito o incorporado desde una transcripción y las decisiones de la conversación. Es distinto de los campos confirmados del expediente. Sus lecturas y escrituras podían quedar pendientes sin un plazo propio y bloquear la recuperación o «Guardar y salir».

La corrección programa un presupuesto de 15 segundos para cada consulta de ese recurso, incluyendo cabeceras y JSON. Al vencer, cancela la lectura y libera el estado ocupado; no interpreta el vencimiento como rechazo o rollback del servidor. Una respuesta tardía no marca el relato como guardado ni reemplaza el texto actual. La limpieza de un efecto cancelado tampoco puede presentar un error tardío sobre otro montaje del componente.

El presupuesto depende de que el navegador pueda ejecutar tareas. No garantiza actuar a una hora exacta con el proceso suspendido ni guardar después de cerrar por la fuerza. No se añaden copias en localStorage, logs, correo o analytics.

## Recuperación guiada

El aviso explica que no se pudo confirmar y que el texto sigue en esta pestaña. «Comprobar guardado» queda visible junto al aviso, aunque esté plegado el panel de texto/audio. Su primer paso es una lectura privada; no repite automáticamente la escritura incierta.

Si el relato y sus decisiones ya coinciden con lo guardado, se recupera su revisión sin otro PUT. Si son distintos, se conserva lo escrito y se ofrece elegir una versión; no se atribuye esa diferencia necesariamente a otra pestaña. Solo después de elegir conservar el borrador puede reanudarse el guardado con la revisión actual y el control CAS existente.

La consulta se limita a `/api/projects/{projectId}/copilot/working-draft`; no abre un transporte a destinos arbitrarios. Conserva `cache: no-store` y evita seguir redirecciones de autenticación. Una sesión vencida, HTML, JSON inválido o un error de permisos no se convierten en un guardado confirmado. Un conflicto 409 mantiene su revisión separada.

## Límites de producto y autorización

Este cambio no permite usar el modelo ni procesar audio por el mero hecho de recuperar un relato. Conserva el pin propio de rollout, la identidad del propietario, el consentimiento del expediente y la confirmación de cada envío a IA. No incorpora una transcripción automáticamente a los campos definitivos, no publica, no amplía clientes y no activa avisos cloud.

La API, el esquema, las revisiones, la detección de credenciales y los permisos existentes no se modifican. El guardado de los campos del expediente mantiene su corrección anterior, documentada en [Recuperación de un guardado sin confirmación](AFW-SAVE-RECOVERY-2026-10-18.es.md).

## Verificación

Dos regresiones RED reproducen la espera indefinida usando los callbacks reales de lectura y guardado del componente. Las pruebas de recuperación cubren ACK perdido y tardío, lectura posterior sin duplicar PUT, decisiones recuperadas, texto local diferente, cancelación, cuerpo JSON bloqueado, redirecciones, conflictos y limpieza de temporizadores/listeners.

Son pruebas sintéticas. No acreditan un nuevo ingreso real, micrófono, transcripción con un modelo, suscripción, entrega útil o PC-off. La publicación y la aceptación de interfaz, si se realizan, deben registrarse por separado con su fuente y versión exactas.

La reversión de fuente no requiere migraciones ni retroceder datos. Si se publica, conservar la versión previa y la configuración efectiva; comprobar su recuperación antes de cambiar tráfico y después de una reversión. No repetir escrituras para documentar un resultado.
