# AFW · Preparación de la prueba con el ordenador apagado

La aprobación final devolvió HTTP 200 en el laboratorio en 25,563 segundos desde la respuesta del formulario, dentro del plazo original de 30 segundos. Se verificó el recibo de aprobación y el cierre del ensayo. [Ensayo de aprobación](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44351420062)

La candidata compiló los dos módulos. Ambos pasaron el dry-run de Wrangler 4.164.0 en GitHub Actions y el resultado conservó los bytes de los módulos. Para comprobar el canary se generó una configuración temporal que solo declara el nombre y la política del Container existente. La versión fijada en el proyecto, Wrangler 4.128.0, rechaza esa política. La configuración de publicación quedó intacta. [Compilación y dry-run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44356770340) · [Documentación de Cloudflare](https://developers.cloudflare.com/containers/configuration/scheduling-policy/)

Pasaron 206 pruebas de código y 24 del formato del archivo en GitHub Actions. La lectura directa de Cloudflare confirmó que las tres versiones cerradas seguían desplegadas y que los hashes de código y configuración coincidían con sus referencias. La reversión se ensayó en CI con datos sintéticos. [Validación de reversión](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44354228813)

## Ensamblado y cierre de QA

El ensamblador leyó el respaldo real de R2 y el artefacto exacto de GitHub Actions. Combinó en memoria los dos módulos compilados y las tres versiones de respaldo. La lectura posterior comprobó las cinco huellas del conjunto. El código y la configuración privados permanecieron fuera de GitHub. Se retiraron los archivos temporales. El verificador pasó 29 pruebas. [Compilación](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44362436956) · [Pruebas del ensamblador](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44363940758)

Las versiones cerradas de QA, canary y operador seguían desplegadas. Cloudflare devolvió cero instancias activas y cero ejecuciones AFW sin terminar. La lista de todos los estados también devolvió un registro detenido. El respaldo exacto de QA respondió HTTP 404 en las cinco rutas del ensayo aislado.

## Datos de QA y control de cierre

La candidata ya puede verificar el recibo de preparación con los registros primarios de Cloudflare. Comprueba la ejecución y su paso exactos, compara ambos recibos con la semilla aprobada y exige que los despliegues de QA y canary sigan apuntando a las versiones registradas. La alarma de cierre comprueba el control guardado antes y después de obtener sus capacidades. En las pruebas, un control alterado frenó todas las operaciones de cierre y el control correcto completó la secuencia simulada.

Pasaron 60 pruebas y la candidata compiló para preparación. Una parte de la suite también fallaba en la versión anterior porque la hora sintética se tomaba del día de ejecución con una constancia de custodia fechada. Se fijó únicamente la fecha de la prueba. [Pruebas de la candidata](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44367371881)

## Retirada y restauración del canary

El código de la alarma de QA ya enlaza el control guardado con el actor nativo de AFW para retirar el permiso, solicitar el cierre y sellar nuevas escrituras del ensayo. La restauración del canary exige conservar la prueba del cierre y comprobar la versión desplegada en Cloudflare. Las pruebas reprodujeron una confirmación perdida de la retirada y comprobaron que el sistema recupera el resultado por lectura. También verificaron una única petición de restauración con lectura posterior de la versión cerrada. Pasaron 47 pruebas con datos sintéticos y la candidata compiló para preparación. [GitHub Actions](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44371035797)

La lectura de Cloudflare confirmó la vigencia del acceso de consulta y las tres versiones cerradas. El respaldo sigue en R2 privado, con un objeto de 4.209.422 bytes y sin dominios habilitados. La credencial del paquete figura vencida en Cloudflare desde el 8 de noviembre a las 02:59 UTC. El compilador sigue bloqueando la salida de un paquete publicable.

Falta montar los proveedores nativos de la ejecución y del receptor, y validar la restauración final de QA. Después corresponde verificar una credencial vigente y volver a ensamblar la revisión nueva con los respaldos. El ensayo real sigue pendiente. Debe vincular la recepción y revisión al mismo aviso, y comprobar la retirada de su suscripción y la restauración. Por ahora Gabriel no necesita intervenir.

## El mismo aviso en el cierre de QA

La candidata usa el recibo original de la suscripción en D1 y comprueba el registro autenticado de esa misma suscripción antes de retirarla. La lectura posterior vuelve a comprobar el estado retirado. Para adjuntar la entrega al cierre, deriva la referencia del aviso a partir del evento guardado en la base primaria. Si la referencia no coincide, el cierre conserva la retirada comprobada y deja vacía la evidencia de entrega. La comprobación de restauración final de QA conserva el recibo coincidente y su huella. Pasaron 37 pruebas dirigidas. [GitHub Actions](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/44384157419)

Sigue pendiente la integración del recibo que debe producir el asistente en la nube cuando revise el aviso. El recibo HTTP solo registra la respuesta al envío. La compilación de esta revisión generó módulos para preparación. Cloudflare confirmó que la credencial fijada en el paquete sigue vencida y que las tres versiones cerradas conservan el 100 % del tráfico. La prueba real sigue pendiente. Por ahora Gabriel no necesita intervenir.
