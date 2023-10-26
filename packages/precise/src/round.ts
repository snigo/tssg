import type { RoundingFn } from './types.js';

function assertPrecision(precision: number) {
  if (precision < -100 || precision > 100) {
    throw RangeError('Precision value should be in -100..100 range.');
  }
}

function unsignZero(num: number): number {
  return num === 0 ? 0 : num;
}

function shiftExp(num: number, shift: number) {
  const parts: (string | number)[] = num.toExponential().split('e');
  parts[1] = Number(parts[1]) + shift;
  return Number(parts.join('e'));
}

/**
 * Rounds number to a certain precision.
 * Negative precision will work as well:
 * ```
 * round(1234, -2) => 1200
 * ```
 */
export function round(
  num: number,
  precision = 0,
  mode: RoundingFn = 'round',
): number {
  assertPrecision(precision);
  const m = Math[mode];
  if (!precision) {
    return unsignZero(m(num));
  }
  const p = Math.trunc(precision);
  const w = m(shiftExp(num, p));
  return unsignZero(shiftExp(w, -p));
}

/**
 * Rounds number to a certain precision towards Infinity.
 * Negative precision will work as well:
 * ```
 * ceil(1234, -2) => 1300
 * ```
 */
export function ceil(num: number, precision = 0): number {
  return round(num, precision, 'ceil');
}

/**
 * Rounds number to a certain precision towards -Infinity.
 * Negative precision will work as well:
 * ```
 * round(1234, -2) => 1200
 * ```
 */
export function floor(num: number, precision = 0): number {
  return round(num, precision, 'floor');
}
