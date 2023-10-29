import { isDateLike, isNullish, isNumeric } from './isit.js';
import type { Cf } from './types.js';

export function cfAlphanumeric<V>(this: Cf, a: V, b: V): number {
  if (this.nullOrder !== 'natural') {
    if (isNullish(a) && isNullish(b)) return 0;
    if (isNullish(a)) return this.nullOrder === 'first' ? -1 : 1;
    if (isNullish(b)) return this.nullOrder === 'first' ? 1 : -1;
  }
  const _start = String(this.direction === 'asc' ? a : b);
  const _end = String(this.direction === 'asc' ? b : a);
  return Intl.Collator(this.locale, this.options).compare(_start, _end);
}

export function cfNumeric<V>(this: Cf, a: V, b: V): number {
  if (this.nullOrder !== 'natural') {
    if (isNullish(a) && isNullish(b)) return 0;
    if (isNullish(a)) return this.nullOrder === 'first' ? -1 : 1;
    if (isNullish(b)) return this.nullOrder === 'first' ? 1 : -1;
  }
  if (!isNumeric(a) && !isNumeric(b)) return cfAlphanumeric.call(this, a, b);
  if (!isNumeric(a)) return this.direction === 'asc' ? 1 : -1;
  if (!isNumeric(b)) return this.direction === 'asc' ? -1 : 1;
  const _start = Number(this.direction === 'asc' ? a : b);
  const _end = Number(this.direction === 'asc' ? b : a);
  return _start - _end;
}

export function cfDateTime<V>(this: Cf, a: V, b: V): number {
  if (this.nullOrder !== 'natural') {
    if (isNullish(a) && isNullish(b)) return 0;
    if (isNullish(a)) return this.nullOrder === 'first' ? -1 : 1;
    if (isNullish(b)) return this.nullOrder === 'first' ? 1 : -1;
  }
  if (!isDateLike(a) && !isDateLike(b)) return cfAlphanumeric.call(this, a, b);
  if (!isDateLike(a)) return this.direction === 'asc' ? 1 : -1;
  if (!isDateLike(b)) return this.direction === 'asc' ? -1 : 1;
  const _sa = String(a);
  const _sb = String(b);
  const _start = Date.parse(this.direction === 'asc' ? _sa : _sb);
  const _end = Date.parse(this.direction === 'asc' ? _sb : _sa);
  return _start - _end;
}
