# Salida de correo AFW: contrato previo al envío

Estado: implementación local, sin consumidor remoto ni envío activado.

Validación 2026-10-01: siete pruebas específicas con SQLite real; suite completa 666/666; lint sin errores (advertencia existente `no-img-element` en la portada); build completo y `git diff --check` limpio. SQLite experimental y advertencias de clasificación/timing de vinext no impidieron los comandos. Estas pruebas no acreditan D1 remoto ni correo enviado.

El seguimiento cloud puede preparar respuestas; la continuidad del chat no basta para ejecutar efectos externos. Un registro separado conserva una referencia opaca al mensaje entrante, el hash de la respuesta aprobada y el resultado del único intento. No guarda cuerpo, destinatario, credenciales ni datos de expediente en el ledger de salud.

Estados: `draft` → `approved` → `sending` → `accepted` o `uncertain`. `cancelled` es terminal antes del intento. Solo una transición SQL condicional puede reclamar un envío. Un proceso que desaparece durante `sending` no permite otro intento: se concilia manualmente. `accepted` significa aceptación del proveedor, nunca entrega en la bandeja.

La aprobación se liga al hash exacto y a una referencia de decisión opaca creada por un servidor autenticado. El módulo de almacenamiento no autentica ni autoriza a personas: no se expone como herramienta hasta contar con un consumidor que compruebe identidad, propósito, alcance y respuesta aprobada. Un contenido distinto con la misma clave se rechaza; requiere nueva revisión, no sobrescritura.

Todas las referencias son identificadores opacos de hasta 128 caracteres alfanuméricos, guion o guion bajo. `providerRef` apunta al recibo custodiado: no acepta el Message-ID SMTP literal con dirección/dominio. El adaptador posterior debe custodiar ese recibo y su relación con el hash; todavía no existe aquí. Relojes anteriores a la última transición no pueden modificarla. El consumidor debe verificar nuevamente el hash del contenido recuperado antes de llamar al proveedor; un hash almacenado no demuestra por sí solo custodia ni autorización.

Preferencia: consumidor AFW con binding de correo y outbox durable. Alternativas: SMTP Gmail requiere otra credencial persistente; conector administrativo Cloudflare expone más recursos de los necesarios. Ninguna alternativa se activa en este bloque.

Cierre local: SQLite real prueba duplicados, colisiones, aprobación de contenido, reclamación concurrente, cancelación y resultado incierto. Cierre operativo posterior: almacenamiento dedicado, conexión cloud acotada, prueba propia y conciliación; después primer cliente con expediente e identidad comprobados. Rollback local: retirar el módulo. Rollback remoto futuro: pausar consumidor y conservar recibos.
