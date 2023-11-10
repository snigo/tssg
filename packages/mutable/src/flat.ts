/**
 * Flattens all sub-array elements of the provided array
 * up to the specified depth in place
 */
function mflat<TArray extends unknown[], TDepth extends number = 1>(
  array: TArray,
  depth?: TDepth,
): FlatArray<TArray, TDepth>[] {
  const d = depth ?? 1;
  let i = 0;
  while (i < array.length) {
    if (d > 0 && Array.isArray(array[i])) {
      const flatten = mflat(array[i] as TArray, d - 1);
      array.splice(i, 1, ...(flatten as TArray));
      i += flatten.length;
    }
  }
  return array as FlatArray<TArray, TDepth>[];
}

export default mflat;
