import { parseNumber } from './parse.js';
import { round } from './round.js';
import { getScale } from './scale.js';
import type { ParseableNumber } from './types.js';

function parseRelativeOperands(
  a: ParseableNumber,
  b: ParseableNumber,
): [number, number] {
  const o1 = parseNumber(a);
  const c = typeof b === 'string' && b.trim().endsWith('%');
  const o2 = parseNumber(b);
  return [o1, c ? multiply(o1, o2) : o2];
}

/**
 * Stably multiplies provided parseable numbers
 * ```
 * 0.2 * 0.2 => 0.04000000000000001
 * multiply(0.2, 0.2) => 0.04
 * ```
 */
export function multiply(a: ParseableNumber, b: ParseableNumber): number {
  const o1 = parseNumber(a);
  if (Number.isNaN(o1) || !Number.isFinite(o1)) return o1;
  const o2 = parseNumber(b);
  if (Number.isNaN(o2) || !Number.isFinite(o2)) return o2;
  const p = Math.min(Math.max(-100, getScale(o1) + getScale(o2)), 100);
  return round(o1 * o2, p);
}

/**
 * Stably adds provided parseable numbers
 * If second operand is percentage, the function
 * will apply this percentage to the first operand:
 * ```
 * 0.1 + 0.2 => 0.30000000000000004
 * add(0.1, 0.2) => 0.3
 * add(10, '20%') => 12
 * ```
 */
export function add(a: ParseableNumber, b: ParseableNumber) {
  const [o1, o2] = parseRelativeOperands(a, b);
  const p = Math.min(Math.max(-100, getScale(o1), getScale(o2)), 100);
  return round(o1 + o2, p);
}

/**
 * Stably calculates the sum of array of parseable numbers
 * NOTE: Returns 0 if array is empty
 */
export function sum(nums: ParseableNumber[]): number {
  return nums.reduce<number>((a, n) => add(a, n), 0);
}

/**
 * Calculates the average/mean of array of parseable numbers
 * including optional precision (default 16)
 */
export function avg(nums: ParseableNumber[], precision = 16) {
  return nums.length ? divide(sum(nums), nums.length, precision) : nums.length;
}

/**
 * Stably subtracts provided parseable numbers
 * If second operand is percentage, the function
 * will apply this percentage to the first operand:
 * ```
 * 0.3 - 0.2 => 0.09999999999999998
 * subtract(0.3, 0.2) => 0.1
 * subtract(10, '20%') => 8
 * ```
 */
export function subtract(a: ParseableNumber, b: ParseableNumber) {
  const [o1, o2] = parseRelativeOperands(a, b);
  return add(o1, -o2);
}

/**
 * Divides parseable number a by parseable number b
 * with provided preciosion (default 16) and configurable
 * strict mode indicating whether or not function will
 * throw an exception when divided by zero
 * ```
 * divide(4, 2) => 2
 * divide(10, 3, 4) => 3.3333
 * divide(10, 0, 16, false) => Infinity
 * divide(10, 0) => SyntaxError
 * ```
 */
export function divide(
  a: ParseableNumber,
  b: ParseableNumber,
  precision = 16,
  strict = true,
) {
  const o1 = parseNumber(a);
  if (Number.isNaN(o1) || !Number.isFinite(o1)) return o1;
  const o2 = parseNumber(b);
  if (Number.isNaN(o2)) return o2;
  if (!Number.isFinite(o2)) return 0;
  if (o2 === 0 && !strict) return o1 / o2;
  if (o2 === 0) {
    throw SyntaxError('Cannot divide by zero');
  }
  return round(o1 / o2, precision);
}

/**
 * Calculates modulo in the correct way including negative numbers.
 * Fixes so called JavaScript modulo bug:
 * https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
 */
export function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}
