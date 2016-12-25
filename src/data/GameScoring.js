'use es6';

import {Record, List} from 'immutable';

import PeriodScore from './PeriodScore';
import Score from './Score';
import Formatter from '../../tables/formatters/Formatter';


let defaults = {
  periods: new List(),
  total: new Score(),
}


export default class GameScoring extends Record(defaults) {
  getPeriodValues() {
    return this.periods.map(periodScore => Formatter.formatPeriodValue(periodScore.period));
  }
}
