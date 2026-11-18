# AFW · preparación de la prueba con el ordenador apagado

Estado guardado: 2026-11-18 15:49:15 UTC.

La prueba final sigue pendiente. El bloqueo actual está en el diagnóstico interno: el recolector y el controlador todavía no acreditan de forma conjunta el resultado de cada trabajador, el origen exacto de las marcas y el retiro de sus procesos ante un fallo.

El bloque MODEL B1 pasó 134 comprobaciones en GitHub Actions y quedó cerrado. La propuesta B2 completa, las revisiones, las mediciones y los componentes parciales están preservados en esta rama. Los componentes parciales tienen cero consumidores conectados. La última ronda no entregó una corrección integrada; se alcanzó el límite de correcciones y la propuesta activa quedó rechazada para ejecución. B2 no se lanzó.

Antes de retomar el diagnóstico hay que definir e integrar el controlador mínimo compatible con la API pública de Node, conservando los cinco trabajadores, sus casos, tiempos y límites. Debe verificar la terminación antes de admitir el siguiente, conservar las categorías auténticas de salida, comprobar los resultados individuales y validar la respuesta original completa. Los helpers archivados no satisfacen esto por sí solos.

Después faltan una observación válida del fallo real, la corrección de su causa, la validación del recorrido completo y la preparación de candidata, reversión y permisos vigentes. La prueba final deberá acreditar en una misma ocurrencia la ejecución cloud, el aviso útil, su recepción, la retirada y el cierre con el equipo apagado. El piloto de Max requiere su consentimiento propio y va después.

La última observación real de Source sigue siendo GET 503 en el caso 15; su causa no está aislada. Este bloqueo de integración no demuestra una incidencia actual de Cloudflare ni un problema de credenciales. No hay un plazo fiable para el ensayo final mientras esto siga abierto.

No hay una ejecución nueva activa ni trabajo de fondo iniciado por este cierre. No hace falta reconectar Chrome, copiar claves o pedir códigos para este punto. Se preservaron los contadores originales Source/OWN/StageB 5/5 sin reiniciarlos. SourceQualified, Task1Pass, operationalReadiness y PCoff siguen false.
