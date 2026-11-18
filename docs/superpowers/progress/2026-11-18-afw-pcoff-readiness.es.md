# AFW · Preparación de la prueba con el ordenador apagado

La consulta del formulario final volvió a funcionar en el laboratorio. La versión anterior agotaba el plazo en la preparación del formulario. La candidata reutiliza el contexto verificado dentro de la misma solicitud y devolvió HTTP 200 en 26,365 segundos, frente a HTTP 503 tras 30,022 segundos. [Comprobación de la candidata](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44347526396)

El paso que sigue, enviar y publicar la aprobación final, también devolvió HTTP 503. El servidor empieza la publicación cuando ya se consumieron aproximadamente 29 de los 30 segundos. Agrupar lecturas redujo el tiempo en una etapa anterior y no resolvió el último envío. La publicación final no produjo un recibo de cierre en esos ensayos. [Último ensayo](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44349595850)

La rama de laboratorio quedó cerrada y las cuatro ejecuciones terminaron. La lectura de Cloudflare confirmó que el Worker de QA sigue usando la versión de referencia de cierre. La candidata del laboratorio sigue pendiente de publicación.

Falta validar que la aprobación pueda completarse y conciliarse con su recibo dentro de un diseño que preserve la autorización y la restauración. Después falta verificar en el entorno real que el asistente en la nube reciba y revise el mismo aviso y que esa suscripción quede retirada. En GitHub Actions ya pasó el recorrido sintético con receptor simulado y consulta firmada del propietario. Gabriel todavía no necesita intervenir.
