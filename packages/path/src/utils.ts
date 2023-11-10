import { mfilter } from '@tssg/mutable';

import type {
  NonPrimitiveIterable,
  QueryEntry,
  QueryObject,
  Stringifiable,
  StringifiablePrimitive,
} from './types.js';

export const BASE_URL = 'https://example.com';

export function stringifyPrimitive(primitive: StringifiablePrimitive) {
  if (primitive == null) return '';
  return String(primitive);
}

export function stringify(stringifiable: Stringifiable) {
  if (Array.isArray(stringifiable)) {
    return String(mfilter(stringifiable.map(stringifyPrimitive), Boolean));
  }
  if (stringifiable !== null && typeof stringifiable === 'object') {
    return JSON.stringify(stringifiable);
  }
  return stringifyPrimitive(stringifiable);
}

export function normalizeQueryInput(input: string) {
  return /:\/|\/|\?/gm.test(input) ? input.trim() : `?${input}`;
}

export function normalizeQueryEntry(entry: QueryEntry): [string, string] {
  return [stringifyPrimitive(entry[0]), stringify(entry[1])];
}

export function filterQueryEntry(entry: [string, string]): boolean {
  return !!entry[0] && !!entry[1];
}

export function toEntries(
  queries: NonPrimitiveIterable<QueryEntry> | QueryObject,
): QueryEntry[] {
  if (Array.isArray(queries)) return queries;
  if ('entries' in queries && typeof queries.entries === 'function') {
    return Array.from(queries.entries());
  }
  return Object.entries(queries);
}

export function encodeQueryComponent(component: string): string {
  return encodeURIComponent(component.replace(/ /g, '+').replace(/\s+/g, ''));
}
