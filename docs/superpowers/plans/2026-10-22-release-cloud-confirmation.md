# Confirmación administrativa cloud del ensayo AFW

Fecha22oct2026. Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web. Preparación de fuente, sin nuevo login ni activación remota.

El operador privado ya confirma la publicación/configuración por RPC, con plan compilado, namespace real, GET del proveedor y diario primario. Su Workflow actual admite solamente publish. Para completar la preparación íntegramente cloud, el MISMO Workflow admitirá confirm_named exclusivamente con un tercer opt-in exacto AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED=true, además de sus dos interruptores actuales. confirm sin nombre continúa prohibido; no se inventa scopeHash ni se copian credenciales a un invocador.

Se mantienen hash/instance/payload exactos, ausencia de schedule, gate público del proveedor, ventana original máxima10min, lease monotónica, una etapa sin reintentos, presupuesto inmutable en primaria y reconciliación del resultado incierto. El resultado confirm_named solo reconoce la activationKey/versionId/deploymentId aprobados y mayLaunch=false; no acredita lanzamiento, suscripción, revisión útil o PC-off. La credencial de lectura permanece en el operador y no se muestra. El publish histórico conserva su permiso y resultado actuales.

Secuencia: (1) regresión nativa del Workflow real + D1 y namespace, RED remoto; (2) guard mínimo y forma de recibo por operación; (3) CI proporcional/fresca, revisión y correcciones; (4) integración y checkpoint. Ningún cambio del Worker canary, operador, Workflow alojado, flags remotos, secrets, tablas o grants desde este bloque de fuente. Recuperación de fuente por revert; el runtime canary1b751b11/operador6509ca8e permanece cerrado y preservado.

Cierre: caso positivo confirm_named guarda una aceptación primaria con scope del binding real; falta del nuevo opt-in y proveedor bloqueado no consumen intento; restart conserva presupuesto y no repite GET del proveedor. Los contratos publish/RPC y sus pruebas previas permanecen. Fixtures de API/credenciales son sintéticas y no acreditan ejecución real desde cloud.

## Regresión primaria
CI39809096512/job119930153168 sobre0e0d33c224b2bd2cb38c9cf68ebab6d28cfd2227 reprodujo el hueco: el Workflow devolvió blocked donde el caso nativo exigía confirmed; RPC, opt-in ausente y proveedor bloqueado aprobaron. No fue un fallo de Cloudflare ni una credencial real. El lease del Workflow se propaga también al diario de confirmación mediante su now/check y remaining originales. Publicación conserva su flujo y recibo; confirm simple sigue rechazado.
