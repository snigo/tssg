/* eslint-disable @typescript-eslint/ban-types */
import { getTagType } from './utils.js';

export type NumberType<IncludeObject> = IncludeObject extends true
  ? Number
  : number;

export type AnyNumberType<IncludeObject> = IncludeObject extends true
  ? Number | bigint
  : number | bigint;

export function isNumber<IncludeObject extends boolean = false>(
  value: unknown,
  includeObject?: IncludeObject,
): value is NumberType<IncludeObject> {
  return includeObject
    ? getTagType(value) === 'Number'
    : typeof value === 'number';
}

export function isAnyNumber<IncludeObject extends boolean = false>(
  value: unknown,
  includeObject?: IncludeObject,
): value is AnyNumberType<IncludeObject> {
  return isNumber(value, includeObject) || typeof value === 'bigint';
}

export function isValidNumber<IncludeObject extends boolean = false>(
  value: unknown,
  includeObject?: IncludeObject,
): value is AnyNumberType<IncludeObject> {
  return (
    isAnyNumber(value, includeObject) &&
    (typeof value === 'bigint' || Number.isFinite(value.valueOf()))
  );
}
