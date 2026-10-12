# Productor del evento realmente guardado

Preparación de fuente interna sobre el mismo D1, contexto OAuth, proyecto, secreto de proyección y ventana del host durable. Sin despliegue ni disparador remoto.

El productor recibe solamente la referencia de un evento guardado. No acepta el texto ni la revisión declarados por quien lo invoca: lee `project_events`, comprueba propietario original, tipo admitido, revisión actual del expediente y fecha dentro de la ventana. Consulta de nuevo tras los awaits de autorización y proyección y rechaza cambios, eventos ajenos o JSON ambiguo. Envía exclusivamente los metadatos opacos y fechados existentes del contrato de eventos.

La custodia Node, los primeros ACK y el presupuesto único siguen a cargo de la composición original. Una lectura o una entrega HTTP no se presentan como revisión cloud completada. El método de entrega guardada es interno; no se registra como herramienta MCP ni como endpoint público. La selección del proyecto y las dependencias permanecen fijadas por el servidor.

Una actualización posterior puede dejar este evento como histórico. El agente receptor debe leer nuevamente el resumen y sus evidencias antes de orientar al usuario; no inferir estado actual desde la notificación. Antes del ensayo real faltan el DO/RPC/OAuth concreto cerrado, rollout/rollback comprobados, cliente/callback y revisión cloud real, cierre observado y ventana acordada de PC-off.
