import mflat from './flat.js';
import mmap from './mmap.js';
import type { ArrayCallback, ArrayElement } from './types.js';

/**
 * Maps provided array in place followed by mflat,
 * that is also implemented in place
 */
function mflatMap<
  TArray extends unknown[],
  TOutput extends unknown[] = TArray,
  TContext = null,
>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>,
  thisArg?: TContext,
) {
  return mflat(mmap(array, callbackFn, thisArg), 1);
}

export default mflatMap;
