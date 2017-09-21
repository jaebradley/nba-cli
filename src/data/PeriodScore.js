import { Record } from 'immutable';
import Score from './Score';
import PeriodFormatter from '../services/PeriodFormatter';

const defaults = {
  period: 1,
  score: new Score(),
};

export default class PeriodScore extends Record(defaults) {
  formatPeriod() {
    return PeriodFormatter.format(this.period);
  }
}
