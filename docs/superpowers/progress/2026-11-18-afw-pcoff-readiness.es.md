# AFW · Preparación de la prueba con el ordenador apagado

La aprobación final devolvió HTTP 200 en el laboratorio en 25,563 segundos desde la respuesta del formulario, dentro del plazo original de 30 segundos. Se verificó el recibo de aprobación y el cierre del ensayo. [Ensayo de aprobación](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44351420062)

La candidata compiló los dos módulos. Ambos pasaron el dry-run de Wrangler 4.164.0 en GitHub Actions y el resultado conservó los bytes de los módulos. Para comprobar el canary se generó una configuración temporal que solo declara el nombre y la política del Container existente. La versión fijada en el proyecto, Wrangler 4.128.0, rechaza esa política. La configuración de publicación quedó intacta. [Compilación y dry-run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44356770340) · [Documentación de Cloudflare](https://developers.cloudflare.com/containers/configuration/scheduling-policy/)

Pasaron 206 pruebas de código y 24 del formato del archivo en GitHub Actions. La lectura directa de Cloudflare confirmó que las tres versiones cerradas seguían desplegadas y que los hashes de código y configuración coincidían con sus referencias. La reversión se ensayó en CI con datos sintéticos. [Validación de reversión](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44354228813)

## Respaldos privados y preparación del paquete

Los tres respaldos cerrados de QA, canary y operador quedaron en `afw-release-backups`, con acceso privado en Cloudflare R2. La lectura posterior verificó la huella del archivo, los siete componentes y los hashes del código y la configuración de cada versión. El acceso por `r2.dev` quedó deshabilitado y el depósito no tiene dominios personalizados. La configuración privada quedó en R2. [Acceso privado en Cloudflare R2](https://developers.cloudflare.com/r2/buckets/public-buckets/)

El compilador de preparación ya verifica que la referencia del respaldo coincide con las tres versiones aprobadas. El verificador del archivo exige la huella exacta y rechaza una referencia alterada. Pasaron 28 pruebas del archivo y 121 del compilador y sus controles. La compilación preparatoria verifica la referencia. El ensamblado final todavía debe consumir los bytes privados desde una ejecución autorizada. [Verificación en Actions](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44360862508)

El paquete publicable sigue pendiente. La candidata aún requiere integrar en el Worker de QA el origen de datos y el guardián de cierre de la ejecución real, y comprobar ese recorrido con el paquete restaurable. Está pendiente el ensayo que acredite, en una sola ejecución, que el asistente en la nube recibe y revisa el mismo aviso y que AFW retira esa suscripción. [Ensayo sintético de avisos](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44344076711)
