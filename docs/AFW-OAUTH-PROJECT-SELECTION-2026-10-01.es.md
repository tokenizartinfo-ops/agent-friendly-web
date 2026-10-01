# Selección de expediente en consentimiento OAuth

Implementación local; ningún servicio remoto habilitado por este bloque. `/authorize` admite peticiones estándar sin `project`: consulta solo IDs/nombres del sujeto Access verificado, hasta 21 filas para detectar exceso. Un expediente se muestra y fija; varios (hasta 20) requieren selección explícita, sin valor predeterminado. Ninguno ofrece volver a AFW; exceso requiere un enlace de alcance específico, cuya integración de UI permanece pendiente. Se mantiene la ruta previa con `project` exacto.

El contexto del consentimiento queda ligado al sujeto, cliente, recurso, scopes y plazo en servidor. Un proyecto ya mostrado como único o fijado por query no puede sustituirse en POST. Para selección múltiple, POST requiere exactamente un ID propio y comprueba propiedad nuevamente después del consumo del nonce y al intercambiar el código. El grant y las herramientas quedan vinculados al proyecto seleccionado. Cancelar no requiere selección ni crea grant; `formnovalidate` evita que el navegador lo bloquee por un select vacío.

Pruebas: 634 tests aprobados; lint sin errores, con aviso de imagen preexistente. Casos nuevos observados fallar antes de implementación: autorización sin parámetro personalizado y sustitución de proyecto fijado. Cubiertos selección propia, escapes HTML, ausencia de proyectos ajenos, selección ausente/duplicada/ajena, cancelación, cambio de propietario, query repetida, replay, plazo y exceso de expedientes. Sin migración ni nuevos datos enviados al agente.

Pendientes para ChatGPT: registro/callback exactos, configuración de cliente admitida, guía delegada proporcional y aceptación real. Este bloque no acredita interoperabilidad ChatGPT ni reemplaza el recibo de canary real cerrado.
