import {Record} from 'immutable';
import emoji from 'node-emoji';
import Constants from '../../constants/Constants';
import Outcome from './Outcome';

const defaults = {
  home: 0,
  away: 0,
}

export default class Score extends Record(defaults){
  constructor(home, away) {
    if (typeof home !== 'number') {
      throw new TypeError('expected home score to be a number');
    }

    if (typeof away !== 'number') {
      throw new TypeError('expected visitor score to be a number');
    }

    if (home < 0) {
      throw new RangeError('score cannot be negative');
    }

    if (away < 0) {
      throw new RangeError('score cannot be negative');
    }

    super({
      home: home,
      away: away,
    });
  }

  getOutcome() {
    let scoreDifferential = this.home - this.away;

    if (scoreDifferential == 0) {
      return Outcome.TIE;
    }

    else if (scoreDifferential > 0) {
      return Outcome.HOME_WIN;
    }

    return Outcome.AWAY_WIN;
  }
};
