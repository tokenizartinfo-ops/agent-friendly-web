# Comprobación de identidad de revisión — 5 de octubre de 2026

## Problema y resultado preparado

No se puede inferir un subject autorizado desde un correo o una sesión de otra aplicación. El ensayo necesita vincular el JWT realmente firmado de su propia aplicación, sin trasladar ese token ni el subject privado al chat, navegador de negocio o Git.

Preparación sobre main47946f45 (PR263). GET/identity independiente, por defecto cerrado, necesita flag explícita, ventana vigente, identidad con issuer/audiencia propios y correo exacto fijado por servidor. Solo funciona mientras REVIEW_ENABLED=false y REVIEWS_ENABLED=false. No lee/escribe D1, no crea un permiso, no registra una decisión y no recibe subject o config por query/body. Origin/Fetch-Metadata y limitador obligatorio, revalidación de ventana/caducidad tras esperas.

Respuesta humana mínima en español y tipografía comic: «Identidad comprobada», sin claves a copiar ni avisos que completar. Contiene únicamente operatorId opaco en metadato para recuperar la referencia. No-store/CSP/no-referrer/noindex; sin scripts, fuentes externas, email, subject o JWT en HTML.

El resolver de revisión puede fijar ese operatorId servidor, derivado de SHA256 con contexto propio equipo/audiencia/subject. Sigue verificando la firma/issuer/audiencia única/caducidad en cada acceso. Mantiene la alternativa de subject fijado existente; ambas configuradas a la vez fallan cerrado. La referencia es un identificador, no un token o permiso. Obtenerla no habilita lectura ni escritura; ese alcance se configura y comprueba aparte.

## Validación y límites

RED por módulo ausente; GREEN en pruebas firmadas. Segunda regresión RED401→GREEN503 ante proveedor inyectado indisponible. Casos: correo ajeno, subject de servicio vacío, audiencia receptora/múltiple, pin de otra identidad, configuración ambigua, flags cerradas, parámetros extra, fetch ajeno, token vencido durante limitador y D1 intacta. Veintiuna pruebas enfocadas y895/895 completas pasan; lint cero errores/dos warnings previos, build completo. CI/integración se acreditan en el PR del bloque.

QA existente permanece cerrada7f155576@100%; Access deny/everyone, D1 sintética y cero reviews. Nueva ruta todavía no desplegada ni expuesta; no aceptación humana ni limitador remoto. No cambiar receptor/automatización/producción web ni extender su token vencido. No equiparar esta comprobación de identidad con revocación Access o gestión permanente.

## Continuación concreta

Integrar fuente verificada y desplegar inicialmente cerrado sobre QA. Preparar ruta propia protegida y configuración privada de audience/equipo/correo; Access limitado al operador aprobado, sin bypass. Abrir solo comprobación de identidad por diez minutos cuando se pueda realizar el ingreso humano; después cerrar esa flag y quitar su deadline. Recuperar únicamente referencia opaca, fijarla por servidor y abrir ensayo de revisión distinto con datos sintéticos y deadline propio. Aceptar recibo/replay/limitador/retirada y restaurar cierre; preservar fixtures e historia. No pedir login hasta tener página y alcance listos.
