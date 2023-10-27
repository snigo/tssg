export type NonPrimitiveIterable<T> = object & {
  [Symbol.iterator](): Iterator<T>;
};

export type Entry<K, V> = [K, V];
export type MultiEntry<K, V> = [K, NonPrimitiveIterable<V>];
