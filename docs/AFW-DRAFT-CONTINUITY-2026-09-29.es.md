# Continuidad del borrador privado (2026-09-29)

## Resultado de este bloque

En el expediente privado, los datos que la persona revisa y aplica desde el asistente local o el copilot vuelven al autoguardado existente (900 ms). La acción de navegar mediante un enlace del expediente ofrece **Guardar y salir** y espera una respuesta confirmada del servidor. Si falla la sesión, la conciliación o la red, conserva el formulario abierto. **Salir sin guardar** sigue siendo una decisión explícita. Los cambios guardados continúan siendo borradores privados; no autorizan publicación, despliegue ni atribución de evidencia verificada.

El guardado usa el proyecto de AFW en D1, con revisión e idempotencia existentes. No se crea un Durable Object para este flujo de una persona por expediente: no hay todavía colaboración simultánea ni conexiones persistentes que requieran coordinación por entidad. Cloudflare recomienda Durable Objects para ese tipo de coordinación, mientras D1 ya ofrece la persistencia del expediente. Si AFW incorpora edición simultánea o presencia en tiempo real, evaluar un objeto SQLite por expediente, sin duplicar la fuente canónica D1 sin un protocolo de sincronización y recuperación.

## Límites que quedan visibles

- Una pestaña que se cierra abruptamente, una caída del navegador o una conexión sin respuesta no pueden prometer una última escritura confirmada. El aviso nativo de salida permanece para cambios pendientes.
- El texto todavía sin aplicar en el cuadro del copilot y el audio sin transcribir no forman parte del expediente; no se convierten automáticamente en datos confirmados. El próximo bloque debe diseñar una bandeja privada de trabajo recuperable, aislada por usuario y proyecto, con retención y borrado explícitos. Debe mostrar por separado **borrador recuperado**, **propuesta sin revisar** y **dato guardado**.
- El expediente nuevo requiere una dirección web para guardarse en D1. Hay que resolver la continuidad de la conversación inicial antes de prometer recuperación de un proyecto sin sitio.

## Criterio de cierre y verificación pendiente

Las pruebas locales cubren que una propuesta revisada reanuda el autoguardado y que la navegación espera una confirmación antes de salir. Falta comprobar el recorrido privado con sesión real tras el despliegue del cambio y ejercitar los estados de red caída y conflicto sin introducir datos sensibles.
