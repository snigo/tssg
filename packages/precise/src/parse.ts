import { round } from './round.js';
import { getScale } from './scale.js';
import type { ParseableNumber, RoundingFn } from './types.js';

/**
 * Converts string or number to a certain precision
 * NOTE! This function will not cast values to number, so
 * ```
 * parseNumber(false) => NaN
 * parseNumber(null) => NaN
 * ```
 */
export function parseNumber(
  numberLike: ParseableNumber,
  precision?: number,
  mode: RoundingFn = 'round',
): number {
  if (typeof numberLike === 'number') {
    return precision != null ? round(numberLike, precision, mode) : numberLike;
  }
  if (typeof numberLike === 'bigint') {
    const int = Number(numberLike);
    return precision != null ? round(int, precision, mode) : int;
  }
  if (typeof numberLike !== 'string') {
    return NaN;
  }
  const s = String(numberLike).trim();
  const c = s.endsWith('%');
  const n = Number(c ? s.slice(0, -1) : s);
  const p = precision ?? getScale(n) + (c ? 2 : 0);
  return round(c ? n / 100 : n, p, mode);
}
