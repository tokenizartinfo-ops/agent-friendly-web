# Consentimiento persistido, pantalla y SDK — ensayo compuesto
20oct2026UTC/19octArgentina. Candidato source-only; evidencia final en PR/issue497.
No altera la sesión ni el flujo de lectura ya aceptado. No implementa un host de autenticación para usuarios reales.

El ensayo nativo de test/fixtures/preparation-code-worker.mjs reutiliza el SDK1.2.1 real, KV efímero, D1/workerd, el registro de consentimiento de PR514, la pantalla de PR513 y los adaptadores MCP existentes. Actor, proyecto, perfil, Origin, límites y fallos siguen siendo sintéticos. Solo se ejecuta en GitHub Actions.

## Decisión y continuidad
El registro guarda perfil, solicitud original resumida por hash, identidad vinculada por el adaptador, fechas originales absolutas, revisión y dominio antes de mostrar opciones. El formulario lleva únicamente identificador de sesión y decisión. SDK valida su cookie y devuelve la solicitud original; AFW compara el hash y limita el alcance al permiso visible. Solo una decisión nueva con confirmación de almacenamiento puede solicitar el código.
Consultar un estado guardado no reanuda ese paso. Una confirmación perdida no cambia las fechas ni crea otra decisión.

Un envío perdedor o incierto no tiene derecho a retirar el permiso de otro envío que sí ganó. Un resultado incierto de D1 puede dejar un permiso de aplicación sin canjear, con su vencimiento original, sin que este envío emita código. La limpieza solo retira un permiso cuando este envío obtuvo una admisión nueva confirmada y después falló la emisión o su confirmación. La decisión y el historial permanecen.
No se simula atomicidad entre KV y D1. El registro D1 decide qué envío puede completar el protocolo.

## Cobertura
Las pruebas ejercitan metadatos originales explícitos, pantalla HTML real y resumen de alcance elegido, cookie/origen/identidad sintéticos y PKCE real, envíos competidores, confirmaciones perdidas después de reservas/escrituras/código reales, retiro y siguiente operación denegada, transporte MCP moderno y anterior y borrador efímero.
Las pruebas de dos envíos SDK no equivalen a una certificación general de escritores concurrentes D1. Se conserva el límite pendiente de PR514. Las pruebas de navegador de PR513 siguen siendo evidencia aparte; este bloque comprueba la composición HTML/protocolo y no certifica visualmente nuevas pantallas.

## Pendiente y cierre
Quedan el host real autenticado, montaje explícito, migración poblada y publicación cerrada con un ensayo propio nuevo y acotado. No hay registro de clientes, nuevos alcances reales, permiso humano, OTP, credenciales, cambio de configuración, instalación de SQL remoto o despliegue.
Container02382110, avisos/suscripción/entrega útil/retiro nativo y prueba con ordenador apagado siguen separados. No se usa Max ni se envían correos. operationalReadiness=false.
La reversión de fuente es un revert revisado; no borra datos ni historial. El ledger de la PR registra RED/GREEN, una revisión completa y la integración exacta antes de aceptar el bloque.
