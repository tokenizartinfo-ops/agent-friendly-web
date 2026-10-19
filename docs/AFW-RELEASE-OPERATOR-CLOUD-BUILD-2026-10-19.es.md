# Compilación cloud del operador privado AFW — 19 de octubre de 2026

## Resultado y alcance

Compila el constructor existente `scripts/build-mcp-release-operator.mjs` en GitHub Actions. Produce el módulo, manifiesto de procedencia y plan no secreto, sin descargar dependencias o ZIP al ordenador de Gabriel. No cambia el código del publicador, el contrato RPC, los destinos, los presupuestos o la custodia.

Es una preparación de código. No crea versiones Cloudflare, despliega, introduce credenciales, instala service bindings o ejecuta la RPC. Tampoco acredita Container, suscripción, entrega útil, retirada, PC-off o el piloto de Max.

## Entradas y límites

Workflow `.github/workflows/afw-release-operator-build.yml`: manual solo en main; PR solo del mismo repositorio y rutas relacionadas. Permisos GitHub contents:read, checkout exacto sin credenciales persistentes, Node22/Ubuntu24.04 y presupuesto15min. No usa secretos de GitHub ni Cloudflare.

Se construye únicamente operation=publish con RELEASE_TARGET del contrato existente. La única referencia de herencia es un UUID explícito: nunca latest. start_at_ms y expires_at_ms son enteros decimales canónicos y seguros; el intervalo original no supera600000ms y el constructor vuelve a validar el plan.

Las PR siempre usan start0/expires1, deliberadamente vencido. Los defaults manuales también son0/1: sirven para comprobar empaquetado y NUNCA deben invocarse. Para una operación nueva, decidir y comprobar primero identidad, versión/base/configuración, recuperación compatible, custodia, presupuesto y una ventana futura explícita; generar entonces otro paquete para ESA operación. No ampliar la ventana por demora ni reutilizar un plan consumido. Un build no abre el permiso.

## Verificación y almacenamiento

El constructor comprueba entradas Git antes/después. El workflow contrasta revisión, árbol de HEAD, hash de los bytes del operador, plan/ventana, workerHash, planHash y remotePublished=false. El manifiesto de construcción conserva el planHash usado por la RPC. El policy.json se incluye sin secretos para revisar los pins y la ventana.

Artefacto afw-release-operator-COMMIT: index.mjs, build.json y policy.json, retención7d. Diferenciar SHA256 del ZIP publicado por Actions, operatorHash de index.mjs y workerHash de la cápsula de código incrustada. Nunca escoger un release solo por nombre o latest; conservar run/job/commit/tree/artefacto/digest/fecha. Si vence, no fingir disponibilidad: compilar de nuevo solo para una operación nueva justificada.

## Aceptación

La PR portadora registrará revisión independiente, ejecución real del workflow en su head, CI completo y merge ordinario fijado al head. Tras merge, una única compilación manual inerte del main nuevo permitirá confirmar el empaquetado allí. No reiterar builds por demora de checks.

Publicación y montaje reales del operador corregido siguen siendo otro paso con recursos y recuperación comprobados. La copia administrativa cerrada7fe32df9 preparada para custodia conserva el código antiguo54584cfc; no equivale a este paquete ni instala la correcciónPR498. El registro operativo vigente es [issue497](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497). Reversión de esta preparación: revertir el workflow/documentación; no hay runtime que retirar.
