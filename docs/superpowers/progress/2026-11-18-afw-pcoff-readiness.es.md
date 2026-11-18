# AFW · Preparación de la prueba con el ordenador apagado

La consulta de preparación final quedó corregida en el laboratorio. Con la versión anterior, el servidor completó la lectura inicial y entró en la preparación del formulario, pero alcanzó el límite de 30 segundos y devolvió HTTP 503. [Fallo observado](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44346369830)

Dentro de la misma solicitud, se volvía a cargar un contexto que ya había sido verificado. La candidata reutiliza ese contexto y conserva los controles posteriores sobre la autorización, el historial y el guardado. El mismo recorrido sintético devolvió HTTP 200 en 26,365 segundos, dentro del plazo original. La rama de ejecución quedó cerrada. [Comprobación de la candidata](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44347526396)

En otro ensayo de GitHub Actions ya pasó la entrega simulada de un aviso, la consulta firmada y la retirada de la misma suscripción. Queda pendiente probar la aprobación final con el formulario corregido y, con una candidata validada para el entorno real, comprobar la recepción y revisión por el asistente en la nube, la retirada de esa suscripción y el cierre. [Ensayo del mismo aviso](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44344076711)
