import type { ArrayCallback, ArrayElement } from './types.js';

/**
 * Filters the array in place using provided callback function
 * Works just like Array.prototype.filter except mutates array
 */
function mfilter<TArray extends unknown[], TContext = null>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>>,
  thisArg?: TContext,
): TArray {
  let l = array.length;
  for (let i = 0; i < l; i++) {
    array[i] = array[i + array.length - l];
    if (
      !callbackFn.call(
        thisArg,
        array[i] as ArrayElement<TArray>,
        i + array.length - l,
        array as Array<ArrayElement<TArray>>,
      )
    ) {
      i--;
      l--;
    }
  }
  array.length = l;
  return array;
}

export default mfilter;
