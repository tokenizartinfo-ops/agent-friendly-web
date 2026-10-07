# Bases aisladas del ensayo de orientación, 7 octubre 2026

## Recursos y alcance

AFW, repositorio tokenizartinfo-ops/agent-friendly-web, cuenta85d0d5dadac3341a564f22ce885e9eec. Recursos nuevos exclusivamente QA:

- Fuente privada: afw-goal-source-qa-20261007, f100f2fd-952a-45a0-83a4-817205d02df0.
- Operaciones opacas: afw-goal-operations-qa-20261007, 3a61aeee-a25c-4d85-bc12-f34ad7945bba.

No se copió ningún expediente, propietario, correo, consentimiento, lease ni dato de clientes. No se modificó D1 de producción ni se reutilizaron bases de otros ensayos. La vuelta atrás consiste en retirar bindings/políticas/flags del ensayo y conservar estas bases e historial; no implica borrar tablas.

## Esquemas y verificación real

Se reconstruyó en SQLite efímero el esquema canónico mediante drizzle0000–0014, luego consentimiento/recibos/propuestas/confirmación de lectura y recibos de entrega. Se exportaron únicamente CREATE TABLE/INDEX/TRIGGER de sqlite_master, sin filas ni ALTER/DROP remotos. La base operacional recibió exclusivamente sus esquemas de eventos, reservas, asistencia y presupuesto. Las declaraciones fueron verificadas localmente antes de importar a los dos IDs exactos.

Importación fuente:67consultas, bookmark00000001-00000009-000050fd-10fcbdf046e0ff7e330fa5ae8228321d. Operaciones:18consultas, bookmark00000001-00000008-000050fd-92186a270ba1f44a568cf6de552b8bdb.

Lecturas API primarias posteriores: fuente25tablas de aplicación/41índices/1trigger; operaciones10tablas/8índices. Se excluyeron sqlite_* y _cf_* internos al contar las tablas de aplicación. Todas las tablas de aplicación suman0filas en ambas bases. Un primer conteo UNION de25tablas excedió el límite de compound SELECT de D1; repetir en lotes de5 resolvió el diagnóstico sin escrituras.

## Configuración preparada, no desplegada

wrangler.assistance-goal-context.qa.jsonc describe únicamente estos D1, AI, localees y dos limitadores con namespaces propios2026100701/02. Tres flagsfalse, sin enrolamiento, HMAC, audiencias, identidades, ruta, cron o workers.dev. El config canónico mínimo anterior permanece intacto. La preparación de bindings no equivale a inferencia ni permiso privado.

Estado remoto anterior comprobado: Workeragent-friendly-web-goal-context-canary9a7a75ab-4b41-4899-9f6a-10b5629e220b, deploymentef9a39a5-1d2d-4020-83eb-29f3dac34daf, tresflagsfalse/sinDBAIsecretos. Conservar esta versión para reversión y comprobar settings efectivos además de la selección de versión.

## Siguiente acción

Preparar custodia cloud diferenciada para lectura y propuesta, sin reutilizar identidades de correo u operaciones. Chrome localizó Editar AFW Operations pero su conexión CDP agotó10s; esto no demuestra problema de claves. Se solicitó reconexión sin pedir copiar valores. Luego publicar configuración cerrada, verificar bindings/versiones y preparar la ventana propia consentida máxima10min. No abrir flags hasta tener identidad, consentimiento, recibo, lease y presupuesto comprobados. Solo entonces ejecutar inferencia real, recuperación idempotente, lectura del propietario, retirada y cierre. Max y guardia permanente quedan fuera del ensayo.

Validación posterior: Wrangler4.128.0 autenticado en cuenta exacta; dry-run de configuración QA terminóexit0 y enumeró únicamente los dosD1 propios, AI, dos limitadores, localees y tresflagsfalse. No hubo deploy ni llamada al proveedor.

## Publicación cerrada comprobada

PR310 integrada en main2e44c572ae1b05675d175a0bf7aa898595e9f410. Fuente2d84ec5256a9b7d7fa7bd984a0d9f1ec816cecf7, CI37626560083:1086casos/1086pass/0fail, lint y build aprobados.

7oct2026,13:13:37UTC (10:13:37Argentina): versión2398df20-19df-418d-b2d8-b42addb816f3 al100%, deployment21b42bd7-363f-49bf-bb14-50ac8a3a160c. API posterior verificó los dosD1 exactos, AI, namespaces2026100701/02, localees y tresflagsfalse. Sin secretos, audiencias ni inscripción; workers.dev/previewsfalse, schedulesvacío. Wrangler confirmó sin targets. No se ejecutó inferencia ni se creó expediente/consentimiento. Versión anterior9a7a75ab conservada. Esta publicación reemplaza únicamente el estado de preparación del apartado previo; las bases siguen sin datos de aplicación.

Pendiente actual: reconectar el editor cloud para preparar la custodia específica de lectura/propuesta y la configuración de red por propósito. No solicitar las claves antiguas ni habilitar una ruta antes de completar las identidades y políticas. No usar este despliegue como evidencia de prueba real del modelo o de disponibilidad para Max.
