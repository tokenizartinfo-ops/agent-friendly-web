# Montaje privado del primer sucesor

La clase `AfwOwnEventNode` conecta ahora el control de lanzamiento ya existente con lectores reales de custodia y proveedor. Permanece deshabilitado por defecto; este cambio de fuente no crea un ensayo ni despliega recursos.

## Configuración administrativa

El actor `afw-own-event-first-successor-v1` se resuelve en el mismo binding de namespace. Requiere `AFW_DOSSIER_SUCCESSOR_ENABLED=true` y `AFW_DOSSIER_SUCCESSOR_POLICY` con scope, original, candidate y publication. La publicación contiene artifactKey, workerHash y activationKey. Esta última se asigna antes de publicar la configuración; nunca contiene el deploymentId futuro. La fuente/programa y ventana del candidato deben coincidir con los del host; no se aceptan como parámetros de MCP.

La procedencia del código cerrado y la constancia administrativa de activación se consultan por separado en primaria D1. La segunda vincula activationKey, ensayo, scope y ventana con la versión y el despliegue generados por el proveedor. Sin esa segunda constancia no arranca. Después se comprueban despliegue activo, versión, namespace y aplicación por GET. El retiro se obtiene mediante la RPC privada sin argumentos del actor original y dos comprobaciones del proceso en el proveedor. Cada lector conserva sus límites y el host comprueba que no cambiaron configuración, binding o identidad durante la operación.

`AFW_DOSSIER_PROVIDER_READ_TOKEN` es una credencial exclusivamente de lectura custodiada en Worker. El código no verifica el alcance efectivo del token: debe comprobarse administrativamente antes de instalarlo. No se envía al contenedor Node, navegador ni cliente MCP. No reutilizar una credencial de otro servicio por similitud de nombre.

El actor candidato no puede arrancar por el camino anterior si se desactiva o elimina su configuración. El cierre histórico evita por completo la construcción del control del sucesor, permitiendo detenerlo aunque falten política, recibo o credencial. La observación del retiro original conserva su política propia.

## Validación y límites

Pruebas con la clase Worker concreta, SQL primario y almacenamiento durable locales: arranque con comprobaciones, rechazo sin recibo, rechazo por deshabilitación/ausencia/fuente incorrecta/cambio durante GET, cierre sin configuración candidata. El contenedor y la API de proveedor son simulados; no acreditan alta nativa ChatGPT, parada remota ni PC-off. workerd local verifica el estado cerrado por defecto.

Se diagnosticó un fallo intermitente previo de la fixture Windows: SQLite observaba el reloj 5 ms detrás de Date.now, rechazando correctamente una observación aparentemente futura. La evidencia sintética usa ahora el mínimo de ambos relojes. Los límites temporales de producción no se relajaron.

Pendientes reales: esquemas/recibos primarios de publicación y activación, reserva del sucesor, credencial con alcance de lectura comprobado, fuente cerrada desplegada y observada, proveedor habilitado, consentimiento propio vigente y alta/baja nativa con respuesta útil. No se pide apagar el ordenador por esta entrega.
