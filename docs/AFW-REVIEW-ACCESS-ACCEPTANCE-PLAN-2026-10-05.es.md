# Plan de aceptación privada de revisión — 5 de octubre de 2026

## Punto de partida comprobado

Vista guiada integrada por PR260, fuente `f147c7cbb90be831ea728ecc97e60f67f2a092b0`, main `9ac67ed81e25bf01d4a4237c75005bc5bb101933`. CI37341050845 correcto;886 pruebas, lint sin errores y build. Recibo local: `AFW-GUIDED-OPERATOR-REVIEW-2026-10-05.es.md`. No hay aceptación remota de esta vista ni identidad humana provisionada acreditada.

Resultado del próximo bloque: demostrar acceso humano limitado, una decisión persistente y denegación tras retirar el permiso, con aislamiento de datos y restauración cerrada. No requiere repetir scheduler/PC-off ni abrir el servicio comercial.

## Inventario antes de cualquier mutación

Registrar PROJECT=AFW, REPOSITORY=tokenizartinfo-ops/agent-friendly-web, ENVIRONMENT=QA de revisión y las identidades efectivas de cuenta, Worker, D1, Access, ruta y binding. El origen propuesto operations-review.agentfriendlyweb.dev no acredita un recurso existente. Leer configuración efectiva y comprobar que no afecte aplicaciones Tokenizart/Atelier ni el receptor de avisos.

Preferir un ensayo aislado con D1 de revisión sintética, sin copiar expedientes, correos, tickets ni filas operativas. Si se propone usar una QA existente, inventariar y preservar sus filas históricas; no truncar ni reutilizar una revisión cerrada. ALLOWED_ACTION y rollback deben nombrar cada recurso concreto antes de ejecutarse. Este documento no crea dichos recursos ni concede un nuevo permiso persistente.

## Identidad y retirada efectiva

Aplicación Access humana propia, default deny y único operador aprobado; audiencia distinta del consumidor. Subject se obtiene de una sesión firmada validada, nunca de un correo, query, body o captura. Configuración privada en custodia servidor; no copiar JWT ni valores de credenciales a chat, Git, documentación o logs. No crear token de servicio receptor con permiso de revisión.

La revocación de una sesión Access no debe suponerse instantánea para un JWT previamente emitido. El Worker actual verifica firma/audiencia/subject y caducidad; no consulta un registro de revocación por solicitud. Por eso separar dos comprobaciones:

1. Retirada de la capacidad en AFW: cerrar REVIEW_ENABLED o retirar el subject fijado y comprobar la siguiente lectura/escritura con el JWT todavía vigente. Debe denegar sin leer/escribir datos. Registrar versión y propagación observada; no afirmar efecto antes de comprobarlo.
2. Retirada de Access: verificar la política/sesión y el resultado real por separado. Si un JWT aún válido sigue aceptándose, registrarlo como límite; no anunciar retirada inmediata basada solo en Access. Antes de acceso estable por varios operadores, decidir un registro servidor de autorizaciones revocables consultado en cada solicitud o mecanismo equivalente demostrado.

Ensayo con ventana máxima propuesta de diez minutos, cerrada automáticamente por deadline y restaurada explícitamente. Rotación o ampliación de acceso necesita alcance y custodia propios; no extender el token receptor vencido. El cierre de escritura humana y las fences del journal de consumo son controles separados: conservar reviews habilitado en consumidores cuando exista historia terminal, aunque el entrypoint humano esté cerrado.

## Matriz de aceptación y cierre

| Comprobación | Evidencia de cierre |
| --- | --- |
| Sin sesión, sujeto distinto o audiencia receptora | Denegación, sin snapshot ni nueva fila |
| Navegación humana válida | Una pregunta, observación fechada y opciones justificadas |
| GET programático ajeno y POST sin Origin/Fetch-Metadata correctos | Denegación sin CORS ni escritura |
| Binding real 10/60 | Denegación al superar límite, observada y registrada; no confundir proveedor distribuido con contador global exacto |
| Mantener, releer y cerrar | Secuencia/fecha del journal, una fila por requestId y constancia terminal |
| Respuesta perdida, pestaña concurrente o contexto cambiado | Replay estable o conflicto; sin éxito inventado ni doble decisión |
| Deadline o permiso retirado con JWT vigente | Siguiente consulta/escritura denegada, historia conservada |
| Restauración | Flags cerradas, sin deadline/cron/exposición pública, versión verificada y datos históricos intactos |

Instalar esquema completo aditivo solo en la D1 identificada y con servicios cerrados; verificar foreign keys y triggers inmutables. Nunca dividir ingenuamente SQL de triggers por punto y coma. Capturar counts previos/posteriores y referencias opacas de prueba. Rollback por flags, ruta y versión cerrada; no DROP/DELETE de historia.

Solo pedir intervención del owner cuando la pantalla de ensayo y el alcance estén preparados y sea imprescindible su autenticación o confirmación específica de acceso. Antes de eso, completar configuración revisable, validaciones locales y plan de restauración. Publicar un recibo fechado con fuente/versión/resultado, distinguir observación y límite, y actualizar roadmap al cerrar.
