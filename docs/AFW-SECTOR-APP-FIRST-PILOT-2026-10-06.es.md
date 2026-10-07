# AFW: piloto Sector dentro de la aplicación

Decisión del owner 6oct2026: validar usabilidad real completa y asincrónica, con interlocutor Max; correo solo invita/notifica. Datos y repreguntas dentro del expediente. El acceso usa correo mataniya@sectordesistemas.com.ar; no sustituir identidad de acceso por el nombre del saludo.

## Evidencia vigente

API producción6oct: AFW_COPILOT_ENABLEDtrue, AFW_COPILOT_PROJECT_ID solo6e972c18-cae1-402b-b959-646abd8499d7. lib/copilot-rollout.mjs permite lista JSON de hasta10 IDs explícitos; no abrir todos. Identidad propietaria y consentimiento siguen comprobados por cada ruta. Crear expediente desde la sesión real del cliente, no registrar propiedad por correo ni introducir objetivos en su nombre.

Copilot UI/Workers AI y Codex cloud son dos funciones coordinadas: el primero conversa durante el uso, el segundo supervisa operación y organiza intervenciones. No afirmar que este chat local está siempre ejecutándose ni que la identidad manager actual permite leer expedientes: su contrato operacional lo prohíbe. Leer contenido privado requiere alcance/consentimiento distinto y servicio apropiado, no ampliar por inferencia.

## Bloques operativos y criterio de cierre

1. Entrada y primer expediente: sesión real Max, información mínima, guardar por servidor, reapertura y siguiente pregunta única. Recuperar project ID real e incorporarlo a lista explícita sin quitar el piloto previo. Consentimiento copilot dentro de AFW; rechazo/retirada debe conservar recorrido sin IA.
2. Conversación y continuidad: texto/audio, propuestas estructuradas revisables, guardado/versionado, aclaraciones, pausa y reanudación. Demostrar con cambios reales autorizados; desconocidos permitidos, ningún puntaje inferido por datos declarados.
3. Seguimiento asincrónico: eventos del expediente ya existen, pero no constituyen disparador cloud probado. Diseñar puente con referencias opacas, revisión/checkpoint y deduplicación; señales de incidencia/paso bloqueado/entrega necesitan priorización, presupuesto, retirada y trazabilidad. Evitar transcripciones/datos cliente en journal de arquitectura. Manager debe registrar recibido/revisado/resuelto como estados distintos. Validar una intervención acotada desde cloud y después promover cadencia, sin repetir custodia/PC-off ya aceptadas.
4. Invitación: destino action fijo /expediente en paquete aprobado, render/alt coherentes. Enviar primero copia a Gabriel, esperar aprobación del texto. Cliente recibe nueva versión propia; no reutilizar accepted keys. Correo no solicita que complete datos por respuesta email.
5. Caso testigo: auditoría pública inicial, objetivo proporcional, permisos/hosting declarados, propuesta/cápsula/instalación/comparación/reauditoría y siguiente decisión en expediente. Capturar fricciones y correcciones como evidencia fechada; publicación del caso requiere consentimiento separado.

## Próximo bloque de código

CTA de marca admite únicamente enum de destinos públicos AFW (presentación/expediente); compatibilidad con paquetes históricos y hash exacto. Tests deben rechazar URL externa, confirmar href/alt, invalidar cambio destino y preservar consumo único. Después ensayo de entrada real y habilitación específica del copilot. No anunciar guardia permanente ni invitar al cliente hasta aceptación de estos gates.

## Actualización operativa 7oct2026

El apartado anterior conserva el plan fechado del 6oct; no es un inventario actual de pendientes. La aceptación vigente está en `AFW-GUIDED-DELIVERY-ACCEPTANCE-2026-10-07.es.md`: el recorrido propio autenticado ya guarda tipo de sitio y objetivos desde preguntas guiadas y los recupera al reabrir. La instalación, detección de cambios y reversión se probaron contra un Worker remoto aislado, luego eliminado. El preflight de esquemas se comprobó mediante cinco lecturas sin devolver filas. Ninguna de estas pruebas creó el expediente de Max ni acredita su consentimiento.

Antes de la invitación siguen separados: comprobar la publicación/adopción actual de AFW Operations y la revisión correspondiente a una nueva versión del expediente; promover el recorrido verificado con reversión y comprobación de producción; enviar la copia corregida a Gabriel y obtener su aprobación editorial. Después Max inicia sesión y crea su propio expediente, habilitamos únicamente ese proyecto y verificamos su continuidad real. No sustituir estos pasos por una promesa de vigilancia permanente ni completar respuestas en su nombre.
