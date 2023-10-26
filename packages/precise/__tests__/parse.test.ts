import { parseNumber } from '../src/parse';

describe('parseNumber function', () => {
  it('correctly converts provided number to a certain precision', () => {
    expect.assertions(5);
    expect(parseNumber('3.45e2')).toBe(345);
    expect(parseNumber('3.45e2', -1)).toBe(350);
    expect(parseNumber(0.2 + 0.1, 1)).toBe(0.3);
    expect(parseNumber('13.359%', 4)).toBe(0.1336);
    expect(parseNumber(100000000000000000000 * 100000000000000000000)).toBe(
      1e40,
    );
  });

  it('parses only parseable numbers', () => {
    expect.assertions(5);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ts2345
    expect(parseNumber(undefined)).toBeNaN();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ts2345
    expect(parseNumber(null)).toBeNaN();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ts2345
    expect(parseNumber(false)).toBeNaN();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ts2345
    expect(parseNumber(true)).toBeNaN();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ts2345
    expect(parseNumber([1])).toBeNaN();
  });

  it('handles bigints', () => {
    expect.assertions(2);
    expect(parseNumber(333335n, -1)).toBe(333340);
    expect(parseNumber(-333335n, -1)).toBe(-333330);
  });
});
