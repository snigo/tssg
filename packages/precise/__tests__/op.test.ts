import { add, avg, divide, mod, multiply, subtract, sum } from '../src/op';

describe('add operator', () => {
  it('adds numbers', () => {
    expect.assertions(2);
    expect(add(0.1, 0.2)).toBe(0.3);
    expect(add(2, 2)).toBe(4);
  });

  it('adds bigint numbers', () => {
    expect.assertions(2);
    expect(add(256n, 256n)).toBe(512);
    expect(add(256n, -256n)).toBe(0);
  });

  it('adds string numbers', () => {
    expect.assertions(5);
    expect(add('0.1', '0.2')).toBe(0.3);
    expect(add('.1', '.20')).toBe(0.3);
    expect(add('2', '2')).toBe(4);
    expect(add('3.45e-34', '45.542e32')).toBe(4.5542e33);
    expect(add('  2  ', '  22  ')).toBe(24);
  });

  it('adds mixed type numbers', () => {
    expect.assertions(5);
    expect(add('0.1', 0.2)).toBe(0.3);
    expect(add(0.1, '.20')).toBe(0.3);
    expect(add('2', 2n)).toBe(4);
    expect(add('3.45e-34', 45.542e32)).toBe(4.5542e33);
    expect(add(2, 22n)).toBe(24);
  });

  it('supports percentage notation', () => {
    expect.assertions(2);
    expect(add('100%', 1)).toBe(2);
    expect(add(4, '50%')).toBe(6);
  });
});

describe('avg operator', () => {
  it('gets average of provided numbers', () => {
    expect.assertions(3);
    expect(avg([11, 13, -2, 0])).toBe(5.5);
    expect(avg([-1])).toBe(-1);
    expect(avg([])).toBe(0);
  });

  it('supports mixed types', () => {
    expect.assertions(3);
    expect(avg(['12', 3, 15n])).toBe(10);
    expect(avg(['12', NaN, 15n])).toBeNaN();
    expect(avg(['12', Infinity, 15n])).toBe(Infinity);
  });
});

describe('divide operator', () => {
  it('divides numbers', () => {
    expect.assertions(2);
    expect(divide(4, 2)).toBe(2);
    expect(divide(4, 0.2)).toBe(20);
  });

  it('allows to pass precision of digits after floating point', () => {
    expect.assertions(4);
    expect(divide(1, 3)).toBe(0.3333333333333333);
    expect(divide(1, 3, 4)).toBe(0.3333);
    expect(divide(1, 3, 1)).toBe(0.3);
    expect(divide(1000, 3, -1)).toBe(330);
  });

  it('divides bigint numbers', () => {
    expect.assertions(2);
    expect(divide(256n, 2n)).toBe(128);
    expect(divide(256n, -2n)).toBe(-128);
  });

  it('divides string numbers', () => {
    expect.assertions(5);
    expect(divide('4', '2')).toBe(2);
    expect(divide('4', '.20')).toBe(20);
    expect(divide('2', '2')).toBe(1);
    expect(divide('3.45e34', '45.542e32', 4)).toBe(7.5754);
    expect(divide('  2  ', '  22  ', 2)).toBe(0.09);
  });

  it('divides mixed type numbers', () => {
    expect.assertions(5);
    expect(divide('4', 0.2)).toBe(20);
    expect(divide(5.2, '.20')).toBe(26);
    expect(divide('2', 2n)).toBe(1);
    expect(divide('3.45e34', 45.542e32, 4)).toBe(7.5754);
    expect(divide(2, 22n, 1)).toBe(0.1);
  });

  it('supports percentage notation', () => {
    expect.assertions(3);
    expect(divide('44%', '4%')).toBe(11);
    expect(divide(44, '44%')).toBe(100);
    expect(divide('44%', 4n)).toBe(0.11);
  });
});

