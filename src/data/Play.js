'use es6';

import {Record} from 'immutable';

let defaults = {
  description: '',
  clock: '',
  period: 1,
  teamAbbreviation: '',
};

export default class Play extends Record(defaults) {
  formatPeriod() {
    let value = this.period - 4;
    if (value > 0) {
      return 'OT'.concat(value);
    }

    return 'Q'.concat(this.period);
  }
}
