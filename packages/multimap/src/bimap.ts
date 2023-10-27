import type { Entry } from './types.js';

const _VALUES_CLOSURE_ = new WeakMap<
  Bimap<unknown, unknown>,
  Map<unknown, unknown>
>();

class Bimap<K, V> extends Map<K, V> {
  constructor(entries?: Entry<K, V>[] | null | Map<K, V>) {
    super();
    _VALUES_CLOSURE_.set(this, new Map<V, K>());
    if (entries == null) return;
    const entryArray =
      entries instanceof Map ? [...entries.entries()] : [...entries];
    entryArray.forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  set(key: K, value: V) {
    this.delete(key);
    this.delete(value);
    super.set(key, value);
    _VALUES_CLOSURE_.get(this)?.set(value, key);
    return this;
  }

  get(key: K): V;
  get(key: V): K;
  get(key: K | V) {
    if (super.has(key as K)) {
      return super.get(key as K);
    }
    return _VALUES_CLOSURE_.get(this)?.get(key);
  }

  getKey(value: V) {
    return _VALUES_CLOSURE_.get(this)?.get(value) as K | undefined;
  }

  getValue(key: K) {
    return super.get(key);
  }

  has(key: K | V) {
    return super.has(key as K) || !!_VALUES_CLOSURE_.get(this)?.has(key);
  }

  hasKey(key: K) {
    return super.has(key);
  }

  hasValue(value: V) {
    return !!_VALUES_CLOSURE_.get(this)?.has(value);
  }

  delete(key: K | V) {
    if (super.has(key as K)) {
      _VALUES_CLOSURE_.get(this)?.delete(super.get(key as K) as V);
      return super.delete(key as K);
    }
    if (_VALUES_CLOSURE_.get(this)?.has(key as V)) {
      super.delete(_VALUES_CLOSURE_.get(this)?.get(key as V) as K);
      return !!_VALUES_CLOSURE_.get(this)?.delete(key as V);
    }
    return false;
  }
}

export default Bimap;
