# Lectura privada del retiro original

La clase concreta `AfwOwnEventNode` admite `observeRetired()` sin argumentos. Su `fetch` continúa cerrado. Esta lectura no aparece en herramientas MCP, no crea una suscripción ni inicia un contenedor.

La habilitación requiere `AFW_DOSSIER_RETIREMENT_READ_ENABLED=true` y una política administrativa `AFW_DOSSIER_RETIREMENT_POLICY` con los campos originales grantId, subject, projectId, clientId, resource, containerId, startAt, expiresAt, programHash y sourceRevision. No reutiliza la revisión del nuevo bundle ni requiere conservar una política Events activa. El binding de namespace y los pins OAuth del servidor deben corresponder al original. Ningún campo se toma de argumentos del cliente.

El lector autentica el registro original y exige cierre y retirada de ambos permisos en la primaria. Conserva comprobaciones de configuración e identidad antes y después de la lectura; el almacenamiento durable solo expone get dentro de una transacción. No construye un runtime ni consulta su readiness. La clave se deriva internamente y el buffer temporal se borra.

La constancia devuelve physicalStopVerified=false y mayStartSuccessor=false. Debe combinarse con la observación independiente del proveedor; no autoriza por sí sola un sucesor. Una política ausente, deshabilitada, alterada o de otra fuente falla cerrada.

Validación: clase Worker real importada con hooks sintéticos, SQLite y simulador de Container; arranque/cierre original y lectura posterior sin nueva ejecución ni modificación durable. workerd local comprueba RPC cerrada por defecto. No es evidencia de lectura remota, alta cloud, parada física o PC-off.

Esta entrega es fuente. No se ha habilitado el flag, escrito política remota ni desplegado esta versión. La operación posterior requiere manifiesto original recuperado, ámbito exacto y reversión comprobada.
