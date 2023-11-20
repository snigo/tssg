import { add, divide, mod, multiply, round } from '@tssg/precise';

import { createRangeIterator } from './iterator.js';
import type { RangeCallback, RangeDescriptor, RangeEdgeType } from './types.js';
import {
  assertValidType,
  getRangeLength,
  getRangeScale,
  normalizeRangeEnd,
  normalizeRangeStart,
  normalizeRangeStep,
} from './utils.js';

/**
 * Range class
 */
class Range {
  /**
   * The number from which the range starts
   */
  readonly from: number = -Infinity;

  /**
   * The number at which the range ends
   */
  readonly to: number = Infinity;

  /**
   * The actual first value of the range,
   * equals to Range.from if type is closed or rightOpen
   * otherwise equals to Range.from + Range.step
   *
   * Range.start will be undefined if Range.from is not finite
   * or if Range.step is not defined and Range.type is open or leftOpen
   */
  readonly start: number | undefined = undefined;

  /**
   * The actual last value of the range,
   * equals to Range.to if type is closed or leftOpen
   * otherwise equals to Range.to - Range.step
   *
   * Range.end will be undefined if Range.to is not finite
   * or if Range.step is not defined and Range.type is open or rightOpen
   */
  readonly end: number | undefined = undefined;

  /**
   * The optional step of the range
   */
  readonly step: number | undefined = undefined;

  /**
   * The type of the range
   */
  readonly type: RangeEdgeType = 'rightOpen';

  /**
   * The minimum value of the range
   */
  readonly min: number = -Infinity;

  /**
   * The maximum value of the range
   */
  readonly max: number = Infinity;

  /**
   * The difference between min and max values.
   * Always positive.
   */
  readonly diff: number = Infinity;

  /**
   * The maximum scale of the range comparing the start and step values
   */
  readonly scale: number = 0;

  /**
   * The length of the range. If Range.length is infinite,
   * it cannot be iterated, sliced or converted to array
   */
  readonly length: number = Infinity;

