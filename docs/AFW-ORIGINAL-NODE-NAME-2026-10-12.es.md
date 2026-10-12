# Resolver el DO original sin exponer un selector

Para el montaje propio se incorpora un modo de nombre fijo de servidor: `afw-own-event-one-occurrence-v1`. La variable interna `AFW_DOSSIER_EVENTS_NODE_NAME` solo puede tener ese valor; el binding original resuelve su ID real con `idFromName`. El nombre nunca procede de parámetros MCP ni del expediente. No existe endpoint de identidad, actor temporal o prueba repetida de Node para obtenerlo.

En ese modo la política fija contiene grant, subject, proyecto, cliente, recurso y ventana; su `containerId` se obtiene únicamente del binding. El DO y el control privado siguen comparándolo con la identidad original de plataforma y la custodia D1. El modo anterior de ID explícito sigue siendo válido cuando el operador ya posee ese ID.

Un namespace propio y un nombre constante constituyen un único intento. No cambiar el nombre, borrar historia ni crear otro namespace para reconstruir un ACK desconocido o renovar presupuesto. El cambio prepara fuente; no crea objetos, arranca procesos, habilita seguimiento ni acredita ejecución cloud.
