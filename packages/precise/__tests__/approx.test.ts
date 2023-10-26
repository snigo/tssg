import { approxEqual } from '../src/approx';

describe('approxEqual function', () => {
  it('approximate value with given delta', () => {
    expect.assertions(2);
    expect(approxEqual(0.34, 0.45, 0.1)).toBe(false);
    expect(approxEqual(0.34, 0.44, 0.1)).toBe(true);
  });

  it('account for precision errors', () => {
    expect.assertions(1);
    expect(approxEqual(0.4, 0.3, 0.1)).toBe(true);
  });

  it('work correctly if no delta provided, assuming delta is 0', () => {
    expect.assertions(2);
    expect(approxEqual(35.5, 35.55)).toBe(false);
    expect(approxEqual(36.6, 36.6)).toBe(true);
  });
});
