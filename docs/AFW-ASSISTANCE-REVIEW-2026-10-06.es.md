# AFW: revisión operacional de ayuda

Implementación y publicación cerrada del 6 de octubre. No turno cloud real de ayuda, activación, respuesta sobre contenido privado ni resolución acreditados por estas pruebas.

## Contrato de servicio

El gerente puede consultar `/assistance`, reservar `/assistance/claim` con eventId y requestId exactos, y completar `/assistance/finish` con runId y outcome `reviewed` o `intervention_required`. No texto libre ni outcome `resolved`. Reutiliza la verificación estricta de servicio Cloudflare Access: origen, issuer, audiencia única, cliente exacto, type app, subject vacío, expiración y firma válidos; rechaza Origin/Sec-Fetch del navegador y limita peticiones.

Inscripción por referencias de propósito propio `AFW_ASSISTANCE_PROJECT_REFS`, flag `AFW_ASSISTANCE_SUPERVISION_ENABLED=true`, ventana UTC y presupuesto simétrico son requisitos independientes. Modos ayuda y guardados son excluyentes. Missing/invalid configuración y retirada fallan cerrados; se vuelve a comprobar la ventana después de awaits relevantes. La identidad operacional no obtiene acceso al expediente privado.

Una reserva dura como máximo cinco minutos y se recorta al final de la ventana. requestId estable recupera la misma reserva tras respuesta perdida. No se completa después de expirar ni se renueva por reintento. Una nueva revisión de ayuda vuelve obsoleto el evento anterior; finalizarlo produce superseded. `reviewed` significa revisión operacional de metadata, no solución para el usuario.

## Presupuesto común

`assistanceBudgetFence` se incluye dentro del INSERT/UPDATE de admisión, sin una lectura previa de contadores. Una sola reserva activa y tres intentos por24h, sumando `assistance_supervision_runs`, `dossier_supervision_runs`, `operations_investigations` y `operations_notice_reservations`. Los intentos expirados siguen consumiendo presupuesto; cambiar de modo no crea otra cuota.

Ayuda siempre exige el fence. Los modos previos lo usan con `AFW_OPERATIONS_SHARED_ASSISTANCE_BUDGET_ENABLED=true`, conservado en la configuración canónica del gerente incluso con ayuda cerrada. No retirar ese control durante una transición de modo para esquivar el historial. Antes de cualquier apertura deben existir los cuatro esquemas aditivos en el ledger correcto. Una tabla faltante falla cerrada; no justificar por eso recrear bases, borrar historial o ampliar permisos.

## Evidencia y siguientes pasos

Regresiones observadas antes de implementar: funciones de revisión ausentes; rutas de servicio indisponibles; una investigación previa podía reservarse a la vez que ayuda; configuración sin presupuesto simétrico. Corregidas y probadas. Suite acotada11/11 con configuración, ledger y servicio; regresión de consumidores anteriores28/28; pruebas HTTP del servicio y rutas anteriores12/12. Lint y CI integral son comprobaciones separadas.

Workerd y D1 reales locales: JWT sintético de servicio aceptado; respuesta de claim perdida, replay con una única reserva, finish idempotente, lista quieta después de revisión y retirada404. Se prueba código y contrato, no un turno del gerente cloud publicado.

## Publicación y preparación remota cerradas

PR303 merged `3be183d86455deb52f9aa5979b3410b1f6857004`; CI37510242897 pasó976/976 pruebas, lint y build. Prueba nativa adicional enfrentó admisiones simultáneas de ayuda y guardados: solo una obtuvo reserva.

A las18:21 UTC, gerente `agent-friendly-web-operations-manager` versión `46ba1686-995e-45e4-bae9-2fbbb32c4c54` al100%, consumerfalse/helpfalse/shared-assistance-budgettrue, sin ventana ni cron. Conservados D1 operacional original `603c471d-19bb-4530-9773-c02e18b29840` y nombre de secreto del cliente de servicio; no se leyó el valor. GET anónimo `/assistance` devolvió401 en Access. No sustituye la futura retirada autenticada. Rollback código previo `b8023b14-3e3e-4f17-9845-e0ee2edb64fb`, con bindings efectivos cerrados y datos/custodia preservados.

