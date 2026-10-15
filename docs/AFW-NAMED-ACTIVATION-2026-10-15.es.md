# Confirmación privada con identidad resuelta en el servidor

El operador privado incorpora `confirm_named`; `publish` y `confirm` conservan sus contratos. La nueva modalidad permite confirmar un despliegue sin copiar un ID de Durable Object o un `scopeHash` calculado localmente.

El bundle aprobado contiene configuración, manifiesto, artefacto, versión, despliegue y ventana de hasta diez minutos. Su plan no admite un `scopeHash` suministrado por el llamador. El operador extrae el manifiesto de la configuración aprobada y verifica cuenta, Worker, namespace, aplicación, recurso, programa, revisión, publicación, activación, ensayo y ventana. El mismo hash del bundle sigue siendo el único argumento RPC.

Antes de consumir un intento también exige la política viva del expediente, sin ID explícito, con ventana y recurso coincidentes y los mismos valores de issuer, cliente y proyecto OAuth. La revisión independiente detectó que su ausencia podía producir una confirmación inutilizable; el caso se reprodujo y corrigió con pruebas negativas. Esto no sustituye la autorización primaria del grant al ejecutar.

El binding privado `AFW_RELEASE_EVENTS_NODE` debe apuntar al namespace real de `AfwOwnEventNode` del canary AFW. Se resuelven únicamente los nombres fijos original y sucesor. La identidad del nombre original debe coincidir con el original preservado del manifiesto, evitando usar inadvertidamente otro namespace. No se llama a `get`, no se inicia un objeto ni un contenedor y no se escribe almacenamiento DO. El resultado se convierte en el plan del journal existente; las lecturas del proveedor todavía deben acreditar bytes y configuración exactos, versión activa y despliegue.

La confirmación guarda un solo intento y conserva la semántica de ACK y rechazo de repetición. El recibo devuelve `mayLaunch:false`; por sí mismo no inicia el ensayo. La retirada o deriva del binding y el vencimiento invalidan la operación. La ruta HTTP permanece cerrada.

## Evidencia y límites

Las pruebas negativas cubren manifiesto ajeno, ventana/revisión/programa/publicación divergentes, intento de introducir una huella manual, flag deshabilitado y cambio de identidad. El ensayo nativo local usa WorkerEntrypoint RPC, D1 y namespace de workerd; otro namespace y operador cerrado se rechazan antes de lectura del proveedor o escritura de intento. Una confirmación válida guarda la huella del ID resuelto y el segundo intento se rechaza sin nuevas lecturas. Las respuestas API del proveedor son simuladas: no acredita permisos remotos, adopción cloud ni PC-off.

## Montaje pendiente

Preservar la versión cerrada del operador y canary. Configurar el binding externo exclusivamente al namespace AFW comprobado, sin nuevas claves ni rutas públicas. Publicar primero la fuente aceptada en modo cerrado y comprobar su recibo; después preparar configuración y ventana completas, obtener sus IDs del proveedor e invocar la confirmación limitada. No reutilizar un recibo de artefacto anterior para código distinto ni copiar IDs de las pruebas locales. Mantener el operador deshabilitado fuera de la ventana y al terminar, incluso ante fallo. No reiniciar un intento de resultado incierto.

Faltan montaje remoto, efectividad de credenciales y aceptación del aviso útil/retirada nativos antes del ensayo acordado con ordenador apagado. Reversión del código sin borrar registros; cualquier reversión remota exige comprobar la versión compatible y el estado físico del proceso según las reglas vigentes.
