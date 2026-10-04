# AFW: aceptación visual y teclado — 3 de octubre de 2026

## Entorno y procedencia

PROJECT AFW; REPOSITORY agent-friendly-web; ENVIRONMENT preview sintético local; ORIGIN localhost:8796; RESOURCE_TYPE HTML de pantallas humanas. Fuente main9ccee26, código de PR202/PR204. La vista deriva de la fixture OAuth local; los botones se cambian a type=button y se retiran campos ocultos para impedir envío o permisos reales. No acredita autorización remota ni una nueva lectura de datos privados.

## Observaciones

Chrome existente, mediante emulación CDP limitada a una pestaña nueva de preview. Consentimiento a viewport comprobado390x844: sin desbordamiento horizontal, tipografía Comic Sans MS y botones314px de ancho/51.2px de alto. Casilla de evidencia opcional desmarcada. Captura inspeccionada: texto y controles completos, sin superposición o recorte. El nombre de cliente con marcado literal es una fixture de escape, no un cliente real.

Estado vencido y retirado revisados a390px: textos distintos, sin botón redundante Desconectar, enlace al expediente. Estado activo a viewport comprobado1440x900: sin desbordamiento, botón Desconectar y acceso al expediente presentes. La primera solicitud desktop mobile=false produjo1800x1125 por escala del navegador; se descartó esa medición y se verificó1440x900 con emulación explícita mobile=true (breakpoints CSS de escritorio, no prueba de dispositivo físico).

Teclado Tab: casilla→Permitir lectura→Cancelar; conexión activa Desconectar→Volver a tu expediente. Foco visible con outline sólido. No errores de consola observados. Emulación retirada al cerrar. Sin animaciones en estas pantallas; no requieren desactivar movimiento.

Evidencias en output ignorado: afw-consent-mobile-exact.png y afw-connections-desktop-exact.png. No se guardan códigos, tokens ni subjects. Servidor de preview detenido después de QA.

## Cierre y siguiente comprobación

Cierra la revisión visual de viewport/controles y el recorrido Tab observado en fixture; no acredita interacción remota con teclado ni envío real (botones intencionalmente inertes). Las pruebas OAuth/MCP separadas verifican envío y autorización. Continúa la aceptación de recuperación interpretada por ChatGPT en una ventana sintética acotada: lectura inicial con una pregunta, pérdida de permiso/fallo, respuesta sin nuevos datos ni reconexión automática y conservación de esa pregunta como contexto histórico. El cliente puede bloquear antes de MCP; registrar por separado ese caso y no confundirlo con el payload recovery.
