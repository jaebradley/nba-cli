'use es6';

import {Record, List} from 'immutable';

import PeriodScore from './PeriodScore';
import Score from './Score';


let defaults = {
  periodScores: new List(),
  totalScore: new Score(0, 0),
}


export default class GameScoring extends Record(defaults) {
  constructor(periodScores, totalScore) {
    if (!(totalScore instanceof Score)) {
      throw new TypeError('total score must be a Score object');
    }

    super({
      periodScores: periodScores,
      totalScore: totalScore,
    });
  }
}
