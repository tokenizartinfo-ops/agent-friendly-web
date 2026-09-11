# Preflight real: Tokenizart, sin publicacion

Fecha: 2026-09-11. Estado: `preflight_complete_no_write`.
El paquete anterior de AFW sigue `blocked_revision_mismatch`.
Esto es una observacion publica real, no una entrega completada ni un fallo del sitio.

## Frontera

- PROJECT: Agent Friendly Web, caso publico Tokenizart.
- REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: public_case_readonly.
- ORIGIN: https://tokenizart.com.
- RESOURCE_TYPE: documentos publicos HTTP.
- RESOURCE_ID: /llms.txt y /llms-full.txt.
- ALLOWED_ACTION: GET/HEAD anonimos y comparacion con paquete local.
- ROLLBACK: no aplica a lectura; cero escrituras remotas.

No se accedio a WordPress autenticado, hosting, DNS, Atelier ni datos privados.
Los cambios de implementacion del cliente deben vivir en su repositorio, no aqui.

## Recibo de observacion

| Ruta | Observado UTC | GET / HEAD | Bytes | MIME | UTF-8 |
| --- | --- | --- | --- | --- | --- |
| /llms.txt | 2026-09-11T19:23:54.899Z | 200 / 200 | 2405 | text/plain; charset=utf-8 | valido |
| /llms-full.txt | 2026-09-11T19:23:57.313Z | 200 / 200 | 6552 | text/plain; charset=utf-8 | valido |

No hubo redirecciones. Estas respuestas prueban disponibilidad observada, no
indexacion de crawlers, calidad de respuestas de LLMs ni una puntuacion AF.

| Ruta | SHA-256 remoto observado | SHA-256 del paquete de esta rama |
| --- | --- | --- |
| /llms.txt | 2e8941ea63ab6b8402ddb88190f5896c210acbae4a6412059dc96488eac97926 | 3edd4bc615887884da6b0ccaaeb0ca8d1a93827c687efb1a9810514709a46709 |
| /llms-full.txt | 67154e769a28409c884b77c68515b4895114290302a0bedbf807c863f6a8f645 | 12925f9b8f802d2e3aca776f211ba906a2215de86cb4ea212e1e2ef3e0f3afd1 |

Paquete comparado: `public/cases/tokenizart/tokenizart.com/` de la rama
`test/wordpress-disposable-linux-2026-09-10`, revision `dcddbab`.
El ultimo cambio del llms.txt local figura como `f956719`, 2026-08-26.
El documento remoto ampliado declara revision editorial 2026-09-10 y el indice
remoto enlaza capacidades y resumenes por idioma que no aparecen igual en el
paquete anterior. No es solo una diferencia de saltos de linea.

## Decision

No sobrescribir con el paquete anterior. Tampoco copiar automaticamente el sitio
vivo al repositorio como verdad aprobada: primero localizar su fuente versionada
y reconciliar el contenido. No cambiar las afirmaciones publicas durante este preflight.

No hay delta aprobado listo para entregar, ni se verifico en esta tarea una copia
privada recuperable del origen. La respuesta HTTP no sustituye esa copia ni prueba
que tengamos permisos de escritura. No corresponde pedir credenciales adicionales
antes de determinar si existe una modificacion realmente necesaria.

El runbook de agosto incluia un rollback que retiraba ambos llms sin distinguir
si existian antes. Se preserva como referencia historica con advertencia: la regla
vigente es restaurar la version anterior; retirar solo un archivo creado por el
lote si se verifico su ausencia previa y no hubo cambios posteriores.

## Medicion y siguiente accion

Consulta/validacion GET+HEAD local: 2828 ms y 1540 ms, respectivamente. No son
tiempos comerciales. Trabajo humano activo, espera de proveedor y costo LLM
atribuible: no medidos (`null`). No hubo publicacion, cobro ni contacto con terceros.

1. Localizar la fuente del paquete publicado y comparar un delta concreto.
2. Si no hay mejora necesaria, cerrar como revision sin cambios, no facturar una
   publicacion ficticia ni crear una nueva version para justificar el ensayo.
3. Si hay mejora aprobada, completar la checklist unica: recuperacion comprobada,
   ventana, responsables, version/hashes y comprobaciones antes/despues.

Este caso valida por que el preflight debe preceder a pedir accesos: detectar un
paquete anterior puede evitar intervenciones y regresiones. No habilita un
instalador automatico ni demuestra un piloto comercial completo.

## Conciliacion de la copia del cliente

Se localizaron los archivos bajo `discovery/v1/tokenizart.com/` del repositorio
local `tokenizart-agentic`. Ambos SHA-256 coinciden exactamente con los hashes
remotos de la tabla anterior. Esto identifica una copia local coincidente; no
demuestra por si solo que fuera el mecanismo de despliegue.

`git status` muestra ambos archivos modificados, sin confirmar en Git. Por ello
no se atribuye su contenido a un commit remoto ni se enlaza una revision ficticia.
No se editaron ni confirmaron esos cambios del repositorio del cliente desde AFW.

Conclusion del caso: los documentos publicados estan disponibles y coinciden con
la copia local identificada. No hay una mejora aprobada que justifique una nueva
publicacion en este lote. Se cierra el preflight sin escritura, manteniendo el
paquete antiguo de AFW bloqueado para reinstalacion. La conciliacion y versionado
del contenido del cliente son una tarea separada, no una razon para sobrescribir
el sitio ni solicitar nuevas claves.

Aprendizaje reutilizable: antes de pedir accesos, comparar sitio, paquete propuesto
y fuente local/versionada. Si el sitio ya contiene la version prevista, conservar
el recibo y evitar una entrega redundante; si hay cambios locales sin confirmar,
registrar esa limitacion de procedencia sin inventar una release.

## Cierre de conciliacion local

Posteriormente se reviso el delta y se preparo una copia aislada en el repositorio
del cliente, rama `review/tokenizart-public-index-reconciliation-2026-09-11`,
commit local `c8d1dc5`. Incluye solamente los dos indices, una prueba de hashes,
la regla LF de esos archivos y su nota de procedencia. Las cuatro pruebas de
`test/discovery-pack.test.mjs` pasaron. La copia original con otros cambios
pendientes no fue modificada y la rama de revision quedo limpia.

Este commit registra los bytes observados despues de su publicacion; no prueba
retrospectivamente el commit desplegado. No se publico la rama, no se genero una
release, no se copio el manifest global de Atelier ni se actualizo el ZIP de AFW.
Por ello se mantiene `blocked_revision_mismatch` para el paquete historico.

Resultado: revision cerrada sin escritura productiva. Una nueva entrega necesita
un cambio concreto y su evidencia; no requiere repetir instalaciones para marcar
actividad. La siguiente validacion comercial debe medir una entrega asistida real
con alcance acotado, tiempo humano y espera de proveedor, sin presentar los
tiempos sinteticos del piloto como costos o plazos comerciales.
