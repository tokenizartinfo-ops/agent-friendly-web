# Recuperacion administrativa propia despues de vencer o retirar

readOwnRecovery usa un contrato distinto: afw-qa-own-recovery/v1, administrative-reconciliation-only. No devuelve reserved, permiso de ejecucion ni cierre certificado. Solo admite una reserva propia retirada o cuyo plazo ya vencio; los lectores vivos siguen rechazando admision e instalacion al vencer.

El lector administrativo fijo resuelve inscripcion y aprobacion completas originales y las cruza con la historia primaria de recursos, diario, intento, confirmacion y consumo. Pins actuales significa el selector administrativo para recuperar ese expediente; no adoptar una configuracion nueva por parecido. Un cambio o contradiccion del propietario/pins falla cerrado.

Compara el digest completo original, incluidos contexto cloud y audiencia del proveedor, en ambos snapshots primarios. Las constancias de confirmacion deben coincidir con los digests de aprobacion y procedencia calculados desde los originales; una suma de comprobacion valida por si sola no basta. Esta comprobacion sigue vigente cuando D1 no devuelve fila y se repite contra la procedencia observada si existe.

Luego consulta la ocurrencia exacta en D1. Solo acepta aprobacion y procedencia propias ligadas al intento que realmente inicio la escritura. Una fila propia revocada sigue siendo evidencia historica. Una fila ausente devuelve pending; no permite repetir, liberar recursos ni declarar cancelado un INSERT posiblemente en vuelo. Una fila tardia propia puede observarse en la proxima consulta. Procedencia ajena o incoherente no se adopta.

Conserva fechas independientes de snapshot primario, lectura D1 y respuesta. Despues del ultimo await externo, vuelve a comprobar la misma historia/pins/tombstones en el primary. Si cambio durante la consulta, no devuelve un contexto concluyente: hay que releer, sin accion automatica. No hay atomicidad DO-D1 ni evidencia eterna del estado del proveedor.

El resultado contiene contexto historico saneado, sin credenciales/JWT, para preparar recuperacion own-only. Por si mismo no autoriza mutaciones Cloudflare/D1 ni reemplaza readback independiente de cada recurso. La compensacion requiere procedencia propia, versiones/secuencias exactas y permisos actuales distintos de una identidad expirada. Tombstones e historia no se borran.

Pruebas locales SQLite/D1 nativo verifican vencimiento, retirada, filas tardias/revocadas/ajenas, cambios de pins e historia contradictoria. El ensayo Durable Object usa reader D1 sintetico declarado; no acredita instalacion o recuperacion remota integrada. Fuente interna SIN MONTAJE; orquestacion y cierre condicionados siguen pendientes antes de PC-on y una ocurrencia PC-off acordada.
