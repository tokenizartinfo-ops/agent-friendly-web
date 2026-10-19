# AFW: consentimiento y montaje cerrado de preparación delegada

Fecha: 19 de octubre de 2026.
Proyecto: AFW. Repositorio: tokenizartinfo-ops/agent-friendly-web.
Base examinada: 1a85b150d5441343475cf404aae23f235a467dd9 / PR509.
Estado: DISEÑO Y PLAN DE FUENTE; ninguna concesión, cliente, scope, ruta, migración o configuración remota cambia por este documento. operationalReadiness=false.

## Resultado y límite del bloque

Completar el diseño del tramo entre los componentes de preparación ya implementados y un futuro consentimiento real. El resultado es una decisión implementable con pruebas y gates, no una invitación a reconectar ahora.

PR504–509 contienen servicio, esquema propuesto, host finito, puente OAuth, registro MCP, frontera HTTP y ensayo nativo en Actions. La composición con SDK/Request/workerd/D1 reales usa autoridad SINTÉTICA: no acredita token criptográfico real, consentimiento humano, despliegue o escritura autorizada de producción.

G2 de lectura/continuidad fue aceptado y cerrado el19oct. No repetirlo, reciclar su grant, ampliar aquel cliente o solicitar otro OTP por este plan. Container02382110, suscripción/aviso/revisión útil/baja nativa, PC-off y piloto de Max mantienen sus gates independientes.

## Lo comprobado en la fuente de base

| Área | Estado observado | Consecuencia para implementar |
| --- | --- | --- |
| lib/delegated-oauth-worker.mjs | allowedScopes solo project:read y evidence:read; validScopes exige lectura y máximo2; mismo validador en autorización/intercambio | Agregar una cadena al catálogo no basta; hay que actualizar y probar coherentemente todas las etapas del perfil nuevo |
| Formulario /authorize | Texto de solo lectura; evidence opcional; POST compara selección con transacción; grants nuevos llevan scopes_json | No reutilizar ese texto para una facultad de preparar; scope oculto o parámetro del navegador no es consentimiento |
| /connections y revoke | Vista dice lectura; retirada actualiza grant D1 | Mostrar el alcance real y conservar retirada/propiedad; cambiar el rótulo no demuestra retirada efectiva |
| OAuthResourceServer1.2.1 | requiredScopes se anuncia; handler conserva obligación de comprobar scope/contexto | Registro de metadata o HTTP401 no sustituye la admisión de cada tool |
| Host/puente PR505–506 | Exigen opt-in exacto, contexto verificado, tokenExpiry y ventana finita; scope prepare y D1 primario | El token no se decodifica en el navegador ni se reconstruye desde argumentos |
| MCP/HTTP PR507–509 | Registro desligado; caps4096/32768bytes, plazo original5s, JSON explícito para ambos protocolos | Futuro montaje debe preservar el mismo lease y fábrica autorizada; no asumir que legacy stateless produce JSON |
| db/agent-capsule-preparations.sql | DDL fuera de drizzle y no instalado remotamente | Ningún formulario de preparación se ofrecerá hasta comprobar esquema exacto y plan de preservación autorizado |

Esto describe fuente fechada. No certifica la configuración actual de un recurso remoto ni traslada permisos entre AFW y Tokenizart/FCO.

## Decisiones de producto y autoridad

Primer perfil de prueba: preparación de borradores del único expediente sintético propio, con cliente de ensayo separado del cliente de lectura G2. Se fijarán servidor, issuer/resource, clientId, projectId, ventana y revisión de fuente en un paquete NUEVO y acotado. Este documento no crea ese cliente o paquete.

El perfil de lectura actual conserva su comportamiento y no admite preparación. En el perfil futuro, el conjunto solicitado permitido será exactamente:
- afw:project:read para continuar solo con lectura;
- afw:project:read + afw:capsule:prepare para la elección explícita de lectura y borradores.

En esta primera prueba no se combinará evidence:read con preparación. No es un límite permanente del producto; reduce la matriz inicial y evita conceder evidencia privada sin necesidad. Otros conjuntos, duplicados, cadenas vacías, prepare sin lectura o scopes no solicitados se rechazan antes de crear un grant. Es una POLÍTICA PROPUESTA; el servicio actual sigue rechazando prepare.

La página no marcará permisos adicionales por defecto. Ofrecerá dos decisiones inequívocas y Cancelar; el POST mapeará la decisión contra la transacción guardada y la solicitud original del proveedor. Jamás aceptará que un campo scope arbitrario del navegador amplíe ese conjunto. La opción de borradores solo existirá si fue solicitada y el perfil, esquema y ventana son válidos. Elegir solo lectura crea únicamente lectura; no es una autorización pendiente para ampliarla después.

La concesión autoriza preparar y guardar borradores desde datos YA guardados. No autoriza cambiar respuestas del expediente, aprobar contenido, instalar, publicar, auditar un sitio, invocar modelos, cobrar, crear avisos ni mantener guardia. La conciliación solo lee el estado permitido y nunca llama a preparar.

