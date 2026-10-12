# Plan de ejecución inline: host durable propio

Base eaf5f13ca995438af071e3c847d01fb77371bfd8. Autorización de continuidad vigente; sin interacción humana para preparar fuente.

1. RED: transacción SQLite en cola, préstamo de lectura, aislamiento asincrónico, ACK perdido, referencias tardías, despacho fuera de transacción.
2. Implementar alcance de transacción y preflight puro de suscripción.
3. RED y composición real de lifecycle/custody/runtime/bridge sobre el mismo almacenamiento y D1; plataforma/callback sintéticos explícitos.
4. Verificar inválidos antes de boot, circuito subscribe/consume/deliver, retiro y presupuesto persistido sin renovación.
5. Un revisor fresco del cambio completo; corregir Important con RED→GREEN, sin bucles de revisión. Pruebas enfocadas, lint, build y CI exacta antes de integrar.
6. Guardar evidencia y avanzar al montaje privado cerrado y ensayo real; no acreditar cloud/PC-off desde código.
