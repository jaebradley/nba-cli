import {Record} from 'immutable';
import emoji from 'node-emoji';
import Constants from '../../constants/Constants';
import Outcome from './Outcome';

const defaults = {
  homeTeam: 0,
  awayTeam: 0,
}

export default class GameScore extends Record(defaults){
  constructor(score, opponentScore) {
    if (typeof score !== 'number') {
      throw new TypeError('expected home score to be a number');
    }

    if (typeof opponentScore !== 'number') {
      throw new TypeError('expected visitor score to be a number');
    }

    if (score < 0) {
      throw new RangeError('score cannot be negative');
    }

    if (opponentScore < 0) {
      throw new RangeError('score cannot be negative');
    }

    super({
      score: score,
      opponentScore: opponentScore,
    });
  }

  getOutcome() {
    let scoreDifferential = this.score - this.opponentScore;

    if (scoreDifferential == 0) {
      return Outcome.TIE;
    }

    else if (scoreDifferential > 0) {
      return Outcome.WIN;
    }

    return Outcome.LOSS;
  }
};
