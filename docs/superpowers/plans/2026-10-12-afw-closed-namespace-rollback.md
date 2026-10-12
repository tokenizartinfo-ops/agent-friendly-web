# Plan: rollback cerrado conservando namespace

Base2ff8fd3/PR410mainCI38208553533SUCCESS. El ensayo real detectó API100402: la versión anterior no declara el namespace recién provisionado. No borrar ni retirar ese namespace.

Crear entrada de emergencia con los mismos exports vivos, sin acceso a almacenamiento, dependencias, claves ni Container. Todos los HTTP devuelven404 y RPC privados rechazan. Preservar historial. Solo usar después de verificar cero procesos activos; si alguna vez arrancó uno, cerrar con la fuente original y comprobar parada física antes.

RED/GREEN nativo workerd: namespace real con fila preexistente, todos los RPC denegados, HTTP/control denegados incluso con flags true, fila intacta. Reviewer fresco una vez, focus/lint/CI exacta/main. Publicar emergencia cerrada, verificar recursos/historial/instancias, volver a versión cerrada aceptada por deploymentsAPI. No schema/activación mientras recuperación sin verificar.
