'use es6';

import {Record} from 'immutable';

import PeriodScore from './PeriodScore';
import Score from './Score';


let defaults = {
  periodScores: [],
  totalScore: new Score(0, 0);
}


export default class GameScoring extends Record(defaults) {
  constructor(periodScores, totalScore) {
    if (typeof periodScores !== 'array') {
      throw new TypeError('period scores must be an array');
    }

    if (!(totalScore instanceof Score)) {
      throw new TypeError('total score must be a Score object');
    }

    super({
      periodScores: periodScores,
      totalScore: totalScore,
    });
  }
}
