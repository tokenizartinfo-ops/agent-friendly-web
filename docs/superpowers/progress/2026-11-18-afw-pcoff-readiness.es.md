# AFW · preparación de la prueba con el ordenador apagado

Comprobación de avance: 18 de noviembre de 2026, 15:31 UTC.

La prueba final todavía no está habilitada. El bloqueo de trabajo actual es el diagnóstico de AFW y la fiabilidad de su recolector; no se ha atribuido este fallo a un incidente de Cloudflare.

Lo acreditado hoy: el bloque MODEL B1 pasó sus 134 comprobaciones en GitHub Actions y quedó cerrado. La propuesta B2 de diagnóstico está conservada íntegra, con sus 64 archivos y huellas reconciliados como datos. Su revisión estática sigue requiriendo cambios: eso no acredita que B2 haya ejecutado o pasado. No hay ninguna ejecución B2 registrada en la rama nominada al último readback.

Se está endureciendo el controlador para medir cada trabajador desde su arranque, conservar el origen de stdout/stderr y resultados individuales, y verificar el retiro de los procesos propios incluso ante error. La validación exacta del valor previo de N06 permanece pendiente explícito. Ninguna corrección parcial habilita el lanzamiento.

Falta completar y revisar ese diagnóstico; obtener una observación acotada nueva del fallo real; corregir su causa con evidencia; validar el recorrido completo; preparar candidata, reversión y permisos vigentes; y comprobar en una misma prueba autorizada el aviso útil, su recepción, retirada y cierre desde la nube con el equipo apagado. El caso de Max va después, con su consentimiento propio.

La última observación real de Source sigue siendo GET 503 en el caso 15. Aún no está aislada su causa. No hay un plazo fiable hasta resolverla; un pase de laboratorio o una compilación no equivale al ensayo final.

No se solicita apagar el equipo como parte de una prueba. No se han abierto accesos, renovado claves ni iniciado ensayos remotos en este bloque. Los contadores originales Source/OWN/StageB conservan 5/5, sin reiniciarlos. operationalReadiness y PCoff permanecen false.
