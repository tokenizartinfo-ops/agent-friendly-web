# Verificación conjunta SAME-primary/HTTP

Base aceptada PR390:03fdf235750e37b827c73848fd7b73354058f048.

Bloque de evidencia y pruebas, sin modificación del runtime de producto. Extender el ensayo primario existente: política calculada y JWT/JWKS sintéticos, binding nativo propio, seis fases mediante Worker original después de consumir instalación real en mismo DO. Después de revocación D1, HTTP debe negar mientras cierre documental sigue separado. Mantener todos los ensayos de race, ACKloss, replay e historia, así como los límites5s/30s.

Cierre: focused workerd4/4, una revisión fresca de todo el diff, CI exacthead incluyendo suite/lint/build. No fabricar RED por una configuración incompleta: no se implementa una nueva función ni se corrige un defecto de producto. No ejecutar suite local redundante para cambios de fixture/documentación si la CI cubre todos los casos. No desplegar ni crear claves/tareascloud desde esta evidencia.
