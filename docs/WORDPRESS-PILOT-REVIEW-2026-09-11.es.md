# Revision del piloto WordPress: entrega asistida

Fecha: 2026-09-11. Estado: consolidado con bloqueo abierto; no aprobado para automatizacion remota.

## Frontera

- PROJECT: Agent Friendly Web.
- REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: disposable_ci; sin clientes ni datos reales.
- ORIGIN: GitHub Actions / loopback de contenedores aislados.
- RESOURCE_TYPE: pruebas, recibos y documentacion del PR #50.
- RESOURCE_ID: run 34606426357; revision 41dd17239f3e9a26ba07ca330dd4847200bebd0d.
- ALLOWED_ACTION: revisar evidencia y consolidar documentacion. Sin deployment.
- ROLLBACK: cambios documentales reversibles mediante Git; ningun cambio productivo.

## Resultado comprobado

[Ejecucion revisada](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/34606426357).

| Entorno | Resultado | Alcance |
| --- | --- | --- |
| WordPress 6.8.3, PHP 8.3.28, Apache/MySQL aislados | Correcto | Crear, actualizar y restaurar dos archivos, comprobar hashes y HTTP, rechazar versiones obsoletas y limpiar contenedores |
| PHP 8.3.6 nativo | Correcto | Contraste HTTP de archivos estaticos; no prueba WordPress |
| Playground CLI 3.1.53, WordPress 6.8.8 | Fallido | Publicacion correcta; despues de eliminar los archivos, sus URLs devuelven 500 en vez de 404 |

En WordPress nativo se verificaron `/llms.txt` y `/llms-full.txt` por GET/HEAD,
MIME y SHA-256. La actualizacion incluye UTF-8 y cambios de saltos de linea;
la restauracion recupera exactamente los hashes anteriores. La portada responde
200 al finalizar, `index.php` conserva su hash y el nombre del sitio no cambia.

La prueba rechaza un hash antiguo antes de actualizar y antes de restaurar.
Eso no prueba concurrencia real ni compare-and-swap atomico. Solo hay un escritor.
Las copias anteriores viven en memoria: no prueban recuperacion tras perder el proceso.

## Hallazgo abierto: Playground

Ambos archivos estan ausentes en el filesystem al terminar, pero las URLs que
antes los servian responden 500. Un archivo nunca creado devuelve 404 y la portada
devuelve 200. El recibo registra errores de lectura en `PHPRequestHandler` de
`@php-wasm/universal`. Esto localiza el fallo en esa ruta del runtime, pero no
demuestra su causa interna. Una cache de rutas obsoleta es una hipotesis, no un hecho.

No aceptar 500 como restauracion correcta, no silenciar el check y no concluir
que todas las versiones de WordPress o todos los hostings se comportan igual.
El contraste nativo usa una version distinta y no aisla por si solo todas las variables.
El PR #50 permanece sin fusionar mientras se resuelva o se revise explicitamente
el alcance de este gate con evidencia adicional.

## Procedimiento reutilizable

Usar solamente [la checklist unica por lote](ASSISTED-DELIVERY-CHECKLIST.es.md).
No crear una checklist por idioma ni repetir el descubrimiento del hosting por archivo.
El paquete inicial contiene dos documentos; robots, sitemap, plugins, APIs y MCP
no se incluyen implicitamente. La entrega asistida puede coordinarse con el proveedor
sin mantener accesos generales permanentes.

La ejecucion nativa registrada duro 37.322 segundos, incluyendo bootstrap; NO es
el tiempo comercial de entrega. Tiempo humano, espera del proveedor y consumo
atribuible de LLM siguen sin medicion completa. No fijar costos usando ese tiempo.

## Proximo gate acotado

Antes de ampliar automatizacion, probar en un entorno descartable:

1. Copia persistente fuera del directorio publico, con manifest y hashes.
2. Interrupcion intencional despues de actualizar el primer archivo del par.
3. Recuperacion desde un proceso nuevo usando esa copia, sin memoria del proceso anterior.
4. Rechazo de restauracion si un tercero cambio un archivo, o si la copia esta corrupta.
5. Recibo unico por archivo: verificado, restaurado o bloqueado; nunca exito global con estado mixto.

Este gate no introduce un conector remoto ni modifica hosting, WordPress productivo,
DNS, Tokenizart, Atelier o el canary AFW. La ampliacion posterior se decide con
evidencia de recuperacion y medicion de intervencion humana, no por cantidad de documentos.

## Avance: recuperacion entre procesos, ensayo local

Implementados `test/delivery-recovery-process.test.mjs` y su worker exclusivo de
pruebas, `test/fixtures/delivery-recovery-worker.mjs`. Seis pruebas locales correctas:

- Interrupcion deliberada despues de actualizar solo el primer archivo; otro
  proceso restaura desde copias persistidas fuera del directorio publico.
- Repetir la recuperacion conserva los bytes originales, sin volver a escribirlos.
- Un cambio ajeno en el segundo archivo bloquea el lote antes de restaurar el primero.
- Una copia corrupta, manifest invalido o archivo ausente tambien bloquean sin escrituras.
- Repetir la preparacion no reemplaza una copia previa.

Las ultimas variantes se ejecutan como casos separados; la repeticion idempotente
esta incluida en el primer caso. Cada proceso tiene memoria independiente y solo
opera en un directorio temporal sintetico marcado. El recibo distingue `restored`,
`already_original`, `blocked` y `partial`; no contiene credenciales.

Comando reproducible: `node --test test/delivery-recovery-process.test.mjs`.

Limites: prueba de protocolo local, NO prueba de un adaptador productivo. Copias
sincronizadas a disco sobreviven al cierre del proceso, pero no se ensaya perdida
de energia, fallo de disco, carrera concurrente, fallo durante la propia restauracion,
CDN ni ACL del hosting. Los permisos POSIX solicitados no prueban ACL de Windows.
El manifest local no es una firma contra alteracion maliciosa coordinada. Una
comparacion seguida de escritura sigue sin ser una operacion atomica.

Siguiente paso concreto: integrar este escenario de interrupcion y copia persistente
en el WordPress descartable existente y comprobar tambien GET/HEAD y hashes tras
recuperar. No sumar mas archivos ni conectores hasta cerrar esa comprobacion.
El fallo previo de Playground permanece abierto y no fue modificado por este ensayo.

## Integracion preparada en WordPress nativo

El script descartable ahora crea copias y manifest en `/tmp` dentro del contenedor,
fuera de `/var/www/html`. Un proceso PHP escribe el primer archivo y termina con
codigo 86 antes de escribir el segundo. Otro proceso PHP lee exclusivamente las
copias y manifest del contenedor para recuperar: los bytes originales en Node
solo sirven de oraculo de verificacion, no de entrada a la recuperacion.

Se agregaron pruebas de copia corrupta y cambio ajeno, repeticion sin nuevas
escrituras y verificacion HTTP GET/HEAD con hashes. La workflow exige estos campos
del recibo; no basta con que termine el script. Resultado de ejecucion Linux:
pendiente de la nueva revision del PR. Diez pruebas locales focalizadas correctas.

La interrupcion ensayada es salida del proceso, no reinicio del contenedor ni corte
de energia. Las copias desaparecen al destruir el contenedor descartable. Esto no
certifica backups del hosting real ni un servicio de recuperacion para clientes.
