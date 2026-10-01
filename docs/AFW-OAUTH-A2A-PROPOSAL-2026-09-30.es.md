# OAuth y A2A: propuesta funcional para AFW

Estado: propuesta de arquitectura, no servicios implementados ni autorizacion delegada activada. Objetivo del owner: evaluar usos reales antes de publicar descriptores o perseguir puntos externos. DNSSEC queda para una nueva lectura en uno o dos dias; este documento no agenda una automatizacion.

## Utilidad y orden recomendado

OAuth permite que un cliente autorice a su asistente a consultar datos privados concretos de AFW, sin compartir su sesion ni conceder acceso general. MCP ofrece herramientas para esas consultas. A2A permite delegar un resultado completo a AFW, con tareas, estados y entregables, usando la misma capa de autorizacion.

Primer caso: el cliente conecta un asistente compatible y pregunta por el estado de SU expediente, evidencias fechadas y siguiente paso. AFW responde con un resumen proporcionado. No crea auditorias, modifica campos ni publica documentos por esta autorizacion de lectura. El MCP publico actual mantiene su acceso anonimo porque sirve informacion publica.

Segundo caso: una agencia o asistente empresarial encarga una revision acotada de una URL publica. AFW devuelve un informe y propuestas de archivos con referencias, limites y preguntas pendientes. La tarea no exige credenciales de hosting ni transacciones. Es posible pilotar este caso A2A publico con cuotas y sin datos privados, pero OAuth primero habilita el recorrido personalizado de mayor valor.

Tercer caso, posterior: el asistente trae datos que faltan y prepara un borrador del expediente o de los documentos. El copiloto de AFW muestra una sola aclaracion o propuesta por vez. Preparar no equivale a aprobar, guardar el expediente definitivo, instalar archivos ni publicar en el sitio.

## Arquitectura propuesta

- Adaptadores MCP privado y A2A sobre servicios de dominio compartidos: acceso a proyectos, evidencias, recomendaciones y propuestas. No mantener un segundo expediente independiente.
- Servidor OAuth separado conceptualmente del recurso protegido. Evaluar Workers OAuth Provider como opcion Cloudflare-native; comparar con un proveedor gestionado segun interoperabilidad, revocacion, operacion y costo. No implementar criptografia ni un authorization server casero desde cero.
- Cloudflare Access puede autenticar al humano en la pantalla de consentimiento. No usar su cookie/token como token OAuth delegado ni aceptar una direccion de correo declarada por el agente. Resolver identidad estable y membresia de proyecto en servidor; validar issuer/audience de Access donde corresponda. Endpoints de token/recurso deben ser alcanzables por el cliente OAuth; no ponerlos detras de un login humano que impida el intercambio.
- D1 conserva decisiones, membresias, evidencias y propuestas. Registro de grants con sujeto, cliente, proyecto, scopes, expiracion y revocacion. Credenciales bajo custodia; nunca en expedientes, logs o documentos publicos.
- Para tareas asincronas, evaluar Durable Objects como coordinacion por tarea y Workflows/Queues como ejecucion/reintentos, segun duracion y proveedor. D1 conserva el historial de negocio. No migrar todo el almacenamiento a Durable Objects; decidir tras medir el caso. Reconexion del front recupera el estado persistido.

## OAuth: primera entrega

Herramientas propuestas: leer resumen del expediente, consultar evidencias existentes y obtener el siguiente paso. Scopes candidatos separados, como `afw:project:read` y `afw:evidence:read`; el proyecto concreto se liga al grant en servidor, no se confia a un argumento libre. Nombres pendientes del contrato final.

Authorization Code con PKCE S256, redirects exactos, state/issuer segun protocolo, tokens destinados al recurso, vida corta y revocacion comprobable en cada acceso. Refresh tokens solo si el caso los necesita, con rotacion y deteccion de reutilizacion. Pre-registro de clientes de piloto como primera opcion operacional; evaluar CIMD para interoperabilidad general. No habilitar registro dinamico abierto por inferencia ni copiar ejemplos antiguos sin revisar la especificacion vigente.

Consentimiento humano: «Este asistente podra consultar el estado y las evidencias de este proyecto. Podras desconectarlo cuando quieras». Mostrar cliente, proyecto y acceso; desconexion sencilla, historial comprensible. Scopes de lectura no conceden ejecucion de auditorias, inferencia costosa, escritura ni despliegue.

