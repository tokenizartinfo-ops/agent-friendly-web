# AFW: condiciones para una identidad operativa estable

Estado: diseño operativo, no activación. Repositorio tokenizartinfo-ops/agent-friendly-web; receptor y manager exclusivos AFW. Los ensayos sintéticos y el snapshot no equivalen a una guardia permanente.

## Alcance mínimo

La identidad de recepción solo consume avisos y constancias del manager. No otorga revisión humana, lectura de expedientes, GitHub, despliegues, correo de clientes ni recursos Tokenizart/Atelier. Cada permiso adicional conserva un contrato independiente. Mantener política Access con selector de token exacto y binding servidor que exige esa misma identidad; prohibir any_valid_service_token. Custodia cloud limitada al hostname del manager.

## Provisionamiento y comprobación

Crear una identidad nueva inicialmente disabled, con vencimiento explícito acordado y responsable de renovación. Carga y publicación privada a cargo del owner cuando lo exija el formulario de credenciales. Sin secretos en Git, chat, logs, capturas o RAG. Antes de habilitar: comprobar fuente restaurada, configuración efectiva, token/policy exactos, journal completo y fences de revisiones terminales, presupuesto y reserva global. No promover el piloto24h ni extenderlo automáticamente.

Aceptación en QA: conexión proxy real, lectura acotada y ciclo con correlación independiente; retirar identidad/policy y observar denegación siguiente con el mismo contexto, sin reintentos. Las constancias históricas sirven de referencia, pero no acreditan una identidad nueva. Si falla cualquier precondición, mantener cerrado y registrar el resultado incierto.

## Rotación, caducidad y baja

Rotación conserva destinatario/alcance y debe invalidar la clave anterior antes de activar. Una nueva identidad requiere actualizar selector y binding servidor conjuntamente con una ventana acotada, nunca aceptar ambas indiscriminadamente. En caducidad o fallo de custodia: cerrar consumo, no reintentar indefinidamente ni renovar por inferencia; avisar al owner con metadata únicamente. Baja: token disabled, selector retirado, controles cerrados y comprobación independiente de settings/versiones; preservar D1 y reservas.

## Promoción y operación

Registrar fuente, Worker/versiones, Access/token IDs, vencimiento, responsable, dominio, presupuesto, ventana/cadencia y rollback. Instalar esquema operacional aditivo únicamente después de revisar su estado actual; preservar historia, triggers y resultados originales. No reutilizar D1 QA como operacional. Activar productor/recepción/cadencia en bloques separados con correlación y retirada verificadas. Diagnosed/reviewed/accepted nunca se anuncian como reparación. Fix de código requiere su propio diff, pruebas, CI, promoción y rollback.

Pendientes actuales: aceptación remota del POST extranjero con mecanismo soportado; decisión de duración y custodia estable; promoción de esquema y cadencia. La identidad piloto nueva permanece disabled y vence el6octubre17:31Argentina. No necesita renovación para conservar el cierre.
