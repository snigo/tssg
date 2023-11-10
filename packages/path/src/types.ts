export type NonPrimitiveIterable<T> = object & {
  entries(): Iterable<T>;
};

export type JSONObjectKey = string | number;

export type Nullish = null | undefined;
export type StringifiablePrimitive =
  | string
  | number
  | bigint
  | boolean
  | Nullish;
export type Stringifiable =
  | StringifiablePrimitive
  | StringifiablePrimitive[]
  | Record<JSONObjectKey, unknown>;

export type QueryEntry = [JSONObjectKey, Stringifiable];
export type QueryObject = Record<JSONObjectKey, Stringifiable>;
