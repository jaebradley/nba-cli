'use es6';

import {Record} from 'immutable';

let defaults = {
  value: 1,
  status: '',
  clock: '',
};

export default class Period extends Record(defaults) {
  constructor(value, status, clock) {
    if (typeof value !== 'number') {
      throw new TypeError('period value must be a number');
    }

    if (typeof status  !== 'string') {
      throw new TypeError('period status must be a string');
    }

    if (typeof clock !== 'string') {
      throw new TypeError('period clock must be a string');
    }

    if (value < 0) {
      throw new RangeError('period value must be non-negative');
    }

    super({
      value: value,
      status: status,
      clock: clock,
    });
  }
}
