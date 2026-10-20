# Ensayo de esquema aditivo con historial existente
20oct2026UTC /19octArgentina. Candidato de calificación; resultados finales en la PR y en issue497. Todo se ejecuta en GitHub Actions con datos sintéticos.

## Qué se comprueba
Las propuestas db/agent-capsule-preparations.sql y db/delegated-preparation-consents.sql siguen fuera de drizzle y sin instalar. El ensayo comienza con las migraciones actuales y datos previos: expediente, dominio, permisos activos/vencidos/retirados, consentimiento consumido, referencia de refresh, relato de trabajo, decisiones y una cápsula creada por la ruta humana real.
Cada sentencia nueva debe conservar los hashes de las filas y las definiciones originales. Se examinan interrupciones parciales, repetición exacta y orden de instalación inverso. Una definición inesperada no se repara silenciosamente con CREATE IF NOT EXISTS.
La ruta real GET/POST usa el generador, Drizzle, D1 y las comprobaciones de dominio existentes. Dos adaptadores explícitos del bundle CI sustituyen únicamente identidad y getDb. Esto no prueba ingreso humano, Access, navegador ni permisos reales.
La creación humana antes y después del agente debe compartir la secuencia de versiones. Una escritura humana real intercalada después de la reserva del agente debe dejarlo pendiente y conservar ambas historias, sin renumerar, borrar o sobrescribir. Es una intercalación controlada; no certifica concurrencia general entre escritores D1 independientes.

## Recuperación prevista
La interrupción conserva lo instalado y permite examinarlo. El ensayo demuestra compatibilidad solo en bases efímeras con datos sintéticos. No es un instalador ni acredita un backup remoto recuperable.
Antes de una operación real todavía hacen falta inventario fechado del recurso exacto, comparación de esquema, datos y configuración, material recuperable comprobado y un plan autorizado que preserve actividad posterior. Si hay diferencias inesperadas, se detiene: no se borra ni altera historia por inferencia. Retirar el futuro montaje deja disponibles las rutas anteriores; no implica eliminar las tablas nuevas ni sus datos.
La fuente puede revertirse mediante una PR revisada. Una reversión de código no autoriza revertir o eliminar datos.

## Siguiente ensayo propio, aún no abierto
Solo después de calificar esquema y host productivo: verificar cuenta/repositorio/entorno/origen/tipo/ID/acción; comprobar cierre y recuperación; fijar una ventana nueva de hasta diez minutos, identidad sintética propia, presupuesto y un único intento.
Se requiere consentimiento nuevo y comprobable para lectura o borradores, preparación única, conciliación solo de lectura ante confirmación desconocida, retirada y denegación siguiente. La prueba no se repite bajo un permiso vencido ni renueva accesos automáticamente.
G2 ya aceptado permanece cerrado y no se repite. Container, suscripción/aviso/turno útil/baja nativa, ensayo con ordenador apagado y caso de Max siguen siendo cierres separados. operationalReadiness=false.
