# Preparación de esquema del ensayo propio

Ámbito: AFW / tokenizartinfo-ops/agent-friendly-web / delegated-canary / https://delegated-canary.agentfriendlyweb.dev. Cuenta85d0d5dadac3341a564f22ce885e9eec; D1 6a728254-1494-4039-802e-b39288a55fcc; Worker agent-friendly-web-delegated-canary. No corresponde a producción de clientes, Operations ni Tokenizart.

## Estado observado

Consulta de sqlite_schema en primaria 2026-10-14T22:09:18.021Z, cero escrituras: aún no existen las cuatro tablas ni los ocho triggers nuevos de reserva, consumo del sucesor y recibo de publicación. Los esquemas no se aplicaron remotamente.

Una consulta al catálogo de grupos de permisos de la cuenta fue rechazada con 9109. No acredita las políticas de una credencial futura ni invalida los accesos de lectura de Workers/D1 que sí respondieron. No se recuperaron valores secretos ni se crearon tokens. Antes de instalar AFW_DOSSIER_PROVIDER_READ_TOKEN hay que comprobar su alcance real; su nombre no lo garantiza.

## Instalación prevista

Solo estos archivos, en orden: db/dossier-successor-reservation.sql, db/dossier-successor-launch.sql, db/dossier-publication-receipt.sql. Cuatro tablas y ocho triggers. No ejecutar la cadena general de migraciones de la web.

Antes de mutar: refrescar identidad de cuenta/base/binding, esquema existente, estado cerrado y recuperación disponible. Si alguno de los nombres ya existe, comparar estructura y triggers antes de continuar: IF NOT EXISTS no valida que una tabla ajena o antigua tenga la forma correcta. No modificar ni borrar automáticamente una estructura discordante.

Después: comprobar columnas, índices, claves externas, triggers y filas anteriores; conservar resultado saneado y hora. La instalación no debe insertar reservas, grants, recibos ni ejecuciones. Registrar por separado cualquier publicación administrativa verificada. La reserva solo se prepara con evidencia fresca del original y ventana propia definida.

## Reversión

Mantener flags y rutas de ensayo cerrados. Si la instalación queda parcial, conservar tablas y registros, verificar su estructura y decidir si completar el esquema aditivo; no reintentar ciegamente. La reversión funcional consiste en conservar la fuente cerrada compatible y no utilizar las nuevas tablas, sin DROP ni eliminación del historial.

El bookmark TimeTravel obtenido previamente es una referencia histórica, no una restauración probada ni permiso para borrar actividad posterior. Antes de cualquier restauración hay que preservar esa actividad y verificar un plan específico. No se ejecutó restore en este bloque.

## Ensayo local

`test/mcp-own-schema-rehearsal-native.test.mjs` usa D1/workerd local y SQL de los archivos reales. Conserva filas originales de admisión/cierre, instala tres veces (antes y después de introducir registros sintéticos), comprueba igualdad de filas, rechazo de UPDATE/DELETE por triggers en las seis tablas y PRAGMA foreign_key_check vacío. El ensayo no inicia Container, llama a proveedor ni acredita estado remoto o PC-off.
