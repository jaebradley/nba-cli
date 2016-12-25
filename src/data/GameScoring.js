'use es6';

import {Record, List} from 'immutable';

import Formatter from '../services/tables/formatters/Formatter';
import Score from './Score';

let defaults = {
  periods: new List(),
  total: new Score(),
}

export default class GameScoring extends Record(defaults) {
  getPeriodValues() {
    return this.periods.map(periodScore => periodScore.formatPeriod());
  }
}
