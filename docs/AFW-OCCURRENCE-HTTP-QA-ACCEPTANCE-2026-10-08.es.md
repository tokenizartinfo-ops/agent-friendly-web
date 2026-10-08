# Adaptador HTTP QA de ocurrencias — aceptación de fuente

PR330 integrada en main50ebb4cd0461361dd9125808c972028ba81f6be9. CI37798602118 aprobada; fuente revisada b4d2e0a. Suite local1198 aprobadas, una omitida por plataforma, cero fallos. Build correcto; lint sin errores (dos avisos previos en suite completa; scoped final sin avisos).

El modo apagado preserva las rutas legacy. El modo QA exclusivo las veta y exige identidad de servicio, inscripción exacta y plan aprobado desde catálogo primario. El request no puede aportar planes, configuración, timestamps ni declaraciones del entorno cloud. El servidor observa su propio reloj SQL y configuración; el runner conserva una autoridad separada para consultar su host.

Revisión independiente cerró el P2 de stop: después de leer digest/journal, un guard confiable síncrono comprueba configuración y cancelación inmediatamente antes del batch. Un cambio a QA_OFF durante la lectura deniega el cierre. Se conserva el cierre legítimo de planes revocados o vencidos y de callers legacy. No se promete revertir un cambio en memoria ocurrido durante un batch iniciado.

Las regresiones temporales verifican el setup antes de demorar hasta el margen exacto de SQL. Ventanas y observaciones sintéticas se preparan por caso; no se relajó ninguna guarda de producción.

El adaptador permanece desmontado: esta aceptación no aplica esquema remoto, no habilita rutas ni permisos y no publica el entorno cloud. Puente host real y cierre administrativo independiente siguen pendientes, al igual que adopción ordinaria y ensayo PC-off. No hay invitación a Max ni guardia permanente.
