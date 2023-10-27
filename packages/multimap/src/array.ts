import type { Entry, MultiEntry, NonPrimitiveIterable } from './types.js';
import { isNonPrimitiveIterable } from './utils.js';

class ArrayMultimap<K, V> extends Map {
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
        super.set(key, value);
      } else {
        this.set(key, value);
      }
    });
  }

  set(key: K, value: V) {
    if (!this.has(key)) {
      super.set(key, []);
    }
    this.get(key)?.push(value);
    return this;
  }

  setAll(key: K, values: NonPrimitiveIterable<V>) {
    [...values].forEach(value => {
      this.set(key, value);
    });
    return this;
  }

  replaceAll(key: K, values: NonPrimitiveIterable<V>) {
    return super.set(key, [...values]);
  }

  hasEntry(key: K, value: V) {
    return !!this.get(key)?.includes(value);
  }

  forEach(
    callbackfn: (value: V[], key: K, map: Map<K, V[]>) => void,
    thisArg?: unknown,
  ) {
    super.forEach(callbackfn, thisArg);
  }

  get(key: K) {
    return super.get(key) as V[] | undefined;
  }

  deleteValue(key: K, value: V) {
    const arr = this.get(key);
    if (arr) {
      const i = arr.indexOf(value);
      if (i >= 0) {
        arr.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

export default ArrayMultimap;
