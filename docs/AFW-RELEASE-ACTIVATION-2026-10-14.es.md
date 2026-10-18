# Publicación de código y activación del ensayo

## Problema y corrección

Cloudflare crea una versión al cambiar código o configuración; el ID del despliegue se recibe después de crearlo. Referencia: https://developers.cloudflare.com/workers/versions-and-deployments/ . La política anterior pedía el deploymentId dentro de la misma configuración versionada y el lector exigía la versión cerrada original. Actualizar los flags generaba otra versión, y actualizar el ID volvía a invalidar la referencia.

El código cerrado conserva su recibo original e inmutable. Ahora la política usa una activationKey preasignada. Una segunda constancia, externa a la versión y guardada en primaria D1, vincula esa clave y el ensayo con la versión/configuración activada y el despliegue realmente observado. El runtime lee ambos recibos y conserva las comprobaciones exactas de versión, despliegue, namespace y aplicación. No se acepta simplemente la versión más reciente.

## Orden administrativo

1. Preflight de recuperación, recursos, esquema, permisos y gate del proveedor. Mantener servicio cerrado mientras se prepara. No reabrir OAuth para descubrir cómo publicar.
2. Publicar y comprobar código cerrado mediante su diario existente, con bytes/hash y recibo de versión. Una respuesta perdida no habilita repetir ese upload.
3. Fijar ensayo, scope, ventana y activationKey antes de construir la configuración. El digest de configuración se calcula fuera de la configuración: no contiene su propio hash ni IDs futuros. Las credenciales existentes se heredan de la versión base verificada; no rotarlas ni reutilizar secretos ajenos.
4. El operador prepara/publica la configuración aprobada usando el procedimiento de cambio acotado y reversible. Esta entrega NO automatiza esa mutación ni autoriza reintentos con ACK incierto. Los IDs que devuelve el proveedor se suministran al observador administrativo después de la operación, nunca se vuelven a insertar en env.
5. createActivationJournal toma el presupuesto de observación en primaria. createActivationObserver hace únicamente GET: verifica bytes de la versión activada, configuración aprobada sin valores secretos, etag, namespace, aplicación y despliegue estable entre dos lecturas. Solo entonces se conserva la constancia de activación. Repetir el mismo ensayo, incluso con otra clave, no crea otra constancia.
6. El Worker solo puede leer esa constancia. Verifica ensayo, scope y ventana exactos, procedencia original y versión activada. No se transmiten credenciales al Node ni al usuario. Retirada, caducidad y cierre histórico conservan sus controles propios.

## Alcance de las comprobaciones

Los nombres de secretos y la lectura de configuración no prueban sus valores ni su herencia; esa procedencia pertenece al procedimiento administrativo de publicación y debe conservarse en el preflight real. El observador no afirma comprobar valores secretos. El hash compara bindings públicos y nombres/tipos de secretos; rechaza valores secretos en el plan. No usar el diario como prueba de permiso efectivo de una credencial.

createActivationJournal recibe un observador administrativo confiable; nunca exponerlo por MCP/HTTP a entradas de usuarios. La composición concreta es createActivationObserver con configuración aprobada y objetivos fijados. Ninguno de los dos publica ni autoriza lanzamiento por sí mismo. Si falta el recibo, el candidato no arranca; la configuración puede estar publicada y el servicio continuar sin capacidad de iniciar el proceso.

## Validación local

SQLite y D1/workerd comprueban conservación del recibo cerrado, nueva versión distinta, presupuesto único por ensayo, rechazo por configuración/código/despliegue incorrectos, ACK perdido y plazos. La prueba de secuencia genera UUIDs después de fijar toda la configuración, escribe mediante el diario y verifica lectura del despliegue; rechaza otra versión posterior. La prueba de Worker conserva cierre sin configuración candidata y cero arranques si solo existe recibo cerrado.

Proveedor, contenedor e identidad de estas pruebas son simulados. No acreditan despliegue remoto, alta nativa ChatGPT, recepción útil ni ordenador apagado. Faltan preflight/publicación administrativa reales, custodia de lectura, schemas/recibos remotos y aceptación cloud antes del ensayo PC-off o piloto de Max.

## Confirmación de persistencia

La escritura de recibo y la aceptación usan límite temporal en SQL con reloj primario. Solo después de recibir ACK del recibo se escribe una aceptación inmutable; el runtime exige ambas filas. Una respuesta perdida o tardía del recibo no produce aceptación. Si se pierde el ACK de la aceptación final, el resultado queda incierto: una lectura primaria posterior puede verificar la aceptación efectivamente persistida, pero no autoriza repetir la mutación ni una publicación. El recibo aislado nunca basta. La revisión independiente reprodujo una escritura tardía en la candidata inicial; la regresión comprueba que después del timeout no se persisten recibo ni aceptación.

## Ajuste del presupuesto local: 18 de octubre

CI 39175297990 detectó una carrera de reloj en la prueba de escritura tardía: cero aceptaciones, pero un recibo aislado pudo persistir después de vencer el temporizador. El límite monotónico empezaba antes que la primera lectura del reloj de autoridad; SQL calculaba su límite sumando el presupuesto completo a esa lectura posterior. Una pausa del proceso entre ambas podía extender la elegibilidad SQL más allá del presupuesto original. No fue una respuesta nueva del proveedor ni una ejecución remota.

La regresión ahora fuerza ese intervalo con una primera lectura del reloj lenta y retiene el INSERT hasta el vencimiento. Falló antes de corregir. El diario deriva una sola vez el límite SQL del reloj de autoridad y el tiempo monotónico que queda, redondeado hacia abajo. El temporizador usa ese mismo final monotónico y lo comprueba antes de vencer; una lectura inicial lenta no recibe otro presupuesto completo. Los checks de reloj, ventana, ACK, intento único y aceptación separada siguen vigentes. Una lectura que agota el presupuesto no crea siquiera un intento.

Ocho pruebas dirigidas del diario, observador y secuencia, y ESLint dirigido, aprobaron localmente. Son pruebas SQLite/proveedor sintético: la corrección de fuente no publica el operador, no altera los recibos históricos, no activa permisos ni acredita suscripción, reparación de Containers, revisión útil, retirada nativa o PC-off. CI integral y revisión de la fuente deben comprobarse antes de integrar; el recibo público del relato del copilot conserva su aceptación separada.
