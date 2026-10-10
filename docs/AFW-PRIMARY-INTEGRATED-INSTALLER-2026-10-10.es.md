# Instalación integrada con presupuesto primario

Composición interna sin montaje, preservando el instalador legacy para consumidores existentes. createPrimaryQaInstaller fija creationRef, productor primario, D1, lector original y dispatcher privado; install no admite payload. Host debe autenticar originales y autorización administrativa vigente. El dispatcher del runner comprueba preflight cloud y admisión servidor por separado. Una función o etiqueta no acredita esos permisos.

Reserva -> intención -> primer ACK write_started -> una escritura D1 condicionada -> lectura independiente de la procedencia propia -> finalización primaria -> primer ACK de consumo -> comprobación primaria y originales -> un despacho. Cada método se captura al crear la composición. Inputs y retornos se copian de forma acotada, descriptor-safe e inmutable antes de esperas. Reloj monotónico, límite wall y ventana original impiden continuar tras vencimiento; historia nunca renueva el permiso.

Pérdida del ACK de escritura puede reconciliarse por lectura/finalización. Pérdida del ACK primario de inicio o consumo conserva pending y nunca reconstruye despacho. Concurrencia comparte presupuestos primarios persistentes. Withdrawal o drift de pins durante await bloquea el efecto siguiente. Filas ajenas permanecen intactas. No hay atomicidad DO-D1; timeout no prueba cancelación de un servidor.

Resultado dispatch_attempted solo documenta que se llamó al host. No certifica ejecución satisfactoria, mejora del expediente ni resultado cloud. Pending/unavailable conserva necesidad de reconciliación; recuperación y revocación propia usan el controlador separado, sin reiniciar holds ni permisos ni certificar cierre del proveedor.

Ensayo combinado usa SQLite primaria y D1 independientes y primitivas reales de instalación/confirmación/consumo/retirada/revocación. Originales administrativos y permisos del host siguen sintéticos declarados. Sin deploy, bindings, identidad nueva, programación o PC-off. Siguiente: ingreso administrativo de originales reales, montaje cerrado con reversión comprobada y ensayo propio PC-on; una ocurrencia alojada precede al intervalo PC-off acordado y al preview/aprobación/consentimiento de Max.

La lectura independiente de originales se compara también después de las esperas primarias y justo antes de consumir/despachar. Su retirada impide el efecto siguiente y no restaura presupuestos gastados. Estas comprobaciones no crean atomicidad distribuida: el host conserva autorización vigente al mutar.
