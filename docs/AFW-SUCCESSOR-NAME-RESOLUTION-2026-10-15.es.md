# Identidad fija del segundo ensayo

## Problema y cambio

El host sucesor ya exige el actor `afw-own-event-first-successor-v1`, pero el lector compartido solo aceptaba el nombre del original. La configuración del segundo ensayo requería copiar previamente un ID remoto. Se añade ese único nombre al lector; el binding del mismo namespace resuelve la identidad sin `get`, arranque ni escritura durante la resolución.

En modo vivo se exige el flag sucesor, un manifiesto válido, identidad distinta del original, ventana coincidente y el mismo recurso. El host existente conserva la comprobación de código, recibo de activación, retirada original y presupuesto único. No se permiten nombres libres ni mezclar nombre con `containerId` explícito. Las variaciones de configuración invalidan la lectura en curso.

El cierre histórico puede resolver el mismo actor después de vencer y sin política sucesora viva. Esto no concede permisos de arranque: solamente conserva el camino de cierre existente. La política independiente de retirada del original permanece sin cambios.

## Verificación

Pruebas RED: el lector anterior rechazó los casos positivos de nombre sucesor, variación y cierre histórico. Pruebas específicas posteriores: identidad, manifiesto inválido, permisos ausentes, mezcla de ID, ventana, recurso, reutilización del original y cierre sin lectores. El fixture workerd obtiene el ID desde su namespace real local, lo compara con `ctx.id`, verifica diferencia del original y cero filas guardadas. Las pruebas del host con proveedor simulado conservan el rechazo sin activación y el cierre tras retirar permisos.

## Alcance pendiente

Es una corrección local, no un despliegue ni aceptación cloud. Sigue pendiente preparar el `scopeHash` administrativo con la identidad remota comprobada, confirmar permisos efectivos de lectores y recibo de activación, completar alta/aviso útil/baja nativos y coordinar el ensayo con PC apagada. No sustituir identidad remota por la del fixture local. No repetir el intento original ni modificar su historial. Reversión del código: revertir este cambio; no borrar almacenamiento ni registros.
