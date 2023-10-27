import SetMultimap from './set.js';
import type { Entry } from './types.js';

const _AK_CLOSURE_ = new WeakMap<
  AliasMap<unknown, unknown, unknown>,
  Map<unknown, unknown>
>();

const _KA_CLOSURE_ = new WeakMap<
  AliasMap<unknown, unknown, unknown>,
  SetMultimap<unknown, unknown>
>();

class AliasMap<K, V, A> extends Map<K | A, V> {
  constructor(entries?: Entry<K, V>[] | null | Map<K, V>) {
    super();
    _AK_CLOSURE_.set(this, new Map<A, K>());
    _KA_CLOSURE_.set(this, new SetMultimap<K, A>());
    if (entries == null) return;
    const entryArray =
      entries instanceof Map ? [...entries.entries()] : [...entries];
    entryArray.forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  set(key: K, value: V, aliases?: A[]) {
    super.set(key, value);
    const AK = _AK_CLOSURE_.get(this) as Map<A, K>;
    const KA = _KA_CLOSURE_.get(this) as SetMultimap<K, A>;
    aliases?.forEach(alias => {
      if (Object.is(alias, key)) return;
      if (AK.has(alias) && !Object.is(AK.get(alias), key)) {
        throw new TypeError(`Alias ${alias} already exists`);
      }
      super.set(alias, value);
      AK.set(alias, key);
    });
    KA.replaceAll(key, aliases ?? []);
    return this;
  }

  setAlias(key: K | A, ...aliases: A[]) {
    if (!this.has(key)) {
      return this;
    }
    const realKey = this.getKey(key) as K;
    const value = this.get(key) as V;
    const AK = _AK_CLOSURE_.get(this) as Map<A, K>;
    const KA = _KA_CLOSURE_.get(this) as SetMultimap<K, A>;
    aliases?.forEach(alias => {
      if (Object.is(alias, realKey)) return;
      if (AK.has(alias) && !Object.is(AK.get(alias), realKey)) {
        throw new TypeError(`Alias ${alias} already exists`);
      }
      super.set(alias, value);
      AK.set(alias, realKey);
      KA.set(realKey, alias);
    });
    return this;
  }

  get(key: K | A) {
    return super.get(key);
  }

  getKey(alias: A | K) {
    if (_AK_CLOSURE_.get(this)?.has(alias)) {
      return _AK_CLOSURE_.get(this)?.get(alias) as K | undefined;
    }
    return this.has(alias) ? (alias as K) : undefined;
  }

  getAliases(key: K | A) {
    const realKey = this.getKey(key);
    const aliases = _KA_CLOSURE_.get(this)?.get(realKey) as Set<A> | undefined;
    return aliases ? Array.from(aliases) : aliases;
  }

  has(key: K | A) {
    return super.has(key as K) || !!_KA_CLOSURE_.get(this)?.has(key);
  }

  hasKey(key: K) {
    return Object.is(key, this.getKey(key));
  }

  delete(key: K | A) {
    if (this.has(key)) {
      const realKey = this.getKey(key);
      super.delete(key);
      const AK = _AK_CLOSURE_.get(this) as Map<A, K>;
      const KA = _KA_CLOSURE_.get(this) as SetMultimap<K, A>;
      if (Object.is(realKey, key)) {
        const aliases = KA.get(key as K);
        aliases?.forEach(alias => {
          super.delete(alias);
          AK.delete(alias);
        });
        KA.delete(key);
      } else {
        KA.deleteValue(realKey as K, key as A);
        AK.delete(key as A);
      }
      return true;
    }
    return false;
  }

  clear() {
    super.clear();
    _AK_CLOSURE_.set(this, new Map<A, K>());
    _KA_CLOSURE_.set(this, new SetMultimap<K, A>());
  }
}

export default AliasMap;
