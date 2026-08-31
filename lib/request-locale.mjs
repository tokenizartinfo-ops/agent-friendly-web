const SUPPORTED_LOCALES = new Set(['es', 'en', 'pt']);

export function localeFromPathname(pathname) {
  const firstSegment = String(pathname || '').split('/').filter(Boolean)[0];
  return SUPPORTED_LOCALES.has(firstSegment) ? firstSegment : 'es';
}

export function localeFromRequestHeader(value) {
  return SUPPORTED_LOCALES.has(value) ? value : 'es';
}
