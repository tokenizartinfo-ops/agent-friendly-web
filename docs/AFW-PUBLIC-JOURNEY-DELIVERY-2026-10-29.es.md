# Entrega pública del recorrido AFW — 29 de octubre de 2026

La fuente cace1d9c6049862401191fa9abf5a9160eeb915c de PR640 fue integrada en 99863a0c2d76ddc0da635810496c8fae5853c0c7. CI40927730384: 3282 PASS, 0 FAIL, 1 skip previo; lint sin errores, build correcto. QA40927730281: 12 casos de guía/ingreso/comparación y 18 de portada, ES/EN/PT, desktop/móvil; sin errores de navegador/HTTP ni solicitudes bloqueadas. Revisión independiente cerró las dos observaciones P2.

## Paquete único

Artefacto12921157580, SHA256 1d5cf320e9f1081b041f0f1883e7a87462508e0d71216ba56f2d2c6a7c2bddc3, 338 archivos y 5795951 bytes descomprimidos. La calificación vuelve a verificar origen, revisión, workflow, inventario, tamaño, hash y vigencia; no reconstruye la aplicación. El perfil journey_audit acepta únicamente esta fuente y el Worker público AFW. Los perfiles y recibos anteriores quedan intactos.

## Publicación y reversión

El workflow manual permite verify_only o una sola carga inactiva. Conserva el grupo de exclusión compartido, attempt1, main, ventana original de diez minutos y el secreto existente AFW_PUBLIC_UPLOAD_TOKEN. No cambia tráfico. Antes de cargar relee versión, bindings, configuración y subdominios contra el baseline fechado del paquete. El actual 73a52556-46d3-49e9-a09b-c195a9515ce6 al100% se conserva como reversión. Una candidata cargada requiere aceptación separada al0% y posterior comprobación sobre tráfico normal; un resultado desconocido no autoriza repetir la carga.

## Límites

Esta entrega no modifica el canary privado, operador, QA, permisos, D1, cron, OAuth, pagos ni datos de Max. No acredita sesión autenticada, asistencia continua ni PC-off. El incidente público de Cloudflare se resolvió, pero el ensayo privado requiere preparación nueva y aceptación propia. operationalReadiness=false.

## Carga inactiva aceptada

Run40930579961, 29oct18:26:10UTC: versión 0fd30778-70ce-406f-8757-69bb29a21c09, tag cace1d9c-r40930579961-a1; configuración conservada y deployment original c049e399 al100% de73a52556. Una carga, sin promoción. El controlador siguiente admite exclusivamente esa candidata, la fuente e inventario ya verificados y la reversión73a52556. Comprueba baseline, etapa0%, once rutas públicas/protegidas, seis archivos exactos, siete límites de protocolo público, tres portadas y nueve páginas de guía/asistente/comparación antes y después de promover. Deadline original, no reintento de POST, exclusión compartida y rollback solo sobre tráfico de esta ejecución.
