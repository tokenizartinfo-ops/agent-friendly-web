export function acceptsMarkdown(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  return value.split(',').some((item) => {
    const [mediaType, ...parameters] = item.trim().split(';');
    if (mediaType.trim().toLowerCase() !== 'text/markdown') return false;
    const quality = parameters
      .map((parameter) => parameter.trim().match(/^q\s*=\s*([0-9.]+)$/i))
      .find(Boolean);
    return !quality || Number(quality[1]) > 0;
  });
}

export function mergeVaryHeader(current, token) {
  const values = typeof current === 'string'
    ? current.split(',').map((value) => value.trim()).filter(Boolean)
    : [];
  if (!values.some((value) => value.toLowerCase() === token.toLowerCase())) values.push(token);
  return values.join(', ');
}
