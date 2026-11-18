# AFW · Preparación de la prueba con el ordenador apagado

La aprobación final devolvió HTTP 200 en el laboratorio en 25,563 segundos desde la respuesta del formulario, dentro del plazo original de 30 segundos. Se verificó el recibo de aprobación y el cierre del ensayo. [Ensayo de aprobación](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44351420062)

La candidata compiló los dos módulos. Ambos pasaron el dry-run de Wrangler 4.164.0 en GitHub Actions y el resultado conservó los bytes de los módulos. Para comprobar el canary se generó una configuración temporal que solo declara el nombre y la política del Container existente. La versión fijada en el proyecto, Wrangler 4.128.0, rechaza esa política. La configuración de publicación quedó intacta. [Compilación y dry-run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44356770340) · [Documentación de Cloudflare](https://developers.cloudflare.com/containers/configuration/scheduling-policy/)

Pasaron 206 pruebas de código y 24 del formato del archivo en GitHub Actions. La lectura directa de Cloudflare confirmó que las tres versiones cerradas seguían desplegadas y que los hashes de código y configuración coincidían con sus referencias. La reversión se ensayó en CI con datos sintéticos. [Validación de reversión](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44354228813)

## Integración de los respaldos

Cloudflare confirmó en memoria que las tres versiones capturadas coinciden con sus huellas históricas. La revisión detectó cinco valores de configuración del canary que requieren custodia privada. El repositorio principal es público. Se guardaron únicamente las huellas, los conteos y la referencia de las versiones.

El verificador del archivo de respaldo pasó 27 pruebas en GitHub Actions. Comprueba la estructura, el recibo y las huellas de cada módulo y archivo de configuración. Las pruebas usaron datos sintéticos. [Verificación del archivo](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44358339019)

Hace falta una ubicación privada autorizada para conservar las versiones exactas. Después se debe completar la admisión de ese archivo en el empaquetador y validar la reversión con el paquete completo. El ensayo real de recepción, revisión del mismo aviso y retirada de la suscripción queda pendiente. [Ensayo sintético de avisos](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44344076711)
