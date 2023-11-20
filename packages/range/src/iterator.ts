import { round } from '@tssg/precise';

const MAX_ITERATION_COUNT = 4294967294;

export function createRangeIterator(
  start: number | undefined,
  end: number | undefined,
  step: number | undefined,
  scale: number,
  isAsc: boolean,
) {
  let value = start;
  let iterationCount = 0;
  const limit = end ?? (isAsc ? Infinity : -Infinity);

  class RangeIterator {
    [Symbol.iterator]() {
      return this;
    }
    next() {
      if (iterationCount > MAX_ITERATION_COUNT) {
        throw new RangeError('Maximum iteration count reached.');
      }
      if (!value) {
        throw new RangeError('Iteration start position is undefined.');
      }
      if (!step) {
        throw new RangeError('Iteration step is not defined.');
      }
      let result;
      if (isAsc ? value <= limit : value >= limit) {
        result = { value, done: false };
        value = round(value + step, scale);
        iterationCount++;
        return result;
      }
      return { value, done: true };
    }
  }
  return new RangeIterator();
}
