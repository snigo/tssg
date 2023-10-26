/**
 * Slices the array in place
 */
function mslice<TArray extends unknown[]>(
  array: TArray,
  start = 0,
  end = array.length,
): TArray {
  const deleteCount = Math.min(
    Math.max(start < 0 ? array.length + start : start, 0),
    array.length,
  );
  const length = Math.min(
    Math.max(end < 0 ? array.length + end : end, 0),
    array.length,
  );
  if (length - deleteCount <= 0) {
    array.length = 0;
    return array;
  }
  if (deleteCount) {
    array.splice(0, deleteCount);
  }
  array.length = length - deleteCount;
  return array;
}

export default mslice;
