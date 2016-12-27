'use es6';

import {List, Record} from 'immutable';

import Score from './Score';

let defaults = {
  periods: new List(),
  total: new Score(),
}

export default class GameScoring extends Record(defaults) {
  getPeriodValues() {
    return List(this.periods.map(periodScore => periodScore.formatPeriod()));
  }
}