Documentos tras probar el flujo: metadata del authorization server, metadata del protected resource, challenge `WWW-Authenticate`, contrato de autenticacion y `auth.md` fiel al mecanismo realmente soportado. No colocar el issuer de otro sistema en el apex sin resolver correctamente discovery y las comprobaciones externas.

## A2A: primera entrega

Skill candidata: revision de descubrimiento de una URL publica, con alcance AFW proporcional. Entrada: URL, objetivo y alcance. Salida: evidencia fechada, limitaciones de lectura, recomendaciones priorizadas y propuestas sin publicar. Reutilizar restricciones SSRF, redirecciones, tamano y timeout del auditor. Contenido remoto es dato no confiable, nunca instrucciones que amplian permisos.

Tarea con identidad y pertenencia verificadas, estados de trabajo/finalizacion/fallo/cancelacion y solicitud de aclaracion cuando sea necesaria. Devolver un identificador opaco de tarea; el identificador no concede acceso. Retomar despues de desconexion sin duplicar cobros, auditorias o propuestas. Semantica de idempotencia propia documentada, compatible con la version elegida; no prometer exactly-once para proveedores externos.

Empezar con consulta de estado; streaming solo cuando funcione reconexion. Webhooks mas adelante con destinos verificados, firma, proteccion SSRF, reintentos y deduplicacion. Cancelar detiene lo que sea posible; no asegura revertir una llamada externa ya ejecutada. Verificar autorizacion nuevamente al devolver resultados y en acciones duraderas; un grant revocado no debe seguir revelando datos.

La Agent Card solo anuncia endpoint, version, skills, modalidades y capacidades realmente implementadas. A2A 1.0 es la especificacion publicada consultada; verificar SDK, transporte y compatibilidad del scanner antes de fijar version. No adoptar silenciosamente ejemplos 0.3 como si fueran equivalentes ni declarar dos versiones sin pruebas.

## Criterios de cierre por bloques

1. Contrato privado de solo lectura y amenaza: resolver identidad/grant/proyecto, limites y mapa de endpoints; escoger cliente real del piloto y proveedor OAuth sin inventar compatibilidad con todos los asistentes.
2. OAuth local/canary: consentimiento, lectura del proyecto permitido, denial de otro cliente/proyecto, audiencia/issuer/scopes incorrectos, token vencido/revocado, codigo repetido, PKCE o redirect invalidos y ausencia de secretos en logs. Acceso anonimo al MCP publico sigue funcionando.
3. OAuth piloto: usuario autoriza, obtiene resumen util, desconecta y el siguiente acceso queda denegado. Documentar solo capacidades comprobadas y repetir auditoria externa; no garantizar una cantidad de puntos.
4. A2A piloto: cliente interoperable crea tarea, obtiene resultado y fecha, reanuda tras desconexion, solicita aclaracion y prueba cancelacion/reintento sin duplicados. No filtra tareas de otro proyecto. Limites de concurrencia/costo y observabilidad antes de abrirlo ampliamente.
5. Escritura propuesta: scope adicional, consentimiento adicional y revision humana con version esperada. Publicacion en hosting permanece un permiso y proceso separado.

## Valor comercial

OAuth habilita que AFW acompañe al cliente desde el asistente que ya utiliza. A2A permite integraciones con agencias y sistemas empresariales, revisiones encargadas por API y seguimiento contratado. El valor cobrable es el resultado y mantenimiento verificable, no el descriptor ni la promesa de subir puntos. Primero medir finalizacion, utilidad de recomendaciones, errores, costo por tarea y desconexiones efectivas con el piloto; comercializar despues.

No todos los clientes necesitan estas capas ni AF-5. Un sitio informativo puede resolver su necesidad con contenido y descubrimiento; el copiloto explica cuando sumar herramientas o delegacion aporta valor.

## Fuentes consultadas

- MCP Authorization (2026-07-28): https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
- Cloudflare MCP Authorization: https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/
- A2A 1.0: https://a2a-protocol.org/v1.0.0/specification/
- Estado AFW observado: `docs/AFW-EXTERNAL-AUDIT-2026-09-30.es.md`; MCP publico `public/.well-known/mcp/server-card.json`. Esta propuesta no cambia ese estado.
