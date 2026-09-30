# Entrega: procedencia privada de propuestas revisadas

La PR #114 quedó integrada en `cff6ae06e23f1b7a4a5793c8493158b2209730dd`. El expediente registra `copilot_reviewed` en la última revisión de un campo únicamente cuando el dueño aplicó una propuesta estructurada y el valor guardado coincide. Los demás cambios quedan como `unattributed_owner_save`. Esta pista no acredita que el sitio haya sido verificado y no cambia puntuación, auditoría ni publicación.

Validación local: 575/575 pruebas, TypeScript, lint y build; CI `verify` aprobó. No hubo migración D1. En Cloudflare, el Worker AFW `agent-friendly-web-web-production` sirve la versión `8b327ba8-5ef9-424e-a335-464ad50a8c01` al 100 % mediante el deployment `7c5b533d-15eb-47d5-a235-97eba49bdbe3`. La versión estuvo primero al 0 % y el smoke público pasó antes y después de la promoción. La audiencia de Access, D1, limitador y bandera del copilot siguen limitados al proyecto piloto sintético `6e972c18-cae1-402b-b959-646abd8499d7`.

Reversión: desplegar la versión anterior `8d7688fe-d6d1-4c71-ad5c-68e4aab6a2e8` al 100 %; no eliminar eventos. El smoke anónimo comprobó el límite de Access.

Prueba privada del 30/9 con sesión Access `tokenizart.info@gmail.com` en una pestaña existente de Chrome: el expediente sintético se recuperó; un relato ficticio produjo propuestas para `cms`, organización y alojamiento. Se aceptó únicamente `cms = Drupal`; la interfaz confirmó el guardado y el evento de la revisión 8 registró `sources.cms = copilot_reviewed`. Después se vació ese campo: la revisión 9 lo dejó vacío y sin marca de copilot. El relato de trabajo terminó con longitud cero en D1. La prueba no verificó el sitio ni autorizó publicación. No se operó sobre recursos de Tokenizart o Atelier.
