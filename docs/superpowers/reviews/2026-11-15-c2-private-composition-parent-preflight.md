# C2: composición privada de procedencia y parent original — preflight acotado

Lectura de Source únicamente, 15nov2026. No código, callbacks nuevos, reloj, permisos ni runtime activados. Complementa las decisiones1825b169 y guard-design350f8259; no declara resueltas sus dos obligaciones pendientes.

Baseline Source cerrado451ab64733c2dbf9cc4f4227927144df6525359d; Core3201/aefb08c1 sin cambios de producto. Hojas inspeccionadas: OP152e730f83af7ef063b6b1db89f8b0a779c2b60e; SET34285e7c8ee3d9838763344edba2dcf6ce33da9b; CHb77bba634c999e7a8a7d02aae8d81a4627ff5f4b; RED6ce7798ece537f41823c17186336b6f8ac08d90f; finite-evidence8e02e3941fc8d34fd6a13fbbd0fa55b638422d82. Lectura estática, no pruebas.

## Identidad: datos comprobables no equivalen a marca de autoridad

finiteControlIdentity (finite-evidence, final20líneas) ejecuta finiteData, que copia recursivamente y congela, y finiteFields vuelve a producir un objeto. Comprueba propósito, tiempos, workflow IDs y planHash. Su resultado no conserva por sí mismo la identidad JS del argumento ni prueba una marca WeakMap de origen. No diseñar el nuevo compromiso como WeakMap poblado con una copia y leído mediante otra llamada a finiteControlIdentity: serán objetos distintos. Tampoco usar el hecho de que el control sea frozen como autorización.

Ruling: el acoplamiento nuevo debe pertenecer a la composición privada fuente que ya resuelve material y control; conservar allí la instancia canónica y el contexto comprobado para esa invocación, mientras que las copias de identidad existentes siguen siendo datos validados. No cambiar codecs/hash domains ni convertir planHash/controlHash en capacidad. Costo si esta resolución es incorrecta: rechazo de una composición válida o, si se omite procedencia, aceptación de datos sin su origen; se requieren controles adversariales antes de código liberado.

## Cobertura original: qué mínimo está realmente producido

OP permissions (aprox393–408) localiza GrantLink.authorizationHash, consulta el consent session consumido por ese hash exacto, comprueba grant y conexión, y para finite lee NoticeLink y su evento original. readPreparationFacts (431–435) produce permissionExpiresAt = min(Date.parse(grant.expiresAt), event.expiresAt); noticesHash viene del evento original. El consent session expires_at se valida como contexto de autorización consumida; no es por ello un nuevo permiso de duración extendida ni otro mínimo que pueda inventarse.

SET derive (aprox92) incluye ownerPreparation completo en SetupContext, codificado con el codec existente. El flujo run vincula selección/binding/context y hace readback exacto antes del transporte. Así existe un portador fuente del mínimo original; falta el productor de material acoplado que lo enlace al control/candidato y lo haga llegar privadamente al guard.

Ruling: para RED/WR conservar la comprobación fresca del grant y monitor original completo, y exigir adicionalmente el mínimo ORIGINAL source-owned y su preparación/contexto correlacionados. No reconstruirlo desde el grant actual únicamente (puede haberse extendido), desde la política corta T0–N1, desde el UUID de retirada ni desde un consentimiento cualquiera. No agregar por inferencia el expiry de una sesión de autorización consumida al significado de permissionExpiresAt. Costo si esta resolución es incorrecta: aceptar una cobertura indebida o rechazar permisos cuyo grant es válido; tests deben separar sesión consumida, grant, monitor y cobertura original.

## Parent: cada invocación tiene su propia cadena nativa

SET clock crea un parent original para SU invocación, estrechado a min(eventTimestamp,queuedAt)+30000 y T0+50000; finaliza al salir. No puede reutilizarse ese parent ya finalizado durante la retirada C0 posterior. Tampoco se admite reiniciar30s para prolongar una invocación activa.

CH current verifica pins ctx/env/version/storage y llama al now capturado. reductions pasa now:current; RED check llama current alrededor de trabajo y asserts, pero su assertParent opcional es noop si CH no lo suministra. En estas hojas no existe todavía una composición concreta que demuestre que CH.now llega al parent ORIGINAL de la invocación nativa de cleanup. La etiqueta de comentario “compiled actual-binding resolver” y un setter instalado no bastan para probarlo.

Ruling: la factory real deberá obtener el parent del entrypoint nativo de ESA invocación mediante el recorrido interno admitido, estrecharlo si corresponde y componer una comprobación de pins+parent antes y después de cada await existente, sin exponerlo por RPC ni aceptar callback/seed desde el cliente. Solo si ese recorrido no transporta el parent, planificar el cambio mínimo interno en CH/entrypoint; no simular la prueba mediante default now=Date.now o un nuevo timer. Costo si esta resolución es incorrecta: trabajo que sobrevive al parent o bloquea cleanup legítimo; probar parent expirado/abortado durante awaits y respuesta tardía sin nuevo efecto.

## Próximo bloque concreto

Antes de implementación C2: identificar el entrypoint/binder real que consume material y crea el host para cada invocación, fijar cómo conserva contexto original sin WeakMap sobre clones, y cerrar la matriz antes/fijo/mutante para:
- preparación correcta frente a copia no correlacionada y otro control/candidato;
- original mínimo insuficiente aunque filas actuales se hayan extendido;
- otro authorizationHash/GrantLink o monitor request_id original;
- parent original expirado/abortado durante cada await, sin renovar reloj;
- retirada ya confirmada con ACK perdido, sin repetir SEND.

Conservar los límites T0/N1/C0/C1/R1 y dos lecturas primarias estables. No permitir que estas tareas cambien el Core en paralelo a la próxima observación R3, cuya calificación está ligada a aefb08c1. Los notices/publication reales y factory siguen pendientes; ningún export no disponible se convierte en funcional por este documento. operationalReadiness/completePackage/PCoff y otros nonclaims permanecen false.
