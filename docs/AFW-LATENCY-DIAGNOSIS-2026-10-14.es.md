# Diagnóstico de latencia y continuidad de AFW — 2026-10-14

## Evidencia y corrección acotada
La suscripción nativa sintética realizaba 522 lecturas primarias, 27 transacciones de custodia y ocho probes. El cambio reúne admisión y consentimiento en una consulta; conserva autorización y cierre antes y después, sin caché ni ampliación de permisos/plazos. La misma suscripción completa realiza 362 lecturas (160 menos, 30,65 %), con las mismas escrituras, transacciones, probes y callback.

Medición local, no benchmark remoto: baseline sin retraso 373 ms; candidata 463 ms (ruido local, no afirmar mejora de tiempo). Con 10 ms artificiales por lectura el baseline completó en 8802 ms. Con 20 ms el baseline falló en callback_verification (12702 ms, 392 lecturas); la candidata también falló (10278 ms, 319 lecturas). Es una sensibilidad reproducible, no prueba de latencia real de D1 ni causa confirmada del fallo cloud. No extender deadlines para ocultarla.

## Verificación
25 pruebas dirigidas iniciales pasaron; prueba nativa local D1/custodia pasó. Cuatro pruebas del presupuesto y retirada concurrente pasan: OAuth revocado, consentimiento retirado o cierre después del snapshot impiden boot/callback. Revisión independiente sin defectos bloqueantes; se añadieron las dos coberturas sugeridas. PR426 ya integra diagnóstico saneado de etapas y CI Linux 38575092625 pasó. Ningún cambio de este bloque fue desplegado.

## Próximos bloques, en orden
1. Aceptar optimización solo tras CI completa; instrumentar duraciones saneadas por etapa para distinguir DB, readiness y callback sin exponer payloads o secretos.
2. Examinar estados del instalador: consumir permiso antes de comprobar/dispatch puede dejar consumed sin dispatch. Preservar no-replay; probar expiración justo después de consumo y describir recuperación explícita. No reiniciar presupuestos por inferencia.
3. Conservar error de protocolo categorizado sin filtrar excepciones privadas. Un error genérico de task service no demuestra causa Cloudflare.
4. Preparar una nueva prueba remota con identidad, ventana, presupuesto y cierre verificable; preservar el presupuesto ya consumido. Demostrar recepción útil y retirada nativa antes de PC-off.
5. Resolver admisión exacta del proyecto real al copilot, continuidad asíncrona y preview hello@ antes de invitar a Max. Allowlist Access no habilita automáticamente IA/audio.

## Límites operativos
El canary permanece cerrado según evidencia previa, versión 3a9d7a81, seis flags false, permisos revocados. Este bloque no lo consultó ni mutó. No existe evidencia nueva de guardia permanente, ejecución con PC apagada o recorrido de Max. Los ensayos de instalador Windows fallaron intermitentemente bajo carga y pasaron aislados; no se atribuye causa definitiva ni se declara solucionado ese problema. No pedir OTP ni apagar el ordenador por estas pruebas locales.
