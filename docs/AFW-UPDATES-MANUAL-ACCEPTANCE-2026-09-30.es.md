# Aceptación manual de Novedades

Fecha: 2026-09-30. El owner abrió en su Chrome habitual el expediente sintético propio `project-426895372673379e2ac43873c9112ef0c23f779877c9c21c03bb0c7834632b0a` de AFW. Se indicó conservar la sesión, sin cambiar datos ni ejecutar otra auditoría.

## Resultado declarado por el owner

Ante la comprobación «despliega Novedades de tu expediente y pulsa Revisar evidencia y siguiente paso; comprueba que se abre Entrega y comprobación de mejoras y aparece la observación con su fecha», respondió: «Sí, se abre y veo la fecha».

Esto acredita una comprobación manual declarada del camino normal de navegación y lectura fechada. No equivale a una captura del agente, a una prueba automática de navegador ni a probar fallos de red/recuperación. El owner confirmó que la página estaba abierta; la herramienta de control no logró recuperar su estado.

Producción confirmada en el recibo anterior: fuente `644e605`, versión `0f3eb3e6-38dd-46b7-9a1d-a31f92e47001`. No se verificó la versión de los assets cargados en la pestaña ni se provocó una recarga. La comparación de MA-06 sigue siendo histórica; el destino sintético fue retirado.

## Pendientes separados

- Mensaje de la guía de coincidencia de archivos: solicitada comprobación manual, pendiente de respuesta.
- Casos de lectura fallida/vacía: pruebas locales aprobadas en PR #132; no se provocaron fallos en la sesión del owner.
- Caso API del piloto: interpretación recuperada/revisada/guardada anteriormente; nueva inferencia real no acreditada por esta comprobación.
- No incorpora cliente externo ni demuestra scheduler, revocación de token activo o presupuesto monetario diario.

## Ajuste de navegación en preparación

El botón del copilot y el de novedades compartían una instrucción de apertura en estado React. Después de cerrar manualmente el desplegable, repetir la acción con el estado ya verdadero podía no reabrirlo. El ajuste preparado abre explícitamente el panel antes de llevar foco a su resumen y desplazarlo, manteniendo la vista breve y los datos. La prueba de reapertura repetida es local; consultar el recibo posterior para conocer integración/despliegue.

## Confirmación posterior de la guía

El 2026-09-30 el owner transcribió el mensaje visible «En la última comparación, los archivos coincidían con esta versión», su explicación de lectura histórica y los enlaces a archivos, comparación y responsables. También informó cápsula v1, dominio `delivery-qa.agentfriendlyweb.dev`, vencimiento 7 de octubre y prefijo de manifiesto `4acca65760b66a`, compatibles con el ensayo MA-06.

Se cierra la comprobación manual del mensaje de PR #130: reconoce coincidencia observada, evita repetir entrega según esa lectura y no promete certificación ni vigencia actual. Esta confirmación prevalece sobre el pendiente de mensaje anterior. Es una declaración del owner sobre la UI, sin captura del agente ni nueva comparación remota. El destino sintético fue retirado; no se acredita que esos archivos sigan disponibles ahora.

El ajuste de reapertura ya fue desplegado en PR #134, fuente `7c049da`; ver [recibo de navegación](AFW-DELIVERY-NAVIGATION-RELEASE-2026-09-30.es.md). Esta lectura del mensaje no prueba por sí sola la reapertura repetida ni fallos de consulta. Próximo cierre útil: aceptación de inferencia/revisión/guardado del piloto y preparación de una beta acompañada concreta, preservando el alcance actual y los pendientes operativos separados.
