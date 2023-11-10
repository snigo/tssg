export type NonPrimitiveIterable<T> = object & Iterable<T>;

export type Entry<K, V> = [K, V];
export type MultiEntry<K, V> = [K, NonPrimitiveIterable<V>];
