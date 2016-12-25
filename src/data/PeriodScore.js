import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  period: 1,
  score: new Score(),
}

export default class PeriodScore extends Record(defaults){
  formatPeriod() {
    return this.period > 4 ? `OT${this.period - 4}` : `Q${this.period}`;
  }
};
