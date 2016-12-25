'use es6';

import {Record} from 'immutable';

let defaults = {
  value: 1,
  status: '',
  clock: '',
};

export default class Period extends Record(defaults) {
}
