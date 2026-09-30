# Aceptación privada parcial: identidad de prueba B

Fecha: 2026-09-30. Solo AFW, `https://agentfriendlyweb.dev`; fuente funcional publicada `20155942dd01bfc31494ae05eeb0511c78690359`. El owner autorizó usar el navegador integrado de Codex ante las desconexiones de Chrome. Esta autorización posterior prevalece sobre la preferencia anterior de Chrome; no se abrió otra instancia de Chrome ni se operó en otras aplicaciones.

El navegador integrado tenía una sesión Access de una de las dos identidades proporcionadas por el owner (B). La dirección no se copia a esta documentación pública. Al abrir el piloto de la identidad A, no se mostraron datos del expediente y los controles quedaron deshabilitados. Al abrir `/expediente` sin ese ID, el espacio propio cargó y permitió guardar datos sintéticos.

Se creó `dfbab319-2701-4894-b6c8-01472a034913`, organización `AFW QA identidad B 2026-09-30`, sitio `https://example.org/`. La UI confirmó el guardado, mostró únicamente ese expediente en la lista propia y lo recuperó después de recargar. Una consulta D1 acotada por identidad y nombre sintético confirmó ID y revisión 1. No se publicó un perfil, no se preparó cápsula y no se abrió el piloto del copilot para B.

La navegación directa inicial a `/api/projects/<id>` alcanzó una ruta inexistente: su 404 **no se contabiliza como aislamiento**. El endpoint real de recuperación es `/api/projects?project=<id>`. La navegación directa a ese JSON quedó bloqueada por el cliente del navegador integrado; no se intentó evadirlo. La evidencia de esta entrega es el comportamiento de la UI, el contrato propietario del código y la recuperación de un expediente propio, no un código HTTP observado de denegación ni una escritura cruzada remota.

Se cerró la sesión B mediante el enlace normal de AFW y quedó abierta la página de Access para A. Se pidió al owner autenticarse con la cuenta del piloto, sin comunicar códigos ni credenciales por chat. El rótulo Tokenizart de la página de Access pertenece a la cuenta administrativa; la aplicación protegida y el destino siguen siendo AFW.

Capturas locales privadas, ignoradas por Git: `output/afw-identity-b-recovery.png` y `output/afw-pilot-login-handoff.png`. No se publican capturas con identidad de sesión. No hubo cambios de código, migraciones, políticas ni despliegues en este bloque.

## Siguiente prueba

1. Con A autenticada, repetir la interpretación citada de consulta de catálogo por API en el piloto y comprobar revisión/recarga; no aceptar pagos ni inventar nombre de organización. Limpiar el relato sintético cuando termine QA.
2. Abrir el expediente B con la sesión A y comprobar que no muestra los datos de B; comprobar la lista propia. No contabilizar la prueba UI como una petición de escritura HTTP si no se envió.
3. Si se utiliza la otra identidad adicional C, crear solo datos sintéticos propios y repetir pausa/retorno y lecturas cruzadas. La prueba completa de escritura cruzada y retirada de acceso continúa pendiente.
4. Retirar al terminar la política QA registrada en [el recibo de producción](AFW-GUIDED-RELEASE-2026-09-30.es.md); sus sesiones de 1 h no hacen expirar la política.

MA-07 permanece parcialmente validado. Esta prueba no acredita una instalación en un sitio de cliente ni cierra MA-06.

## Continuación con A autenticada

El owner confirmó que el intento rechazado usaba un código antiguo. Con un código nuevo, la UI mostró la sesión A y recuperó el piloto. No se modificaron políticas para resolver el acceso.

La propuesta recuperada citó exactamente la consulta del catálogo mediante una API. Se revisó, se aplicó al borrador y se guardó mediante la UI; tras recargar, quedaron seleccionados contenido y herramientas, sin pagos ni acciones delegadas. No se incorporó una organización genérica. Esto acredita recuperación, revisión y persistencia de la propuesta en una sesión real; no acredita una nueva inferencia remota en esta continuación.

Con A se abrió el ID sintético de B: campos vacíos, controles deshabilitados y mensaje de expediente no disponible. La lista propia de A mostró solo sus dos expedientes, sin el de B. Queda comprobado el aislamiento visual en ambas direcciones; no se envió una escritura cruzada ni se observó su respuesta HTTP.

Se dejó abierta la guía breve del piloto A. Captura local privada: `output/afw-pilot-authenticated-recovery.png`. El relato sintético de trabajo sigue conservado para regresión; no se publicó. Pendientes: limpiar el relato al terminar QA, comprobar escritura cruzada con un mecanismo autorizado y retirar la política temporal QA sin afectar al owner.

Hallazgos de interfaz para el siguiente bloque: tras consumir la propuesta aparece «No encontré datos suficientemente claros», aunque la interpretación fue correcta; al aplicar se mezcla la indicación de autoguardado con una invitación a guardar manualmente. Unificar mensajes con el estado real de persistencia y evitar presentar una propuesta consumida como falta de comprensión. La consulta por API conduce a la pregunta sobre editor del sitio; revisar si primero corresponde concretar datos, audiencia y alcance de consulta antes de detalles de entrega.
