# Montaje del observador privado del proveedor

Continuación acotada del plan finito aceptado: integrar el lector y transporte ya existentes al Durable Object del preregistro. Método RPC interno sin argumentos ni endpoint HTTP, controles desplegados cerrados por defecto. Credencial administrativa de lectura separada de la identidad; su ausencia falla cerrado. Validar preregistro y originales primarios antes y después de las lecturas externas; proveedor y recursos fijos desde configuración, sin selectores del consumidor.

No instalar todavía D1, ni añadir catálogo legacy o namespace nuevo. La reserva/instalador/catálogo se conectan después sobre esta evidencia efectiva. Una respuesta observada no concede permiso administrativo de escritura ni acredita scheduler. Native fixture declara datos proveedor/identidad sintéticos. No mutaciones remotas en esta entrega. Un review final de rama y un fix pass, pruebas proporcionales/full/lint/build/dryrun antes de integración.
