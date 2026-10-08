# Registro compartido de ocurrencias — aceptación local

Fuente integrada: `5a7ebda`, desde commit cloud `d4782f87eb2587ed4725dd40960952db4cf8fd07`. Preparación interna sin rutas HTTP, migración remota, activación ni entrega a clientes.

El registro D1 admite una única ocurrencia por señal y fases consumibles una sola vez. List, claim y finish unen admisión, efecto y postcondición en un batch transaccional. Journal, efecto, postcondición y guarda final consultan el reloj SQL efectivo. Las demoras antes o entre statements revierten el batch; perder la respuesta no permite repetir una fase. Se conserva el presupuesto compartido de cuatro canales: una reserva activa y tres por 24 horas.

Verificación local: 37/37 focales, incluidas tres pruebas D1 nativas; suite completa 1152 aprobadas, una omitida por plataforma, cero fallos. Lint sin errores, dos advertencias preexistentes. Revisión independiente: sin P1/P2; defecto anterior de expiración corregido. Build se registra separadamente al terminar.

Pendiente: modo HTTP QA y runner canónico, fuente publicada y adopción ordinaria, evento propio nuevo con recepción/ACK y respuesta visible, cierre administrativo independiente y ensayo PC-off. El vencimiento impide efectos; no acredita por sí solo retirada del token, restauración de política y cierre de flags. El chat cloud actual carece de connector API Cloudflare; no se le atribuye esa capacidad.

Preflight de producción a las 13:31:06.730 UTC del 8 de octubre: `AFW_COPILOT_ENABLED=true` y proyecto permitido `6e972c18-cae1-402b-b959-646abd8499d7`, propio. No habilita el futuro expediente de Max. Su proyecto requiere ingreso, consentimiento y rollout específico después de su creación por el cliente. Access admite su correo en configuración; eso no demuestra entrega OTP ni ingreso.

Conservar revisión10 aceptada y cerrada. No repetir OTP, rotación ni entrega histórica; no enviar invitación a Max antes de preview y aprobación. No hay guardia permanente activada.
