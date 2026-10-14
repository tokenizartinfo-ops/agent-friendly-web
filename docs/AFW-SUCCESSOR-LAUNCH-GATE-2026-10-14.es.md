# Puerta de lanzamiento del sucesor AFW

Preparación local del 14 de octubre de 2026. Esta pieza no está montada en el Worker y no habilita el ensayo remoto.

`createSuccessorLaunchGate` decora el launcher privado del host. Requiere manifiesto derivado de la vinculación del servidor, reserva preparada, admisión del mismo proceso y autorización OAuth/avisos vigente en D1. Comprueba despliegue y retiro del original con evidencia de hasta treinta segundos. El consumo de una única oportunidad se realiza mediante INSERT SELECT en la primaria; el permiso y despliegue se vuelven a leer antes de invocar el launcher.

La tabla `dossier_successor_launch_claims` es append-only. Un ACK perdido consume la oportunidad sin lanzar ni permitir reconstruirla. Dos llamadas concurrentes no pueden lanzar dos procesos. La cancelación durante el arranque tampoco se comunica como éxito. La copia temporal de la clave se borra al salir; la custodia original permanece a cargo del host.

Las lecturas previas tienen un límite de cinco segundos. El lanzamiento conserva el AbortSignal, plazo y limpieza del host: este decorador no reemplaza el cierre independiente ni demuestra que un proceso se haya detenido. Los lectores de retiro/despliegue deben ser adaptadores internos confiables; no se acepta evidencia enviada por clientes.

## Comprobación y límites

Las pruebas usan SQLite y D1 local con dos bindings a la misma base y un launcher simulado. Cubren concurrencia, repetición, retiro de permiso, deriva de despliegue, ACK perdido, evidencia vieja, actor ajeno y cancelación. No prueban ejecución remota, recepción de avisos por ChatGPT, revisión útil ni PC-off.

Pendiente: montaje privado con procedencia comprobada del despliegue y bindings, aplicación controlada de esquema, recuperación verificada y ensayo propio completo. No se modificaron recursos remotos ni se usaron datos de Max.
