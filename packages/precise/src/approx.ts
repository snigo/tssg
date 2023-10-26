import { round } from './round.js';
import { getScale } from './scale.js';

/**
 * Checks if the first argument approximately equals
 * to the second argument within delta
 */
export function approxEqual(a: number, b: number, delta = 0): boolean {
  const p = Math.min(
    Math.max(-100, getScale(a), getScale(b), getScale(delta)),
    100,
  );
  return round(Math.abs(a - b), p) <= delta;
}