  /**
   * Creates new Range instance by taking range descriptor object:
   * ```
   * const range = new Range({ from: 0, to: 10, step: 2 });
   * ```
   */
  constructor({ from, to, step, type = 'rightOpen' }: RangeDescriptor) {
    assertValidType(type);
    const fromInclusive = type === 'closed' || type === 'rightOpen';
    const toInclusive = type === 'closed' || type === 'leftOpen';

    const rangeFrom = normalizeRangeStart(from);
    const rangeTo = normalizeRangeEnd(to);
    const rangeStep = normalizeRangeStep(step);
    if (!fromInclusive && !rangeStep) {
      throw new RangeError(
        'Range without step must be of "closed" or "rightOpen" type',
      );
    }
    const scale = getRangeScale(rangeFrom, rangeStep);
    const length = getRangeLength(
      rangeFrom,
      rangeTo,
      rangeStep,
      scale,
      fromInclusive,
      toInclusive,
    );
    const start = fromInclusive ? rangeFrom : round(rangeFrom + step!, scale);
    const end = this.at(length - 1);
    const min = Math.min(rangeFrom, rangeTo);
    const max = Math.max(rangeFrom, rangeTo);
    const diff = max - min;
    Object.defineProperties(this, {
      from: {
        value: rangeFrom,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      to: {
        value: rangeTo,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      start: {
        value: start,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      end: {
        value: end,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      step: {
        value: rangeStep,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      type: {
        value: type,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      min: {
        value: min,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      max: {
        value: max,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      diff: {
        value: diff,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      length: {
        value: length,
        enumerable: true,
        configurable: false,
        writable: false,
      },
      scale: {
        value: scale,
        enumerable: true,
        configurable: false,
        writable: false,
      },
    });
  }

  /**
   * Creates new Range instance from provided from, to, step and type arguments
   *
   * If only one argument provided, it will be used as to value and start will be 0
   *
   * If not provided, step will be 1 and type will be 'rightOpen'
   *
   * ```
   * const range = Range.of(0, 10, 2);
   * ```
   */
  static of(
    from: number,
    to?: number,
    step = 1,
    type: RangeEdgeType = 'rightOpen',
  ) {
    const rangeFrom = arguments.length < 2 ? 0 : normalizeRangeStart(from);
    const rangeTo = normalizeRangeEnd(arguments.length < 2 ? from : to);
    const rangeStep = normalizeRangeStep(step);
    return new Range({
      from: rangeFrom,
      to: rangeTo,
      step: rangeStep,
      type,
    });
  }

  /**
   * Creates new Range instance with open type.
   * If only one argument provided, it will be used as to value and start will be 0.
   * Step defaults to 1.
   * ```
   * const range = Range.open(0, 10, 2);
   * ```
   */
  static open(from: number, to?: number, step = 1) {
    return Range.of(from, to, step, 'open');
  }

  /**
   * Creates new Range instance with closed type.
   * If only one argument provided, it will be used as to value and start will be 0.
   * Step defaults to 1.
   * ```
   * const range = Range.closed(0, 10, 2);
   * ```
   */
  static closed(from: number, to?: number, step?: number) {
    return Range.of(from, to, step, 'closed');
  }

  /**
   * Creates new Range instance with leftOpen type.
   * If only one argument provided, it will be used as to value and start will be 0.
   * Step defaults to 1.
   * ```
   * const range = Range.leftOpen(0, 10, 2);
   * ```
   */
  static leftOpen(from: number, to?: number, step?: number) {
    return Range.of(from, to, step, 'leftOpen');
  }

  /**
   * Creates new Range instance with rightOpen type.
   * If only one argument provided, it will be used as to value and start will be 0.
   * Step defaults to 1.
   * ```
   * const range = Range.rightOpen(0, 10, 2);
   * ```
   */
  static rightOpen(from: number, to?: number, step?: number) {
    return Range.of(from, to, step, 'rightOpen');
  }

  /**
   * Returns new RangeIterator instance.
   * Throws RangeError if the step is not defined.
   *
   * Note that RangeIterator will iterate through the infinite range,
   * so it's not recommended to use the spread operator or Array.from() on it:
   * ```
   * if (range.isFinite()) {
   *  const array = [...range];
   * }
   * ```
   */
  [Symbol.iterator]() {
    return createRangeIterator(
      this.start,
      this.end,
      this.step,
      this.scale,
      this.isAscending(),
    );
  }

  /**
   * Returns number at given index of the range,
   * or undefined if index is out of range, or if Range.start or Range.step is undefined
   */
  at(index: number) {
    if (this.start == null || this.step == null || !Number.isFinite(index)) {
      return undefined;
    }
    const truncated = Math.trunc(index);
    const rangeIndex = truncated < 0 ? this.length + truncated : truncated;
    return add(this.start, multiply(this.step, rangeIndex));
  }

  /**
   * Executes provided function on every element of the range
   * with provided step. If no step provided initial this.step will be used
   * Similarly to forEach in Array, following arguments will be passed to callback:
   * - currentValue
   * - index
   * - range
   * Will try to account for precision errors between numbers in the range
   *
   * Throws RangeError if the range is infinite, or if Range.start or Range.step is undefined
   */
  forEach(cb: RangeCallback, step = this.step) {
    if (!this.isFinite()) {
      throw new RangeError('Cannot iterate through infinite range.');
    }
    if (!this.start) {
      throw new RangeError('Range start position is undefined.');
    }
    const rangeStep = normalizeRangeStep(step);
    if (!rangeStep) {
      throw new RangeError('Iteration step is not defined.');
    }
    const scale = getRangeScale(this.start, rangeStep);
    const isAsc = this.isAscending();
    let index = 0;
    for (
      let value = this.start;
      isAsc ? value <= this.end! : value >= this.end!;
      value = round(isAsc ? value + rangeStep : value - rangeStep, scale)
    ) {
      cb(value, index, this);
      index += 1;
    }

    return undefined;
  }

  /**
   * Returns boolean indicating whether range includes provided value.
   *
   * Note the difference between includes and within methods:
   * ```
   * const range = Range.closed(0, 10, 2);
   * range.includes(3); // false
   * range.within(3); // true
   * ```
   */
  includes(value: number): boolean {
    if (this.start == null || this.step == null) return false;
    return round((value - this.start) / this.step, this.scale) % 1 === 0;
  }

  /**
   * Returns boolean indicating whether range progresses from min to max.
   */
  isAscending(): boolean {
    return this.from <= this.to;
  }

  /**
   * Returns boolean indicating whether range is finite.
   */
  isFinite(): boolean {
    return Number.isFinite(this.diff);
  }

  /**
   * Ensures resulting number is in the range:
   * ```
   * const range = new Range.of(100);
   * range.clamp(120); // 99
   * range.clamp(-Infinity); // 0
   * ```
   */
  clamp(number: number): number {
    if (number < this.min) return this.min;
    if (number > this.max) return this.max;
    return number;
  }

  /**
   * Returns scaled to percentage number relative to the range:
   * ```
   * const range = Range.of(-100, 100);
   * range.toPercentage(0); // 0.5
   * range.toPercentage(-150); // -0.25
   * range.toPercentage(400); // 2.5
   * ```
   */
  toPercentage(number: number): number {
    return divide(number - this.min, this.diff);
  }

  /**
   * Inverse from toPercentage, returns unscaled value from provided percentage of the range:
   * ```
   * const range = Range.of(-100, 100);
   * range.fromPercentage(0); // -100
   * range.fromPercentage(0.5); // 0
   * range.fromPercentage(1); // 99
   * ```
   */
  fromPercentage(number: number): number {
    return multiply(this.min + Number(number), this.diff);
  }

  /**
   * Slices range into provided number of equal parts.
   * Returns array of numbers representing boundaries of each slice
   * For example, slice circle into 6 parts:
   * const range = new Range(0, 359);
   * range.slice(6); // [0, 60, 120, 180, 240, 300]
   *
   * @param {number} parts Number of parts range ro be sliced to
   */
  slice(parts: number): number[] {
    if (!parts || this.step === undefined) return [];

    const step = round((this.max - this.min + this.step) / parts);
    const output: number[] = [];
    this.forEach((number: number) => output.push(number), step);

    return output;
  }

  /**
   * Returns number in the range, such as number = input mod range:
   * const range = new Range(0, 9);
   * range.mod(0); // 0
   * range.mod(-2); // 8
   * range.mod(23); // 3
   *
   * @param {number} number Number to be checked
   */
  mod(number: number): number {
    return this.min + mod(+number, this.max - this.min + 1);
  }
}

export default Range;
