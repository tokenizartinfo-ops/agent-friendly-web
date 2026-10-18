# Elección visible entre versiones del relato

## Hallazgo y alcance

Tras comprobar un guardado incierto, el copilot puede encontrar diferencias entre lo escrito en esta pestaña y la versión guardada. El aviso era visible, pero «Recuperar lo guardado» y «Conservar lo que escribí aquí» quedaban dentro del panel de texto/audio plegado. La persona no tenía a la vista el siguiente paso que pedía el aviso.

La corrección mueve esas dos acciones junto al aviso, fuera del panel plegado. No abre automáticamente toda la interfaz ni elige una versión por la persona. Conserva los callbacks, la revisión CAS, el texto, las decisiones, la revisión de propuestas y los consentimientos anteriores. No cambia API, esquema, fuente del modelo, micrófono, pin propio, permisos, avisos cloud o publicación de contenido.

Al recuperar la versión guardada no se genera otra escritura. Al conservar la edición local se retoma el guardado con la revisión conocida y el control de concurrencia existente. Una respuesta 409 no acredita un cambio nuevo guardado; el recibo aceptado de la escritura posterior sigue siendo independiente. El borrado voluntario mantiene la protección de [continuidad del relato](AFW-COPILOT-WORKING-RECOVERY-2026-10-18.es.md).

## Verificación local

El navegador con el componente React real y transporte sintético reprodujo en RED las acciones ocultas. Después de moverlas aprobó cuatro recorridos: ES escritorio conservando la edición, ES móvil recuperando la versión guardada, EN móvil recuperando y PT móvil conservando. Las acciones se alcanzaron también con teclado en ES, permanecieron fuera del panel cerrado y no hubo desborde en 1440×900/390×844 con movimiento reducido. Capturas inspeccionadas.

La recuperación no añadió PUT; conservar emitió una sola escritura posterior al 409 y avanzó una revisión. Ningún caso llamó al modelo o escribió otros campos. Las 26 pruebas dirigidas previas y ESLint dirigido aprobaron. No se añadieron pruebas que solo reproduzcan la posición del JSX; la regresión de interfaz se comprobó en el navegador.

Estas son pruebas locales de cliente. No acreditan una nueva sesión remota, audio real, suscripción nativa, entrega/revisión cloud, retirada, PC-off ni incorporación de Max. La fuente revisada, CI y una eventual publicación se registrarán con su versión exacta; este documento por sí solo no acredita despliegue.

## Reversión

No hay migraciones ni datos que retroceder. Una publicación conservará la versión y configuración efectivas previas y comprobará su recuperación antes de cambiar tráfico. No deshacer ediciones legítimas posteriores ni repetir escrituras del usuario para documentar un resultado.
