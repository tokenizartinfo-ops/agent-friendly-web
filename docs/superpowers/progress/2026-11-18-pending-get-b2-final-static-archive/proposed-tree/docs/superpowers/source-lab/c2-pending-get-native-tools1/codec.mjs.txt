// Pure parser for the fixed private observer wire formats. All inputs are data.
export const isEpoch = value => typeof value === 'string' && value.length === 16 &&
  /^[0-9a-f]{16}$/u.test(value);

export const isUuid = value => typeof value === 'string' && value.length === 36 &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u.test(value);

const isCut = value => typeof value === 'string' && value.length === 2 && /^[TE][0-8]$/u.test(value);

export function parseMain(value, epoch) {
  if (!isEpoch(epoch) || typeof value !== 'string' || (value.length !== 24 && value.length !== 59)) return null;
  const fields = value.split('.');
  if (fields.length !== 4) return null;
  const [version, observedEpoch, cut, key] = fields;
  if (version !== 'm1' || observedEpoch !== epoch || !isCut(cut)) return null;
  const cursor = Number(cut[1]);
  if (key === '-') {
    if (cursor > 2) return null;
  } else if (cursor < 2 || !isUuid(key)) return null;
  return {cut, key: key === '-' ? null : key};
}

export function isQaTuple(tuple) {
  if (typeof tuple !== 'string' || tuple.length !== 5 ||
      !/^[ABIJCDF][0-9A-F]{2}[0-9abc][0FR]$/u.test(tuple)) return false;
  const pair = Number.parseInt(tuple.slice(1, 3), 16);
  if (pair > 63) return false;
  const completed = tuple[3] === 'c';
  const empty = pair === 0 && tuple[3] === '0';
  switch (tuple[0]) {
    case 'A':
    case 'B': return empty;
    case 'I': return empty || pair === 1;
    case 'J': return pair === 1 && completed;
    case 'C': return pair === 1 && completed || pair >= 2;
    case 'D':
    case 'F': return pair >= 1 && completed;
    default: return false;
  }
}

export function parseQa(value, epoch, key) {
  if (!isEpoch(epoch) || !isUuid(key) || typeof value !== 'string') return {code: 'V'};
  if (value.length === 4 && /^q0\.[AOXV]$/u.test(value)) return {code: value[3]};
  if (value.length !== 62) return {code: 'V'};
  const fields = value.split('.');
  if (fields.length !== 4 || fields[0] !== 'q1' || fields[1] !== epoch ||
      fields[2] !== key || !isQaTuple(fields[3])) return {code: 'V'};
  return {code: 'J', tuple: fields[3]};
}

export function parseRow(value) {
  if (typeof value !== 'string') return null;
  const row = value.length === 14 && value.endsWith('\n') ? value.slice(0, -1) : value;
  if (row.length !== 13) return null;
  const fields = row.split('.');
  if (fields.length !== 4) return null;
  const [version, code, cut, tuple] = fields;
  if (version !== 'p1' || code.length !== 1 || !isCut(cut)) return null;
  const cursor = Number(cut[1]);
  if (code === 'K') return cursor <= 2 && tuple === '-----' ? row : null;
  if (cursor < 2) return null;
  if (code === 'J') return isQaTuple(tuple) ? row : null;
  return 'AOXVT'.includes(code) && tuple === '-----' ? row : null;
}
