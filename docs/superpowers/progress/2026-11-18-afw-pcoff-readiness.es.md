# AFW · Preparación de la prueba con el ordenador apagado

La aprobación final devolvió HTTP 200 en el laboratorio en 25,563 segundos desde la respuesta del formulario, dentro del plazo original de 30 segundos. Se verificó el recibo de aprobación y el cierre del ensayo. [Ensayo de aprobación](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44351420062)

La candidata compiló los dos módulos. Ambos pasaron el dry-run de Wrangler 4.164.0 en GitHub Actions y el resultado conservó los bytes de los módulos. Para comprobar el canary se generó una configuración temporal que solo declara el nombre y la política del Container existente. La versión fijada en el proyecto, Wrangler 4.128.0, rechaza esa política. La configuración de publicación quedó intacta. [Compilación y dry-run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44356770340) · [Documentación de Cloudflare](https://developers.cloudflare.com/containers/configuration/scheduling-policy/)

Pasaron 206 pruebas de código y 24 del formato del archivo en GitHub Actions. La lectura directa de Cloudflare confirmó que las tres versiones cerradas seguían desplegadas y que los hashes de código y configuración coincidían con sus referencias. La reversión se ensayó en CI con datos sintéticos. [Validación de reversión](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44354228813)

## Ensamblado y cierre de QA

El ensamblador leyó el respaldo real de R2 y el artefacto exacto de GitHub Actions. Combinó en memoria los dos módulos compilados y las tres versiones de respaldo. La lectura posterior comprobó las cinco huellas del conjunto. El código y la configuración privados permanecieron fuera de GitHub. Se retiraron los archivos temporales. El verificador pasó 29 pruebas. [Compilación](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44362436956) · [Pruebas del ensamblador](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44363940758)

Las versiones cerradas de QA, canary y operador seguían desplegadas. Cloudflare devolvió cero instancias activas y cero ejecuciones AFW sin terminar. La lista de todos los estados también devolvió un registro detenido. El respaldo exacto de QA respondió HTTP 404 en las cinco rutas del ensayo aislado.

El borrador conserva cinco módulos y el manifiesto de verificación. El código del Worker todavía tiene pendientes los registros del proveedor de datos primarios y del guardián que verifica la retirada y restauración. El Worker ya dirige la alarma al guardián, cuya fábrica aún requiere integración. Por eso el paquete sigue sin calificar para abrir el ensayo real. [Auditoría del código de QA](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44364395121)
