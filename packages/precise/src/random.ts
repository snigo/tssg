import { round } from './round.js';

/**
 * Generates random number within range with certain precision
 */
export function random(min = 0, max = 1, precision = 16): number {
  return round(min + Math.random() * (max - min), precision);
}
