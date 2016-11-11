import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  periodScores: [],
  totalScore: new Score(0, 0),
}

export default class GameScores extends Record(defaults) {

  getPeriodValues() {
    return this.periodScores.map(periodScore => periodScore.periodValue);
  }
};
