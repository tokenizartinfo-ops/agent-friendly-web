# Dos identidades reales: preparación y bloqueo humano

Estado: preparación, no aceptación de aislamiento remoto. La lectura/renovación del resumen propio y el consentimiento mínimo ya están aceptados; no repetirlos como tareas pendientes. Los Workers delegados siguen cerrados en las versiones del recibo AFW-MINIMUM-CONSENT-2026-10-03.es.md.

## Preflight

Cuatro pruebas existentes de selección/islamiento/cancelación/límites pasan contra el código PR198: seleccionar solo proyectos propios, rechazar otro owner/proyecto, retirar/caducar consentimiento, limitar el selector y rechazar replay. Suite completa731/731 y CI ya registrados. Simulación local no acredita dos sesiones reales.

Configuración de preparación ignorada output/afw-multiowner-closed.jsonc: mismo Worker real/D1/KV/cliente/audiencia, flagsfalse y deadline vencido; sin AFW_OAUTH_PILOT_PROJECT_ID para que el selector use solo los proyectos del owner verificado. No subida ni deployment de esta configuración; la versión activa conserva el pin del piloto propio. Generar una nueva ventana únicamente cuando ambos owners estén listos y registrar su fuente, deadline y rollback.

## Acceso a la segunda sesión

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT production-private-test; ORIGIN https://agentfriendlyweb.dev/expediente; RESOURCE_TYPE Access application policy; RESOURCE_ID b7d7d62e-de25-4b4b-ac52-972b104738a1. ALLOWED_ACTION agregar una regla separada para la segunda identidad de prueba previamente autorizada por Gabriel; no modificar reglas owner/primer cliente. ROLLBACK retirar únicamente la nueva regla QA, sin borrar expedientes ni cambiar reglas de clientes.

Preflight API: aplicación Agent Friendly Web Production Private Routes, destinos expediente/cápsulas/APIs propios AFW; reglas owner24dea92b-d7b3-47cf-a0d6-e1a00005e016 y primer cliente197c83d9-b87f-497c-9e25-38a880d03cd6 existentes. La segunda identidad no estaba habilitada.

Regla creada y verificada:4dde67e7-2dfc-4d4c-94f7-ddb2ff9bedf8, nombre AFW second identity acceptance 20261003, allow, precedence3, una sola identidad exacta, session_duration15m, sin everyone/bypass/servicios ni dominios completos. Ambas reglas originales preservadas. Quince minutos es duración de cada sesión, **no caducidad automática de la regla**: retirarla explícitamente al cerrar el ensayo. Esto no concede OAuth ni acceso a expedientes ajenos.

Se solicitó al owner ingresar en una ventana de incógnito de su Chrome habitual, conservando la sesión actual. No cerrar sesión global de Access, abrir perfiles ajenos ni tocar Tokenizart/Atelier. El owner introduce OTP en el navegador; nunca en chat. Intervención estrictamente necesaria: autenticación de la segunda cuenta. No afirmar que ingresó a partir de una regla API.

## Ejecución cuando esté autenticado

1. Comprobar en la UI que se resolvió la segunda identidad y su expediente propio. No crear/completar datos por inferencia; distinguir expediente de prueba de cliente real.
2. Preparar permiso humano de esa identidad en el servicio delegado: la aplicación del piloto solo admite actualmente owner principal. Agregar regla de prueba separada si hace falta, con recursos y rollback verificados; no ampliar la regla owner ni copiar JWT del navegador.
3. Abrir ventana limitada del candidato con selección de proyectos por identidad. Dos clientes/sesiones reales deben poder elegir únicamente su propio expediente. No seleccionar proyectos por inputs de la herramienta MCP.
4. Rechazar consultas/selección cruzadas, comprobar retirada por cada owner y conservar el borrador. Un token/proyecto sin identidad verificada no acredita la prueba.
5. Retirar todos los grants del ensayo, restaurar Worker cerrado con pin, retirar las reglas QA exactas y comprobar versiones/endpoints/reglas originales. NoDROP ni borrado de historia por rollback.

Hasta completar ese recibo: sin servicio comercial abierto, discovery de apex ni ampliación de duración. El acceso de Sector de Sistemas ya existe administrativamente; eso no prueba entrega de OTP ni ingreso efectivo del cliente.
