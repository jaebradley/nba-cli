import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  period: 1,
  score: new Score(0, 0),
}

export default class PeriodScore extends Record(defaults){
  constructor(period, score) {
    if (!typeof period !== 'number' ) {
      throw new TypeError('expected numerical period value');
    }

    if (!(score instanceof Score)

    if (period < 0) {
      throw new RangeError('expected non-negative period value');
    }

    super({
      period: period,
      score: score,
    });
  }
};