A las18:22 UTC se identificaron por API los destinos: ledger `afw-dossier-supervision-qa-20261006` (`dcd5daef-0856-4da3-bf95-7dddbf7cf303`) y origen `agent-friendly-web-web-canary` (`2b518988-eacb-4c31-b760-4e58c3c0285b`). Aplicados únicamente SQL aditivos de eventos/reservas de ayuda en ledger QA y confirmaciones de entrega en origen canary. No SQL sobre D1 de producción. Postcheck: QA conservó3eventos/1revisión anteriores y0eventos/0runs de ayuda; origen conservó revisión3/1pedido y0entregas. Ningún flag, inscripción, cron o credencial nuevo se habilitó por preparar tablas. Reversión conserva tablas y recibos; no DROP.

El chat cloud existente `01a111f5-83b3-766d-baf1-fe7d05af102f`, informe del turno `01a1126e-f9d6-718e-8fc9-3310a98671ac`, comprobó preparación fresh148/148 y repositorio canónico limpio, pero fuente congelada en `d770e1fd23b661c306437cd3e0ae32af6711b226`, publicación `cecfgver_6ac51ab2c9fc81a398c76c7bfc4c6132`. Sin HTTP/mutaciones/automatizaciones. Es necesaria publicación nueva que incorpore como mínimo3be183d para el ensayo de ayuda.

Actualización19:50 UTC: control de Chrome recuperado. Desde Configuración → Codex Cloud → AFW Operations → Editar se abrió el editor `01a112bf-a5d6-77eb-8247-e2b59d325034`. Único checkout real canónico limpio, detached `e86270142565dbe48723ded60be6d605b84e08e9`; tres archivos de asistencia verificados contra HEAD e ignorados preservados. Draft `cecfgdraft_def47aacfe4881a3a11aa02c7c1d548f`, revisión2: cambio exclusivo de repositorio desde d770e1f; scripts, red y seis requisitos de custodia conservados. Root guardó y publicó por UI; panel confirmó Publicado. Nueva fuente de configuración `cecfgver_6ac5508a1d4481a38026cd4b07f14f11`, diferenciada de la base previa. Constancia visual local ignorada: `output/afw-cloud-source-published-20261006.jpg`.

Readiness sigue pendiente: turno `01a112c4-5252-74e1-aedf-102c4f96e8fa` observó spec9/9 current, running/connected y failurenull, pero enforcement y seis bindings unknown. Ejecución UTC inocua exit0 no acredita red ni credenciales; el editor informa esquema distinto del executor ordinario (sin with_additional_permissions). No HTTP AFW, activación ni ensayo real de ayuda por esta publicación. Diagnóstico acotado del mecanismo soportado en curso; no rotar secretos por inferencia ni reutilizar fuente congelada para afirmar adopción.

Turno de diagnóstico `01a112c5-4525-73f1-a138-1fb015c0d0b2`: HEAD materializado e862701, origin canónico y status limpio acreditados mediante Git local. El editor no expone operación documentada para forzar unknown→ready. require_escalated no transforma esa metadata. Se consultó la tarea ordinaria existente para separar limitación del editor de adopción de fuente; ningún cambio de checkout/config ni llamada a AFW autorizado por ese inventario.

Inventario ordinario `01a112c6-0cc7-7721-ba97-75b2646a28f2`: tarea anterior sigue congelada en cecfgver_6ac51ab2 y HEAD d770e1f limpio, aunque red enforced y dos bindings operacionales ready, spec205/205 current. Solo dispone de environment_status/wait_for_environment, sin adopción documentada de nueva publicación. Siguiente bloque requiere tarea ordinaria nueva que seleccione la publicación cecfgver_6ac5508a y acredite readiness/HEAD antes de HTTP; creación necesita petición explícita del usuario según herramienta. No crear guardia ni rearmar automatizaciones previas.

Sigue publicar código del gerente cerrado con procedencia/rollback y D1/custodia comprobados; preparar ledger QA con todos los esquemas; adoptar esta fuente en el entorno cloud ya autorizado; prueba propia de señal comprometida→entrega→GET/claim/finish real→cierre/retirada. No repetir la custodia o aceptación del circuito previo por un error de conexión histórico. Primero resolver readiness/network del executor con el procedimiento documentado.

Después devolver el recibo real a la aplicación mediante servicio y contrato separados. La comparación con la revisión privada vigente y cualquier repregunta requieren contexto consentido y revocable; no inferirlos a partir de metadata. No invitar a Sector de Sistemas ni activar guardia permanente por este documento.

Rollback: cerrar consumer/ayuda/ventana y trigger, conservar presupuesto e historial, retirar activación, volver a la versión previa preservando D1/custodia. Verificar bindings efectivos después de seleccionar versión.
