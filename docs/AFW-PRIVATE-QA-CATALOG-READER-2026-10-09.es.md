# Lector privado de autorización para cierre QA

El cierre independiente necesita reconstruir su autorización desde persistencia, sin aceptar planes o identidades desde el consumidor. `createPrivateQaCatalogHost` ofrece solo `read()` y `readOccurrenceApproval()`, ignora argumentos y no escribe, aprueba, instala, arma alarmas ni publica.

Cada lectura usa el puntero privado fijo `afw-private-qa-catalog/v1:current`, registro V2 aprobado en almacenamiento, constancia confiable de provisión y aprobación completa en D1 `first-primary`. El digest correlaciona fuente, publicación, identidad, enrollment y configuración del servidor. Retirar el puntero, la aprobación QA o la constancia de provisión produce null. La revocación propia del plan D1 permite terminar su cierre, pero no entrega autorización de ejecución a clientes: este lector se destina exclusivamente al cierre.

Dos carreras se reprodujeron y corrigieron: retirada QA durante la última lectura del puntero, y retirada del puntero durante la última consulta de provisión. Una mera reordenación dejaba una ventana simétrica. El registro completo del puntero y la aprobación/revocación QA se contrastan ahora en la misma transacción primaria del DO, antes/después del lector existente. Tras el último contraste solo hay reloj/clone síncronos. No se promete atomicidad distribuida con D1, provisioning externo o una retirada posterior a la respuesta; cada actor vuelve a comprobar autorización antes de actuar.

El presupuesto de lectura es1..10000ms (5000 por defecto), con reloj monotónico compartido. Un timeout impide que la lectura tardía entregue información o siga validando autoridad. Errores retornan null sin datos de excepción. La igualdad canónica cubre todos los campos, sin depender del orden de las propiedades JSON.

## Validación

Siete pruebas unitarias con SQLite real: reconstrucción, argumentos forjados, digest forjado, constancia ausente, retirada QA/puntero, revocación de plan, timeout/regresión de reloj y ambas carreras. Una prueba workerd combina D1 real y DO SQLite, reconstruye el lector, retira la constancia/puntero durante el tercer proof y confirma denegación persistente con historia intacta. Instalación y provisioning de esas pruebas son explícitamente sintéticos. Revisión independiente: ambos P2 cerrados, sin otros P1/P2;8/8 passed y adición native final1/1 verificada aparte.

La suite v2 identificó una prueba ajena de transporte que bajo carga agotaba15ms antes de entrar en fetch y luego esperaba un signal inexistente. Se comprobó el archivo completo y se hizo determinista únicamente esa prueba: esperar inicio efectivo de fetch/reader y avanzar MockTimers al deadline. Conserva aborto, cancelación y1intento; producción no cambia. Revisión adicional7/7 accepted. Lint global0errors/2warnings preexistentes, build final y dry-run del artefacto cerrado aceptados. Las suites intermedias no son aceptación de la fuente final; consultar la evidencia final en output/afw-private-catalog-reader-tests-final-v3-20261009.log y CI del PR.

Suite final v3:1328casos,1326passed/0failed/2skipped. Verificación enfocada conjunta15passed/0failed. Scopedlint final y build final aceptados. No cambios remotos por este bloque.

## Estado operativo

La clase `PrivateQaCatalog` está exportada en el Worker de cierre, deliberadamente sin binding, migration ni instalación remota. Requiere una fuente privada de provisioning todavía pendiente. Un callback sintético, un hash o metadatos persistidos no acreditan provisión/exclusividad/custodia real. No hay RPC de approve/install ni ruta pública de catálogo.

Próximo bloque: constancias reales de creación/custodia/inventario, instalador privado autorizado y binding verificado; credenciales finitas separadas, identidad QA exclusiva y aprobación primaria completa. Luego cierre espontáneo remoto/readback/recovery, publicación/adopción real del ejecutor cloud y una ocurrencia trazable. PC-off y piloto de Max mantienen sus gates propios; este bloque no los acredita.
