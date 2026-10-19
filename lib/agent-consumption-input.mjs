// Internal data validation only. These helpers confer no identity or authority.
export function readRecord(value, allowedKeys) {
  try {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) return null;
    const keys = Reflect.ownKeys(value);
    if (keys.length > allowedKeys.length) return null;
    const result = {};
    for (const key of keys) {
      if (typeof key !== 'string' || !allowedKeys.includes(key)) return null;
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || !Object.hasOwn(descriptor, 'value')) return null;
      result[key] = descriptor.value;
    }
    return result;
  } catch { return null; }
}

export function readList(value, max) {
  try {
    if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) return null;
    const length = Object.getOwnPropertyDescriptor(value, 'length')?.value;
    if (!Number.isSafeInteger(length) || length < 0 || length > max) return null;
    if (Reflect.ownKeys(value).length !== length + 1) return null;
    const result = [];
    for (let index = 0; index < length; index++) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (!descriptor || !Object.hasOwn(descriptor, 'value')) return null;
      result.push(descriptor.value);
    }
    return result;
  } catch { return null; }
}

export const ref = value => typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(value);
export const operation = value => typeof value === 'string' && value.length <= 96 && /^afw(?:\.[a-z][a-z0-9_]*){1,4}$/.test(value);
export const text = (value, max = 280) => typeof value === 'string' && value.length <= max && value.trim().length > 0 && !/[\u0000-\u001f\u007f]/.test(value);
export const integer = (value, min = 0, max = Number.MAX_SAFE_INTEGER) => Number.isSafeInteger(value) && value >= min && value <= max;
export const clock = value => integer(value, 0, 8640000000000000);
export function instant(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value)) return null;
  const result = Date.parse(value);
  return Number.isFinite(result) && new Date(result).toISOString() === value ? result : null;
}
export function closed(status, fields = {}) {
  return { ...fields, status, executionAllowed: false, chargeAllowed: false, publicationAllowed: false };
}
