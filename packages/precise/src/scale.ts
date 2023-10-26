/**
 * Calculates scale of number:
 * the number of digits to the right of the decimal point
 */
export function getScale(num: number): number {
  const parts = num.toExponential().split('e');
  return Number(parts[0]?.split('.')[1]?.length ?? 0) - Number(parts[1]);
}
