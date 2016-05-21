import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  periodScores: [],
  totalScore: new Score(),
}

export default class GameScores extends Record(defaults) {

  getPeriodValues() {
    return this.periodScores.map(periodScore => periodScore.periodValue);
  }
};
