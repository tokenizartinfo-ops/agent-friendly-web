# AFW: reconciliación móvil y siguiente aceptación cloud

## Evidencia revisada el 3 de octubre

Se revisaron los comandos de la sesión cloud, no solo su respuesta final: fuente ccd50c89e55b2f8a38b372908fae9737dfc93c4a, instalación de dependencias, 717 pruebas aprobadas, lint sin errores (una advertencia histórica por img) y build correcto. Wrangler informó explícitamente que no está autenticado; su código de salida cero no acredita autenticación.

La escritura GitHub quedó comprobada mediante la rama documental y el [PR 177](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/177), cabeza 2e06e0e323ac692a5d9a0c7e1d6da24ce6fea0a5. Su [CI](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/37128340267) pasó y se integró en c693c31d6bfdc848e7c0df172ea3cdadd5f4444c. No hubo despliegue en esa sesión. La declaración de Gabriel de trabajar desde el celular con el PC apagado se conserva separada de la evidencia de comandos.

Esta sesión de código cloud no demuestra por sí sola que el entorno publicado AFW Operations tenga las mismas conexiones, ni una guardia de reparación permanente. El recibo de Gmail programado y la capacidad de programar son aceptaciones distintas.

## Primera entrega cloud propuesta

- PROJECT: AFW; REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: canary cerrado; ORIGIN: a2a-canary.agentfriendlyweb.dev.
- RESOURCE_TYPE: Worker version; RESOURCE_ID: agent-friendly-web-a2a-canary.
- ALLOWED_ACTION: crear una versión inactiva de ese Worker desde GitHub, sin promoverla ni cambiar rutas, dominios, Access o bases de datos.
- Rama propuesta: release/a2a-canary-cloud, exclusivamente; raíz del repositorio. No conectar main ni todas las ramas como publicación automática.
- Preparación: instalar dependencias con npm ci; comprobar npm test y npm run lint. La aceptación general de build web ya registrada no sustituye la compilación específica del Worker.
- Comando candidato, cuya sintaxis se comprobó con Wrangler local: `npx wrangler versions upload --config wrangler.a2a-canary.jsonc --var A2A_ENABLED:false --var A2A_DISCOVERY_ENABLED:false`. Verificar compatibilidad de Workers Builds y configuración antes de guardarlo como disparador.

El 3 de octubre, las lecturas API del Worker canary devolvieron lista de triggers vacía y ausencia de configuración Builds asociada a su tag. La consulta de autocompletado del repositorio devolvió Not found: no permite concluir que el conector GitHub no esté instalado. No se crearon tokens, conexiones ni triggers.

## Permisos y criterio de cierre

Preparar en Cloudflare la conexión al repositorio AFW y examinar los permisos del token de Builds antes de concederlos. Restringir repositorio y rama no equivale a restringir el token a un Worker: no presentar un permiso de edición de scripts a nivel cuenta como exclusivo del canary. No aceptar silenciosamente una plantilla amplia para la cuenta compartida con Tokenizart. Si no existe alcance adecuado, mantener esta aceptación pendiente y diseñar un publicador mediado antes de guardar credenciales.

Secretos bajo custodia del proveedor, nunca en Git, chat, correo, capturas ni logs. No trasladar sesiones OAuth locales al entorno cloud. La sesión cloud probada carece actualmente de autenticación Wrangler; las herramientas Cloudflare de esta conversación local no demuestran disponibilidad en aquella.

Aceptar solo con recibo que vincule commit exacto, ejecución remota, resultado de pruebas, versión creada y comprobación de que la versión activa permanece intacta. Mantener flags cerrados y denegación Access. Esta primera aceptación no acredita publicación pública, OAuth de clientes ni reparación automática.

Rollback: deshabilitar únicamente el trigger nuevo si se crea; conservar la versión activa existente y los registros. Una versión subida sin promoción no exige cambiar tráfico. Cualquier promoción posterior requiere registrar antes la versión activa de rollback y su propio recibo.

## Orden siguiente

### Ajuste de implementación: token personalizado, 3 de octubre

La aplicación GitHub Cloudflare Workers and Pages quedó instalada para el único repositorio AFW seleccionado. El owner creó el token temporal aprobado con Scripts de Workers: Editar en la cuenta compartida, vencimiento mostrado 4 de octubre. No se guardó su valor en documentación. Este permiso antiguo abarca los Workers de la cuenta; no equivale a exclusividad del canary ni a permisos directos sobre D1/DNS/almacenamiento.

El selector de Builds no mostró el token personalizado y solo ofreció generar uno amplio. No se guardó el trigger. Se prepara como alternativa el workflow manual `.github/workflows/afw-canary-cloud-upload.yml`, restringido a la rama `release/a2a-canary-cloud`. Prueba, lint, build y compilación dry-run preceden a la subida inactiva con flags cerrados. La credencial se suministra exclusivamente mediante el secreto privado GitHub `AFW_CANARY_UPLOAD_TOKEN`, sin devolver su valor. Crear el workflow no acredita una ejecución ni una subida: ambos recibos siguen pendientes. Revocar el token tras aceptar la prueba; su expiración vuelve a bloquear futuras subidas.

Rollback del workflow: no ejecutarlo o retirarlo; no activa versiones ni toca el tráfico. La conexión GitHub instalada y el token creado tienen registros independientes y no convierten este workflow en una guardia automática. Fuente: [configuración de Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), que distingue tokens de usuario y custodia de compilaciones.

1. Resolver la conexión cloud a Cloudflare y aceptar la subida inactiva anterior.
2. Probar promoción controlada del canary cerrado y rollback, con evidencia separada.
3. Completar el piloto de consulta de expedientes desde ChatGPT con registro real del cliente, consentimiento y revocación; no publicar descubrimiento OAuth por puntos de auditoría antes de que el servicio exista.
4. Reconciliar las señales externas de AFW, incluida la propagación DNSSEC. Un resultado histórico de 73/100 o un nivel 5 no sustituye una auditoría nueva fechada.
5. Mantener la guardia cloud de lectura y preparar por separado el circuito incidente → propuesta → CI → revisión → entrega; no declarar automejoras operativas por haber conseguido un PR documental.
