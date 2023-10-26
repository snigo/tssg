import { random } from '../src/random';

describe('random function', () => {
  it('generates random number within a range', () => {
    expect.assertions(5);
    const randomInt = random(80, 100, 0);
    const randomDecimal = random(0, 10, 2);
    expect(randomInt).toBeGreaterThanOrEqual(80);
    expect(randomInt).toBeLessThan(100);
    expect(randomInt % 1).toBe(0);
    expect(randomDecimal).toBeGreaterThanOrEqual(0);
    expect(randomDecimal).toBeLessThan(10);
  });

  it('works with default values', () => {
    expect.assertions(2);
    const randomNumber = random();
    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThan(1);
  });
});
