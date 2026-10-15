# Diagnóstico de incidencias relacionadas del proveedor

La consulta oficial de 2026-10-15T19:15:52.799Z devolvió HTTP200, JSON válido y 50 incidentes. El incidente Cron original `cbvocc87nsne` figura resuelto. Otro aviso, `9yl8m5h16g1z`, figura identificado y describe aumento de errores de Durable Objects y servicios dependientes en DEN. Incluye Containers, D1, Durable Objects y Workflows. Fuente: https://www.cloudflarestatus.com/incidents/9yl8m5h16g1z . Es evidencia fechada; no demuestra afectación concreta de AFW ni alcance mundial.

El comprobador anterior devolvía `unknown` porque detectaba un incidente activo de Workers distinto de Cron. Ese resultado era prudente, pero no explicaba la causa. Además podía ignorar una dependencia afectada si no se mencionaba Workers.

Ahora incluye señales de Durable Objects, Containers, D1 y Workflows en nombres/componentes. Un incidente activo relacionado conserva `unknown` y `mayRunClosedVerification:false`, y añade motivo, referencias oficiales, estado y fecha saneados. No copia títulos, cuerpos de actualizaciones ni URLs suministradas por la fuente. Los identificadores y fechas se validan antes de mostrarse. La atribución explícita es `not-established`.

Se conservan plazo, límite de bytes, API pública fija, ausencia de credenciales y `operationalReadiness:false`. Un problema de red no se convierte en autorización ni en fallo de credenciales. No se usa la corrección para abrir el ensayo. Pruebas cubren dependencias sin etiqueta Workers, nombres sin componentes, metadata malformada, URLs/identificadores inseguros y comportamiento del invocador.

La instantánea pública y el diagnóstico del caso quedan en output local. Reevaluarla sin red sirve para reproducir el resultado; no renueva su fecha ni acredita estado actual. Antes de una ejecución remota se requiere una comprobación primaria reciente y las demás condiciones de activación.
