class ArrayMultimap<K, V> extends Map {
  /**
   * Overrides constructor with correct type
   * @param entries Optional array of Map Entries
   */
  constructor(
    entries?:
      | readonly (readonly [K, V[]])[]
      | null
      | ArrayMultimap<K, V>
      | Map<K, V[]>,
  ) {
    super();
    if (entries == null) return;
    const _entries =
      entries instanceof Map
        ? ([...entries.entries()] as readonly (readonly [K, V[]])[])
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
   * @returns ArrayMultimap
   */
  set(key: K, value: V) {
    if (!this.has(key)) {
      super.set(key, []);
    }
    this.get(key)?.push(value);
    return this;
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
}

export default ArrayMultimap;
