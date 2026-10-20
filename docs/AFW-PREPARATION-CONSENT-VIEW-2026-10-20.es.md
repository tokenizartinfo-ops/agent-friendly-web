# AFW: pantalla de permiso para lectura y borradores
20oct2026UTC/19octART. Fuente candidata, no pantalla publicada.
lib/delegated-preparation-consent-view.mjs implementa una vista HTML desligada y un resumen de conexión en ES/EN/PT. Usa la política pura de PR511 para mostrar opciones desde la solicitud original; no autentica a una persona, prueba el esquema ni registra la decisión.

## Recorrido propuesto
La persona ve expediente, asistente, sitio y fin absoluto UTC, seguido de lectura, lectura y borradores solo si se solicitaron, y Cancelar. No hay checkbox marcado, scope oculto, ampliación automática, JavaScript ni reconexión.
Preparar guarda propuestas; no aprueba, instala, publica ni cobra. Desconectar bloquea la próxima operación y conserva borradores/historial. Un resultado ya confirmado no se deshace por cambiar una etiqueta.
La opción solo lectura nunca ofrece el control de borradores. Vencimiento y entrada inválida muestran una página cerrada sin nombres privados, handle ni formulario.

## Frontera técnica
El FUTURO host suministrará datos primarios verificados, perfil, transacción original, handle SDK, nonce CSP nuevo y reloj servidor; comprobará SDK/Origin/actor/client/resource/owner/claim/esquema/CAS/plazos otra vez en POST. El renderer no certifica su procedencia y retorna consentRecorded=false/grantIssued=false.
El nuevo contrato POST envía solo handle y decision read/drafts/cancel. El Worker de lectura actual no se modifica ni consume este contrato. No hay import, montaje o ruta nueva en producción.
Resumen de conexiones: rótulo según scopes reales exactos de lectura o lectura+preparación, estado y vencimiento recibidos del host. No crea un formulario o facultad de revocación ni determina el estado desde un reloj de navegador.
Datos propios permanecen texto escapado, sin traducción; paquetes con getters/extras/control/longitud inválidos se cierran. CSP nonce solo estilo, scripts/recursos externos prohibidos, formulario self, sin framing/base, no-store/no-referrer/nosniff. Esto no reemplaza CSRF/OAuth del futuro host.
Marca: papel cálido/tinta/sepia y tipografía cómic ya usada en consentimiento AFW; sin fuentes/imágenes remotas, motion o promesa F5.

## QA y límites
12 casos Node se comprometieron antes de la fuente: REDd8170e6b/CI39350046561/job118391837687,2312PASS/12FAIL/1existingSKIP, solo faltaban las funciones de vista/resumen. Resultado GREEN/revisión/merge en PR513 e issue497, no presumido aquí.
QA Chromium con Playwright1.64.1 fijado, instalado solo en temp del runner GitHub. Script de biblioteca Node sin nueva dependencia package/lock, loopback sintético, sin cookies/credenciales/sitios reales.1440x900 y390x844, tres idiomas, teclado/foco, geometría, POST explícito, texto escapado, estados cerrados, no solicitudes externas/errores. Capturas sintéticas y recibo7d en Actions; no se descargan al PC. No equivale a revisión visual humana ni aceptación de un usuario real.
[Plan](superpowers/plans/2026-10-20-afw-preparation-consent-view.md).
[Playwright1.64.1 primario14oct2026](https://github.com/microsoft/playwright/releases/tag/v1.64.1).
[Documentación primaria de ejecución](https://playwright.dev/docs/intro).

Quedan integración de consentimiento/persistencia/recuperación, ruta y vista realmente autenticadas, montaje MCP, migración poblada y ensayo nuevo. G2 cerrado, no OTP. Container, aviso/revisión útil/baja nativa, PC-off y Max separados. operationalReadiness=false. No despliegue, cliente/scope/grant real, permisos, DDL o correo.
