# AFW: consistencia eventual en todas las admisiones del catálogo

## Evidencia y alcance
27oct19:40UTC, trial0a392: ACK válido; GETausente; GETpropio; siguiente GETausente.0version/0promotion. Cerrado19:41:49 con1DELETE y observación acotada de tombstone; no grant/consent/reserva. PR618 corrigió solo el readback inicial; el dato nuevo demuestra que no se puede suponer lectura monotónica de KV después de una coincidencia. No renovar/repetir0a392 ni ed21. FuenteWorker0b/60d sigue cerrada.

## Decisión del implementador
Mantener errores inmediatos en admisiones (seguro pero bloquea ante propagación normal); repetir escrituras/cambiar de almacén (descartado para este arreglo: innecesario o amplía el alcance); o observar ausencias transitorias en CADA admisión manteniendo autoridad primaria y límites. Se elige la tercera dentro de la autorización autónoma del owner. No se garantiza consistencia fuerte/global ni se infiere ausencia autoritativa de una lectura KV.

## Contrato
- Mismos recursos fijos, comparaciones exactas de valor/metadata/expiry y original<=10min.
- Máximo8reobservaciones adicionales COMPARTIDAS por invocación (no8 por etapa), intervalos7500ms,64APIreads/110000ms y guard90s conservados. Datos ausentes pueden observarse de nuevo; datos ajenos, forma inválida, red o ACK incierto detienen.
- El catálogo valida su cliente dentro del mismo observador, sin perder su primera lectura nula. El helper expone registryObservations y registryRechecks saneados.
- Abrir verifica registro inicial, admisión de versión y admisión de promoción. Esperar ANTES de revalidar punteros, estado pasivo y grant primario; nunca usar una admisión anterior a una espera para escribir.
- Reservar cola de27lecturas tras registro inicial,24 tras admisión de versión y12 tras admisión de promoción. Gate antes de cada efecto; presupuestos insuficientes no promueven tráfico.
- Un PUT, versión, promoción y DELETE como máximos por fase, sin reintentos de escrituras ni CAS inventado. Cierre restaura host primero, sin inferir retirada humana de un snapshot. Datos ajenos conservados. TTL original intacto.
- Sin publicación del Worker, nuevos permisos, cron, actor, reserva, suscripción, Max o PC-off en este PR.

## Cierre de validación
Cinco regresiones positivas: open-version/open-promotion/catalog-existing/catalog-version/catalog-promotion. Negativas: límite compartido, puntero movido durante espera y agotamiento de cola antes de promoción. CI completo+paquete y una revisión fresca; una pasada de fixes, sin rereview. Nueva prueba real solo tras aceptación; no gastar reservaúnica.