## Textos de la futura pantalla

Título: **Conectar tu asistente**.

“Te acompaño a preparar el siguiente paso. [Nombre verificado del asistente] podrá leer el resumen de este expediente. Si elegís permitir borradores, también podrá preparar y guardar archivos propuestos a partir de los datos que ya guardaste. Después podrás revisarlos.”

“Tu sitio no cambia. Este permiso no permite aprobar, instalar ni publicar archivos, ni realizar cargos. Dura como máximo diez minutos y podés retirarlo antes.”

Expediente y sitio se mostrarán desde datos propios comprobados por servidor, escapados; cliente desde el registro del proveedor, nunca texto libre del callback.

Acciones:
- **Permitir solo lectura**
- **Permitir lectura y borradores**, solo si la solicitud original y el perfil habilitado lo permiten
- **Cancelar**

No prometer “nada se guarda”: preparar sí añade un borrador y su historial. Si la persona pregunta qué es un borrador: “Es una propuesta para revisar. Todavía no está instalada en tu sitio”. Explicar de forma breve antes de la decisión, sin jerga OAuth.

En conexiones: distinguir “Resumen” de “Resumen y preparación de borradores”, fecha/hora y zona explícitas. “Desconectar bloquea la próxima operación del asistente. Conservamos los borradores y su historial.” No afirmar que deshace una operación ya confirmada ni elimina archivos.

## Cadena de validación propuesta

1. Perfil por servidor y opt-in exacto, ventana y dependencias fijadas; inválido/cerrado no inicia transacción de preparación ni revela catálogo de escritura.
2. Identidad Cloudflare Access verificada en servidor para la persona; cliente/callback/resource/PKCE S256 comprobados por SDK. No copiar cookies, assertions o bearer al modelo, correo, Git o logs.
3. GET valida solicitud, propietario y expediente permitido, dominio/claim y esquema de preparación primarios ANTES de ofrecer el permiso de borradores. El form no crea reservas o cápsulas. Un fallo muestra pausa sin renovar permisos.
4. Transacción original de un solo uso ligada a subject, cliente, resource, proyecto y scopes solicitados. Tiempo absoluto fijado al comienzo; volver a renderizar no lo renueva. Conservar vínculo criptográfico/anti-CSRF del SDK y Origin/CSP/cookie actuales.
5. POST rechaza claves/valores duplicados, elección no permitida, sesión/propietario/proyecto cambiados, replay o ventana terminada. Revalida condiciones primarias antes de consumir la transacción y antes de emitir/confirmar la concesión.
6. expiresAt del grant = mínimo del fin original de transacción, fin del ensayo servidor y aprobación+600000ms. El intercambio vuelve a acotar tokenTTL por ese fin y tokenExpiry verificado. Ningún await, render, intercambio o reintento añade tiempo.
7. Preparación de este perfil no ofrece refresh_token, aunque un perfil de lectura histórico lo permita. Un nuevo permiso futuro requiere otra decisión visible; ni el agente ni un 401 lo renuevan automáticamente.
8. Si falla completar la autorización después de crear el grant, retirarlo conservando evidencia. Si el ACK de persistencia/retirada es incierto, no afirmar éxito ni crear otra concesión automáticamente; conciliar con lectura autorizada del estado.
9. En /mcp la frontera de bytes/origen/método/plazo corre ANTES del trabajo OAuth y entrega un lease opaco original al handler verificado. Expiry del SDK en segundos enteros se convierte solo por el puente existente.
10. La misma fábrica de servidor y host autorizado alimenta el transporte legacy JSON explícito y el moderno. Solo registrar herramientas de preparación cuando la autoridad actual incluya prepare. Un token de solo lectura no obtiene esa facultad; ambas capas host/D1 vuelven a rechazarla.
11. Cada llamada comprueba owner, grant activo/intercambiado, cliente/resource/proyecto/scope, revisión, claim y presupuesto. Cambios o retirada durante awaits impiden nueva confirmación. Un resultado ya confirmado se conserva, no se borra para aparentar cancelación.
12. Desconexión nativa y token revocation tienen que retirar la autoridad D1 y bloquear la siguiente llamada; comprobar también con cliente ya conectado. Listar la conexión no acredita esto.

expiresAt y los permisos son datos de servidor. No aceptar la fecha, identidad, aprobación, monto, dominio, clientId o “permiso del gerente” desde argumentos de una tool.

## Montaje y persistencia: bloques separados

Implementar primero política/selección/plazo y sus pruebas sin montar. Después render/form y store en fixture con el SDK exacto; mantener perfil de lectura sin cambios. Luego composición de /mcp reutilizando host/registro/frontera existentes, con ambos protocolos y errores401 preservados.

