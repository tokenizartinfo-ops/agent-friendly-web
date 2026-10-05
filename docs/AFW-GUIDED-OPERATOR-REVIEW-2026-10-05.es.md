# Revisión guiada del sistema — 5 de octubre de 2026

## Resultado y alcance

La vista interna presenta un aviso y una decisión a la vez. Explica la última observación, permite mantener pendiente o proponer el cierre permitido y muestra una constancia fechada al volver a consultar. Archivar un aviso no certifica una reparación ni confirma una entrega. La identidad visual conserva papel/sepia/tinta y tipografía comic en todo el texto, sin recursos externos.

Preparación sobre main `f2f9694f45fc169197b00d109ba367100f575b08` (PR259). Fuente: `worker/operations-review/index.mjs`, `lib/operations-review-context.mjs` y `lib/operations-review-page.mjs`. El origen operations-review sigue siendo propuesto: no acredita DNS, ruta, política ni servicio desplegado.

## Persistencia y controles

- GET autentica el JWT humano firmado y su audiencia/subject servidor; limita antes de leer D1 y revalida vencimiento/ventana después de esperas. Navegación superior legítima admitida; fetch ajeno rechazado. No incorpora correo, subject, token o identidad operadora al HTML.
- Consulta una referencia operacional permitida y el último journal. Prioriza avisos sin revisión; una decisión provisional anterior no tapa los nuevos. Observación antigua o reserva activa de reemplazo no ofrece cierre. La escritura mantiene el CAS autoritativo existente.
- Cada guardado explícito utiliza un requestId estable. Una respuesta perdida ofrece comprobar o repetir el mismo guardado; no reenvía automáticamente ni inventa éxito. Conflicto obliga a consultar antes de decidir nuevamente. La constancia terminal no ofrece otra decisión.
- HTML no-store, CSP con nonce, sin CORS, noindex y no-referrer; botones semánticos, foco visible, estado anunciado, sin animaciones y diseño adaptable.

## Evidencia local

886 pruebas completas pasan. Catorce pruebas nuevas cubren selección, datos inválidos, revisión provisional/terminal, identidad antes de lectura, caducidad durante consulta, CSP, conflicto y respuesta perdida. Regresiones observadas y corregidas: orden de avisos nuevos frente a pendientes, hora UTC de 24 horas en Windows y mensaje provisional oculto tras un cierre confirmado.

Navegador integrado sobre loopback con Worker y SQLite reales: mantener → comprobar constancia → archivar → volver a comprobar mostró persistencia y ausencia de botones terminales. Vista 390×844 sin desborde; revisión anterior 1440×900 y foco por teclado. Autenticación sintética inyectada únicamente por el servidor local; limitador de prueba. Servidor detenido y viewport restaurado al concluir. Esto no prueba Access humano ni limitador remoto ni retirada de acceso en Cloudflare.

## Estado cerrado y próximo bloque

Configuración conserva flags false, sin deadline, rutas, cron, previews o workers.dev. No se desplegó Worker, aplicó journal remoto, cambió Access, renovó token, activó scheduler ni envió correo. Producción conserva sus versiones previas. Esta mejora operativa no constituye un aumento de puntaje externo.

Siguiente: plan acotado de identidad/política/custodia y aceptación del binding 10/60, CSRF y retirada de acceso antes de abrir la vista. Instalar journal aditivo solo bajo ese plan, conservar registros originales y preparar rollback cerrado. No repetir pruebas aceptadas de scheduler o computadora apagada, ni reutilizar el token de recepción vencido.
