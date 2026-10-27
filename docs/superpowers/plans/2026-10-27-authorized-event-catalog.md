# AFW: catálogo autorizado antes de la ejecución · 27 de octubre de 2026

## Problema y alcance

El broker de events/list llama al Durable Object aunque solo debe describir el evento autorizado. Ese constructor exige también la infraestructura de ejecución y del sucesor. El cliente no puede comprobar qué evento reconoce antes de gastar la reserva única. No se atribuye este acoplamiento al proveedor ni se afirma que cambiarlo repare Containers.

Proyecto AFW, repo agent-friendly-web, base e90a9d4d/tree99dfe54d. Desarrollo y pruebas en GitHub/Actions; runtime privado cerrado a75a6e3e/DEP371a3285, sin cambios remotos desde este plan.

## Contrato

- El catálogo exige los mismos flags, política fija, identidad OAuth, alcance, propietario, permiso de avisos separado y ventana vigentes.
- Resolver el catálogo no obtiene un stub ni llama RPC, inicia procesos, guarda una reserva, escribe datos o fabrica consentimiento.
- Se consulta la marca de cierre de la MISMA concesión en primaria: un proceso cerrado no vuelve a anunciarse. Falta de esquema, error o cambio de configuración deniega.
- La identidad y autorización se comprueban alrededor de las lecturas; no se afirma CAS ni vigencia futura. La suscripción vuelve a autorizar y conserva todos los controles físicos y de reserva existentes.
- subscribe/unsubscribe mantienen su RPC y guardas; ningún callback, secreto, trigger, permiso o plataforma nuevo.
- El resultado es descripción de una capacidad autorizada, no una prueba de ejecución, entrega o readiness.

## Implementación y cierre

1. Añadir regresiones con SQLite real, catálogo sin RPC y sin escrituras, permiso ausente/retirado, cierre y deriva durante awaits; observar RED antes de cambiar producción.
2. Cambiar solo el camino list del broker; adaptar pruebas de RPC para conservar subscribe/unsubscribe y diagnósticos honestos.
3. Revisar una vez la rama completa; corregir hallazgos materiales en una pasada. CI general y paquete nativo con Worker congelado exacto, sin builds locales.
4. Integrar solo con evidencia verde. Actualizar continuidad; código aceptado NO equivale a desplegado. Publicación cerrada y pin nuevo serán un bloque separado, con plan nuevo y rollback, sin repetir2b395516 o permisos consumidos.
5. Preparar receptor y controlador completo antes de pedir otro ingreso. Primero Access con AFW cerrado; después ventana corta y consentimiento nuevo.

Referencia primaria: https://developers.openai.com/plugins/build/mcp-events (consultada27oct2026). Describe discovery/rescan, callback suministrado por la plataforma, recepción asíncrona y baja; no demuestra su funcionamiento en esta cuenta.

## Registro

RED pendiente. No código de producción escrito todavía. Prueba propia01 de hoy quedó retirada y cerrada sin reserva ni avisos; su grant no se reutiliza. operationalReadiness=false; PR571 sigue draft; Max no enviado.
