import { Record } from 'immutable';

import PeriodFormatter from '../services/PeriodFormatter';

const defaults = {
  description: '',
  clock: '',
  period: 1,
  teamAbbreviation: '',
};

export default class Play extends Record(defaults) {
  formatPeriod() {
    return PeriodFormatter.format(this.period);
  }
}
