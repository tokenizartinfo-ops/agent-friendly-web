export function capsuleBuildMessage(error, locale = 'es') {
  if (error instanceof Error && error.message === 'Capsule has no generable resources') {
    return locale === 'en'
      ? 'Select a proposed resource and save the dossier before preparing the capsule, for example llms.txt. No files were published.'
      : locale === 'pt'
        ? 'Selecione um recurso proposto e salve o dossiê antes de preparar a cápsula, por exemplo llms.txt. Nenhum arquivo foi publicado.'
        : 'Selecciona un recurso propuesto y guarda el expediente antes de preparar la cápsula, por ejemplo llms.txt. No se publicó ningún archivo.';
  }
  if (error instanceof Error && error.message) return error.message;
  return locale === 'en' ? 'The capsule could not be prepared.'
    : locale === 'pt' ? 'Não foi possível preparar a cápsula.' : 'No se pudo preparar la cápsula.';
}
