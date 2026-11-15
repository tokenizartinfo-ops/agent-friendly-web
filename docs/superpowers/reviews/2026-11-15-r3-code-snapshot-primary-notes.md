# AFW — fuentes primarias para snapshots de código

Consulta Root15nov2026; semántica/documentación, no prueba del runner ni ejecución Source.

[memfd_create de Linux](https://man7.org/linux/man-pages/man2/memfd_create.2.html) describe un archivo anónimo en memoria. MFD_ALLOW_SEALING debe habilitarse para añadir sellos; sin esa bandera el estado inicial impide agregarlos. MFD_CLOEXEC controla herencia y no sustituye el sellado.

[F_GET_SEALS/F_ADD_SEALS](https://man7.org/linux/man-pages/man2/F_GET_SEALS.2const.html) establece que los sellos pertenecen al inode, afectan a todos sus descriptores y no pueden quitarse. Para el snapshot de código elegido, verificar expresamente los bits de escritura/crecimiento/reducción/sellos y su lectura posterior antes de ejecutar el cuerpo admitido. Un archivo regular unlinked no adquiere esas propiedades por carecer de pathname.

[Python3.12 os.memfd_create](https://docs.python.org/3.12/library/os.html#os.memfd_create) declara disponibilidad Linux y flags, con descriptor no heredable por defecto. El productor debe gestionar los descriptores de su propio objeto explícitamente, sin rutas/PIDs/comandos del consumidor.

Estas referencias respaldan el diseño DATA de protección de código; no prueban los syscalls efectivos ni el resultado de los controles104. El registro de etapas regular no se usa como autoridad durante capturas: por rulingeefed353 se limita al diagnóstico initial-only sin helpers ejecutados.
