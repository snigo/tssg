class SetMultimap<K, V> extends Map {
  /**
   * Overrides constructor with correct type
   * @param entries Optional array of Map Entries
   */
  constructor(
    entries?:
      | (readonly [K, Set<V>])[]
      | null
      | SetMultimap<K, V>
      | Map<K, Set<V>>,
  ) {
    super();
    if (entries == null) return;
    const _entries =
      entries instanceof Map
        ? ([...entries.entries()] as (readonly [K, Set<V>])[])
        : entries;
    _entries.forEach(([key, value]) => {
      super.set(key, value);
    });
  }

  /**
   * Adds value to the multimap
   *
   * @param key Map key
   * @param value Value to set
   * @returns SetMultimap
   */
  set(key: K, value: V) {
    if (!this.has(key)) {
      super.set.call(this, key, new Set());
    }
    this.get(key)?.add(value);
    return this;
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
}

export default SetMultimap;