describe('mod operator', () => {
  it('correct modulo value for positive and negative numbers', () => {
    expect.assertions(3);
    expect(mod(11, 3)).toBe(2);
    expect(mod(-1, 3)).toBe(2);
    expect(mod(1, -45)).toBe(-44);
  });

  it('supports NaN outcome', () => {
    expect.assertions(3);
    expect(mod(1, 0)).toBeNaN();
    expect(mod(1, Infinity)).toBeNaN();
    expect(mod(1, NaN)).toBeNaN();
  });
});

describe('multiply operator', () => {
  it('multiplies numbers', () => {
    expect.assertions(2);
    expect(multiply(0.2, 0.2)).toBe(0.04);
    expect(multiply(2, 2)).toBe(4);
  });

  it('multiplies bigint numbers', () => {
    expect.assertions(2);
    expect(multiply(256n, 256n)).toBe(65536);
    expect(multiply(256n, -256n)).toBe(-65536);
  });

  it('multiplies string numbers', () => {
    expect.assertions(5);
    expect(multiply('0.2', '0.2')).toBe(0.04);
    expect(multiply('.2', '.20')).toBe(0.04);
    expect(multiply('2', '2')).toBe(4);
    expect(multiply('3.45e-34', '45.542e32')).toBe(1.571199);
    expect(multiply('  2  ', '  22  ')).toBe(44);
  });

  it('multiplies mixed type numbers', () => {
    expect.assertions(5);
    expect(multiply('0.2', 0.2)).toBe(0.04);
    expect(multiply(0.2, '.20')).toBe(0.04);
    expect(multiply('2', 2n)).toBe(4);
    expect(multiply('3.45e-34', 45.542e32)).toBe(1.571199);
    expect(multiply(2, 22n)).toBe(44);
  });

  it('supports percentage notation', () => {
    expect.assertions(2);
    expect(multiply('4%', '44%')).toBe(0.0176);
    expect(multiply(4, '44%')).toBe(1.76);
  });
});

describe('subtract operator', () => {
  it('subtracts numbers', () => {
    expect.assertions(2);
    expect(subtract(0.3, 0.2)).toBe(0.1);
    expect(subtract(4, 2)).toBe(2);
  });

  it('subtracts bigint numbers', () => {
    expect.assertions(2);
    expect(subtract(256n, 128n)).toBe(128);
    expect(subtract(256n, -256n)).toBe(512);
  });

  it('subtracts string numbers', () => {
    expect.assertions(5);
    expect(subtract('0.3', '0.2')).toBe(0.1);
    expect(subtract('.3', '.20')).toBe(0.1);
    expect(subtract('4', '2')).toBe(2);
    expect(subtract('3.45e34', '45.542e32')).toBe(2.99458e34);
    expect(subtract('  2  ', '  22  ')).toBe(-20);
  });

  it('subtracts mixed type numbers', () => {
    expect.assertions(5);
    expect(subtract('0.3', 0.2)).toBe(0.1);
    expect(subtract(0.3, '.20')).toBe(0.1);
    expect(subtract('4', 2n)).toBe(2);
    expect(subtract('3.45e34', 45.542e32)).toBe(2.99458e34);
    expect(subtract(2, 22n)).toBe(-20);
  });

  it('supports percentage notation', () => {
    expect.assertions(2);
    expect(subtract('200%', 1)).toBe(1);
    expect(subtract(4, '50%')).toBe(2);
  });
});

describe('sum operator', () => {
  it('gets sum of provided numbers', () => {
    expect.assertions(3);
    expect(sum([11, 13, -2, 0])).toBe(22);
    expect(sum([-1])).toBe(-1);
    expect(sum([])).toBe(0);
  });

  it('supports mixed types', () => {
    expect.assertions(3);
    expect(sum(['12', 3, 15n])).toBe(30);
    expect(sum(['12', NaN, 15n])).toBeNaN();
    expect(sum(['12', Infinity, 15n])).toBe(Infinity);
  });
});
