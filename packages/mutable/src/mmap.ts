import type { ArrayCallback, ArrayElement } from './types.js';

/**
 * Maps each item of the array to a new value in place
 */
function mmap<
  TArray extends unknown[],
  TOutput extends unknown[] = TArray,
  TContext = null,
>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>,
  thisArg?: TContext,
): TOutput {
  for (let i = 0; i < array.length; i += 1) {
    array[i] = callbackFn.call(
      thisArg,
      array[i] as ArrayElement<TArray>,
      i,
      array as Array<ArrayElement<TArray>>,
    );
  }
  return array as unknown as TOutput;
}

export default mmap;
