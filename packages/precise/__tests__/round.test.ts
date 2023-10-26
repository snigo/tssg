import { round } from '../src/round';

describe('round function', () => {
  it('correctly rounds provided number', () => {
    expect.assertions(5);
    expect(round(0.45876453, 4)).toBe(0.4588);
    expect(round(12.45, 1)).toBe(12.5);
    expect(round(1250, -2)).toBe(1300);
    expect(round(-1250, -2)).toBe(-1200);
    expect(round(45, -1)).toBe(50);
  });

  it('defauls precision to zero', () => {
    expect.assertions(4);
    expect(round(0.45876453)).toBe(0);
    expect(round(12.45)).toBe(12);
    expect(round(-1250)).toBe(-1250);
    expect(round(0.645)).toBe(1);
  });

  it('works with very large numbers', () => {
    expect.assertions(2);
    expect(round(Number.MAX_SAFE_INTEGER, -10)).toBe(9007200000000000);
    expect(round(Number.MIN_SAFE_INTEGER, -3)).toBe(-9007199254741000);
  });

  it('correctly deals with decimal parts ending on 5', () => {
    expect.assertions(5);
  });

  it('always returns positive zero', () => {
    expect.assertions(2);
    expect(Object.is(round(-0.45, 0), -0)).toBe(false);
    expect(Object.is(round(-0, 0), -0)).toBe(false);
  });
});
