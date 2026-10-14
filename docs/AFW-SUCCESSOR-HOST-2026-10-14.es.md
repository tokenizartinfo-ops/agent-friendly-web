# Integración privada del primer sucesor

`createOwnDurableEventHost` admite una opción interna explícita `successor` con versión `afw.successor-host.v1`, plan y lectores de retiro/despliegue. Conserva el contrato anterior cuando la opción está ausente. Rechaza configuraciones parciales, identidades, programa, revisión o ventanas que no coincidan con el runtime.

El manifiesto se copia al construir el host. La puerta de lanzamiento se ejecuta únicamente dentro de `launch`; `observe` y `close` conservan su comportamiento. Un error previo al arranque o posterior a él pasa por el cierre de la custodia existente. Una respuesta perdida al consumir la oportunidad no habilita un segundo intento. La indisponibilidad de los lectores no impide cerrar un host ya construido.

Las pruebas locales conectan los módulos reales de custodia, autorización, comunicación firmada y registro de recibos, con SQLite y un contenedor/callback simulados. Cubren éxito, cierre, repetición, fallos antes/después del arranque, deriva del namespace y ACK perdido. No equivalen a un contenedor remoto ni a una respuesta útil de ChatGPT.

El Worker público no recibe esta opción todavía. El montaje posterior debe aportar lectores internos con procedencia comprobada y conservar una vía histórica de cierre que no reconstruya ni valide la configuración del sucesor. No tomar selectores, funciones o evidencia desde una solicitud cliente. No se aplicaron migraciones, despliegues, permisos ni cambios a expedientes reales.
