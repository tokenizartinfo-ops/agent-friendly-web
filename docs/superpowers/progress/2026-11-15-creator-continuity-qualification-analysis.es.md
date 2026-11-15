# CC1 — análisis DATA de la calificación incompleta
Fuente actual ensayada05d1a536, run43740674443/1/job132892914334, cerrado ba7de48c. Recibo e0755d512e9710b0e8d36e1377693358304a33f7. No nueva ejecución por este documento.

Hechos:104baselinePASS inclL05, M_RAWPASS exactD02, M_PROVENANCEunknown(actualFailedP06), M_OUTPUT/M_ASSOCunknown, cleanup propio completo. Step API started17:21:49Z/completed17:23:00Z, duración71s; no se conocen duración interna ni intentos por variante a partir del wire.
Código NORMAL actual controls.mjs b9b58c4a22f04b177f92dcbf8841cfc77f648c86 sin cambios en CC1:
- :23 deadline=performance.now()+90000.
- :24 admitCase sólo si now+20000<=deadline.
- :294 baseline for104 secuencial, break si admisión cerrada.
- :295–299 cuatrovariantes secuenciales, cada una intenta matriz104; admisióncerrada, cualquier caso unknown o catch externo pueden dejar desconocimiento.
- :298 establece unknown=true/break por admisión cerrada; un caso unknown también unknown=true. :299 colapsa ambos a resultunknown, sin contar intentos ni razón.
- :284 captura excepción genérica de executeOne y conserva unknown.
La API71s es consistente con90s-20s pero NO acredita por sí sola el instante del controlador o causa de cada unknown. El registro de fallo P06 no acredita cobertura104de esa variante. No inferir520casosejecutados.

Hipótesis con soporte estático: admisión global cerrada durante variantes secuenciales, no un fallo nuevo del kernel/L05. Alternativas no excluidas por el wire: error/captura de uncaso o excepción. No mutar por esa hipótesis ni ampliar budgets/reordenar/omitir casos/reetiquetar resultados.
Siguiente propuesta mínima a evaluar después de revisiónCC1: observación Source-only de cobertura y razones de parada reales por fase, formato cerrado y receptorRoot predeclarado antes de cualquier Source. Mantener controles/oráculos/timers/casos y seguridad; evidenciaonly, no calificación. Si se decide otra arquitectura de ejecución, requerirá enmienda explícita y pruebas, no un clocknuevo silencioso.
La tareaCC1 exige controllerbyteexact; cambiarlo para buscar verde entra en conflicto con su propio plan. Si el revisor confirma ese punto como plan-mandated, Root deberá fallar sobre esa incompatibilidad antes de actuar según fix-loop; I3permanece abierto, no descartarlo como menor.
