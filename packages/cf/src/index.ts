import { cfAlphanumeric, cfDateTime, cfNumeric } from './comparators.js';
import type { Cf } from './types.js';

const defaultCf: Cf = {
  comparator: cfAlphanumeric,
  direction: 'asc',
  nullOrder: 'last',
  locale: 'us',
  options: {},
  asc() {
    this.direction = 'asc';
    return Object.assign(this.comparator.bind(this), this);
  },
  desc() {
    this.direction = 'desc';
    return Object.assign(this.comparator.bind(this), this);
  },
  alpha(locale?: string | string[], options?: Cf['options']) {
    if (locale) {
      this.locale = locale;
    }
    if (options) {
      this.options = options;
    }
    this.comparator = cfAlphanumeric;
    return Object.assign(this.comparator.bind(this), this);
  },
  numeric() {
    this.comparator = cfNumeric;
    return Object.assign(this.comparator.bind(this), this);
  },
  datetime() {
    this.comparator = cfDateTime;
    return Object.assign(this.comparator.bind(this), this);
  },
  nullFirst() {
    this.nullOrder = 'first';
    return Object.assign(this.comparator.bind(this), this);
  },
  nullLast() {
    this.nullOrder = 'last';
    return Object.assign(this.comparator.bind(this), this);
  },
  nullNatural() {
    this.nullOrder = 'natural';
    return Object.assign(this.comparator.bind(this), this);
  },
};

export default function cf() {
  return Object.assign(cfAlphanumeric.bind(defaultCf), defaultCf);
}
