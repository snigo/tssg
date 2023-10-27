import { NonPrimitiveIterable } from './types.js';

export function isNonPrimitiveIterable<V>(
  value: V | NonPrimitiveIterable<V>,
): value is NonPrimitiveIterable<V> {
  return value != null && typeof value === 'object' && Symbol.iterator in value;
}
