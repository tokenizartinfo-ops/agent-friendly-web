# Entrega aislada y cerrada del servicio de preparación
20oct2026 · AFW · PB1, independiente de Container02382110.

## Alcance y decisión
Extensión acotada de la compilación existente PR524 y del lector de artefactos PR530. El owner delegó las decisiones rutinarias y pidió encadenar este bloque. Se conserva el mismo programa compilado y sus guardas; no se rediseña OAuth, instala un esquema o abre la preparación. Una única revisión de toda la rama antes de integrar. No implementadores paralelos.

Se eligió un paquete cerrado verificable: evita volver a compilar bytes ya aceptados o ampliar el Worker G2. La alternativa de conectarlo ahora al D1/KV de producción invadiría datos y permisos fuera de este paso. Coste de esta decisión: el servicio seguirá sin poder preparar un borrador hasta completar los gates explícitos.

## Paquete de origen
Buildpushmain39488774029/job118856013429, fuente b2d5f2952a1761cd93a34560e3ea7d92bd8df071/árbole4147de72e1e4bbf5832a16516a54b7dc0bf43b6. Artefacto12294059251,326745bytes,SHA25671f82fc387dd4149ced2bee2f6a09d9d57711ae4e51a7170659095380cb5c8da,vence27oct20:04:31UTC.
Worker1684646bytes/SHA2566185255e90e3f6800d2efc9b2a6463417b98c2edc53cbbbdc022afec9ec95cee. Coincide con los bytes compilados de la aceptación PR524; no se cambian por el HEAD del calificador.

El preflight descarga en GitHub con el lector existente: solo el primer GETAPI lleva el token efímero, redirecciones permitidas sin auth, límites/plazos fijos y errores saneados. Verifica ejecuciónpush/main/intento/fuente/repo/expiry, ZIPexacto, soloindex.mjs/build.json regulares, CRC/tamaño/UTF8/hashes y metadatos. Extrae únicamente esos dos nombres fijos ya validados; nunca executa el ZIP como un script Node. No reconstruye la aplicación ni llama aCloudflare. Los recibos separan checkout real/eventRevision y sourceRevision.

## Perfil cerrado
Target seleccionado: cuenta85d0d5dadac3341a564f22ce885e9eec, Worker agent-friendly-web-preparation-canary. GET21:05:56UTC devolvió Worker404, D1nombreexactovacío y dominio preparation-canary.agentfriendlyweb.dev sin asociación. Es evidencia fechada, no reserva de nombre. KV no se buscó ni se declara ausente. El hostname es propuesto y no se crea ni asigna como issuer.

wrangler.closed.json: ESM sin bundle, compat2026-09-07/nodejs_compat igual al test aceptado; workers_dev/preview_urls/keep_vars false; cuatro flags de router/gestión/OAuth/preparación false. SinDB,KV,servicios,DO,assets,rutas,cron,issuer,cliente,proyecto,ventanas o claves. Observabilidad desactivada, logpushfalse ytailsvacíos. Validación por JSON canónico estricto rechaza claves extra, cambios de tipo, aperturas o targets compartidos.

El código por defecto devuelve404/no-store antes de leer identidad/configuración/almacenamiento/cuerpo. Miniflare/workerd ejecuta el ARTEFACTOexacto con ese perfil y un rollbackmjs separado: ocho rutas GET/POST,32respuestas cerradas, tres facultades false, bytes iguales antes/después; los procesos se disponen en finally. No es una prueba de HTTP alojado ni de permisos humanos.

## Recursos y datos pendientes para abrir un ensayo
1. D1/KV dedicados al mismo servicio, sin reutilizar producción pública o G2; IDs aún no asignados. Inventario de tablas/índices/triggers y una fixture sintética propia revisados antes de DDL. Las pruebas actuales recorren drizzle más db/agent-capsule-preparations.sql y db/delegated-preparation-consents.sql: no autoriza aplicar toda esa cadena en una base ajena.
2. Cliente exacto/redirects/resource/PKCE y custodia de servidor verificados; no copiar registros, grants, cookies o secretos del piloto anterior.
3. Identidad Access/audiencia/rutas humanas alojadas, ventana original del agente y gestión humana y consentimiento para este propósito.
4. Recorrido real read→draft→reconcile→withdraw y recuperación comprobada. Preparar no permite instalar/publicar/cobrar.
5. Discovery, contratación, pagos e instalación son etapas adicionales. Avisos/Container/PC-off y Max mantienen sus gates aparte.

Estos pendientes no impiden conservar o alojar un Worker cerrado sin bindings. No declarar un servicio consumible, scopes abiertos o readinessoperativa desde su presencia.

## Reversión antes de una publicación
Se preserva rollback.mjs de mínima respuesta404 con su SHA y prueba nativa; no usa storage/Container/identidad. Para primer destino ausente: reread cuenta/nombre/ausencia, instalar primero y verificar una baseline cerrada sin conexiones; conservar su versionID antes de subir el programa cerrado. No generar ahora un comando de activación o borrado. Una baseline local no es una versión remota ni prueba de rollback ejercitado.

Si se publicara, guardar profile efectivo/versions/workers.dev/preview/rutas/cron/bindings antes y después. Ante drift parar, nunca sustituir un Worker existente por nombre parecido. Volver a la baseline cerrada solo del target propio, conservando datos legítimos posteriores; cuando exista DB, cerrar acceso no implica rebobinar datos. No borrar/recrear namespace, grants o D1 para resolver un fallo.

## Evidencia y límites
RED77bbabc2/run39498091284/job118888269807:6fallos esperados, checker inexistente, sin descarga ni paquete emitido. Los recibos GREEN/revisión/merge se conservan en PR531 y #497.
El workflow es readonlycontents/actions, runnerUbuntu24.04/Node22/10min; npmci--ignore-scripts solo para runtime nativo. Sin credencialCF, modelo, Docker, navegador o build de aplicación; outputs7días no renuevan expiry original.
Huellas y target revisados pueden prepararse en cloud. Publicar cerrado requiere un recibo remoto distinto; habilitar datos/cliente/permiso requiere los gates anteriores. operationalReadiness=false.
