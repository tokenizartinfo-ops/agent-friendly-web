# Ingreso privado de evidencias originales

AFW conserva proyecciones saneadas del contexto y la ejecución cloud en el mismo Durable Object SQLite del preregistro y del recibo de desafío. La comprobación cruza los originales con el recibo primario vigente; una etiqueta de origen o un identificador de operador no acredita autenticación ni autorización.

El Workflow administrativo existente admite `operation: originals`, exclusivamente mediante su canal y binding internos. Los controles permanecen cerrados por defecto. No se incorpora un endpoint HTTP para subir originales. El cuerpo se limita a 8192 caracteres y se captura antes de cualquier espera, sin ejecutar getters.

El registro conserva referencias, hashes y fechas originales. Un duplicado idéntico no renueva fechas; una sustitución se rechaza. La lectura activa vuelve a comprobar la correlación, ventana y retiro primario. La lectura histórica es documental: no concede admisión. Un resultado `originals_recorded` tampoco acredita instalación, ejecución satisfactoria ni guardia.

Las pruebas locales incluyen el Workflow y Durable Object nativos de Workers. Sus identidades y originales administrativos son sintéticos y están declarados como tales. No demuestran permiso administrativo real ni procedencia de una máquina cloud.

Esta entrega prepara código todavía sin montar. Antes del ensayo real quedan la lectura efectiva del proveedor, la conexión del productor e instalador con el catálogo y cierre, el montaje cerrado con reversión recuperable, la adopción cloud y una ocurrencia propia con PC encendida. Luego se podrá acordar una ventana con el ordenador apagado. No se envía una invitación a Max ni se programa una guardia a partir de estas pruebas.