El DDL propuesto no es una migración lista para aplicar. Antes de habilitar el formulario:
- inventariar esquema real, datos y writers humanos/agénticos con cuenta/recurso/revisión comprobados;
- preservar copia recuperable y configuración/código, verificar recuperación en entorno autorizado;
- diseñar migración ADITIVA revisada a partir del DDL y probar base poblada, preflight estricto, concurrencia, errores y compatibilidad con el writer humano;
- aplicar solo con autorización y plan operativo concreto, no por esta spec;
- retirar montaje/flags conserva tabla, cápsulas y hechos posteriores. No DROP, borrado o restauración indiscriminada de datos legítimos.

El historial durable de preparación tiene identidades/versiones inmutables. Tras un ACK desconocido, usar la misma entrada y clave para consulta, sin repetir prepare, crear clave nueva o reconectar. Si venció o fue retirado el permiso, detenerse: esta spec no define un mecanismo de recuperación que eluda esa retirada. Una nueva sesión no hereda un permiso o una prueba anterior.

## Matriz de aceptación requerida

| Nivel | Caso | Resultado exigido |
| --- | --- | --- |
| Política | Perfil cerrado, ventana inválida, esquema ausente | Sin oferta/grant/reserva de preparación; lectura histórica preservada |
| Política | read-only / read+prepare / evidence+prepare / prepare-only / duplicados | Solo los dos primeros conjuntos bajo el perfil propuesto; ninguna ampliación implícita |
| UI | Elección explícita, móvil/teclado, error, idiomas activos | Alcance, guardado de borrador, vencimiento y retirada comprensibles; sin opción adicional preseleccionada |
| Transacción | Replay, otro subject/client/resource/project/Origin, campos extras | Rechazo sin concesión; sin eco de datos privados |
| Plazo | Espera entre GET/POST/intercambio, rollback de reloj, último segundo | Mismo fin absoluto; no refresh/ampliación; expiración terminal |
| Propiedad | Cambio owner/claim/revisión en awaits | No conceder/confirmar por snapshot anterior |
| SDK nativo | Auth code y PKCE real EN FIXTURE, persistencia y ctx.auth reales | Scope emitido igual al aprobado; token/admisión/catálogo congruentes; nada de callbacks fabricados |
| Transporte | Clientes legacy/moderno, límite real de bytes, cancelación/autenticación tardía | Original5s; JSON estricto;401Bearer conservado; sin segundo POST automático |
| Persistencia | Esquema ausente/viejo/poblado, carreras, writer humano | Sin permisos antes del preflight; historial y asignación de versión preservados |
| Operación | Preparación+ACK perdido+conciliación y revocación | Un borrador; consulta manual recupera bajo permiso vigente; siguiente llamada denegada tras retirada |

Las pruebas con SDK real en Actions seguirán usando identidades sintéticas donde corresponda; diferenciarlas de criptografía real de producción. No sustituir la prueba de código/intercambio por el validador sintético de PR509. La futura prueba criptográfica deberá declarar material efímero propio y no requerir secretos reales o OTP de Gabriel.

## Gates para un único ensayo real posterior

A. Código integrado con CI/revisión; matriz nativa de código/PKCE/consentimiento/retirada aceptada en runner.
B. Esquema real compatible, custodia y rollback vigentes, preparación finita NUEVA, cliente propio separado, recursos exactos y costo acotado verificados; flags/rollout de base preservados.
C. Publicación cerrada comprobada por fuente/hash/configuración. No invocar planes viejos start0/expires1.
D. Persona disponible y consentimiento NUEVO del expediente sintético por la pantalla vigente; no reutilizar G2/OTP/cookies del historial.
E. Una preparación, una conciliación si hace falta, retirada y lectura denegada; cierre y evidencia primaria del recurso. Fallo => cerrar, diagnosticar, no repetir por inercia.

Estos gates NO son G3/G4/G5: preparar borradores no prueba Container, evento, suscripción, recepción útil, guardia o ejecución con PC apagado. No pedir apagar hasta aceptación propia de toda esa cadena. Max requiere además su recorrido y aprobación exacta del correo desde hello@.

## Fuentes y continuidad

Fuente del repositorio fijada arriba: lib/delegated-oauth-worker.mjs, lib/delegated-oauth-store.mjs, lib/delegated-capsule-preparation-{host,oauth,mcp,http}.mjs, lib/agent-capsule-preparation.mjs y db/agent-capsule-preparations.sql.
[PR509 y CI nativa](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/509).
[OAuthResourceServer1.2.1 primario](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-resource-server.ts).
[SDK MCP createMcpHandler primario](https://ts.sdk.modelcontextprotocol.io/v2/api/@modelcontextprotocol/server/server/createMcpHandler.html).
[Plan de implementación](../plans/2026-10-19-afw-preparation-consent-mount.md).

Decisión: reutilizar el mismo núcleo y los grants existentes con perfil explícito; no crear un servicio de autorización paralelo ni alterar ahora la lectura aceptada. Costo: requiere implementación, prueba de store/esquema y aceptación de montaje posterior. Investigación de Chavo y roadmap comercial siguen revisables; no constituyen consentimiento de un cliente.
