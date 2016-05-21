import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  periodValue: 1,
  score: new Score(),
}

export default class PeriodScore extends Record(defaults){

  getFormattedHomeScore() {
    return Score.formatScore(this.score.homeScore, this.score.visitorScore);
  }

  getFormattedVisitorScore() {
    return Score.formatScore(this.score.visitorScore, this.score.homeScore);
  }

  getFormattedPeriodValue() {
    return PeriodScore.formatPeriodValue(this.periodValue);
  }

  static formatPeriodValue(periodValue) {
    if (periodValue > 4) {
      return `OT${periodValue - 4}`;
    }

    return `Q${periodValue}`;
  }
};
