/* eslint-disable @typescript-eslint/ban-types */
import { getTagType } from './utils.js';

export type BooleanType<IncludeObject> = IncludeObject extends true
  ? Boolean
  : boolean;

export function isBoolean<IncludeObject extends boolean = false>(
  value: unknown,
  includeObject?: IncludeObject,
): value is BooleanType<IncludeObject> {
  return includeObject
    ? getTagType(value) === 'Boolean'
    : typeof value === 'boolean';
}
