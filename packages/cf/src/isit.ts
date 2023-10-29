/**
 * Likely candidate to fuck off in the separate package
 */
export function getTagType(o: unknown): string {
  const tag = Object.prototype.toString.call(o);
  return tag.replace(/[[\]]/g, '').split(/\s+/).slice(1).join(' ');
}
export function isNumber(n: unknown, includingObject = false): boolean {
  return includingObject ? getTagType(n) === 'Number' : typeof n === 'number';
}
export function isAnyNumber(n: unknown): boolean {
  return isNumber(n, true) || typeof n === 'bigint';
}
export function isBoolean(b: unknown, includingObject = false): boolean {
  return includingObject ? getTagType(b) === 'Boolean' : typeof b === 'boolean';
}
export function isNumberLike(n: unknown): boolean {
  return isAnyNumber(n) || (n == Number(n) && typeof n === 'string' && !!n);
}
export function isDate(d: unknown, includingInvalid = true): d is Date {
  return (
    typeof d === 'object' &&
    getTagType(d) === 'Date' &&
    (!includingInvalid ? !Number.isNaN(Number(d)) : true)
  );
}
export function isDateLike(d: unknown, includingInvalid = false): boolean {
  return isDate(d, includingInvalid) || !Number.isNaN(Date.parse(String(d)));
}
export function isNumeric(n: unknown): boolean {
  return isNumberLike(n) && !Number.isNaN(n);
}
export function isNullish(n: unknown): boolean {
  return n == null;
}
