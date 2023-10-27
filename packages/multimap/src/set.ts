import type { Entry, MultiEntry, NonPrimitiveIterable } from './types.js';
import { isNonPrimitiveIterable } from './utils.js';

class SetMultimap<K, V> extends Map {
  constructor(
    entries?:
      | MultiEntry<K, V>[]
      | Entry<K, V>[]
      | null
      | Map<K, V>
      | Map<K, V[]>,
  ) {
    super();
    if (entries == null) return;
    const entryArray =
      entries instanceof Map ? [...entries.entries()] : [...entries];
    entryArray.forEach(([key, value]) => {
      if (isNonPrimitiveIterable(value)) {
        super.set(key, new Set(value));
      } else {
        this.set(key, value);
      }
    });
  }

  set(key: K, value: V) {
    if (!this.has(key)) {
      super.set(key, new Set());
    }
    this.get(key)?.add(value);
    return this;
  }

  setAll(key: K, values: NonPrimitiveIterable<V>) {
    [...values].forEach(value => {
      this.set(key, value);
    });
    return this;
  }

  replaceAll(key: K, values: NonPrimitiveIterable<V>) {
    return super.set(key, new Set(values));
  }

  hasEntry(key: K, value: V) {
    return !!this.get(key)?.has(value);
  }

  forEach(
    callbackfn: (value: Set<V>, key: K, map: Map<K, Set<V>>) => void,
    thisArg?: unknown,
  ) {
    super.forEach.call(this, callbackfn, thisArg);
  }

  get(key: K) {
    return super.get.call(this, key) as Set<V> | undefined;
  }

  deleteValue(key: K, value: V) {
    const set = this.get(key);
    if (set) {
      return set.delete(value);
    }
    return false;
  }
}

export default SetMultimap;
