# Montaje protegido de preparación MCP
20oct2026UTC/19octArgentina. Candidato de fuente; evidencia final en PR/issue497.
lib/delegated-preparation-mcp-mount.mjs reúne componentes existentes. No agrega una ruta al Worker publicado.

## Qué garantiza el contrato de fuente
Desactivado por defecto, exige configuración explícita del servidor y una ventana absoluta original de hasta diez minutos. El SDK valida el token mediante un verificador interno del servidor; después se comprueban identidad de proyecto/cliente/recurso, alcance y vencimiento. Solo lectura conserva el catálogo de lectura; lectura y borradores añade los dos métodos limitados. La admisión real del permiso/dominio/revisión/esquema sigue en los componentes existentes, con sesiones primarias nuevas.
El cuerpo se limita antes de autenticar. Los cinco segundos originales cubren cuerpo, autenticación, transporte, operación y respuesta acotada. No se renuevan al terminar un paso. Los dos protocolos reutilizan el mismo contexto y presupuesto, con JSON explícito y sin SSE.
Una autenticación que termina después del cierre no puede crear un servidor. Si una conexión ya iniciada termina tarde, el servidor se cierra de nuevo. La limpieza de memoria dispone de una gracia acotada de hasta dos segundos mediante waitUntil, sin ampliar el permiso ni el plazo de respuesta. Una dependencia defectuosa puede no cerrar: la respuesta no certifica cierre remoto ni crea una guardia.

## Evidencia prevista
El ensayo usa SDK/PKCE/KV/token/MCP/D1/workerd reales en Actions, con identidad/perfil y controles de fallos sintéticos. La autenticación o conexión se retiene y solo se libera DESPUÉS del rechazo recibido por el cliente. Se consulta el estado real isConnected del SDK tras drenar la limpieza; los métodos instrumentados solo están en el fixture y delegan en los reales.
También se comprueban bytes UTF8 antes del SDK, deriva de configuración y esquema primario ausente. Se conservan las pruebas de elección visible, pérdida de confirmación, conciliación y retiro. No equivale a autenticación humana, una migración ni una publicación real.

## Lo que sigue separado
Host de consentimiento/Access de producción, migración aditiva con registros existentes, inventario/recuperación de despliegue y un ensayo propio nuevo y acotado. G2 permanece cerrado y no se repite.
No se modifican clientes, alcances, permisos, claves, flags, rutas, SQL remoto, Containers, eventos, guardia ni el caso de Max. La prueba con el ordenador apagado sigue pendiente. operationalReadiness=false.
Rollback de fuente: revert revisado. La PR y issue497 conservan reglas, RED/GREEN, revisión e integración exacta; este documento no es una autorización operativa.
