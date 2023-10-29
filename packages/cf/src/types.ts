export type SortingOrder = 'asc' | 'desc';
export type NullOrder = 'first' | 'last' | 'natural';

export interface Cf<V = unknown> {
  comparator(a: V, b: V): number;
  direction: SortingOrder;
  nullOrder: NullOrder;
  locale: string | string[];
  options: Intl.CollatorOptions;
  asc(): Cf<V>;
  desc(): Cf<V>;
  alpha(): Cf<V>;
  numeric(): Cf<V>;
  datetime(): Cf<V>;
  nullFirst(): Cf<V>;
  nullLast(): Cf<V>;
  nullNatural(): Cf<V>;
}
