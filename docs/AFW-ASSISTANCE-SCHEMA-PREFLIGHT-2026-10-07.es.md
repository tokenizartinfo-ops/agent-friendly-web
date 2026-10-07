# Preflight de esquema antes de supervisar un expediente

El ensayo propio detectó una tabla de retorno ausente. Para evitar abrir una ventana cloud con ese error, ejecutar primero las comprobaciones de columnas y uniones sobre las dos bases identificadas y autorizadas.

Generar SQL fijo, sin conexión ni identificadores:

```powershell
node scripts/assistance-schema-preflight-sql.mjs source
node scripts/assistance-schema-preflight-sql.mjs operations
```

`source` comprueba proyecto/evento, constancia de entrega y constancia de retorno. `operations` comprueba eventos, reservas de revisión y presupuesto de generación. Cada sentencia usa `LIMIT 0`: no devuelve filas, relatos ni identificadores privados. No modifica ni migra datos.

El éxito confirma compatibilidad de esas columnas/uniones; no acredita índices, constraints, consentimiento, bindings correctos, entrega, monitorización ni disponibilidad de un modelo. Identificar por separado proyecto, repositorio, entorno, origen y bases antes de ejecutar remotamente. Una falla bloquea la apertura; corregir con una migración canónica aprobada, nunca fabricar constancias.

## Comprobación propia del 7 de octubre

Origen privado QA `f100f2fd-952a-45a0-83a4-817205d02df0`: tres sentencias aprobadas, cero filas. Ledger operativo QA `3a61aeee-a25c-4d85-bc12-f34ad7945bba`: dos sentencias aprobadas, cero filas. Esta comprobación no consultó producción ni datos de Max, ni abrió flags, cron o permisos.

Pruebas SQLite: tabla de retorno ausente y columna incompatible fallan; esquema canónico compila sin cambios ni filas. Presupuesto operativo ausente falla. Roles o argumentos arbitrarios se rechazan.
