# AFW: composición nativa de código y PKCE para preparación
20oct2026UTC /19octART. Basefe12b6f4/PR511.
Estado candidato: aceptación de protocolo en Actions pendiente. No describe un servicio publicado.

## Qué comprueba este incremento
El nuevo fixture test/fixtures/preparation-code-worker.mjs compone SDK OAuth1.2.1 + KV/D1 reales de workerd en el runner; inicia una transacción, comprueba cookie/decisión, emite código, intercambia con PKCE S256 y valida el token emitido desde KV. El token alimenta los hosts y MCP de preparación existentes; no se reemplaza validateToken por una función que acepte una cadena inventada.

El cliente y las credenciales efímeras existen solo en la prueba; ningún cliente de ChatGPT/G2 o namespace remoto se registra o amplía. Identidad humana, pantalla/controles de autorización, política temporal, limitador y fallo de ACK son adaptadores SINTÉTICOS de test. No prueban Cloudflare Access real, aprobación de una persona, UX o autenticación de un usuario de producción.

## Reutilización y límites
Fuente real reutilizada: política de elección, store OAuth, schema checker, frontera original5s, puente del contexto SDK, host de preparación, registrar MCP, dominio/ledger y servidor de lectura. JSON explícito en legacy y moderno; ningún parser SSE nuevo.
Las dieciséis subpruebas observan rechazos, grants/cápsulas/eventos D1 y resultados de clientes HTTP reales. Un código/PKCE incorrecto o repetido no emite token. El token de lectura no obtiene tools de preparación. Conciliación de ACK perdido conserva clave/resultado y usa una consulta explícita. Retirada D1 y revocación del SDK se prueban separadamente.

El store de consentimiento/grant contiene escrituras separadas y carece de campos específicos de perfil/fecha inicial. El kind ci-preparation-protocol-v1 y la derivación de inicio desde fin-600000 pertenecen SOLO al fixture: no son una propuesta tácita de esquema o perfil de producción. La inyección de fallo después de INSERT prueba ese punto conocido, no atomicidad distribuida ni todos los ACK posibles. Una retirada sin ACK, caída durante SDK completion u otras recuperaciones aún requieren diseño/pruebas del host real.

La selección de scopes por la política es necesaria: SDK approveConsent permite elegir scopes soportados por el servidor, incluso si no estaban originalmente pedidos. El fixture aplica el subconjunto original ANTES de esa llamada. Esto no declara una falla del Worker de lectura actual, que también restringe el subconjunto.

No se amplía el montaje de lib/delegated-oauth-worker.mjs. La futura implementación de consentimiento necesita admisión primaria/CAS, persistencia/migración y recuperación adecuadas, cuerpo/deadline/configuración/rollout y revisión UI propios. El test no acredita esas piezas porque su adaptador HTTP está en test/fixtures, no en un entrypoint del producto.

## Evidencia
Resultado de test, lint, build, revisión y merge se registran en el PR portador y issue497; este documento candidato no los presume. El ensayo puede pasar inicialmente porque compone componentes ya implementados; cualquier bug de producto requiere RED antes del arreglo.
[Plan y rulings](superpowers/plans/2026-10-20-afw-preparation-code-native.md).
[SDK1.2.1: consentimiento](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-consent.ts).
[SDK1.2.1: autorización, código y tokens](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts).
[Miniflare: KV del runner](https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/).

G2 sigue aceptado/CLOSED; no OTP o reconexión. Container02382110, suscripción/aviso/revisión útil/baja nativa, PC-off y Max separados. operationalReadiness=false. No despliegue, scope/client/grant real, migración, modelo, pago o correo.

## Diagnóstico inicial
Primer runf615fa90/CI39347113127 falló al intentar usar para MCP un token que el propio ensayo acababa de revocar indirectamente repitiendo su código. La implementación primaria del SDK exige esa revocación de familia. Se separa el replay con aserciones400+401 y se conserva otro flujo fresco para preparación; no se cambia el producto ni se suaviza la comprobación. Resultado final exacto pendiente en el recibo portador.

## Compatibilidad de identificador del cliente
La fuente primaria SDK1.2.1 createClient usa generateRandomString(16) con alfabeto Base64url. La gramática genérica AFW de identidades exigía primer carácter alfanumérico, por lo que rechazaba un clientId registrado que empezara '_' o '-'. Dos regresiones a través de proyección/host/dominio reprodujeron ese rechazo en30913561/CI39347978613; la composición nativa restante pasó.
La corrección candidata introduce oauthClientRef acotado para el campo de cliente y su pin, conservando longitud128, caracteres admitidos y las coincidencias exactas servidor/token/grant. No altera el formato de propietario/proyecto/grant ni convierte una cadena en autoridad; URL clientId metadata permanece fuera del perfil. No es un scope, cliente real, acceso, montaje o permiso nuevo.
El cambio/restauración del owner de la prueba aumentó correctamente la revisión mediante triggers. El ensayo conserva ese historial: primero exige conflicto de la revisión vieja y después obtiene la vigente por read_project_summary antes de preparar. No desactiva ni rebobina revisiones.
