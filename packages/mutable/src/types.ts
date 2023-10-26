export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type ArrayCallback<TItem = unknown, TReturn = unknown> = (
  item: TItem,
  index: number,
  arr: TItem[],
) => TReturn;
