import { SetMultimap } from '@tssg/multimap';
import { mfilter, mmap } from '@tssg/mutable';

import type { NonPrimitiveIterable, QueryEntry, QueryObject } from './types.js';
import {
  BASE_URL,
  encodeQueryComponent,
  filterQueryEntry,
  normalizeQueryEntry,
  normalizeQueryInput,
  toEntries,
} from './utils.js';

class SearchParams extends SetMultimap<string, string> {
  constructor(
    params?: string | NonPrimitiveIterable<QueryEntry> | QueryObject,
  ) {
    if (params == null) {
      super();
      return;
    }
    if (typeof params === 'string') {
      super();
      return SearchParams.parse(params);
    }
    const entries = mfilter(
      mmap<QueryEntry[], [string, string][]>(
        toEntries(params),
        normalizeQueryEntry,
      ),
      filterQueryEntry,
    );
    super(entries);
  }

  public static parse(input: string) {
    return new SearchParams(
      new URL(normalizeQueryInput(input), BASE_URL).searchParams,
    );
  }

  toString() {
    const parts: string[] = [];
    for (const [key, set] of this.entries()) {
      set.forEach((value: string) => {
        parts.push(
          `${encodeQueryComponent(key)}=${encodeQueryComponent(value)}`,
        );
      });
    }
    return parts.join('&');
  }
}

export default SearchParams;
